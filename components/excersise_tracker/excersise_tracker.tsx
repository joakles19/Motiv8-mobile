import exercisesData from "@/assets/workouts.json";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Dropdown from "../dropdown";
import NewExercise from "./new_excersise";

export default function ExceriseTracker() {
  type MenuOption =
    | "menu"
    | "newWorkoutMenu"
    | "newWorkoutInterface"
    | "viewWorkouts"
    | "friends";

  const [activeMenu, setActiveMenu] = useState<MenuOption>("menu");
  const [workoutName, setWorkoutName] = useState("");
  const [workoutBio, setWorkoutBio] = useState("");
  const [workoutType, setWorkoutType] = useState("");

  type Exercise = {
    id: string;
    name: string;
    sets: number;
    reps: number;
  };

  const exerciseOptions = exercisesData.map((e) => ({
    label: e.exercisename,
    value: e.exercisename,
  }));

  const [exercises, setExercises] = useState<Exercise[]>([]);

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: "",
      sets: 3,
      reps: 10,
    };
    setExercises((prev) => [...prev, newExercise]);
  };

  const [displayError, setDisplayError] = useState("");

  const changeMenu = (menuType: MenuOption) => {
    setDisplayError("");
    setActiveMenu(menuType);
  };

  const handleNewWorkout = () => {
    if (!workoutName || !workoutType) {
      setDisplayError("Please enter required fields");
    } else {
      changeMenu("newWorkoutInterface");
    }
  };

  const today = new Date();
  const formatted = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <View style={styles.container}>
      {activeMenu === "menu" && (
        <ScrollView>
          <Text style={styles.heading}>Exercise Tracker</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => changeMenu("viewWorkouts")}
            >
              <Text style={styles.buttonText}>View workouts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => changeMenu("newWorkoutMenu")}
            >
              <Text style={styles.buttonText}>Start a new workout</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subheading}>Your friends</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={() => changeMenu("friends")}
            >
              <Text style={styles.buttonOutlineText}>Add a new friend</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {activeMenu === "newWorkoutMenu" && (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => changeMenu("menu")}
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

            <Dropdown
              label="Workout type"
              placeholder="Select which workout you will do"
              options={[
                { label: "Strength", value: "strength" },
                { label: "Cardio", value: "cardio" },
                { label: "HIIT", value: "hiit" },
                { label: "Mobility", value: "mobility" },
                { label: "Other", value: "other" },
              ]}
              selectedValue={workoutType}
              onValueChange={setWorkoutType}
            />

            <TouchableOpacity style={styles.button} onPress={handleNewWorkout}>
              <Text style={styles.buttonText}>Begin workout!</Text>
            </TouchableOpacity>

            {displayError && <Text>{displayError}</Text>}
          </View>
        </ScrollView>
      )}

      {activeMenu === "newWorkoutInterface" && (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => changeMenu("newWorkoutMenu")}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <View style={styles.workoutHeaderRow}>
              <Text style={styles.heading}>{workoutName}</Text>
              {workoutType ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{workoutType}</Text>
                </View>
              ) : null}
            </View>

            <Text style={styles.dateText}>{formatted}</Text>

            {workoutBio ? (
              <Text style={styles.bioText}>{workoutBio}</Text>
            ) : null}

            <View style={styles.divider} />
            {exercises.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No exercises added yet
                </Text>
              </View>
            ) : (
              exercises.map((exercise) => (
                <NewExercise
                  key={exercise.id}
                  exercise={exercise}
                  exerciseOptions={exerciseOptions}
                  onChange={(updated) =>
                    setExercises((prev) =>
                      prev.map((e) => (e.id === updated.id ? updated : e)),
                    )
                  }
                  onRemove={() =>
                    setExercises((prev) =>
                      prev.filter((e) => e.id !== exercise.id),
                    )
                  }
                />
              ))
            )}

            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={addExercise}
            >
              <Text style={styles.buttonOutlineText}>+ Add exercise</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save workout</Text>
          </TouchableOpacity>
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
    paddingBottom: 100,
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

  workoutHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },

  badge: {
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginTop: 4,
  },

  badgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "capitalize",
  },

  dateText: {
    fontSize: 14,
    color: colors.label,
    marginBottom: 12,
  },

  bioText: {
    fontSize: 15,
    color: colors.primary,
    lineHeight: 21,
    marginBottom: 16,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },

  emptyState: {
    paddingVertical: 24,
    alignItems: "center",
    marginBottom: 16,
  },

  emptyStateText: {
    color: colors.label,
    fontSize: 14,
  },
});
