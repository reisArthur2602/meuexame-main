export const maskPatientName = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  const [firstName, ...rest] = parts;
  return `${firstName} ${rest.map((p) => `${p[0]}*****`).join(" ")}`;
};
