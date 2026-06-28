import { LandingFooter } from '@/app/(public)/(landing-page)/features/landing-footer';
import { LandingHeader } from '@/app/(public)/(landing-page)/features/landing-header';
import { type PropsWithChildren } from 'react';

export default function ResultLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col bg-surface-muted text-ink">
            <LandingHeader />
            <div className="flex-1">{children}</div>
            <LandingFooter />
        </div>
    );
}
