"use client"

import { useState, useMemo } from "react"
import OverviewPage from "@/components/pages/overview"
import SegmentsPage from "@/components/pages/segments"
import CorrelationsPage from "@/components/pages/correlations"
import SellerDetailPage from "@/components/pages/seller-detail"
import Navigation from "@/components/navigation"
import FilterPanel from "@/components/filter-panel"
import { generateSampleData } from "@/lib/data-generator"
import { calculateMetrics } from "@/lib/metrics"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("overview")
  const [filters, setFilters] = useState({
    badgeLevel: null,
    authPassRate: [0, 100],
    followers: [0, 1000000],
    productCount: [0, 10000],
  })

  // 샘플 데이터 생성 및 메트릭 계산
  const data = useMemo(() => {
    const sellers = generateSampleData(500)
    return sellers.map((seller) => calculateMetrics(seller)).sort((a, b) => b.priorityScore - a.priorityScore)
  }, [])

  // 필터 적용
  const filteredData = useMemo(() => {
    return data.filter((seller) => {
      const badge = filters.badgeLevel === null || seller.badgeLevel === filters.badgeLevel
      const auth = seller.authPassRate >= filters.authPassRate[0] && seller.authPassRate <= filters.authPassRate[1]
      const followers = seller.followerCount >= filters.followers[0] && seller.followerCount <= filters.followers[1]
      const products = seller.productCount >= filters.productCount[0] && seller.productCount <= filters.productCount[1]
      return badge && auth && followers && products
    })
  }, [data, filters])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />

      <div className="flex h-[calc(100vh-64px)]">
        <FilterPanel filters={filters} onFiltersChange={setFilters} />

        <div className="flex-1 overflow-auto">
          {currentPage === "overview" && <OverviewPage data={filteredData} />}
          {currentPage === "segments" && <SegmentsPage data={filteredData} />}
          {currentPage === "correlations" && <CorrelationsPage data={filteredData} />}
          {currentPage === "detail" && <SellerDetailPage data={filteredData} />}
        </div>
      </div>
    </main>
  )
}
