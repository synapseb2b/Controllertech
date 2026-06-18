import { ImageResponse } from 'next/og';

// Serve um PNG real em /logo.png para uso nos dados estruturados (JSON-LD
// publisher.logo de Organization/BlogPosting), que referenciam esta URL.
export const contentType = 'image/png';

export function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 24,
                    background: '#0a0a1a',
                    padding: '0 48px',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        width: 96,
                        height: 96,
                        borderRadius: 24,
                        background: 'linear-gradient(135deg, #6366f1, rgba(99,102,241,0.6))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div style={{ width: 38, height: 38, borderRadius: 9, background: 'rgba(255,255,255,0.95)' }} />
                </div>
                <div style={{ display: 'flex', fontSize: 64, fontWeight: 800, color: '#ffffff' }}>
                    Controller<span style={{ color: '#818cf8' }}>Tech</span>
                </div>
            </div>
        ),
        { width: 600, height: 200 }
    );
}
