'use client'

import * as React from "react"
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  interface AppBreadcrumbProps {
    segments: string[]
  }
  
  export function AppBreadcrumb({ segments }: AppBreadcrumbProps) {
    const maxVisibleItems = 3
    const shouldShowEllipsis = segments.length > maxVisibleItems

    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          
          {shouldShowEllipsis && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {segments.slice(0, -maxVisibleItems).map((segment, index) => {
                      const href = `/${segments.slice(0, index + 1).join('/')}`
                      const label = segment.charAt(0).toUpperCase() + segment.slice(1)
                      return (
                        <DropdownMenuItem key={segment}>
                          <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
            </>
          )}
          
          {segments.slice(shouldShowEllipsis ? -maxVisibleItems : 0).map((segment, index, array) => {
            const href = `/${segments.slice(0, segments.length - array.length + index + 1).join('/')}`
            const label = segment.charAt(0).toUpperCase() + segment.slice(1)
            
            return (
              <React.Fragment key={segment}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {index === array.length - 1 ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    )
  }