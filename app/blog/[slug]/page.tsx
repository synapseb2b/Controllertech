import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { getAllPostSlugs, getPostBySlug, getAllPosts } from '@/lib/blog';
import { ArticleContent } from '@/components/blog/ArticleContent';
import { ArticleHeader } from '@/components/blog/ArticleHeader';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = await getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return {};

    return {
        title: post.title,
        description: post.description,
        keywords: post.tags,
        authors: [{ name: post.author }],
        alternates: {
            canonical: `https://controllertech.com.br/blog/${post.slug}`,
        },
        openGraph: {
            type: 'article',
            title: post.title,
            description: post.description,
            url: `https://controllertech.com.br/blog/${post.slug}`,
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt,
            authors: [post.author],
            tags: post.tags,
            locale: 'pt_BR',
            siteName: 'ControllerTech',
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
        },
    };
}

export default async function BlogArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) notFound();

    const allPosts = await getAllPosts();
    const currentIndex = allPosts.findIndex((p) => p.slug === slug);
    const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

    const blogPostingJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: {
            '@type': 'Organization',
            name: post.author,
            url: 'https://controllertech.com.br',
        },
        publisher: {
            '@type': 'Organization',
            name: 'ControllerTech',
            url: 'https://controllertech.com.br',
            logo: {
                '@type': 'ImageObject',
                url: 'https://controllertech.com.br/logo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://controllertech.com.br/blog/${post.slug}`,
        },
        keywords: post.tags.join(', '),
        articleSection: post.category,
        inLanguage: 'pt-BR',
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://controllertech.com.br',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: 'https://controllertech.com.br/blog',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `https://controllertech.com.br/blog/${post.slug}`,
            },
        ],
    };

    const whatsAppMessage = encodeURIComponent(
        `Olá! Li o artigo "${post.title}" no blog da ControllerTech e gostaria de agendar um diagnóstico financeiro gratuito.`
    );

    return (
        <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <Navbar />

            <article className="relative pt-32 pb-20 md:pt-40 md:pb-28">
                <div className="absolute inset-0 bg-grid opacity-20" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] opacity-40" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto">
                        {/* Breadcrumbs */}
                        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
                            <ol className="flex items-center gap-2">
                                <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                                <li className="text-border">/</li>
                                <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                                <li className="text-border">/</li>
                                <li className="text-foreground truncate max-w-[200px]">{post.category}</li>
                            </ol>
                        </nav>

                        <ArticleHeader post={post} />
                        <ArticleContent htmlContent={post.htmlContent} />

                        {/* CTA Section */}
                        <div className="mt-16 bg-card/60 backdrop-blur-xl rounded-3xl border border-border/50 p-8 md:p-12 card-glow text-center">
                            <h3 className="text-2xl font-bold mb-4">{post.ctaText}</h3>
                            <p className="text-muted-foreground mb-6">
                                {"Fale diretamente com nosso time. Uma conversa estratégica pode revelar oportunidades que você nem sabia que existiam."}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Button
                                    size="lg"
                                    className="rounded-full px-8 shadow-lg shadow-primary/30 hover:shadow-primary/50"
                                    asChild
                                >
                                    <a
                                        href={`https://wa.me/5531990603750?text=${whatsAppMessage}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {"Agendar Diagnóstico Gratuito"} <ArrowRight className="ml-2 w-5 h-5" />
                                    </a>
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="rounded-full px-8 bg-muted text-foreground hover:bg-muted/80"
                                    asChild
                                >
                                    <Link href="/blog">
                                        <ArrowLeft className="mr-2 w-4 h-4" />
                                        {"Ver Todos os Artigos"}
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Previous / Next Navigation */}
                        {(prevPost || nextPost) && (
                            <nav className="mt-12 grid md:grid-cols-2 gap-4">
                                {prevPost ? (
                                    <Link
                                        href={`/blog/${prevPost.slug}`}
                                        className="group bg-card/40 rounded-2xl border border-border/50 p-6 hover:border-primary/30 transition-all"
                                    >
                                        <span className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                                            <ArrowLeft className="w-3 h-3" /> Artigo anterior
                                        </span>
                                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                                            {prevPost.title}
                                        </span>
                                    </Link>
                                ) : <div />}
                                {nextPost && (
                                    <Link
                                        href={`/blog/${nextPost.slug}`}
                                        className="group bg-card/40 rounded-2xl border border-border/50 p-6 hover:border-primary/30 transition-all md:text-right md:col-start-2"
                                    >
                                        <span className="text-xs text-muted-foreground flex items-center gap-1 mb-2 md:justify-end">
                                            {"Próximo artigo"} <ArrowRight className="w-3 h-3" />
                                        </span>
                                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                                            {nextPost.title}
                                        </span>
                                    </Link>
                                )}
                            </nav>
                        )}
                    </div>
                </div>
            </article>

            <Footer />
            <WhatsAppButton />
        </main>
    );
}
