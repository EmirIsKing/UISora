'use client'
import React, { useState, useEffect, useRef, use } from 'react';
import Screen from "@/components/Screen";
import UserChatItem from "@/components/UserChatItem";
import AiChatItem from "@/components/AiChatItem";
//import ProjectPageNavigation from "@/components/ProjectPageNavigation";
//import {useExportData} from "@/store/store";
import {useExportModal} from "@/store/store";
import {useSelectElement} from "@/store/store";
// Removed react-zoom-pan-pinch in favor of a custom mobile-friendly canvas
import ZoomPanCanvas, { ZoomPanCanvasHandle } from "@/components/ZoomPanCanvas";
import {HtmlElement} from "@/types/types";
import {jsondata} from "@/utils/newtestjson";
import JsonToHtmlRenderer from "@/components/JsonToHtmlRenderer";
//import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
//import { getProjectDetails } from '@/actions/getProjectDetails';
import AssetExport from '@/components/AssetExport';
import UiExport from '@/components/UiExport';
//import { Send } from 'lucide-react';
import ProjectViewNavigation from "@/components/projectView/ProjectViewNavigation";
import {getProjectViewDetails} from "@/components/projectView/actions/getProjectViewDetails";


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


export default function ProjectView({ params }: { params: Promise<{ projectId: string }> }) {
    const [generatedUI, setGeneratedUI] = useState<JsonToHtmlRendererProps>(jsondata);
    const [chat, setChat] = useState<ChatItemType[]>([]);
    const [imageHolder, setImageHolder] = useState([]);
    const [sidebarToggle, setSidebarToggle] = useState<boolean>(true);
    const { projectId } = use(params);
    const { exportModal, setExportModal } = useExportModal();
    // const [zoom, setZoom] = useState(1);
    // const [offset, setOffset] = useState({ x: 0, y: 0 });
    // const [panningOn, setPanningOn] = useState()
    // const [startPan, setStartPan] = useState({ x: 0, y: 0 });
    // const containerRef = useRef(null);
    const {setSelected} = useSelectElement()
    const { user } = useAuth();
    const screenshotRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<ZoomPanCanvasHandle | null>(null);
    

    // interface ScreenConfig {
    //     screen: {
    //         name: string;
    //         width: number;
    //         height: number;
    //     };
    //     component: HtmlElement[]; // Can be either a component or array of elements
    // }

// Define interface for the entire test data
    // interface TestData {
    //     ui: ScreenConfig[];
    //     message: string;
    // }

    // interface MetaData {
    //     ui: ScreenConfig[];
    // }

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const projectDetails = await getProjectViewDetails(projectId);

                if (!projectDetails) {
                    console.error("Project not found.");
                    return;
                }

                if (projectDetails && "settings" in projectDetails) {
                    const visibility = projectDetails.settings?.visibility;
                    const blobUrl = projectDetails.blobUrl;
                    if (visibility === "public" || blobUrl) {
                        const blobRes = await fetch(blobUrl, {cache: 'no-store'});
                        if (!blobRes.ok) {
                            console.error("Failed to fetch blob data:", blobRes.status, blobRes.statusText);
                            return;
                        }

                        const blobData = await blobRes.json();

                        if (Array.isArray(blobData) && blobData.length > 0) {
                            // Set the latest UI
                            setGeneratedUI(blobData[blobData.length - 1]);

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

                            // Set image holder from latest entry if exists
                            const latestEntry = blobData[blobData.length - 1];
                            if (latestEntry.imageHolder) {
                                setImageHolder(latestEntry.imageHolder);
                            }
                        }

                        console.log("Loaded blob data:", blobData);
                    } else {
                        console.error("Project is private or cannot be found.");
                    }
                    }



                // Allow fetch if blobUrl exists OR project is public

            } catch (error) {
                console.error("Error loading project:", error);
            }
        };

        if (projectId) fetchProjectDetails();
    }, [projectId]);




    const bottomOfChatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomOfChatRef.current) {
            bottomOfChatRef.current.scrollTop = bottomOfChatRef.current.scrollHeight;
        }
    }, [ chat, generatedUI, sidebarToggle ]);


    return (
            <section className={'flex flex-col h-screen'}>
            <ProjectViewNavigation projectId={projectId} sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>
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
              max-md:fixed max-md:bottom-0 max-md:h-full max-md:mt-12 
            z-[2001] 
              ${sidebarToggle ? "max-md:w-[308px]" : "max-md:w-0"}`}
                    style={{
                        transitionProperty: "width, transform",
                        transform: sidebarToggle ? "translateX(0)" : "translateX(-100%)",
                    }}>
                    {/* Chat History */}
                    <div
                        className={`flex-1 flex-grow flex border flex-col w-full h-full
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
                        onClick={()=> {
                          setSelected("none");
                        }}
                      >
                        <div ref={screenshotRef} className='no-highlight'>
                          <div className="flex flex-nowrap items-start gap-x-[100px] p-4">
                            {generatedUI.ui.map((item , index: number) => {
                              const screenWidth = item.screen.width || 280;
                              const screenHeight = item.screen.height || 540;

                              return (
                                <div
                                  key={index}
                                  style={{
                                    width: `${screenWidth}px`,
                                    minHeight: `${screenHeight}px`,
                                    flexShrink: 0,
                                    position: 'relative'
                                  }}
                                  onClick={(e)=>{ e.stopPropagation(); }}
                                  onDoubleClick={(e)=>{ e.stopPropagation(); }}
                                >
                                  <Screen screen={item.screen}>
                                    <JsonToHtmlRenderer data={item.component} />
                                  </Screen>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </ZoomPanCanvas>
                  </div>
                </div>


            </div>
            {
                exportModal && (
                    <div
                        onClick={()=>setExportModal(false)}
                        className={'fixed inset-0 flex w-full h-full justify-center items-center backdrop-blur-xs z-[9999]'}>
                        <div className="bg-white rounded-xl shadow-md w-80 flex items-center justify-center gap-4 p-12">
                            <AssetExport assets={imageHolder}/>
                            <UiExport screenRef={screenshotRef}/>
                        </div>

                    </div>
                )
            }
        </section>
    );
}
