import {ReactNode} from "react";
import {AuthProvider} from "@/context/AuthContext";
import {createServerSupabaseClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/layout/sidebar";
import {SiteHeader} from "@/components/layout/site-header";

export default async function PrivatePagesLayout({children}: { children: React.ReactNode }) {
    const supabase = await createServerSupabaseClient();
    const {data: {user}} = await supabase.auth.getUser();
    if (!user) {
        redirect('/auth/sign-in');
    }

    return (
        <AuthProvider initialUser={user}>
            {/* 1. Ensure SidebarProvider takes full height and prevents body scroll */}
            <SidebarProvider
                className="h-screen overflow-hidden"
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar variant="inset"/>
                {children}
            </SidebarProvider>
        </AuthProvider>
    );
}