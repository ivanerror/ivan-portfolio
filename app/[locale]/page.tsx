import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Education from '@/components/sections/Education';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Interests from '@/components/sections/Interests';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </>
  );
}