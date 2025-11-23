"use client";

import React,{useState} from 'react';
import { Button } from "@/components/ui/button";
import InputBox from "@/components/projectPage/InputBox";

interface AddScreenProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setGeneratedUI: (ui: any) => void;
    uid: string;
    projectId: string;
    setHideInput: (show: boolean) => void;
    hide: boolean;
}

const AddScreen: React.FC<AddScreenProps> = ({ setGeneratedUI, uid, projectId, setHideInput, hide}) => {

    const [hidden, setHidden] = useState(true)
    const [generating, setGenerating] = useState(false)
    const [prompt, setPrompt] = useState("")
    const [locked, setLocked] = useState(false);

    const handleAddScreen = async (e: React.FormEvent<Element>) => {
        e.preventDefault();

        if (!uid) {
            console.error("User not logged in");
            return;
        }

        setLocked(true);
        setGenerating(true);

        try {
            const response = await fetch('/api/addScreen', {
                method: 'POST',
                body: JSON.stringify({
                    uid,
                    projectId,
                    prompt
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add screen');
            }

            const newScreenData = await response.json();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setGeneratedUI((prevUI: { ui: any; }) => ({
                ...prevUI,
                ui: [...prevUI.ui, { screen: newScreenData.screen, component: newScreenData.component }],
            }));
        } catch (error) {
            console.error(error);
            setGenerating(false);
            setLocked(false);
        }
    };

    return (
        <div hidden={hide} className={'flex flex-col max-w-100 relative  gap-10 '}>
            <Button onClick={()=> {
                setHidden(!hidden);
                setHideInput(hidden);
            }} className={'relative h-165 w-100 flex border-gray-300 flex-col border rounded-md justify-center items-center mt-25 cursor-pointer hover:scale-[1.01] active:scale-[0.99] text-white'}>
                <span className={'font-medium text-xl'}>Add Screen</span>
                <p className={'text-white/60'}>Click here to add a screen</p>
            </Button>
            <div hidden={hidden}>
                <InputBox
                    classname={'p-0 max-md:block! '}
                    styleSelectorHidden={true}  generating={generating || false} handleSubmit={handleAddScreen || (() => {})} prompt={prompt || ""} setPrompt={setPrompt || (() => {})} locked={locked || false}/>
            </div>
        </div>
    );
};

export default AddScreen;
