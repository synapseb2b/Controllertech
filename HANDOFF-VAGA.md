# Handoff — Landing de Vaga: Auxiliar Financeiro Junior

Landing enxuta para receber candidaturas indicadas pela Coordenadora do Curso de Administração da UNIFEMM (Luciana Branco). Cada candidatura chega até o Ciro **como linha em uma Planilha Google + e-mail HTML rico do próprio Gmail dele**, mais um resumo no WhatsApp — sem depender de nenhum serviço externo além do Google e do WhatsApp Cloud API que já é usado no site.

---

## Como funciona

O Server Action monta o relatório rico e faz **um único POST HTTPS** para uma URL de webhook. Essa URL é um **Google Apps Script Web App** que roda dentro da conta Google do Ciro:

1. **Escreve** a candidatura como nova linha em uma Planilha Google (histórico automático, filtrável, ordenável)
2. **Envia** o e-mail HTML rico usando o próprio Gmail do Ciro (`MailApp.sendEmail`) — reputação máxima, zero chance de spam

Em paralelo, o WhatsApp Cloud API (já configurado no site) envia um resumo curto.

**Onde ficam os dados dos candidatos:** só na conta Google do Ciro (Planilha + Gmail). Zero serviços terceiros armazenando nada.

---

## Prompt único para colar no Claude Code do Ciro

> "Ative a landing de vaga em `/carreiras/auxiliar-financeiro-junior`. Ela já está no repositório. Antes de configurar o `.env.local`, siga estes 3 passos no seu Google Drive (uma vez só, ~10 min):
>
> **1.** Crie uma nova **Planilha Google** chamada `Candidaturas ControllerTech`. Na primeira aba, cole na linha 1 estes cabeçalhos: `Data | Nome | E-mail | WhatsApp | LinkedIn | Curso | Período | Experiência | Disponibilidade | Motivação | Fit cultural | Score cultural | Teste % | Teste acertos`.
>
> **2.** Na planilha, abra **Extensões → Apps Script**. Apague o código padrão e cole o código do bloco `apps-script.gs` que está no fim deste HANDOFF (o Claude Code deve mostrar). Troque a linha `const TO = '...'` para `ciro@controllertech.com.br` e opcionalmente `const CC = '...'` para `julio@synapseb2b.com` (deixe string vazia se não quiser CC). Salve (Ctrl+S).
>
> **3.** Clique em **Deploy → New deployment → tipo Web app**. Configure: *Execute as* = **Me** (você); *Who has access* = **Anyone**. Clique **Deploy**, autorize a primeira execução (pop-up do Google) e **copie a URL** que termina em `/exec`.
>
> Agora no `.env.local` (crie se não existir) adicione: `CANDIDATURA_WEBHOOK_URL=<a URL do passo 3>`. Confirme que `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID` e `WHATSAPP_ADMIN_PHONE=5531990603750` já estão configurados (você usa nas outras integrações do site). Rode `npm run build` para validar. Rode `npm run dev`, abra http://localhost:3000/carreiras/auxiliar-financeiro-junior e envie uma candidatura de teste com dados fictícios: você deve receber o e-mail no Gmail em ~5s, ver uma nova linha na planilha e receber a mensagem no WhatsApp. Se tudo certo, faça deploy pra produção."

---

## O que foi criado no repo

| Arquivo | Função |
|---|---|
| `app/carreiras/auxiliar-financeiro-junior/page.tsx` | A landing (hero + 3 cards + formulário) + JSON-LD `JobPosting` |
| `app/actions/candidatura.ts` | Server Action: valida (Zod), calcula scores, POSTa no webhook + WhatsApp em paralelo |
| `components/carreiras/JobHero.tsx` | Hero |
| `components/carreiras/ApplicationForm.tsx` | Formulário multi-etapa (4 passos + confirmação) |
| `components/carreiras/CulturalStep.tsx` | Bloco 3 — 5 perguntas de fit cultural |
| `components/carreiras/TechnicalStep.tsx` | Bloco 4 — 5 questões do mini-teste |
| `components/carreiras/SuccessScreen.tsx` | Tela de "obrigado" pós-envio |
| `lib/carreiras/quiz-data.ts` | Perguntas, opções, gabarito |
| `lib/carreiras/scoring.ts` | Cálculo do fit cultural + % do teste |
| `lib/carreiras/email-template.ts` | HTML rico do e-mail + resumo do WhatsApp |

