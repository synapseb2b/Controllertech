import { ImageResponse } from 'next/og';

export const alt = 'ControllerTech — Gestão Financeira Inteligente para PMEs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
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
                            width: 56,
                            height: 56,
                            borderRadius: 16,
                            background: 'linear-gradient(135deg, #6366f1, rgba(99,102,241,0.6))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <div style={{ width: 22, height: 22, borderRadius: 5, background: 'rgba(255,255,255,0.92)' }} />
                    </div>
                    <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, color: '#ffffff' }}>
                        Controller<span style={{ color: '#818cf8' }}>Tech</span>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ fontSize: 64, fontWeight: 800, color: '#ffffff', lineHeight: 1.1, maxWidth: 900 }}>
                        Gestão Financeira Inteligente para PMEs
                    </div>
                    <div style={{ fontSize: 30, color: '#a5b4fc', maxWidth: 880 }}>
                        Um CFO Sênior por 1/3 do custo de um CLT. Blindamos seu caixa e recuperamos margem oculta.
                    </div>
                </div>

                <div style={{ fontSize: 26, color: '#9ca3af' }}>controllertech.com.br</div>
            </div>
        ),
        { ...size }
    );
}
