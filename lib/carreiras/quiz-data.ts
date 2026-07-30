export interface CulturalOption {
    label: string;
    weight: number;
}

export interface CulturalQuestion {
    id: string;
    question: string;
    options: CulturalOption[];
}

export type TestQuestionType = 'open' | 'choice-with-reason';

export interface TestChoice {
    value: string;
    label: string;
}

export interface TestQuestion {
    id: string;
    type: TestQuestionType;
    question: string;
    subtext?: string;
    choices?: TestChoice[];
    charLimit: number;
    minChars: number;
    placeholder?: string;
}

/**
 * 3 perguntas de fit cultural. Escolhidas para os traços mais críticos
 * numa função financeira júnior: iniciativa, honestidade, disciplina em processos.
 * Peso 0–3 por resposta. Score total 0–9 → Alto (7–9) / Médio (4–6) / Baixo (0–3).
 */
export const CULTURAL_QUESTIONS: CulturalQuestion[] = [
    {
        id: 'iniciativa',
        question: 'Diante de uma tarefa nova sem instruções claras, você:',
        options: [
            { label: 'Aguardo instruções detalhadas antes de começar', weight: 0 },
            { label: 'Pergunto e sigo a instrução', weight: 1 },
            { label: 'Tento entender o objetivo e proponho um caminho', weight: 2 },
            { label: 'Faço uma primeira versão e apresento para ajustar', weight: 3 },
        ],
    },
    {
        id: 'honestidade',
        question: 'Você identifica que lançou um valor errado num relatório que já foi enviado:',
        options: [
            { label: 'Espero alguém notar', weight: 0 },
            { label: 'Corrijo silenciosamente', weight: 1 },
            { label: 'Aviso o líder assim que possível com contexto', weight: 2 },
            { label: 'Aviso, corrijo, documento e proponho como evitar recorrência', weight: 3 },
        ],
    },
    {
        id: 'processos',
        question: 'Sobre processos repetitivos e conferência de valores:',
        options: [
            { label: 'Cansam; prefiro variedade', weight: 0 },
            { label: 'Aceito como parte do trabalho', weight: 1 },
            { label: 'Vejo como oportunidade de criar checklists', weight: 2 },
            { label: 'Estruturo para padronizar e reduzir erro humano', weight: 3 },
        ],
    },
];

export const CULTURAL_MAX_SCORE = CULTURAL_QUESTIONS.length * 3;

/**
 * 5 perguntas técnicas de raciocínio, desenhadas para medir INTELIGÊNCIA APLICADA,
 * não conhecimento. São propositalmente resistentes a IA/consulta:
 * - Duas abertas (voz, especificidade, priorização real)
 * - Duas híbridas (escolha + porquê — todas as opções são defensáveis)
 * - Uma de tradução (explicar conceito básico em linguagem própria)
 *
 * Sem gabarito automático. O Ciro julga na leitura — a qualidade da resposta
 * (concisão, especificidade, voz) revela o candidato mesmo se ele consultou IA.
 */
export const MINI_TEST: TestQuestion[] = [
    {
        id: 'priorizacao',
        type: 'open',
        question:
            'Você recebe uma planilha com 200 lançamentos do mês. O caixa fecha em 3 horas. Ao abrir, percebe que 12 lançamentos parecem duplicados. O que você faz primeiro — e por quê?',
        charLimit: 400,
        minChars: 40,
        placeholder: 'Descreva sua primeira ação e a lógica por trás dela.',
    },
    {
        id: 'trade-off',
        type: 'choice-with-reason',
        question:
            'Você tem 4 tarefas para hoje e só dá tempo de 3. Qual você deixaria pra amanhã?',
        choices: [
            { value: 'a', label: 'Conciliar o extrato bancário de ontem' },
            { value: 'b', label: 'Emitir 8 boletos que vencem depois de amanhã' },
            { value: 'c', label: 'Categorizar 30 despesas do mês passado no relatório' },
            { value: 'd', label: 'Confirmar 3 recebimentos com clientes pelo WhatsApp' },
        ],
        charLimit: 250,
        minChars: 25,
        placeholder: 'Escolha uma e explique em uma frase por que ela pode esperar.',
    },
    {
        id: 'risco',
        type: 'open',
        question:
            'Um cliente pede pra você adiantar 3 pagamentos que estavam agendados pra sexta, dizendo que "depois acerta com o dono". O que você faz?',
        charLimit: 300,
        minChars: 30,
        placeholder: 'O que você faria e o que diria ao cliente. Seja direto.',
    },
    {
        id: 'inconsistencia',
        type: 'choice-with-reason',
        question:
            'Você identifica que uma despesa recorrente de R$ 400/mês foi lançada em 3 categorias diferentes nos últimos 6 meses. Sua próxima ação:',
        choices: [
            { value: 'a', label: 'Corrijo os 6 lançamentos históricos e padronizo daqui pra frente' },
            { value: 'b', label: 'Só padronizo daqui pra frente (não mexo no passado)' },
            { value: 'c', label: 'Documento a inconsistência e pergunto ao líder qual caminho seguir' },
            { value: 'd', label: 'Deixo como está (o valor total é o mesmo)' },
        ],
        charLimit: 250,
        minChars: 25,
        placeholder: 'Escolha e explique em uma frase.',
    },
    {
        id: 'traducao',
        type: 'open',
        question:
            'Alguém sem formação financeira te pergunta: "qual a diferença entre lucro e caixa?" Como você explica, em conversa?',
        charLimit: 400,
        minChars: 40,
        placeholder: 'Explique como falaria com um amigo. Vale usar exemplo ou analogia.',
    },
];

export const CURSO_OPTIONS = [
    { value: 'administracao', label: 'Administração' },
    { value: 'contabeis', label: 'Ciências Contábeis' },
    { value: 'economia', label: 'Economia' },
    { value: 'outro', label: 'Outro' },
];

export const EXPERIENCIA_OPTIONS = [
    { value: 'nunca', label: 'Nunca trabalhei na área' },
    { value: 'estagio', label: 'Estágio' },
    { value: 'clt', label: 'Já tive registro CLT' },
    { value: 'freela', label: 'Trabalhos autônomos / freela' },
];

export const DISPONIBILIDADE_OPTIONS = [
    { value: 'manha', label: 'Manhã' },
    { value: 'tarde', label: 'Tarde' },
    { value: 'integral', label: 'Integral' },
];
