import { CULTURAL_QUESTIONS, CULTURAL_MAX_SCORE, MINI_TEST } from './quiz-data';

export type FitTier = 'Alto' | 'Médio' | 'Baixo';

export interface CulturalScore {
    total: number;
    max: number;
    tier: FitTier;
    breakdown: Array<{
        question: string;
        answer: string;
        weight: number;
    }>;
}

export interface TestAnswer {
    choice?: string;
    text: string;
}

export interface TestReport {
    breakdown: Array<{
        question: string;
        type: 'open' | 'choice-with-reason';
        choice?: string;
        choiceLabel?: string;
        text: string;
    }>;
}

export function calcCulturalScore(answers: Record<string, number>): CulturalScore {
    let total = 0;
    const breakdown: CulturalScore['breakdown'] = [];

    for (const q of CULTURAL_QUESTIONS) {
        const chosenIndex = answers[q.id];
        const option = q.options[chosenIndex];
        if (option) {
            total += option.weight;
            breakdown.push({
                question: q.question,
                answer: option.label,
                weight: option.weight,
            });
        } else {
            breakdown.push({
                question: q.question,
                answer: '(sem resposta)',
                weight: 0,
            });
        }
    }

    let tier: FitTier = 'Baixo';
    if (total >= 7) tier = 'Alto';
    else if (total >= 4) tier = 'Médio';

    return { total, max: CULTURAL_MAX_SCORE, tier, breakdown };
}

export function buildTestReport(answers: Record<string, TestAnswer>): TestReport {
    const breakdown: TestReport['breakdown'] = [];

    for (const q of MINI_TEST) {
        const ans = answers[q.id];
        const text = ans?.text?.trim() ?? '';
        const choice = ans?.choice?.trim();
        const choiceLabel =
            choice && q.choices ? q.choices.find((c) => c.value === choice)?.label : undefined;

        breakdown.push({
            question: q.question,
            type: q.type,
            choice,
            choiceLabel,
            text: text.length > 0 ? text : '(sem resposta)',
        });
    }

    return { breakdown };
}
