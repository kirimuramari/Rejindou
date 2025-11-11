import { ThemedButton } from "@/components/ui/ThemedButton";
import ThemedCard from "@/components/ui/ThemedCard";
import { supabase } from "@/lib/supabaseClient";
import { Item } from "@/types/types";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Save } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Snackbar, Switch, useTheme } from "react-native-paper";

export default function EditPage() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchased, setPurchased] = useState<boolean>(false);

  const { colors, dark } = useTheme();

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
    <View
      className="flex-1 p-2 bg-background"
      style={{ backgroundColor: colors.background }}
    >
      <View className="flex-grow">
        <View className="container mx-auto px-4 py-4">
          <View className="flex items-left space-y-1">
            <Link href="/search">
              <ArrowLeft size={24} className="text-muted-foreground" />
            </Link>
            <Text
              className="text-2xl font-bold tracking-tight text-foreground"
              style={{ color: colors.onSurface }}
            >
              データ編集
            </Text>
            <Text
              className="text-sm text-muted-foreground mt-1"
              style={{ color: colors.onSurfaceVariant }}
            >
              購入済みステータスを編集
            </Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-grow">
        <ThemedCard>
          <View className="space-y-4">
            <View>
              <Text
                className=" text-sm text-muted-foreground"
                style={{ color: colors.onSurfaceVariant }}
              >
                番号
              </Text>
              <Text
                className="text-lg font-semibold"
                style={{ color: colors.onSurface }}
              >
                {data?.番号}
              </Text>
            </View>

            <View>
              <Text
                className=" text-sm text-muted-foreground"
                style={{ color: colors.onSurfaceVariant }}
              >
                カラーNo.
              </Text>
              <Text
                className="text-lg font-semibold"
                style={{ color: colors.onSurface }}
              >
                {data?.["カラーNo."]}
              </Text>
            </View>

            <View>
              <Text
                className=" text-sm text-muted-foreground"
                style={{ color: colors.onSurfaceVariant }}
              >
                商品名
              </Text>
              <Text
                className="text-lg font-semibold"
                style={{ color: colors.onSurface }}
              >
                {data?.商品名}
              </Text>
            </View>

            <View>
              <Text
                className=" text-sm  text-muted-foreground"
                style={{ color: colors.onSurfaceVariant }}
              >
                値段
              </Text>
              <Text
                className="text-lg font-semibold"
                style={{ color: colors.onSurface }}
              >
                {data?.値段}
              </Text>
            </View>

            <View>
              <Text
                className=" text-sm text-muted-foreground"
                style={{ color: colors.onSurfaceVariant }}
              >
                シリーズ
              </Text>
              <Text
                className="text-lg font-semibold"
                style={{ color: colors.onSurface }}
              >
                {data?.シリーズ}
              </Text>
            </View>

            <View>
              <Text
                className=" text-sm text-muted-foreground"
                style={{ color: colors.onSurfaceVariant }}
              >
                備考
              </Text>
              <Text
                className="text-lg font-semibold"
                style={{ color: colors.onSurface }}
              >
                {data?.備考}
              </Text>
            </View>
          </View>

          <View className="mt-6">
            <Text
              className=" text-sm text-muted-foreground mb-2"
              style={{ color: colors.onSurfaceVariant }}
            >
              購入済み
            </Text>
            <Switch
              value={purchased}
              onValueChange={setPurchased}
              color={colors.primary}
            />
            <Text style={{ color: colors.onSurface }}>
              {purchased ? "購入済み" : "未購入"}
            </Text>
          </View>

          <View className="flex-row gap-3 mt-6">
            <ThemedButton
              mode="contained"
              onPress={handleSave}
              disabled={loading}
              className="flex-1 flex-row items-center justify-center"
            >
              <Save size={18} color={colors.onPrimary} />
              <Text style={{ color: colors.onPrimary }}>保存</Text>
            </ThemedButton>
            <ThemedButton
              mode="contained-tonal"
              onPress={handleCancel}
              className="flex-1 items-center justify-center"
            >
              <Text>キャンセル</Text>
            </ThemedButton>
          </View>
        </ThemedCard>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={800}
          style={{
            backgroundColor: colors.inverseSurface,
          }}
        >
          <Text style={{ color: colors.inverseOnSurface }}>
            {snackbarMessage}
          </Text>
        </Snackbar>
      </ScrollView>
    </View>
  );
}
