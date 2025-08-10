'use client'
import React, { useState, useEffect, useRef, use } from 'react';
import Screen from "@/components/Screen";
import UserChatItem from "@/components/UserChatItem";
import AiChatItem from "@/components/AiChatItem";
import ProjectPageNavigation from "@/components/ProjectPageNavigation";
import {useExportData} from "@/store/store";
import {useExportModal} from "@/store/store";
import {usePanning, useSelectElement} from "@/store/store";
import {Button} from "@heroui/button";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {RenderRDE} from "@/components/ResizableMovableElement";
import {HtmlElement, htmltype} from "@/types/types";
import {RDEmetadata} from "@/types/types";
import {Hand, SquareMousePointer} from "lucide-react";
import { Renderer } from "@/components/Renderer";
import {jsondata} from "@/utils/newtestjson";
import JsonToHtmlRenderer from "@/components/JsonToHtmlRenderer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { getProjectDetails } from '@/actions/getProjectDetails';

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


    console.log("projectId", projectId);




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
                    const blobRes = await fetch(projectDetails?.blobUrl);
                    const blobData = await blobRes.json();
                    setGeneratedUI(blobData[0]);
                    console.log(blobData[0]);
                    console.log(jsondata);
                }

            }
        };
        fetchProjectDetails();
    }, [projectId, user?.uid]);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

       try {
           if (!prompt.trim()) return; // Prevent empty messages

           // Append the new prompt to the chain
           const updatedChain = chain ? `${chain} → ${prompt}` : prompt;
           setChain(updatedChain);

           // Add user input to chat with a temporary AI response
           setChat((prevChat) => [...prevChat, { userPrompt: prompt, AiResponse: "Generating" }]);
           setPrompt('');
           // Send request to AI API with chained context
           const response = await fetch('/api/generate-ui', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ prompt: updatedChain, previousUI: generatedUI, imageHolder,projectId, uid:user?.uid}), // Pass previous UI state
           });


           //const exportData: {name: string, ui: string}[] = [];

           const data = await response.json();

           // console.log(response)
           //
           // console.log(data)
           // data.ui.forEach((item: {screen: string, ReactFigma: string}) => {
           //     exportData.push({
           //         name: item.screen,
           //         ui: item.ReactFigma // Assuming you want "component" as "ui" in your store
           //     });
           // });
           //
           // useExportData.getState().setExport(exportData);
           //
           // console.log('exportData', useExportData.getState().exportData);

           // Update chat with actual AI response
           setChat((prevChat) =>
               prevChat.map((item, index) =>
                   index === prevChat.length - 1 ? { ...item, AiResponse: data.message || "No response generated" } : item
               )
           );


           // Append the new UI instead of replacing it
           setGeneratedUI(prev => ({
               ...prev,
               ui: [...(data.ui || [])]
           }));
           setImageHolder(data.imageHolder)
           // console.log("date.ui: ",data.ui)
           // console.log("ImageHolder: ",imageHolder)
           // console.log("data: ",data)

           // Clear prompt input

       } catch (error) {
           console.log(error);
           setChat((prevChat) => [
               ...prevChat,
               { userPrompt: prompt, AiResponse: "Error: Unable to generate UI. Please try again later." },
           ]);       }
    };

    const bottomOfChatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomOfChatRef.current) {
            bottomOfChatRef.current.scrollTop = bottomOfChatRef.current.scrollHeight;
        }
    }, [ chat, prompt, generatedUI, sidebarToggle ]);


    return (
        <ProtectedRoute redirectTo="/auth/sign-in">
            <section className={'flex flex-col h-screen'}>
            <ProjectPageNavigation projectId={projectId} sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>
            <div
                className={`hidden transition-all duration-300 inset-0 z-[2000] bg-slate-900/20 backdrop-blur-sm
                    data-[state=open]:animate-in data-[state=closed]:animate-out
                    data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 absolute
                    ${sidebarToggle ? " max-md:block" : "max-md:hidden"} ${sidebarToggle ? "data-state='open'" : "data-state='closed'"}`}
                onClick={() => setSidebarToggle(false)}
            ></div>

            <div className="h-screen bg-gray-100 flex text-black overflow-hidden">
                {/* Sidebar */}
                <div
                    className={`transition-all duration-300 ease-in-out 
              ${sidebarToggle ? "w-1/3 max-w-sm" : "w-0"} 
              bg-gray-100/90 border-black text-black/80 
              relative flex flex-col shadow-lg justify-between 
              max-md:fixed max-md:bottom-0 max-md:h-full max-md:mt-12 
              max-md:bg-white/100 z-[2001] 
              ${sidebarToggle ? "max-md:w-[308px]" : "max-md:w-0"}`}
                    style={{
                        transitionProperty: "width, transform",
                        transform: sidebarToggle ? "translateX(0)" : "translateX(-100%)",
                    }}>
                    {/* Chat History */}
                    <div
                        className={`flex-1 flex-grow flex flex-col w-full h-full
                            overflow-y-auto pt-3 px-3 pb-24 scrollbar-transparent scroll-smooth overscroll-y-contain
                            ${sidebarToggle ? "" : "hidden"}
                            `}
                        ref={bottomOfChatRef}
                    >
                        {chat.map((chatItem, index) => (
                            <div key={index} className={''}>
                                <UserChatItem message={chatItem.userPrompt}/>
                                <AiChatItem message={chatItem.AiResponse}/>
                            </div>
                        ))}
                    </div>

                    {/* Fixed Input Box */}
                    <div
                        className={`flex w-full ${sidebarToggle ? "" : "hidden"} transition-all duration-300 justify-center item-center pb-5 scrollbar-transparent`}>
                        <form onSubmit={handleSubmit} className="flex w-[70%]">
                          <textarea
                              onChange={(e) => setPrompt(e.target.value)}
                              value={prompt}
                              className="rounded-md w-full bg-gray-200 p-4 resize-none focus:outline-none scrollbar-transparent"
                              placeholder="Type your prompt here..."
                          />
                            <div className="flex flex-col justify-end ml-3">
                                <button type="submit"
                                        className="w-8 h-8 rounded-full border flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 hover:bg-slate-600">
                                    ∧
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
                                        className="relative"
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
                                            <div className="flex flex-wrap items-start gap-x-[100px] p-4">
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
                        <div className="p-5 bg-white rounded-xl shadow-md w-80 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800">Export to Figma in 3 Steps</h2>

                            <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                                <li>Copy the JSON syntax using the button below</li>
                                <li>Install the “Design Forge” Figma plugin</li>
                                <li>Paste the JSON in the plugin and render</li>
                            </ol>

                            <Button className="w-full mt-2 bg-black/90 rounded-md text-white py-2">Copy</Button>
                        </div>

                    </div>
                )
            }
        </section>
        </ProtectedRoute>
    );
}
