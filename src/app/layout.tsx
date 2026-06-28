import { TanstackQueryProvider } from '@/integrations/tanstack-query';
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const dmSans = DM_Sans({
    variable: '--font-dm-sans',
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'MeuLaudo',
        template: '%s | MeuLaudo',
    },
    description: 'Plataforma de gestão e entrega de laudos clínicos.',
    applicationName: 'MeuLaudo',
    authors: [{ name: 'MeuLaudo' }],
    robots: { index: false, follow: false },
    openGraph: {
        type: 'website',
        locale: 'pt_BR',
        title: 'MeuLaudo',
        description: 'Plataforma de gestão e entrega de laudos clínicos.',
        siteName: 'MeuLaudo',
    },
    appleWebApp: {
        title: 'MeuLaudo',
        statusBarStyle: 'default',
    },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
    <html lang="pt-BR" className={`${dmSans.variable} h-full antialiased`}>
        <body className="min-h-full">
            <TanstackQueryProvider>{children}</TanstackQueryProvider>
            <Toaster richColors position="top-right" />
        </body>
    </html>
);

export default RootLayout;
