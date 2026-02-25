# ControllerTech — Documentação do Projeto

> Registro técnico e racionais de desenvolvimento do site controllertech.com.br

---

## 1. Visão Geral

| Item | Detalhe |
|------|---------|
| **Stack** | Next.js 16.1.6, React 19, TypeScript, Tailwind CSS 4, Framer Motion, shadcn/ui |
| **Domínio** | controllertech.com.br |
| **Negócio** | Consultoria de gestão financeira para PMEs (Sete Lagoas/MG, Brasil) |
| **Tema** | Dark mode only (oklch color space), primary = indigo/purple |
| **Idioma** | Português (pt-BR) |
| **Hospedagem** | Vercel (recomendado) |

**Serviços oferecidos:**
- Kit de Organização Financeira (entrada)
- Gestão Premium / BPO Financeiro (core)
- CFO as a Service (premium)

---

## 2. Arquitetura

- **Home**: Single-page app com anchor sections (`#mechanism`, `#solutions`, `#stats`, `#contact`, `#faq`)
- **Blog**: Páginas separadas (`/blog` listing + `/blog/[slug]` artigos)
- **Routing**: Next.js App Router com Server Components + Client Components
- **Formulário**: Server Actions (`app/actions/contact.ts`) com redirect para WhatsApp
- **Blog content**: Arquivos `.md` locais com frontmatter YAML, processados por `gray-matter` + `remark` + `remark-html`
- **SEO**: Metadata API do Next.js, JSON-LD structured data, sitemap/robots dinâmicos

---

## 3. Estrutura de Pastas

```
Controllertech/
├── app/
│   ├── actions/
│   │   └── contact.ts          # Server Action do formulário SDR
│   ├── api/blog/webhook/
│   │   └── route.ts            # Endpoint para Automarticles (skeleton)
│   ├── blog/
│   │   ├── page.tsx            # Listing de artigos
│   │   └── [slug]/page.tsx     # Página individual do artigo (SSG)
│   ├── globals.css             # Tema dark, utilities, .prose-blog
│   ├── layout.tsx              # Root layout, metadata global, SEO
│   ├── page.tsx                # Home (seções + JSON-LD schemas)
│   ├── manifest.ts             # PWA manifest
│   ├── robots.ts               # robots.txt
│   └── sitemap.ts              # Sitemap dinâmico (home + blog)
│
├── components/
│   ├── blog/                   # BlogHero, BlogPostCard, ArticleHeader, ArticleContent
│   ├── forms/
│   │   └── ContactForm.tsx     # Formulário SDR com qualificação ICP
│   ├── layout/
│   │   ├── Navbar.tsx          # Navegação fixa com backdrop-blur
│   │   └── Footer.tsx          # Footer com links e endereço
│   ├── sections/               # Hero, Stats, LogoMarquee, Problem, Mechanism,
│   │                           # Solutions, ProductQuiz, Benefits, Founder, FAQ
│   └── ui/                     # shadcn/ui components + WhatsAppButton (FAB)
│
├── content/
│   └── blog/                   # Artigos em markdown com frontmatter
│       ├── vendo-bem-mas-nao-sobra-nada.md          → Kit de Organização
│       ├── ter-alguem-no-financeiro-nao-e-ter-gestao.md  → BPO Financeiro
│       └── empresa-parou-de-crescer-visao-de-caixa.md    → CFO as a Service
│
├── lib/
│   ├── blog/
│   │   ├── types.ts            # BlogPostMeta, BlogPost interfaces
│   │   └── index.ts            # Data layer (getAllPosts, getPostBySlug, etc.)
│   └── utils.ts                # Utilidades gerais (cn)
│
└── public/
    ├── Ciro1.webp              # Foto do fundador
    └── (assets SVG)
```

---

## 4. Funcionalidades-Chave e Racionais

### 4a. Quiz de Recomendação de Produto

**Arquivo:** `components/sections/ProductQuiz.tsx`

**Racional:** Muitos visitantes chegam ao site sem saber qual dos 3 produtos é ideal para seu momento. O quiz resolve isso com 4 perguntas rápidas baseadas no ICP.

**Mecânica de pontuação:**
- Cada pergunta tem 3 opções: 3 pts (Kit), 2 pts (BPO), 1 pt (CFO)
- Soma total: 9-12 → Kit de Organização | 5-8 → Gestão Premium (BPO) | 4 → CFO as a Service

**Dupla função:**
1. **Recomendação de produto** — direciona o visitante ao serviço certo com CTA WhatsApp
2. **Geração de estatísticas proprietárias** — cada resposta pode alimentar contadores (state local agora, Supabase futuramente) que geram dados como "X% das PMEs de serviço não sabem sua margem real". Esse dado proprietário é valioso para autoridade SEO/GEO.

**UI:** Step wizard com barra de progresso, transições Framer Motion, botão voltar, resultado com card + CTA "Refazer Teste".

---

### 4b. Formulário SDR com Qualificação ICP

