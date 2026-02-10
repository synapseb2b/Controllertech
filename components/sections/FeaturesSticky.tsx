'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BarChart3, Shield, Zap } from 'lucide-react';

const features = [
    {
        title: "Real-time Analytics",
        description: "Monitor your business performance with millisecond precision. Our streaming architecture ensures you never miss a beat.",
        icon: BarChart3,
        color: "from-blue-500/20 to-blue-600/20",
        border: "border-blue-500/20"
    },
    {
        title: "Global Edge Network",
        description: "Deploy your logic close to your users. With 35+ data centers worldwide, latency becomes a thing of the past.",
        icon: Zap,
        color: "from-amber-500/20 to-amber-600/20",
        border: "border-amber-500/20"
    },
    {
        title: "Bank-grade Security",
        description: "Sleep soundly knowing your data is encrypted at rest and in transit. We handle the complexity of compliance.",
        icon: Shield,
        color: "from-emerald-500/20 to-emerald-600/20",
        border: "border-emerald-500/20"
    },
];

export function FeaturesSticky() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-background">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="container mx-auto px-4 relative w-full h-full flex items-center">

                    {/* Visual Side (Right/Background) */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-1/2 h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden border border-border/50 bg-muted/10 shadow-2xl backdrop-blur-xl">
                        {features.map((feature, index) => {
                            // Calculate opacity based on scroll position for each card
                            const start = index / features.length;
                            const end = (index + 1) / features.length;
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const scale = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.8, 1, 1, 0.8]);

                            return (
                                <motion.div
                                    key={index}
                                    style={{ opacity, scale }}
                                    className={`absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-br ${feature.color}`}
                                >
                                    <feature.icon className="w-32 h-32 md:w-48 md:h-48 opacity-20" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground/10 uppercase">{feature.title}</h3>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Text Side (Left) */}
                    <div className="relative z-10 w-full md:w-1/2 pr-0 md:pr-12">
                        {features.map((feature, index) => {
                            // Create a scroll trigger for the text highlight
                            const start = index / features.length;
                            const end = (index + 1) / features.length;
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.2, end], [0.3, 1, 1, 0.3]);

                            return (
                                <motion.div
                                    key={index}
                                    style={{ opacity }}
                                    className="h-screen flex flex-col justify-center pointer-events-none"
                                >
                                    <div className={`p-3 w-fit rounded-xl border ${feature.border} bg-background/50 backdrop-blur-sm mb-6`}>
                                        <feature.icon className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">{feature.title}</h2>
                                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-lg">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
