'use client';

import { useState, useMemo, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CulturalStep } from './CulturalStep';
import { TechnicalStep, type TestAnswerInput } from './TechnicalStep';
import { SuccessScreen } from './SuccessScreen';
import {
    CURSO_OPTIONS,
    EXPERIENCIA_OPTIONS,
    DISPONIBILIDADE_OPTIONS,
    CULTURAL_QUESTIONS,
    MINI_TEST,
} from '@/lib/carreiras/quiz-data';
import { submitCandidatura } from '@/app/actions/candidatura';

interface IdentificationData {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
}

interface AcademicData {
    curso: string;
    cursoOutro: string;
    periodo: string;
    experiencia: string;
    disponibilidade: string;
    motivacao: string;
}

const STEPS = ['Identificação', 'Momento acadêmico', 'Fit cultural', 'Mini teste'] as const;

export function ApplicationForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const [ident, setIdent] = useState<IdentificationData>({
        name: '',
        email: '',
        phone: '',
        linkedin: '',
    });

    const [acad, setAcad] = useState<AcademicData>({
        curso: '',
        cursoOutro: '',
        periodo: '',
        experiencia: '',
        disponibilidade: '',
        motivacao: '',
    });

    const [culturalAnswers, setCulturalAnswers] = useState<Record<string, number>>({});
    const [testAnswers, setTestAnswers] = useState<Record<string, TestAnswerInput>>({});
    const [showValidationHint, setShowValidationHint] = useState(false);

    const totalSteps = STEPS.length;
    const progress = submitted ? 100 : ((currentStep + 1) / totalSteps) * 100;

    const stepValidity = useMemo(() => {
        const step1 =
            ident.name.trim().length >= 3 &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ident.email.trim()) &&
            ident.phone.replace(/\D/g, '').length >= 10;
        const step2 =
            acad.curso.length > 0 &&
            (acad.curso !== 'outro' || acad.cursoOutro.trim().length > 0) &&
            acad.periodo.length > 0 &&
            acad.experiencia.length > 0 &&
            acad.disponibilidade.length > 0 &&
            acad.motivacao.trim().length >= 20;
        const step3 = CULTURAL_QUESTIONS.every((q) => culturalAnswers[q.id] !== undefined);
        const step4 = MINI_TEST.every((q) => {
            const a = testAnswers[q.id];
            if (!a) return false;
            if (q.type === 'choice-with-reason' && !a.choice) return false;
            return a.text.trim().length >= q.minChars;
        });
        return [step1, step2, step3, step4];
    }, [ident, acad, culturalAnswers, testAnswers]);

    function handleNext() {
        if (!stepValidity[currentStep]) {
            setShowValidationHint(true);
            return;
        }
        setShowValidationHint(false);
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleSubmit();
        }
    }

    function handleBack() {
        setShowValidationHint(false);
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    }

    function handleSubmit() {
        setSubmitError(null);
        startTransition(async () => {
            const fd = new FormData();
            fd.append('name', ident.name.trim());
            fd.append('email', ident.email.trim());
            fd.append('phone', ident.phone.trim());
            fd.append('linkedin', ident.linkedin.trim());
            fd.append('curso', acad.curso);
            fd.append('cursoOutro', acad.cursoOutro.trim());
            fd.append('periodo', acad.periodo);
            fd.append('experiencia', acad.experiencia);
            fd.append('disponibilidade', acad.disponibilidade);
            fd.append('motivacao', acad.motivacao.trim());
            fd.append('culturalAnswers', JSON.stringify(culturalAnswers));
            fd.append('testAnswers', JSON.stringify(testAnswers));

            const result = await submitCandidatura({}, fd);

            if (result.success) {
                setSubmitted(true);
            } else {
                setSubmitError(result.message ?? 'Erro ao enviar. Tente novamente.');
            }
        });
    }

    if (submitted) {
        return (
            <div className="bg-card/60 backdrop-blur-xl rounded-3xl border border-border/50 p-6 md:p-10 card-glow">
                <SuccessScreen candidateName={ident.name} />
            </div>
        );
    }

    return (
        <div className="bg-card/60 backdrop-blur-xl rounded-3xl border border-border/50 p-6 md:p-10 card-glow">
            {/* Progress */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-muted-foreground font-medium">
                        Etapa {currentStep + 1} de {totalSteps} · {STEPS[currentStep]}
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
                {currentStep === 0 && (
                    <IdentificationStep key="step-0" data={ident} onChange={setIdent} />
                )}
                {currentStep === 1 && (
                    <AcademicStep key="step-1" data={acad} onChange={setAcad} />
                )}
                {currentStep === 2 && (
                    <CulturalStep
                        answers={culturalAnswers}
                        onChange={(id, weight) => setCulturalAnswers({ ...culturalAnswers, [id]: weight })}
                    />
                )}
                {currentStep === 3 && (
                    <TechnicalStep
                        answers={testAnswers}
                        onChange={(id, patch) =>
                            setTestAnswers({
                                ...testAnswers,
                                [id]: { ...(testAnswers[id] ?? { text: '' }), ...patch },
                            })
                        }
                    />
                )}
            </AnimatePresence>

            {showValidationHint && !stepValidity[currentStep] && (
                <p className="mt-6 text-sm text-destructive">
                    Preencha todos os campos desta etapa para avançar.
                </p>
            )}

            {submitError && (
                <p className="mt-6 text-sm text-destructive">{submitError}</p>
            )}

            <div className="mt-8 flex items-center justify-between gap-3">
                {currentStep > 0 ? (
                    <button
                        type="button"
                        onClick={handleBack}
                        disabled={isPending}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-50"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar
                    </button>
                ) : (
                    <div />
                )}

                <Button
                    onClick={handleNext}
                    disabled={isPending}
                    className="h-11 px-6 rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 font-semibold"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Enviando…
                        </>
                    ) : currentStep === totalSteps - 1 ? (
                        <>Enviar candidatura <ArrowRight className="ml-2 w-4 h-4" /></>
                    ) : (
                        <>Continuar <ArrowRight className="ml-2 w-4 h-4" /></>
                    )}
                </Button>
            </div>
        </div>
    );
}

