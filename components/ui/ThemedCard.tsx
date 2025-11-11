import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";

interface ThemedCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function ThemedCard({ children, style }: ThemedCardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface, // ← テーマ依存
          borderColor: colors.border,
          shadowColor: colors.shadow ?? "#000",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});
