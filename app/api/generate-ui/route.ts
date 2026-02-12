'use server';

//import { NextResponse } from 'next/server';
import { adminDb, adminIncrement } from '@/utils/firebaseAdmin';
import PromptFattening from '@/actions/promptFattening';
import ImageGeneration from '@/actions/imageGen';
import GenerateSingleScreen from '@/actions/generateSingleScreen';
import HtmlToJson from '@/actions/HtmlToJson';
import { put } from '@vercel/blob';
// Removed complex credit calculator - using simple formula: (tokens / 10) + 50
import { getSubscriptionStatus } from '@/actions/getSubscriptionStatus';

type UIComponent = {
  screen: { name: string; width: number; height: number };
  component: string;
  message: string;
};

// Helper function to send SSE message
function createSSEMessage(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function POST(request: Request) {
  const { prompt, previousUI, imageHolder, uid, projectId } = await request.json();
  
  // Create a readable stream for SSE
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      let projectUnlocked = false;
      
      const sendEvent = async (event: string, data: unknown) => {
        const message = createSSEMessage(event, data);
        controller.enqueue(encoder.encode(message));
        // Removed delay for faster UI generation
      };
      
      // Helper to calculate credits - simple formula: (tokens / 10) + 50, rounded up
      const calculateCredits = (tokens: number): number => {
        return Math.ceil((tokens / 10) + 50);
      };

      const unlockProject = async () => {
        if (!projectUnlocked) {
          try {
            const projectStateRef = adminDb.doc(`projects/${projectId}`);
            await projectStateRef.update({ state: "unlocked" });
            projectUnlocked = true;
          } catch (error) {
            console.error('Error unlocking project:', error);
          }
        }
      };

      try {
        const idToken = request.headers.get('Authorization')?.replace('Bearer ', '') || undefined;

        const projectStateRef = adminDb.doc(`projects/${projectId}`);
        await projectStateRef.update({ state: "generating" });
        
        if (!uid || !projectId) {
          await sendEvent('error', { message: 'Missing uid or projectId' });
          await unlockProject();
          controller.close();
          return;
        }

        const userRef = adminDb.doc(`users/${uid}`);
        const projectRef = adminDb.doc(`users/${uid}/projects/${projectId}`);
        
        // Parallelize subscription status check and project data fetch
        const [subStatus, projectSnap] = await Promise.all([
          getSubscriptionStatus(idToken),
          projectRef.get()
        ]);

        if (!subStatus) {
          await sendEvent('error', { message: 'Subscription Status could not be determined.' });
          await unlockProject();
          controller.close();
          return;
        }

        const subHelper = subStatus.subscribed && subStatus.subscription?.status === 'Active'
          ? 'User is subscribed, you can create more than 7 screens if needed but cap at 10 or create any number of screens user asks for.'
          : 'User is not subscribed, so create only seven screens. Don not go over even if the user asks for more.';

        const blobUrl = projectSnap.data()?.uiBlobUrl;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let styleGuide: any = undefined;
        const history = blobUrl
          ? await fetch(blobUrl).then(r => r.text()).then(t => JSON.parse(t)).catch(() => [])
          : [];


        console.log(history)
        if (history.length > 0) {
          styleGuide = history[0].styleGuide
          console.log("styleguide: ",styleGuide);
        }



        const images: string[] = Array.isArray(imageHolder) ? [...imageHolder] : (imageHolder ? [imageHolder] : []);
        let fattenedPrompt = Array.isArray(prompt) ? prompt.join('\n') : prompt || '';
        let fattenedTokens = 0;
        let title: string = "New Project Title";
        let fattenedMessage: string = '';
        let splashImagePrompt: string = '';
        let otherImagesPrompt: string = '';
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let fattenedJson: any = null;
        // Store empty screens to merge with generated ones - declare early so it can be used in prompt fattening
        const emptyScreensMap: Map<string, { screen: { name: string; width: number; height: number }; component: unknown }> = new Map();

        const isChainMode = Boolean(previousUI && previousUI.length > 0);

        if (!isChainMode) {
          await sendEvent('status', { message: 'Starting prompt fattening...' });
          console.log("Prompt Fattening");
          
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const fattenedResult = await PromptFattening(prompt, subHelper).then(async (res: any) => {
            const json = await res.json();
            const tokens = res?.usage?.total_tokens || 0;
            return { json, tokens };
          });

          fattenedTokens = fattenedResult.tokens || 0;
          fattenedJson = fattenedResult.json;
          fattenedPrompt = fattenedJson?.ui?.[0]?.ui ?? fattenedPrompt;
          fattenedMessage = fattenedJson?.ui?.[0]?.message ?? '';
          title = fattenedJson?.ui?.[0]?.title ?? "New project Title";
          styleGuide = fattenedJson?.ui?.[0]?.style_guide ?? undefined;
          splashImagePrompt = fattenedJson?.ui?.[0]?.splashImagePrompt ?? undefined;
          otherImagesPrompt = fattenedJson?.ui?.[0]?.otherImagesPrompt ?? undefined;
          
          console.log("Prompt Fattening done");
          
          // Don't send prompt fattening message to frontend - wait for UI to finish
          // The message will be included in the final complete event
          
          // Send empty screens with titles immediately after prompt fattening
          if (fattenedJson?.ui?.[0]?.ui && Array.isArray(fattenedJson.ui[0].ui)) {
            const emptyScreens = fattenedJson.ui[0].ui.map((item: string, index: number) => {
              const colonIndex = item.indexOf(':');
              const screenName = colonIndex > 0 ? item.substring(0, colonIndex).trim() : `screen-${index + 1}`;
              const screenNameLower = screenName.toLowerCase();
              const emptyScreen = {
                screen: {
                  name: screenNameLower,
                  width: 375,
                  height: 500
                },
                component: {
                  type: 'div',
                  attributes: {
                    style: 'display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 24px; font-weight: bold;'
                  },
                  content: [`${screenName.charAt(0).toUpperCase() + screenName.slice(1)} Screen - Generating...`]
                }
              };
              // Store in map for later merging
              emptyScreensMap.set(screenNameLower, emptyScreen);
              return emptyScreen;
            });
            
            await sendEvent('emptyScreens', {
              screens: emptyScreens,
              total: emptyScreens.length
            });
          }

          await sendEvent('status', { message: 'Generating images and setting project title...' });
          console.log("setting project title and Image Generation");
          
          // Run project title update and image generation in parallel
          const globalProjectRef = adminDb.doc(`projects/${projectId}`);
          const imageGenerationPromise = images.length === 0
            ? Promise.all([
                ImageGeneration(splashImagePrompt + ' splash', 1).then(r => r?.json()),
                ImageGeneration(otherImagesPrompt + ' supporting images', 4).then(r => r?.json())
              ])
            : Promise.resolve(null);
          
          const titleUpdatePromise = (async () => {
            const [projectData, globalData] = await Promise.all([
              projectRef.get(),
              globalProjectRef.get()
            ]);
            
            const projectSettings = projectData.data()?.settings || {};
            const globalSettings = globalData.data()?.settings || {};
            
            await Promise.all([
              projectRef.update({ 
                settings: { ...projectSettings, projectName: title }
              }),
              globalProjectRef.update({ 
                settings: { ...globalSettings, projectName: title }
              })
            ]);
          })();

          // Wait for both to complete
          const [imageResults] = await Promise.all([
            imageGenerationPromise,
            titleUpdatePromise
          ]);

          if (imageResults) {
            const [splashResult, otherResult] = imageResults;
            if (splashResult?.images?.[0]) images.push(`${splashResult.images[0].url} - Splash`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (otherResult?.images) otherResult.images.forEach((img: any) => images.push(`${img.url} - Supporting image`));
          }
          console.log("setting project title and Image Generation done");
        }

        // Extract screen list from fattened prompt
        const screenList: string[] = [];
        const screenPrompts: Record<string, string> = {};
        if (isChainMode){
          console.log(previousUI)
          const parsedPrevUi = previousUI.map((item: { screenName: string; component: string; }) => `${item.screenName} - ${item.component}`);
          screenList.push(...parsedPrevUi)
          console.log("screenList: ", screenList);
        }
        
        if (!isChainMode && fattenedJson?.ui?.[0]?.ui) {
          // fattenedJson.ui[0].ui is an array like ["splash: description", "onboarding: description"]
          const uiArray = fattenedJson.ui[0].ui;
          if (Array.isArray(uiArray)) {
            uiArray.forEach((item: string) => {
              if (typeof item === 'string' && item.includes(':')) {
                const colonIndex = item.indexOf(':');
                const screenName = item.substring(0, colonIndex).trim().toLowerCase();
                const screenDescription = item.substring(colonIndex + 1).trim();
                if (screenName && !screenList.includes(screenName)) {
                  screenList.push(screenName);
                  screenPrompts[screenName] = screenDescription;
                }
              }
            });
          }
        } else if (Array.isArray(fattenedPrompt)) {
          fattenedPrompt.forEach((item: string) => {
            if (item.includes(':')) {
              const colonIndex = item.indexOf(':');
              const screenName = item.substring(0, colonIndex).trim().toLowerCase();
              const screenDescription = item.substring(colonIndex + 1).trim();
              if (screenName && !screenList.includes(screenName)) {
                screenList.push(screenName);
                screenPrompts[screenName] = screenDescription;
              }
            }
          });
        } else if (typeof fattenedPrompt === 'string') {
          // Try to extract screen names from the fattened prompt string
          const lines = fattenedPrompt.split('\n');
          lines.forEach(line => {
            if (line.includes(':')) {
              const colonIndex = line.indexOf(':');
              const screenName = line.substring(0, colonIndex).trim().toLowerCase();
              const screenDescription = line.substring(colonIndex + 1).trim();
              if (screenName && !screenList.includes(screenName)) {
                screenList.push(screenName);
                screenPrompts[screenName] = screenDescription;
              }
            }
          });
        }

        let chainMessage = ""
        // If we can't extract screens, use the original approach
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const allScreens: any[] = previousUI.map((item: { screenName: any; component: any; }) => `${item.screenName} `);
        let totalCreditUsed = 0;
        let totalScreenCreditsDeducted = 0; // Track total credits deducted for screens
        const convertedUI: Array<{ screen: { name: string; width: number; height: number }; component: unknown; styleGuide?: unknown }> = [];

        if (screenList.length > 0) {
          await sendEvent('status', { message: `Generating ${screenList.length} screens in parallel...` });
          console.log("Ui Generation - Generating screens in parallel");

          // Generate screens in parallel batches for faster processing
          // Process 6 screens at a time to balance speed with API rate limits
          const BATCH_SIZE = 6;

          for (let batchStart = 0; batchStart < screenList.length; batchStart += BATCH_SIZE) {
            const batchEnd = Math.min(batchStart + BATCH_SIZE, screenList.length);
            const batch = screenList.slice(batchStart, batchEnd);
            
            await sendEvent('status', { message: `Generating batch ${Math.floor(batchStart / BATCH_SIZE) + 1}: screens ${batchStart + 1}-${batchEnd}...` });


            // Generate all screens in this batch in parallel
            const batchPromises = batch.map(async (screenName, batchIndex) => {
              const globalIndex = batchStart + batchIndex;
              
              try {
                // Get the prompt for this specific screen
                let screenPrompt = screenPrompts[screenName] || fattenedPrompt;
                if (!screenPrompt || screenPrompt === fattenedPrompt) {
                  // Fallback: try to find in fattenedPrompt
                  if (Array.isArray(fattenedPrompt)) {
                    screenPrompt = fattenedPrompt.find((item: string) => item.toLowerCase().startsWith(screenName.toLowerCase())) || fattenedPrompt[globalIndex] || fattenedPrompt[0];
                  } else if (typeof fattenedPrompt === 'string') {
                    const lines = fattenedPrompt.split('\n');
                    const screenLine = lines.find(line => line.toLowerCase().startsWith(screenName.toLowerCase()));
                    screenPrompt = screenLine || fattenedPrompt;
                  }
                }

                const firstBracketIndex = screenName.indexOf('<');


                const cleanedPrevUi = screenName.substring(firstBracketIndex);

                const { screen, creditUsed } = await GenerateSingleScreen(
                  screenPrompt as string,
                    screenName.split('<')[0].replace(/-\s*$/, '').trim(),
                  images,
                    cleanedPrevUi,
                  subHelper,
                  allScreens,
                  styleGuide
                );

                chainMessage += `${screen.message}\n\n `

                console.log("ScreenName: ", screenName.split('<')[0].replace(/-\s*$/, '').trim());
                console.log("screenPrompt: ", screenPrompt);
                console.log("images: ", images);
                console.log("previousUI: ", cleanedPrevUi);

                return {
                  screen,
                  creditUsed,
                  screenName,
                  index: globalIndex,
                  success: true
                };
              } catch (error) {
                console.error(`Error generating screen ${screenName}:`, error);
                await sendEvent('error', { message: `Error generating screen ${screenName}: ${String(error)}` });
                return {
                  screen: null,
                  creditUsed: 0,
                  screenName,
                  index: globalIndex,
                  success: false
                };
              }
            });

            // Wait for all screens in batch to complete
            const batchResults = await Promise.all(batchPromises);
            
            // Process results as they complete (in order)
            for (const result of batchResults) {
              if (result.success && result.screen) {
                totalCreditUsed += result.creditUsed;
                allScreens.push(result.screen);

                // Calculate and deduct credits for this screen immediately
                // Simple formula: (tokens / 10) + 50, rounded up
                const screenCredits = calculateCredits(result.creditUsed);
                totalScreenCreditsDeducted += screenCredits;
                
                // Deduct credits immediately for this screen
                await userRef.update({ credits: adminIncrement(-screenCredits) });
                console.log(`Deducted ${screenCredits} credits for screen ${result.screenName}`);

                console.log("result: ", result)

                // Convert the screen
                const convertedComponent = JSON.parse(await HtmlToJson(result.screen.component.replace(/font-family:\s*'([^']+)'/gi, 'font-family: $1')) as string);
                const generatedScreen = {
                  screen: result.screen.screen,
                  component: convertedComponent,
                };
                convertedUI.push(generatedScreen);

                // Merge generated screens with empty placeholders for unrendered screens
                const allScreensWithPlaceholders = screenList.map((screenName) => {
                  const screenNameLower = screenName.toLowerCase();
                  // Check if this screen has been generated
                  const generated = convertedUI.find(s => s.screen.name.toLowerCase() === screenNameLower);
                  if (generated) {
                    return generated;
                  }
                  // Return empty placeholder if not generated yet
                  return emptyScreensMap.get(screenNameLower) || {
                    screen: {
                      name: screenNameLower,
                      width: 375,
                      height: 500
                    },
                    component: {
                      type: 'div',
                      attributes: {
                        style: 'display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 24px; font-weight: bold;'
                      },
                      content: [`Screen Is Generating...`]
                    }
                  };
                });

                // Send screen to frontend immediately as it completes
                await sendEvent('screen', {
                  screen: {
                    screen: result.screen.screen,
                    component: convertedComponent,
                  },
                  index: result.index,
                  total: screenList.length,
                  allScreens: allScreensWithPlaceholders // Send all screens (generated + empty placeholders)
                });

                console.log(`Screen ${result.index + 1}/${screenList.length} (${result.screenName}) generated and saved`);
              }
            }

            // Save to history after each batch
            const tempHistory = [...history];
            const tempEntry = {
              createdAt: new Date().toISOString(),
              prompt: Array.isArray(prompt) ? prompt : [prompt],
              aiResponse: fattenedMessage ? [fattenedMessage] : [],
              creditUsed: 0, // Will be calculated at the end
              ui: convertedUI,
              imageHolder: images,
              styleGuide: styleGuide,
            };

            if (isChainMode && tempHistory.length > 0) {
              const last = tempHistory[tempHistory.length - 1];
              last.ui = convertedUI;
            } else {
              tempHistory.push(tempEntry);
            }

            // Save blob incrementally after each batch
            const tempBlob = await put(`project-ui/${projectId}.json`, JSON.stringify(tempHistory), {
              access: 'public',
              allowOverwrite: true
            });

            // Update project with blob URL if needed
            if (!blobUrl && tempBlob?.url) {
              await projectRef.update({ uiBlobUrl: tempBlob.url });
            }
          }
        } else {
          // Fallback: use original batch generation if we can't extract screens
          await sendEvent('status', { message: 'Generating UI screens...' });
          console.log("Ui Generation - Using batch mode");
          
          // Import the original UiGeneration function
          const UiGeneration = (await import('@/actions/uiGeneration')).default;
          const uiResponse = await UiGeneration(fattenedPrompt, images, previousUI, subHelper);
          const data = await uiResponse.json();
          const uiData: UIComponent[] = data.ui || [];
          totalCreditUsed = data.creditUsed || 0;
          
          // Deduct credits for batch generation using simple formula
          const batchCredits = calculateCredits(totalCreditUsed);
          totalScreenCreditsDeducted = batchCredits;
          await userRef.update({ credits: adminIncrement(-batchCredits) });
          console.log(`Deducted ${batchCredits} credits for batch UI generation`);

          await sendEvent('status', { message: 'Converting UI screens...' });
          console.log("Converting UI");
          
          for (let i = 0; i < uiData.length; i++) {
            const item = uiData[i];
            const convertedComponent = JSON.parse(await HtmlToJson(item.component) as string);
            convertedUI.push({
              screen: item.screen,
              component: convertedComponent
            });

            // Send each screen to frontend with all screens so far
            await sendEvent('screen', {
              screen: {
                screen: item.screen,
                component: convertedComponent
              },
              index: i,
              total: uiData.length,
              allScreens: convertedUI // Send all screens so far for immediate update
            });

            // Save incrementally
            const tempHistory = [...history];
            const tempEntry = {
              createdAt: new Date().toISOString(),
              prompt: Array.isArray(prompt) ? prompt : [prompt],
              aiResponse: fattenedMessage ? [fattenedMessage] : [],
              creditUsed: 0,
              ui: convertedUI,
              imageHolder: images,
              styleGuide: styleGuide,
            };

            if (isChainMode && tempHistory.length > 0) {
              const last = tempHistory[tempHistory.length - 1];
              last.ui = convertedUI;
            } else {
              tempHistory.push(tempEntry);
            }

            const tempBlob = await put(`project-ui/${projectId}.json`, JSON.stringify(tempHistory), {
              access: 'public',
              allowOverwrite: true
            });

            if (!blobUrl && tempBlob?.url) {
              await projectRef.update({ uiBlobUrl: tempBlob.url });
            }
          }
          
          console.log("Converting UI Done");
        }

        console.log("Calculating Actual Credits");
        
        // Calculate remaining credits for prompt fattening (if not in chain mode)
        // Simple formula: (tokens / 10) + 50, rounded up
        let promptFatteningCredits = 0;
        if (!isChainMode && fattenedTokens > 0) {
          promptFatteningCredits = calculateCredits(fattenedTokens);
          await userRef.update({ credits: adminIncrement(-promptFatteningCredits) });
          console.log(`Deducted ${promptFatteningCredits} credits for prompt fattening`);
        }
        
        // Calculate total credits used
        // Screen credits were already deducted per screen
        const totalCreditsUsed = promptFatteningCredits + totalScreenCreditsDeducted;
        
        const actualCredits = {
          promptFattening: promptFatteningCredits,
          imageGeneration: 0, // Not charged separately
          uiGeneration: totalScreenCreditsDeducted,
          htmlToJson: 0, // Included in screen cost
          total: totalCreditsUsed
        };
        
        console.log("Calculating Actual Credits Done");
        
        const newEntry = {
          createdAt: new Date().toISOString(),
          prompt: Array.isArray(prompt) ? prompt : [prompt],
          aiResponse: fattenedMessage ? [fattenedMessage] : [],
          creditUsed: actualCredits.total,
          ui: convertedUI,
          imageHolder: images,
          styleGuide: styleGuide,
        };

        if (isChainMode && history.length > 0) {
          const last = history[history.length - 1];
          last.prompt.push(...newEntry.prompt);
          last.aiResponse.push(...newEntry.aiResponse, chainMessage);
          last.creditUsed += actualCredits.total;
          last.ui = convertedUI;
          last.imageHolder = images;
        } else {
          history.push(newEntry);
        }

        console.log("Updating User Credits, Blob, and Project in parallel");
        
        // Prepare project update data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const baseUpdate: Record<string, any> = {
          updatedAt: new Date(),
          lastUsedPrompt: prompt
        };
        
        const needsBlobUrl = !projectSnap.data()?.uiBlobUrl;
        
        const blobPromise = put(`project-ui/${projectId}.json`, JSON.stringify(history), {
          access: 'public',
          allowOverwrite: true
        });
        
        // Credits already deducted per screen, so we don't need to deduct again
        const parallelOps: Promise<unknown>[] = [
          blobPromise
        ];
        
        if (!needsBlobUrl) {
          parallelOps.push(projectRef.update(baseUpdate));
        }
        
        const results = await Promise.all(parallelOps);
        const blob = results[0] as Awaited<typeof blobPromise>;
        
        if (needsBlobUrl && blob?.url) {
          baseUpdate.uiBlobUrl = blob.url;
          await projectRef.update(baseUpdate);
        }
        
        console.log("Updating User Credits, Blob, and Project Done");

        // Create final UI array with only generated screens (no placeholders)
        // Match the screenList order and filter out any placeholders
        let finalUI = convertedUI;
        if (screenList && screenList.length > 0) {
          // Reorder and filter to match screenList, ensuring no placeholders
          finalUI = screenList
            .map((screenName) => {
              const screenNameLower = screenName.toLowerCase();
              return convertedUI.find(s => s.screen.name.toLowerCase() === screenNameLower);
            })
            .filter((screen): screen is typeof convertedUI[0] => screen !== undefined);
          
          // If we have screens that weren't in screenList, add them at the end
          const addedScreenNames = new Set(finalUI.map(s => s.screen.name.toLowerCase()));
          const additionalScreens = convertedUI.filter(s => !addedScreenNames.has(s.screen.name.toLowerCase()));
          finalUI = [...finalUI, ...additionalScreens];
        }

        // Send final completion event with only generated screens (no placeholders)
        await sendEvent('complete', {
          message: fattenedMessage || chainMessage,
          imageHolder: images,
          ui: finalUI, // Only generated screens, no placeholders
          creditUsed: actualCredits.total,
          creditBreakdown: actualCredits,
          projectName: title,
        });

        console.log("actual credit:", actualCredits.total);
        await unlockProject();
        controller.close();

      } catch (error) {
        console.error('[ERROR]', error);
        try {
          await sendEvent('error', { message: String(error ?? 'Error generating UI') });
        } catch (sendError) {
          console.error('Error sending error event:', sendError);
        }
        await unlockProject();
        controller.close();
      }
      
      // Handle stream cancellation/interruption
      // This ensures project is unlocked if user refreshes or connection is lost
      return () => {
        // Cleanup function called when stream is cancelled
        unlockProject().catch(err => {
          console.error('Error unlocking project during cleanup:', err);
        });
      };
    },
    cancel() {
      // Called when the stream is cancelled (e.g., user refreshes page)
      // Unlock the project
      const projectStateRef = adminDb.doc(`projects/${projectId}`);
      projectStateRef.update({ state: "unlocked" }).catch(err => {
        console.error('Error unlocking project on stream cancel:', err);
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
