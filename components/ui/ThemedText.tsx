import { Text } from "react-native";
import { useTheme } from "react-native-paper";

export const ThemedText = ({ children, variant = "body" }) => {
  const { colors } = useTheme();

  const fontSize = variant === "title" ? 18 : 14;
  const fontWeight = variant === "title" ? "600" : "400";
  return (
    <Text style={{ color: colors.onSurface, fontSize, fontWeight }}>
      {children}
    </Text>
  );
};
