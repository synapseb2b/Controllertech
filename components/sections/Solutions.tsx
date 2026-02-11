'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

const solutions = [
    {
        tag: "Primeiros Passos",
        name: "Kit de Organização",
        headline: "Saia do caos financeiro com um plano claro.",
        copy: "Você sabe que o financeiro está bagunçado, mas não sabe por onde começar. Organizamos a base para que você enxergue seus números pela primeira vez.",
        features: ["Separação PF/PJ", "Fluxo de caixa estruturado", "Diagnóstico de margem oculta"],
        cta: "Quero Organizar",
        href: "#contact",
        popular: false,
        gradient: "from-slate-500 to-slate-600"
    },
    {
        tag: "Recomendado",
        name: "Gestão Premium (BPO)",
        headline: "Pare de operar o financeiro. Assuma o comando estratégico.",
        copy: "Nós assumimos contas a pagar, receber, faturamento e conciliação. Você para de apagar incêndio e foca no que gera receita.",
        features: ["Operação financeira completa", "Relatórios mensais de desempenho", "Analista financeiro dedicado", "Auditoria sênior contínua", "Recuperação de margem oculta"],
        cta: "Quero Terceirizar",
        href: "#contact",
        popular: true,
        gradient: "from-primary to-chart-4"
    },
    {
        tag: "Alta Performance",
        name: "CFO as a Service",
        headline: "A inteligência de um CFO sênior sem inflar sua folha.",
        copy: "Sua empresa já tem operação, mas falta liderança financeira estratégica. Entregamos visão de Runway, precificação inteligente e governança para acelerar com segurança.",
        features: ["Estratégia de crescimento e expansão", "Precificação e proteção de margem", "Governança financeira e compliance", "Projeção de Runway e distribuição de lucros"],
        cta: "Falar com o CFO",
        href: "#contact",
        popular: false,
        gradient: "from-emerald-500 to-teal-500"
    }
];

export function Solutions() {
    return (
        <section id="solutions" className="py-20 md:py-28 relative overflow-hidden bg-muted/5">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-chart-4/5 to-transparent" />
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Qual é o seu <span className="text-gradient">momento atual</span>?
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {solutions.map((solution, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative group ${solution.popular ? 'lg:-translate-y-4 pt-4' : ''}`}
                        >
                            <div className={`h-full flex flex-col items-center text-center p-8 rounded-3xl border transition-all duration-500 hover:scale-[1.02] relative ${solution.popular
                                    ? 'bg-card/80 backdrop-blur-xl border-primary/50 shadow-2xl shadow-primary/20'
                                    : 'bg-card/50 backdrop-blur-sm border-border/50 card-glow'
                                }`}>
                                {/* Popular Badge */}
                                {solution.popular && (
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-chart-4 to-primary" />
                                )}
                                {solution.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-chart-4 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                                        <Sparkles className="w-3 h-3" /> MAIS POPULAR
                                    </div>
                                )}

                                {/* Tag */}
                                <span className={`text-xs font-semibold uppercase tracking-wider mb-4 ${solution.popular ? 'text-primary' : 'text-muted-foreground'}`}>
                                    {solution.tag}
                                </span>

                                {/* Name & Headline */}
                                <h3 className="text-2xl font-bold mb-2 text-foreground">{solution.name}</h3>
                                <p className="text-lg font-medium text-muted-foreground mb-6">{solution.headline}</p>

                                {/* Copy */}
                                <p className="text-muted-foreground text-sm leading-relaxed mb-8">{solution.copy}</p>

                                {/* Features */}
                                <div className="space-y-3 mb-8 flex-grow w-full">
                                    {solution.features.map((feature, i) => (
                                        <div key={i} className="flex items-center justify-center gap-3">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${solution.popular ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                                <Check className="w-3 h-3" />
                                            </div>
                                            <span className="text-sm text-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <Button
                                    asChild
                                    className={`w-full h-12 text-base font-semibold rounded-full transition-all ${solution.popular
                                            ? 'shadow-lg shadow-primary/30 hover:shadow-primary/50'
                                            : 'bg-muted text-foreground hover:bg-muted/80'
                                        }`}
                                    variant={solution.popular ? 'default' : 'secondary'}
                                >
                                    <Link href={solution.href}>
                                        {solution.cta} <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
