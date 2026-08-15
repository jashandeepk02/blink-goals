// utils/format.ts
//
// Small formatting helpers shared across screens. Kept separate from
// goal-calculations.ts because these are pure display/parsing concerns,
// not business logic.

// Parses a "YYYY-MM-DD" string into a local Date at midnight.
//
// We deliberately don't use `new Date("2026-08-20")` directly: JS parses
// date-only ISO strings as UTC midnight, but then every getter
// (getFullYear/getMonth/getDate) reads it back in the *device's local*
// timezone. West of UTC, that can quietly roll the date back by one day.
// Splitting the string ourselves and building the Date from y/m/d avoids
// the UTC round-trip entirely.
export function parseISODate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// Inverse of parseISODate — turns a local Date back into "YYYY-MM-DD"
// for storing in state (the store keeps dates as strings, not Date
// objects, so they stay simple/serializable).
export function toISODateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// "2026-10-20" -> "20 Oct 2026"
export function formatDate(dateString: string): string {
  const date = parseISODate(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// 100000 -> "₹1,00,000" (en-IN locale groups digits in the Indian
// lakh/crore pattern automatically — no manual comma logic needed).
export function formatCurrency(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}
