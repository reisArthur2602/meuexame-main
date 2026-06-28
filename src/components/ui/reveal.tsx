'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState, type PropsWithChildren } from 'react';

type RevealProps = PropsWithChildren<{
    className?: string;
    delay?: number;
}>;

export const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={cn(
                'transition-all duration-700 ease-out motion-reduce:transition-none',
                visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
                className
            )}
        >
            {children}
        </div>
    );
};
