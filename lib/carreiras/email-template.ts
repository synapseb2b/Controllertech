import type { CulturalScore, TestReport } from './scoring';

export interface CandidatePayload {
    name: string;
    email: string;
    phone: string;
    linkedin?: string;
    curso: string;
    cursoOutro?: string;
    periodo: string;
    experiencia: string;
    disponibilidade: string;
    motivacao: string;
    cultural: CulturalScore;
    test: TestReport;
    submittedAt: Date;
}

const CURSO_LABELS: Record<string, string> = {
    administracao: 'Administração',
    contabeis: 'Ciências Contábeis',
    economia: 'Economia',
    outro: 'Outro',
};

const EXPERIENCIA_LABELS: Record<string, string> = {
    nunca: 'Nunca trabalhei na área',
    estagio: 'Estágio',
    clt: 'Registro CLT',
    freela: 'Autônomo / freela',
};

const DISPONIBILIDADE_LABELS: Record<string, string> = {
    manha: 'Manhã',
    tarde: 'Tarde',
    integral: 'Integral',
};

function fmtDate(d: Date): string {
    return d.toLocaleString('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
        timeZone: 'America/Sao_Paulo',
    });
}

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function nl2br(s: string): string {
    return escapeHtml(s).replace(/\n/g, '<br>');
}

function whatsappHref(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    const withCountry = digits.startsWith('55') ? digits : `55${digits}`;
    return `https://wa.me/${withCountry}`;
}

