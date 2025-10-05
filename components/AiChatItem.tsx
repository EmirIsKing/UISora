import React from 'react'
import Image from 'next/image'

const AiChatItem = ({message}: {message: string}) => {
    return (
        <div className="w-full flex justify-start text-left text-base">
            <div className="max-w-[95%] p-2">
                {/* AI Icon */}
                <div className="py-1 flex justify-start">
                    <Image width={20} height={20} src="/globe.svg" alt="AI" />
                </div>

                {/* Chat Bubble */}
                <div className="bg-white/70 rounded-md p-2 max-w-full break-words whitespace-pre-wrap min-h-[50px] flex items-center justify-center">
                    {message === "Generating" ? (<span className="loader"></span>) : message}
                </div>
            </div>
        </div>

    )
}
export default AiChatItem
