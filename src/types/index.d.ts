// ── Exam ────────────────────────────────────────────────────────────────────

export type ExamStatus = "AVAILABLE" | "BLOCKED" | "ARCHIVED";

export type ExamDisplayStatus = "disponivel" | "bloqueado" | "arquivado";

export type ExamListItem = {
  id: string;
  protocol: string;
  patientName: string;
  patientCpf: string;
  patientPhone: string | null;
  status: ExamDisplayStatus;
  whatsappSent: boolean;
  createdAt: string;
};

export type ExamDetail = {
  id: string;
  protocol: string;
  patientName: string;
  patientCpf: string;
  patientPhone: string | null;
  status: ExamStatus;
  whatsappSent: boolean;
  whatsappSentAt: string | null;
  availableAt: string | null;
  blockedAt: string | null;
  createdAt: string;
  createdBy: { name: string };
  updatedBy: { name: string } | null;
};

export type ExamDocumentItem = {
  id: string;
  name: string;
  size: number;
  createdAt: string;
};

// ── User ─────────────────────────────────────────────────────────────────────

export type AppRole = "ADMIN" | "STAFF";

export type CurrentUser = {
  id: string;
  name: string;
  username: string;
  role: AppRole;
};

export type UserAvatarColor = "brand" | "blue" | "amber" | "rose" | "teal";

export type UserRow = {
  id: string;
  name: string;
  username: string;
  initials: string;
  avatarColor: UserAvatarColor;
  role: "admin" | "employee";
  status: "active" | "inactive";
  lastAccess: string;
};

// ── Overview ──────────────────────────────────────────────────────────────────

export type KpiData = {
  totalExams: number;
  todayExams: number;
  availableExams: number;
  activeUsers: number;
};

export type RecentExamRow = {
  id: string;
  patientName: string;
  protocol: string;
  date: string;
  status: ExamStatus;
};
