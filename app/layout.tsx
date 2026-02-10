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
    'Tenha um CFO Sênior na sua empresa por uma fração do custo. Blindamos seu caixa, projetamos seu futuro e aumentamos seu lucro real. Sem CLT, sem passivo, sem surpresas.',
  keywords: [
    'gestão financeira',
    'BPO financeiro',
    'CFO as a Service',
    'terceirização financeira',
    'controladoria',
    'PME',
    'fluxo de caixa',
    'consultoria financeira',
    'Sete Lagoas',
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
      'Acesse inteligência financeira sênior para blindar seu caixa e aumentar seu lucro real.',
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
      'CFO Sênior por uma fração do custo. Blindamos seu caixa e aumentamos seu lucro.',
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
