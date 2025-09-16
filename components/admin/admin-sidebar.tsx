"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Users,
  Settings,
  Zap,
  Share2,
  Calendar,
  Tag,
  ImageIcon,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Posts",
    href: "/admin/posts",
    icon: FileText,
  },
  {
    title: "AI Generator",
    href: "/admin/ai-generator",
    icon: Zap,
  },
  {
    title: "Social Media",
    href: "/admin/social",
    icon: Share2,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Tag,
  },
  {
    title: "Media",
    href: "/admin/media",
    icon: ImageIcon,
  },
  {
    title: "Schedule",
    href: "/admin/schedule",
    icon: Calendar,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
    adminOnly: true,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

interface AdminSidebarProps {
  userRole?: "admin" | "editor"
}

export function AdminSidebar({ userRole }: AdminSidebarProps) {
  const pathname = usePathname()

  const filteredItems = sidebarItems.filter((item) => !item.adminOnly || userRole === "admin")

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-full">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
            <span className="text-secondary-foreground font-bold text-sm">TF</span>
          </div>
          <span className="font-bold text-lg">TrendFlow</span>
        </div>

        <nav className="space-y-2">
          {filteredItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
