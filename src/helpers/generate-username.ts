import slugify from "slugify";

export const generateUsername = (name: string) =>
  slugify(name.trim(), { lower: true, strict: true, replacement: "." });