export function renderCandidateEmail(data: CandidatePayload): { subject: string; html: string; text: string } {
    const cursoLabel =
        data.curso === 'outro' && data.cursoOutro
            ? `Outro (${escapeHtml(data.cursoOutro)})`
            : CURSO_LABELS[data.curso] ?? data.curso;

    const subject = `Nova candidatura — Auxiliar Financeiro Jr — ${data.name} (Fit ${data.cultural.tier})`;

    const culturalRows = data.cultural.breakdown
        .map(
            (b) => `
        <tr>
            <td style="padding:10px 12px; border-bottom:1px solid #e6e8ee; font-size:13px; color:#4a5568; vertical-align:top; width:60%;">${escapeHtml(b.question)}</td>
            <td style="padding:10px 12px; border-bottom:1px solid #e6e8ee; font-size:13px; color:#1a202c; vertical-align:top;">${escapeHtml(b.answer)}</td>
            <td style="padding:10px 12px; border-bottom:1px solid #e6e8ee; font-size:13px; color:#4a5568; vertical-align:top; text-align:right; width:60px;"><strong>${b.weight}/3</strong></td>
        </tr>`,
        )
        .join('');

    const testBlocks = data.test.breakdown
        .map((b, i) => {
            const escolha =
                b.type === 'choice-with-reason' && b.choiceLabel
                    ? `<div style="margin:6px 0 10px 0;"><span style="display:inline-block; background:#f0eaff; color:#5b21b6; font-size:12px; font-weight:600; padding:3px 9px; border-radius:999px;">Escolheu: ${escapeHtml(b.choiceLabel)}</span></div>`
                    : '';
            return `
        <div style="padding:14px 16px; border:1px solid #e6e8ee; border-radius:12px; margin-bottom:12px;">
            <div style="font-size:12px; color:#7c3aed; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px;">Questão ${i + 1}</div>
            <div style="font-size:13px; color:#4a5568; margin-bottom:6px;">${escapeHtml(b.question)}</div>
            ${escolha}
            <div style="font-size:14px; color:#1a202c; background:#f7f7fb; padding:10px 12px; border-radius:8px; border-left:3px solid #7c3aed; font-style:italic;">${nl2br(b.text)}</div>
        </div>`;
        })
        .join('');

    const tierColor = data.cultural.tier === 'Alto' ? '#22a06b' : data.cultural.tier === 'Médio' ? '#d69e2e' : '#c53030';

    const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0; padding:24px 12px; background:#f5f6fa; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; color:#1a202c;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:680px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.05);">
        <tr>
            <td style="padding:28px 32px; background:linear-gradient(135deg,#4c1d95,#7c3aed); color:#ffffff;">
                <div style="font-size:12px; text-transform:uppercase; letter-spacing:1.5px; opacity:0.85; margin-bottom:6px;">Nova candidatura · Auxiliar Financeiro Jr</div>
                <div style="font-size:22px; font-weight:700; line-height:1.3;">${escapeHtml(data.name)}</div>
                <div style="font-size:14px; opacity:0.9; margin-top:4px;">${escapeHtml(cursoLabel)} · ${escapeHtml(data.periodo)}º período</div>
                <div style="margin-top:18px; display:inline-block; background:rgba(255,255,255,0.15); border-radius:10px; padding:10px 14px;">
                    <div style="font-size:11px; opacity:0.85; text-transform:uppercase; letter-spacing:0.5px;">Fit cultural</div>
                    <div style="font-size:18px; font-weight:700; margin-top:2px;">${data.cultural.tier} <span style="font-size:13px; opacity:0.8; font-weight:500;">(${data.cultural.total}/${data.cultural.max})</span></div>
                </div>
            </td>
        </tr>

        <tr>
            <td style="padding:24px 32px 8px 32px;">
                <div style="font-size:11px; text-transform:uppercase; letter-spacing:1.2px; color:#7c3aed; font-weight:700; margin-bottom:12px;">Contato</div>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px;">
                    <tr>
                        <td style="padding:6px 0; color:#4a5568; width:120px;">E-mail</td>
                        <td style="padding:6px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color:#7c3aed; text-decoration:none;">${escapeHtml(data.email)}</a></td>
                    </tr>
                    <tr>
                        <td style="padding:6px 0; color:#4a5568;">WhatsApp</td>
                        <td style="padding:6px 0;"><a href="${whatsappHref(data.phone)}" style="color:#7c3aed; text-decoration:none;">${escapeHtml(data.phone)}</a></td>
                    </tr>
                    ${
                        data.linkedin
                            ? `<tr><td style="padding:6px 0; color:#4a5568;">LinkedIn</td><td style="padding:6px 0;"><a href="${escapeHtml(data.linkedin)}" style="color:#7c3aed; text-decoration:none;">${escapeHtml(data.linkedin)}</a></td></tr>`
                            : ''
                    }
                </table>
            </td>
        </tr>

        <tr>
            <td style="padding:20px 32px 8px 32px;">
                <div style="font-size:11px; text-transform:uppercase; letter-spacing:1.2px; color:#7c3aed; font-weight:700; margin-bottom:12px;">Momento acadêmico e carreira</div>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px;">
                    <tr>
                        <td style="padding:6px 0; color:#4a5568; width:180px;">Experiência prévia</td>
                        <td style="padding:6px 0;">${escapeHtml(EXPERIENCIA_LABELS[data.experiencia] ?? data.experiencia)}</td>
                    </tr>
                    <tr>
                        <td style="padding:6px 0; color:#4a5568;">Disponibilidade</td>
                        <td style="padding:6px 0;">${escapeHtml(DISPONIBILIDADE_LABELS[data.disponibilidade] ?? data.disponibilidade)}</td>
                    </tr>
                    <tr>
                        <td style="padding:6px 0; color:#4a5568; vertical-align:top;">Por que essa vaga</td>
                        <td style="padding:6px 0; font-style:italic; color:#2d3748;">"${escapeHtml(data.motivacao)}"</td>
                    </tr>
                </table>
            </td>
        </tr>

        <tr>
            <td style="padding:24px 32px 8px 32px;">
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                    <div style="font-size:11px; text-transform:uppercase; letter-spacing:1.2px; color:#7c3aed; font-weight:700;">Fit cultural</div>
                    <div style="font-size:13px; font-weight:700; color:${tierColor};">${data.cultural.tier} · ${data.cultural.total}/${data.cultural.max}</div>
                </div>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #e6e8ee; border-radius:10px; overflow:hidden; margin-top:8px;">
                    ${culturalRows}
                </table>
            </td>
        </tr>

        <tr>
            <td style="padding:20px 32px 8px 32px;">
                <div style="font-size:11px; text-transform:uppercase; letter-spacing:1.2px; color:#7c3aed; font-weight:700; margin-bottom:12px;">Raciocínio técnico — respostas para você avaliar</div>
                <p style="font-size:12px; color:#718096; margin:0 0 12px 0; font-style:italic;">Sem gabarito automático. As respostas foram desenhadas para revelar voz, especificidade e maturidade — leia procurando por essas qualidades, não por "certo/errado".</p>
                ${testBlocks}
            </td>
        </tr>

        <tr>
            <td style="padding:16px 32px 28px 32px; border-top:1px solid #e6e8ee; font-size:12px; color:#718096;">
                Enviado por <strong>controllertech.com.br/carreiras/auxiliar-financeiro-junior</strong> em ${fmtDate(data.submittedAt)}.
            </td>
        </tr>
    </table>
</body>
</html>`;

    const textLines = [
        `Nova candidatura - Auxiliar Financeiro Jr`,
        ``,
        `${data.name} - ${cursoLabel} - ${data.periodo}o periodo`,
        `E-mail: ${data.email}`,
        `WhatsApp: ${data.phone}`,
    ];
    if (data.linkedin) textLines.push(`LinkedIn: ${data.linkedin}`);
    textLines.push(``);
    textLines.push(`Fit cultural: ${data.cultural.tier} (${data.cultural.total}/${data.cultural.max})`);
    textLines.push(``);
    textLines.push(`Experiencia: ${EXPERIENCIA_LABELS[data.experiencia] ?? data.experiencia}`);
    textLines.push(`Disponibilidade: ${DISPONIBILIDADE_LABELS[data.disponibilidade] ?? data.disponibilidade}`);
    textLines.push(`Motivacao: "${data.motivacao}"`);
    textLines.push(``);
    textLines.push(`--- Raciocinio tecnico ---`);
    data.test.breakdown.forEach((b, i) => {
        textLines.push(``);
        textLines.push(`${i + 1}. ${b.question}`);
        if (b.choiceLabel) textLines.push(`Escolheu: ${b.choiceLabel}`);
        textLines.push(`Resposta: ${b.text}`);
    });
    textLines.push(``);
    textLines.push(`Enviado em ${fmtDate(data.submittedAt)}.`);

    const text = textLines.join('\n');

    return { subject, html, text };
}

export function renderWhatsAppSummary(data: CandidatePayload): string {
    const cursoLabel =
        data.curso === 'outro' && data.cursoOutro ? `Outro (${data.cursoOutro})` : CURSO_LABELS[data.curso] ?? data.curso;

    const lines = [
        '🎓 Nova candidatura — Auxiliar Financeiro Jr',
        '',
        `${data.name} — ${cursoLabel}, ${data.periodo}º período`,
        `📧 ${data.email}`,
        `📱 ${data.phone}`,
    ];
    if (data.linkedin) lines.push(`🔗 ${data.linkedin}`);
    lines.push('');
    lines.push(`📊 Fit cultural: ${data.cultural.tier} (${data.cultural.total}/${data.cultural.max})`);
    lines.push('');
    lines.push('Respostas do raciocínio técnico no e-mail (você é o gabarito).');
    return lines.join('\n');
}
