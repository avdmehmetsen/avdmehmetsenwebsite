const trMap: Record<string, string> = {
  İ: "i",
  I: "i",
  ı: "i",
  Ş: "s",
  ş: "s",
  Ğ: "g",
  ğ: "g",
  Ü: "u",
  ü: "u",
  Ö: "o",
  ö: "o",
  Ç: "c",
  ç: "c",
};

export function slugifyTR(input: string): string {
  if (!input) return "";

  const mapped = input
    .split("")
    .map((ch) => trMap[ch] ?? ch)
    .join("");

  const normalized = mapped.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");

  const dashed = normalized
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return dashed.slice(0, 90);
}

export async function ensureUniqueSlug(
  base: string,
  hasSlug: (candidate: string) => Promise<boolean>
): Promise<string> {
  const rootSlug = slugifyTR(base) || "makale";
  let slug = rootSlug;
  let suffix = 2;

  while (await hasSlug(slug)) {
    slug = `${rootSlug}-${suffix++}`;
  }

  return slug;
}
