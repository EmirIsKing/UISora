"use client";

import React, { useState, RefObject } from "react";
import { Button } from "@heroui/button";
// If you created a declaration file, import normally. Otherwise use @ts-ignore
// @ts-expect-error no type
import domtoimage from "dom-to-image-more";

type UiExportProps = {
  screenRef: RefObject<HTMLDivElement | null>;
  projectName?: string;
};

const UiExport: React.FC<UiExportProps> = ({ screenRef, projectName }) => {
  const [isLoading, setIsLoading] = useState(false);

  // copy computed styles of one element to the target element
  const copyComputedStyles = (source: Element, target: HTMLElement) => {
    const cs = window.getComputedStyle(source);
    let cssText = "";
    for (let i = 0; i < cs.length; i++) {
      const prop = cs[i];
      const val = cs.getPropertyValue(prop);
      cssText += `${prop}:${val};`;
    }
    // preserve any inline style on clone (append)
    const prev = target.getAttribute("style") || "";
    target.setAttribute("style", prev + cssText);
  };

  // inline styles for root and all descendants
  const inlineAllStyles = (sourceRoot: HTMLElement, cloneRoot: HTMLElement) => {
    copyComputedStyles(sourceRoot, cloneRoot);

    const sourceEls = Array.from(sourceRoot.querySelectorAll("*"));
    const cloneEls = Array.from(cloneRoot.querySelectorAll("*"));

    // align by index — clone should have same structure
    sourceEls.forEach((srcEl, idx) => {
      const cloneEl = cloneEls[idx] as HTMLElement | undefined;
      if (!cloneEl) return;
      copyComputedStyles(srcEl, cloneEl);

      // remove outlines/shadows/selection on clone
      cloneEl.style.outline = "none";
      cloneEl.style.boxShadow = "none";
      cloneEl.style.userSelect = "none";
      // @ts-expect-error - webkit style
      cloneEl.style.webkitTapHighlightColor = "transparent";
    });
  };

  const waitForImages = (container: HTMLElement) => {
    const imgs = Array.from(container.querySelectorAll("img"));
    return Promise.all(
      imgs.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise<void>((res) => {
          img.addEventListener("load", () => res(), { once: true });
          img.addEventListener("error", () => res(), { once: true });
        });
      })
    );
  };

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const handleExport = async () => {
    if (!screenRef?.current) return;
    setIsLoading(true);

    try {
      // 1) Remove focus and wait a tick so :focus/:active don't apply
      (document.activeElement as HTMLElement | null)?.blur();
      await sleep(80); // give browser a moment to clear focus/active styling

      // 2) Make sure fonts are loaded (avoids fallback font layout)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (document.fonts && (document.fonts as any).ready) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (document.fonts as any).ready;
      }

      const source = screenRef.current!;
      // clone the node (deep)
      const clone = source.cloneNode(true) as HTMLElement;

      // set clone exact dimensions (use scroll sizes to avoid cropping)
      const width = source.scrollWidth;
      const height = source.scrollHeight;
      clone.style.width = `${width}px`;
      clone.style.height = `${height}px`;
      clone.style.boxSizing = "border-box";

      // wrapper placed off-screen to avoid interfering with viewport
      const wrapper = document.createElement("div");
      wrapper.style.position = "fixed";
      wrapper.style.top = "-99999px";
      wrapper.style.left = "0";
      wrapper.style.width = `${width}px`;
      wrapper.style.height = `${Number(height)+20}px`;
      wrapper.style.paddingBottom = "20px";
      wrapper.style.overflow = "visible";
      wrapper.style.zIndex = "999999";

      // add a "no-highlight" override
      const styleEl = document.createElement("style");
      styleEl.innerHTML = `
        * { -webkit-tap-highlight-color: transparent !important; }
        .__no_capture_interactive * { pointer-events: none !important; }
        .__no_capture_interactive { user-select: none !important; outline: none !important; }
      `;
      wrapper.appendChild(styleEl);

      // put clone inside wrapper
      clone.classList.add("__no_capture_interactive");
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      // 3) Inline computed styles for pixel-accurate rendering
      inlineAllStyles(source, clone);

      // 4) Wait for any images in the clone to load
      await waitForImages(clone);

      // small delay to ensure layout stabilizes
      await sleep(60);

      // 5) Render with dom-to-image-more
      const dataUrl = await domtoimage.toPng(wrapper, {
        bgcolor: "#deaff0", // solid background
        width,
        height: height+20,
        quality: 3,
        style: { transform: "scale(1)", transformOrigin: "top left" },
      });

      // download
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `uisora-export-${projectName}.png`;
      a.click();

      // cleanup
      document.body.removeChild(wrapper);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Export failed (see console).");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onPress={handleExport}
      className="flex flex-col !py-9 !px-4 text-black items-center justify-center border border-black rounded-md p-2
        cursor-pointer active:opacity-70 hover:shadow-md transition-all duration-300"
    >
      <span className={`text-sm font-bold text-nowrap ${isLoading ? "hidden" : ""}`}>
        Export UI
      </span>
      <span className={`text-sm text-gray-500 ${isLoading ? "hidden" : ""}`}>
        type: png
      </span>
      <span className={`loader ${isLoading ? "" : "!hidden"}`}></span>
    </Button>
  );
};

export default UiExport;
