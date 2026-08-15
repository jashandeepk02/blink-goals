// utils/goal-calculations.ts
//
// Business logic for turning a target amount + date range into
// daily/weekly/monthly contribution options. Kept out of plan.tsx so the
// screen stays UI-only and this logic is independently readable/testable.

import type { GoalPlan } from "@/types/goal";
import { parseISODate } from "@/utils/format";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function daysBetween(start: Date, target: Date): number {
  return Math.round((target.getTime() - start.getTime()) / MS_PER_DAY);
}

// Calendar-month difference (not a 30-day approximation) so "20 Aug -> 20
// Oct" reads as exactly 2 months, matching how a person would say it.
function monthsBetween(start: Date, target: Date): number {
  let months =
    (target.getFullYear() - start.getFullYear()) * 12 +
    (target.getMonth() - start.getMonth());

  // Target day-of-month hasn't been reached yet this cycle, e.g. 20 Aug
  // -> 15 Oct is 1 full month + a partial one, not 2.
  if (target.getDate() < start.getDate()) {
    months -= 1;
  }

  return Math.max(months, 1);
}

export function calculateGoalPlan(
  targetAmount: number,
  startDate: string,
  targetDate: string
): GoalPlan {
  const start = parseISODate(startDate);
  const target = parseISODate(targetDate);

  const totalDays = Math.max(daysBetween(start, target), 1);
  const totalWeeks = Math.max(Math.ceil(totalDays / 7), 1);
  const totalMonths = monthsBetween(start, target);

  // Round contribution amounts UP, never down — rounding down would let
  // the last scheduled contribution fall short of the actual target.
  return {
    daily: {
      amount: Math.ceil(targetAmount / totalDays),
      contributions: totalDays,
    },
    weekly: {
      amount: Math.ceil(targetAmount / totalWeeks),
      contributions: totalWeeks,
    },
    monthly: {
      amount: Math.ceil(targetAmount / totalMonths),
      contributions: totalMonths,
    },
  };
}

export function calculateProgress(savedAmount: number, targetAmount: number): number {
  if (targetAmount <= 0) return 0;
  return Math.min(Math.max(savedAmount / targetAmount, 0), 1);
}
