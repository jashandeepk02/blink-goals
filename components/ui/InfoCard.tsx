// components/ui/InfoCard.tsx
//
// A single label/value row — used for the "Goal amount / Saved /
// Remaining / Target date / Plan" list on the Goal screen, and for the
// "Target / Target Date" rows in GoalSummaryCard. Kept generic (just
// label + value) rather than goal-specific, since both call sites need
// the exact same row shape.

import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/theme";

interface InfoCardProps {
  label: string;
  value: string;
}

export default function InfoCard({ label, value }: InfoCardProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  label: {
    fontSize: 13.5,
    color: COLORS.muted,
  },
  value: {
    fontSize: 13.5,
    fontWeight: "600",
    color: COLORS.text,
  },
});
