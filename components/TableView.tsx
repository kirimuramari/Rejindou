import React from "react";
import { ScrollView, View } from "react-native";
import { Card, DataTable } from "react-native-paper";

type Column<T, K extends keyof T = keyof T> = {
  title: string;
  key: K;
  width?: string;
  render?: (value: T[K], row: T) => React.ReactNode;
};
type Props<T> = {
  data: readonly T[];
  columns: readonly Column<T>[];
  rowKey: (row: T) => string | number;
  scrollable?: boolean;
  cardPadding?: boolean;
};
export function TableView<T>({
  data,
  columns,
  rowKey,
  scrollable = true,
  cardPadding = true,
}: Props<T>) {
  const Table = (
    <Card className="border-border/50 bg-card">
      <View className={cardPadding ? "px-4" : undefined}>
        <DataTable className="border-border/40 bg-card rounded-xl">
          <DataTable.Header className="flex-row border-b border-border/30 pb-2 mb-2">
            {columns.map((col) => (
              <DataTable.Title
                key={String(col.key)}
                className={`font-semibold text-foreground`}
                style={{ width: col.width }}
              >
                {col.title}
              </DataTable.Title>
            ))}
          </DataTable.Header>
          {data.map((row) => (
            <DataTable.Row
              key={rowKey(row)}
              style={{
                flexDirection: "row",
                paddingVertical: 8,
                paddingHorizontal: 4,
              }}
            >
              {columns.map((col) => {
                const value = row[col.key];
                return (
                  <DataTable.Cell
                    key={String(col.key)}
                    style={{ width: col.width }}
                    className=" text-muted-foreground"
                  >
                    {col.render ? col.render(value, row) : String(value ?? "")}
                  </DataTable.Cell>
                );
              })}
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </Card>
  );
  if (!scrollable) return Table;
  return <ScrollView className="flex-grow">{Table}</ScrollView>;
}
