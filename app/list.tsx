import { ListStatus } from "@/components/ListStatus";
import { TableView } from "@/components/TableView";
import { supabase } from "@/lib/supabaseClient";
import { Item } from "@/types/types";
import { Link } from "expo-router";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
const Page_size = 50;

export default function List() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [item, setItem] = useState<Item[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);

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

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ListStatus
        loading={loading}
        error={error}
        hasData={!!item && item.length > 0}
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
                データ一覧
              </Text>
              <Text className="text-sm text-muted-foreground mt-1">
                すべてのデータを表示
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* テーブル表示 */}
      <TableView<Item>
        data={item}
        columns={columns}
        rowKey={(row) => row.番号}
      />

      <View className="mt-6 mb-6 flex-row justify-between items-center">
        <Button
          mode="contained"
          onPress={handlePrev}
          disabled={page === 0}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          前のページ
        </Button>
        <Text className="text-sm text-muted-foreground">
          ページ {page + 1} / {Math.ceil(totalCount / Page_size)}
        </Text>
        <Button
          onPress={handleNext}
          disabled={!hasMore}
          mode="contained"
          className="gap-2"
        >
          <ChevronRight className="w-4 h-4" />
          次のページ
        </Button>
      </View>
    </View>
  );
}
