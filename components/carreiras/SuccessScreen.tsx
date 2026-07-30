'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    candidateName: string;
}

export function SuccessScreen({ candidateName }: Props) {
    const firstName = candidateName.split(' ')[0] || candidateName;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-8 md:py-12"
        >
            <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
                Recebemos sua candidatura, <span className="text-gradient">{firstName}</span>.
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed max-w-lg mx-auto mb-8">
                Ciro Freitas, fundador da ControllerTech, revisará seu perfil pessoalmente e retorna
                em até <strong className="text-foreground">5 dias úteis</strong> pelo canal que você preferir.
            </p>
            <Button
                asChild
                variant="secondary"
                className="rounded-full px-6 bg-muted text-foreground hover:bg-muted/80"
            >
                <Link href="/">
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Conhecer a ControllerTech
                </Link>
            </Button>
        </motion.div>
    );
}
