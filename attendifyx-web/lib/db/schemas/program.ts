import {pgTable, timestamp, uuid, varchar} from "drizzle-orm/pg-core";

export const programTable = pgTable('programs_table', {
    programId: uuid('program_id').primaryKey().defaultRandom(),
    programCode: varchar('program_code', {length: 50}).notNull().unique(),
    programName: varchar('program_name', {length: 100}).notNull().unique(),
    programCreatedAt: timestamp('program_created_at',{withTimezone: true}).notNull().defaultNow(),
    programUpdatedAt: timestamp('program_updated_at', {withTimezone: true}).$onUpdateFn(() => new Date()),
})