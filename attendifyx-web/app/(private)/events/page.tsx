"use client"
import {useAuth} from "@/context/AuthContext";

export default function Page() {
    const {user} = useAuth()

    return (
        <div>
            <code>{JSON.stringify(user, null, 2)}</code>
        </div>
    )
}
