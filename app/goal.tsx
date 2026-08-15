// app/goal.tsx

import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ContributionForm from "@/components/ContributionForm";
import InfoCard from "@/components/ui/InfoCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ProgressBar from "@/components/ui/ProgressBar";
import { COLORS } from "@/constants/theme";
import { useGoalStore } from "@/store/useGoalStore";
import type { ContributionPace } from "@/types/goal";
import { formatCurrency, formatDate } from "@/utils/format";
import { calculateProgress } from "@/utils/goal-calculations";

const PACE_LABELS: Record<ContributionPace, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

export default function Goal() {
  const router = useRouter();

  const name = useGoalStore((state) => state.name);
  const targetAmount = useGoalStore((state) => state.targetAmount);
  const savedAmount = useGoalStore((state) => state.savedAmount);
  const targetDate = useGoalStore((state) => state.targetDate);
  const pace = useGoalStore((state) => state.pace);
  const hasStarted = useGoalStore((state) => state.hasStarted);
  const addContribution = useGoalStore((state) => state.addContribution);

  const [showContributionForm, setShowContributionForm] = useState(false);

  useEffect(() => {
    if (!hasStarted) {
      router.replace("/");
    }
  }, [hasStarted, router]);

  if (!hasStarted) {
    return null;
  }

  const progress = calculateProgress(savedAmount, targetAmount);
  const remaining = Math.max(targetAmount - savedAmount, 0);
  const isComplete = progress >= 1;

  const handleConfirmContribution = (amount: number) => {
    addContribution(amount);
    setShowContributionForm(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Add Contribution's TextInput autoFocuses, which raises the
          keyboard immediately — without this, the keyboard just overlays
          whatever it covers instead of the screen making room for it. */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.name}>{name}</Text>

          <Text style={styles.savedLine}>
            {formatCurrency(savedAmount)} of {formatCurrency(targetAmount)} saved
          </Text>

          <ProgressBar progress={progress} />
          <Text style={styles.progressText}>
            {isComplete
              ? "🎉 Goal complete!"
              : `${Math.round(progress * 100)}% complete`}
          </Text>

          <View style={styles.card}>
            <InfoCard label="Goal amount" value={formatCurrency(targetAmount)} />
            <InfoCard label="Saved" value={formatCurrency(savedAmount)} />
            <InfoCard label="Remaining" value={formatCurrency(remaining)} />
            <InfoCard label="Target date" value={formatDate(targetDate)} />
            <InfoCard label="Plan" value={pace ? PACE_LABELS[pace] : "—"} />
          </View>

          {!isComplete && !showContributionForm && (
            <PrimaryButton
              title="Add Contribution"
              onPress={() => setShowContributionForm(true)}
            />
          )}

          {showContributionForm && (
            <ContributionForm
              onCancel={() => setShowContributionForm(false)}
              onConfirm={handleConfirmContribution}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 20,
  },
  savedLine: {
    fontSize: 16,
    color: COLORS.muted,
    marginBottom: 10,
  },
  progressText: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 8,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
  },
});
