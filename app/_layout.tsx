import { Stack } from "expo-router";
import { View } from "react-native";
export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      <Stack options={{ headerShown: false }} />
    </View>
  );
}
