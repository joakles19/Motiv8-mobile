import { supabase } from "@/app/supabase-client";
import ExceriseTracker from "@/components/excersise_tracker/excersise_tracker";
import Homepage from "@/components/homepage/homepage";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const [username, setUsername] = useState("");

  type MenuOption =
    | "menu"
    | "excersiseTracker"
    | "gemini"
    | "leaderboard"
    | "profile"
    | "gymLocator"
    | "faq";

  const [activeMenu, setActiveMenu] = useState<MenuOption>("menu");

  useEffect(() => {
    const getProfile = async () => {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) return;

      const { data } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", userData.user.id)
        .single();

      setUsername(data?.username ?? "");
    };

    getProfile();
  }, []);

  return (
    <View style={styles.container}>
      {activeMenu === "menu" && (
        <View>
          <Text style={styles.greeting}>Hello {username}</Text>
          <Homepage />
        </View>
      )}

      {activeMenu === "excersiseTracker" && <ExceriseTracker />}

      {activeMenu === "gemini" && <Text style={styles.greeting}>Gemini</Text>}

      {activeMenu === "leaderboard" && (
        <Text style={styles.greeting}>Leaderboard</Text>
      )}

      {activeMenu === "profile" && <Text style={styles.greeting}>Profile</Text>}

      {activeMenu === "gymLocator" && (
        <Text style={styles.greeting}>Gym Locator</Text>
      )}

      {activeMenu === "faq" && <Text style={styles.greeting}>FAQ</Text>}

      <View style={styles.menu}>
        <View style={styles.sideGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setActiveMenu("excersiseTracker")}
          >
            <Text style={styles.icon}>🏋️</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setActiveMenu("gemini")}
          >
            <Text style={styles.icon}>🤖</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setActiveMenu("leaderboard")}
          >
            <Text style={styles.icon}>🏆</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.centerLogo}>
          <TouchableOpacity onPress={() => setActiveMenu("menu")}>
            <Image
              source={require("../assets/images/8logo.png")}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.sideGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setActiveMenu("profile")}
          >
            <Text style={styles.icon}>👤</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setActiveMenu("gymLocator")}
          >
            <Text style={styles.icon}>📍</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setActiveMenu("faq")}
          >
            <Text style={styles.icon}>❓</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6eefc",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },

  menu: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    height: 85,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#cfe3f5",
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },

  sideGroup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  centerLogo: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 12,
    color: "#153E75",
    marginTop: 2,
  },

  icon: {
    fontSize: 28,
  },
});
