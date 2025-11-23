'use client'
import React, { useState, useEffect, useRef, use } from 'react';
import UserChatItem from "@/components/UserChatItem";
import AiChatItem from "@/components/AiChatItem";
import ProjectPageNavigation from "@/components/ProjectPageNavigation";
import {useExportModal} from "@/store/store";
import ZoomPanCanvas, { ZoomPanCanvasHandle } from "@/components/ZoomPanCanvas";
import {HtmlElement} from "@/types/types";
import {jsondata} from "@/utils/newtestjson";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { getProjectDetails } from '@/actions/getProjectDetails';
import AssetExport from '@/components/AssetExport';
import UiExport from '@/components/UiExport';
import UpgradeModal from '@/components/UpgradeModal';
import { SubscriptionStatus } from '@/app/dashboard/projects/page';
import { getSubscriptionStatus } from '@/actions/getSubscriptionStatus';
import { getUserCredits } from '@/actions/getUserCredit';
import getProjectState from '@/actions/getProjectState';
import InputBox from '@/components/projectPage/InputBox';
import SegmentedButtons from '@/components/projectPage/SegmentedButtons';
import UIScreen from "@/components/projectPage/UIScreen";
import {fetchProjectBlobData} from "@/actions/blob";
import AddScreen from "@/components/projectPage/AddScreen";

interface JsonToHtmlRendererProps {

    ui: {
        screen: {
            height: number;
            width: number;
            name: string;
        },
        component: HtmlElement;
    }[]
}

type ChatItemType = {
    userPrompt: string;
    AiResponse: string;
};

interface HtmlEntry {
    screenName: string;
    component: string;
}



