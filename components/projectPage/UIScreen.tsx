"use client"
import React, { SetStateAction, useState} from 'react'
import Screen from "@/components/Screen";
import JsonToHtmlRenderer from "@/components/JsonToHtmlRenderer";
import {HtmlElement} from "@/types/types";

interface HtmlEntry {
    screenName: string;
    component: string;
}


type props = {
    item:  {
        screen: {
            name: string
            width: number
            height: number
        }
        component: HtmlElement
        styleGuide?: unknown
    }

    setHTMLData: (html: SetStateAction<HtmlEntry[]>) => void;
    setHideInput: (show: boolean) => void;
    hideMainInput: boolean;
    HTMLData: HtmlEntry[];
    uid:string;
    projectId:string;
    hideNonExport: boolean;
}

const UiScreen = ({item,setHTMLData, HTMLData, setHideInput, uid, projectId, hideNonExport}:props) => {


    const [prompt, setPrompt] = useState("");
    const [locked, setLocked] = useState(false)
    const [generating, setGenerating] = useState(false)
    const [prevUI, setPrevUI] = useState<string>();
    const [newUI, setNewUI] = useState();
    const [screen, setScreen] = useState();


    const handleSubmit = async (e: React.FormEvent<Element>) => {
        e.preventDefault();
        setLocked(true)
        setGenerating(true)
        try {

            const payload = {
               prompt,
                previousUI: prevUI,
                uid,
                projectId,
                title: item.screen.name
            };

            const res = await fetch('/api/selectedUiEdit', {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            setNewUI(data.component);
            setScreen(data.screen);
            setPrompt("")



        }catch(error) {
            console.error(error)
        } finally {
            setLocked(false)
            setGenerating(false)
        }
    }


    return (
        <Screen hideNonExport={hideNonExport} setHideMainInput={setHideInput} screen={screen || item.screen} prompt={prompt} setPrompt={setPrompt} locked={locked} generating={generating} handleSubmit={handleSubmit}>
            <JsonToHtmlRenderer  setPrevUI={setPrevUI} data={newUI || item.component} setHTMLData={setHTMLData} screen={item.screen.name} HTMLData={HTMLData}/>
        </Screen>
    )
}
export default UiScreen
