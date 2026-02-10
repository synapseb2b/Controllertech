'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navbar() {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <div className="mx-4 mt-4">
                <div className="container mx-auto flex items-center justify-between px-6 py-4 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50 shadow-lg shadow-black/10">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow">
                            <div className="h-4 w-4 rounded-sm bg-white/90" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            Controller<span className="text-primary">Tech</span>
                        </span>
                    </Link>

                    <nav aria-label="Menu principal" className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                        <Link href="#mechanism" className="hover:text-foreground transition-colors">Como Funciona</Link>
                        <Link href="#solutions" className="hover:text-foreground transition-colors">Soluções</Link>
                        <Link href="#stats" className="hover:text-foreground transition-colors">Resultados</Link>
                        <Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link>
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        <Button size="sm" className="rounded-full px-6 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow" asChild>
                            <Link href="#contact">Diagnóstico Gratuito</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="bg-card/95 backdrop-blur-xl border-border/50">
                            <div className="flex flex-col gap-6 mt-12">
                                <Link href="#mechanism" className="text-lg font-medium hover:text-primary transition-colors">Como Funciona</Link>
                                <Link href="#solutions" className="text-lg font-medium hover:text-primary transition-colors">Soluções</Link>
                                <Link href="#stats" className="text-lg font-medium hover:text-primary transition-colors">Resultados</Link>
                                <Link href="#faq" className="text-lg font-medium hover:text-primary transition-colors">FAQ</Link>
                                <div className="h-px bg-border my-4" />
                                <Button className="w-full rounded-full" asChild>
                                    <Link href="#contact">Diagnóstico Gratuito</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </motion.header>
    );
}
