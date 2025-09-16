"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { SocialDashboard } from "@/components/social/social-dashboard"

export default function SocialMediaPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <SocialDashboard />
      </AdminLayout>
    </ProtectedRoute>
  )
}
