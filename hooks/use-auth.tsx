"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { type AuthState, signIn as authSignIn, signOut as authSignOut, getCurrentUser } from "@/lib/auth"

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    const user = getCurrentUser()
    setAuthState({
      user,
      isLoading: false,
      isAuthenticated: !!user,
    })
  }, [])

  const signIn = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    const { user, error } = await authSignIn(email, password)

    if (user) {
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      })
      return { success: true }
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return { success: false, error: error || "Authentication failed" }
    }
  }

  const signOut = async () => {
    await authSignOut()
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    })
  }

  return <AuthContext.Provider value={{ ...authState, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
