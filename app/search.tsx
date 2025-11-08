import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";
import { ArrowLeft, Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, Card, DataTable, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "../lib/supabaseClient";

type Item = {
  番号: number;
  商品名: string;
  値段: string;
  シリーズ: string;
};

export default function SearchScreen() {
  const [name, setName] = useState("");
  const [series, setSeries] = useState("");
  const [seriesList, setSeriesList] = useState<string[]>([]);
  const [results, setResults] = useState<Item[]>([]);
  const [searched, setSearched] = useState(false);

  const insets = useSafeAreaInsets();

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
    <View
      className="flex-1 bg-background"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <View className="flex-grow">
          <View className="container mx-auto px-4 py-6">
            <View className="flex items-left space-y-1">
              <Link
                href="/"
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
              <Text className="text-2xl font-bold tracking-tight text-foreground">
                データ検索
              </Text>
              <Text className="text-sm text-muted-foreground mt-1">
                商品名やセット名で検索
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="px-2 py-4">
        <Card className="border-border/50 bg-card p-6 mb-6">
          <View className="space-y-4">
            <View className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <View className="space-y-2">
                <Text className="text-lg font-medium text-foreground">
                  検索条件
                </Text>
                <Text className="text-sm font-medium text-foreground">
                  商品名で検索
                </Text>
                <TextInput
                  placeholder="商品名を入力"
                  value={name}
                  onChangeText={setName}
                  className="bg-white border-border/50"
                />
              </View>
              <View className="space-y-2 pt-10">
                <Text className="text-sm font-medium text-foreground">
                  セット名で検索
                </Text>
                <Picker
                  selectedValue={series}
                  onValueChange={(itemValue: string) => setSeries(itemValue)}
                >
                  <Picker.Item label="セット名を選択" value="" />
                  {seriesList.map((s: string, i: number) => (
                    <Picker.Item key={i} label={s} value={s} />
                  ))}
                </Picker>
              </View>
            </View>

            <Button
              className=" w-36 h-12 gap-2"
              mode="contained"
              onPress={handleSearch}
            >
              <View className="flex-row items-center space-x-2">
                <Search className="w-4 h-4" />
                <Text className="text-base text-foreground ">検索</Text>
              </View>
            </Button>
          </View>
        </Card>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingBottom: 100,
        }}
      >
        {searched && (
          <View>
            <Text className="text-lg font-medium text-foreground mb-4">
              {results.length} 件ありました。
            </Text>
            {results.length > 0 && (
              <Card className="border-border/50 bg-card">
                <View className="px-4">
                  <DataTable className="p-4 border-border/40 bg-card rounded-xl">
                    <DataTable.Header className="flex-row border-b border-border/30 pb-2 mb-2">
                      <DataTable.Title className="font-semibold text-foreground">
                        番号
                      </DataTable.Title>
                      <DataTable.Title className="font-semibold text-foreground">
                        商品名
                      </DataTable.Title>
                      <DataTable.Title className="font-semibold text-foreground">
                        値段
                      </DataTable.Title>
                      <DataTable.Title className="font-semibold text-foreground">
                        シリーズ
                      </DataTable.Title>
                    </DataTable.Header>
                    {results.map((item, index) => (
                      <DataTable.Row
                        key={item.番号}
                        style={{
                          flexDirection: "row",
                          backgroundColor:
                            index % 2 === 0 ? "#f0f0f0" : "#ffffff",
                        }}
                      >
                        <DataTable.Cell className="font-medium">
                          {item.番号}
                        </DataTable.Cell>
                        <DataTable.Cell className="text-muted-foreground">
                          <Link
                            href={{
                              pathname: "/edit/[id]" as any,
                              params: { id: String(item.番号) },
                            }}
                            className=" text-primary hover:underline cursor-pointer "
                          >
                            {item.商品名}
                          </Link>
                        </DataTable.Cell>
                        <DataTable.Cell className="text-muted-foreground">
                          ¥{item.値段}
                        </DataTable.Cell>
                        <DataTable.Cell className="text-muted-foreground">
                          {item.シリーズ}
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                </View>
              </Card>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
