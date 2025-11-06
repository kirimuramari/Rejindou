import { supabase } from "@/lib/supabaseClient";
import { Link } from "expo-router";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, Card, DataTable } from "react-native-paper";

type Item = {
  番号: number;
  "カラーNo.": number;
  商品名: string;
  値段: string;
  シリーズ: string;
  備考: string;
};
const Page_size = 50;

export default function List() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [item, setItem] = useState<Item[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const from = page * Page_size;
      const to = from + Page_size - 1;

      const { data, error, count } = await supabase
        .from("Rejindou_Master")
        .select("*", { count: "exact" })
        .order("番号", { ascending: true })
        .range(from, to);

      if (error) {
        console.error("エラー:", error);
        setError("データの取得に失敗しました。");
        setItem([]);
        setHasMore(false);
      } else {
        setItem(data ?? []);
        setHasMore((count ?? 0) > to + 1);
        setError(null);
        console.log(count);
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);
  const handleNext = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

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
  if (error) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red" }}>エラー:{error}</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 min-h-screen bg-background">
      <View className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <View className="flexgrow">
          <View className="container mx-auto px-4 py-6">
            <View className="flex items-left">
              <Link
                href="/"
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
              <Text className="text-2xl font-bold tracking-tight text-foreground">
                データ一覧
              </Text>
              <Text className="text-sm text-muted-foreground mt-1">
                すべてのデータを表示
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-grow">
        <Card className="border-border/50 bg-card">
          <DataTable className="p-4 border-border/40 bg-card rounded-xl">
            <DataTable.Header className="flex-row border-b border-border/30 pb-2 mb-2">
              <DataTable.Title className="w-[15%] font-semibold text-foreground">
                番号
              </DataTable.Title>
              <DataTable.Title className="w-[40%] font-semibold text-foreground">
                商品名
              </DataTable.Title>
              <DataTable.Title className="w-[20%] font-semibold text-foreground">
                値段
              </DataTable.Title>
              <DataTable.Title className="w-[25%] font-semibold text-foreground">
                シリーズ
              </DataTable.Title>
            </DataTable.Header>

            {item.map((item, index) => (
              <DataTable.Row
                key={item.番号}
                style={{
                  flexDirection: "row",
                  paddingVertical: 8,
                  paddingHorizontal: 4,
                  backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff",
                }}
              >
                <DataTable.Cell className="w-[15%] text-foreground">
                  {item.番号}
                </DataTable.Cell>
                <DataTable.Cell className="w-[40%] text-muted-foreground">
                  {item.商品名}
                </DataTable.Cell>
                <DataTable.Cell className="w-[20%] text-muted-foreground">
                  ¥{item.値段}
                </DataTable.Cell>
                <DataTable.Cell className="w-[25%] text-muted-foreground">
                  {item.シリーズ}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card>

        <View className="mt-6 flex-row justify-between items-center">
          <Button onPress={handlePrev} disabled={page === 0} className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            前のページ
          </Button>
          <Text className="text-sm text-muted-foreground">
            ページ {page + 1} / {Math.ceil(totalCount / Page_size)}
          </Text>
          <Button onPress={handleNext} disabled={!hasMore} className="gap-2">
            <ChevronRight className="w-4 h-4" />
            次のページ
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
