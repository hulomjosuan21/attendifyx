import {z} from "zod";

export const forgotPasswordSchema = z.object({
    email: z
        .email({message: "Invalid email address"})
        .min(1, {message: "Email is required"}),
})

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;