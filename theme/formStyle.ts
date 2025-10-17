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
    color: "#747575",
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  loadingForm: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nameSearch: {
    width: isDesktop ? 200 : "50%",
    padding: 8,
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#3b82f6",
    width: isDesktop ? 200 : "50%",
    height: 50,
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
  indexButton: {
    backgroundColor: "#3b82f6",
    width: isDesktop ? 200 : "45%",
    height: isDesktop ? 200 : "45%",
    borderRadius: 12,
    margin: isDesktop ? 0 : 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
