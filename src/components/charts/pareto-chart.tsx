"use client"

import { useMemo } from "react"

interface ParetoChartProps {
  data: any[]
}

export default function ParetoChart({ data }: ParetoChartProps) {
  const paretoData = useMemo(() => {
    const sorted = [...data].sort((a, b) => b.revenue - a.revenue)
    const totalRevenue = sorted.reduce((sum, d) => sum + d.revenue, 0)

    let cumulativeRevenue = 0
    return sorted.slice(0, Math.min(50, data.length)).map((d, i) => {
      cumulativeRevenue += d.revenue
      return {
        index: i + 1,
        revenue: d.revenue,
        percentage: (cumulativeRevenue / totalRevenue) * 100,
      }
    })
  }, [data])

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Pareto Analysis</h3>
      <p className="text-sm text-muted-foreground mb-4">Top sellers contribution to total revenue</p>

      <svg viewBox="0 0 500 300" className="w-full">
        {/* Bar chart */}
        {paretoData.map((d, i) => (
          <rect
            key={i}
            x={10 + i * 9}
            y={250 - (d.revenue / Math.max(...paretoData.map((p) => p.revenue))) * 200}
            width="8"
            height={(d.revenue / Math.max(...paretoData.map((p) => p.revenue))) * 200}
            fill="currentColor"
            className="text-chart-1"
            opacity="0.7"
          />
        ))}

        {/* Line chart */}
        <polyline
          points={paretoData.map((d, i) => `${10 + i * 9 + 4}, ${250 - (d.percentage / 100) * 200}`).join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-chart-2"
        />

        {/* Axis */}
        <line x1="10" y1="250" x2="500" y2="250" stroke="currentColor" strokeWidth="1" className="text-border" />
        <line x1="10" y1="50" x2="10" y2="250" stroke="currentColor" strokeWidth="1" className="text-border" />
      </svg>
    </div>
  )
}
