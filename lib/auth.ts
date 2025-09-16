export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "editor"
  avatar?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

// Mock user data for demonstration
const mockUsers = [
  {
    id: "1",
    email: "admin@trendflow.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    email: "editor@trendflow.com",
    password: "editor123",
    name: "Content Editor",
    role: "editor" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export async function signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = mockUsers.find((u) => u.email === email && u.password === password)

  if (!user) {
    return { user: null, error: "Invalid email or password" }
  }

  const { password: _, ...userWithoutPassword } = user

  // Store in localStorage for persistence
  localStorage.setItem("auth_user", JSON.stringify(userWithoutPassword))

  return { user: userWithoutPassword, error: null }
}

export async function signOut(): Promise<void> {
  localStorage.removeItem("auth_user")
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const stored = localStorage.getItem("auth_user")
  if (!stored) return null

  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}
