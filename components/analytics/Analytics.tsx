import Script from 'next/script';

/**
 * Infraestrutura de tráfego pago / analytics — TUDO gateado por variáveis de
 * ambiente. Sem env preenchida, nada é carregado (no-op). O cliente só precisa
 * preencher os IDs em produção. Ver .env.example.
 *
 * Integrado ao Google Consent Mode v2: o consentimento começa "denied" e só é
 * concedido pelo banner LGPD (components/ui/CookieConsent.tsx).
 */

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

const hasGoogle = Boolean(GTM_ID || GA_ID || ADS_ID);

// Define o stub gtag, o estado padrão de consentimento (negado) e reaplica a
// escolha já salva no cookie, antes de qualquer tag do Google carregar.
const CONSENT_DEFAULT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
try{var m=document.cookie.split('; ').find(function(r){return r.indexOf('ct_consent=')===0;});if(m){var c=JSON.parse(decodeURIComponent(m.split('=')[1]));gtag('consent','update',{analytics_storage:c.analytics?'granted':'denied',ad_storage:c.marketing?'granted':'denied',ad_user_data:c.marketing?'granted':'denied',ad_personalization:c.marketing?'granted':'denied'});}}catch(e){}
gtag('js', new Date());
${GA_ID ? `gtag('config','${GA_ID}');` : ''}
${ADS_ID ? `gtag('config','${ADS_ID}');` : ''}
`;

export function Analytics() {
    return (
        <>
            {hasGoogle && (
                <Script id="ct-consent-default" strategy="afterInteractive">
                    {CONSENT_DEFAULT}
                </Script>
            )}

            {(GA_ID || ADS_ID) && (
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID || ADS_ID}`}
                    strategy="afterInteractive"
                />
            )}

            {GTM_ID && (
                <Script id="ct-gtm" strategy="afterInteractive">
                    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
                </Script>
            )}

            {FB_PIXEL_ID && (
                <Script id="ct-meta-pixel" strategy="afterInteractive">
                    {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('consent','revoke');
fbq('init','${FB_PIXEL_ID}');
try{var m=document.cookie.split('; ').find(function(r){return r.indexOf('ct_consent=')===0;});if(m){var c=JSON.parse(decodeURIComponent(m.split('=')[1]));if(c.marketing){fbq('consent','grant');}}}catch(e){}
fbq('track','PageView');`}
                </Script>
            )}
        </>
    );
}

/** <noscript> do GTM — deve ficar logo após a abertura do <body>. */
export function GoogleTagManagerNoScript() {
    if (!GTM_ID) return null;
    return (
        <noscript>
            <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
            />
        </noscript>
    );
}
