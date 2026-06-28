import type { Metadata } from 'next';
import { CtaSection } from './features/cta-section';
import { FaqSection } from './features/faq-section';
import { HeroSection } from './features/hero-section';
import { HowItWorks } from './features/how-it-works';
import { SecuritySection } from './features/security-section';

export const metadata: Metadata = {
    title: 'Acesse seus laudos',
    description:
        'Consulte, visualize e baixe seus laudos online em segundos usando apenas o CPF e o protocolo recebido no atendimento. Sem cadastro, disponível 24 horas.',
};

export default function LandingPage() {
    return (
        <main>
            <HeroSection />
            <HowItWorks />
            <SecuritySection />
            <FaqSection />
            <CtaSection />
        </main>
    );
}
