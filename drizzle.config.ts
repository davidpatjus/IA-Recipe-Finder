import { defineConfig } from 'drizzle-kit';
process.loadEnvFile()

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/models/schema.ts', 
  out: './drizzle', 
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
