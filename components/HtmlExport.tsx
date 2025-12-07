"use client";

import React,{ useState } from 'react'
import { Button } from "@heroui/button";


interface HtmlEntry {
    screenName: string;
    component: string;
}

type HtmlExportProps = {
  HtmlEntry: HtmlEntry[];
};

const HtmlExport: React.FC<HtmlExportProps> = ({HtmlEntry}) => {

    const [isLoading, setIsLoading] = useState(false);

   const handleExport = async () => {
    if (!HtmlEntry || HtmlEntry.length === 0) {
        alert("No HTML/CSS data to export.");
        return;
    }

    setIsLoading(true);

    try {
        let exportContent = "";
        HtmlEntry.forEach((entry) => {
            exportContent += `<!-- Screen: ${entry.screenName} -->\n`;
            exportContent += `${entry.component}\n\n`;
        });

        // Create file
        const blob = new Blob([exportContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        // Create link
        const link = document.createElement("a");
        link.href = url;
        link.download = "ui-sora-export.txt"; // file name
        document.body.appendChild(link);

        // Trigger download
        link.click();

        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

    } catch (error) {
        console.error("Error exporting HTML/CSS:", error);
        alert("An error occurred while exporting. Please try again.");
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
        HTML/CSS
      </span>
      <span className={`text-sm text-gray-500 ${isLoading ? "hidden" : ""}`}>
        type: txt
      </span>
      <span className={`loader ${isLoading ? "" : "!hidden"}`}></span>
    </Button>
  )
}

export default HtmlExport
