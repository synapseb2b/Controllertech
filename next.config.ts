import type { NextConfig } from "next";

// Slugs dos artigos legados migrados do site antigo (www.controllertech.com.br).
// No site antigo eram servidos com prefixo de locale (/pt, /en), mas o canonical
// indexado pelo Google era a versão SEM prefixo. Redirecionamos ambas as variantes
// para os novos posts em /blog a fim de preservar o ranking orgânico.
const SURGERY_OLD =
  'como-definir-o-preco-justo-para-uma-cirurgia-plastica-dicas-para-clinicas-e-cirurgioes';
const SURGERY_NEW = `/blog/${SURGERY_OLD}`;
const CAKE_NEW = '/blog/tabela-de-precificacao-de-bolo';

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      // Artigo de cirurgia plástica → /blog (301 permanente)
      { source: `/${SURGERY_OLD}`, destination: SURGERY_NEW, statusCode: 301 },
      { source: `/pt/${SURGERY_OLD}`, destination: SURGERY_NEW, statusCode: 301 },
      { source: `/en/${SURGERY_OLD}`, destination: SURGERY_NEW, statusCode: 301 },

      // Calculadora de bolo → /blog (301 permanente). O slug antigo terminava em "-2".
      { source: '/tabela-de-precificacao-de-bolo-2', destination: CAKE_NEW, statusCode: 301 },
      { source: '/pt/tabela-de-precificacao-de-bolo-2', destination: CAKE_NEW, statusCode: 301 },
      { source: '/en/tabela-de-precificacao-de-bolo-2', destination: CAKE_NEW, statusCode: 301 },
      { source: '/tabela-de-precificacao-de-bolo', destination: CAKE_NEW, statusCode: 301 },

      // www → non-www (canonical é non-www). Preserva o restante do caminho.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.controllertech.com.br' }],
        destination: 'https://controllertech.com.br/:path*',
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
