import type { Metadata } from "next";
import { Manrope } from "next/font/google";
// import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://controllertech.com.br'),
  title: {
    default: 'ControllerTech | Gestão Financeira Inteligente para PMEs',
    template: '%s | ControllerTech',
  },
  description:
    'Você vende bem mas não sabe quanto sobra? A ControllerTech entrega gestão financeira sênior para PMEs — blindamos seu caixa, recuperamos margem oculta e projetamos seu futuro. Sem CLT, sem passivo.',
  keywords: [
    'gestão financeira para PME',
    'BPO financeiro',
    'CFO as a Service',
    'terceirização financeira',
    'não sei para onde meu dinheiro vai',
    'vendo bem mas não sobra nada',
    'quanto posso retirar da empresa',
    'gestão financeira para clínica',
    'CFO para escritório de advocacia',
    'gestão financeira para agência',
    'fluxo de caixa PME',
    'consultoria financeira Sete Lagoas',
    'controller financeiro terceirizado',
  ],
  authors: [{ name: 'ControllerTech' }],
  creator: 'ControllerTech',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://controllertech.com.br',
    siteName: 'ControllerTech',
    title: 'ControllerTech | Gestão Financeira Inteligente para PMEs',
    description:
      'Vende bem mas o caixa vive apertado? Um CFO Sênior por 1/3 do custo de um CLT. Diagnóstico gratuito.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ControllerTech — Gestão Financeira para PMEs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ControllerTech | Gestão Financeira Inteligente para PMEs',
    description:
      'Vende bem mas não sobra nada? Gestão financeira sênior para PMEs por 1/3 do custo de um CLT.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://controllertech.com.br',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>
    <html lang="pt-BR">
      <body
        className={`${manrope.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
    // </ClerkProvider>
  );
}
