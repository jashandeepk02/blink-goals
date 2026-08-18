// utils/motivation.ts
//
// Turns the same clamped progress used everywhere else into a short
// line of contextual encouragement. Bands are driven off the milestone
// states rather than re-deriving their own percentage thresholds, so
// there's a single source of truth for "what counts as 25/50/75%"
// (see utils/milestones.ts) — this file only decides the copy.

import type { MilestoneState } from "@/types/goal";

export function getMotivationalMessage(progress: number, milestones: MilestoneState[]): string {
  const highestCompleted = milestones.reduce(
    (highest, milestone) => (milestone.status === "completed" ? Math.max(highest, milestone.threshold) : highest),
    0
  );

  if (highestCompleted >= 100) {
    return "You did it — goal achieved.";
  }
  if (highestCompleted >= 75) {
    return "You're in the final stretch.";
  }
  if (highestCompleted >= 50) {
    return "Halfway there — your goal is getting closer.";
  }
  if (highestCompleted >= 25) {
    return "First milestone unlocked. You're building momentum.";
  }
  if (progress > 0) {
    return "Great start — keep building momentum.";
  }
  return "Your journey starts with the first contribution.";
}
