// types/goal.ts

export type ContributionPace = "daily" | "weekly" | "monthly";

export interface PaceOption {
  amount: number;
  contributions: number;
}

export interface GoalPlan {
  daily: PaceOption;
  weekly: PaceOption;
  monthly: PaceOption;
}

export interface Goal {
  name: string;
  targetAmount: number;
  startDate: string;
  targetDate: string;
  pace?: ContributionPace;
  contributionAmount?: number;
  savedAmount: number;
}

// Gamification — milestone progression -------------------------------

export type MilestoneThreshold = 25 | 50 | 75 | 100;

export type MilestoneStatus = "completed" | "current" | "locked";

export interface MilestoneState {
  threshold: MilestoneThreshold;
  label: string;
  status: MilestoneStatus;
  // How much more (in rupees) is needed to unlock this milestone, based
  // on the clamped goal progress. 0 once the milestone is completed.
  amountRemaining: number;
}
