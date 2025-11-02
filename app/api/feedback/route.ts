'use server';

import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
import { adminDb } from '@/utils/firebaseAdmin';

type FeedbackType = 'feedback' | 'bug' | 'suggestion';

function inferTypeFromBody(body: Record<string, unknown>): FeedbackType {
	if (body?.type === 'bug' || body?.bugTitle || body?.bugDetails) {
		return 'bug';
	}
	if (body?.type === 'suggestion' || body?.suggestion) {
		return 'suggestion';
	}
	return 'feedback';
}

function extractMessage(type: FeedbackType, body: Record<string, unknown>): string {
	if (type === 'bug') {
		const title = (body?.bugTitle ?? '').toString().trim();
		const details = (body?.bugDetails ?? '').toString().trim();
		return [title, details].filter(Boolean).join(' - ');
	}
	if (type === 'suggestion') {
		return (body?.suggestion ?? '').toString().trim();
	}
	return (body?.feedback ?? '').toString().trim();
}

async function parseBody(request: Request): Promise<Record<string, unknown>> {
	const contentType = request.headers.get('content-type') || '';
	try {
		if (contentType.includes('application/json')) {
			return await request.json();
		}
		if (
			contentType.includes('application/x-www-form-urlencoded') ||
			contentType.includes('multipart/form-data')
		) {
			const form = await request.formData();
			return Object.fromEntries(form.entries());
		}
		// Fallback to JSON parse
		return await request.json();
	} catch {
		return {};
	}
}

export async function POST(request: Request) {
	try {
		const body = await parseBody(request);
		const type = inferTypeFromBody(body);
		const message = extractMessage(type, body);

		if (!message) {
			return NextResponse.json(
				{ success: false, message: 'Message is required' },
				{ status: 400 }
			);
		}

		const uid = body?.uid ? String(body.uid) : undefined;
		const screenshot = body?.screenshot ? String(body.screenshot) : undefined;
		const path = body?.path ? String(body.path) : undefined;
		const userAgent = request.headers.get('user-agent') || undefined;
		const referrer = request.headers.get('referer') || undefined;

		const payload = {
			type,
			message,
			uid: uid ?? null,
			screenshot: screenshot ?? null,
			path: path ?? referrer ?? null,
			userAgent: userAgent ?? null,
			status: 'open',
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
		};

		await adminDb.collection('feedback').add(payload);

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('[ERROR] Saving feedback:', error);
		return NextResponse.json(
			{ success: false, message: 'Failed to save feedback' },
			{ status: 500 }
		);
	}
}


