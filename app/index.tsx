import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>レジン道データベース</Text>
      <View style={styles.grid}>
        <Link href="/list" asChild>
          <TouchableOpacity style={styles.button}>
            <FontAwesome5 name="list" size={24} color="#fff" />
            <Text style={styles.buttonText}>一覧</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/set-price" asChild>
          <TouchableOpacity style={styles.button}>
            <FontAwesome5 name="tags" size={24} color="#fff" />
            <Text style={styles.buttonText}>セット価格</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/search" asChild>
          <TouchableOpacity style={styles.button}>
            <FontAwesome5 name="search" size={24} color="#fff" />
            <Text style={styles.buttonText}>検索</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/purchased" asChild>
          <TouchableOpacity style={styles.button}>
            <FontAwesome5 name="shopping-cart" size={24} color="#fff" />
            <Text style={styles.buttonText}>購入済み</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "fff",
    padding: 16,
  },
  title: {
    fontSize: 28,
    marginBottom: 40,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  button: {
    backgroundColor: "#3b82f6",
    width: 140,
    height: 100,
    borderRadius: 12,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
