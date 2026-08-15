// components/ui/AppInput.tsx
//
// TextInput is React Native's <input> — it's the only primitive that can
// receive keyboard focus and text. It doesn't infer keyboard type or
// validation from a `type` attribute like web's <input type="number">;
// those are separate explicit props (see keyboardType usage where this
// is used for the amount field).
//
// Extending TextInputProps and spreading ...rest is the same wrapper
// pattern you'd use for a styled <input> on web.

import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

import { COLORS } from "@/constants/theme";

interface AppInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export default function AppInput({ label, error, style, ...rest }: AppInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor={COLORS.muted}
        {...rest}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    fontSize: 13,
    color: COLORS.error,
    marginTop: 4,
  },
});
