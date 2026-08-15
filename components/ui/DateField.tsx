// components/ui/DateField.tsx
//
// @react-native-community/datetimepicker is the standard native date
// picker for Expo/RN — there's no built-in Expo equivalent. It renders a
// genuinely different native control per platform:
//   - iOS: an embedded picker you show/hide yourself (mode "inline"
//     here), which stays open until the user dismisses it.
//   - Android: a modal dialog the OS manages — it opens as soon as the
//     component mounts and closes itself after a pick or cancel.
// That's why the Done button below only renders on iOS, and why Android
// hides the picker as soon as `onChange` fires.
//
// The iOS inline picker doesn't reliably pick up this screen's colors on
// its own — left to auto-detect, its text and background can end up in
// near-identical tones and the calendar effectively disappears. Rather
// than depend on that detection, we force it into an explicit dark
// appearance (themeVariant/textColor) and drop it inside a matching dark
// "well" (background: COLORS.text, our darkest token) — so it's always
// legible against this screen's light background, regardless of what the
// device's own system appearance is doing.

import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { COLORS } from "@/constants/theme";
import { formatDate, toISODateString } from "@/utils/format";

interface DateFieldProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  minimumDate?: Date;
}

export default function DateField({
  label,
  value,
  onChange,
  minimumDate,
}: DateFieldProps) {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }
    if (event.type === "set" && selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Pressable style={styles.field} onPress={() => setShowPicker(true)}>
        <Text style={styles.value}>{formatDate(toISODateString(value))}</Text>
      </Pressable>

      {showPicker && Platform.OS === "ios" && (
        <View style={styles.pickerWell}>
          <DateTimePicker
            value={value}
            mode="date"
            display="inline"
            onChange={handleChange}
            minimumDate={minimumDate}
            themeVariant="dark"
            textColor="#FFFFFF"
            accentColor={COLORS.primary}
          />
          <Pressable style={styles.doneButton} onPress={() => setShowPicker(false)}>
            <Text style={styles.doneText}>Done</Text>
          </Pressable>
        </View>
      )}

      {showPicker && Platform.OS === "android" && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={handleChange}
          minimumDate={minimumDate}
        />
      )}
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
  field: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  value: {
    fontSize: 16,
    color: COLORS.text,
  },
  pickerWell: {
    backgroundColor: COLORS.text,
    borderRadius: 16,
    marginTop: 8,
    paddingTop: 8,
    paddingHorizontal: 4,
  },
  doneButton: {
    alignSelf: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  doneText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
});
