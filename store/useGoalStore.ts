// store/useGoalStore.ts
//
// Single source of truth for the in-progress/active goal, shared across
// create-goal -> plan -> goal. Same `create<T>()` API as Zustand on web —
// nothing RN-specific here, it's just JS state with no DOM/persistence
// dependency, so it works identically on native.
//
// Deliberately does NOT store the calculated plan (daily/weekly/monthly
// options) — that's derived data, recomputed from targetAmount/startDate/
// targetDate via calculateGoalPlan() wherever it's needed. Storing it
// alongside the inputs would risk it going stale, the same reason you'd
// avoid storing a derived value in React state on web.
//
// Gamification state below follows the same principle: milestone
// *status* (locked/current/completed) is derived from progress wherever
// it's displayed (see utils/milestones.ts) and never stored. The only
// thing that genuinely needs to live in the store is `highestMilestoneSeen`
// — which milestone has already had its celebration shown — because
// that's the one fact that can't be recomputed from savedAmount alone.

import { create } from "zustand";

import type { ContributionPace, MilestoneThreshold } from "@/types/goal";
import { calculateProgress } from "@/utils/goal-calculations";
import { getNewlyCrossedMilestones } from "@/utils/milestones";

interface GoalDetails {
  name: string;
  targetAmount: number;
  startDate: string;
  targetDate: string;
}

interface GoalState extends GoalDetails {
  pace: ContributionPace | null;
  contributionAmount: number;
  savedAmount: number;
  hasStarted: boolean;

  // The highest milestone threshold whose celebration has already been
  // shown for this goal. Monotonically increasing, reset by createGoal.
  // This — not a UI flag — is what stops a milestone celebration from
  // firing again on re-render or after the banner is dismissed.
  highestMilestoneSeen: number;
  // The milestone threshold whose celebration is currently queued for
  // display (null when there's nothing to show). Set by addContribution
  // the instant a contribution crosses a threshold for the first time;
  // cleared by the UI via acknowledgeCelebration() once it's been shown.
  pendingCelebration: MilestoneThreshold | null;

  createGoal: (details: GoalDetails) => void;
  selectPace: (pace: ContributionPace, amount: number) => void;
  startGoal: () => void;
  addContribution: (amount: number) => void;
  acknowledgeCelebration: () => void;
  resetGoal: () => void;
}

const initialState = {
  name: "",
  targetAmount: 0,
  startDate: "",
  targetDate: "",
  pace: null as ContributionPace | null,
  contributionAmount: 0,
  savedAmount: 0,
  hasStarted: false,
  highestMilestoneSeen: 0,
  pendingCelebration: null as MilestoneThreshold | null,
};

export const useGoalStore = create<GoalState>((set) => ({
  ...initialState,

  createGoal: (details) =>
    set({
      ...details,
      pace: null,
      contributionAmount: 0,
      savedAmount: 0,
      hasStarted: false,
      highestMilestoneSeen: 0,
      pendingCelebration: null,
    }),

  selectPace: (pace, amount) => set({ pace, contributionAmount: amount }),

  startGoal: () => set({ hasStarted: true }),

  addContribution: (amount) =>
    set((state) => {
      const savedAmount = state.savedAmount + amount;
      const progress = calculateProgress(savedAmount, state.targetAmount);
      const newlyCrossed = getNewlyCrossedMilestones(progress, state.highestMilestoneSeen);

      if (newlyCrossed.length === 0) {
        return { savedAmount };
      }

      const highest = newlyCrossed[newlyCrossed.length - 1];
      return {
        savedAmount,
        highestMilestoneSeen: highest,
        // 100% ("Goal Crushed") is carried by the completion card, not a
        // milestone toast — celebrating it twice would just duplicate
        // that bigger moment, so only sub-100 thresholds queue a banner.
        pendingCelebration: highest < 100 ? highest : null,
      };
    }),

  acknowledgeCelebration: () => set({ pendingCelebration: null }),

  resetGoal: () => set(initialState),
}));
