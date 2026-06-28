import { PageHeader } from '@/components/page-header';
import { requireRole } from '@/helpers/require-role';
import type { Metadata } from 'next';
import { CreateUserButton } from './features/create-user-button';
import { UsersData } from './features/users-data';

export const metadata: Metadata = {
    title: 'Usuários',
    description: 'Controle os acessos da equipe.',
};

const UsersPage = async () => {
    await requireRole(['ADMIN']);

    return (
        <>
            <PageHeader
                title="Usuários"
                subtitle="Controle os acessos da equipe."
                actions={<CreateUserButton />}
            />
            <main className="px-5 lg:px-8 ">
                <UsersData />
            </main>
        </>
    );
};

export default UsersPage;
