import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("DATABASE_URL is not defined");
}

let connection: postgres.Sql;

if (process.env.NODE_ENV === "production") {
  connection = postgres(dbUrl, { prepare: false });
} else {
  const globalConnection = global as typeof globalThis & {
    connection: postgres.Sql;
  };
  if (!globalConnection.connection) {
    globalConnection.connection = postgres(dbUrl, { prepare: false });
  }
  connection = globalConnection.connection;
}

const db = drizzle(connection, {
  schema,
});

export * from "./schema";
export { db };
