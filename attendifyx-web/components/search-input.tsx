"use client"
import {useFormStatus} from "react-dom"
import {Search} from "lucide-react"
import {SidebarInput} from "@/components/ui/sidebar"
import {Spinner} from "@/components/ui/spinner";

export function SearchInput() {
    const {pending} = useFormStatus()

    return (
        <div className="relative">
            <SidebarInput
                id="search"
                name="query"
                placeholder="Search..."
                className="pl-8"
                disabled={pending}
            />
            <div className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 select-none">
                {pending ? (
                    <Spinner className="size-4"/>
                ) : (
                    <Search className="size-4 opacity-50"/>
                )}
            </div>
        </div>
    )
}