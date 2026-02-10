'use server';

import { z } from 'zod';
// import { createClient } from '@supabase/supabase-js';

const FormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    company: z.string().min(2, { message: "Company name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormState = {
    errors?: {
        name?: string[];
        company?: string[];
        email?: string[];
        message?: string[];
    };
    message?: string;
    success?: boolean;
};

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
    const validatedFields = FormSchema.safeParse({
        name: formData.get('name'),
        company: formData.get('company'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Send.',
            success: false,
        };
    }

    const { name, company, email, message } = validatedFields.data;

    try {
        // 1. WhatsApp Cloud API Integration
        // Requires: WHATSAPP_TOKEN, WHATSAPP_PHONE_ID in .env
        const waToken = process.env.WHATSAPP_TOKEN;
        const phoneId = process.env.WHATSAPP_PHONE_ID;
        const adminPhone = process.env.WHATSAPP_ADMIN_PHONE; // Your verified number

        if (waToken && phoneId && adminPhone) {
            // NOTE: This assumes you have a 'hello_world' or custom template called 'lead_notification'
            // For free-form text to admin, standard messages work if within 24h window or using templates.
            // Here we simulate a template message.
            const res = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${waToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messaging_product: 'whatsapp',
                    to: adminPhone,
                    type: 'text', // Simplest for testing, use 'template' for prod
                    text: {
                        body: `🚀 New Lead!\nName: ${name}\nCompany: ${company}\nEmail: ${email}\nMessage: ${message}`
                    }
                }),
            });

            if (!res.ok) {
                console.error('WhatsApp API Error:', await res.text());
            }
        } else {
            console.log("WhatsApp credentials missing - Skipping API call");
        }

        // 2. Supabase Integration
        // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        // const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        // if (supabaseUrl && supabaseKey) {
        //    const supabase = createClient(supabaseUrl, supabaseKey);
        //    await supabase.from('leads').insert({ name, company, email, message });
        // }

        return { success: true, message: 'Thanks! We will be in touch shortly.' };
    } catch (error) {
        console.error('Submission Error:', error);
        return { success: false, message: 'Database error. Please try again.' };
    }
}
