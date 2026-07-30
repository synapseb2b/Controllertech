'use client';

import { motion } from 'framer-motion';
import { CULTURAL_QUESTIONS } from '@/lib/carreiras/quiz-data';

interface Props {
    answers: Record<string, number>;
    onChange: (id: string, weight: number) => void;
}

export function CulturalStep({ answers, onChange }: Props) {
    return (
        <motion.div
            key="cultural"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
        >
            <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                    Fit cultural
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                    5 perguntas rápidas. Não existe resposta certa — o que a gente busca é entender como você pensa.
                </p>
            </div>

            {CULTURAL_QUESTIONS.map((q, qi) => (
                <div key={q.id} className="space-y-3">
                    <p className="text-sm font-semibold text-foreground">
                        <span className="text-primary mr-2">{qi + 1}.</span>
                        {q.question}
                    </p>
                    <div className="grid gap-2">
                        {q.options.map((opt, i) => {
                            const selected = answers[q.id] === i;
                            return (
                                <button
                                    type="button"
                                    key={i}
                                    onClick={() => onChange(q.id, i)}
                                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                                        selected
                                            ? 'border-primary/60 bg-primary/15 shadow-md shadow-primary/10'
                                            : 'border-border/50 bg-muted/20 hover:bg-primary/5 hover:border-primary/30'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                                selected ? 'border-primary bg-primary' : 'border-border/60'
                                            }`}
                                        >
                                            {selected && (
                                                <span className="w-2 h-2 rounded-full bg-primary-foreground" />
                                            )}
                                        </div>
                                        <span className="text-sm text-foreground">{opt.label}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </motion.div>
    );
}
