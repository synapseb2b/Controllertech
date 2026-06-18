/**
 * Helper de rastreamento de eventos de conversão. Dispara para o dataLayer
 * (GTM), gtag (GA4 / Google Ads) e fbq (Meta Pixel) quando disponíveis.
 * É seguro chamar mesmo sem nenhuma tag configurada — vira no-op.
 */

type Params = Record<string, unknown>;

export function trackEvent(event: string, params: Params = {}) {
    if (typeof window === 'undefined') return;

    // GTM dataLayer
    window.dataLayer?.push({ event, ...params });

    // GA4 / Google Ads
    window.gtag?.('event', event, params);

    // Meta Pixel — eventos padrão vão por track, customizados por trackCustom
    const META_STANDARD = new Set(['Lead', 'Contact', 'CompleteRegistration', 'Schedule']);
    if (window.fbq) {
        if (META_STANDARD.has(event)) {
            window.fbq('track', event, params);
        } else {
            window.fbq('trackCustom', event, params);
        }
    }
}

/** Envio de formulário de contato com sucesso. */
export function trackLead(params: Params = {}) {
    trackEvent('Lead', params);
}

/** Conclusão do quiz de recomendação de produto. */
export function trackQuizComplete(params: Params = {}) {
    trackEvent('QuizComplete', params);
}

/** Clique no botão/links de WhatsApp. */
export function trackWhatsAppClick(params: Params = {}) {
    trackEvent('Contact', { method: 'whatsapp', ...params });
}
