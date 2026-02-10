import Link from 'next/link';

export function Footer() {
    return (
        <footer aria-label="Rodapé" className="relative pt-24 pb-12 overflow-hidden">
            {/* Top Gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-primary/10 blur-[100px] -translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-chart-4 flex items-center justify-center shadow-lg shadow-primary/30">
                                <div className="h-4 w-4 rounded-sm bg-white/90" />
                            </div>
                            <span className="font-bold text-xl">ControllerTech</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Arquitetura Financeira Inteligente para PMEs que querem crescer com segurança.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold mb-4 text-foreground">Soluções</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#solutions" className="hover:text-primary transition-colors">Kit de Organização</Link></li>
                            <li><Link href="#solutions" className="hover:text-primary transition-colors">BPO Financeiro</Link></li>
                            <li><Link href="#solutions" className="hover:text-primary transition-colors">CFO as a Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-foreground">Suporte</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#faq" className="hover:text-primary transition-colors">Dúvidas Frequentes</Link></li>
                            <li><Link href="#contact" className="hover:text-primary transition-colors">Fale Conosco</Link></li>
                            <li><a href="#" className="hover:text-primary transition-colors">WhatsApp</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-foreground">Endereço</h4>
                        <address className="text-sm text-muted-foreground not-italic leading-relaxed">
                            Rua Professor Moysés, 271<br />
                            Sala B - Centro<br />
                            Sete Lagoas/MG — Brasil
                        </address>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} ControllerTech. Todos os direitos reservados.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-foreground transition-colors">Política de Privacidade</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">Termos de Uso</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
