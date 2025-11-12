import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#6750A4",
    onPrimary: "#FFFFFF",
    secondary: "#625B71",
    background: "white",
    surface: "#FFFFFF",
    text: "#1C1B1F",
    onSurface: "#1C1B1F",
    border: "#CCC",
    card: "#F6F6F6",
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#D0BCFF",
    onPrimary: "#1E1E1E",
    secondary: "#CCC2DC",
    background: "#121212",
    surface: "#1E1E1E",
    text: "white",
    border: "#333",
    onSurface: "#FFFFFF",
    card: "#2C2C2C",
  },
};
