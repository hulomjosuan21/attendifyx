import {
  index,
  pgTable,
  timestamp,
  uuid,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { departmentTable } from "@/lib/db/schemas/department";
import { relations } from "drizzle-orm";
import { users } from "./auth";

export const studentTable = pgTable(
  "students_table",
  {
    studentId: uuid("student_id").primaryKey().defaultRandom(),
    studentSchoolId: varchar("student_school_id", { length: 50 }).notNull(),
    authId: uuid("auth_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    departmentId: uuid("department_id")
      .notNull()
      .references(() => departmentTable.departmentId, { onDelete: "cascade" }),
    studentImage: varchar("student_image", { length: 500 }),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    middleName: varchar("middle_name", { length: 100 }),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    studentCreatedAt: timestamp("student_created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    studentUpdatedAt: timestamp("student_updated_at", {
      withTimezone: true,
    }).$onUpdateFn(() => new Date()),
  },
  (table) => [
    uniqueIndex("student_school_id_idx").on(table.studentSchoolId),
    uniqueIndex("student_auth_id_idx").on(table.authId),
    index("first_name_idx").on(table.firstName),
    index("last_name_idx").on(table.lastName),
    index("full_name_composite_idx").on(
      table.lastName,
      table.firstName,
      table.middleName
    ),
  ]
);
