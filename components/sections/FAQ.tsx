'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion";

const faqs = [
    {
        question: "Perco o controle da minha conta bancária?",
        answer: "Não. Nós apenas agendamos os pagamentos no banco. Você continua sendo o único com a chave de segurança para aprovar as transações. Nada sai da sua conta sem o seu 'de acordo' final."
    },
    {
        question: "Preciso trocar de contador?",
        answer: "Não. A ControllerTech trabalha em paralelo com seu contador. Na verdade, nós facilitamos a vida dele entregando toda a documentação financeira já organizada e conciliada, eliminando erros fiscais."
    },
    {
        question: "Serve para minha empresa pequena?",
        answer: "Sim. Temos planos modulares desenhados especificamente para PMEs. Desde o 'Kit de Organização' para quem está começando até o 'CFO as a Service' para quem já fatura milhões. Crescemos com você."
    },
    {
        question: "Como funciona a comunicação no dia a dia?",
        answer: "Você terá um canal direto (WhatsApp e E-mail) com seu analista financeiro dedicado. Além disso, entregamos relatórios mensais e fazemos reuniões periódicas de estratégia."
    },
    {
        question: "Qual é o investimento em comparação a um funcionário CLT?",
        answer: "Nossos planos começam a partir de R$ 3-5k/mês — cerca de 1/3 do custo de um analista financeiro CLT júnior (que custa R$ 8-10k com encargos). E você não recebe apenas um profissional: recebe um time multidisciplinar liderado por um CFO Sênior, com tecnologia integrada."
    },
    {
        question: "Em quanto tempo vejo resultados?",
        answer: "Nos primeiros 30 dias já entregamos o diagnóstico completo e a organização da sua base financeira. Em até 90 dias, nossos clientes costumam identificar até 20% de margem oculta sendo recuperada e ganham visibilidade total do fluxo de caixa."
    },
    {
        question: "E se eu já tiver um contador?",
        answer: "Perfeito — nós trabalhamos em sinergia com seu contador. A ControllerTech cuida da gestão financeira estratégica (fluxo de caixa, margem, precificação, projeções), enquanto o contador foca na parte fiscal e contábil. Na prática, facilitamos o trabalho dele entregando toda a documentação organizada e conciliada."
    }
];

export function FAQ() {
    return (
        <section id="faq" aria-label="Perguntas frequentes" className="py-20 md:py-28 relative overflow-hidden bg-muted/5">
            <div className="absolute inset-0 bg-grid opacity-15" />
            <div className="container mx-auto px-4 max-w-3xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Dúvidas <span className="text-gradient">Frequentes</span></h2>
                    <p className="text-lg text-muted-foreground">Tire suas dúvidas sobre nosso modelo de trabalho.</p>
                </motion.div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                        >
                            <AccordionItem value={`item-${index}`} className="border-none">
                                <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 px-6 card-glow transition-all hover:border-primary/30">
                                    <AccordionTrigger className="text-base md:text-lg font-semibold hover:text-primary transition-colors text-left py-5 hover:no-underline">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-5">
                                        {faq.answer}
                                    </AccordionContent>
                                </div>
                            </AccordionItem>
                        </motion.div>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
