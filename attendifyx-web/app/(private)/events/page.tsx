"use client"
import {useAuth} from "@/context/AuthContext";
import {useTransition} from "react";
import {signOutAction} from "@/actions/signout-actions";
import {Button} from "@/components/ui/button";

export default function Page() {
    const {user} = useAuth()
    const [isPending, startTransition] = useTransition()

    const handleSignOut = () => {
        startTransition(() => signOutAction())
    }

  return (
    <div>
        <Button onClick={handleSignOut} disabled={isPending}>Sign Out</Button>
      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
    </div>
  )
}
