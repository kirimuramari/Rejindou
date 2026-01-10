"use client";
import { Link } from "expo-router";
import { List, Search, ShoppingCart, Tag } from "lucide-react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-paper";

export const dynamic = "force-dynamic";

export default function HomeScreen() {
  const navigationItems = [
    {
      title: "一覧",
      description: "すべてのデータを閲覧",
      icon: List,
      href: "/list",
      group: "main",
      primary: true,
    },
    {
      title: "検索・編集",
      description: "データの検索および編集",
      icon: Search,
      href: "/search",
      group: "main",
      primary: true,
    },
    {
      title: "セット価格一覧",
      description: "セット商品のデータを閲覧",
      icon: Tag,
      href: "/set-price",
      group: "manage",
    },
    {
      title: "購入済み商品",
      description: "購入済み商品の閲覧",
      icon: ShoppingCart,
      href: "/purchased",
      group: "manage",
    },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#ffffffff" }}>
      <View className="px-4 py-6">
        <Text className="text-2xl font-bold my-2">レジン道データベース</Text>
        <Text className="text-sm text-gray-500 mb-6">
          レジン道商品のミラーパウダーのコレクションを管理
        </Text>
        <Text className="text-sm font-semibold text-gray-600 mb-3">
          データ閲覧・編集
        </Text>
        <View className="flex flex-row flex-wrap -mx-2 mb-6">
          {navigationItems
            .filter((item) => item.group === "main")
            .map((item, idx) => {
              const Icon = item.icon;
              return (
                <View key={idx} className="w-1/2 px-2 mb-4 items-center">
                  <Link href={item.href as any} asChild>
                    <TouchableOpacity activeOpacity={0.85}>
                      <Card
                        className={`flex-row items-center px-5 py-5 rounded-2xl max-w-[280px] w-full
                      ${
                        item.primary
                          ? "bg-violet-50 border-violet-300"
                          : "bg-gray-50 border-gray-200"
                      }
                      border shadow-sm`}
                      >
                        <View
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 12,
                            backgroundColor: item.primary
                              ? "#ede9fe"
                              : "#f3f4f6",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 14,
                          }}
                        >
                          <Icon size={24} />
                        </View>
                        <View className="flex-1">
                          <Text variant="titleMedium">{item.title}</Text>
                          <Text variant="bodySmall">{item.description}</Text>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  </Link>
                </View>
              );
            })}
        </View>
        <Text className="text-sm font-semibold text-gray-600 mb-3">
          管理・ステータス
        </Text>
        <View className="flex flex-row flex-wrap -mx-2">
          {navigationItems
            .filter((item) => item.group === "manage")
            .map((item, idx) => {
              const Icon = item.icon;
              return (
                <View key={idx} className="w-1/2 px-2 mb-4  items-center">
                  <Link href={item.href as any} asChild>
                    <TouchableOpacity activeOpacity={0.85}>
                      <Card className="flex-row items-center px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 shadow-sm max-w-[260px] w-full">
                        <View
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            backgroundColor: "#f3f4f6",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 10,
                          }}
                        >
                          <Icon size={22} />
                        </View>
                        <View className="flex-1">
                          <Text variant="titleSmall">{item.title}</Text>
                          <Text variant="bodySmall">{item.description}</Text>
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
  );
}
