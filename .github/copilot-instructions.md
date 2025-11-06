# レジン道データベース AI コーディングガイド

## プロジェクト概要

このプロジェクトはExpo（React Native）を使用したクロスプラットフォームアプリケーションで、レジン商品のデータベース管理システムです。

## アーキテクチャと主要コンポーネント

### 技術スタック
- Expo (React Native) - クロスプラットフォーム開発
- Supabase - バックエンドデータベース
- NativeWind (Tailwind CSS) - スタイリング
- Expo Router - ファイルベースのルーティング

### 主要ディレクトリ構造
- `app/` - ルートレベルのページコンポーネント
- `components/ui/` - 再利用可能なUIコンポーネント
- `lib/` - ユーティリティと共有関数

## コーディング規約とパターン

### UIコンポーネント
- すべてのUIコンポーネントは `components/ui/` に配置
- NativeWindのクラス名を使用したスタイリング
- コンポーネントは`React.forwardRef`を使用（例: `Button.tsx`）

例）Buttonコンポーネントのパターン:
```tsx
export interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
}

export const Button = React.forwardRef<typeof TouchableOpacity, ButtonProps>((props, ref) => {
  // 実装
});
```

### データフェッチング
- Supabaseクライアントは `lib/supabaseClient.ts` から一元管理
- ページネーションは50件単位で実装 (`Page_size = 50`)

### スタイリング
- TailwindCSSクラスをNativeWindで使用
- `cn()` ユーティリティ関数でクラス名を結合（`lib/utils.ts`）

## 開発ワークフロー

### セットアップ
1. 依存関係のインストール: `npm install`
2. 開発サーバー起動: `npx expo start`

### Docker環境
- Web開発用のDockerfile構成あり
- `docker-compose up` でExpo Web環境を起動可能

## インテグレーションポイント

### Supabase接続
- 環境変数で設定: `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- テーブル名: `Rejindou_Master`

## コードジェネレーション時の注意点

1. 新規コンポーネント作成時:
   - 適切なディレクトリに配置
   - TypeScript型定義を含める
   - NativeWindスタイリングを使用

2. 新規ページ作成時:
   - `app/` ディレクトリにファイルを配置
   - Expo Routerの規約に従う
   - データフェッチングはSupabaseクライアントを使用