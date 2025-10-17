import { formStyle } from "@/theme/formStyle";
import { tables } from "@/theme/tables";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
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
      <View style={formStyle.loadingForm}>
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
    <View style={formStyle.container}>
      <Text style={formStyle.title}>データ一覧</Text>

      {/* フィールド名の固定表示 */}
      <View style={tables.headerRow}>
        <Text style={tables.headerCell}>番号</Text>
        <Text style={tables.headerCell}>シリーズ</Text>

        <Text style={tables.headerCell}>セット価格</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.番号.toString()}
        renderItem={({ item, index }) => (
          <View
            style={[
              tables.dataRow,
              { backgroundColor: index % 2 === 0 ? "#fff" : "#eee" },
            ]}
          >
            <Text style={tables.dataCell}>{item.番号}</Text>
            <Text style={tables.dataCell}>{item.シリーズ}</Text>
            <Text style={tables.dataCell}> ¥{item.セット価格}</Text>
          </View>
        )}
      />
    </View>
  );
}
