import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { LoginForm, SignupForm } from "../components/AuthForms";
import { supabase } from "./supabase-client";

export default function Index() {
  const [signUpBool, setSignUpBool] = useState(false);
  const [session, setSession] = useState<any>(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log(currentSession);
    setSession(currentSession.data);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6eefc",
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
