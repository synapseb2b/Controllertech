'use server';

import { z } from 'zod';
// import { createClient } from '@supabase/supabase-js';

const FormSchema = z.object({
    name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
    company: z.string().min(2, { message: "Nome da empresa é obrigatório." }),
    sector: z.string().min(1, { message: "Selecione seu setor." }),
    revenue: z.string().min(1, { message: "Selecione a faixa de faturamento." }),
    pain: z.string().min(1, { message: "Selecione sua maior dor." }),
    phone: z.string().min(10, { message: "WhatsApp inválido." }),
});

export type ContactFormState = {
    errors?: {
        name?: string[];
        company?: string[];
        sector?: string[];
        revenue?: string[];
        pain?: string[];
        phone?: string[];
    };
    message?: string;
    success?: boolean;
    waRedirectUrl?: string;
};

const SECTOR_LABELS: Record<string, string> = {
    saude: 'Saúde (Clínica/Consultório)',
    juridico: 'Jurídico (Escritório de Advocacia)',
    agencia: 'Agência (Marketing/Comunicação)',
    arquitetura: 'Arquitetura/Engenharia',
    tecnologia: 'Tecnologia (SaaS/Software)',
    outro: 'Outro',
};

const REVENUE_LABELS: Record<string, string> = {
    ate_150k: 'Até R$ 150k',
    '150k_500k': 'R$ 150k – R$ 500k',
    '500k_2mm': 'R$ 500k – R$ 2MM',
    acima_2mm: 'Acima de R$ 2MM',
};

const PAIN_LABELS: Record<string, string> = {
    lucro_invisivel: 'Não sei quanto sobra de lucro real no fim do mês',
    caixa_apertado: 'Vendo bem, mas o caixa vive apertado',
    sem_tempo: 'Faço tudo sozinho e não tenho tempo',
    equipe_fraca: 'Meu financeiro é feito por alguém sem preparo',
    preciso_estrategia: 'Preciso de estratégia, não só de operação',
};

function buildWhatsAppUrl(data: {
    name: string;
    company: string;
    sector: string;
    revenue: string;
    pain: string;
    phone: string;
}) {
    const sectorLabel = SECTOR_LABELS[data.sector] || data.sector;
    const revenueLabel = REVENUE_LABELS[data.revenue] || data.revenue;
    const painLabel = PAIN_LABELS[data.pain] || data.pain;

    const message = `Nova Anamnese Financeira

${data.name} — ${data.company}
Setor: ${sectorLabel}
Faturamento: ${revenueLabel}
Dor principal: ${painLabel}
WhatsApp: ${data.phone}`;

    return `https://wa.me/5531990603750?text=${encodeURIComponent(message)}`;
}

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
    const validatedFields = FormSchema.safeParse({
        name: formData.get('name'),
        company: formData.get('company'),
        sector: formData.get('sector'),
        revenue: formData.get('revenue'),
        pain: formData.get('pain'),
        phone: formData.get('phone'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Preencha todos os campos corretamente.',
            success: false,
        };
    }

    const { name, company, sector, revenue, pain, phone } = validatedFields.data;

    try {
        // 1. WhatsApp Cloud API Integration
        const waToken = process.env.WHATSAPP_TOKEN;
        const phoneId = process.env.WHATSAPP_PHONE_ID;
        const adminPhone = process.env.WHATSAPP_ADMIN_PHONE;

        const sectorLabel = SECTOR_LABELS[sector] || sector;
        const revenueLabel = REVENUE_LABELS[revenue] || revenue;
        const painLabel = PAIN_LABELS[pain] || pain;

        if (waToken && phoneId && adminPhone) {
            const res = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${waToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messaging_product: 'whatsapp',
                    to: adminPhone,
                    type: 'text',
                    text: {
                        body: `Nova Anamnese Financeira\n\n${name} — ${company}\nSetor: ${sectorLabel}\nFaturamento: ${revenueLabel}\nDor: ${painLabel}\nWhatsApp: ${phone}`
                    }
                }),
            });

            if (!res.ok) {
                console.error('WhatsApp API Error:', await res.text());
            }
        } else {
            console.log("WhatsApp credentials missing - Skipping API call");
        }

        // 2. Supabase Integration (commented out)
        // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        // const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        // if (supabaseUrl && supabaseKey) {
        //    const supabase = createClient(supabaseUrl, supabaseKey);
        //    await supabase.from('leads').insert({ name, company, sector, revenue, pain, phone });
        // }

        const waRedirectUrl = buildWhatsAppUrl({ name, company, sector, revenue, pain, phone });

        return {
            success: true,
            message: 'Recebemos seus dados! Redirecionando para o WhatsApp...',
            waRedirectUrl,
        };
    } catch (error) {
        console.error('Submission Error:', error);
        return { success: false, message: 'Erro ao enviar. Tente novamente.' };
    }
}
