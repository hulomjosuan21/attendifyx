'use server'
import {departmentSigninSchema} from "@/lib/validations/auth";
import {createServerSupabaseClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";

export async function signInDepartmentAction(rawData: unknown) {
    const validated = departmentSigninSchema.safeParse(rawData);
    if (!validated.success) throw new Error("Invalid Data");

    const {email, password, rememberMe} = validated.data;
    const supabase = await createServerSupabaseClient();

    const {data, error} = await supabase.auth.signInWithPassword({
        email, password
    })

    if (error) throw new Error(error.message);

    return redirect('/events')
}

export async function signInWithOAuth(provider: 'google' | 'github') {
    const supabase = await createServerSupabaseClient();

    const {data, error} = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/callback?next=/events`
        }
    });

    if (error) {
        console.error("Auth error:", error.message);
        return;
    }
    if (data.url) {
        redirect(data.url);
    }
}