import {InferInsertModel} from "drizzle-orm";
import {departmentTable} from "@/lib/db/schemas";

export type InsertDepartment = InferInsertModel<typeof departmentTable>