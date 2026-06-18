import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'Termos de Uso',
    description:
        'Termos de Uso do site da ControllerTech: condições de acesso e utilização do conteúdo e dos serviços.',
    alternates: { canonical: 'https://controllertech.com.br/termos-de-uso' },
};

export default function TermosDeUsoPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <article className="relative pt-32 pb-20 md:pt-40 md:pb-28">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto prose-blog">
                        <h1>Termos de Uso</h1>
                        <p>
                            <em>Última atualização: 18 de junho de 2026.</em>
                        </p>
                        <p>
                            Ao acessar e utilizar o site da ControllerTech, você concorda com os presentes
                            Termos de Uso. Caso não concorde, pedimos que não utilize o site.
                        </p>

                        <h2>1. Uso do site</h2>
                        <p>
                            O conteúdo deste site tem caráter informativo e não constitui aconselhamento
                            financeiro, contábil ou jurídico individualizado. As ferramentas e calculadoras
                            disponibilizadas (como a calculadora de precificação) fornecem estimativas com
                            base nos dados informados por você e não substituem uma análise profissional.
                        </p>

                        <h2>2. Propriedade intelectual</h2>
                        <p>
                            Todo o conteúdo do site — textos, marcas, logotipos, layout e materiais — é de
                            titularidade da ControllerTech ou de seus licenciadores, sendo vedada a
                            reprodução sem autorização prévia.
                        </p>

                        <h2>3. Conteúdo de terceiros e links</h2>
                        <p>
                            O site pode conter links para serviços de terceiros (por exemplo, WhatsApp). Não
                            nos responsabilizamos pelo conteúdo ou pelas práticas de privacidade desses
                            serviços.
                        </p>

                        <h2>4. Limitação de responsabilidade</h2>
                        <p>
                            A ControllerTech empenha-se para manter as informações corretas e atualizadas,
                            mas não garante a ausência de erros. O uso das informações e ferramentas é de sua
                            responsabilidade.
                        </p>

                        <h2>5. Privacidade</h2>
                        <p>
                            O tratamento de dados pessoais é regido pela nossa{' '}
                            <a href="/politica-de-privacidade">Política de Privacidade</a>.
                        </p>

                        <h2>6. Alterações</h2>
                        <p>
                            Podemos alterar estes Termos a qualquer momento. A versão vigente estará sempre
                            disponível nesta página.
                        </p>

                        <h2>7. Contato</h2>
                        <p>
                            Dúvidas sobre estes Termos podem ser encaminhadas para{' '}
                            <a href="mailto:contato@controllertech.com.br">contato@controllertech.com.br</a>.
                        </p>
                    </div>
                </div>
            </article>
            <Footer />
        </main>
    );
}
