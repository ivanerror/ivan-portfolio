import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { FloatingCursor } from '@/components/ui/floating-cursor';
import { AuroraBackground } from '@/components/ui/aurora-background';
import type { Metadata } from 'next';
import { TravelInSpaceBackground } from '@/components/ui/travel-in-space-background';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  return {
    title: `${t('name')} - ${t('title')}`,
    description: t('bio'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'id': '/id',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <TravelInSpaceBackground />
            {children}
            <FloatingCursor />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}