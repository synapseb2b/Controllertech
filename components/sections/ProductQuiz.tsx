'use client';

import { useState } from 'react';
import { Dialog } from 'radix-ui';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { trackQuizComplete, trackWhatsAppClick } from '@/lib/analytics/track';

/* ── Quiz Data ─────────────────────────────────────────────── */

type Option = { label: string; points: number };
type Question = { question: string; options: Option[] };

const questions: Question[] = [
    {
        question: 'Você sabe exatamente quanto sobra de lucro líquido no fim do mês?',
        options: [
            { label: 'Não faço ideia', points: 3 },
            { label: 'Tenho uma noção, mas sem precisão', points: 2 },
            { label: 'Sim, tenho relatórios mas não sei interpretar', points: 1 },
        ],
    },
    {
        question: 'Quem cuida do financeiro da sua empresa hoje?',
        options: [
            { label: 'Eu mesmo', points: 3 },
            { label: 'Um funcionário que acumula funções', points: 2 },
            { label: 'Tenho equipe, mas sem liderança estratégica', points: 1 },
        ],
    },
    {
        question: 'O que mais te tira o sono financeiramente?',
        options: [
            { label: 'Não sei se tenho dinheiro para pagar as contas do mês', points: 3 },
            { label: 'Vendo bem, mas o caixa vive apertado', points: 2 },
            { label: 'Preciso crescer mas não sei se tenho capital', points: 1 },
        ],
    },
    {
        question: 'Qual é a sua maior necessidade agora?',
        options: [
            { label: 'Organizar o básico: separar PF/PJ e ter um fluxo de caixa', points: 3 },
            { label: 'Alguém que assuma a operação financeira por mim', points: 2 },
            { label: 'Estratégia financeira para expandir com segurança', points: 1 },
        ],
    },
];

/* ── Result Definitions ──────────────────────────────────────── */

type Result = {
    product: string;
    tag: string;
    headline: string;
    description: string;
    cta: string;
    gradient: string;
};

const results: Record<string, Result> = {
    kit: {
        product: 'Kit de Organização',
        tag: 'Primeiros Passos',
        headline: 'Você precisa de organização antes de escalar.',
        description:
            'O primeiro passo é enxergar seus números. Separamos PF/PJ, estruturamos seu fluxo de caixa e revelamos sua margem oculta — para que você tome decisões com dados, não com feeling.',
        cta: 'Quero Organizar Meu Financeiro',
        gradient: 'from-slate-500 to-slate-600',
    },
    bpo: {
        product: 'Gestão Premium (BPO)',
        tag: 'Recomendado',
        headline: 'Está na hora de parar de operar o financeiro.',
        description:
            'Sua empresa já tem estrutura, mas você ainda gasta tempo demais apagando incêndio. Assumimos contas a pagar, receber, faturamento e conciliação — você foca no que gera receita.',
        cta: 'Quero Terceirizar o Financeiro',
        gradient: 'from-primary to-chart-4',
    },
    cfo: {
        product: 'CFO as a Service',
        tag: 'Alta Performance',
        headline: 'Você precisa de estratégia, não só de operação.',
        description:
            'Sua empresa já roda, mas falta liderança financeira para crescer com segurança. Entregamos visão de Runway, precificação inteligente e governança — sem inflar sua folha.',
        cta: 'Falar com o CFO',
        gradient: 'from-emerald-500 to-teal-500',
    },
};

function getResult(totalPoints: number): Result {
    if (totalPoints >= 9) return results.kit;
    if (totalPoints >= 5) return results.bpo;
    return results.cfo;
}

function buildWhatsAppUrl(result: Result) {
    const message = `Olá! Fiz o teste rápido no site e o resultado recomendou: ${result.product}. Gostaria de agendar um diagnóstico.`;
    return `https://wa.me/5531990603750?text=${encodeURIComponent(message)}`;
}

/* ── Component ───────────────────────────────────────────────── */

/**
 * Teste de diagnóstico. Renderiza um gatilho compacto (pílula "Não sabe qual
 * escolher? Faça o teste rápido") que abre o teste em um modal. A pílula é
 * pensada para viver no cabeçalho da seção "Por onde começar?" (Solutions),
 * acima dos 3 containers de solução.
 */
