'use client';

import { motion } from 'framer-motion';
import { Target, PiggyBank, Moon } from 'lucide-react';

const benefits = [
    {
        icon: Target,
        title: "Projeção Financeira de 90 dias",
        description: "Você sabe hoje quanto terá de caixa livre nos próximos três meses, quanto pode distribuir e onde precisa ajustar. Decisão com dados, não com feeling.",
    },
    {
        icon: PiggyBank,
        title: "Economia 3:1",
        description: "Um time multidisciplinar liderado por CFO Sênior por R$ 3-5k/mês vs. R$ 8-10k de um CLT júnior. 3x mais inteligência por 1/3 do custo.",
    },
    {
        icon: Moon,
        title: "Paz de Espírito",
        description: "Elimine a ansiedade de abrir o extrato sem entender para onde o dinheiro foi. Durma tranquilo sabendo que não há vazamentos no caixa.",
    }
];

export function Benefits() {
    return (
        <section className="py-20 md:py-28 relative overflow-hidden bg-muted/5">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Heading — Centered */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                            Por que escolher a <span className="text-gradient">ControllerTech</span>?
                        </h2>
                    </motion.div>

                    {/* Visual Stats Card — Centered */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mb-16 max-w-lg mx-auto"
                    >
                        <div className="relative rounded-3xl bg-card/60 backdrop-blur-xl border border-border/50 p-8 overflow-hidden card-glow">
                            {/* Grid Background */}
                            <div className="absolute inset-0 bg-grid opacity-30" />

                            {/* Content */}
                            <div className="relative z-10 flex flex-col justify-center items-center text-center">
                                {/* Main Stat */}
                                <div className="mb-6">
                                    <div className="text-7xl md:text-8xl font-extrabold text-gradient mb-2">92%</div>
                                    <p className="text-muted-foreground text-lg">Previsibilidade de Caixa</p>
                                    <p className="text-muted-foreground text-sm mt-2 max-w-[280px] mx-auto">Nossos clientes passam de &apos;não sei se pago a folha&apos; para 6+ meses de caixa garantido.</p>
                                </div>

                                {/* Sub Stats */}
                                <div className="grid grid-cols-2 gap-6 w-full max-w-xs">
                                    <div className="bg-muted/30 rounded-xl p-4 border border-border/30">
                                        <div className="text-2xl font-bold text-green-400">+23%</div>
                                        <p className="text-xs text-muted-foreground">Margem Líquida</p>
                                    </div>
                                    <div className="bg-muted/30 rounded-xl p-4 border border-border/30">
                                        <div className="text-2xl font-bold text-primary">3x</div>
                                        <p className="text-xs text-muted-foreground">Menor Custo</p>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
                        </div>
                    </motion.div>

                    {/* Benefits Grid — Centered cards */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="text-center group"
                            >
                                <div className="p-3 rounded-2xl bg-primary/15 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <benefit.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-foreground">{benefit.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
