import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { LogoMarquee } from '@/components/sections/LogoMarquee';
import { Problem } from '@/components/sections/Problem';
import { Mechanism } from '@/components/sections/Mechanism';
import { Solutions } from '@/components/sections/Solutions';
import { Benefits } from '@/components/sections/Benefits';
import { Founder } from '@/components/sections/Founder';
import { FAQ } from '@/components/sections/FAQ';
import { ContactForm } from '@/components/forms/ContactForm';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ProductQuiz } from '@/components/sections/ProductQuiz';

const jsonLd = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ControllerTech',
    url: 'https://controllertech.com.br',
    logo: 'https://controllertech.com.br/logo.png',
    description: 'Gestão financeira inteligente para PMEs. CFO Sênior, BPO Financeiro e diagnóstico de margem oculta para empresas de serviço que faturam de R$ 150k a R$ 3MM/mês.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Professor Moysés, 271 - Sala B',
      addressLocality: 'Sete Lagoas',
      addressRegion: 'MG',
      addressCountry: 'BR',
    },
  },
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'ControllerTech',
    url: 'https://controllertech.com.br',
    description:
      'Gestão financeira estratégica para PMEs que faturam de R$ 150k a R$ 3MM/mês. BPO Financeiro, CFO as a Service e diagnóstico de margem oculta. Atendemos clínicas, escritórios de advocacia, agências e empresas de serviço.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Professor Moysés, 271 - Sala B',
      addressLocality: 'Sete Lagoas',
      addressRegion: 'MG',
      postalCode: '35700-000',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -19.4619,
      longitude: -44.2467,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brasil',
    },
    priceRange: '$$',
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Perco o controle da minha conta bancária?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Não. Nós apenas agendamos os pagamentos no banco. Você continua sendo o único com a chave de segurança para aprovar as transações. Nada sai da sua conta sem o seu 'de acordo' final.",
        },
      },
      {
        '@type': 'Question',
        name: 'Preciso trocar de contador?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Não. A ControllerTech trabalha em paralelo com seu contador. Na verdade, nós facilitamos a vida dele entregando toda a documentação financeira já organizada e conciliada, eliminando erros fiscais.',
        },
      },
      {
        '@type': 'Question',
        name: 'Serve para minha empresa pequena?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Sim. Temos planos modulares desenhados especificamente para PMEs. Desde o 'Kit de Organização' para quem está começando até o 'CFO as a Service' para quem já fatura milhões. Crescemos com você.",
        },
      },
      {
        '@type': 'Question',
        name: 'Como funciona a comunicação no dia a dia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Você terá um canal direto (WhatsApp e E-mail) com seu analista financeiro dedicado. Além disso, entregamos relatórios mensais e fazemos reuniões periódicas de estratégia.',
        },
      },
      {
        '@type': 'Question',
        name: 'Qual é o investimento em comparação a um funcionário CLT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nossos planos começam a partir de R$ 3-5k/mês — cerca de 1/3 do custo de um analista financeiro CLT júnior (que custa R$ 8-10k com encargos). E você não recebe apenas um profissional: recebe um time multidisciplinar liderado por um CFO Sênior, com tecnologia integrada.',
        },
      },
      {
        '@type': 'Question',
        name: 'Em quanto tempo vejo resultados?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nos primeiros 30 dias já entregamos o diagnóstico completo e a organização da sua base financeira. Em até 90 dias, nossos clientes costumam identificar até 20% de margem oculta sendo recuperada e ganham visibilidade total do fluxo de caixa.',
        },
      },
      {
        '@type': 'Question',
        name: 'E se eu já tiver um contador?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Perfeito — nós trabalhamos em sinergia com seu contador. A ControllerTech cuida da gestão financeira estratégica (fluxo de caixa, margem, precificação, projeções), enquanto o contador foca na parte fiscal e contábil. Na prática, facilitamos o trabalho dele entregando toda a documentação organizada e conciliada.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quanto custa terceirizar a gestão financeira da minha empresa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Na ControllerTech, os planos começam a partir de R$ 3-5k/mês — cerca de 1/3 do custo de um analista financeiro CLT júnior (R$ 8-10k com encargos). A diferença é que você não contrata uma pessoa: contrata um time multidisciplinar liderado por CFO Sênior, com tecnologia integrada e auditoria contínua. Solicite um diagnóstico gratuito para receber uma proposta personalizada.',
        },
      },
      {
        '@type': 'Question',
        name: 'Preciso de gestão financeira para minha clínica ou escritório, por onde começo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O primeiro passo é o nosso Diagnóstico Financeiro Gratuito. Em 30 minutos, analisamos a saúde do seu caixa, identificamos vazamentos de margem e mostramos exatamente onde você está perdendo dinheiro. A partir daí, recomendamos o plano ideal — desde organização básica (Kit de Organização) até gestão completa (BPO Financeiro) ou estratégia de crescimento (CFO as a Service). Atendemos clínicas, escritórios de advocacia, agências e empresas de serviço.',
        },
      },
    ],
  },
  services: [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      provider: { '@type': 'Organization', name: 'ControllerTech' },
      serviceType: 'Financial Management',
      name: 'Kit de Organização Financeira',
      description: 'Organização financeira básica para PMEs: separação PF/PJ, fluxo de caixa estruturado e diagnóstico de margem oculta. O primeiro passo para quem quer sair da bagunça financeira e enxergar seus números pela primeira vez.',
      areaServed: { '@type': 'Country', name: 'Brasil' },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'PMEs de serviço que precisam organizar o financeiro básico',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      provider: { '@type': 'Organization', name: 'ControllerTech' },
      serviceType: 'Financial Management',
      name: 'BPO Financeiro para PMEs — Gestão Premium',
      description: 'Terceirização completa da operação financeira: contas a pagar, receber, faturamento, conciliação, relatórios mensais e analista dedicado. Para empresários que querem parar de operar o financeiro e focar no que gera receita.',
      areaServed: { '@type': 'Country', name: 'Brasil' },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'PMEs de serviço com faturamento de R$ 150k a R$ 3MM/mês',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      provider: { '@type': 'Organization', name: 'ControllerTech' },
      serviceType: 'Financial Advisory',
      name: 'CFO as a Service',
      description: 'Liderança financeira estratégica sem inflar a folha: visão de Runway, precificação inteligente, governança e compliance, projeção de distribuição de lucros. Para empresas que já têm operação mas precisam de estratégia para crescer com segurança.',
      areaServed: { '@type': 'Country', name: 'Brasil' },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'PMEs de serviço que faturam acima de R$ 500k/mês e precisam de liderança financeira estratégica',
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faq) }}
      />
      {jsonLd.services.map((service, i) => (
        <script
          key={`service-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
        />
      ))}
      <Navbar />
      <Hero />
      <LogoMarquee />
      <Stats />

      {/* Narrative Flow */}
      <Problem />
      <Mechanism />
      <Solutions />
      <ProductQuiz />
      <Benefits />
      <Founder />

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-28 bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="container mx-auto px-4 relative z-10">
          <ContactForm />
        </div>
      </section>

      <FAQ />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
