import { NextResponse } from 'next/server';

interface IndexNowRequest {
    urls: string[];
}

export async function POST(req: Request) {
    try {
        const { urls }: IndexNowRequest = await req.json();

        if (!urls || !Array.isArray(urls) || urls.length === 0) {
            return NextResponse.json(
                { error: 'Invalid request: "urls" must be an array of URLs.' },
                { status: 400 }
            );
        }

        const payload = {
            host: process.env.NEXT_PUBLIC_SITE_DOMAIN,
            key: process.env.INDEXNOW_KEY,
            keyLocation:"https://uisora.com/d0f92008e4f242838b87f2cf409862e1.txt",
            urlList: urls,
        };

        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await response.json().catch(() => ({}));

        return NextResponse.json({
            success: response.ok,
            status: response.status,
            data,
        });
    } catch (error) {
        console.error('IndexNow error:', error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
