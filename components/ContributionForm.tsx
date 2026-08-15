// components/ContributionForm.tsx
//
// Inline "Add Contribution" form, rendered conditionally inside
// app/goal.tsx (`{showContributionForm && <ContributionForm ... />}`) —
// not a separate route or modal, per the assignment scope. Closes itself
// via onConfirm/onCancel; the parent screen owns the show/hide state.

import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import PrimaryButton from "@/components/ui/PrimaryButton";
import { COLORS } from "@/constants/theme";

interface ContributionFormProps {
  onCancel: () => void;
  onConfirm: (amount: number) => void;
}

export default function ContributionForm({
  onCancel,
  onConfirm,
}: ContributionFormProps) {
  const [amountText, setAmountText] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    const amount = Number(amountText);
    if (!amountText || Number.isNaN(amount) || amount <= 0) {
      setError("Enter an amount greater than ₹0.");
      return;
    }
    onConfirm(amount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>How much would you like to add?</Text>

      <View style={styles.inputRow}>
        <Text style={styles.prefix}>₹</Text>
        <TextInput
          style={styles.input}
          value={amountText}
          onChangeText={(text) => {
            setAmountText(text.replace(/[^0-9]/g, ""));
            setError("");
          }}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={COLORS.muted}
          autoFocus
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.actions}>
        <View style={styles.actionButton}>
          <PrimaryButton title="Cancel" variant="secondary" onPress={onCancel} />
        </View>
        <View style={styles.actionButton}>
          <PrimaryButton title="Confirm" onPress={handleConfirm} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  prefix: {
    fontSize: 20,
    color: COLORS.muted,
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 20,
    paddingVertical: 12,
    color: COLORS.text,
  },
  error: {
    fontSize: 13,
    color: COLORS.error,
    marginTop: 8,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
  },
});