**Arquivo:** `components/forms/ContactForm.tsx` + `app/actions/contact.ts`

**Racional:** Em vez de um formulário genérico de contato, o formulário funciona como um mini-SDR que qualifica o lead antes do contato, fornecendo ao time comercial informações relevantes.

**Campos alinhados ao ICP (Ideal Customer Profile):**
- Nome, Empresa
- Setor (6 opções: Saúde, Jurídico, Tecnologia, Construção, Agências, Outros)
- Faturamento mensal (4 faixas: <150k, 150k-500k, 500k-1.5M, >1.5M)
- Dor principal (5 opções JTBD: Caixa apertado, Não sei margem, Muito tempo no financeiro, Crescer sem risco, Separar PF/PJ)
- WhatsApp

**Fluxo técnico:**
1. `useActionState` + React Hook Form + Zod validation
2. Server Action monta URL `wa.me` com mensagem pré-formatada contendo todos os dados
3. `useEffect` detecta sucesso e faz `window.open()` para WhatsApp

---

### 4c. Blog + Preparação para Automarticles

**Arquivos:** `lib/blog/index.ts`, `app/api/blog/webhook/route.ts`

**Racional de arquitetura:**

A camada de dados (`lib/blog/index.ts`) foi desenhada como **abstração**. Todas as funções são `async` mesmo que a implementação atual seja síncrona (leitura de filesystem). Isso permite trocar a fonte de dados (filesystem → Supabase → API) sem alterar as assinaturas das funções.

**Integração futura com Automarticles:**
- Site: https://automarticles.com/
- Modelo: "Oferecemos webhooks para você conectar com qualquer ferramenta de blog"
- Endpoint já criado: `POST /api/blog/webhook`
- Autenticação: Bearer token via `AUTOMARTICLES_WEBHOOK_SECRET`
- Quando integrado:
  1. Automarticles envia POST com dados do artigo
  2. Webhook valida, transforma e salva (filesystem ou Supabase)
  3. Chama `revalidatePath('/blog')` para ISR (Incremental Static Regeneration)
  4. Novo artigo aparece automaticamente no blog

**3 artigos iniciais:**
Cada artigo foi escrito pela Synapse B2B como "porta de entrada" para um produto:
| Artigo | Produto-alvo | Slug |
|--------|-------------|------|
| "Vendo Bem, Mas Não Sobra Nada..." | Kit de Organização | `/blog/vendo-bem-mas-nao-sobra-nada` |
| "Ter Alguém no Financeiro Não É Ter Gestão..." | Gestão Premium (BPO) | `/blog/ter-alguem-no-financeiro-nao-e-ter-gestao` |
| "Sua Empresa Parou de Crescer?..." | CFO as a Service | `/blog/empresa-parou-de-crescer-visao-de-caixa` |

**Frontmatter de cada artigo:**
```yaml
---
title: "..."
slug: "..."
description: "..." # Meta description (SEO)
category: "..."
tags: [...]         # Keywords para SEO
readTime: "X min"
author: "ControllerTech"
publishedAt: "2026-02-24"
updatedAt: "2026-02-24"
ctaText: "..."      # CTA personalizado por artigo
ctaProduct: "..."   # Produto recomendado
---
```

---

### 4d. Estratégia SEO / GEO (Generative Engine Optimization)

**Racional central:** O ICP da ControllerTech (dono de PME, R$ 500k-3M/ano) não busca termos técnicos como "DRE", "EBITDA" ou "conciliação bancária". Ele busca dores coloquiais:
- "vendo bem mas não sobra nada"
- "não sei para onde meu dinheiro vai"
- "quanto posso retirar da empresa"
- "gestão financeira para clínica"

**Implementação:**

1. **Keywords coloquiais** em `layout.tsx` — mix de long-tail dores + termos de nicho (clínica, advocacia, agência)
2. **Meta descriptions** abrem com a dor do ICP como gancho de busca
3. **JSON-LD completo** em `page.tsx`:
   - `Organization` — com ContactPoint
   - `FinancialService` (LocalBusiness) — com geo, areaServed, priceRange, ContactPoint
   - `FAQPage` — 9 Q&As incluindo 2 GEO-targeted ("Quanto custa terceirizar...", "Preciso de gestão para minha clínica...")
   - `Service` (x3) — um schema por produto com audiência e description detalhados
4. **JSON-LD no blog:**
   - `CollectionPage` na listing
   - `BlogPosting` por artigo (author, publisher, dates, keywords, articleSection)
   - `BreadcrumbList` por artigo
5. **Sitemap dinâmico** (`app/sitemap.ts`) — async, inclui home + `/blog` + cada artigo automaticamente

**Nicho de baixa concorrência:** PMEs de serviço R$ 500k-3M/ano têm pouca competição em buscas financeiras. A estratégia de conteúdo (blog + FAQ + quiz) visa dominar esse espaço tanto em buscadores tradicionais quanto em LLMs (GEO).

