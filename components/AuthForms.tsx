import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const colors = {
  primary: "#153E75",
  surface: "#FFFFFF",
  border: "#D7E3EE",
  inputBg: "#F7FAFC",
  muted: "#6B7280",
  placeholder: "#9CA8B8",
  error: "#D64545",
};

export function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSignup = () => {
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setSubmitting(true);
    console.log("Username:", username, "Email:", email);
    // TODO: call your signup API here
    setSubmitting(false);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Create your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={colors.placeholder}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoComplete="username"
        textContentType="username"
      />

      <TextInput
        style={styles.input}
        placeholder="Email address"
        placeholderTextColor={colors.placeholder}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.placeholder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        textContentType="newPassword"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        placeholderTextColor={colors.placeholder}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        textContentType="newPassword"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.button, submitting && styles.buttonDisabled]}
        onPress={handleSignup}
        activeOpacity={0.8}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign up</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      setError("Please enter a valid username and password");
      return;
    }
    setError("");
    // TODO: call your login API here
  };

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Welcome back</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={colors.placeholder}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoComplete="username"
        textContentType="username"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.placeholder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        textContentType="password"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#0F2A4D",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },

  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 18,
    alignSelf: "flex-start",
  },

  input: {
    width: "100%",
    height: 46,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: colors.inputBg,
    fontSize: 15,
    color: "#1F2937",
  },

  button: {
    width: "100%",
    marginTop: 8,
    backgroundColor: colors.primary,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  error: {
    color: colors.error,
    fontSize: 13,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
});
