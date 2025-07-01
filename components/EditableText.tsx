'use client'
import { useState, useRef, useEffect } from 'react';

const EditableText = ({ text, onSave }: {text:string; onSave:(value: string)=>void}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(text);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (value !== text) {
            onSave(value);
        }
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleBlur();
        } else if (e.key === 'Escape') {
            setValue(text);
            setIsEditing(false);
        }
    };

    return (
        <span onDoubleClick={handleDoubleClick}>
            {isEditing ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="border border-gray-300 px-2 py-1 rounded"
                />
            ) : (
                <span className="cursor-pointer">{value.toString()}</span>
            )}
        </span>
    );
};

export default EditableText;