import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../lib/supabaseClient";

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
      <View style={styles.center}>
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
    <View style={styles.container}>
      <Text style={styles.title}>一覧</Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>番号</Text>
        <Text style={styles.headerCell}>商品名</Text>
        <Text style={styles.headerCell}>値段</Text>
        <Text style={styles.headerCell}>シリーズ</Text>
      </View>
      <FlatList
        data={item}
        keyExtractor={(_, index) => index.toString()}
        initialNumToRender={Page_size}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.dataRow,
              { backgroundColor: index % 2 === 0 ? "#fff" : "#eee" },
            ]}
          >
            <Text style={[styles.dataCell]}>{item.番号}</Text>
            <Text style={[styles.dataCell]}>{item.商品名}</Text>
            <Text style={[styles.dataCell]}>¥{item.値段}</Text>
            <Text style={[styles.dataCell]}>{item.シリーズ}</Text>
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
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  dataCell: {
    flex: 1,
    fontSize: 13,
  },
});
