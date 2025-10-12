import { formStyle } from "@/theme/formStyle";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={formStyle.container}>
      <Text style={formStyle.title}>レジン道データベース</Text>
      <View style={formStyle.grid}>
        <Link href="/list" asChild>
          <TouchableOpacity style={formStyle.button}>
            <FontAwesome5 name="list" size={24} color="#fff" />
            <Text style={formStyle.buttonText}>一覧</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/set-price" asChild>
          <TouchableOpacity style={formStyle.button}>
            <FontAwesome5 name="tags" size={24} color="#fff" />
            <Text style={formStyle.buttonText}>セット価格</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/search" asChild>
          <TouchableOpacity style={formStyle.button}>
            <FontAwesome5 name="search" size={24} color="#fff" />
            <Text style={formStyle.buttonText}>検索</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/purchased" asChild>
          <TouchableOpacity style={formStyle.button}>
            <FontAwesome5 name="shopping-cart" size={24} color="#fff" />
            <Text style={formStyle.buttonText}>購入済み</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
