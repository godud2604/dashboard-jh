"use client"

import { BarChart3, TrendingUp, Network, User } from "lucide-react"

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const pages = [
    { id: "overview", label: "대시보드", icon: BarChart3 },
    { id: "segments", label: "집단 분석", icon: TrendingUp },
    { id: "correlations", label: "상관관계", icon: Network },
    { id: "detail", label: "판매자 상세", icon: User },
  ]

  return (
    <nav className="h-16 bg-card border-b border-border flex items-center px-6 gap-8">
      <h1 className="text-xl font-bold text-primary mr-4">판매자 대시보드</h1>
      <div className="flex gap-1">
        {pages.map((page) => {
          const Icon = page.icon
          const isActive = currentPage === page.id
          return (
            <button
              key={page.id}
              onClick={() => onPageChange(page.id)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{page.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
