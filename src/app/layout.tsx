import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { TanstackQueryProvider } from "@/integrations/tanstack-query";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MeuExame",
  description: "Sistema de gestão de exames clínicos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
          <Toaster richColors position="top-right" />
        </body>
    </html>
  );
}
