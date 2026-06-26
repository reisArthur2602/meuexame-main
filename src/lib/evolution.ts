import { env } from "@/env";
import { normalizePhoneForWhatsApp } from "@/helpers/format-phone";

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${env.EVOLUTION_API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: env.EVOLUTION_API_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Evolution API [${res.status}]: ${text}`);
  }

  return res.json() as Promise<T>;
}

export async function sendText(phone: string, text: string) {
  const normalizedPhone = normalizePhoneForWhatsApp(phone);
  return post(`/message/sendText/${env.EVOLUTION_API_INSTANCE}`, {
    number: normalizedPhone,
    text,
  });
}

export async function notifyExamAvailable(
  phone: string,
  patientName: string,
  protocol: string
) {
  const firstName = patientName.split(" ")[0];

  const text =
    `Olá, ${firstName}! 👋\n\n` +
    `Seu exame *${protocol}* já está disponível no portal.\n\n` +
    `🔗 ${env.NEXT_PUBLIC_APP_URL}\n\n` +
    `Informe seu CPF e o protocolo acima para visualizar o resultado.`;

  return sendText(phone, text);
}
