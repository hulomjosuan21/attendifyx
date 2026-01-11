import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from "@/lib/db/schemas"
import {DB_CONNECTION_STRING} from "@/lib/constants";

export const postgresClient = postgres(DB_CONNECTION_STRING, { prepare: false })
export const db = drizzle(postgresClient,{schema});