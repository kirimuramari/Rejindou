import { Dimensions, Platform, StyleSheet } from "react-native";

const isWeb = Platform.OS === "web";
const isDesktop = isWeb && Dimensions.get("window").width >= 1024;

export const formStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: isDesktop ? 18 : 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  button: {
    backgroundColor: "#3b82f6",
    width: isDesktop ? 140 : "100%",
    height: 100,
    borderRadius: 12,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: isDesktop ? 14 : 16,
    textAlign: "center",
  },
});
