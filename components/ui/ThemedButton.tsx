import { Button, useTheme } from "react-native-paper";

export const ThemedButton = ({ children, mode = "contained", ...props }) => {
  const { colors } = useTheme();

  const backgroundColor = mode === "contained" ? colors.primary : "transparent";
  const textColor = mode === "contained" ? colors.onPrimary : colors.primary;
  return (
    <Button
      {...props}
      mode={mode}
      style={[
        { backgroundColor, borderRadius: 8, paddingVertical: 4 },
        props.style,
      ]}
      labelStyle={[
        { color: textColor, fontSize: 16, fontWeight: "600" },
        props.labelStyle,
      ]}
      contentStyle={{ height: 48 }}
    >
      {children}
    </Button>
  );
};
