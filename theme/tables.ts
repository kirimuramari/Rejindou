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
    color: "434656",
    textAlign: "left",

    ...(isDesktop && {
      fontSize: 18,
      borderWidth: 1,
      bordercolor: "#ccc",
      padding: 8,
    }),
  },
  dataRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    ...(isDesktop && {
      paddingHorizontal: 10,
    }),
  },
  dataCell: {
    flex: 1,
    width: "auto",
    marginLeft: 20,
    textAlign: "left",
    paddingVertical: 6,
    fontSize: 13,
    color: "#747575",
    ...(isDesktop && {
      fontSize: 16,
      padding: 8,
    }),
  },
});
