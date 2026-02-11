'use client';

import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, Play } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 700], [0, 150]);
    const y2 = useTransform(scrollY, [0, 700], [0, -100]);
    const opacity = useTransform(scrollY, [0, 700], [1, 0]);

    return (
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden min-h-screen flex items-center">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid opacity-30" />

            {/* Gradient Orbs */}
            <motion.div style={{ y: y1 }} className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] opacity-60" />
            <motion.div style={{ y: y2 }} className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-chart-4/20 rounded-full blur-[120px] opacity-40" />
            <motion.div style={{ y: y1 }} className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-chart-2/15 rounded-full blur-[100px] opacity-30" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <motion.div style={{ opacity }} className="text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex justify-center lg:justify-start"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-semibold text-primary bg-primary/10 rounded-full border border-primary/20 shadow-lg shadow-primary/10">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Arquitetura Financeira Inteligente para PMEs</span>
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 leading-[1.05]"
                        >
                            Pare de gerenciar seu financeiro no escuro. Tenha um{' '}
                            <span className="text-gradient">CFO Sênior</span>
                            {' '}por uma fração do custo.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            Acesse inteligência financeira sênior para blindar seu caixa, projetar seu
                            futuro e aumentar seu lucro real. Sem CLT, sem passivo, sem surpresas.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        >
                            <Button size="lg" className="h-14 px-8 text-base font-semibold rounded-full shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all duration-300" asChild>
                                <Link href="#contact">
                                    Agendar Diagnóstico <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold rounded-full border-2 border-border/50 hover:bg-card/50 hover:border-primary/30 transition-all duration-300 group" asChild>
                                <Link href="#mechanism">
                                    <Play className="mr-2 h-4 w-4 text-primary group-hover:scale-110 transition-transform" /> Ver como funciona
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Floating Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative animate-float">
                            {/* Main Card */}
                            <div className="bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-8 shadow-2xl shadow-black/30 card-glow">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-chart-4 flex items-center justify-center">
                                            <CheckCircle2 className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground">Dashboard Financeiro</p>
                                            <p className="text-xs text-muted-foreground">Atualizado há 2 min</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 text-xs font-semibold bg-green-500/20 text-green-400 rounded-full">Saudável</span>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-muted/30 rounded-xl p-4 border border-border/30">
                                        <p className="text-xs text-muted-foreground mb-1">Receita Mensal</p>
                                        <p className="text-2xl font-bold text-foreground">R$ 485k</p>
                                        <p className="text-xs text-green-400">+12.5%</p>
                                    </div>
                                    <div className="bg-muted/30 rounded-xl p-4 border border-border/30">
                                        <p className="text-xs text-muted-foreground mb-1">Margem Líquida</p>
                                        <p className="text-2xl font-bold text-foreground">23.8%</p>
                                        <p className="text-xs text-green-400">+3.2%</p>
                                    </div>
                                </div>

                                {/* Chart Placeholder */}
                                <div className="h-32 bg-gradient-to-t from-primary/20 to-transparent rounded-xl flex items-end justify-around px-4 pb-4">
                                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                        <div key={i} style={{ height: `${h}%` }} className="w-6 bg-gradient-to-t from-primary to-primary/50 rounded-t-md" />
                                    ))}
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -top-4 -right-4 bg-card/90 backdrop-blur-xl rounded-2xl border border-border/50 px-4 py-3 shadow-xl card-glow">
                                <p className="text-xs text-muted-foreground">Economia</p>
                                <p className="text-lg font-bold text-green-400">R$ 47.2k/mês</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>
    );
}
