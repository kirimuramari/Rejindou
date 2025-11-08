import { Stack } from "expo-router";
import { View, useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import "../global.css";

const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#BB86FC",
    onPrimary: "#000000",
    background: "#121212",
    surface: "#1e1e1e",
  },
};

const CustomLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#6200ee",
    onPrimary: "#ffffff",
    background: "#ffffff",
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? CustomDarkTheme : CustomLightTheme;

  return (
    <PaperProvider theme={theme}>
      <View className="flex-1">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </PaperProvider>
  );
}
