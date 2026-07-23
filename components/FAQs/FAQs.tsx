import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    id: "1",
    question: "How do I log a new workout?",
    answer:
      "Head to the Exercise Tracker tab, tap 'Start a new workout', fill in the workout name and type, then add exercises as you go.",
  },
  {
    id: "2",
    question: "Can I edit a workout after saving it?",
    answer:
      "Yes — open the workout from your recent activity list and you'll be able to update sets, reps, or exercises.",
  },
  {
    id: "3",
    question: "How is my streak calculated?",
    answer:
      "Your streak counts consecutive days you've logged at least one workout. Missing a day resets it back to zero.",
  },
  {
    id: "4",
    question: "Is my data private?",
    answer:
      "By default, only you can see your workouts and stats. You can enable a private account in your profile settings for extra control.",
  },
  {
    id: "5",
    question: "Can I add friends?",
    answer:
      "Yes — go to the home menu and tap 'Add a new friend' to connect with other users.",
  },
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>FAQs</Text>
      <Text style={styles.subheading}>
        Answers to common questions about Motiv8
      </Text>

      <View style={styles.card}>
        {faqs.map((item, index) => {
          const isOpen = openId === item.id;
          return (
            <View
              key={item.id}
              style={[
                styles.item,
                index !== faqs.length - 1 && styles.itemDivider,
              ]}
            >
              <TouchableOpacity
                style={styles.questionRow}
                onPress={() => toggleItem(item.id)}
              >
                <Text style={styles.questionText}>{item.question}</Text>
                <Text style={styles.chevron}>{isOpen ? "−" : "+"}</Text>
              </TouchableOpacity>

              {isOpen && <Text style={styles.answerText}>{item.answer}</Text>}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const colors = {
  primary: "#153E75",
  surface: "#FFFFFF",
  border: "#D7E3EE",
  label: "#4A5D73",
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },

  subheading: {
    fontSize: 14,
    color: colors.label,
    marginBottom: 20,
  },

  card: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    shadowColor: "#0F2A4D",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },

  item: {
    paddingVertical: 14,
  },

  itemDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  questionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
    paddingRight: 12,
  },

  chevron: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    width: 20,
    textAlign: "center",
  },

  answerText: {
    fontSize: 14,
    color: colors.label,
    lineHeight: 20,
    marginTop: 8,
  },
});
