'use client'
import React, { useState, useEffect, useRef, use } from 'react';
import Screen from "@/components/Screen";
import UserChatItem from "@/components/UserChatItem";
import AiChatItem from "@/components/AiChatItem";
import ProjectPageNavigation from "@/components/ProjectPageNavigation";
import {useExportData} from "@/store/store";
import {useExportModal} from "@/store/store";
import {usePanning, useSelectElement} from "@/store/store";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {HtmlElement} from "@/types/types";
import {Hand, SquareMousePointer} from "lucide-react";
import {jsondata} from "@/utils/newtestjson";
import JsonToHtmlRenderer from "@/components/JsonToHtmlRenderer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { getProjectDetails } from '@/actions/getProjectDetails';
import AssetExport from '@/components/AssetExport';
import UiExport from '@/components/UiExport';
import { Send } from 'lucide-react';
import StyleSelector from '@/components/StyleSelector';

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


export default function Project({ params }: { params: Promise<{ projectId: string }> }) {
    const [prompt, setPrompt] = useState('');
    const [generatedUI, setGeneratedUI] = useState<JsonToHtmlRendererProps>(jsondata);
    const [chat, setChat] = useState<ChatItemType[]>([]);
    const [chain, setChain] = useState('')
    const [imageHolder, setImageHolder] = useState([]);
    const [sidebarToggle, setSidebarToggle] = useState<boolean>(true);
    const { projectId } = use(params);
    const { exportModal, setExportModal } = useExportModal();
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const {panning, togglePanning, setPanning} = usePanning();
    const [panningOn, setPanningOn] = useState()
    const [startPan, setStartPan] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const {setSelected, selection} = useSelectElement()
    const { user } = useAuth();
    const screenshotRef = useRef<HTMLDivElement>(null)
    const [selectedStyle, setSelectedStyle] = useState<string | null>("");


    interface ScreenConfig {
        screen: {
            name: string;
            width: number;
            height: number;
        };
        component: HtmlElement[]; // Can be either a component or array of elements
    }

// Define interface for the entire test data
    interface TestData {
        ui: ScreenConfig[];
        message: string;
    }

    interface MetaData {
        ui: ScreenConfig[];
    }

    useEffect(() => {
        const fetchProjectDetails = async () => {
            if (user?.uid) {
                const projectDetails = await getProjectDetails(user?.uid, projectId);
                console.log(projectDetails);
                if (projectDetails?.blobUrl) {
                    try {
                        const blobRes = await fetch(projectDetails?.blobUrl);
                        if (!blobRes.ok) {
                            console.error('Failed to fetch blob data:', blobRes.status, blobRes.statusText);
                            return;
                        }
                        const blobData = await blobRes.json();
                    
                        // Load the full history
                        if (blobData && blobData.length > 0) {
                            // Set the latest UI
                            setGeneratedUI(blobData[blobData.length - 1]);
                            
                            // Populate chat history from all entries
                            const chatHistory = blobData.map((entry: any) => ({
                                userPrompt: entry.prompt,
                                AiResponse: entry.aiResponse || "No response generated"
                            }));
                            setChat(chatHistory);
                            
                            // Set the chain from the last entry if it exists
                            if (blobData.length > 1) {
                                const lastEntry = blobData[blobData.length - 1];
                                setChain(lastEntry.prompt);
                            }
                            
                            // Set image holder from the latest entry
                            if (blobData[blobData.length - 1].imageHolder) {
                                setImageHolder(blobData[blobData.length - 1].imageHolder);
                            }
                        }
                        
                        console.log('Loaded blob data:', blobData);
                    } catch (error) {
                        console.error('Error loading project data:', error);
                    }
                }

            }
        };
        fetchProjectDetails();
    }, [projectId, user?.uid]);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

       try {
           if (!prompt.trim()) return; // Prevent empty messages

           // Store the current prompt before clearing
           const currentPrompt = prompt + (selectedStyle ? ` Use style: ${selectedStyle}` : "");
           setPrompt('');

           // Add user input to chat with a temporary AI response
           setChat((prevChat) => [...prevChat, { userPrompt: currentPrompt, AiResponse: "Generating..." }]);
           
           // Send request to AI API with the current prompt (not chained)
           const response = await fetch('/api/generate-ui', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ prompt: currentPrompt, previousUI: generatedUI, imageHolder, projectId, uid: user?.uid }),
           });

           const data = await response.json();

           // Update chat with actual AI response
           setChat((prevChat) =>
               prevChat.map((item, index) =>
                   index === prevChat.length - 1 ? { ...item, AiResponse: data.message || "No response generated" } : item
               )
           );

           // Update the UI with the new generated UI
           setGeneratedUI(data.ui || jsondata);
           setImageHolder(data.imageHolder || []);

       } catch (error) {
           console.log(error);
           setChat((prevChat) =>
               prevChat.map((item, index) =>
                   index === prevChat.length - 1 ? { ...item, AiResponse: "Error: Unable to generate UI. Please try again later." } : item
               )
           );
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
            <ProjectPageNavigation projectId={projectId} sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>
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

                    {/* Fixed Input Box */}
                    <div className='w-full flex text-white'>
                        <StyleSelector selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle}/>
                    </div>
                    <div
                        className={`flex w-full ${sidebarToggle ? "" : "hidden"} transition-all duration-300 justify-center item-center pb-5 scrollbar-transparent max-md:pt-3`}>
                            
                        <form onSubmit={handleSubmit} className="flex w-[75%] max-md:w-[83%]">
                          <textarea
                              onChange={(e) => setPrompt(e.target.value)}
                              value={prompt}
                              className="rounded-md w-full bg-[#303030] p-4 resize-none focus:outline-none scrollbar-transparent text-white"
                              placeholder="Type your prompt here..."
                          />
                            <div className="flex flex-col justify-end ml-3">
                                <button type="submit"
                                        className="w-[36px] cursor-pointer h-[36px] rounded-full border flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 hover:bg-slate-600">
                                    <Send className='text-white w-[20px]'/>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-1 relative overflow-hidden">
                <TransformWrapper
                    minScale={0.1}
                    maxScale={6}
                    initialScale={1}
                    wheel={{ step: 0.2 }}
                    panning={{disabled: panning}}
                    doubleClick={{ disabled: true }}
                    zoomAnimation={{
                        animationType: 'easeOut',
                        animationTime: 400,
                    }}
                    centerOnInit={true}
                    limitToBounds={false}
                >
                    {({ zoomIn, zoomOut, resetTransform, centerView }) =>
                        (
                            <div className={'relative w-full h-full'}>
                                <div className="absolute top-4 left-4 z-50 flex gap-2">
                                    <button onClick={() => zoomIn()} className="px-2 py-1 bg-white shadow rounded font-semibold">+</button>
                                    <button onClick={() => zoomOut()} className="px-2 py-1 bg-white shadow rounded font-semibold">-</button>
                                    <button onClick={() => centerView()} className="px-2 py-1 bg-white shadow rounded font-semibold">Reset</button>
                                    <button onClick={()=> togglePanning()} className={`px-2 py-1 shadow rounded ${panning ? "bg-white" : "bg-gray-600/30"}`}><Hand/></button>
                                    <button onClick={()=>setPanning(false)} className={`px-2 py-1 shadow rounded ${selection ? "bg-gray-600/30" : "bg-white"}`}><SquareMousePointer/></button>


                                </div>

                                <TransformComponent
                                    wrapperStyle={{ width: '100%', height: '100%' }}
                                    contentClass={'grid-background active:cursor-grabbing'}
                                >
                                    <div
                                        className="relative bg-[#1e1e1e]"
                                        style={{ width: '1000000px', height: '1000000px' }}
                                        onClick={()=> {
                                            setPanning(true)
                                            setSelected("none");
                                        }}
                                        
                                    >
                                        <div
                                            
                                            className="absolute"
                                            style={{
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                        >

                                                {/*{generatedUI.map((item, i) => (*/}
                                                {/*    <Screen screen={item.screen} key={i} component={item.component} />*/}
                                                {/*))}*/}

                                            {/*<div className="flex flex-wrap items-start gap-x-[50px] p-4">*/}
                                            {/*    {testData.ui.map((item, index) => {*/}
                                            {/*        const screenWidth = item.screen.width || 280;*/}
                                            {/*        const screenHeight = item.screen.height || 540;*/}

                                            {/*        return (*/}
                                            {/*            <div*/}
                                            {/*                key={index}*/}
                                            {/*                style={{*/}
                                            {/*                    width: `${screenWidth}px`,*/}
                                            {/*                    minHeight: `${screenHeight}px`,*/}
                                            {/*                    flexShrink: 0*/}
                                            {/*                }}*/}
                                            {/*            >*/}
                                            {/*                <Screen screen={item.screen.name}>*/}
                                            {/*                    {item.component.map((element) => (*/}
                                            {/*                        <RDE key={element.id} metadata={element} />*/}
                                            {/*                    ))}*/}
                                            {/*                </Screen>*/}
                                            {/*            </div>*/}
                                            {/*        );*/}
                                            {/*    })}*/}
                                            {/*</div>*/}
                                            {/*prev use*/}
                                            <div  ref={screenshotRef} className='no-highlight'>
                                            <div  className="flex flex-wrap items-start gap-x-[100px] p-4">
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
                                                                position: 'relative' // Important for absolute positioning of children
                                                            }}
                                                            onClick={(e)=>{
                                                                e.stopPropagation();
                                                            }}
                                                            onDoubleClick={(e)=>{
                                                                e.stopPropagation();
                                                            }}
                                                        >
                                                            <Screen screen={item.screen}>
                                                                    <JsonToHtmlRenderer data={item.component} />
                                                            </Screen>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            </div>

                                            {/*{uiElements.map((item, i) => (*/}
                                            {/*    <RDE key={i} metadata={item}/>*/}
                                            {/*))}*/}
                                        </div>
                                    </div>
                                </TransformComponent>
                            </div>
                        )
                    }
                </TransformWrapper>
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
        </ProtectedRoute>
    );
}
