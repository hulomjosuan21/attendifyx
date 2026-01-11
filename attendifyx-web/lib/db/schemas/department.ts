import {pgEnum, pgTable, timestamp, uuid, varchar, index, uniqueIndex} from "drizzle-orm/pg-core";
import { authUsers } from "./auth";

export enum DepartmentRoleEnum {
    DEPARTMENT = "department",
    SCHOOL = "school",
}

export const roleEnum = pgEnum('department_role_enum', Object.values(DepartmentRoleEnum) as [string, ...string[]]);

export const departmentTable = pgTable('departments_table',{
    departmentId: uuid('department_id').primaryKey().defaultRandom(),
    departmentCode: varchar('department_code',{length: 50}).notNull(),
    departmentName: varchar('department_name',{length: 250}).notNull(),
    departmentImage: varchar('department_image',{length: 500}),
    role: roleEnum('role').notNull().default(DepartmentRoleEnum.DEPARTMENT),
    authId: uuid('auth_id')
        .notNull()
        .references(() => authUsers.id, { onDelete: 'cascade' }),
    departmentCreatedAt: timestamp('department_created_at',{withTimezone: true}).notNull().defaultNow(),
    departmentUpdatedAt: timestamp('department_updated_at', {withTimezone: true}).$onUpdateFn(() => new Date()),
},(table) => [
    uniqueIndex('department_name_idx').on(table.departmentName),
    uniqueIndex('department_auth_id_idx').on(table.authId),
])