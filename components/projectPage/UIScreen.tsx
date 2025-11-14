"use client"
import React,{useState} from 'react'
import Screen from "@/components/Screen";
import JsonToHtmlRenderer from "@/components/JsonToHtmlRenderer";

const UiScreen = ({item,setHTMLData, HTMLData, setHideInput, hideMainInput}) => {


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
