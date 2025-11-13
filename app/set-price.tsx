import { Item } from "@/types/types";
import { Link } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Card, DataTable } from "react-native-paper";
import { supabase } from "../lib/supabaseClient";

export default function Set_Price() {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("Rejindou_Set_Price")
        .select("*");
      if (error) {
        console.error("Supabaseエラー:", error);
      } else {
        setData(data || []);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View className="flex justify-center items-center min-h-screen">
        <View
          className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full"
          style={{ borderTopColor: "transparent" }}
        ></View>
      </View>
    );
  }
  if (data.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <Text>データが存在しません。</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffffff" }}>
      <View className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <View className="flexgrow">
          <View className="container mx-auto px-4 py-10">
            <View className="flex items-left">
              <Link
                href="/"
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
              <Text className="text-2xl font-bold tracking-tight text-foreground">
                セット商品一覧
              </Text>
              <Text className="text-sm text-muted-foreground mt-1">
                セット商品のデータを表示
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-grow">
        <Card className="border-border/50 bg-card">
          <DataTable className="border-borer-40 bg-card rounded-xl">
            <DataTable.Header className="flex-row border-b border-border/30 pb-2 mb-2">
              <DataTable.Title className="w-[15%] font-semibold text-foreground">
                番号
              </DataTable.Title>
              <DataTable.Title className="w-[15%] font-semibold text-foreground">
                シリーズ
              </DataTable.Title>
              <DataTable.Title className="w-[15%] font-semibold text-foreground">
                セット価格
              </DataTable.Title>
            </DataTable.Header>

            {data.map((item, index) => (
              <DataTable.Row
                key={item.番号}
                style={{
                  flexDirection: "row",
                }}
              >
                <DataTable.Cell className="w-[15%] text-foreground">
                  {item.番号}
                </DataTable.Cell>
                <DataTable.Cell className="w-[40%] text-muted-foreground">
                  {item.シリーズ}
                </DataTable.Cell>
                <DataTable.Cell className="w-[20%] text-muted-foreground">
                  {" "}
                  ¥{item.セット価格}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card>
      </ScrollView>
    </View>
  );
}
