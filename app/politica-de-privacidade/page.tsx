import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'Política de Privacidade',
    description:
        'Política de Privacidade da ControllerTech: como coletamos, usamos e protegemos seus dados pessoais, em conformidade com a LGPD.',
    alternates: { canonical: 'https://controllertech.com.br/politica-de-privacidade' },
};

export default function PoliticaDePrivacidadePage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <article className="relative pt-32 pb-20 md:pt-40 md:pb-28">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto prose-blog">
                        <h1>Política de Privacidade</h1>
                        <p>
                            <em>Última atualização: 18 de junho de 2026.</em>
                        </p>
                        <p>
                            A ControllerTech valoriza a sua privacidade. Esta Política descreve como
                            coletamos, utilizamos, armazenamos e protegemos seus dados pessoais, em
                            conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
                        </p>

                        <h2>1. Controlador dos dados</h2>
                        <p>
                            O controlador dos dados é a ControllerTech, com sede na Rua Professor Moysés,
                            271, Sala B — Centro, Sete Lagoas/MG, Brasil. Contato do encarregado:{' '}
                            <a href="mailto:contato@controllertech.com.br">contato@controllertech.com.br</a>.
                        </p>

                        <h2>2. Dados que coletamos</h2>
                        <ul>
                            <li>
                                <strong>Dados fornecidos por você:</strong> nome, empresa, setor, faixa de
                                faturamento, telefone/WhatsApp e demais informações enviadas em formulários
                                de contato ou no teste de diagnóstico.
                            </li>
                            <li>
                                <strong>Dados de navegação:</strong> coletados automaticamente por meio de
                                cookies e tecnologias semelhantes (páginas visitadas, origem do tráfego,
                                dispositivo), quando você consente.
                            </li>
                        </ul>

                        <h2>3. Como usamos seus dados</h2>
                        <ul>
                            <li>Responder a solicitações e agendar diagnósticos.</li>
                            <li>Prestar e melhorar nossos serviços.</li>
                            <li>
                                Medir o desempenho do site e de campanhas de marketing (analytics e anúncios),
                                mediante o seu consentimento.
                            </li>
                            <li>Cumprir obrigações legais e regulatórias.</li>
                        </ul>

                        <h2>4. Cookies e tecnologias de rastreamento</h2>
                        <p>
                            Utilizamos cookies necessários (essenciais ao funcionamento do site) e, mediante
                            consentimento, cookies de <strong>analytics</strong> (por exemplo, Google
                            Analytics) e de <strong>marketing</strong> (por exemplo, Google Ads e Meta
                            Pixel). Você pode gerenciar suas preferências a qualquer momento pelo banner de
                            consentimento exibido no site. Trabalhamos com o Google Consent Mode para
                            respeitar a sua escolha.
                        </p>

                        <h2>5. Compartilhamento de dados</h2>
                        <p>
                            Não vendemos seus dados. Podemos compartilhá-los com prestadores de serviço que
                            nos apoiam (por exemplo, plataformas de mensagens, analytics e publicidade),
                            sempre limitados à finalidade descrita e com as devidas salvaguardas.
                        </p>

                        <h2>6. Seus direitos (LGPD)</h2>
                        <p>
                            Você pode, a qualquer momento, solicitar confirmação de tratamento, acesso,
                            correção, anonimização, portabilidade, eliminação dos dados e revogação do
                            consentimento. Para exercer seus direitos, entre em contato pelo e-mail{' '}
                            <a href="mailto:contato@controllertech.com.br">contato@controllertech.com.br</a>.
                        </p>

                        <h2>7. Segurança e retenção</h2>
                        <p>
                            Adotamos medidas técnicas e organizacionais para proteger seus dados. Mantemos
                            seus dados apenas pelo tempo necessário para cumprir as finalidades descritas ou
                            obrigações legais.
                        </p>

                        <h2>8. Alterações desta Política</h2>
                        <p>
                            Podemos atualizar esta Política periodicamente. A versão vigente estará sempre
                            disponível nesta página, com a data da última atualização.
                        </p>
                    </div>
                </div>
            </article>
            <Footer />
        </main>
    );
}
