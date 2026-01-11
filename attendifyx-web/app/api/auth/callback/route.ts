import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/events";

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    if (code) {
        const supabase = await createServerSupabaseClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            return NextResponse.redirect(`${baseUrl}${next}`);
        }
    }

    return NextResponse.redirect(`${baseUrl}/auth/auth-code-error`);
}