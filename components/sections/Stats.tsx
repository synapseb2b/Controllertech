'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
    { label: 'Faturamento sob gestão', value: 10, suffix: 'M+', prefix: 'R$ ', description: 'Mensalmente' },
    { label: 'Margem Oculta Recuperada', value: 20, suffix: '%', prefix: '', description: 'Nos primeiros 90 dias' },
    { label: 'Horas Devolvidas', value: 10, suffix: 'h+', prefix: '', description: 'Devolvidas ao dono por semana' },
    { label: 'Custo-Benefício', value: 3, suffix: ':1', prefix: '', description: 'Mais inteligência por 1/3 do custo' },
];

function CountUp({ target, prefix, suffix }: { target: number; prefix: string; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const duration = 2000;
        const step = target / (duration / 16);

        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isInView, target]);

    return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export function Stats() {
    return (
        <section id="stats" className="py-20 md:py-28 relative overflow-hidden bg-muted/5">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-bold text-primary uppercase tracking-wider">O que já entregamos</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold mt-3 tracking-tight">Impacto <span className="text-gradient">Real</span></h2>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="relative group"
                        >
                            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8 text-center card-glow transition-all duration-300 hover:scale-[1.02]">
                                <div className="text-5xl md:text-6xl font-extrabold tracking-tighter text-gradient mb-3">
                                    <CountUp target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                                </div>
                                <div className="text-sm font-bold text-primary uppercase tracking-wide mb-2">
                                    {stat.label}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {stat.description}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
