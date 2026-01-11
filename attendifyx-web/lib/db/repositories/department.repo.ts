import {PostgresJsDatabase} from "drizzle-orm/postgres-js";
import {InsertDepartment} from "@/lib/db/types/department";
import * as schema from "@/lib/db/schemas";

class DepartmentRepository {
    constructor(private db: PostgresJsDatabase<typeof schema>){}
    async insertDepartment(data: InsertDepartment) {
        const rows = await this.db
            .insert(schema.departmentTable)
            .values({
                departmentName: data.departmentName,
                departmentCode: data.departmentCode,
                authId: data.authId,
                departmentImage: data.departmentImage,
                role: data.role,
            })
            .returning({
                departmentName: schema.departmentTable.departmentName,
                createdAt: schema.departmentTable.departmentCreatedAt
            });

        if (rows.length === 0) {
            throw new Error("No rows were returned from the database.");
        }

        return rows[0];
    }
}

import { db } from "@/lib/db";
export const departmentRepo: DepartmentRepository = new DepartmentRepository(db);
