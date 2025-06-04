export default async function GetKeywords({ text }: { text: string }) {
    try {
        const yake = await import('yake-wasm');

        const instance = new yake.Yake(1, true)
        const keywords = instance.get_n_best(text, 5)

        const filtered: { raw: string; keyword: string; score: number }[] | [] = keywords.filter(
            (i: { raw: string; keyword: string; score: number }) =>
                i.score > 0.1 && !["app", "store", "ui", "create", "page"].includes(i.keyword.toLowerCase())
        );

        return filtered;
    } catch (error: any) {
        console.error("Error extracting keywords:", error);
        return error;
    }

}
