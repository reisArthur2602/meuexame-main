"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

export function TanstackQueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 2 * 60 * 1000,       // 2 min — dados são frescos por 2 minutos
            gcTime: 10 * 60 * 1000,          // 10 min — mantém no cache após desmontar
            refetchOnWindowFocus: true,       // rebusca ao trocar de aba e voltar
            refetchOnReconnect: true,         // rebusca ao recuperar conexão
            refetchOnMount: true,             // rebusca ao montar se stale
            refetchInterval: false,           // sem polling automático por padrão
            retry: 1,
            retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
          },
          mutations: {
            retry: 0,
          },
        },
      })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
