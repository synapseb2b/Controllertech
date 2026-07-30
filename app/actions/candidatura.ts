'use server';

import { z } from 'zod';
import { calcCulturalScore, buildTestReport, type TestAnswer } from '@/lib/carreiras/scoring';
import {
    renderCandidateEmail,
    renderWhatsAppSummary,
    type CandidatePayload,
} from '@/lib/carreiras/email-template';

const CandidaturaSchema = z.object({
    name: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres.' }),
    email: z.string().email({ message: 'E-mail inválido.' }),
    phone: z.string().min(10, { message: 'WhatsApp inválido.' }),
    linkedin: z.string().url({ message: 'URL inválida.' }).optional().or(z.literal('')),
    curso: z.string().min(1, { message: 'Selecione o curso.' }),
    cursoOutro: z.string().optional(),
    periodo: z.string().min(1, { message: 'Informe o período.' }),
    experiencia: z.string().min(1, { message: 'Selecione a experiência.' }),
    disponibilidade: z.string().min(1, { message: 'Selecione a disponibilidade.' }),
    motivacao: z
        .string()
        .min(20, { message: 'Escreva ao menos uma frase completa (mín. 20 caracteres).' })
        .max(240, { message: 'Limite de 240 caracteres.' }),
    culturalAnswers: z.record(z.string(), z.number().int().min(0).max(3)),
    testAnswers: z.record(
        z.string(),
        z.object({
            choice: z.string().optional(),
            text: z.string().min(1),
        }),
    ),
});

export type CandidaturaFormState = {
    errors?: Record<string, string[]>;
    message?: string;
    success?: boolean;
};

async function sendWebhook(
    candidate: CandidatePayload,
    email: { subject: string; html: string; text: string },
): Promise<boolean> {
    const url = process.env.CANDIDATURA_WEBHOOK_URL;
    if (!url) return false;

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                candidate,
                email,
                receivedAt: new Date().toISOString(),
            }),
        });

        if (!res.ok) {
            console.error('[candidatura] Webhook error:', res.status, await res.text());
            return false;
        }
        return true;
    } catch (err) {
        console.error('[candidatura] Webhook exception:', err);
        return false;
    }
}

async function sendWhatsAppSummary(summary: string): Promise<boolean> {
    const token = process.env.WHATSAPP_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_ID;
    const adminPhone = process.env.WHATSAPP_ADMIN_PHONE;
    const ccRaw = process.env.CANDIDATURA_CC_WHATSAPP;

    if (!token || !phoneId || !adminPhone) return false;

    const recipients = [adminPhone];
    if (ccRaw) {
        for (const r of ccRaw.split(',').map((s) => s.trim()).filter(Boolean)) {
            if (!recipients.includes(r)) recipients.push(r);
        }
    }

    let allOk = true;

    for (const to of recipients) {
        try {
            const res = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messaging_product: 'whatsapp',
                    to,
                    type: 'text',
                    text: { body: summary },
                }),
            });

            if (!res.ok) {
                console.error(`[candidatura] WhatsApp error for ${to}:`, res.status, await res.text());
                allOk = false;
            }
        } catch (err) {
            console.error(`[candidatura] WhatsApp exception for ${to}:`, err);
            allOk = false;
        }
    }

    return allOk;
}

export async function submitCandidatura(
    prevState: CandidaturaFormState,
    formData: FormData,
): Promise<CandidaturaFormState> {
    const raw = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        linkedin: formData.get('linkedin') || undefined,
        curso: formData.get('curso'),
        cursoOutro: formData.get('cursoOutro') || undefined,
        periodo: formData.get('periodo'),
        experiencia: formData.get('experiencia'),
        disponibilidade: formData.get('disponibilidade'),
        motivacao: formData.get('motivacao'),
        culturalAnswers: safeParseJson(formData.get('culturalAnswers')),
        testAnswers: safeParseJson(formData.get('testAnswers')),
    };

    const parsed = CandidaturaSchema.safeParse(raw);
    if (!parsed.success) {
        return {
            success: false,
            message: 'Preencha todos os campos corretamente.',
            errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }

    const data = parsed.data;
    const cultural = calcCulturalScore(data.culturalAnswers);
    const test = buildTestReport(data.testAnswers as Record<string, TestAnswer>);

    const payload: CandidatePayload = {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        linkedin: data.linkedin && data.linkedin.length > 0 ? data.linkedin.trim() : undefined,
        curso: data.curso,
        cursoOutro: data.cursoOutro?.trim(),
        periodo: data.periodo,
        experiencia: data.experiencia,
        disponibilidade: data.disponibilidade,
        motivacao: data.motivacao.trim(),
        cultural,
        test,
        submittedAt: new Date(),
    };

    const email = renderCandidateEmail(payload);
    const summary = renderWhatsAppSummary(payload);

    const [webhookSent, whatsappSent] = await Promise.all([
        sendWebhook(payload, email),
        sendWhatsAppSummary(summary),
    ]);

    if (!webhookSent && !whatsappSent) {
        console.log('[candidatura] Nenhum canal configurado — log estruturado:\n', JSON.stringify(payload, null, 2));
    } else {
        console.log(
            `[candidatura] ${payload.name} enviada. Webhook=${webhookSent ? 'ok' : 'off'} WhatsApp=${whatsappSent ? 'ok' : 'off'}`,
        );
    }

    return { success: true };
}

function safeParseJson(value: FormDataEntryValue | null): unknown {
    if (typeof value !== 'string') return {};
    try {
        return JSON.parse(value);
    } catch {
        return {};
    }
}
