import { randomUUID } from "crypto";
import { Readable } from "stream";
import { Client } from "basic-ftp";
import { env } from "@/env";

const ftpConfig = {
  host: env.FTP_HOST,
  user: env.FTP_USER,
  password: env.FTP_PASSWORD,
  secure: env.FTP_SECURE === "true",
};

async function connect(): Promise<Client> {
  const client = new Client();
  await client.access(ftpConfig);
  return client;
}

export async function uploadFile(
  localPath: string,
  remotePath: string
): Promise<void> {
  const client = await connect();
  try {
    const remoteDir = remotePath.substring(0, remotePath.lastIndexOf("/"));
    if (remoteDir) await client.ensureDir(remoteDir);
    await client.uploadFrom(localPath, remotePath);
  } finally {
    client.close();
  }
}

export async function uploadBuffer(
  buffer: Buffer,
  remotePath: string
): Promise<void> {
  const client = await connect();
  try {
    const remoteDir = remotePath.substring(0, remotePath.lastIndexOf("/"));
    if (remoteDir) await client.ensureDir(remoteDir);
    await client.uploadFrom(Readable.from(buffer), remotePath);
  } finally {
    client.close();
  }
}

export async function deleteFile(remotePath: string): Promise<void> {
  const client = await connect();
  try {
    await client.remove(remotePath);
  } finally {
    client.close();
  }
}

export function buildRemotePath(): string {
  return `/public_html/exames-online/${randomUUID()}.pdf`;
}

export async function downloadToBuffer(remotePath: string): Promise<Buffer> {
  const { PassThrough } = await import("stream");
  const client = await connect();
  try {
    const chunks: Buffer[] = [];
    const pass = new PassThrough();
    pass.on("data", (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
    await client.downloadTo(pass, remotePath);
    return Buffer.concat(chunks);
  } finally {
    client.close();
  }
}
