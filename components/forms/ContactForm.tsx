'use client';

import { useActionState, useEffect } from 'react';
import { submitContactForm } from '@/app/actions/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const initialState = {
    message: '',
    success: false,
    errors: undefined,
    waRedirectUrl: undefined,
};

export function ContactForm() {
    const [state, action, isPending] = useActionState(submitContactForm, initialState);

    // Redirect to WhatsApp after successful submission
    useEffect(() => {
        if (state.success && state.waRedirectUrl) {
            const timer = setTimeout(() => {
                window.open(state.waRedirectUrl, '_blank', 'noopener,noreferrer');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [state.success, state.waRedirectUrl]);

    return (
        <div className="w-full max-w-xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
            >
                {/* Glow Background */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-chart-4/10 to-transparent rounded-[2rem] blur-2xl" />

                <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-10 shadow-2xl card-glow">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
                            Quer saber quanto está <span className="text-gradient">perdendo</span> hoje?
                        </h3>
                        <p className="text-muted-foreground">
                            Responda 6 perguntas rápidas. Em 30 minutos, mostramos onde está o sangramento — e como estancá-lo.
                        </p>
                    </div>

                    <form action={action} className="space-y-5">
                        {/* Row 1: Nome + Empresa */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium">Nome</Label>
                                <Input id="name" name="name" placeholder="Seu nome" required className="h-12 bg-muted/30 border-border/50 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-sm font-medium">Empresa</Label>
                                <Input id="company" name="company" placeholder="Sua empresa" required className="h-12 bg-muted/30 border-border/50 rounded-xl" />
                            </div>
                        </div>

                        {/* Row 2: Setor */}
                        <div className="space-y-2">
                            <Label htmlFor="sector" className="text-sm font-medium">Setor</Label>
                            <Select name="sector" required>
                                <SelectTrigger className="h-12 bg-muted/30 border-border/50 rounded-xl">
                                    <SelectValue placeholder="Selecione seu setor" />
                                </SelectTrigger>
                                <SelectContent className="bg-card border-border/50">
                                    <SelectItem value="saude">{"Saúde (Clínica/Consultório)"}</SelectItem>
                                    <SelectItem value="juridico">{"Jurídico (Escritório de Advocacia)"}</SelectItem>
                                    <SelectItem value="agencia">{"Agência (Marketing/Comunicação)"}</SelectItem>
                                    <SelectItem value="arquitetura">Arquitetura/Engenharia</SelectItem>
                                    <SelectItem value="tecnologia">Tecnologia (SaaS/Software)</SelectItem>
                                    <SelectItem value="outro">Outro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Row 3: Faturamento */}
                        <div className="space-y-2">
                            <Label htmlFor="revenue" className="text-sm font-medium">Faturamento Mensal</Label>
                            <Select name="revenue" required>
                                <SelectTrigger className="h-12 bg-muted/30 border-border/50 rounded-xl">
                                    <SelectValue placeholder="Selecione a faixa" />
                                </SelectTrigger>
                                <SelectContent className="bg-card border-border/50">
                                    <SelectItem value="ate_150k">{"Até R$ 150k"}</SelectItem>
                                    <SelectItem value="150k_500k">{"R$ 150k – R$ 500k"}</SelectItem>
                                    <SelectItem value="500k_2mm">{"R$ 500k – R$ 2MM"}</SelectItem>
                                    <SelectItem value="acima_2mm">{"Acima de R$ 2MM"}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Row 4: Dor principal */}
                        <div className="space-y-2">
                            <Label htmlFor="pain" className="text-sm font-medium">{"Qual é a sua maior dor hoje?"}</Label>
                            <Select name="pain" required>
                                <SelectTrigger className="h-12 bg-muted/30 border-border/50 rounded-xl">
                                    <SelectValue placeholder={"Selecione a opção que mais se aplica"} />
                                </SelectTrigger>
                                <SelectContent className="bg-card border-border/50">
                                    <SelectItem value="lucro_invisivel">{"Não sei quanto sobra de lucro real no fim do mês"}</SelectItem>
                                    <SelectItem value="caixa_apertado">{"Vendo bem, mas o caixa vive apertado"}</SelectItem>
                                    <SelectItem value="sem_tempo">{"Faço tudo sozinho e não tenho tempo"}</SelectItem>
                                    <SelectItem value="equipe_fraca">{"Meu financeiro é feito por alguém sem preparo"}</SelectItem>
                                    <SelectItem value="preciso_estrategia">{"Preciso de estratégia, não só de operação"}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Row 5: WhatsApp */}
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium">WhatsApp</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="(31) 99060-3750"
                                required
                                className="h-12 bg-muted/30 border-border/50 rounded-xl"
                            />
                        </div>

                        <Button type="submit" className="w-full h-14 text-base font-bold rounded-full shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.01] transition-all" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    {"Agendar Diagnóstico Gratuito"} <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </Button>

                        {state.message && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`text-sm text-center mt-4 ${state.success ? 'text-green-400' : 'text-destructive'}`}
                            >
                                {state.message}
                            </motion.p>
                        )}

                        <p className="text-xs text-center text-muted-foreground pt-2">
                            {"Sem compromisso. Sem pressão. Só clareza."}
                        </p>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
