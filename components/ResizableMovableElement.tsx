'use client'
import React, {useState, useRef, useEffect} from 'react'
import {Rnd} from "react-rnd";
import {CSSProperties} from "react";
import {usePanning, useSelectElement} from "@/store/store";
import {RDEmetadata} from "@/types/types";
import DOMPurify from 'dompurify';




const RDE = ({metadata}: {metadata: RDEmetadata}) => {

    const [editable, setEditable] = useState(false);
    const {panning, setPanning} = usePanning();
    const {selected, setSelected} = useSelectElement();
    const [content, setContent] = useState(metadata.content);
    const contentRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState("");

    const [meta, setMeta] = useState({width: metadata.width, height: metadata.height, x: metadata.x , y: metadata.y, id: metadata.id})

    const setPosition = (e: any, direction: any) => {
        setMeta(prevMeta => ({
            ...prevMeta,
            x: direction.x,
            y: direction.y,
        }));
    };


    useEffect(() => {
        if (contentRef.current && !editable) {
            if (content != null) {
                contentRef.current.innerText = content;
            } else {
                contentRef.current.innerText = "";
            }
        }

        if (selected !== metadata.id) handleBlur()
        if (editable && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select(); // Select all text by default
        }

    }, [content, editable, selected]);

    const handleBlur = () => {
        if (contentRef.current) {
            setContent(contentRef.current.innerText);
            setEditable(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleBlur();
        }
        if (e.key === 'Escape') {
            setContent(metadata.content);
            setEditable(false);
        }
    };

    const setSize = (e :any, direction :any, ref :any, delta :any, position :any) => {
        setMeta(prevMeta => ({
            ...prevMeta,
            width: ref.offsetWidth,
            height: ref.offsetHeight,
        }));
    };
    const clickHandler = () => {
        setPanning(false);
        setSelected(metadata.id);
    }

    const editHandler = () => {
        setEditable(true);
        // Immediate focus without setTimeout
        requestAnimationFrame(() => {
            if (contentRef.current) {
                contentRef.current.focus();
                // Move cursor to end
                const range = document.createRange();
                range.selectNodeContents(contentRef.current);
                range.collapse(false);
                const selection = window.getSelection();
                selection?.removeAllRanges();
                selection?.addRange(range);
            }
        });
    }

    const renderContent = () => {
        switch (metadata.type) {
            case 'input':
                return (
                    <input
                        className={'input'}
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={handleBlur}
                        onDoubleClick={(e) => {
                            if (selected === metadata.id){
                                editHandler()
                            }
                        }}
                        onClick={(e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            clickHandler()
                            editHandler()
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder={metadata.placeholder}
                        style={{
                            width: '100%',
                            height: '100%',
                            outline: 'none',
                            border: 'none',
                            pointerEvents: 'auto', // Always allow pointer events
                            userSelect: editable ? 'text' : 'none',
                            cursor: 'pointer',
                            background: 'transparent',
                            padding: 0,
                            margin: 0,
                            font: 'inherit', // Inherit font styles from metadata
                            ...metadata.style,
                            ...metadata.hoverStyle
                        }}
                    />
                )

            case 'text':
                return (
                    <p
                        className="text"
                        ref={contentRef}
                        contentEditable={editable}
                        suppressContentEditableWarning={true}
                        onDoubleClick={(e) => {
                            if (selected === metadata.id){
                                editHandler()
                            }
                        }}
                        onBlur={handleBlur}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                contentRef.current?.blur();
                            }
                        }}
                        dangerouslySetInnerHTML={{ __html: content }}
                        style={{
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'auto', // Always allow pointer events
                            userSelect: editable ? 'text' : 'none',
                            outline: 'none',
                            cursor: editable ? 'text' : 'default',
                            ...metadata.style,
                            ...(editable ? metadata.hoverStyle : {})
                        }}
                        // Add mouse down handler to prevent drag interference
                        onMouseDown={(e) => {
                            if (e.detail > 1) { // Double click
                                e.preventDefault();
                            }
                        }}
                        onClick={(e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            clickHandler()
                            editHandler()
                        }}
                    />
                );

            case 'image':
                return (
                    <div
                        className={'image'}
                        style={{
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'auto', // Always allow pointer events
                            userSelect: editable ? 'text' : 'none',
                            outline: 'none',
                            cursor: 'pointer',
                            backgroundImage: `url(${metadata.src || metadata.source})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            ...metadata.style,
                            ...metadata.hoverStyle
                        }}
                        onDoubleClick={(e) => {
                            if (selected === metadata.id){
                                editHandler()
                            }
                        }}
                    />
                );

            case 'button':
                return (
                    <button
                        className="editable-button"
                        ref={contentRef as unknown as React.RefObject<HTMLButtonElement>}
                        contentEditable={editable}
                        suppressContentEditableWarning={true}
                        onDoubleClick={(e) => {
                            if (selected === metadata.id){
                                editHandler()
                            }
                        }}
                        onClick={(e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            clickHandler()
                            editHandler()
                        }}
                        onBlur={handleBlur}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                contentRef.current?.blur();
                            }
                        }}
                        dangerouslySetInnerHTML={{ __html: content }}
                        style={{
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'auto', // Always allow pointer events
                            userSelect: editable ? 'text' : 'none',
                            outline: 'none',
                            cursor: 'pointer',
                            ...metadata.style,
                            backgroundImage: `url(${metadata.src || metadata.source})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            ...(editable ? metadata.hoverStyle : {})
                        }}
                        // Add mouse down handler to prevent drag interference
                        onMouseDown={(e) => {
                            if (e.detail > 1) { // Double click
                                e.preventDefault();
                            }
                        }}
                    />
                );

            case 'card':
                return (
                    <div
                        className={'card min-w-[250px] min-h-[300px]  flex flex-col items-center justify-center gap-3'}
                        ref={contentRef}
                        contentEditable={editable}
                        suppressContentEditableWarning={true}
                        onDoubleClick={(e) => {
                            if (selected === metadata.id){
                                editHandler()
                            }
                        }}
                        onClick={(e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            clickHandler()
                            editHandler()
                        }}
                        onBlur={handleBlur}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleBlur();
                            }
                        }}
                        dangerouslySetInnerHTML={{ __html:content }}
                        style={{
                            width: '100%',
                            height: '100%',
                            pointerEvents: editable ? 'auto' : 'none',
                            outline: 'none',
                            ...metadata.style,
                            ...metadata.hoverStyle
                        }}
                    >
                        <h1>{metadata.content?.title}</h1>
                        <h2>{metadata.content?.subtitle}</h2>

                    </div>
                );

            default:
                return (
                    <div
                        className={'div'}
                        ref={contentRef}
                        contentEditable={editable}
                        suppressContentEditableWarning={true}
                        onDoubleClick={(e) => {
                            if (selected === metadata.id){
                                editHandler()
                            }
                        }}
                        onClick={(e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            clickHandler()
                            editHandler()
                        }}
                        onBlur={handleBlur}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleBlur();
                            }
                        }}
                        dangerouslySetInnerHTML={{ __html:content }}
                        style={{
                            width: '100%',
                            height: '100%',
                            pointerEvents: editable ? 'auto' : 'none',
                            outline: 'none',
                        ...metadata.style,
                            ...metadata.hoverStyle
                        }}
                    />
                );
        }
    };

    return (
        <Rnd
            size={{width: meta.width, height: meta.height}}
            position={{x: meta.x, y: meta.y}}
            style={{zIndex: 50, outline: selected === metadata.id ? '4px solid #2fedea' : 'none'}}
            onDragStop={setPosition}
            onResize={setSize}
            onClick = {(e:any)=> {
                e.stopPropagation()
            }}
            enableResizing={selected === metadata.id}
        >
            {renderContent()}
        </Rnd>
    )
}
export default RDE

export const RenderRDE = ({ metadata }: { metadata: RDEmetadata }) => {
    return (
        <>
            <RDE key={metadata.id} metadata={metadata} />
            {metadata.children?.map((child) => (
                <RenderRDE key={child.id} metadata={child} />
            ))}
        </>
    );
};