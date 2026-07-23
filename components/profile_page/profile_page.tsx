import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfilePage() {
  const [profileBool, setProfileBool] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.avatarSection}>
        <TouchableOpacity style={styles.avatarWrapper}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
            }}
            style={styles.avatar}
          />
          <View style={styles.avatarEditBadge}>
            <Text style={styles.avatarEditText}>✎</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.avatarHint}>Tap to change photo</Text>
      </View>

      <View style={styles.segmentWrapper}>
        <TouchableOpacity
          style={[styles.segment, profileBool && styles.segmentActive]}
          onPress={() => setProfileBool(true)}
        >
          <Text
            style={[
              styles.segmentText,
              profileBool && styles.segmentTextActive,
            ]}
          >
            User profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segment, !profileBool && styles.segmentActive]}
          onPress={() => setProfileBool(false)}
        >
          <Text
            style={[
              styles.segmentText,
              !profileBool && styles.segmentTextActive,
            ]}
          >
            Fitness profile
          </Text>
        </TouchableOpacity>
      </View>

      {profileBool ? (
        <View style={styles.card}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Your username"
              placeholderTextColor="#9AAAB8"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor="#9AAAB8"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput
              style={styles.input}
              placeholder="+44 7000 000000"
              placeholderTextColor="#9AAAB8"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.privacyRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Private account</Text>
              <Text style={styles.privacyHint}>
                Only friends can see your activity
              </Text>
            </View>
            <Switch
              value={privateAccount}
              onValueChange={setPrivateAccount}
              trackColor={{ false: "#D7E3EE", true: "#153E75" }}
              thumbColor="#fff"
            />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save changes</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 178"
              placeholderTextColor="#9AAAB8"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 75"
              placeholderTextColor="#9AAAB8"
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save changes</Text>
          </TouchableOpacity>
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
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  avatarSection: {
    alignItems: "center",
    marginBottom: 24,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: colors.surface,
    shadowColor: "#0F2A4D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  avatarEditBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },

  avatarEditText: {
    color: "#fff",
    fontSize: 12,
  },

  avatarHint: {
    marginTop: 10,
    fontSize: 13,
    color: colors.label,
  },

  segmentWrapper: {
    flexDirection: "row",
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 4,
    marginBottom: 20,
  },

  segment: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: "center",
  },

  segmentActive: {
    backgroundColor: colors.primary,
  },

  segmentText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.label,
  },

  segmentTextActive: {
    color: "#fff",
  },

  card: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: "#0F2A4D",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
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

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },

  privacyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  privacyHint: {
    fontSize: 13,
    color: colors.label,
    marginTop: 2,
  },

  button: {
    width: "100%",
    backgroundColor: colors.primary,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
