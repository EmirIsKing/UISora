"use client"
import React, {Dispatch, SetStateAction, useState} from 'react'
import Screen from "@/components/Screen";
import JsonToHtmlRenderer from "@/components/JsonToHtmlRenderer";
import {HtmlElement} from "@/types/types";

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

    setHTMLData: (html: SetStateAction<string[]>) => void;
    setHideInput: (show: boolean) => void;
    hideMainInput: boolean;
    HTMLData: string[];
}

const UiScreen = ({item,setHTMLData, HTMLData, setHideInput, hideMainInput}:props) => {


    const [prompt, setPrompt] = useState("");
    const [locked, setLocked] = useState(false)
    const [generating, setGenerating] = useState(false)


    const handleSubmit = (e: React.FormEvent<Element>) => {
        e.preventDefault();
    }


    return (
        <Screen hideMainInput={hideMainInput} setHideMainInput={setHideInput} screen={item.screen} prompt={prompt} setPrompt={setPrompt} locked={locked} generating={generating} handleSubmit={handleSubmit}>
            <JsonToHtmlRenderer data={item.component} setHTMLData={setHTMLData} screen={item.screen.name} HTMLData={HTMLData}/>
        </Screen>
    )
}
export default UiScreen
