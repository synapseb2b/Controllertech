'use client';

import { motion } from 'framer-motion';
import { Sparkles, MapPin, Clock, GraduationCap } from 'lucide-react';

export function JobHero() {
    return (
        <section className="relative pt-28 md:pt-36 pb-8 md:pb-12 overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] opacity-40" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6"
                    >
                        <Sparkles className="w-3.5 h-3.5" /> Vaga aberta
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5"
                    >
                        Auxiliar Financeiro <span className="text-gradient">Junior</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8"
                    >
                        Primeira oportunidade em finanças na ControllerTech, ao lado do fundador Ciro Freitas.
                        Vaga desenhada em parceria com o Curso de Administração do Centro Universitário UNIFEMM.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm"
                    >
                        <Chip icon={<GraduationCap className="w-3.5 h-3.5" />}>Início de carreira</Chip>
                        <Chip icon={<MapPin className="w-3.5 h-3.5" />}>Sete Lagoas / MG</Chip>
                        <Chip icon={<Clock className="w-3.5 h-3.5" />}>Manhã, tarde ou integral</Chip>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function Chip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/70 backdrop-blur-md border border-border/50 text-foreground/80">
            <span className="text-primary">{icon}</span>
            {children}
        </span>
    );
}
