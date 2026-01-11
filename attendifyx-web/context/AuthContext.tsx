'use client'

import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import {User} from '@supabase/supabase-js'
import {createBrowserSupabaseClient} from "@/lib/supabase/client";

const AuthContext = createContext<{ user: User | null }>({user: null})

export function AuthProvider({children, initialUser}: { children: ReactNode, initialUser: User | null }) {
    const [user, setUser] = useState(initialUser)
    const supabase = createBrowserSupabaseClient()

    useEffect(() => {
        const {data: {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                setUser(session.user)
            } else {
                setUser(null)
            }
        })

        return () => subscription.unsubscribe()
    }, [supabase])

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)