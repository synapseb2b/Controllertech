'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { applyConsent, persistConsent, readConsent } from '@/lib/analytics/consent';

export function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const [customizing, setCustomizing] = useState(false);
    const [analytics, setAnalytics] = useState(true);
    const [marketing, setMarketing] = useState(true);

    useEffect(() => {
        if (!readConsent()) setVisible(true);
    }, []);

    const decide = (choice: { analytics: boolean; marketing: boolean }) => {
        persistConsent(choice);
        applyConsent(choice);
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-x-0 bottom-0 z-[100] p-4 md:p-6">
            <div className="mx-auto max-w-3xl rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl p-5 md:p-6 shadow-2xl shadow-black/30">
                <p className="text-sm text-muted-foreground">
                    Usamos cookies para melhorar sua experiência, analisar o tráfego e personalizar
                    anúncios. Você pode aceitar todos, recusar os opcionais ou personalizar suas
                    preferências. Saiba mais na nossa{' '}
                    <Link href="/politica-de-privacidade" className="text-primary hover:underline">
                        Política de Privacidade
                    </Link>
                    .
                </p>

                {customizing && (
                    <div className="mt-4 space-y-3">
                        <label className="flex items-center justify-between gap-4 text-sm text-foreground">
                            <span>
                                <strong>Necessários</strong> — essenciais para o funcionamento do site.
                            </span>
                            <input type="checkbox" checked disabled className="h-4 w-4 accent-primary" />
                        </label>
                        <label className="flex items-center justify-between gap-4 text-sm text-foreground">
                            <span>
                                <strong>Analytics</strong> — nos ajudam a entender como o site é usado.
                            </span>
                            <input
                                type="checkbox"
                                checked={analytics}
                                onChange={(e) => setAnalytics(e.target.checked)}
                                className="h-4 w-4 accent-primary"
                            />
                        </label>
                        <label className="flex items-center justify-between gap-4 text-sm text-foreground">
                            <span>
                                <strong>Marketing</strong> — usados para anúncios e remarketing.
                            </span>
                            <input
                                type="checkbox"
                                checked={marketing}
                                onChange={(e) => setMarketing(e.target.checked)}
                                className="h-4 w-4 accent-primary"
                            />
                        </label>
                    </div>
                )}

                <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <button
                        onClick={() => decide({ analytics: false, marketing: false })}
                        className="rounded-full px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Recusar opcionais
                    </button>
                    {customizing ? (
                        <button
                            onClick={() => decide({ analytics, marketing })}
                            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                        >
                            Salvar preferências
                        </button>
                    ) : (
                        <button
                            onClick={() => setCustomizing(true)}
                            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                        >
                            Personalizar
                        </button>
                    )}
                    <button
                        onClick={() => decide({ analytics: true, marketing: true })}
                        className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition"
                    >
                        Aceitar todos
                    </button>
                </div>
            </div>
        </div>
    );
}
