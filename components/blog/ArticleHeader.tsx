'use client';

import { motion } from 'framer-motion';
import { Clock, User, Calendar, Tag } from 'lucide-react';
import type { BlogPost } from '@/lib/blog/types';

export function ArticleHeader({ post }: { post: BlogPost }) {
    const formattedDate = new Date(post.publishedAt).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <header className="mb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full border border-primary/20 mb-6">
                    <Tag className="w-3 h-3" />
                    {post.category}
                </span>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-foreground">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        {post.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formattedDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {post.readTime} de leitura
                    </span>
                </div>
            </motion.div>
        </header>
    );
}
