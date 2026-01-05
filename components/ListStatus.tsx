import { Text, View } from "react-native";

type Props = {
  loading: boolean;
  error?: string | null;
  hasData: boolean;
  emptyMessage?: string;
};

export const ListStatus = ({
  loading,
  error,
  hasData,
  emptyMessage = "データがありません。",
}: Props) => {
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
  if (error) {
    return (
      <View>
        <Text className="text-red-500">エラー:{error}</Text>
      </View>
    );
  }
  if (!hasData) {
    return (
      <View style={{ padding: 20 }}>
        <Text>{emptyMessage}</Text>
      </View>
    );
  }
  return null;
};
