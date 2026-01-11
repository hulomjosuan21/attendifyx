"use server"

import {createServerSupabaseClient} from "@/lib/supabase/server";
import {forgotPasswordSchema} from "@/lib/validations/forgot-password";
import {redirect} from "next/navigation";
import {updatePasswordSchema} from "@/lib/validations/update-password";

export async function sendPasswordResetEmailAction(rawData: unknown,token: string | null) {
    if (!token) {
        throw new Error("Security check required. Please solve the CAPTCHA.");
    }

    // 2. Ask Cloudflare if the token is valid
    const formData = new FormData();
    formData.append('secret', process.env.TURNSTILE_SECRET_KEY!);
    formData.append('response', token);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData,
    });

    const outcome = await res.json();

    if (!outcome.success) {
        throw new Error("Security verification failed. Are you a bot?");
    }

    const validated = forgotPasswordSchema.safeParse(rawData);
    if (!validated.success) throw new Error("Invalid Data");

    const {email} = validated.data;
    const supabase = await createServerSupabaseClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/callback?next=/update-password`,
    })
    if (error) {
        throw new Error(error.message);
    }
    const message = encodeURIComponent("Check your email for a reset link")
    redirect(`/auth/sign-in?message=${message}`)
}

export async function updatePasswordAction(rawData: unknown) {
    const validated = updatePasswordSchema.safeParse(rawData);
    if (!validated.success) throw new Error("Invalid Data");

    const { password } = validated.data;
    const supabase = await createServerSupabaseClient();

    const { error } = await supabase.auth.updateUser({
        password: password
    });

    if (error) {
        throw new Error(error.message)
    }
    const message = encodeURIComponent("Password updated successfully. Please sign in.");
    redirect(`/auth/sign-in?message=${message}`);
}