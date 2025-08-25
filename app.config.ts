import { ExpoConfig } from "@expo/config-types";
import "dotenv/config";

export default ({
  config,
}: {
  config: ExpoConfig & { expo?: any };
}): ExpoConfig => ({
  ...config,
  name: "my-app",
  slug: "MyApp",
  version: "1.0.0",
  owner: "makkiy",
  ...config.expo?.extra, // 既存の extra を保持
  extra: {
    API_URL: process.env.API_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    apiUrl: process.env.EXPO_PUBLIC_API_URL,

    owner: "makkiy",
    eas: {
      projectId: "3aa8abf5-0d24-4dff-b372-11212e6fcc36", // Replace with your actual project ID
    },
  },
});