---

## Variáveis de ambiente

| Variável | Obrigatória? | Valor |
|---|---|---|
| `CANDIDATURA_WEBHOOK_URL` | Sim (para e-mail + planilha) | URL do Apps Script Web App (termina em `/exec`) |
| `WHATSAPP_TOKEN` | Não | Já existente |
| `WHATSAPP_PHONE_ID` | Não | Já existente |
| `WHATSAPP_ADMIN_PHONE` | Não | `5531990603750` — WhatsApp do Ciro |
| `CANDIDATURA_CC_WHATSAPP` | Não | Números em cópia, separados por vírgula. Ex: `5531988019006` (Julio) |

**Sem nenhuma variável** o formulário continua funcionando — a candidatura é logada estruturada no console do servidor e o candidato vê a tela de sucesso. Bom pra publicar imediatamente e ativar os canais depois.

---

## Segurança

- **Dados**: só na conta Google do Ciro (Planilha + Gmail) e no WhatsApp dele. Zero serviços terceiros armazenando.
- **Webhook URL**: token único gerado pelo Google, praticamente impossível de adivinhar. Se vazar, o Ciro cria novo Deployment com um clique e troca a env var. O deployment antigo pode ser arquivado.
- **Acesso público ao Web App**: necessário porque o site chama sem autenticação. O script SÓ aceita POSTs com o payload esperado e SÓ escreve na planilha/envia e-mail do Ciro — não consegue tocar em mais nada.
- **Sem API keys**: nenhuma chave secreta de terceiros no `.env`. Só a URL do webhook.

---

## Link pra enviar à Luciana Branco (UNIFEMM)

Depois do deploy:

```
https://controllertech.com.br/carreiras/auxiliar-financeiro-junior
```

---

## Como personalizar

- **Textos da vaga**: `app/carreiras/auxiliar-financeiro-junior/page.tsx`
- **Perguntas de fit cultural** (peso 0–3): `lib/carreiras/quiz-data.ts` → `CULTURAL_QUESTIONS`
- **Questões do mini-teste** (com gabarito): `lib/carreiras/quiz-data.ts` → `MINI_TEST`
- **HTML do e-mail** que chega até o Ciro: `lib/carreiras/email-template.ts`
- **Destinatários do e-mail** (TO / CC): editar as constantes no topo do Apps Script (passo 2 acima) e re-deployar

---

## Como encerrar a vaga

1. **Deletar** a pasta `app/carreiras/auxiliar-financeiro-junior/` — rota some (404).
2. Ou **substituir** o conteúdo do `page.tsx` por: "Vaga encerrada. Obrigado a quem se candidatou."

---

## `apps-script.gs` — cole isto no Apps Script (passo 2)

```javascript
// Destinatários do e-mail — edite aqui
const TO = 'ciro@controllertech.com.br';
const CC = 'julio@synapseb2b.com'; // string vazia '' se não quiser CC

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const c = payload.candidate;
    const email = payload.email;

    // 1. Escreve linha na Planilha
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([
      new Date(c.submittedAt),
      c.name,
      c.email,
      c.phone,
      c.linkedin || '',
      c.curso === 'outro' && c.cursoOutro ? 'Outro (' + c.cursoOutro + ')' : c.curso,
      c.periodo + 'º',
      c.experiencia,
      c.disponibilidade,
      c.motivacao,
      c.cultural.tier,
      c.cultural.total + '/' + c.cultural.max,
      c.test.percent + '%',
      c.test.correct + '/' + c.test.total,
    ]);

    // 2. Envia e-mail HTML rico do seu Gmail
    const opts = { htmlBody: email.html };
    if (CC) opts.cc = CC;
    MailApp.sendEmail(TO, email.subject, email.text, opts);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Endpoint de sanity-check — abra a URL /exec no browser pra confirmar que está no ar
function doGet() {
  return ContentService
    .createTextOutput('ControllerTech candidaturas webhook — OK')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

**Cota do Gmail via MailApp:** 100 e-mails/dia (conta Gmail comum) ou 1500/dia (Google Workspace). Para o volume esperado da vaga isso é infinito.
