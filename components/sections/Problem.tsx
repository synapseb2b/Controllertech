'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, EyeOff, DollarSign } from 'lucide-react';

export function Problem() {
    return (
        <section className="py-20 md:py-28 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-transparent to-transparent" />

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-semibold text-muted-foreground bg-muted/50 rounded-full border border-border/50">
                        <AlertTriangle className="w-4 h-4" />
                        <span>O que está travando seu crescimento</span>
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight">
                        <span className="text-gradient">Ter alguém</span> no financeiro — ou <span className="text-gradient">fazer você mesmo</span> — <br className="hidden md:block" />
                        <span className="text-gradient">não é</span> ter gestão financeira.
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-center mb-16"
                >
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                        Muitos empresários confundem <span className="text-foreground font-semibold">processar contas</span> com <span className="text-foreground font-semibold">ter estratégia de caixa</span>.
                        Você paga caro por uma operação que registra o passado — mas não projeta o futuro,
                        não evita erros de precificação e não protege sua margem.
                    </p>
                </motion.div>

                {/* Pain Points Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 card-glow group hover:border-primary/30 transition-all duration-300 text-center hover:shadow-lg hover:shadow-primary/5"
                    >
                        <div className="p-3 bg-primary/10 text-primary rounded-xl w-fit mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                            <TrendingDown className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-foreground">Sangramento de Margem</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">Custos fixos invisíveis, precificação errada e bitributação drenam até 20% da sua margem sem você perceber.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.23 }}
                        className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 card-glow group hover:border-primary/30 transition-all duration-300 text-center hover:shadow-lg hover:shadow-primary/5"
                    >
                        <div className="p-3 bg-muted text-muted-foreground rounded-xl w-fit mb-4 mx-auto group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <EyeOff className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-foreground">Decisão Solitária</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">Sem um Advisor Sênior, cada decisão de compra ou expansão é uma aposta baseada em feeling.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.31 }}
                        className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 card-glow group hover:border-primary/30 transition-all duration-300 text-center hover:shadow-lg hover:shadow-primary/5"
                    >
                        <div className="p-3 bg-muted text-muted-foreground rounded-xl w-fit mb-4 mx-auto group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-foreground">Teto de Vidro</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">Sua empresa para de crescer não por falta de vendas, mas por incapacidade de gerir o capital de giro.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
