"use client";
import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Spinner } from "./ui/spinner";

const GenerateLoader = () => {
  const [stage, setStage] = useState("thinking");

  useEffect(() => {
    // Stage 1: Thinking (90s)
    const t1 = setTimeout(() => {
      setStage("generatingImages");

      // Stage 2: Generating Images (90s)
      const t2 = setTimeout(() => {
        setStage("generatingUI");
      }, 90000);

      return () => clearTimeout(t2);
    }, 90000);

    return () => clearTimeout(t1);
  }, []);

  const isActive = (name: string) => stage === name;
  const isDone = (name: string) =>
    (name === "thinking" && stage !== "thinking") ||
    (name === "generatingImages" && stage === "generatingUI");

  return (
    <div className="flex flex-col gap-4 items-start justify-center p-4 text-md font-medium select-none">

      {/* 1. Thinking */}
      <div className="flex items-center gap-2">
        {isActive("thinking") ? (
          <Spinner className="h-5 w-5" />
        ) : (
          <Check className="h-5 w-5 text-green-500" />
        )}
        <span className={isActive("thinking") ? "animate-pulse" : ""}>
          Thinking
        </span>
      </div>

      {/* 2. Generating Images (only appear after thinking is done) */}
      {stage !== "thinking" && (
        <div className="flex items-center gap-2">
          {isActive("generatingImages") ? (
            <Spinner className="h-5 w-5" />
          ) : isDone("generatingImages") ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : null}
          <span className={isActive("generatingImages") ? "animate-pulse" : ""}>
            Generating images
          </span>
        </div>
      )}

      {/* 3. Generating UI (only appear when previous is done, pulses forever, no check) */}
      {stage === "generatingUI" && (
        <div className="flex items-center gap-2">
          <Spinner className="h-5 w-5" />
          <span className="animate-pulse">Generating UI</span>
        </div>
      )}
    </div>
  );
};

export default GenerateLoader;
