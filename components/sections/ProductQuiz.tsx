'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
    const message = `Olá! Fiz o teste rápido no site e o resultado recomendou: ${result.product}. Gostaria de agendar um diagnóstico gratuito.`;
    return `https://wa.me/5531990603750?text=${encodeURIComponent(message)}`;
}

/* ── Component ───────────────────────────────────────────────── */

export function ProductQuiz() {
    const [started, setStarted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);

    const totalSteps = questions.length;
    const progress = showResult ? 100 : ((currentStep) / totalSteps) * 100;

    function handleSelect(points: number) {
        const newAnswers = [...answers, points];
        setAnswers(newAnswers);

        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowResult(true);
        }
    }

    function handleBack() {
        if (currentStep > 0) {
            setAnswers(answers.slice(0, -1));
            setCurrentStep(currentStep - 1);
        }
    }

    function handleReset() {
        setStarted(false);
        setCurrentStep(0);
        setAnswers([]);
        setShowResult(false);
    }

    const totalPoints = answers.reduce((sum, p) => sum + p, 0);
    const result = getResult(totalPoints);

    return (
        <section className="pb-20 md:pb-28 relative overflow-hidden bg-muted/5">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-2xl mx-auto">
                    <AnimatePresence mode="wait">
                        {/* ── Intro State ── */}
                        {!started && (
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center"
                            >
                                <div className="relative bg-card/60 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-12 card-glow">
                                    <div className="absolute inset-0 bg-grid opacity-20 rounded-3xl" />
                                    <div className="relative z-10">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                                            <Sparkles className="w-4 h-4" />
                                            Teste Rápido
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
                                            {"Não sabe qual escolher?"}
                                        </h3>
                                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                            Responda 4 perguntas rápidas e descubra qual solução é ideal para o momento da sua empresa.
                                        </p>
                                        <Button
                                            onClick={() => setStarted(true)}
                                            className="h-12 px-8 text-base font-semibold rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.01] transition-all"
                                        >
                                            {"Começar o Teste"} <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ── Quiz Steps ── */}
                        {started && !showResult && (
                            <motion.div
                                key={`step-${currentStep}`}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative bg-card/60 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-12 card-glow">
                                    <div className="absolute inset-0 bg-grid opacity-20 rounded-3xl" />
                                    <div className="relative z-10">
                                        {/* Progress Bar */}
                                        <div className="mb-8">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs text-muted-foreground font-medium">
                                                    Pergunta {currentStep + 1} de {totalSteps}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {Math.round(progress)}%
                                                </span>
                                            </div>
                                            <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-primary to-chart-4 rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    transition={{ duration: 0.4 }}
                                                />
                                            </div>
                                        </div>

                                        {/* Question */}
                                        <h3 className="text-xl md:text-2xl font-bold mb-8 text-foreground leading-tight">
                                            {questions[currentStep].question}
                                        </h3>

                                        {/* Options */}
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
                                                        <span className="text-foreground font-medium">
                                                            {option.label}
                                                        </span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>

                                        {/* Back Button */}
                                        {currentStep > 0 && (
                                            <button
                                                onClick={handleBack}
                                                className="mt-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                                            >
                                                <ArrowLeft className="w-4 h-4" />
                                                Voltar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ── Result ── */}
                        {started && showResult && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="relative bg-card/80 backdrop-blur-xl border border-primary/30 rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary/10">
                                    <div className="absolute inset-0 bg-grid opacity-20 rounded-3xl" />
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-chart-4 to-primary rounded-t-3xl" />

                                    <div className="relative z-10 text-center">
                                        {/* Progress Complete */}
                                        <div className="mb-8">
                                            <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-primary to-chart-4 rounded-full"
                                                    initial={{ width: '75%' }}
                                                    animate={{ width: '100%' }}
                                                    transition={{ duration: 0.6 }}
                                                />
                                            </div>
                                        </div>

                                        {/* Tag */}
                                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
                                            {result.tag}
                                        </span>

                                        {/* Product Name */}
                                        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
                                            {"Recomendação: "}<span className="text-gradient">{result.product}</span>
                                        </h3>

                                        {/* Headline */}
                                        <p className="text-lg font-medium text-muted-foreground mb-4">
                                            {result.headline}
                                        </p>

                                        {/* Description */}
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-lg mx-auto">
                                            {result.description}
                                        </p>

                                        {/* CTAs */}
                                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                            <Button
                                                asChild
                                                className="h-12 px-8 text-base font-semibold rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.01] transition-all"
                                            >
                                                <Link
                                                    href={buildWhatsAppUrl(result)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {result.cta} <ArrowRight className="ml-2 w-4 h-4" />
                                                </Link>
                                            </Button>

                                            <Button
                                                variant="secondary"
                                                onClick={handleReset}
                                                className="h-12 px-6 text-base font-medium rounded-full bg-muted text-foreground hover:bg-muted/80"
                                            >
                                                <RotateCcw className="mr-2 w-4 h-4" />
                                                Refazer Teste
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
