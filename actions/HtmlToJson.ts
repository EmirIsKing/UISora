import { HTMLToJSON } from "html-to-json-parser";

export default async function HtmlToJson(html: string) {
  try {
    // Merge duplicate style attributes
    // const sanitized = html.replace(/<([a-zA-Z][^\s/>]*)([^>]*)>/g, (full, tagName, attrChunk) => {
    //   const styles: string[] = [];
    //   let remaining = attrChunk;
    //
    //   remaining = remaining.replace(/\sstyle\s*=\s*"([^"]*)"/gi, (_m: unknown, s: string) => {
    //     styles.push(s);
    //     return "";
    //   });
    //   remaining = remaining.replace(/\sstyle\s*=\s*'([^']*)'/gi, (_m: unknown, s: string) => {
    //     styles.push(s);
    //     return "";
    //   });
    //
    //   const mergedStyle = styles.length > 0 ? ` style="${styles.join(";")}"` : "";
    //   return `<${tagName}${remaining}${mergedStyle}>`;
    // });

    console.log("\n htmlToJson: ", html + "\n");
    const result = await HTMLToJSON(html, true);
    return result;
  } catch (error) {
    console.error("HtmlToJson parse error:", error);
    throw error;
  }
}
