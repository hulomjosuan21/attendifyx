"use client"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {CircleUserRound, EllipsisVertical, LogOut, User as UserIcon} from "lucide-react";
import {User} from "@supabase/supabase-js";
import {useTransition} from "react";
import {signOutAction} from "@/actions/signout-actions";

export function NavUser({user}: { user: User }) {
    const {isMobile} = useSidebar()
    const [isPending, startTransition] = useTransition()

    const handleSignOut = (e: Event) => {
        e.preventDefault();
        startTransition(() => signOutAction())
    }

    // 1. Extract data from Supabase user_metadata
    const avatarUrl = user.user_metadata?.avatar_url;
    const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || "User";

    // 2. Generate initials for the fallback (e.g., "Josuan Leonardo" -> "JL")
    const initials = fullName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={avatarUrl} alt={fullName}/>
                                <AvatarFallback
                                    className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    {initials || <UserIcon className="size-4"/>}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{fullName}</span>
                                <span className="text-muted-foreground truncate text-xs">
                                    {user.email}
                                </span>
                            </div>
                            <EllipsisVertical className="ml-auto size-4"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={avatarUrl} alt={fullName}/>
                                    <AvatarFallback
                                        className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{fullName}</span>
                                    <span className="text-muted-foreground truncate text-xs">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <CircleUserRound className="mr-2 size-4"/>
                                Account
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                            className="text-destructive focus:text-destructive cursor-pointer"
                            onSelect={handleSignOut}
                            disabled={isPending}
                        >
                            <LogOut className="mr-2 size-4"/>
                            {isPending ? "Logging out..." : "Log out"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}