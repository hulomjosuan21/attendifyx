import { relations } from "drizzle-orm";
import { departmentTable, studentTable } from "@/lib/db/schemas";

export const studentRelations = relations(studentTable, ({ one }) => ({
  department: one(departmentTable, {
    fields: [studentTable.departmentId],
    references: [departmentTable.departmentId],
  }),
}));
