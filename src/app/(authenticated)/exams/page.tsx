import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { ExamsDataTable } from "./_components/ExamsDataTable";

export const metadata: Metadata = {
  title: "Exames — MeuExame",
};

export default function ExamsPage() {
  return (
    <>
      <PageHeader
        title="Exames"
        subtitle="Gerencie os resultados dos pacientes."
        actions={
          <Link href="/exams/new">
            <Button>
              <Plus className="h-4 w-4" />
              Novo exame
            </Button>
          </Link>
        }
      />
      <main className="p-5 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <ExamsDataTable />
        </div>
      </main>
    </>
  );
}
