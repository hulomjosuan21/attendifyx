import {pgEnum, pgTable, text, uuid, varchar} from "drizzle-orm/pg-core";
import {departmentTable} from "@/lib/db/schemas/department";

export enum EventVisibilityEnum {
    TARGET_ONLY = "target_only",
    PUBLIC = "public"
}

export const eventVisibilityEnum = pgEnum('event_visibility_enum', Object.values(EventVisibilityEnum) as [string, ...string[]]);

export const eventTable = pgTable('events_table',{
    eventId: uuid('event_id').primaryKey().defaultRandom(),
    eventTitle: varchar('event_title',{length: 100}).notNull(),
    eventContent: text().notNull(),
    eventCoverImage: varchar('event_cover_image',{length: 500}),
    eventVisibilityType: eventVisibilityEnum('event_visibility_type').notNull().default(EventVisibilityEnum.TARGET_ONLY),
    departmentId: uuid('department_id')
        .notNull()
        .references(() => departmentTable.departmentId, { onDelete: 'cascade' }),
})