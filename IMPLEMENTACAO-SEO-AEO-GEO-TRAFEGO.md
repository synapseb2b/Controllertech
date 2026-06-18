# Implementação SEO, AEO, GEO e Tráfego Pago — ControllerTech

> Documento de entrega. Resume tudo o que foi implementado para preservar o ranking
> de dois artigos legados e deixar o site pronto em SEO, AEO, GEO e tráfego pago.
> Data: 18/06/2026.

---

## 1. Contexto e objetivo

O site novo (Next.js 16, App Router) substitui o site antigo em `www.controllertech.com.br`.
Dois artigos legados rankeavam bem e geravam tráfego orgânico:

1. **Cirurgia plástica** — guia de precificação (publicado em 27/08/2024).
2. **Tabela de precificação de bolo** — uma **calculadora interativa**.

Quando o site novo entrar em produção no mesmo domínio, essas URLs passariam a retornar 404 —
perdendo o ranking. O objetivo foi **preservar esse tráfego** absorvendo os artigos na página de
artigos (`/blog`) com redirects 301, além de garantir **todas as medidas de SEO, AEO, GEO e
tráfego pago**.

Princípio central de SEO aplicado: **um redirect 301 só preserva ranking se o conteúdo de destino
for equivalente.** Por isso o conteúdo foi recriado fielmente antes de redirecionar.

---

## 2. Migração e preservação dos dois artigos (prioridade máxima)

### Conteúdo recriado fielmente
- `content/blog/como-definir-o-preco-justo-para-uma-cirurgia-plastica-dicas-para-clinicas-e-cirurgioes.md`
  — texto preservado 1:1 (incluindo o exemplo da rinoplastia com preço final de **R$ 8.510,00**).
  O `slug` é idêntico ao original (sem o prefixo `/pt`) e a data de publicação original
  (`2024-08-27`) foi mantida para preservar o sinal histórico.
- `content/blog/tabela-de-precificacao-de-bolo.md` — texto explicativo + FAQ.

### Calculadora interativa reconstruída
- `components/blog/interactive/BoloCalculator.tsx` — recriação fiel da ferramenta, com a **fórmula
  exata** extraída do site antigo:

  ```
  preço = (peso×custo_kg + indiretos%×peso×custo_kg + entrega) / (1 − margem)
  ```

- Mecanismo de injeção por slug em `app/blog/[slug]/page.tsx` (registry `INTERACTIVE`), mantendo o
  pipeline de markdown intacto e sem migrar tudo para MDX.

### Redirects 301 (`next.config.ts`)
Cada artigo tinha duas variantes indexáveis (a URL servida com prefixo de locale e o canonical sem
prefixo). Todas redirecionam para o novo destino em `/blog`:

| Origem (site antigo) | Destino (site novo) | Código |
|---|---|---|
| `/pt/como-definir-...-cirurgioes` | `/blog/como-definir-...-cirurgioes` | 301 |
| `/como-definir-...-cirurgioes` | `/blog/como-definir-...-cirurgioes` | 301 |
| `/en/tabela-de-precificacao-de-bolo-2` | `/blog/tabela-de-precificacao-de-bolo` | 301 |
| `/tabela-de-precificacao-de-bolo-2` | `/blog/tabela-de-precificacao-de-bolo` | 301 |
| `www.controllertech.com.br/*` | `controllertech.com.br/*` | 301 |

> Usamos `statusCode: 301` explícito (e não `permanent: true`, que geraria 308) para máxima
> compatibilidade com todos os bots.

---

## 3. SEO técnico

- **Imagens OG/ícones gerados por código** (`next/og`), eliminando as referências quebradas a
  `/og-image.png` e `/apple-touch-icon.png`:
  - `app/opengraph-image.tsx` — imagem OG padrão da marca (1200×630).
  - `app/blog/[slug]/opengraph-image.tsx` — imagem OG **dinâmica por artigo**, com o título.
  - `app/apple-icon.tsx` — apple touch icon.
  - `app/logo.png/route.tsx` — PNG real em `/logo.png` para o JSON-LD (`publisher.logo`).
- **Verificação de propriedade** (Search Console / Bing) em `app/layout.tsx`, gateada por env.
- **Sitemap** (`app/sitemap.ts`) já inclui automaticamente os novos artigos; adicionamos as páginas
  legais.

---

## 4. AEO (Answer Engine Optimization)

