import { ImageResponse } from 'next/og';
import { getPostMeta } from '@/lib/blog';

export const alt = 'Artigo — ControllerTech';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostMeta(slug);
    const title = post?.title ?? 'Blog ControllerTech';
    const category = post?.category ?? 'Gestão Financeira';

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: '#0a0a1a',
                    backgroundImage:
                        'radial-gradient(circle at 80% 0%, rgba(99,102,241,0.35), transparent 55%)',
                    padding: '72px',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 14,
                            background: 'linear-gradient(135deg, #6366f1, rgba(99,102,241,0.6))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <div style={{ width: 18, height: 18, borderRadius: 4, background: 'rgba(255,255,255,0.92)' }} />
                    </div>
                    <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, color: '#ffffff' }}>
                        Controller<span style={{ color: '#818cf8' }}>Tech</span>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div
                        style={{
                            fontSize: 24,
                            fontWeight: 600,
                            color: '#818cf8',
                            textTransform: 'uppercase',
                            letterSpacing: 2,
                        }}
                    >
                        {category}
                    </div>
                    <div style={{ fontSize: 58, fontWeight: 800, color: '#ffffff', lineHeight: 1.12, maxWidth: 1000 }}>
                        {title}
                    </div>
                </div>

                <div style={{ fontSize: 26, color: '#9ca3af' }}>controllertech.com.br/blog</div>
            </div>
        ),
        { ...size }
    );
}
