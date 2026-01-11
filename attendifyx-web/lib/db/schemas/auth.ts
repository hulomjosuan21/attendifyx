import { pgSchema, uuid, text } from "drizzle-orm/pg-core";

export const authSchema = pgSchema("auth");

export const authUsers = authSchema.table("users", {
    id: uuid("id").primaryKey(),
    email: text("email"),
});