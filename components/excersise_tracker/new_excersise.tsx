import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Dropdown from "../dropdown";

type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
};

type ExerciseOption = {
  label: string;
  value: string;
};

type Props = {
  exercise: Exercise;
  exerciseOptions: ExerciseOption[];
  onChange: (updated: Exercise) => void;
  onRemove: () => void;
};

export default function NewExercise({
  exercise,
  exerciseOptions,
  onChange,
  onRemove,
}: Props) {
  return (
    <View style={styles.card}>
      <Dropdown
        label="Exercise"
        placeholder="Select an exercise"
        options={exerciseOptions}
        selectedValue={exercise.name}
        onValueChange={(value) => onChange({ ...exercise, name: value })}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.small]}
          keyboardType="numeric"
          value={String(exercise.sets)}
          onChangeText={(text) =>
            onChange({ ...exercise, sets: Number(text) || 0 })
          }
        />
        <Text> sets × </Text>
        <TextInput
          style={[styles.input, styles.small]}
          keyboardType="numeric"
          value={String(exercise.reps)}
          onChangeText={(text) =>
            onChange({ ...exercise, reps: Number(text) || 0 })
          }
        />
        <Text> reps</Text>
      </View>

      <TouchableOpacity onPress={onRemove}>
        <Text style={{ color: "red" }}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#F7FAFC",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D7E3EE",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  row: { flexDirection: "row", alignItems: "center" },
  small: { width: 50, textAlign: "center" },
});
