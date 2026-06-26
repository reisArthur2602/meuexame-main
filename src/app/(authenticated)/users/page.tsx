import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { UsersTable, type UserRow } from "./_components/UsersTable";

export const metadata: Metadata = {
  title: "Usuários — MeuExame",
  description: "Controle os acessos da equipe.",
};

// TODO: substituir por fetch ao endpoint real
const MOCK_USERS: UserRow[] = [
  {
    id: "1",
    name: "Anderson Costa",
    email: "admin@clinica.com.br",
    initials: "AC",
    avatarColor: "brand",
    role: "admin",
    status: "active",
    lastAccess: "Agora",
  },
  {
    id: "2",
    name: "Marcos Silva",
    email: "marcos@clinica.com.br",
    initials: "MS",
    avatarColor: "blue",
    role: "employee",
    status: "active",
    lastAccess: "Hoje, 18:22",
  },
  {
    id: "3",
    name: "Juliana Santos",
    email: "juliana@clinica.com.br",
    initials: "JS",
    avatarColor: "amber",
    role: "employee",
    status: "inactive",
    lastAccess: "18/06/2026",
  },
  {
    id: "4",
    name: "Beatriz Carvalho",
    email: "beatriz@clinica.com.br",
    initials: "BC",
    avatarColor: "rose",
    role: "employee",
    status: "active",
    lastAccess: "Hoje, 14:05",
  },
  {
    id: "5",
    name: "Felipe Rocha",
    email: "felipe@clinica.com.br",
    initials: "FR",
    avatarColor: "teal",
    role: "admin",
    status: "active",
    lastAccess: "Hoje, 11:30",
  },
];

export default function UsersPage() {
  return (
    <>
      <PageHeader
        title="Usuários"
        subtitle="Controle os acessos da equipe."
      />

      <main className="p-5 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <UsersTable rows={MOCK_USERS} />
        </div>
      </main>
    </>
  );
}
