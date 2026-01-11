import { relations } from "drizzle-orm";
import {departmentTable, studentTable} from "@/lib/db/schemas";
import { authUsers } from "@/lib/db/schemas/auth";

export const studentRelations = relations(studentTable, ({ one }) => ({
    department: one(departmentTable, {
        fields: [studentTable.departmentId],
        references: [departmentTable.departmentId],
    }),
    auth: one(authUsers, {
        fields: [studentTable.authId],
        references: [authUsers.id],
    })
}));