import React from 'react'
import Logo from './Logo'
import GenerateLoader from './GenerateLoader'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const AiChatItem = ({ message }: { message: string }) => {
    return (
        <div className="w-full flex justify-start text-left text-white text-base">
            <div className="max-w-[100%] p-2">

                {/* AI Icon */}
                <div className="py-1 flex justify-start">
                    <Logo variant='white' textHidden={true} className='w-7 rounded-full' />
                </div>

                {/* Chat Bubble */}
                <div className="bg-white/2 rounded-md p-3 max-w-full wrap-break-word whitespace-pre-wrap text-white min-h-[50px]">
                    {message === "Generating..." ? (
                        <GenerateLoader />
                    ) : (
                        <div className="prose prose-invert max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {message}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AiChatItem
