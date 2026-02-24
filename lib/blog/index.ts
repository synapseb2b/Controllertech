import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { BlogPostMeta, BlogPost } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Blog Data Abstraction Layer
 *
 * All blog data access flows through these functions.
 * Current implementation: reads .md files from content/blog/.
 *
 * AUTOMARTICLES INTEGRATION:
 * When integrated via webhook (app/api/blog/webhook/route.ts),
 * swap the internal implementation (filesystem → Supabase/API)
 * without changing the function signatures.
 */

export async function getAllPostSlugs(): Promise<string[]> {
    const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
    return files.map((f) => f.replace(/\.md$/, ''));
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
    const slugs = await getAllPostSlugs();
    const posts = await Promise.all(slugs.map((slug) => getPostMeta(slug)));
    return posts
        .filter((p): p is BlogPostMeta => p !== null)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPostMeta(slug: string): Promise<BlogPostMeta | null> {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
        title: data.title,
        slug: data.slug || slug,
        description: data.description,
        category: data.category,
        tags: data.tags || [],
        readTime: data.readTime,
        author: data.author,
        publishedAt: data.publishedAt,
        updatedAt: data.updatedAt,
        ctaText: data.ctaText || '',
        ctaProduct: data.ctaProduct || '',
    };
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const processedContent = await remark().use(html).process(content);
    const htmlContent = processedContent.toString();

    return {
        title: data.title,
        slug: data.slug || slug,
        description: data.description,
        category: data.category,
        tags: data.tags || [],
        readTime: data.readTime,
        author: data.author,
        publishedAt: data.publishedAt,
        updatedAt: data.updatedAt,
        ctaText: data.ctaText || '',
        ctaProduct: data.ctaProduct || '',
        content,
        htmlContent,
    };
}