export default function Project({ params }: { params: Promise<{ projectId: string }> }) {
    const [prompt, setPrompt] = useState('');
    const [generatedUI, setGeneratedUI] = useState<JsonToHtmlRendererProps>(jsondata);
    const [chat, setChat] = useState<ChatItemType[]>([]);
    //const [isChain, setIsChain] = useState(false)
    const [imageHolder, setImageHolder] = useState<string[]>([]);
    const [sidebarToggle, setSidebarToggle] = useState<boolean>(true);
    const { projectId } = use(params);
    const { exportModal, setExportModal } = useExportModal();
    const { user } = useAuth();
    const screenshotRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<ZoomPanCanvasHandle | null>(null)
    const [selectedStyle, setSelectedStyle] = useState<string | null>("");
    const [HTMLData, setHTMLData] = useState<HtmlEntry[]>([])
    const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
    const [locked, setLocked] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [title, setTitle] = useState("")
    const [hideInput, setHideInput] = useState(false);
   // const [prevUI, setPrevUI] = useState();
    


    useEffect(() => {
        const fetchProjectDetails = async () => {
            if (user?.uid) {
                const projectDetails = await getProjectDetails(user?.uid, projectId);

                const { state } = await getProjectState(projectId);
                if (state === "locked") {
                    setLocked(true)
                } else if (state === "generating") {
                    setGenerating(true) 
                } else {
                    setLocked(false)
                }
                console.log(projectDetails);
                if (projectDetails?.blobUrl) {
                    try {
                        const blobData = await fetchProjectBlobData(projectDetails?.blobUrl)
                        console.log("blobData: ", blobData)
                        // if (!blobRes.ok) {
                        //     console.error('Failed to fetch blob data:', blobRes.status, blobRes.statusText);
                        //     return;
                        // }
                        // const blobData = blobRes
                        // Load the full history
                        if (blobData) {
                            // Set the latest UI
                            setGeneratedUI(blobData[blobData.length - 1] || blobData);


                            // Populate chat history by pairing prompt[i] with aiResponse[i]
                            const chatHistory: ChatItemType[] = [];
                            for (const entry of blobData) {
                                const prompts = Array.isArray(entry.prompt)
                                    ? entry.prompt
                                    : [entry.prompt].filter(Boolean);
                                const responses = Array.isArray(entry.aiResponse)
                                    ? entry.aiResponse
                                    : [entry.aiResponse].filter(Boolean);
                                const count = Math.min(prompts.length, responses.length);
                                for (let i = 0; i < count; i++) {
                                    chatHistory.push({
                                        userPrompt: prompts[i],
                                        AiResponse: responses[i] ?? "No response generated",
                                    });
                                }
                            }
                            setChat(chatHistory);

                            // Set the chain from the last entry if it exists
                            // if (blobData.length > 1) {
                            //     const lastEntry = blobData[blobData.length - 1];
                            //     const lastPromptArray = Array.isArray(lastEntry.prompt)
                            //         ? lastEntry.prompt
                            //         : [lastEntry.prompt].filter(Boolean);
                            //     setChain(lastPromptArray[lastPromptArray.length - 1] || "");
                            // }

                            // Set image holder from the latest entry
                            if (blobData[blobData.length - 1].imageHolder) {
                                setImageHolder(blobData[blobData.length - 1].imageHolder);
                            }
                        }
                        
                    } catch (error) {
                        console.error('Error loading project data:', error);
                    }
                }

            }
        };
        fetchProjectDetails();
    }, [projectId, user?.uid ]);



    useEffect(() => {
        async function loadSub() {
            const token = await user?.getIdToken();
            const result = await getSubscriptionStatus(token);
            setSubscription(result)
        }
            
        loadSub()
            
    }, [ user])
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocked(true)
        setGenerating(true)

       try {
           if (!prompt.trim()) return; // Prevent empty messages

           // Store the current prompt before clearing
           const currentPrompt = prompt + (selectedStyle ? ` Use style: ${selectedStyle}` : "");
           setPrompt('');

           // Add user input to chat with a temporary AI response
           setChat((prevChat) => [...prevChat, { userPrompt: currentPrompt, AiResponse: "Generating..." }]);
            
           const creditCheck = await getUserCredits();
            if (creditCheck == null || creditCheck < 100) {
                setLocked(false)
                setGenerating(false)
                return;
            }
           
           // Send request to AI API with the current prompt (not chained)
           const ui = HTMLData && HTMLData.length > 0 
            ? HTMLData
            : [];
           const token = await user?.getIdToken()
           console.log("ui: ",ui)
           console.log("HTMLData: ", HTMLData)
           // setLocked(false)
           // setGenerating(false)
           //
           // return;
           const response = await fetch('/api/generate-ui', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
                },
               body: JSON.stringify({ prompt: currentPrompt, previousUI: ui, imageHolder, projectId, uid: user?.uid }),
           });

           if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
           }

           // Handle streaming response
           const reader = response.body?.getReader();
           const decoder = new TextDecoder();
           
           if (!reader) {
               throw new Error('No response body');
           }

           let buffer = '';
           let finalMessage = '';
           let finalImageHolder: string[] = imageHolder;
           let finalTitle = title;
           let currentEventType = '';

           while (true) {
               const { done, value } = await reader.read();
               
               if (done) break;

               buffer += decoder.decode(value, { stream: true });
               const lines = buffer.split('\n');
               buffer = lines.pop() || ''; // Keep incomplete line in buffer

               for (let i = 0; i < lines.length; i++) {
                   const line = lines[i];
                   if (line.startsWith('event: ')) {
                       currentEventType = line.substring(7).trim();
                       continue;
                   }
                   
                   if (line.startsWith('data: ')) {
                       const dataStr = line.substring(6).trim();
                       if (!dataStr) continue;
                       
                       try {
                           const data = JSON.parse(dataStr);
                           
                           // Handle different event types based on currentEventType
                           // Note: promptFattening events are no longer sent - message comes with complete event
                           if (currentEventType === 'emptyScreens') {
                               // Empty screens with titles - show immediately
                               if (data.screens && Array.isArray(data.screens)) {
                                   setGeneratedUI({ ui: [...data.screens] });
                                   console.log(`Showing ${data.screens.length} empty screens with titles`);
                               }
                           } else if (currentEventType === 'status') {
                               // Status update - could show in UI if needed
                               console.log('Status:', data.message);
                           } else if (currentEventType === 'screen' || data.screen) {
                               // New screen generated - update UI immediately
                               const screenData = data.screen;
                               
                               // Helper function to check if a screen is a placeholder
                               const isPlaceholder = (screen: { component?: { content?: Array<string | unknown> } }) => {
                                   const content = screen.component?.content;
                                   if (Array.isArray(content)) {
                                       const textContent = content
                                           .filter((item): item is string => typeof item === 'string')
                                           .join(' ');
                                       return textContent.includes('Generating...') || textContent.includes('Screen - Generating') || textContent.includes('Screen Is Generating');
                                   }
                                   return false;
                               };
                               
                               // Use allScreens if provided (includes empty placeholders for unrendered screens)
                               if (data.allScreens && Array.isArray(data.allScreens)) {
                                   // Filter out placeholder screens and update with generated screens only
                                   const filteredScreens = data.allScreens.filter((screen: { component?: { content?: Array<string | unknown> } }) => !isPlaceholder(screen));
                                   setGeneratedUI({ ui: filteredScreens });
                                   console.log(`Screen ${(data.index ?? 0) + 1}/${data.total ?? data.allScreens.length} generated: ${screenData.screen.name}`);
                               } else if (screenData) {
                                   // Fallback: update incrementally, replacing placeholders
                                   setGeneratedUI((prevUI) => {
                                       const existingIndex = prevUI.ui.findIndex(
                                           s => s.screen.name.toLowerCase() === screenData.screen.name.toLowerCase()
                                       );
                                       
                                       const newUI = [...prevUI.ui];
                                       if (existingIndex >= 0) {
                                           // Replace the empty placeholder or existing screen
                                           newUI[existingIndex] = screenData;
                                       } else {
                                           // Add new screen (shouldn't happen if empty screens were sent first)
                                           newUI.push(screenData);
                                       }
                                       
                                       // Remove any remaining placeholder screens
                                       const filtered = newUI.filter(screen => !isPlaceholder(screen));
                                       return { ui: filtered };
                                   });
                                   console.log(`Screen generated: ${screenData.screen.name}`);
                               }
                           } else if (currentEventType === 'complete') {
                               // Generation complete - always replace UI to remove any placeholders
                               finalMessage = data.message || finalMessage;
                               finalImageHolder = data.imageHolder || finalImageHolder;
                               finalTitle = data.projectName || finalTitle;
                               
                               // Update chat with final message
                               setChat((prevChat) => {
                                   const newChat = [...prevChat];
                                   if (newChat.length > 0) {
                                       newChat[newChat.length - 1] = {
                                           ...newChat[newChat.length - 1],
                                           AiResponse: finalMessage || "UI generation complete"
                                       };
                                   }
                                   return newChat;
                               });
                               
                               // Always replace UI with final generated screens (no placeholders)
                               // Helper function to check if a screen is a placeholder
                               const isPlaceholder = (screen: { component?: { content?: Array<string | unknown> } }) => {
                                   const content = screen.component?.content;
                                   if (Array.isArray(content)) {
                                       const textContent = content
                                           .filter((item): item is string => typeof item === 'string')
                                           .join(' ');
                                       return textContent.includes('Generating...') || textContent.includes('Screen - Generating') || textContent.includes('Screen Is Generating');
                                   }
                                   return false;
                               };
                               
                               if (data.ui && Array.isArray(data.ui)) {
                                   // Filter out any placeholder screens that might have "Generating..." text
                                   const filteredUI = data.ui.filter((screen: { component?: { content?: Array<string | unknown> } }) => !isPlaceholder(screen));
                                   setGeneratedUI({ ui: filteredUI.length > 0 ? filteredUI : data.ui });
                               } else {
                                   // If no UI data, clear any existing placeholders
                                   setGeneratedUI((prevUI) => {
                                       const filtered = prevUI.ui.filter((screen) => !isPlaceholder(screen));
                                       return { ui: filtered };
                                   });
                               }
                               setImageHolder(finalImageHolder);
                               setTitle(finalTitle);
                           } else if (currentEventType === 'error') {
                               // Handle errors
                               throw new Error(data.message || 'An error occurred during generation');
                           }
                       } catch (parseError) {
                           console.error('Error parsing SSE data:', parseError, 'Data:', dataStr);
                       }
                   } else if (line === '') {
                       // Empty line indicates end of event, reset event type
                       currentEventType = '';
                   }
               }
           }

       } catch (error) {
           console.log(error);
           setChat((prevChat) =>
               prevChat.map((item, index) =>
                   index === prevChat.length - 1 ? { ...item, AiResponse: `Error: ${error instanceof Error ? error.message : "Unable to generate UI. Please try again later."}` } : item
               )
           );
       } finally{
        setLocked(false)
        setGenerating(false)
       }
    };

    const bottomOfChatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomOfChatRef.current) {
            bottomOfChatRef.current.scrollTop = bottomOfChatRef.current.scrollHeight;
        }
    }, [ chat, prompt, generatedUI, sidebarToggle ]);


    return (
        <ProtectedRoute redirectTo={`/project/view/${projectId}`}>
            <section className={'flex flex-col h-screen'}>
                <ProjectPageNavigation title={title} projectId={projectId} sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>
            <div className='max-md:hidden'>
                <InputBox hideInput={hideInput} prompt={prompt} generating={generating} sidebartoggle={sidebarToggle} setSelectedStyle={setSelectedStyle} locked={locked} handleSubmit={handleSubmit} selectedStyle={selectedStyle} setPrompt={setPrompt}/>
            </div>
                <SegmentedButtons setSidebarToggle={setSidebarToggle} sidebarToggle={sidebarToggle}/>
            
            <div
                className={`hidden transition-all duration-300 inset-0 z-[2000] bg-slate-900/20 backdrop-blur-sm
                    data-[state=open]:animate-in data-[state=closed]:animate-out
                    data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 absolute
                    ${sidebarToggle ? " max-md:block" : "max-md:hidden"} ${sidebarToggle ? "data-state='open'" : "data-state='closed'"}`}
                onClick={() => setSidebarToggle(false)}
            ></div>

            <div className="h-screen bg-[#212121] flex text-black overflow-hidden">
                {/* Sidebar */}
                <div
                    className={`transition-all duration-300 ease-in-out 
              ${sidebarToggle ? "w-1/3 max-w-sm" : "w-0"} 
              bg-[#212121] border-w hite 
              relative flex flex-col shadow-lg shadow-r-white justify-between 
              max-md:fixed max-md:bottom-0 h-[85%] rounded-br-lg max-md:h-full max-md:mt-12 
            z-[2001] 
              ${sidebarToggle ? "max-md:w-full" : "max-md:w-0"}`}
                    style={{
                        transitionProperty: "width, transform",
                        transform: sidebarToggle ? "translateX(0)" : "translateX(-100%)",
                    }}>
                    {/* Chat History */}
                    <div
                        className={`flex-1 flex-grow flex border flex-col w-full h-full
                            rounded-br-lg
                            max-md:mb-26
                            overflow-y-auto pt-3 px-3 pb-24 max-md:pt-12 scrollbar-transparent scroll-smooth overscroll-y-contain
                            ${sidebarToggle ? "" : "hidden"}
                            `}
                        ref={bottomOfChatRef}
                    >
                        {chat.map((chatItem, index) => (
                            <div key={index} className={''}>
                                <UserChatItem message={chatItem.userPrompt} email={user?.email || 'User'}/>
                                <AiChatItem message={chatItem.AiResponse}/>
                            </div>
                        ))}
                    </div>

                    <div className='hidden max-md:block'>
                        <InputBox hideInput={hideInput} prompt={prompt} sidebartoggle={sidebarToggle} generating={generating} setSelectedStyle={setSelectedStyle} locked={locked} handleSubmit={handleSubmit} selectedStyle={selectedStyle} setPrompt={setPrompt}/>
                    </div>
                    
                </div>

                {/* Main Content */}
                <div className="flex flex-1 relative overflow-hidden">
                  <div className={'relative w-full h-full'}>
                    <div className="absolute top-4 left-4 z-50 flex gap-2">
                      <button onClick={() => canvasRef.current?.zoomIn()} className="px-2 py-1 bg-white shadow rounded font-semibold">+</button>
                      <button onClick={() => canvasRef.current?.zoomOut()} className="px-2 py-1 bg-white shadow rounded font-semibold">-</button>
                      <button onClick={() => canvasRef.current?.reset()} className="px-2 py-1 bg-white shadow rounded font-semibold">Reset</button>

                    </div>

                    <ZoomPanCanvas ref={canvasRef} panningEnabled={true} initialScale={0.3} minScale={0.05} maxScale={10}>
                      <div
                        //onClick={()=> { setSelected("none"); }}
                      >
                        <div ref={screenshotRef} className='no-highlight'>
                          <div className="flex flex-nowrap items-start gap-x-[100px] p-4 ">
                            {generatedUI.ui.map((item , index: number) => {
                              const screenWidth = item.screen.width || 280;
                              const screenHeight = item.screen.height || 540;

                              return (
                                <div
                                  key={index}
                                  style={{
                                    width: `${screenWidth}px`,
                                    height: `${screenHeight}px`,
                                    flexShrink: 0,
                                    position: 'relative'
                                  }}
                                  onClick={(e)=>{ e.stopPropagation(); }}
                                  onDoubleClick={(e)=>{ e.stopPropagation(); }}
                                >
                                    <UIScreen hideNonExport={exportModal} projectId={projectId} uid={user?.uid || ""} hideMainInput={hideInput} setHideInput={setHideInput} setHTMLData={setHTMLData} item={item} HTMLData={HTMLData} />
                                </div>
                              );
                            })}
                              <AddScreen hide={exportModal} setHideInput={setHideInput} setGeneratedUI={setGeneratedUI} projectId={projectId} uid={user?.uid || ""} key={"addScreen"} />
                          </div>
                        </div>
                      </div>
                    </ZoomPanCanvas>
                  </div>
                </div>


            </div>
            {
                exportModal && subscription?.subscription?.status === "Active"? (
                    <div
                        onClick={()=>setExportModal(false)}
                        className={'fixed inset-0 flex w-full h-full justify-center items-center backdrop-blur-xs z-[9999]'}>
                        <div className="bg-white text-black rounded-xl shadow-md w-80 flex items-center justify-center gap-4 p-12">
                            <AssetExport assets={imageHolder}/>
                            <UiExport screenRef={screenshotRef}/>
                        </div>

                    </div>
                ) : (
                    <UpgradeModal addon="You <strong>can't Export</strong> in free plan." isOpen={exportModal} setIsOpen={setExportModal}/>
                )
            }
        </section>
        </ProtectedRoute>
    );
}
