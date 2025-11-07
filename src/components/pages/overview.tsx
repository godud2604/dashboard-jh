"use client"

import { useMemo } from "react"
import KPICard from "@/components/kpi-card"
import BubbleChart from "@/components/charts/bubble-chart"
import HistogramChart from "@/components/charts/histogram-chart"
import SellerTable from "@/components/seller-table"

interface OverviewPageProps {
  data: any[]
}

export default function OverviewPage({ data }: OverviewPageProps) {
  const kpis = useMemo(() => {
    if (data.length === 0) return {}

    const totalRevenue = data.reduce((sum, s) => sum + s.revenue, 0)
    const avgFollowers = Math.round(data.reduce((sum, s) => sum + s.followerCount, 0) / data.length)
    const avgEngagement = (data.reduce((sum, s) => sum + s.engagement, 0) / data.length).toFixed(4)
    const avgAuthRate = Math.round(data.reduce((sum, s) => sum + s.authPassRate, 0) / data.length)

    const sortedByRevenue = [...data].sort((a, b) => b.revenue - a.revenue)
    const top10Revenue = sortedByRevenue.slice(0, Math.ceil(data.length * 0.1)).reduce((sum, s) => sum + s.revenue, 0)
    const pareto = Math.round((top10Revenue / totalRevenue) * 100)

    return {
      totalSellers: data.length,
      totalRevenue: Math.round(totalRevenue),
      avgFollowers,
      avgEngagement,
      avgAuthRate,
      pareto,
    }
  }, [data])

  return (
    <div className="p-8 space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        <KPICard label="총 판매자6" value={kpis.totalSellers} />
        <KPICard label="총 매출" value={`$${(kpis.totalRevenue / 1000000).toFixed(1)}M`} />
        <KPICard label="평균 팔로워" value={Math.round(kpis.avgFollowers / 1000)} suffix="K" />
        <KPICard label="평균 호응율" value={kpis.avgEngagement} />
        <KPICard label="평균 인증율" value={kpis.avgAuthRate} suffix="%" />
        <KPICard label="상위 10% 비중" value={kpis.pareto} suffix="%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-8">
        <BubbleChart data={data} />
        <HistogramChart data={data} />
      </div>

      {/* Top Sellers Table */}
      <div>
        <h3 className="text-lg font-semibold mb-4">우선순위 점수 상위 50개 판매자</h3>
        <SellerTable data={data.slice(0, 50)} />
      </div>
    </div>
  )
}
