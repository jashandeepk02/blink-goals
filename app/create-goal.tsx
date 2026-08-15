// app/create-goal.tsx

import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppInput from "@/components/ui/AppInput";
import DateField from "@/components/ui/DateField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { COLORS } from "@/constants/theme";
import { useGoalStore } from "@/store/useGoalStore";
import { toISODateString } from "@/utils/format";

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

interface FormErrors {
  name?: string;
  amount?: string;
  dates?: string;
}

export default function CreateGoal() {
  const router = useRouter();
  const createGoal = useGoalStore((state) => state.createGoal);

  const [name, setName] = useState("");
  const [amountText, setAmountText] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [targetDate, setTargetDate] = useState(addDays(new Date(), 30));
  const [errors, setErrors] = useState<FormErrors>({});

  const targetAmount = useMemo(() => Number(amountText), [amountText]);

  const handleBuildPlan = () => {
    const nextErrors: FormErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Give your goal a name.";
    }
    if (!amountText || Number.isNaN(targetAmount) || targetAmount <= 0) {
      nextErrors.amount = "Enter an amount greater than ₹0.";
    }
    if (targetDate.getTime() <= startDate.getTime()) {
      nextErrors.dates = "Target date must be after your start date.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    createGoal({
      name: name.trim(),
      targetAmount,
      startDate: toISODateString(startDate),
      targetDate: toISODateString(targetDate),
    });

    router.push("/plan");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Mobile keyboards cover whatever's beneath them — there's no
          browser-style automatic viewport resize. KeyboardAvoidingView
          shifts this screen's content up as the keyboard opens; ScrollView
          then lets the user scroll to whichever field the keyboard would
          otherwise hide. `keyboardShouldPersistTaps="handled"` stops the
          keyboard from swallowing the first tap on the submit button. */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.heading}>Create Your Goal</Text>

          <AppInput
            label="What are you planning for?"
            placeholder="e.g. Dubai Trip"
            value={name}
            onChangeText={setName}
            error={errors.name}
            returnKeyType="next"
          />

          <AppInput
            label="How much do you need?"
            placeholder="e.g. 100000"
            value={amountText}
            onChangeText={(text) => setAmountText(text.replace(/[^0-9]/g, ""))}
            error={errors.amount}
            keyboardType="numeric"
          />

          <DateField
            label="When do you want to start contributing?"
            value={startDate}
            onChange={setStartDate}
          />

          <DateField
            label="When do you need the money?"
            value={targetDate}
            onChange={setTargetDate}
            minimumDate={addDays(startDate, 1)}
          />
          {errors.dates ? <Text style={styles.errorText}>{errors.dates}</Text> : null}

          <PrimaryButton title="Build My Plan" onPress={handleBuildPlan} />
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
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 24,
  },
  errorText: {
    fontSize: 13,
    color: COLORS.error,
    marginTop: -12,
    marginBottom: 20,
  },
});
