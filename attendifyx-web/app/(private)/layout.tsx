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

                <SidebarInset className="flex flex-col h-screen overflow-hidden">
                    <SiteHeader/>
                    <main className="flex-1 overflow-y-auto px-4 md:px-6">
                        <div className="mx-auto w-full max-w-7xl">
                            <div className="@container/main flex flex-1 flex-col gap-2">
                                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </AuthProvider>
    );
}