import { Dimensions, Platform, StyleSheet } from "react-native";

const isWeb = Platform.OS === "web";
const isDesktop = isWeb && Dimensions.get("window").width >= 1024;
export const tables = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 5,
    ...(isDesktop && {
      paddingHorizontal: 10,
      fontSize: 18,
      paddingTop: 18,
    }),
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 5,
  },
  dataCell: {
    flex: 1,
  },
});
