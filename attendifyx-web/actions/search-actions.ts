"use server"
import {redirect} from "next/navigation"

const INTERNAL_PAGES = [
    {name: "events", url: "/events"},
    {name: "calendar", url: "/calendar"},
]

export async function searchAction(formData: FormData) {
    const query = formData.get("query")?.toString().toLowerCase().trim()
    if (!query) return
    const pageMatch = INTERNAL_PAGES.find(p => p.name.toLowerCase() === query)
    if (pageMatch) {
        redirect(pageMatch.url)
    }
    return
}