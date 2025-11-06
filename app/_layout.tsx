import { Stack } from "expo-router";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";
import "../global.css";

export default function RootLayout() {
  return (
    <PaperProvider>
      <View className="flex-1">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </PaperProvider>
  );
}
