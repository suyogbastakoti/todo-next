import { Pool } from "pg";
import config from "@/app/config/index";

const globalPg = globalThis as unknown as { pgPool?: Pool };

export const pgPool =
  globalPg.pgPool ||
  new Pool({
    connectionString: config.database.url,
    ssl: { rejectUnauthorized: false },
  });

// Test connection
pgPool
  .connect()
  .then((client) => {
    console.log("PostgreSQL connected successfully.");
    client.release();
  })
  .catch((err) => {
    console.error("Failed to connect to PostgreSQL:", err.message);
  });

if (process.env.NODE_ENV !== "production") globalPg.pgPool = pgPool;
