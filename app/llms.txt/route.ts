import { getAllPosts } from '@/lib/blog';

const BASE = 'https://controllertech.com.br';

/**
 * /llms.txt — padrão emergente (llmstxt.org) para guiar crawlers e
 * assistentes generativos (GEO). Descreve a empresa, serviços e artigos
 * em markdown limpo e citável. Gerado a partir dos posts do blog.
 */
export async function GET() {
    const posts = await getAllPosts();

    const articleLines = posts
        .map((p) => `- [${p.title}](${BASE}/blog/${p.slug}): ${p.description}`)
        .join('\n');

    const body = `# ControllerTech

> Gestão financeira inteligente para PMEs. A ControllerTech entrega controladoria e finanças de nível sênior (CFO as a Service e BPO Financeiro) para pequenas e médias empresas — blindando o caixa, recuperando margem oculta e apoiando decisões baseadas em dados, por uma fração do custo de um executivo CLT.

## Sobre

- **Empresa:** ControllerTech — Controle Financeiro Empresarial
- **Site:** ${BASE}
- **Localização:** Sete Lagoas, MG, Brasil
- **Fundador:** Ciro Freitas, especialista em finanças e controladoria empresarial
- **Para quem:** PMEs que faturam entre R$ 500 mil e R$ 3 milhões/ano (clínicas, escritórios de advocacia, agências e empresas de serviços)

## Serviços

- **Kit de Organização Financeira:** diagnóstico objetivo que cria uma fotografia clara da situação financeira atual e um mapa de ação para 90 dias.
- **BPO Financeiro para PMEs:** terceirização da rotina financeira com monitoramento diário e informações precisas.
- **CFO as a Service:** um CFO sênior conduzindo a estratégia financeira por uma fração do custo de um executivo CLT.

## Artigos

${articleLines}

## Contato

- WhatsApp: +55 31 99060-3750
- E-mail: contato@controllertech.com.br
`;

    return new Response(body, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
