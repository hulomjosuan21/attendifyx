"use client"
import {NavMain} from "@/components/layout/nav-main"
import {NavUser} from "@/components/layout/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {CalendarClock, LayoutDashboard} from "lucide-react";
import AppIcon from "@/components/AppIcon";
import {useAuth} from "@/context/AuthContext";
import {Button} from "@/components/ui/button";
import {ComponentProps, useTransition} from "react";
import {signOutAction} from "@/actions/signout-actions";

const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/events",
            icon: CalendarClock,
        },
    ],
}

export function AppSidebar({...props}: ComponentProps<typeof Sidebar>) {
    const {user} = useAuth()

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="#">
                                <AppIcon/>
                                <span className="text-base font-semibold">AttendifyX.</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain}/>
            </SidebarContent>
            <SidebarFooter>
                {user && <NavUser user={user}/>}
            </SidebarFooter>
        </Sidebar>
    )
}
