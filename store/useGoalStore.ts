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

import { create } from "zustand";

import type { ContributionPace } from "@/types/goal";

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

  createGoal: (details: GoalDetails) => void;
  selectPace: (pace: ContributionPace, amount: number) => void;
  startGoal: () => void;
  addContribution: (amount: number) => void;
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
    }),

  selectPace: (pace, amount) => set({ pace, contributionAmount: amount }),

  startGoal: () => set({ hasStarted: true }),

  addContribution: (amount) =>
    set((state) => ({ savedAmount: state.savedAmount + amount })),

  resetGoal: () => set(initialState),
}));
