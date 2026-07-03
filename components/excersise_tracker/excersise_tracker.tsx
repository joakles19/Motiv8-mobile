import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ExceriseTracker() {
  type MenuOption = "menu" | "newWorkout" | "viewWorkouts" | "friends";

  const [activeMenu, setActiveMenu] = useState<MenuOption>("menu");
  const [workoutName, setWorkoutName] = useState("");
  const [workoutBio, setWorkoutBio] = useState("");
  const [workoutType, setWorkoutType] = useState("");

  return (
    <View style={styles.container}>
      {activeMenu === "menu" && (
        <ScrollView>
          <Text style={styles.heading}>Exercise Tracker</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setActiveMenu("viewWorkouts")}
            >
              <Text style={styles.buttonText}>View workouts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setActiveMenu("newWorkout")}
            >
              <Text style={styles.buttonText}>Start a new workout</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subheading}>Your friends</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={() => setActiveMenu("friends")}
            >
              <Text style={styles.buttonOutlineText}>Add a new friend</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {activeMenu === "newWorkout" && (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setActiveMenu("menu")}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.heading}>New Workout</Text>

          <View style={styles.card}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Workout name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Push Day"
                placeholderTextColor="#9AAAB8"
                value={workoutName}
                onChangeText={setWorkoutName}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Workout bio</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="A short description of this workout"
                placeholderTextColor="#9AAAB8"
                value={workoutBio}
                onChangeText={setWorkoutBio}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Workout type</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Strength, Cardio, HIIT"
                placeholderTextColor="#9AAAB8"
                value={workoutType}
                onChangeText={setWorkoutType}
              />
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Begin workout!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const colors = {
  primary: "#153E75",
  surface: "#FFFFFF",
  border: "#D7E3EE",
  inputBg: "#F7FAFC",
  label: "#4A5D73",
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 24,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 16,
  },

  subheading: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    marginTop: 24,
    marginBottom: 12,
  },

  card: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowColor: "#0F2A4D",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },

  button: {
    width: "100%",
    backgroundColor: colors.primary,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  buttonOutline: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBg,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonOutlineText: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 16,
  },

  backButton: {
    alignSelf: "flex-start",
    marginBottom: 12,
  },

  backButtonText: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 15,
  },

  formGroup: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.label,
    marginBottom: 6,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: colors.primary,
  },

  textArea: {
    height: 90,
    paddingTop: 11,
  },
});
