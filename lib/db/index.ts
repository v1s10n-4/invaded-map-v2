import "@/lib/db/envConfig";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { account, session, user, verification } from "./schema";

const sql = neon(process.env.DATABASE_URL ?? "");

export const db = drizzle(sql, {
  schema: { user, session, account, verification },
});
