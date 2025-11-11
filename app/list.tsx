import ThemedCard from "@/components/ui/ThemedCard";
import { supabase } from "@/lib/supabaseClient";
import { Item } from "@/types/types";
import { Link } from "expo-router";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, DataTable, Text, useTheme } from "react-native-paper";
const Page_size = 50;

export default function List() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [item, setItem] = useState<Item[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const { colors, dark } = useTheme();

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
    <View style={{ flex: 1, backgroundColor: colors.background }}>
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
              <Text
                className="text-2xl font-bold tracking-tight text-foreground"
                style={{ color: colors.onSurface }}
              >
                データ一覧
              </Text>
              <Text
                className="text-sm text-muted-foreground mt-1"
                style={{ color: colors.onSurfaceVariant }}
              >
                すべてのデータを表示
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-grow">
        <ThemedCard>
          <DataTable className="p-4 border-border/40 bg-card rounded-xl">
            <DataTable.Header className="flex-row border-b border-border/30 pb-2 mb-2">
              <DataTable.Title
                className="w-[15%] font-semibold text-foreground"
                textStyle={{ color: colors.onSurface }}
              >
                番号
              </DataTable.Title>
              <DataTable.Title
                className="w-[40%] font-semibold text-foreground"
                textStyle={{ color: colors.onSurface }}
              >
                商品名
              </DataTable.Title>
              <DataTable.Title
                className="w-[20%] font-semibold text-foreground"
                textStyle={{ color: colors.onSurface }}
              >
                値段
              </DataTable.Title>
              <DataTable.Title
                className="w-[25%] font-semibold text-foreground"
                textStyle={{ color: colors.onSurface }}
              >
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
                  backgroundColor:
                    index % 2 === 0
                      ? dark
                        ? "#2C2C2C"
                        : "#F9F9F9"
                      : colors.surface,
                }}
              >
                <DataTable.Cell
                  className="w-[15%] text-foreground"
                  textStyle={{ color: colors.onSurface }}
                >
                  {item.番号}
                </DataTable.Cell>
                <DataTable.Cell
                  className="w-[40%] text-muted-foreground"
                  textStyle={{ color: colors.onSurface }}
                >
                  {item.商品名}
                </DataTable.Cell>
                <DataTable.Cell
                  className="w-[20%] text-muted-foreground"
                  textStyle={{ color: colors.onSurface }}
                >
                  ¥{item.値段}
                </DataTable.Cell>
                <DataTable.Cell
                  className="w-[25%] text-muted-foreground"
                  textStyle={{ color: colors.onSurface }}
                >
                  {item.シリーズ}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </ThemedCard>

        <View className="mb-6 flex-row justify-between items-center">
          <Button
            mode="contained"
            onPress={handlePrev}
            disabled={page === 0}
            className="gap-2"
            buttonColor={colors.primary}
          >
            <ChevronLeft className="w-4 h-4" />
            前のページ
          </Button>
          <Text
            className="text-sm text-muted-foreground"
            style={{ color: colors.onSurfaceVariant }}
          >
            ページ {page + 1} / {Math.ceil(totalCount / Page_size)}
          </Text>
          <Button
            onPress={handleNext}
            disabled={!hasMore}
            mode="contained"
            className="gap-2"
            buttonColor={colors.primary}
          >
            <ChevronRight className="w-4 h-4" />
            <Text
              className="text-sm text-muted-foreground"
              style={{ color: colors.onSurfaceVariant }}
            >
              次のページ
            </Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
