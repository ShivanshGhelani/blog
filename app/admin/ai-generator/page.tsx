"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ContentGenerator } from "@/components/ai/content-generator"

export default function AIGeneratorPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <ContentGenerator />
      </AdminLayout>
    </ProtectedRoute>
  )
}
