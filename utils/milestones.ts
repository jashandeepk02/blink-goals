// utils/milestones.ts
//
// Milestone progression is derived entirely from the same clamped
// progress fraction (0..1) that calculateProgress() already produces for
// the ProgressBar — never from raw savedAmount, which can exceed
// targetAmount when a contribution overshoots the goal. Feeding a
// pre-clamped progress value in here is what guarantees a milestone can
// never appear unlocked past 100%.

import type { MilestoneState, MilestoneThreshold } from "@/types/goal";

// Tiny tolerance for floating-point division, so an amount that's
// meant to land exactly on a threshold (e.g. 5,000 / 10,000) reliably
// reads as *exactly* 50%, not 49.999999999994%.
const EPSILON = 1e-9;

const MILESTONE_THRESHOLDS: MilestoneThreshold[] = [25, 50, 75, 100];

const MILESTONE_LABELS: Record<MilestoneThreshold, string> = {
  25: "Getting Started",
  50: "Halfway There",
  75: "Almost There",
  100: "Goal Crushed",
};

function toClampedPercent(progress: number): number {
  return Math.min(Math.max(progress, 0), 1) * 100;
}

// Builds the four milestones' display state for the current goal.
// Exactly one milestone is ever "current" — the next one not yet
// unlocked — everything after it is "locked", everything at or before
// the clamped progress is "completed".
export function getMilestoneStates(progress: number, targetAmount: number): MilestoneState[] {
  const percent = toClampedPercent(progress);
  let currentAssigned = false;

  return MILESTONE_THRESHOLDS.map((threshold) => {
    const isUnlocked = percent >= threshold - EPSILON;

    let status: MilestoneState["status"] = "locked";
    if (isUnlocked) {
      status = "completed";
    } else if (!currentAssigned) {
      status = "current";
      currentAssigned = true;
    }

    const requiredAmount = (threshold / 100) * targetAmount;
    const achievedAmount = (percent / 100) * targetAmount;
    const amountRemaining = Math.max(requiredAmount - achievedAmount, 0);

    return {
      threshold,
      label: MILESTONE_LABELS[threshold],
      status,
      amountRemaining,
    };
  });
}

// Given the progress *after* a contribution and the highest threshold
// already celebrated for this goal, returns the thresholds newly
// crossed by that contribution, in ascending order (empty if none).
// `highestSeen` is the store's source of truth for "already shown" —
// this function is pure and doesn't track anything itself.
export function getNewlyCrossedMilestones(
  progress: number,
  highestSeen: number
): MilestoneThreshold[] {
  const percent = toClampedPercent(progress);
  return MILESTONE_THRESHOLDS.filter(
    (threshold) => threshold > highestSeen && percent >= threshold - EPSILON
  );
}
