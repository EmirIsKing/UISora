'use server';

export async function fetchProjectBlobData(blobUrl: string) {
    if (!blobUrl) {
        throw new Error("Blob URL is missing.");
    }

    try {
        // This fetch runs securely on the server with cache: 'no-store'
        const blobRes = await fetch(blobUrl, {
            cache: 'no-store'
        });

        if (!blobRes.ok) {
            // Throw an error or return a specific error object
            throw new Error(`Failed to fetch blob: ${blobRes.statusText}`);
        }

        // Return the parsed JSON data
        return await blobRes.json();

    } catch (error) {
        // Log the error and rethrow or return a structured error
        console.error('Server Action Fetch Error:', error);
        throw new Error('Could not retrieve project data.');
    }
}