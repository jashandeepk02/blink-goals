// components/GoalCompletionCard.tsx
//
// Replaces the old "🎉 Goal complete!" text swap with a proper
// completion moment. Rendered by app/goal.tsx *instead of* the regular
// name/saved-amount header once the goal is complete — not alongside it.
//
// Uses React Native's built-in Share API — no sharing dependency needed.
// A rejected/cancelled share (e.g. the user backs out of the share
// sheet, or the platform has no share target) is a normal outcome here,
// not an error worth surfacing.

import { Ionicons } from "@expo/vector-icons";
import { Share, StyleSheet, Text, View } from "react-native";

import PrimaryButton from "@/components/ui/PrimaryButton";
import { COLORS } from "@/constants/theme";
import { formatCurrency } from "@/utils/format";

interface GoalCompletionCardProps {
  name: string;
  targetAmount: number;
}

export default function GoalCompletionCard({ name, targetAmount }: GoalCompletionCardProps) {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `I just hit my "${name}" savings goal of ${formatCurrency(
          targetAmount
        )} 🎯 — turning one big goal into a series of small, steady wins with Blink Goals.`,
      });
    } catch {
      // Share.share() can reject (no share target available, platform
      // not supported, etc.) — nothing to do here except not crash.
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.iconBadge}>
        <Ionicons name="trophy" size={32} color="#FFFFFF" />
      </View>

      <Text style={styles.heading}>Goal achieved</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.amount}>{formatCurrency(targetAmount)} · 100% complete</Text>

      <Text style={styles.message}>
        Every contribution added up. You planned it, showed up for it, and got there.
      </Text>

      <View style={styles.shareButton}>
        <PrimaryButton
          title="Share Your Win"
          variant="success"
          icon="share-social-outline"
          onPress={handleShare}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
  },
  iconBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.success,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    color: COLORS.muted,
    marginBottom: 10,
  },
  amount: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.success,
    marginBottom: 16,
  },
  message: {
    fontSize: 14,
    color: COLORS.text,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  shareButton: {
    alignSelf: "stretch",
  },
});
