"use client"

import { useState } from "react"

interface SellerTableProps {
  data: any[]
  onSelectSeller?: (seller: any) => void
  highlightedSeller?: any
}

export default function SellerTable({ data, onSelectSeller, highlightedSeller }: SellerTableProps) {
  const [sortConfig, setSortConfig] = useState({ key: "priorityScore", direction: "desc" })

  const sorted = [...data].sort((a, b) => {
    const key = sortConfig.key as keyof typeof a
    const aVal = a[key]
    const bVal = b[key]
    return sortConfig.direction === "asc" ? (aVal > bVal ? 1 : -1) : aVal < bVal ? 1 : -1
  })

  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "desc" ? "asc" : "desc",
    })
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th
              className="px-4 py-3 text-left text-muted-foreground font-semibold cursor-pointer hover:text-foreground"
              onClick={() => handleSort("id")}
            >
              판매자 ID
            </th>
            <th
              className="px-4 py-3 text-left text-muted-foreground font-semibold cursor-pointer hover:text-foreground"
              onClick={() => handleSort("priorityScore")}
            >
              우선순위 {sortConfig.key === "priorityScore" && (sortConfig.direction === "desc" ? "↓" : "↑")}
            </th>
            <th
              className="px-4 py-3 text-left text-muted-foreground font-semibold cursor-pointer hover:text-foreground"
              onClick={() => handleSort("revenue")}
            >
              매출
            </th>
            <th
              className="px-4 py-3 text-left text-muted-foreground font-semibold cursor-pointer hover:text-foreground"
              onClick={() => handleSort("followerCount")}
            >
              팔로워
            </th>
            <th
              className="px-4 py-3 text-left text-muted-foreground font-semibold cursor-pointer hover:text-foreground"
              onClick={() => handleSort("engagement")}
            >
              호응
            </th>
            <th
              className="px-4 py-3 text-left text-muted-foreground font-semibold cursor-pointer hover:text-foreground"
              onClick={() => handleSort("authPassRate")}
            >
              인증율
            </th>
            <th
              className="px-4 py-3 text-left text-muted-foreground font-semibold cursor-pointer hover:text-foreground"
              onClick={() => handleSort("badgeLevel")}
            >
              뱃지
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((seller) => (
            <tr
              key={seller.id}
              className={`border-b border-border hover:bg-muted/20 cursor-pointer transition-colors ${
                highlightedSeller?.id === seller.id ? "bg-primary/10" : ""
              }`}
              onClick={() => onSelectSeller?.(seller)}
            >
              <td className="px-4 py-3 text-foreground font-medium">{seller.id}</td>
              <td className="px-4 py-3 text-accent font-semibold">{seller.priorityScore.toFixed(2)}</td>
              <td className="px-4 py-3 text-foreground">${Math.round(seller.revenue)}</td>
              <td className="px-4 py-3 text-foreground">{Math.round(seller.followerCount / 1000)}K</td>
              <td className="px-4 py-3 text-foreground">{seller.engagement.toFixed(4)}</td>
              <td className="px-4 py-3 text-foreground">{seller.authPassRate.toFixed(1)}%</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-semibold">
                  L{seller.badgeLevel}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
