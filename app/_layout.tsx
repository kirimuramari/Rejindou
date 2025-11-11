import { darkTheme, lightTheme } from "@/src/theme/theme";
import { Stack } from "expo-router";
import { View, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import "../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
      <View
        style={{
          flex: 1,
          backgroundColor:
            colorScheme === "dark"
              ? darkTheme.colors.background
              : lightTheme.colors.background,
        }}
      >
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </PaperProvider>
  );
}
