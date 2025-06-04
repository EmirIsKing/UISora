import React from 'react'
import Image from "next/image";

const UserChatItem = ({message}: {message: string}) => {
    return (
        <div className="w-full flex justify-end text-left">
            <div className="max-w-[70%] p-2">
                {/* User Icon */}
                <div className="py-1 flex justify-end">
                    <Image width={20} height={20} src="/globe.svg" alt="user" />
                </div>

                {/* Chat Bubble */}
                <div className="bg-white/70 rounded-md p-2 max-w-full break-words whitespace-pre-wrap">
                    {message}
                </div>
            </div>
        </div>

    )
}
export default UserChatItem