export function ProductQuiz() {
    const [open, setOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);

    const totalSteps = questions.length;
    const progress = showResult ? 100 : (currentStep / totalSteps) * 100;

    function resetQuiz() {
        setCurrentStep(0);
        setAnswers([]);
        setShowResult(false);
    }

    function handleOpenChange(next: boolean) {
        setOpen(next);
        if (!next) resetQuiz();
    }

    function handleSelect(points: number) {
        const newAnswers = [...answers, points];
        setAnswers(newAnswers);

        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            const finalPoints = newAnswers.reduce((sum, p) => sum + p, 0);
            trackQuizComplete({
                product: getResult(finalPoints).product,
                points: finalPoints,
            });
            setShowResult(true);
        }
    }

    function handleBack() {
        if (currentStep > 0) {
            setAnswers(answers.slice(0, -1));
            setCurrentStep(currentStep - 1);
        }
    }

    const totalPoints = answers.reduce((sum, p) => sum + p, 0);
    const result = getResult(totalPoints);

    return (
        <Dialog.Root open={open} onOpenChange={handleOpenChange}>
            <Dialog.Trigger asChild>
                <button
                    type="button"
                    className="group inline-flex items-center gap-3 rounded-full bg-card/70 backdrop-blur-xl border border-border/60 py-2 pl-5 pr-2 shadow-lg shadow-black/10 hover:border-primary/40 transition-all duration-300 cursor-pointer"
                >
                    <span className="text-sm font-medium text-muted-foreground">Não sabe qual escolher?</span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-md shadow-primary/30 group-hover:shadow-primary/50 transition-shadow">
                        Faça o Teste Rápido
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content className="fixed left-1/2 top-1/2 z-[100] w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border/50 bg-card/95 backdrop-blur-xl p-6 md:p-8 shadow-2xl shadow-black/40 focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
                    <Dialog.Title className="text-lg font-bold text-foreground">
                        Descubra o <span className="text-gradient">Momento Financeiro</span> da Sua Empresa
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-muted-foreground mt-1">
                        Responda 4 perguntas rápidas e receba a solução ideal para o próximo passo.
                    </Dialog.Description>

                    <Dialog.Close asChild>
                        <button
                            type="button"
                            aria-label="Fechar"
                            className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </Dialog.Close>

                    {/* Progress Bar */}
                    <div className="mt-5 mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-muted-foreground font-medium">
                                {showResult ? 'Resultado' : `Pergunta ${currentStep + 1} de ${totalSteps}`}
                            </span>
                            <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
                        </div>
                        <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary to-chart-4 rounded-full"
                                initial={false}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {!showResult ? (
                            <motion.div
                                key={`step-${currentStep}`}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.25 }}
                            >
                                <h3 className="text-xl md:text-2xl font-bold mb-6 text-foreground leading-tight">
                                    {questions[currentStep].question}
                                </h3>

                                <div className="space-y-3">
                                    {questions[currentStep].options.map((option, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSelect(option.points)}
                                            className="w-full text-left p-4 rounded-2xl border border-border/50 bg-muted/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-200 group cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-full border-2 border-border/50 group-hover:border-primary/60 flex items-center justify-center shrink-0 transition-colors">
                                                    <span className="text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                                                        {String.fromCharCode(65 + i)}
                                                    </span>
                                                </div>
                                                <span className="text-foreground font-medium">{option.label}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {currentStep > 0 && (
                                    <button
                                        onClick={handleBack}
                                        className="mt-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Voltar
                                    </button>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="text-center"
                            >
                                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
                                    {result.tag}
                                </span>

                                <h3 className="text-2xl font-extrabold tracking-tight mb-3">
                                    {'Recomendação: '}
                                    <span className="text-gradient">{result.product}</span>
                                </h3>

                                <p className="text-base font-medium text-muted-foreground mb-3">{result.headline}</p>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-8">{result.description}</p>

                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Button
                                        asChild
                                        className="h-12 px-6 text-base font-semibold rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.01] transition-all"
                                    >
                                        <Link
                                            href={buildWhatsAppUrl(result)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => trackWhatsAppClick({ location: 'quiz_result', product: result.product })}
                                        >
                                            {result.cta} <ArrowRight className="ml-2 w-4 h-4" />
                                        </Link>
                                    </Button>

                                    <Button
                                        variant="secondary"
                                        onClick={resetQuiz}
                                        className="h-12 px-6 text-base font-medium rounded-full bg-muted text-foreground hover:bg-muted/80"
                                    >
                                        <RotateCcw className="mr-2 w-4 h-4" />
                                        Refazer Teste
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
