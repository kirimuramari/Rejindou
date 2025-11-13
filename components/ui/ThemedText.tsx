import { Text } from "react-native";

export const ThemedText = ({ children, variant = "body" }) => {
  const fontSize = variant === "title" ? 18 : 14;
  const fontWeight = variant === "title" ? "600" : "400";
  return <Text style={{ fontSize, fontWeight }}>{children}</Text>;
};
