# ベースイメージ
FROM node:22-alpine

# 作業ディレクトリ
WORKDIR /app

# 依存関係をコピーしてインストール
COPY package*.json ./
RUN npm install -g expo-cli && npm install

# アプリのソースをコピー
COPY . .

# Expo Web 用ポートを開放
EXPOSE 19006

# Webモードで起動
CMD ["npx", "expo", "start", "--web"]
