'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Shield, BarChart3 } from 'lucide-react';

const features = [
    {
        title: "Intelligent Analytics",
        description: "Transform raw data into actionable insights with our advanced AI engine. Monitor KPIs in real-time and predict trends before they happen.",
        points: ["Real-time dashboards", "Predictive forecasting", "Custom report builder"],
        icon: BarChart3,
        color: "bg-blue-500/10 text-blue-500"
    },
    {
        title: "Global Infrastructure",
        description: "Deploy your applications to the edge with a single click. Our global CDN ensures your users experience zero latency, no matter where they are.",
        points: ["Edge functions", "Global CDN", "Automated scaling"],
        icon: Zap,
        color: "bg-amber-500/10 text-amber-500"
    },
    {
        title: "Enterprise Security",
        description: "Built with a security-first mindset. We handle compliance, encryption, and access control so you can focus on building.",
        points: ["SOC2 Compliance", "SSO Integration", "Audit logs"],
        icon: Shield,
        color: "bg-emerald-500/10 text-emerald-500"
    }
];

export function Features() {
    return (
        <section id="features" className="py-24 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
                    >
                        Powerful Features for <span className="text-primary">Modern Growth</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground"
                    >
                        Everything you need to build, launch, and scale your B2B platform.
                    </motion.p>
                </div>

                <div className="space-y-24">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                            className={`flex flex-col md:flex-row gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                        >
                            <div className="flex-1 w-full relative">
                                <div className={`aspect-video rounded-3xl shadow-2xl border border-border/50 bg-muted/30 flex items-center justify-center relative overflow-hidden group`}>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent z-10" />
                                    {/* Abstract Visual */}
                                    <div className={`absolute inset-0 opacity-20 ${feature.color.split(' ')[0]}`} />
                                    <feature.icon className={`w-24 h-24 ${feature.color.split(' ')[1]} relative z-20 opacity-80`} />
                                </div>
                                {/* Decorative Elements */}
                                <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full -z-10" />
                            </div>

                            <div className="flex-1 space-y-8">
                                <div className={`inline-flex items-center justify-center p-3 rounded-xl ${feature.color}`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold leading-tight">{feature.title}</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
                                <div className="grid grid-cols-1 gap-3">
                                    {feature.points.map((point, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                                            <span className="font-medium">{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
