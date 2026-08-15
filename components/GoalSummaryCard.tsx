// components/GoalSummaryCard.tsx
//
// The "✓ Your plan is ready" card at the top of the Plan screen.

import { StyleSheet, Text, View } from "react-native";

import InfoCard from "@/components/ui/InfoCard";
import { COLORS } from "@/constants/theme";
import { formatCurrency, formatDate } from "@/utils/format";

interface GoalSummaryCardProps {
  name: string;
  targetAmount: number;
  targetDate: string;
}

export default function GoalSummaryCard({
  name,
  targetAmount,
  targetDate,
}: GoalSummaryCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.badge}>✓ Your plan is ready</Text>
      <Text style={styles.name}>{name}</Text>
      <InfoCard label="Target" value={formatCurrency(targetAmount)} />
      <InfoCard label="Target Date" value={formatDate(targetDate)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  badge: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.success,
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
  },
});
