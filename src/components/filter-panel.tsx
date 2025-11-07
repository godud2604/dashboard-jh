"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, RotateCcw } from "lucide-react"

interface FilterPanelProps {
  filters: {
    badgeLevel: number | null
    authPassRate: [number, number]
    followers: [number, number]
    productCount: [number, number]
  }
  onFiltersChange: (filters: any) => void
}

export default function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(true)

  const handleChange = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const handleResetFilters = () => {
    onFiltersChange({
      badgeLevel: null,
      authPassRate: [0, 100],
      followers: [0, 1000000],
      productCount: [0, 10000],
    })
  }

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div
        className="h-16 flex items-center justify-between px-4 border-b border-border cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-semibold text-foreground">필터</h2>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {isOpen && (
        <div className="flex-1 overflow-auto p-4 space-y-6">
          {/* Badge Level Filter */}
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-3">뱃지 레벨</label>
            <select
              value={filters.badgeLevel ?? "all"}
              onChange={(e) =>
                handleChange("badgeLevel", e.target.value === "all" ? null : Number.parseInt(e.target.value))
              }
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">전체</option>
              <option value={0}>레벨 0</option>
              <option value={1}>레벨 1</option>
              <option value={2}>레벨 2</option>
              <option value={3}>레벨 3+</option>
            </select>
          </div>

          {/* Auth Pass Rate Filter */}
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-3">
              인증율: {filters.authPassRate[0]}% - {filters.authPassRate[1]}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.authPassRate[0]}
              onChange={(e) => handleChange("authPassRate", [Number.parseInt(e.target.value), filters.authPassRate[1]])}
              className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={filters.authPassRate[1]}
              onChange={(e) => handleChange("authPassRate", [filters.authPassRate[0], Number.parseInt(e.target.value)])}
              className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer accent-primary mt-2"
            />
          </div>

          {/* Followers Filter */}
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-3">
              팔로워: {Math.round(filters.followers[0] / 1000)}K - {Math.round(filters.followers[1] / 1000)}K
            </label>
            <input
              type="range"
              min="0"
              max="1000000"
              step="10000"
              value={filters.followers[0]}
              onChange={(e) => handleChange("followers", [Number.parseInt(e.target.value), filters.followers[1]])}
              className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <input
              type="range"
              min="0"
              max="1000000"
              step="10000"
              value={filters.followers[1]}
              onChange={(e) => handleChange("followers", [filters.followers[0], Number.parseInt(e.target.value)])}
              className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer accent-primary mt-2"
            />
          </div>

          {/* Product Count Filter */}
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-3">
              상품: {filters.productCount[0]} - {filters.productCount[1]}
            </label>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={filters.productCount[0]}
              onChange={(e) => handleChange("productCount", [Number.parseInt(e.target.value), filters.productCount[1]])}
              className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={filters.productCount[1]}
              onChange={(e) => handleChange("productCount", [filters.productCount[0], Number.parseInt(e.target.value)])}
              className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer accent-primary mt-2"
            />
          </div>

          <div className="pt-4 border-t border-border">
            <button
              onClick={handleResetFilters}
              className="w-full px-3 py-2 bg-muted/50 hover:bg-muted text-foreground text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} />
              필터 초기화
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
