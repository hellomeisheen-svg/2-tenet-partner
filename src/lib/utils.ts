import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parses URL query params and UTM tags once on mount.
 * Returns a record used to populate hidden form fields.
 */
export function getUrlParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const keys = [
    "partner_code",
    "promo",
    "ref",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "page_url",
  ];
  const result: Record<string, string> = {};
  keys.forEach((k) => {
    if (k === "page_url") {
      result[k] = window.location.href;
    } else {
      const v = params.get(k);
      result[k] = v ?? "";
    }
  });
  return result;
}

/** Formats phone with Russian mask: +7 (XXX) XXX-XX-XX */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  let d = digits;
  if (d.startsWith("8")) d = d.slice(1);
  if (d.startsWith("7")) d = d.slice(1);
  d = d.slice(0, 10);

  let out = "+7";
  if (d.length > 0) out += " (" + d.slice(0, 3);
  if (d.length >= 3) out += ") ";
  if (d.length > 3) out += d.slice(3, 6);
  if (d.length >= 6) out += "-";
  if (d.length > 6) out += d.slice(6, 8);
  if (d.length >= 8) out += "-";
  if (d.length > 8) out += d.slice(8, 10);
  return out;
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11;
}
