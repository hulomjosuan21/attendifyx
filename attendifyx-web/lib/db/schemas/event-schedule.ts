import {pgTable, uuid, varchar, customType } from "drizzle-orm/pg-core";
import {eventTable} from "@/lib/db/schemas/event";

const tstzrange = customType<{
    data: [Date, Date];
    driverData: string;
}>({
    dataType() {
        return "tstzrange";
    },
});

export const eventScheduleTable = pgTable('event_schedules_table',{
    eventScheduleId: uuid('event_schedule_id').primaryKey().defaultRandom(),
    eventId: uuid('event_id')
        .notNull()
        .references(() => eventTable.eventId, {onDelete: 'cascade'}),
    eventScheduleLabel: varchar('event_schedule_label',{length: 50}).notNull(),
    eventScheduleDatetimeRange: tstzrange('event_schedule_datetime_range').notNull()
})