- JSON-LD **`HowTo`** e **`FAQPage`** em cada artigo de precificação (encaixe ideal para featured
  snippets e respostas de assistentes), a partir dos campos `howTo`/`faq` no frontmatter.
- Tipos estendidos em `lib/blog/types.ts`; campos propagados em `lib/blog/index.ts`; schema
  renderizado em `app/blog/[slug]/page.tsx`.
- Seções de "Perguntas frequentes" visíveis no corpo dos artigos (respostas curtas e extraíveis).

---

## 5. GEO (Generative Engine Optimization)

- **`app/llms.txt/route.ts`** — endpoint no padrão llmstxt.org descrevendo empresa, serviços e
  artigos em markdown limpo, para citação por ChatGPT/Perplexity/Gemini.
- **`app/robots.ts`** — crawlers de IA liberados explicitamente (GPTBot, OAI-SearchBot,
  PerplexityBot, Google-Extended, ClaudeBot, etc.).

---

## 6. Tráfego pago / Analytics (gateado por variáveis de ambiente)

Toda a infraestrutura está pronta e **inerte até o cliente preencher os IDs** — sem env, nada
carrega.

- `components/analytics/Analytics.tsx` — GTM, GA4, Google Ads e Meta Pixel via `next/script`, cada
  um condicionado à sua env.
- `lib/analytics/consent.ts` + `components/ui/CookieConsent.tsx` — **Google Consent Mode v2**:
  consentimento começa "denied" e só é concedido pelo banner LGPD.
- `lib/analytics/track.ts` — helper de eventos de conversão (dataLayer / gtag / fbq). Instrumentado:
  - **Lead** — envio do formulário de contato (`components/forms/ContactForm.tsx`).
  - **QuizComplete** — conclusão do quiz (`components/sections/ProductQuiz.tsx`).
  - **Contact** — clique no WhatsApp (`components/ui/WhatsAppButton.tsx` e CTA do quiz).

---

## 7. LGPD / Privacidade

- **Banner de consentimento granular** (necessários / analytics / marketing), integrado ao Consent
  Mode (`components/ui/CookieConsent.tsx`).
- Páginas **`/politica-de-privacidade`** e **`/termos-de-uso`** criadas; links do rodapé religados
  (`components/layout/Footer.tsx`).

> As páginas legais são um template sólido (cobrem LGPD/cookies), mas recomenda-se revisão jurídica
> antes de considerá-las definitivas.

---

## 8. Variáveis de ambiente (preencher em produção)

Ver `.env.example`. Resumo do que o cliente precisa preencher quando criar as contas:

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager (`GTM-XXXXXXX`) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 (`G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads (`AW-XXXXXXXXX`) |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` | Rótulo de conversão do Google Ads |
| `NEXT_PUBLIC_FB_PIXEL_ID` | Meta (Facebook/Instagram) Pixel |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Verificação Google Search Console |
| `NEXT_PUBLIC_BING_VERIFICATION` | Verificação Bing Webmaster |

---

## 9. Pendências fora do código (responsabilidade de deploy)

1. **Deploy/DNS:** os redirects só surtem efeito quando o site novo for o deploy de produção em
   `controllertech.com.br` e o DNS de `www` apontar para ele.
2. **Pós-deploy:** validar os schemas no Rich Results Test, submeter o `sitemap.xml` no Search
   Console e, se o domínio antigo for diferente, usar a ferramenta "Mudança de Endereço" do GSC.
3. **Preencher os IDs** das tags em `.env`.

---

## 10. Como verificar localmente

```bash
npm run build          # build de produção
npm run start          # sobe em http://localhost:3000

# Redirects (devem retornar 301)
curl -I http://localhost:3000/en/tabela-de-precificacao-de-bolo-2
curl -I http://localhost:3000/pt/como-definir-o-preco-justo-para-uma-cirurgia-plastica-dicas-para-clinicas-e-cirurgioes

# Endpoints
curl http://localhost:3000/llms.txt
curl http://localhost:3000/sitemap.xml
curl http://localhost:3000/robots.txt
```

Artigos para abrir no navegador:
- `/blog/como-definir-o-preco-justo-para-uma-cirurgia-plastica-dicas-para-clinicas-e-cirurgioes`
- `/blog/tabela-de-precificacao-de-bolo` (calculadora interativa funcionando)
