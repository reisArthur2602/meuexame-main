import { z } from 'zod';

const schema = z.object({
    // ── Core ──────────────────────────────────────────────────────────────────
    DATABASE_URL: z.string().min(1, 'DATABASE_URL é obrigatória'),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

    // ── Auth ──────────────────────────────────────────────────────────────────
    AUTH_SECRET: z.string().min(1).default('meuexame-dev-secret-change-in-production'),

    // ── App ───────────────────────────────────────────────────────────────────
    NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),

    // ── FTP ───────────────────────────────────────────────────────────────────
    FTP_HOST: z.string().default(''),
    FTP_USER: z.string().default(''),
    FTP_PASSWORD: z.string().default(''),
    FTP_SECURE: z.enum(['true', 'false']).default('false'),

    // ── Evolution API (WhatsApp) ──────────────────────────────────────────────
    EVOLUTION_API_URL: z.string().default(''),
    EVOLUTION_API_KEY: z.string().default(''),
    EVOLUTION_API_INSTANCE: z.string().default(''),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
    console.error('❌ Variáveis de ambiente inválidas:\n');
    for (const [key, messages] of Object.entries(parsed.error.flatten().fieldErrors)) {
        console.error(`  ${key}: ${messages?.join(', ')}`);
    }
    throw new Error('Corrija as variáveis de ambiente antes de continuar.');
}

export const env = parsed.data;
