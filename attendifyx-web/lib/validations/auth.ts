import {createInsertSchema} from 'drizzle-zod';
import {z} from 'zod';
import {departmentTable} from "@/lib/db/schemas";

export const departmentSignupSchema = createInsertSchema(departmentTable, {
    departmentCode: (schema) => schema
        .min(2, "Code must be at least 2 characters")
        .max(5, "Code cannot exceed 5 characters")
        .regex(/^[A-Z]+$/, "Code must be all uppercase letters"),
    departmentName: (schema) => schema
        .min(3, "Department name is too short"),
}).pick({
    departmentCode: true,
    departmentName: true,
}).extend({
    email: z.email("Please enter a valid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
        // Check for at least one lowercase letter
        .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
        // Check for at least one number
        .regex(/[0-9]/, { message: "Must contain at least one number" })
        // Check for at least one special character
        .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" }),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const departmentSigninSchema = z.object({
    email: z
        .email({message: "Invalid email address"})
        .min(1, {message: "Email is required"}),
    password: z
        .string()
        .min(1, {message: "Password is required"})
        .min(8, {message: "Password must be at least 8 characters"}),
    rememberMe: z.boolean().default(false).optional(),
});

export type DepartmentSigninInput = z.infer<typeof departmentSigninSchema>;

export type DepartmentSignupInput = z.infer<typeof departmentSignupSchema>;