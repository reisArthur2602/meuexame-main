import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
    const passwordHash = await bcrypt.hash('masterccm02', 12);

    const admin = await prisma.user.upsert({
        where: { id: '00000000-0000-0000-0000-000000000001' },
        update: { passwordHash, username: 'admin' },
        create: {
            id: '00000000-0000-0000-0000-000000000001',
            name: 'Admin',
            username: 'admin',
            passwordHash,
            role: 'ADMIN',
            isActive: true,
        },
    });

    console.log(`✅ Admin: ${admin.name} (senha: masterccm02)`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
