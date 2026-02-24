'use client';

import { motion } from 'framer-motion';

export function ArticleContent({ htmlContent }: { htmlContent: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
}
