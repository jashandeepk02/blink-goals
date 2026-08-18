// components/ui/PrimaryButton.tsx
//
// React Native has no <button>. Pressable is the primitive for any
// tappable element — it gives native touch handling and, via the
// function-style `style` prop below, a `pressed` boolean for visual
// feedback (there's no CSS `:active` pseudo-class to reach for here).
//
// `variant="success"` and the optional `icon` prop exist for the
// gamification CTAs (e.g. "Share Your Win") — both are opt-in, so every
// existing call site renders exactly as before.

import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "success";
  icon?: IconName;
}

export default function PrimaryButton({
  title,
  onPress,
  disabled,
  variant = "primary",
  icon,
}: PrimaryButtonProps) {
  const isSecondary = variant === "secondary";
  const isSuccess = variant === "success";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        isSecondary && styles.secondaryButton,
        isSuccess && styles.successButton,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressedButton,
      ]}
    >
      <View style={styles.content}>
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={isSecondary ? COLORS.text : "#FFFFFF"}
            style={styles.icon}
          />
        )}
        <Text style={[styles.text, isSecondary && styles.secondaryText]}>{title}</Text>
      </View>
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
  successButton: {
    backgroundColor: COLORS.success,
  },
  disabledButton: {
    opacity: 0.4,
  },
  pressedButton: {
    opacity: 0.85,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
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
