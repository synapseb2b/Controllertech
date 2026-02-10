'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

const solutions = [
    {
        tag: "Para quem está começando",
        name: "Kit de Organização",
        headline: "O primeiro passo antes de escalar.",
        copy: "Para empresários que sabem que o financeiro está bagunçado e querem dar o primeiro passo sem compromisso.",
        features: ["Separação PF/PJ", "Fluxo de caixa básico", "Planilhas prontas"],
        cta: "Conhecer o Kit",
        href: "#contact",
        popular: false,
        gradient: "from-slate-500 to-slate-600"
    },
    {
        tag: "Recomendado",
        name: "Gestão Premium (BPO)",
        headline: "Sua operação financeira no piloto automático — com um CFO Sênior no comando.",
        copy: "Nós assumimos as rotinas: contas a pagar, receber, faturamento e conciliação. Você ganha tempo.",
        features: ["Operação completa", "Relatórios mensais", "Suporte dedicado", "Olhar sênior", "Recuperação de margem oculta"],
        cta: "Quero Terceirizar",
        href: "#contact",
        popular: true,
        gradient: "from-primary to-chart-4"
    },
    {
        tag: "Alta Performance",
        name: "CFO as a Service",
        headline: "A estrutura de uma multinacional sem inflar sua folha.",
        copy: "Para empresas que já possuem operação, mas carecem de liderança financeira estratégica.",
        features: ["Estratégia de crescimento", "Precificação avançada", "Governança financeira", "Visão de Runway"],
        cta: "Falar com Consultor",
        href: "#contact",
        popular: false,
        gradient: "from-emerald-500 to-teal-500"
    }
];

export function Solutions() {
    return (
        <section id="solutions" className="py-24 md:py-32 relative overflow-hidden">
            <div className="container mx-auto px-4">
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
                            <div className={`h-full flex flex-col p-8 rounded-3xl border transition-all duration-500 hover:scale-[1.02] relative ${solution.popular
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
                                <div className="space-y-3 mb-8 flex-grow">
                                    {solution.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${solution.popular ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
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
