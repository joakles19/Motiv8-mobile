import { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { LoginForm, SignupForm } from "../components/AuthForms";

export default function Index() {
  const [signUpBool, setSignUpBool] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("../assets/images/motiv8Logo.png")}
          style={styles.image}
          resizeMode="contain"
        />

        {signUpBool ? <SignupForm /> : <LoginForm />}

        <TouchableOpacity onPress={() => setSignUpBool((prev) => !prev)}>
          <Text style={styles.switchText}>
            {signUpBool
              ? "Already have an account? Log in here"
              : "Don't have an account? Sign up here"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6eefc",
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  image: {
    width: Dimensions.get("window").width * 0.9,
    height: 140,
    marginBottom: 10,
  },

  switchText: {
    color: "#153E75",
    margin: 16,
    fontSize: 14,
    fontWeight: "500",
  },
});
