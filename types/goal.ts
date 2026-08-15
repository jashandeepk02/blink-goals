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
