import { ThemedButton } from "@/components/ui/ThemedButton";
import ThemedCard from "@/components/ui/ThemedCard";
import { ThemedText } from "@/components/ui/ThemedText";
import { Item } from "@/types/types";

import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";
import { ArrowLeft, Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { DataTable, TextInput, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "../lib/supabaseClient";

export default function SearchScreen() {
  const [name, setName] = useState("");
  const [series, setSeries] = useState("");
  const [seriesList, setSeriesList] = useState<string[]>([]);
  const [results, setResults] = useState<Item[]>([]);
  const [searched, setSearched] = useState(false);

  const insets = useSafeAreaInsets();

  const { colors, dark } = useTheme();

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
      className="flex-1"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: colors.background,
      }}
    >
      <View className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <View className="flex-grow">
          <View className="container mx-auto px-4 py-10">
            <View className="flex items-left space-y-1">
              <Link
                href="/"
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors"
              >
                <ArrowLeft
                  className="w-5 h-5 text-muted-foreground"
                  color={colors.primary}
                />
              </Link>
              <Text
                className="text-2xl font-bold tracking-tight text-foreground"
                style={{ color: colors.onSurface }}
              >
                データ検索
              </Text>
              <Text
                className="text-sm text-muted-foreground mt-1"
                style={{ color: colors.onSurfaceVariant }}
              >
                商品名やセット名で検索
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingBottom: 100,
        }}
      >
        <View className="px-2 py-4">
          <ThemedCard>
            <View className="space-y-4">
              <View className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <View className="space-y-2">
                  <ThemedText variant="title">検索条件</ThemedText>
                  <ThemedText>商品名で検索</ThemedText>
                  <TextInput
                    placeholder="商品名を入力"
                    placeholderTextColor={colors.onSurfaceVariant}
                    value={name}
                    onChangeText={setName}
                    className="bg-white border-border/50"
                    style={{
                      backgroundColor: colors.surface,
                      color: colors.onSurface,
                      borderColor: colors.outlineVariant,
                    }}
                  />
                </View>
                <View className="space-y-2 pt-10">
                  <ThemedText>セット名で検索</ThemedText>
                  <Picker
                    selectedValue={series}
                    onValueChange={(itemValue: string) => setSeries(itemValue)}
                    style={{
                      color: colors.onSurface,
                      backgroundColor: colors.surface,
                    }}
                  >
                    <Picker.Item label="セット名を選択" value="" />
                    {seriesList.map((s: string, i: number) => (
                      <Picker.Item key={i} label={s} value={s} />
                    ))}
                  </Picker>
                </View>
              </View>

              <ThemedButton
                className=" w-36 h-12 gap-2"
                mode="contained"
                onPress={handleSearch}
              >
                <View className="flex-row items-center space-x-2">
                  <Search className="w-4 h-4" color={colors.onPrimary} />
                  <Text
                    className="text-base text-foreground "
                    style={{ color: colors.onPrimary }}
                  >
                    検索
                  </Text>
                </View>
              </ThemedButton>
            </View>
          </ThemedCard>
        </View>
        {searched && (
          <View>
            <ThemedText>{results.length} 件ありました。</ThemedText>
            {results.length > 0 && (
              <ThemedCard>
                <View className="px-4">
                  <DataTable className=" border-border/40 bg-card rounded-xl">
                    <DataTable.Header className="flex-row border-b border-border/30 pb-2 mb-2">
                      <DataTable.Title
                        className="font-semibold text-foreground"
                        textStyle={{ color: colors.onSurface }}
                      >
                        番号
                      </DataTable.Title>
                      <DataTable.Title
                        className="font-semibold text-foreground"
                        textStyle={{ color: colors.onSurface }}
                      >
                        商品名
                      </DataTable.Title>
                      <DataTable.Title
                        className="font-semibold text-foreground"
                        textStyle={{ color: colors.onSurface }}
                      >
                        値段
                      </DataTable.Title>
                      <DataTable.Title
                        className="font-semibold text-foreground"
                        textStyle={{ color: colors.onSurface }}
                      >
                        シリーズ
                      </DataTable.Title>
                    </DataTable.Header>
                    {results.map((item, index) => (
                      <DataTable.Row
                        key={item.番号}
                        style={{
                          flexDirection: "row",
                          backgroundColor:
                            index % 2 === 0
                              ? dark
                                ? "#2C2C2C"
                                : "#F9F9F9"
                              : colors.surface,
                        }}
                      >
                        <DataTable.Cell
                          className="font-medium"
                          textStyle={{ color: colors.onSurface }}
                        >
                          {item.番号}
                        </DataTable.Cell>
                        <DataTable.Cell
                          className="text-muted-foreground"
                          textStyle={{ color: colors.onSurface }}
                        >
                          <Link
                            href={{
                              pathname: "/edit/[id]" as any,
                              params: { id: String(item.番号) },
                            }}
                            className=" text-primary hover:underline cursor-pointer "
                            style={{ color: colors.onSurface }}
                          >
                            {item.商品名}
                          </Link>
                        </DataTable.Cell>
                        <DataTable.Cell
                          className="text-muted-foreground"
                          textStyle={{ color: colors.onSurface }}
                        >
                          ¥{item.値段}
                        </DataTable.Cell>
                        <DataTable.Cell
                          className="text-muted-foreground"
                          textStyle={{ color: colors.onSurface }}
                        >
                          {item.シリーズ}
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                </View>
              </ThemedCard>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
