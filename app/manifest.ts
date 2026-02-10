import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ControllerTech — Gestão Financeira para PMEs',
    short_name: 'ControllerTech',
    description: 'Arquitetura Financeira Inteligente para PMEs',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a1a',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
