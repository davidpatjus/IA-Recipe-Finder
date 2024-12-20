import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg'

// Configuración de la conexión con Supabase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);
