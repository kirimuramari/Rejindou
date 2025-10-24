import { formStyle } from "@/theme/formStyle";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className={formStyle.container}>
        <Text className={formStyle.title}>レジン道データベース</Text>
        <View className={formStyle.grid}>
          <Link href="/list" asChild>
            <TouchableOpacity className={formStyle.indexButton}>
              <FontAwesome5 name="list" size={24} color="#fff" />
              <Text className={formStyle.buttonText}>一覧</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/set-price" asChild>
            <TouchableOpacity className={formStyle.indexButton}>
              <FontAwesome5 name="tags" size={24} color="#fff" />
              <Text className={formStyle.buttonText}>セット価格</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/search" asChild>
            <TouchableOpacity className={formStyle.indexButton}>
              <FontAwesome5 name="search" size={24} color="#fff" />
              <Text className={formStyle.buttonText}>検索</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/purchased" asChild>
            <TouchableOpacity className={formStyle.indexButton}>
              <FontAwesome5 name="shopping-cart" size={24} color="#fff" />
              <Text className={formStyle.buttonText}>購入済み</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
