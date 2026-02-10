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

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary font-sans">
      <Navbar />
      <Hero />
      <LogoMarquee />
      <Stats />

      {/* Narrative Flow */}
      <Problem />
      <Mechanism />
      <Solutions />
      <Benefits />
      <Founder />

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="container mx-auto px-4 relative z-10">
          <ContactForm />
        </div>
      </section>

      <FAQ />
      <Footer />
    </main>
  );
}
