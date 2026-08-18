// components/MilestoneTrack.tsx
//
// The existing linear ProgressBar, augmented with a small dot marker at
// each milestone threshold (25/50/75/100) and the percentage label that
// used to live directly in app/goal.tsx. Visualization only — amounts
// and encouragement copy live in MilestoneList / getMotivationalMessage,
// so this stays readable at a glance instead of getting cluttered.

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import ProgressBar from "@/components/ui/ProgressBar";
import { COLORS } from "@/constants/theme";
import type { MilestoneState } from "@/types/goal";

interface MilestoneTrackProps {
  progress: number; // 0-1, already clamped
  milestones: MilestoneState[];
}

const MARKER_SIZE = 16;

export default function MilestoneTrack({ progress, milestones }: MilestoneTrackProps) {
  const percent = Math.round(Math.min(Math.max(progress, 0), 1) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.trackWrapper}>
        <ProgressBar progress={progress} />
        <View style={styles.markers} pointerEvents="none">
          {milestones.map((milestone) => (
            <View
              key={milestone.threshold}
              style={[
                styles.marker,
                { left: `${milestone.threshold}%` },
                milestone.status === "completed" && styles.markerCompleted,
                milestone.status === "current" && styles.markerCurrent,
              ]}
            >
              {milestone.status === "completed" && (
                <Ionicons name="checkmark" size={10} color="#FFFFFF" />
              )}
            </View>
          ))}
        </View>
      </View>
      <Text style={styles.percentLabel}>{percent}% complete</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  trackWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  markers: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  marker: {
    position: "absolute",
    width: MARKER_SIZE,
    height: MARKER_SIZE,
    borderRadius: MARKER_SIZE / 2,
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateX: -MARKER_SIZE / 2 }],
  },
  markerCompleted: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  markerCurrent: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: "#FFFFFF",
  },
  percentLabel: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 10,
  },
});
