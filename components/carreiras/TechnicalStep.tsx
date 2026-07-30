'use client';

import { motion } from 'framer-motion';
import { MINI_TEST } from '@/lib/carreiras/quiz-data';

export interface TestAnswerInput {
    choice?: string;
    text: string;
}

interface Props {
    answers: Record<string, TestAnswerInput>;
    onChange: (id: string, patch: Partial<TestAnswerInput>) => void;
}

export function TechnicalStep({ answers, onChange }: Props) {
    return (
        <motion.div
            key="technical"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
        >
            <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                    Raciocínio técnico
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                    Não existe gabarito. A ideia é ver como você pensa — respostas curtas, em suas
                    palavras. Use IA se quiser; a gente valoriza voz e especificidade, não fórmula.
                </p>
            </div>

            {MINI_TEST.map((q, qi) => {
                const current = answers[q.id] ?? { text: '' };
                const chars = current.text.length;
                return (
                    <div key={q.id} className="space-y-3">
                        <p className="text-sm font-semibold text-foreground">
                            <span className="text-primary mr-2">{qi + 1}.</span>
                            {q.question}
                        </p>

                        {q.subtext && (
                            <p className="text-xs text-muted-foreground italic">{q.subtext}</p>
                        )}

                        {q.type === 'choice-with-reason' && q.choices && (
                            <div className="grid gap-2">
                                {q.choices.map((opt) => {
                                    const selected = current.choice === opt.value;
                                    return (
                                        <button
                                            type="button"
                                            key={opt.value}
                                            onClick={() => onChange(q.id, { choice: opt.value })}
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
                        )}

                        <div className="space-y-1.5">
                            <textarea
                                value={current.text}
                                onChange={(e) => onChange(q.id, { text: e.target.value.slice(0, q.charLimit) })}
                                rows={3}
                                placeholder={q.placeholder ?? 'Sua resposta.'}
                                className="w-full rounded-xl bg-muted/30 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:bg-muted/50 transition-colors p-3.5 resize-none min-h-[96px]"
                            />
                            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                                <span>
                                    {q.type === 'choice-with-reason'
                                        ? 'Escolha uma opção acima e explique em uma frase.'
                                        : 'Escreva em suas palavras.'}
                                </span>
                                <span
                                    className={
                                        chars < q.minChars
                                            ? 'text-muted-foreground/70'
                                            : chars >= q.charLimit - 20
                                              ? 'text-primary font-semibold'
                                              : 'text-foreground/80'
                                    }
                                >
                                    {chars}/{q.charLimit} · mín. {q.minChars}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </motion.div>
    );
}
