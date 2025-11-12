"use client";
import { darkTheme, lightTheme } from "@/src/theme/theme";
import React from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};
