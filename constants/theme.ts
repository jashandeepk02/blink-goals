// constants/theme.ts
//
// A handful of color tokens Blink Goals actually uses — not a design
// system. Add a new key here only when a screen genuinely needs it.

export const COLORS = {
  primary: "#2563EB", // CTA buttons, links — confident, trustworthy blue
  background: "#F8FAFC", // screen background — clean, soft off-white
  text: "#0F172A", // primary text — near-black
  muted: "#64748B", // secondary text (subheadings, hints)
  success: "#16A34A", // positive states (e.g. "on track") — future use
  error: "#DC2626", // error / destructive states — future use
} as const;
