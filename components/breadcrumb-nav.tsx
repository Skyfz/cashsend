'use client'

import { usePathname } from "next/navigation"
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb"

export function BreadcrumbNav() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  return (
    <div className="flex p-4">
      <AppBreadcrumb segments={segments} />
    </div>
  )
} 