---

## 5. Estilização

### Tema Dark (oklch)
```css
--background: oklch(0.08 0.01 260);    /* Quase preto azulado */
--foreground: oklch(0.95 0 0);         /* Branco suave */
--primary: oklch(0.65 0.2 265);        /* Indigo/purple */
--card: oklch(0.12 0.01 260);          /* Card ligeiramente mais claro */
--muted-foreground: oklch(0.65 0 0);   /* Texto secundário */
```

### Padrões de design
- **Cards:** `bg-card/60 backdrop-blur-xl rounded-3xl border border-border/50 card-glow`
- **Gradient text:** `.text-gradient` — linear-gradient(135deg, oklch(0.75 0.2 265), oklch(0.70 0.18 320))
- **Icons:** `bg-primary/15 text-primary` (unificado, sem gradientes por card)
- **Alternância de fundo:** Seções alternadas usam `bg-muted/5` com gradients sutis para quebrar monotonia
- **Blog prose:** `.prose-blog` customizado em globals.css (sem @tailwindcss/typography)
- **Sem vermelho:** Cliente rejeitou cores destructive/red como "piegas"

---

## 6. Variáveis de Ambiente

| Variável | Uso | Status |
|----------|-----|--------|
| `AUTOMARTICLES_WEBHOOK_SECRET` | Autenticação do webhook do blog | Pendente (criar quando integrar) |
| WhatsApp `5531990603750` | Número de contato (hardcoded) | Ativo |

---

## 7. Assets Pendentes

Os seguintes assets são referenciados no código mas ainda não foram criados:

| Asset | Dimensão | Referenciado em |
|-------|----------|-----------------|
| `/og-image.png` | 1200x630 | layout.tsx (OpenGraph) |
| `/icon-192.png` | 192x192 | manifest.ts (PWA) |
| `/icon-512.png` | 512x512 | manifest.ts (PWA) |
| `/apple-touch-icon.png` | 180x180 | layout.tsx (icons) |
| `/logo.png` | — | page.tsx (JSON-LD) |
| `/favicon.ico` | 32x32 | layout.tsx (icons) |

**Páginas pendentes:**
- Política de Privacidade (footer link → `#`)
- Termos de Uso (footer link → `#`)

---

## 8. Clientes no LogoMarquee

9 empresas exibidas em marquee infinito:

1. Giornata Empresas
2. Giornata Educação
3. Sucesso Select
4. CTST
5. Dorneles Advocacia
6. Meu Pet Livre
7. Guillermo Alfaitaria
8. J7 Rural
9. Império das Relíquias

---

## 9. Fundador

- **Nome:** Ciro Freitas
- **Título:** Fundador & Head de Estratégia
- **Foto:** `/Ciro1.webp` (fotos alternativas: Ciro2.webp, Ciro3.webp)
- **Background:** Carreira em Marelli, Infosys/Philips LATAM
- **Seção:** `components/sections/Founder.tsx` — blockquote com bio + foto circular

---

## 10. Comandos de Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar servidor de produção
npm start
```

---

## 11. Dependências Principais

| Pacote | Versão | Uso |
|--------|--------|-----|
| `next` | 16.1.6 | Framework |
| `react` | 19.2.3 | UI Library |
| `tailwindcss` | ^4 | Estilização |
| `framer-motion` | ^12.31.0 | Animações |
| `@radix-ui/*` | ^1.4.3 | Componentes headless (shadcn/ui) |
| `zod` | ^4.3.6 | Validação de schemas |
| `react-hook-form` | ^7.71.1 | Gerenciamento de formulários |
| `gray-matter` | * | Parsing de frontmatter markdown |
| `remark` + `remark-html` | * | Conversão markdown → HTML |
| `lucide-react` | ^0.563.0 | Ícones |
| `@supabase/supabase-js` | ^2.94.0 | Database (parcialmente configurado) |
| `@clerk/nextjs` | ^6.37.2 | Auth (importado, comentado) |

---

## 12. Histórico de Desenvolvimento

O site foi desenvolvido iterativamente em rodadas:

1. **Rodada 1-2:** Estrutura base, seções da home, heading unification, gradient effects
2. **Rodada 3:** Padronização de tamanhos (text-4xl md:text-5xl em todos os H2)
3. **Rodada 4:** WhatsApp FAB, formulário SDR com qualificação ICP, copy de Solutions alinhada ao GTM
4. **Rodada 5:** Alternância de backgrounds para quebrar monotonia do "all black"
5. **Rodada 6:** 5 novos clientes no marquee, SEO/GEO com keywords coloquiais, Quiz de produto, Service schemas, FAQs GEO-targeted
6. **Rodada 7:** Blog completo com 3 artigos, webhook Automarticles, BlogPosting/BreadcrumbList schemas, sitemap dinâmico, ContactPoint schema
7. **Rodada 8:** Documentação (este arquivo)

---

*Última atualização: Fevereiro 2026*
