CREATE TYPE "public"."department_role_enum" AS ENUM('department', 'school');--> statement-breakpoint
CREATE TYPE "public"."event_visibility_enum" AS ENUM('target_only', 'public');--> statement-breakpoint
CREATE TABLE "departments_table" (
	"department_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"department_code" varchar(50) NOT NULL,
	"department_name" varchar(250) NOT NULL,
	"department_image" varchar(500),
	"role" "department_role_enum" DEFAULT 'department' NOT NULL,
	"auth_id" uuid NOT NULL,
	"department_created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"department_updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "students_table" (
	"student_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_school_id" varchar(50) NOT NULL,
	"department_id" uuid NOT NULL,
	"student_image" varchar(500),
	"first_name" varchar(100) NOT NULL,
	"middle_name" varchar(100),
	"last_name" varchar(100) NOT NULL,
	"student_created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"student_updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "programs_table" (
	"program_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"program_code" varchar(50) NOT NULL,
	"program_name" varchar(100) NOT NULL,
	"program_created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"program_updated_at" timestamp with time zone,
	CONSTRAINT "programs_table_program_code_unique" UNIQUE("program_code"),
	CONSTRAINT "programs_table_program_name_unique" UNIQUE("program_name")
);
--> statement-breakpoint
CREATE TABLE "event_schedules_table" (
	"event_schedule_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid NOT NULL,
	"event_schedule_label" varchar(50) NOT NULL,
	"event_schedule_datetime_range" "tstzrange" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events_table" (
	"event_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_title" varchar(100) NOT NULL,
	"eventContent" text NOT NULL,
	"event_cover_image" varchar(500),
	"event_visibility_type" "event_visibility_enum" DEFAULT 'target_only' NOT NULL,
	"department_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "departments_table" ADD CONSTRAINT "departments_table_auth_id_users_id_fk" FOREIGN KEY ("auth_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students_table" ADD CONSTRAINT "students_table_department_id_departments_table_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments_table"("department_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_schedules_table" ADD CONSTRAINT "event_schedules_table_event_id_events_table_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events_table"("event_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events_table" ADD CONSTRAINT "events_table_department_id_departments_table_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments_table"("department_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "department_name_idx" ON "departments_table" USING btree ("department_name");--> statement-breakpoint
CREATE UNIQUE INDEX "department_auth_id_idx" ON "departments_table" USING btree ("auth_id");--> statement-breakpoint
CREATE UNIQUE INDEX "student_school_id_idx" ON "students_table" USING btree ("student_school_id");--> statement-breakpoint
CREATE INDEX "first_name_idx" ON "students_table" USING btree ("first_name");--> statement-breakpoint
CREATE INDEX "last_name_idx" ON "students_table" USING btree ("last_name");--> statement-breakpoint
CREATE INDEX "full_name_composite_idx" ON "students_table" USING btree ("last_name","first_name","middle_name");