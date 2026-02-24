import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { getAllPosts } from '@/lib/blog';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { BlogHero } from '@/components/blog/BlogHero';

export const metadata: Metadata = {
    title: 'Blog',
    description:
        'Artigos sobre gestão financeira, organização de caixa e estratégia para PMEs. Inteligência financeira prática para empresários que querem decidir com dados, não com feeling.',
    alternates: {
        canonical: 'https://controllertech.com.br/blog',
    },
    openGraph: {
        title: 'Blog | ControllerTech',
        description:
            'Artigos sobre gestão financeira, organização de caixa e estratégia para PMEs.',
        url: 'https://controllertech.com.br/blog',
        type: 'website',
    },
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog — ControllerTech',
    description:
        'Artigos estratégicos sobre gestão financeira para PMEs de serviço.',
    url: 'https://controllertech.com.br/blog',
    publisher: {
        '@type': 'Organization',
        name: 'ControllerTech',
        url: 'https://controllertech.com.br',
    },
};

export default async function BlogPage() {
    const posts = await getAllPosts();

    return (
        <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            <BlogHero />

            {/* Posts Grid */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {posts.map((post, index) => (
                            <BlogPostCard key={post.slug} post={post} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
            <WhatsAppButton />
        </main>
    );
}
