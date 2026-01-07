import { ListStatus } from "@/components/ListStatus";
import { TableView } from "@/components/TableView";
import { supabase } from "@/lib/supabaseClient";
import { Item } from "@/types/types";
import { Link } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Purchased() {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns = [
    { title: "番号", key: "番号", width: "15%" },
    { title: "商品名", key: "商品名", width: "40%" },
    {
      title: "値段",
      key: "値段",
      width: "20%",
      render: (v: Item[keyof Item], _row: Item) => `¥${v}`,
    },
    { title: "シリーズ", key: "シリーズ", width: "25%" },
  ] as const;

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("Rejindou_Master")
        .select("*")
        .eq("購入済み", true)
        .order("番号", { ascending: true });
      if (error) {
        console.error("Supabaseエラー:", error);
        setError("データの取得に失敗しました。");
      } else {
        setData(data || []);
        setError(null);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffffff" }}>
      <ListStatus
        loading={loading}
        error={error}
        hasData={!!data && data.length > 0}
        emptyMessage="データがありません。"
      />
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
                購入済み商品一覧
              </Text>
              <Text className="text-sm text-muted-foreground mt-1">
                購入済み商品の閲覧
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* テーブル */}
      <TableView<Item>
        data={data}
        columns={columns}
        rowKey={(row) => row.番号}
      />
    </View>
  );
}
