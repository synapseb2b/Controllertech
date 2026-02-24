'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import type { BlogPostMeta } from '@/lib/blog/types';

interface BlogPostCardProps {
    post: BlogPostMeta;
    index: number;
}

export function BlogPostCard({ post, index }: BlogPostCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="group"
        >
            <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="h-full flex flex-col bg-card/60 backdrop-blur-xl rounded-3xl border border-border/50 p-8 card-glow transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full border border-primary/20">
                            <Tag className="w-3 h-3" />
                            {post.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                        {post.description}
                    </p>

                    {/* Meta Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {post.readTime}
                            </span>
                            <span>{post.author}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
