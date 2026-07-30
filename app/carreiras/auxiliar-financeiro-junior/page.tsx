import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { JobHero } from '@/components/carreiras/JobHero';
import { ApplicationForm } from '@/components/carreiras/ApplicationForm';

const JOB_URL = 'https://controllertech.com.br/carreiras/auxiliar-financeiro-junior';
const JOB_TITLE = 'Auxiliar Financeiro Junior — ControllerTech';
const JOB_DESCRIPTION =
    'Primeira oportunidade em finanças na ControllerTech. Vaga junior em parceria com o Curso de Administração da UNIFEMM. Candidatura em 4 etapas — 10 minutos.';

export const metadata: Metadata = {
    title: JOB_TITLE,
    description: JOB_DESCRIPTION,
    alternates: { canonical: JOB_URL },
    openGraph: {
        type: 'website',
        title: JOB_TITLE,
        description: JOB_DESCRIPTION,
        url: JOB_URL,
        locale: 'pt_BR',
        siteName: 'ControllerTech',
    },
    twitter: {
        card: 'summary_large_image',
        title: JOB_TITLE,
        description: JOB_DESCRIPTION,
    },
};

export default function VagaAuxiliarFinanceiroJuniorPage() {
    const datePosted = new Date().toISOString().split('T')[0];
    const validThrough = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();

    const jobPostingJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: 'Auxiliar Financeiro Junior',
        description:
            'Vaga junior em rotinas financeiras na ControllerTech (contas a pagar, receber, conciliação e apoio a relatórios), ao lado do fundador Ciro Freitas. Ideal para estudantes de Administração, Ciências Contábeis ou Economia em início de carreira.',
        datePosted,
        validThrough,
        employmentType: ['FULL_TIME', 'PART_TIME', 'INTERN'],
        directApply: true,
        hiringOrganization: {
            '@type': 'Organization',
            name: 'ControllerTech',
            sameAs: 'https://controllertech.com.br',
            logo: 'https://controllertech.com.br/logo.png',
        },
        jobLocation: {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Sete Lagoas',
                addressRegion: 'MG',
                addressCountry: 'BR',
            },
        },
        applicantLocationRequirements: {
            '@type': 'Country',
            name: 'Brazil',
        },
        educationRequirements: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'Cursando graduação em Administração, Ciências Contábeis, Economia ou área correlata',
        },
        experienceRequirements: {
            '@type': 'OccupationalExperienceRequirements',
            monthsOfExperience: 0,
        },
        url: JOB_URL,
    };

    return (
        <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }}
            />
            <Navbar />

            <JobHero />

            <section className="relative pb-24 md:pb-32">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-3 mb-10 md:mb-14">
                        <InfoCard title="O que você vai fazer">
                            Rotinas de contas a pagar e receber, apoio em conciliação bancária e organização de
                            relatórios financeiros de clientes da ControllerTech.
                        </InfoCard>
                        <InfoCard title="O que a gente valoriza">
                            Cuidado com detalhes, honestidade, iniciativa e vontade de aprender. Conhecimento
                            técnico é bônus — a gente ensina o resto.
                        </InfoCard>
                        <InfoCard title="Como a gente escolhe">
                            Ciro Freitas revisa cada candidatura pessoalmente. Sem robôs, sem filtro cego. Retorno
                            em até 5 dias úteis.
                        </InfoCard>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
                                Candidate-se em <span className="text-gradient">4 etapas</span>
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Cerca de 10 minutos. Dá pra pausar e voltar (mantenha esta aba aberta).
                            </p>
                        </div>
                        <ApplicationForm />
                    </div>

                    <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
                        Seus dados são usados exclusivamente para este processo seletivo e não são compartilhados
                        com terceiros. Ao enviar, você concorda que a ControllerTech entre em contato pelos canais
                        que você forneceu.
                    </p>
                </div>
            </section>

            <Footer />
            <WhatsAppButton />
        </main>
    );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border/50 p-5">
            <h3 className="text-sm font-bold text-primary mb-2 uppercase tracking-wide">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
        </div>
    );
}
