'use client';

import { motion } from 'framer-motion';

const logos = [
    { name: 'Acme Corp' },
    { name: 'Quantum' },
    { name: 'Echo Valley' },
    { name: 'Pulse' },
    { name: 'Apex' },
    { name: 'Horizon' },
    { name: 'Nova' },
    { name: 'Synapse' },
];

export function LogoMarquee() {
    return (
        <div className="w-full py-12 overflow-hidden relative border-y border-border/30">
            {/* Edge Fades */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="text-center mb-8">
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Empresas que confiam na ControllerTech</p>
            </div>

            <div className="flex">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex flex-shrink-0 gap-16 pr-16"
                >
                    {[...logos, ...logos].map((logo, index) => (
                        <div key={index} className="flex items-center gap-3 opacity-40 hover:opacity-80 transition-opacity duration-300">
                            <div className="h-10 w-10 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center text-sm font-bold text-muted-foreground">
                                {logo.name.charAt(0)}
                            </div>
                            <span className="text-lg font-semibold tracking-tight text-muted-foreground whitespace-nowrap">{logo.name}</span>
                        </div>
                    ))}
                </motion.div>
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex flex-shrink-0 gap-16 pr-16"
                >
                    {[...logos, ...logos].map((logo, index) => (
                        <div key={index} className="flex items-center gap-3 opacity-40 hover:opacity-80 transition-opacity duration-300">
                            <div className="h-10 w-10 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center text-sm font-bold text-muted-foreground">
                                {logo.name.charAt(0)}
                            </div>
                            <span className="text-lg font-semibold tracking-tight text-muted-foreground whitespace-nowrap">{logo.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
