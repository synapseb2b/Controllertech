export interface FaqItem {
    question: string;
    answer: string;
}

export interface HowToStep {
    name: string;
    text: string;
}

export interface HowTo {
    name: string;
    description?: string;
    steps: HowToStep[];
}

export interface BlogPostMeta {
    title: string;
    slug: string;
    description: string;
    category: string;
    tags: string[];
    readTime: string;
    author: string;
    publishedAt: string;
    updatedAt: string;
    ctaText: string;
    ctaProduct: string;
    /** Perguntas frequentes — gera JSON-LD FAQPage (AEO). */
    faq?: FaqItem[];
    /** Passo a passo — gera JSON-LD HowTo (AEO). */
    howTo?: HowTo;
}

export interface BlogPost extends BlogPostMeta {
    content: string;
    htmlContent: string;
}
