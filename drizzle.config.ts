import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// drizzle-kit CLI는 .env.local을 자동 로드하지 않으므로 명시적으로 읽는다.
config({ path: ".env.local" });

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // 마이그레이션은 session 풀러(DIRECT_URL, 5432) 사용
    url: process.env.DIRECT_URL!,
  },
});
