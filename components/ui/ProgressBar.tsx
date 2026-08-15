// components/ui/ProgressBar.tsx
//
// One of the few RN styling props that behaves exactly like web CSS:
// `width: "50%"` on a View sizes it relative to its parent, same as CSS.
// The bar is just two nested Views — a fixed-height track with
// `overflow: "hidden"`, and an inner View whose width we drive from the
// `progress` prop.

import { StyleSheet, View } from "react-native";

import { COLORS } from "@/constants/theme";

interface ProgressBarProps {
  progress: number; // 0 to 1
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const clamped = Math.min(Math.max(progress, 0), 1);

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${clamped * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 12,
    borderRadius: 999,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
});
