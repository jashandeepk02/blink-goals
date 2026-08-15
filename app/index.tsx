// app/index.tsx

import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PrimaryButton from "@/components/ui/PrimaryButton";
import { COLORS } from "@/constants/theme";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.heading}>Blink Goals</Text>
        <Text style={styles.subheading}>Turn your goals into a plan.</Text>

        <PrimaryButton
          title="Create Goal"
          onPress={() => router.push("/create-goal")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    color: COLORS.muted,
    textAlign: "center",
    marginBottom: 40,
  },
});
