'use client';

import { motion } from 'framer-motion';
import { Cpu, UserCheck, ShieldCheck } from 'lucide-react';

const pillars = [
    {
        title: "Tecnologia",
        description: "Sistemas integrados capturam seus dados financeiros em tempo real. Você para de gastar tempo com o operacional e ganha visibilidade total do que importa.",
        icon: Cpu,
    },
    {
        title: "Curadoria Sênior",
        description: "Um CFO Sênior audita, interpreta e traduz seus números em decisões de proteção de margem e aceleração de crescimento.",
        icon: UserCheck,
    },
    {
        title: "Segurança Total",
        description: "Você mantém o \"token mestre\": autorização final de todo pagamento. Seu dinheiro nunca sai sem o seu de acordo.",
        icon: ShieldCheck,
    }
];

export function Mechanism() {
    return (
        <section id="mechanism" className="py-20 md:py-28 relative overflow-hidden bg-muted/5">
            {/* Background */}
            <div className="absolute inset-0 bg-grid opacity-20" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <span className="text-sm font-bold text-primary uppercase tracking-wider">Como Funciona</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 tracking-tight">
                        A <span className="text-gradient">Tecnologia</span> Processa. Os Especialistas Gerenciam. Você Lucra.
                    </h2>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="h-full bg-card/60 backdrop-blur-xl rounded-3xl border border-border/50 p-8 card-glow transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/5 relative overflow-hidden text-center">
                                {/* Icon */}
                                <div className="mb-8 p-4 rounded-2xl w-fit mx-auto bg-primary/15">
                                    <pillar.icon className="w-8 h-8 text-primary" />
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold mb-4 text-foreground">{pillar.title}</h3>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {pillar.description}
                                </p>

                                {/* Number Badge */}
                                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-sm font-bold text-muted-foreground">
                                    0{index + 1}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
