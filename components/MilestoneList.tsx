// components/MilestoneList.tsx
//
// The Goal screen's compact "Milestones" section — one row per
// threshold, showing at a glance what's unlocked, what's next, and
// (for the next milestone only) how much more is needed to reach it.
// Locked milestones stay visible but subdued, so the full path to 100%
// is always in view without reading like a technical checklist.

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/theme";
import type { MilestoneState } from "@/types/goal";
import { formatCurrency } from "@/utils/format";

interface MilestoneListProps {
  milestones: MilestoneState[];
}

export default function MilestoneList({ milestones }: MilestoneListProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Milestones</Text>
      {milestones.map((milestone, index) => (
        <MilestoneRow
          key={milestone.threshold}
          milestone={milestone}
          isLast={index === milestones.length - 1}
        />
      ))}
    </View>
  );
}

function MilestoneRow({ milestone, isLast }: { milestone: MilestoneState; isLast: boolean }) {
  const { status, threshold, label, amountRemaining } = milestone;
  const isCompleted = status === "completed";
  const isCurrent = status === "current";

  return (
    <View style={[styles.row, !isLast && styles.rowDivider]}>
      <View
        style={[
          styles.iconBadge,
          isCompleted && styles.iconBadgeCompleted,
          isCurrent && styles.iconBadgeCurrent,
        ]}
      >
        <Ionicons
          name={isCompleted ? "checkmark" : isCurrent ? "flag" : "ellipse-outline"}
          size={isCompleted || isCurrent ? 15 : 10}
          color={isCompleted ? "#FFFFFF" : isCurrent ? COLORS.primary : COLORS.muted}
        />
      </View>

      <View style={styles.textColumn}>
        <Text style={[styles.label, status === "locked" && styles.labelLocked]}>{label}</Text>
        <Text style={styles.helper}>
          {isCompleted
            ? `${threshold}% completed`
            : isCurrent
              ? `${formatCurrency(amountRemaining)} more to unlock`
              : `${threshold}% of your goal`}
        </Text>
      </View>

      {isCompleted && <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
  },
  heading: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  iconBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
  },
  iconBadgeCompleted: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  iconBadgeCurrent: {
    borderColor: COLORS.primary,
    backgroundColor: "#EFF6FF",
  },
  textColumn: {
    flex: 1,
  },
  label: {
    fontSize: 14.5,
    fontWeight: "600",
    color: COLORS.text,
  },
  labelLocked: {
    color: COLORS.muted,
  },
  helper: {
    fontSize: 12.5,
    color: COLORS.muted,
    marginTop: 2,
  },
});
