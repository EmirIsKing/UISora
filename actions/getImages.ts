export default async function GetImages(query: string) {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=5&orientation=landscape`, {
        headers: {
            Authorization: process.env.PEXELS_API_KEY as string, // Ensure the key is defined
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching images: ${response.statusText}`);
    }

    const data = await response.json();

    return [query, ...data.photos?.map((photo: { src: { landscape: string } }) => photo.src.landscape) || []];
}
