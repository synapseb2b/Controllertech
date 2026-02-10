'use client';

import { useActionState } from 'react';
import { submitContactForm } from '@/app/actions/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2, Send, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const initialState = {
    message: '',
    success: false,
    errors: undefined
};

export function ContactForm() {
    const [state, action, isPending] = useActionState(submitContactForm, initialState);

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
                            Agende sua anamnese financeira gratuita. Em 30 minutos, mostramos onde está o sangramento — e como estancá-lo. Sem compromisso.
                        </p>
                    </div>

                    <form action={action} className="space-y-5">
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

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">Email Corporativo</Label>
                            <Input id="email" name="email" type="email" placeholder="voce@empresa.com.br" required className="h-12 bg-muted/30 border-border/50 rounded-xl" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="revenue" className="text-sm font-medium">Faturamento Mensal</Label>
                            <Select name="revenue" required>
                                <SelectTrigger className="h-12 bg-muted/30 border-border/50 rounded-xl">
                                    <SelectValue placeholder="Selecione um intervalo" />
                                </SelectTrigger>
                                <SelectContent className="bg-card border-border/50">
                                    <SelectItem value="ate_175k">Até R$ 175k</SelectItem>
                                    <SelectItem value="175k_500k">R$ 175k - R$ 500k</SelectItem>
                                    <SelectItem value="500k_2mm">R$ 500k - R$ 2MM</SelectItem>
                                    <SelectItem value="acima_2mm">Acima de R$ 2MM</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="challenge" className="text-sm font-medium">Qual seu maior desafio financeiro hoje?</Label>
                            <Textarea
                                id="challenge"
                                name="message"
                                placeholder="Ex: Vendo bem mas o caixa continua sem saldo / Não sei quanto sobra para eu retirar"
                                className="min-h-[100px] bg-muted/30 border-border/50 rounded-xl resize-none"
                                required
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
                                    Agendar Diagnóstico Gratuito <ArrowRight className="ml-2 h-5 w-5" />
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
                            Sem compromisso. Sem pressão. Só clareza.
                        </p>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
