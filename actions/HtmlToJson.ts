import { HTMLToJSON } from "html-to-json-parser";

export default async function HtmlToJson(html: string) {
  try {
    if (!html) return {};
    //Merge duplicate style attributes
    const sanitized = html.replace(/<([a-zA-Z][^\s/>]*)([^>]*)>/g, (full, tagName, attrChunk) => {
      const styles: string[] = [];
      let remaining = attrChunk;
    
      remaining = remaining.replace(/\sstyle\s*=\s*"([^"]*)"/gi, (_m: unknown, s: string) => {
        styles.push(s);
        return "";
      });
      remaining = remaining.replace(/\sstyle\s*=\s*'([^']*)'/gi, (_m: unknown, s: string) => {
        styles.push(s);
        return "";
      });

      let isSelfClosing = false;
      if (remaining.trim().endsWith("/")) {
        isSelfClosing = true;
        remaining = remaining.replace(/\/\s*$/, "");
      }
    
      const mergedStyle = styles.length > 0 ? ` style="${styles.join(";")}"` : "";
      return `<${tagName}${remaining}${mergedStyle}${isSelfClosing ? " /" : ""}>`;
    });

    console.log("\n htmlToJson: ", sanitized + "\n");
    const result = await HTMLToJSON(sanitized, true);
    return result;
  } catch (error) {
    console.error("HtmlToJson parse error:", error);
    throw error;
  }
}
