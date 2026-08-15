// components/ui/PrimaryButton.tsx
//
// React Native has no <button>. Pressable is the primitive for any
// tappable element — it gives native touch handling and, via the
// function-style `style` prop below, a `pressed` boolean for visual
// feedback (there's no CSS `:active` pseudo-class to reach for here).

import { Pressable, StyleSheet, Text } from "react-native";

import { COLORS } from "@/constants/theme";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

export default function PrimaryButton({
  title,
  onPress,
  disabled,
  variant = "primary",
}: PrimaryButtonProps) {
  const isSecondary = variant === "secondary";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        isSecondary && styles.secondaryButton,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressedButton,
      ]}
    >
      <Text style={[styles.text, isSecondary && styles.secondaryText]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  disabledButton: {
    opacity: 0.4,
  },
  pressedButton: {
    opacity: 0.85,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryText: {
    color: COLORS.text,
  },
});
