import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Projects from '@/components/sections/Projects';
import Footer from '@/components/layout/Footer';
import { getProjects } from '@/lib/projects';

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  const projects = await getProjects(locale);

  return (
    <>
      <Header />
      <main className="relative z-10 pt-16">
        <Projects projects={projects} />
      </main>
      <Footer />
    </>
  );
}
