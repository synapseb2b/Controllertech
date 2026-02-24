'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export function BlogHero() {
    return (
        <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[150px] opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
            />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-6"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary bg-primary/10 rounded-full border border-primary/20">
                        <BookOpen className="w-4 h-4" />
                        <span>{"Inteligência Financeira para PMEs"}</span>
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
                >
                    <span className="text-gradient">Blog</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg text-muted-foreground max-w-2xl mx-auto"
                >
                    {"Artigos estratégicos sobre gestão financeira para PMEs. Conteúdo prático para quem quer parar de tomar decisão com feeling — e começar a decidir com dados."}
                </motion.p>
            </div>
        </section>
    );
}
