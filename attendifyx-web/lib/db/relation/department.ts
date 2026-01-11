import { departmentTable, studentTable } from "@/lib/db/schemas";
import { relations } from "drizzle-orm";
export const departmentRelations = relations(
  departmentTable,
  ({ many, one }) => ({
    students: many(studentTable),
  })
);
