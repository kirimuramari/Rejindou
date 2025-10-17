import { supabase } from "@/lib/supabaseClient";
import { formStyle } from "@/theme/formStyle";
import { tables } from "@/theme/tables";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function Purchased() {
  interface Item {
    番号: number;
    商品名: string;
    値段: string;
    シリーズ: string;
    購入済み: boolean;
  }

  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("Rejindou_Master")
        .select("*")
        .eq("購入済み", true)
        .order("番号", { ascending: true });
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
      <Text style={formStyle.title}>購入品一覧</Text>
      <View style={tables.headerRow}>
        <Text style={tables.headerCell}>番号</Text>
        <Text style={tables.headerCell}>商品名</Text>
        <Text style={tables.headerCell}>値段</Text>
        <Text style={tables.headerCell}>シリーズ</Text>
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
            <Text style={tables.dataCell}>{item.商品名}</Text>
            <Text style={tables.dataCell}> ¥{item.値段}</Text>
            <Text style={tables.dataCell}>{item.シリーズ}</Text>
          </View>
        )}
      />
    </View>
  );
}
