/**
 * Gestão de consentimento (LGPD) integrada ao Google Consent Mode v2 e ao
 * Meta Pixel. Compartilhado entre o banner (components/ui/CookieConsent.tsx)
 * e os scripts de analytics (components/analytics/Analytics.tsx).
 */

export const CONSENT_COOKIE = 'ct_consent';

export type ConsentChoice = {
    analytics: boolean;
    marketing: boolean;
};

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
        fbq?: (...args: unknown[]) => void;
    }
}

export function readConsent(): ConsentChoice | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${CONSENT_COOKIE}=`));
    if (!match) return null;
    try {
        return JSON.parse(decodeURIComponent(match.split('=')[1])) as ConsentChoice;
    } catch {
        return null;
    }
}

export function persistConsent(choice: ConsentChoice) {
    const value = encodeURIComponent(JSON.stringify(choice));
    // 6 meses
    document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${60 * 60 * 24 * 180}; SameSite=Lax`;
}

/** Propaga a escolha para Google (Consent Mode v2) e Meta Pixel. */
export function applyConsent(choice: ConsentChoice) {
    if (typeof window === 'undefined') return;

    window.gtag?.('consent', 'update', {
        analytics_storage: choice.analytics ? 'granted' : 'denied',
        ad_storage: choice.marketing ? 'granted' : 'denied',
        ad_user_data: choice.marketing ? 'granted' : 'denied',
        ad_personalization: choice.marketing ? 'granted' : 'denied',
    });

    window.fbq?.('consent', choice.marketing ? 'grant' : 'revoke');
}
