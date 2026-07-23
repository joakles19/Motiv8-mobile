import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type RecentWorkout = {
  id: string;
  name: string;
  type: string;
  date: string;
};

type Props = {
  streak?: number;
  workoutsThisWeek?: number;
  weeklyGoal?: number;
  recentWorkouts?: RecentWorkout[];
  onStartWorkout?: () => void;
  onViewWorkout?: (id: string) => void;
  onViewAllWorkouts?: () => void;
};

export default function Homepage({
  streak = 0,
  workoutsThisWeek = 0,
  weeklyGoal = 4,
  recentWorkouts = [],
  onStartWorkout,
  onViewWorkout,
  onViewAllWorkouts,
}: Props) {
  const progress = Math.min(workoutsThisWeek / weeklyGoal, 1);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Quick start */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ready to train?</Text>
        <Text style={styles.cardSubtitle}>
          Start logging a new workout right now.
        </Text>
        <TouchableOpacity style={styles.button} onPress={onStartWorkout}>
          <Text style={styles.buttonText}>Start a workout</Text>
        </TouchableOpacity>
      </View>

      {/* Stats & streak */}
      <View style={styles.statsRow}>
        <View style={[styles.card, styles.statCard]}>
          <Text style={styles.statValue}>{streak}</Text>
          <Text style={styles.statLabel}>Day streak 🔥</Text>
        </View>

        <View style={[styles.card, styles.statCard]}>
          <Text style={styles.statValue}>
            {workoutsThisWeek}/{weeklyGoal}
          </Text>
          <Text style={styles.statLabel}>This week</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Weekly goal progress</Text>
        <View style={styles.progressTrack}>
          <View
            style={[styles.progressFill, { width: `${progress * 100}%` }]}
          />
        </View>
      </View>

      {/* Recent activity */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.subheading}>Recent activity</Text>
        {recentWorkouts.length > 0 && (
          <TouchableOpacity onPress={onViewAllWorkouts}>
            <Text style={styles.linkText}>View all</Text>
          </TouchableOpacity>
        )}
      </View>

      {recentWorkouts.length === 0 ? (
        <View style={styles.card}>
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No workouts logged yet — get started above!
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.card}>
          {recentWorkouts.map((workout, index) => (
            <TouchableOpacity
              key={workout.id}
              style={[
                styles.workoutRow,
                index !== recentWorkouts.length - 1 && styles.workoutRowDivider,
              ]}
              onPress={() => onViewWorkout?.(workout.id)}
            >
              <View>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <Text style={styles.workoutDate}>{workout.date}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{workout.type}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const colors = {
  primary: "#153E75",
  surface: "#FFFFFF",
  border: "#D7E3EE",
  inputBg: "#F7FAFC",
  label: "#4A5D73",
  accent: "#3AA6FF",
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100,
  },

  card: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#0F2A4D",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 4,
  },

  cardSubtitle: {
    fontSize: 14,
    color: colors.label,
    marginBottom: 16,
  },

  button: {
    width: "100%",
    backgroundColor: colors.primary,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
  },

  statCard: {
    flex: 1,
    alignItems: "center",
    marginBottom: 16,
  },

  statValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.primary,
  },

  statLabel: {
    fontSize: 13,
    color: colors.label,
    marginTop: 4,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.label,
    marginBottom: 10,
  },

  progressTrack: {
    width: "100%",
    height: 10,
    borderRadius: 6,
    backgroundColor: colors.inputBg,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 6,
    backgroundColor: colors.accent,
  },

  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  subheading: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
  },

  linkText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.accent,
  },

  emptyState: {
    paddingVertical: 24,
    alignItems: "center",
  },

  emptyStateText: {
    color: colors.label,
    fontSize: 14,
    textAlign: "center",
  },

  workoutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },

  workoutRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  workoutName: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
  },

  workoutDate: {
    fontSize: 13,
    color: colors.label,
    marginTop: 2,
  },

  badge: {
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  badgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});
