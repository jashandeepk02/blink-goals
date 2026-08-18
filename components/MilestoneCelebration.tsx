// components/MilestoneCelebration.tsx
//
// One-time banner shown when a contribution crosses a milestone
// threshold for the first time. Driven entirely by the store's
// `pendingCelebration` (see useGoalStore) — this component has no
// timing/tracking logic of its own, it just renders whatever the store
// says is pending and calls onDismiss when done.
//
// The haptic pulse and entrance animation are both best-effort: Haptics
// can throw/reject on platforms without support (e.g. web), and that's
// swallowed rather than surfaced, so a haptics/animation failure can
// never block the banner — or the contribution flow it's celebrating —
// from working.

import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useEffect } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { COLORS } from "@/constants/theme";
import type { MilestoneThreshold } from "@/types/goal";

const MILESTONE_LABELS: Record<MilestoneThreshold, string> = {
  25: "Getting Started",
  50: "Halfway There",
  75: "Almost There",
  100: "Goal Crushed",
};

const AUTO_DISMISS_MS = 2800;

interface MilestoneCelebrationProps {
  milestone: MilestoneThreshold | null;
  onDismiss: () => void;
}

export default function MilestoneCelebration({ milestone, onDismiss }: MilestoneCelebrationProps) {
  const visible = milestone !== null;
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    if (!visible) return;

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});

    opacity.value = withTiming(1, { duration: 220 });
    scale.value = withSpring(1, { damping: 14 });

    const timer = setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [visible, milestone, onDismiss, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  if (!visible || milestone === null) {
    return null;
  }

  return (
    <Modal transparent animationType="none" visible={visible} onRequestClose={onDismiss}>
      <Pressable style={styles.backdrop} onPress={onDismiss}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <View style={styles.iconBadge}>
            <Ionicons name="trophy" size={28} color="#FFFFFF" />
          </View>
          <Text style={styles.eyebrow}>Milestone unlocked</Text>
          <Text style={styles.title}>{MILESTONE_LABELS[milestone]}</Text>
          <Text style={styles.subtitle}>{milestone}% of your goal completed</Text>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.35)",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 32,
    alignItems: "center",
    width: "100%",
    maxWidth: 320,
  },
  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.success,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.success,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
  },
});
