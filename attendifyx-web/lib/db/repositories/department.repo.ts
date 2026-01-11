import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { InsertDepartment } from "@/types/department";
import * as schema from "@/lib/db/schemas";

class DepartmentRepository {
  constructor(private db: PostgresJsDatabase<typeof schema>) {}

  async getDepartmentByDepartmentAuthId({
    authId,
    fields,
  }: {
    authId: string;
    fields?: {
      [K in keyof typeof schema.departmentTable.$inferSelect]?: boolean;
    };
  }) {
    return this.db.query.departmentTable.findFirst({
      columns: fields,
      where: (table, { eq }) => eq(table.authId, authId),
    });
  }

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
        createdAt: schema.departmentTable.departmentCreatedAt,
      });

    if (rows.length === 0) {
      throw new Error("No rows were returned from the database.");
    }

    return rows[0];
  }
}

import { db } from "@/lib/db";
import { eq, getTableColumns } from "drizzle-orm";

export const departmentRepo: DepartmentRepository = new DepartmentRepository(
  db
);
