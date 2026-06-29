import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  const { username } = useLocalSearchParams();

  return (
    <View>
      <Text>Hello {username}</Text>
    </View>
  );
}
