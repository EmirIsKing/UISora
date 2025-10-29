"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const styles = [
  "Neo-Brutalism",
  "Material Design",
  "Flat Design",
  "Glassmorphism",
  "Neumorphism",
  "Claymorphism",
  "Skeuomorphism",
  "Minimal",
  "Cyberpunk",
  "Retro",
];

interface proptype {
  selectedStyle: string | null;
  setSelectedStyle: (style: string | null) => void;
}

export default function StyleSelector({ selectedStyle, setSelectedStyle }: proptype) {
  return (
    <div className="flex flex-col gap-2 my-2">
      <ToggleGroup
        type="single"
        value={selectedStyle}
        onValueChange={(val) => setSelectedStyle(val)}
        className="flex flex-wrap gap-1"
      >
        {styles.map((style) => (
          <ToggleGroupItem
            key={style}
            value={style}
            className="
              inline-flex items-center justify-center rounded-full
              px-2 py-0 h-5 text-[10px] leading-none
              border border-black
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
