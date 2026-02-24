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
}

export interface BlogPost extends BlogPostMeta {
    content: string;
    htmlContent: string;
}
