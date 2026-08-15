// app/_layout.tsx

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="create-goal" />
        <Stack.Screen name="plan" />
        <Stack.Screen name="goal" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
