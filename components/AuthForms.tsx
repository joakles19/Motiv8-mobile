import { supabase } from "@/app/supabase-client";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSignup = async () => {
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

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      setError(signupError.message);
      setSubmitting(false);
      return;
    }

    const user = data.user;

    if (user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          username,
        },
      ]);

      if (profileError) {
        setError(profileError.message);
        setSubmitting(false);
        return;
      }
    }

    setSubmitting(false);

    router.replace("/home");
  };

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Create your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor={"#3c4a5f"}
      />

      <TextInput
        style={styles.input}
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={"#3c4a5f"}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={"#3c4a5f"}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor={"#3c4a5f"}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setError("");
    setSubmitting(true);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setSubmitting(false);

    if (loginError) {
      setError(loginError.message);
      return;
    }

    router.replace("/home");
  };

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Welcome back</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={"#3c4a5f"}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={"#3c4a5f"}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Log in</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const colors = {
  primary: "#153E75",
  surface: "#FFFFFF",
  border: "#D7E3EE",
  inputBg: "#F7FAFC",
  error: "#D64545",
};

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
  },

  button: {
    width: "100%",
    marginTop: 8,
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

  error: {
    color: colors.error,
    fontSize: 13,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
});