/* ─────────────────────────── Step 1 ─────────────────────────── */

function IdentificationStep({
    data,
    onChange,
}: {
    data: IdentificationData;
    onChange: (d: IdentificationData) => void;
}) {
    return (
        <motion.div
            key="ident"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
        >
            <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                    Vamos começar com o básico.
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                    Só o essencial pra gente entrar em contato.
                </p>
            </div>

            <Field label="Nome completo" required>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => onChange({ ...data, name: e.target.value })}
                    placeholder="Como você quer ser chamado(a)"
                    className={inputStyles}
                />
            </Field>

            <Field label="E-mail" required>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => onChange({ ...data, email: e.target.value })}
                    placeholder="seuemail@exemplo.com"
                    className={inputStyles}
                />
            </Field>

            <Field label="WhatsApp" required hint="Com DDD, sem espaços.">
                <input
                    type="tel"
                    value={data.phone}
                    onChange={(e) => onChange({ ...data, phone: e.target.value })}
                    placeholder="(31) 99999-9999"
                    className={inputStyles}
                />
            </Field>

            <Field label="LinkedIn" hint="Opcional, mas ajuda muito.">
                <input
                    type="url"
                    value={data.linkedin}
                    onChange={(e) => onChange({ ...data, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/seu-perfil"
                    className={inputStyles}
                />
            </Field>
        </motion.div>
    );
}

/* ─────────────────────────── Step 2 ─────────────────────────── */

function AcademicStep({
    data,
    onChange,
}: {
    data: AcademicData;
    onChange: (d: AcademicData) => void;
}) {
    return (
        <motion.div
            key="acad"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
        >
            <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                    Onde você está na graduação e na carreira.
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                    Respostas curtas e objetivas.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Curso" required>
                    <select
                        value={data.curso}
                        onChange={(e) => onChange({ ...data, curso: e.target.value })}
                        className={inputStyles}
                    >
                        <option value="">Selecione</option>
                        {CURSO_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </Field>

                <Field label="Período atual" required>
                    <select
                        value={data.periodo}
                        onChange={(e) => onChange({ ...data, periodo: e.target.value })}
                        className={inputStyles}
                    >
                        <option value="">Selecione</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <option key={n} value={String(n)}>{n}º período</option>
                        ))}
                    </select>
                </Field>
            </div>

            {data.curso === 'outro' && (
                <Field label="Qual curso?" required>
                    <input
                        type="text"
                        value={data.cursoOutro}
                        onChange={(e) => onChange({ ...data, cursoOutro: e.target.value })}
                        placeholder="Digite o nome do curso"
                        className={inputStyles}
                    />
                </Field>
            )}

            <Field label="Experiência prévia em finanças/administrativo" required>
                <select
                    value={data.experiencia}
                    onChange={(e) => onChange({ ...data, experiencia: e.target.value })}
                    className={inputStyles}
                >
                    <option value="">Selecione</option>
                    {EXPERIENCIA_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>
            </Field>

            <Field label="Disponibilidade" required>
                <select
                    value={data.disponibilidade}
                    onChange={(e) => onChange({ ...data, disponibilidade: e.target.value })}
                    className={inputStyles}
                >
                    <option value="">Selecione</option>
                    {DISPONIBILIDADE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>
            </Field>

            <Field
                label="Em uma frase, por que essa vaga te interessa?"
                required
                hint={`${data.motivacao.length}/240 caracteres · mín. 20`}
            >
                <textarea
                    value={data.motivacao}
                    onChange={(e) => onChange({ ...data, motivacao: e.target.value.slice(0, 240) })}
                    rows={3}
                    placeholder="Seja objetivo(a). Uma frase honesta vale mais que um parágrafo."
                    className={`${inputStyles} resize-none min-h-[88px]`}
                />
            </Field>
        </motion.div>
    );
}

/* ─────────────────────────── Field helper ─────────────────────────── */

function Field({
    label,
    required,
    hint,
    children,
}: {
    label: string;
    required?: boolean;
    hint?: string;
    children: React.ReactNode;
}) {
    return (
        <label className="block">
            <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
                    {label} {required && <span className="text-primary">*</span>}
                </span>
                {hint && <span className="text-[11px] text-muted-foreground">{hint}</span>}
            </div>
            {children}
        </label>
    );
}

const inputStyles =
    'w-full h-11 px-4 rounded-xl bg-muted/30 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:bg-muted/50 transition-colors';
