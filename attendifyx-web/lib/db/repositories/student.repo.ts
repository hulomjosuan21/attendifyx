import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import {InsertDepartmentInput} from "@/lib/db/types/department";
import * as schema from "@/lib/db/schemas";

class StudentRepository {
    constructor(private db: PostgresJsDatabase<typeof schema>){}
}

import { db } from "@/lib/db";
export const studentRepo = new StudentRepository(db);