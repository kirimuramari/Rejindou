import { supabase } from "@/lib/supabaseClient";
import { formStyle } from "@/theme/formStyle";
import { tables } from "@/theme/tables";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
      <View style={formStyle.center}>
        <ActivityIndicator size="large" />
        <Text>読み込み中...</Text>
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
    <View style={formStyle.container}>
      <Text style={formStyle.title}>一覧</Text>
      <View style={tables.headerRow}>
        <Text style={tables.headerCell}>番号</Text>
        <Text style={tables.headerCell}>商品名</Text>
        <Text style={tables.headerCell}>値段</Text>
        <Text style={tables.headerCell}>シリーズ</Text>
      </View>
      <FlatList
        data={item}
        keyExtractor={(_, index) => index.toString()}
        initialNumToRender={Page_size}
        renderItem={({ item, index }) => (
          <View
            style={[
              tables.dataRow,
              { backgroundColor: index % 2 === 0 ? "#fff" : "#eee" },
            ]}
          >
            <Text style={tables.dataCell}>{item.番号}</Text>
            <Text style={tables.dataCell}>{item.商品名}</Text>
            <Text style={tables.dataCell}>¥{item.値段}</Text>
            <Text style={tables.dataCell}>{item.シリーズ}</Text>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.pagination}>
            <Button
              title="前のページ"
              onPress={handlePrev}
              disabled={page === 0}
            />
            <Text>ページ {page + 1}</Text>
            <Button
              title="次のページ"
              onPress={handleNext}
              disabled={!hasMore}
            />
          </View>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});
