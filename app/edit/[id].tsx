import { supabase } from "@/lib/supabaseClient";
import { Item } from "@/types/types";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Save } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, Card, Snackbar, Switch } from "react-native-paper";

export default function EditPage() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchased, setPurchased] = useState<boolean>(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("Rejindou_Master")
        .select("*")
        .eq("番号", Number(id))
        .single();

      if (error) {
        console.error("エラー:", error);
      } else if (data) {
        setData(data);
        setPurchased(data.購入済み ?? false);
      }
      if (data) {
        const isPurchased =
          data.購入済み === true ||
          data.購入済み === "true" ||
          data.購入済み === 1;
        setPurchased(isPurchased);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleSave = useCallback(async () => {
    if (!data) return;

    const { error } = await supabase
      .from("Rejindou_Master")
      .update({ 購入済み: purchased })
      .eq("番号", Number(data.番号));

    if (error) {
      console.error("保存エラー:", error);
      setSnackbarMessage("保存に失敗しました");
      setSnackbarVisible(true);
    } else {
      setSnackbarMessage("保存されました");
      setSnackbarVisible(true);

      setTimeout(() => {
        setSnackbarVisible(false);
        router.replace("/");
      }, 1000);
    }
  }, [data, purchased]);
  const handleCancel = () => {
    setSnackbarMessage("キャンセルされました");
    setSnackbarVisible(true);

    setTimeout(() => {
      setSnackbarVisible(false);
      router.replace("/");
    }, 1000);
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
  return (
    <View className="flex-1 p-2 bg-background">
      <View className="flex-grow">
        <View className="container mx-auto px-4 py-4">
          <View className="flex items-left space-y-1">
            <Link href="/search">
              <ArrowLeft size={24} className="text-muted-foreground" />
            </Link>
            <Text className="text-2xl font-bold tracking-tight text-foreground">
              データ編集
            </Text>
            <Text className="text-sm text-muted-foreground mt-1">
              購入済みステータスを編集
            </Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-grow">
        <Card className="border-border/50 bg-card p-6">
          <View className="space-y-4">
            <View>
              <Text className=" text-sm text-muted-foreground">番号</Text>
              <Text className="text-lg font-semibold">{data?.番号}</Text>
            </View>

            <View>
              <Text className=" text-sm text-muted-foreground">カラーNo.</Text>
              <Text className="text-lg font-semibold">
                {data?.["カラーNo."]}
              </Text>
            </View>

            <View>
              <Text className=" text-sm text-muted-foreground">商品名</Text>
              <Text className="text-lg font-semibold">{data?.商品名}</Text>
            </View>

            <View>
              <Text className=" text-sm  text-muted-foreground">値段</Text>
              <Text className="text-lg font-semibold">{data?.値段}</Text>
            </View>

            <View>
              <Text className=" text-sm text-muted-foreground">シリーズ</Text>
              <Text className="text-lg font-semibold">{data?.シリーズ}</Text>
            </View>

            <View>
              <Text className=" text-sm text-muted-foreground">備考</Text>
              <Text className="text-lg font-semibold">{data?.備考}</Text>
            </View>
          </View>

          <View className="mt-6">
            <Text className=" text-sm text-muted-foreground mb-2">
              購入済み
            </Text>
            <Switch value={purchased} onValueChange={setPurchased} />
            <Text>{purchased ? "購入済み" : "未購入"}</Text>
          </View>

          <View className="flex-row gap-3 mt-6">
            <Button
              mode="contained"
              onPress={handleSave}
              disabled={loading}
              className="flex-1 flex-row items-center justify-center"
            >
              <Save size={18} />
              <Text>保存</Text>
            </Button>
            <Button
              mode="contained"
              onPress={handleCancel}
              className="flex-1 items-center justify-center"
            >
              <Text>キャンセル</Text>
            </Button>
          </View>
        </Card>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={800}
        >
          {snackbarMessage}
        </Snackbar>
      </ScrollView>
    </View>
  );
}
