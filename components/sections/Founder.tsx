'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Image from 'next/image';

export function Founder() {
    return (
        <section className="py-20 md:py-28 relative overflow-hidden bg-muted/5">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
            <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
                {/* Quote Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-8 flex justify-center"
                >
                    <div className="p-4 rounded-2xl bg-primary/10 text-primary animate-pulse" style={{ animationDuration: '4s' }}>
                        <Quote className="w-10 h-10" />
                    </div>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-extrabold mb-10 tracking-tight"
                >
                    Liderado por quem entende o <br className="hidden md:block" />
                    <span className="text-gradient">&quot;Chão de Fábrica&quot;</span> financeiro.
                </motion.h2>

                <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12"
                >
                    &quot;Comecei minha carreira em 2003, fazendo conciliação bancária e acerto com motoristas de entrega.
                    Passei por controladoria em multinacionais como a Marelli — onde liderei budgeting, forecasting e análise de P&amp;L — e pela Infosys, estruturando operações financeiras da Philips para toda a América Latina.
                    Em 23 anos, aprendi uma coisa: a diferença entre uma empresa que cresce e uma que quebra não está nas vendas.
                    {' '}<span className="text-foreground font-semibold">Está na gestão do caixa.</span>{' '}
                    Criei a ControllerTech para entregar às PMEs a mesma inteligência financeira que só multinacionais tinham acesso — sem a burocracia, sem o custo e sem a distância de uma grande consultoria.&quot;
                </motion.blockquote>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center"
                >
                    {/* Photo */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-chart-4 p-0.5 mb-4 shadow-lg shadow-primary/30">
                        <Image
                            src="/Ciro1.webp"
                            alt="Ciro Freitas"
                            width={80}
                            height={80}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>

                    <cite className="not-italic">
                        <div className="font-bold text-lg text-foreground">Ciro Freitas</div>
                        <div className="text-sm font-medium text-primary uppercase tracking-wider">Fundador &amp; Head de Estratégia</div>
                    </cite>
                </motion.div>
            </div>
        </section>
    );
}
