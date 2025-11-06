import React from 'react'
import Logo from './Logo'
import GenerateLoader from './GenerateLoader'
import { Message,MessageContent } from './ui/shadcn-io/ai/message'

const AiChatItem = ({message}: {message: string}) => {
    return (
        <div className="w-full flex justify-start text-left text-white text-base">
            <div className="max-w-[100%] p-2">
                {/* AI Icon */}
                <div className="py-1 flex justify-start">
                    <Logo variant='white' textHidden={true} className='w-7 rounded-full'/>
                </div>

                {/* Chat Bubble */}
                <div className="bg-white/2 rounded-md p-2 max-w-full break-words whitespace-pre-wrap text-white min-h-[50px] flex items-center justify-center">
                    {message === "Generating..." ? (<GenerateLoader/>) : (
                        <Message from='assistant'>
                            <MessageContent>{message}</MessageContent>
                        </Message>
                    )}
                </div>
            </div>
        </div>

    )
}
export default AiChatItem
