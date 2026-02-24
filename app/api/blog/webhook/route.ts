import { NextRequest, NextResponse } from 'next/server';
// import { revalidatePath } from 'next/cache';

/**
 * Automarticles Webhook Endpoint
 *
 * This API route receives new blog articles from Automarticles.
 * See: https://automarticles.com/
 * "Oferecemos webhooks para você conectar com qualquer ferramenta de blog."
 *
 * SETUP:
 * 1. Add AUTOMARTICLES_WEBHOOK_SECRET to .env.local
 * 2. Configure Automarticles to POST to:
 *    https://controllertech.com.br/api/blog/webhook
 *    with Authorization: Bearer <AUTOMARTICLES_WEBHOOK_SECRET>
 *
 * EXPECTED PAYLOAD (adjust based on actual Automarticles docs):
 * {
 *   title: string;
 *   slug: string;
 *   content: string; // markdown or HTML
 *   description?: string;
 *   category?: string;
 *   tags?: string[];
 *   author?: string;
 *   publishedAt?: string; // ISO date
 * }
 *
 * TODO when integrating:
 * - Validate payload with Zod schema
 * - Transform payload to BlogPost format with frontmatter
 * - Save to content/blog/ directory OR Supabase database
 * - Call revalidatePath('/blog') for ISR
 * - Call revalidatePath(`/blog/${slug}`) for the new article
 * - Return the created article URL
 */

export async function POST(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    const webhookSecret = process.env.AUTOMARTICLES_WEBHOOK_SECRET;

    if (!webhookSecret || authHeader !== `Bearer ${webhookSecret}`) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        const payload = await request.json();

        // TODO: Validate payload schema
        // TODO: Transform to BlogPost format
        // TODO: Save to filesystem or database
        // TODO: revalidatePath('/blog');
        // TODO: revalidatePath(`/blog/${payload.slug}`);

        console.log('Automarticles webhook received:', JSON.stringify(payload).slice(0, 200));

        return NextResponse.json({
            success: true,
            message: 'Article received. Processing not yet implemented.',
        });
    } catch (error) {
        console.error('Webhook processing error:', error);
        return NextResponse.json(
            { error: 'Invalid payload' },
            { status: 400 }
        );
    }
}
