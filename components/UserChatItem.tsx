import React from 'react'

const UserChatItem = ({message, email}: {message: string, email: string}) => {
    return (
        <div className="w-full flex justify-end text-left text-white">
            <div className="max-w-[85%] p-2">
                {/* User Icon */}
                <div className='flex justify-end py-1'>
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {email?.charAt(0).toUpperCase()}
                    </div>
                </div>

                {/* Chat Bubble */}
                <div className="bg-white/20 rounded-md p-2 max-w-full break-words whitespace-pre-wrap">
                    {message}
                </div>
            </div>
        </div>

    )
}
export default UserChatItem
