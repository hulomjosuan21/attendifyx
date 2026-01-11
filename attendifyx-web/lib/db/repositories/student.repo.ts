import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "@/lib/db/schemas";

class StudentRepository {
    constructor(private db: PostgresJsDatabase<typeof schema>){}
}

import { db } from "@/lib/db";
export const studentRepo = new StudentRepository(db);