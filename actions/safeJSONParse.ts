/**
 * Attempts to safely extract and parse JSON from model output.
 */
export function safeJSONParse(output: string) {
    // 1. Remove markdown fences like ```json ... ```
    const cleaned = output
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    try {
        return JSON.parse(cleaned);
    } catch {
        // 2. Try to extract substring between first '{' and last '}'
        const start = cleaned.indexOf("{");
        const end = cleaned.lastIndexOf("}");
        if (start !== -1 && end !== -1 && end > start) {
            try {
                return JSON.parse(cleaned.slice(start, end + 1));
            } catch (err2) {
                console.error("JSON parse failed again:", err2);
            }
        }
    }

    // 3. Return raw text if parsing failed completely
    return { raw: output };
}
