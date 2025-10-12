import { formStyle } from "@/theme/formStyle";
import { tables } from "@/theme/tables";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../lib/supabaseClient";

export default function SearchScreen() {
  const [name, setName] = useState("");
  const [series, setSeries] = useState("");
  const [seriesList, setSeriesList] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchSeries = async () => {
      const { data, error } = await supabase
        .from("Rejindou_Master")
        .select("シリーズ")
        .not("シリーズ", "is", null);

      if (!error && data) {
        const uniqueSeries = Array.from(
          new Set(
            (data as unknown as { シリーズ: string }[]).map(
              (item) => item["シリーズ"]
            )
          )
        );
        setSeriesList(uniqueSeries);
      }
    };
    fetchSeries();
  }, []);
  const handleSearch = async () => {
    let query = supabase.from("Rejindou_Master").select("*");
    if (name.trim()) {
      query = query.ilike("商品名", `%${name.trim()}%`);
    }
    if (series) {
      query = query.eq("シリーズ", series);
    }
    const { data, error } = await query;
    if (!error && data) {
      setResults(data);
      setSearched(true);
    } else {
      console.error(error);
    }
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>検索条件</Text>
      <TextInput
        placeholder="名前で検索"
        value={name}
        onChangeText={setName}
        style={formStyle.TextInput}
      />
      <Picker
        selectedValue={series}
        onValueChange={(itemValue: string) => setSeries(itemValue)}
        style={{ marginBottom: 12 }}
      >
        <Picker.Item label="シリーズを選択" value="" />
        {seriesList.map((s: string, i: number) => (
          <Picker.Item key={i} label={s} value={s} />
        ))}
      </Picker>
      <Button title="検索" onPress={handleSearch} />
      {searched && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16 }}>{results.length} 件ありました。</Text>
          <View style={tables.headerRow}>
            <Text style={tables.headerCell}>番号</Text>
            <Text style={tables.headerCell}>商品名</Text>
            <Text style={tables.headerCell}>値段</Text>
            <Text style={tables.headerCell}>シリーズ</Text>
          </View>
          <FlatList
            data={results}
            keyExtractor={(item, index) =>
              item.id?.toString() ??
              `${item.name || "name"}-${item.series || "series"}-${index}`
            }
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
            scrollEnabled={false}
          />
        </View>
      )}
    </ScrollView>
  );
}
