import { Link } from "expo-router";
import { List, Search, ShoppingCart, Tag } from "lucide-react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import ThemedCard from "../components/ui/ThemedCard";

export default function HomeScreen() {
  const { colors, dark } = useTheme();

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
      title: "検索・編集",
      description: "データの検索および編集",
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
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="px-4 py-6">
        <Text className="text-2xl font-bold my-2">レジン道データベース</Text>
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
                    <ThemedCard
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 16,
                      }}
                    >
                      <View
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          backgroundColor:
                            colors.secondaryContainer ??
                            (dark ? "#2E3A59" : "#E0E7FF"),
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 12,
                        }}
                      >
                        <Icon size={24} color={colors.primary} />
                      </View>
                      <View className="flex-1">
                        <Text
                          variant="titleMedium"
                          style={{
                            color: colors.onSurface,
                            fontWeight: "600",
                          }}
                        >
                          {item.title}
                        </Text>
                        <Text
                          variant="bodySmall"
                          style={{ color: colors.onSurface }}
                        >
                          {item.description}
                        </Text>
                      </View>
                    </ThemedCard>
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
