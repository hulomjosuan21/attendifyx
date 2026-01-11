import {ReactNode} from "react";
import {AuthProvider} from "@/context/AuthContext";
import {createServerSupabaseClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";

export default async function PrivatePagesLayout({children}: { children: React.ReactNode }) {
    const supabase = await createServerSupabaseClient();
    const {data: {user}} = await supabase.auth.getUser();
    if (!user) {
        redirect('/auth/sign-in');
    }

    return (
        <AuthProvider initialUser={user}>
            {children}
        </AuthProvider>
    );
}