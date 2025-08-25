import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../lib/supabaseClient";

export default function Set_Price() {
  interface Set_PriceItem {
    番号: number;
    シリーズ: string;
    セット価格: number;
  }
  const [data, setData] = useState<Set_PriceItem[]>([]);
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>読み込み中...</Text>
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
    <View style={styles.container}>
      <Text style={styles.title}>データ一覧</Text>

      {/* フィールド名の固定表示 */}
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>番号</Text>
        <Text style={styles.headerCell}>シリーズ</Text>

        <Text style={styles.headerCell}>セット価格</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.番号.toString()}
        renderItem={({ item,index }) => (
          <View style={[styles.dataRow,
            {backgroundColor: index % 2 === 0 ? "#fff" : "#eee"},
          ]}>
            <Text style={styles.dataCell}>{item.番号}</Text>
            <Text style={styles.dataCell}>{item.シリーズ}</Text>
            <Text style={styles.dataCell}> ¥{item.セット価格}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 14,
  },
  dataRow: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  dataCell: {
    flex: 1,
    fontSize: 13,
  },
});
