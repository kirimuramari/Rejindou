import { Link } from "expo-router";
import { List, Search, ShoppingCart, Tag } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Card } from "react-native-paper";

export default function HomeScreen() {
  const navigationItems = [
    {
      title: "一覧",
      description: "すべてのデータを閲覧",
      icon: List,
      href: "/list",
    },
    {
      title: "セット価格一覧",
      description: "セット商品のデータを閲覧",
      icon: Tag,
      href: "/set-price",
    },
    {
      title: "検索",
      description: "データの検索",
      icon: Search,
      href: "/search",
    },
    {
      title: "購入済み商品の閲覧",
      description: "購入済み商品の閲覧",
      icon: ShoppingCart,
      href: "/purchased",
    },
  ];

  return (
    <SafeAreaProvider>
      <ScrollView className="flex-1 bg-white">
        <View className="px-4 py-6">
          <Text className="text-2xl font-bold mb-2 text-gray-700">
            レジン道データベース
          </Text>
          <Text className="text-sm text-gray-500 mb-6">
            レジン道商品のミラーパウダーのコレクションを管理
          </Text>

          <View className="flex flex-row flex-wrap -mx-2">
            {navigationItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <View key={idx} className="w-1/2 px-2 mb-4">
                  <Link href={item.href as any} asChild>
                    <TouchableOpacity activeOpacity={0.8}>
                      <Card className=" flex-row items-center p-4 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm">
                        <View className="w-12 h-12 rounded-xl bg-blue-100 items-center justify-center mr-4">
                          <Icon size={24} color="#2563eb" />
                        </View>
                        <View className="flex-1">
                          <Text className="text-lg font-semibold text-gray-800">
                            {item.title}
                          </Text>
                          <Text className="text-sm text-gray-500">
                            {item.description}
                          </Text>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  </Link>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
