// components/PaceOptionCard.tsx
//
// One selectable card in the Plan screen's "Choose your pace" list.
// Selection state is owned by the parent screen (plan.tsx) — this is a
// controlled/presentational component, same pattern as a controlled
// radio option on web.

import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/theme";
import type { ContributionPace } from "@/types/goal";
import { formatCurrency } from "@/utils/format";

const PACE_LABELS: Record<ContributionPace, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

const PACE_UNIT: Record<ContributionPace, string> = {
  daily: "day",
  weekly: "week",
  monthly: "month",
};

interface PaceOptionCardProps {
  pace: ContributionPace;
  amount: number;
  contributions: number;
  selected: boolean;
  onPress: () => void;
}

export default function PaceOptionCard({
  pace,
  amount,
  contributions,
  selected,
  onPress,
}: PaceOptionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selected && styles.cardSelected]}
    >
      <View style={styles.headerRow}>
        <Text style={styles.title}>{PACE_LABELS[pace]}</Text>
        {selected && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.amount}>
        {formatCurrency(amount)} / {PACE_UNIT[pace]}
      </Text>
      <Text style={styles.contributions}>
        {contributions} contribution{contributions === 1 ? "" : "s"} remaining
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  cardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: "#EFF6FF",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  checkmark: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
  },
  amount: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  contributions: {
    fontSize: 13,
    color: COLORS.muted,
  },
});
