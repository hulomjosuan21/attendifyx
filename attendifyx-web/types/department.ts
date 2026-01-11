import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { departmentTable } from "@/lib/db/schemas";

export type Department = InferInsertModel<typeof departmentTable>;

export type InsertDepartment = InferInsertModel<typeof departmentTable>;
