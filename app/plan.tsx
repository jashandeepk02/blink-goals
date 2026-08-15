// app/plan.tsx

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GoalSummaryCard from "@/components/GoalSummaryCard";
import PaceOptionCard from "@/components/PaceOptionCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { COLORS } from "@/constants/theme";
import { useGoalStore } from "@/store/useGoalStore";
import type { ContributionPace } from "@/types/goal";
import { calculateGoalPlan } from "@/utils/goal-calculations";

const PACE_ORDER: ContributionPace[] = ["daily", "weekly", "monthly"];

export default function Plan() {
  const router = useRouter();

  // Selecting each field individually (rather than one selector that
  // returns `{ name, targetAmount, ... }`) avoids a classic Zustand
  // pitfall: an object literal is a new reference every render, so a
  // combined selector would re-subscribe (and re-render) on every store
  // update even when the values inside didn't change.
  const name = useGoalStore((state) => state.name);
  const targetAmount = useGoalStore((state) => state.targetAmount);
  const startDate = useGoalStore((state) => state.startDate);
  const targetDate = useGoalStore((state) => state.targetDate);
  const selectPaceAction = useGoalStore((state) => state.selectPace);
  const startGoal = useGoalStore((state) => state.startGoal);

  const [selectedPace, setSelectedPace] = useState<ContributionPace | null>(null);

  // Guards against landing here with no goal in the store (e.g. a
  // dev-reload while sitting on this screen). Navigation can't happen
  // during render, so this needs useEffect — same rule as React Router.
  useEffect(() => {
    if (!name) {
      router.replace("/");
    }
  }, [name, router]);

  const plan = useMemo(
    () => calculateGoalPlan(targetAmount, startDate, targetDate),
    [targetAmount, startDate, targetDate]
  );

  if (!name) {
    return null;
  }

  const handleStartGoal = () => {
    if (!selectedPace) return;
    selectPaceAction(selectedPace, plan[selectedPace].amount);
    startGoal();
    router.push("/goal");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <GoalSummaryCard
          name={name}
          targetAmount={targetAmount}
          targetDate={targetDate}
        />

        <Text style={styles.sectionTitle}>Choose your pace</Text>

        {PACE_ORDER.map((pace) => (
          <PaceOptionCard
            key={pace}
            pace={pace}
            amount={plan[pace].amount}
            contributions={plan[pace].contributions}
            selected={selectedPace === pace}
            onPress={() => setSelectedPace(pace)}
          />
        ))}

        <PrimaryButton
          title="Start Goal"
          onPress={handleStartGoal}
          disabled={!selectedPace}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 16,
  },
});
