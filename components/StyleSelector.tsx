"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const styles = [
  "Neo-Brutalism",
  "Material Design",
  "Flat Design",
  "Minimal",
  "Retro",
  "Cyberpunk",
  "Glassmorphism",
  "Neumorphism",
  "Claymorphism",
  "Skeuomorphism",

];

interface proptype {
  selectedStyle: string | null;
  setSelectedStyle: (style: string | null) => void;
}

export default function StyleSelector({ selectedStyle, setSelectedStyle }: proptype) {
  return (
    <div className="flex flex-col gap-2 my-2 w-[95%]">
      <ToggleGroup
        type="single"
        value={selectedStyle ?? undefined}
        onValueChange={(val) => setSelectedStyle(val)}
        className="flex flex-wrap gap-1 justify-start! "
      >
        {styles.map((style) => (
          <ToggleGroupItem
            key={style}
            value={style}
            className="
              inline-flex items-center justify-center rounded-md
              px-2 py-0 h-5 text-[10px] leading-none
              border border-black
              text-black dark:text-white
              dark:border-white
              whitespace-nowrap
              transition
              data-[state=on]:bg-purple-blue
              data-[state=on]:text-white
            "
          >
            {style}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
