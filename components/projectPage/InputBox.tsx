import React from 'react'
import StyleSelector from '../StyleSelector'
import { PromptInput, PromptInputTextarea, PromptInputToolbar, PromptInputSubmit } from '../ui/shadcn-io/ai/prompt-input'

interface Props {
  prompt: string;
  handleSubmit: (e: React.FormEvent<Element>) => void;
  setPrompt: (value: string) => void;
  selectedStyle: string | null;
  setSelectedStyle: (value: string | null) => void;
  sidebartoggle: boolean;
  locked: boolean;
  generating: boolean;
}

const InputBox = ({
  prompt,
  handleSubmit,
  setPrompt,
  selectedStyle,
  setSelectedStyle,
  locked,
  sidebartoggle,
  generating
}: Props) => {
  return (
    <div
      className={`
        absolute left-[calc(50%+90px)] max-md:left-[calc(50%-0.5px)] -translate-x-1/2 bottom-5 max-md:bottom-0 max-md:shadow-none! w-full max-w-2xl px-4
        max-md:px-0 z-2200
        transition-all duration-300 ease-in-out
        ${sidebartoggle ? "max-md:opacity-100 max-md:translate-y-0" : "max-md:opacity-0 max-md:translate-y-4 max-md:pointer-events-none"}
      `}
    >
      <div
        className={`
          w-full flex text-white justify-center transition-all duration-300 ease-in-out max-md:backdrop-blur-md
          ${sidebartoggle ? "max-md:opacity-100 max-md:translate-y-0" : "max-md:opacity-0 max-md:-translate-y-2 max-md:pointer-events-none"}
        `}
      >
        <StyleSelector selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle} />
      </div>

      <PromptInput
        onSubmit={handleSubmit}
        className={`flex bg-[#303030]! text-white justify-center items-center 
            pb-16 max scrollbar-transparent transition-all duration-300
            max-md:border-t-white/20
            max-md:border-l-0
            max-md:border-r-0
            max-md:border-b-0
            max-md:rounded-b-none

            `}
      >
        <PromptInputTextarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={!locked ? "Type your message..." : generating ? "Generating..." : "Please wait..."}
          disabled={locked}
          className="text-white"
        />
        <PromptInputToolbar>
          <PromptInputSubmit
            disabled={!prompt.trim() || locked}
            className="bg-linear-to-r cursor-pointer! from-blue-400 to-purple-600 hover:bg-slate-600 transition-all duration-300"
            status={generating ? "submitted" : "ready"}
          />
        </PromptInputToolbar>
      </PromptInput>
    </div>
  )
}

export default InputBox
