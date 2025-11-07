"use client"

import { useMemo } from "react"

interface HistogramChartProps {
  data: any[]
}

export default function HistogramChart({ data }: HistogramChartProps) {
  const bins = useMemo(() => {
    const ranges = [
      { label: "0-60%", min: 0, max: 60, color: "#d4445c" },
      { label: "60-80%", min: 60, max: 80, color: "#f59e0b" },
      { label: "80-90%", min: 80, max: 90, color: "#84cc16" },
      { label: "90%+", min: 90, max: 100, color: "#10b981" },
    ]

    return ranges.map((range) => {
      const sellers = data.filter((d) => d.authPassRate >= range.min && d.authPassRate < range.max)
      const avgRevenue = sellers.length > 0 ? sellers.reduce((sum, d) => sum + d.revenue, 0) / sellers.length : 0
      return { ...range, count: sellers.length, avgRevenue }
    })
  }, [data])

  const maxRevenue = Math.max(...bins.map((b) => b.avgRevenue || 0))

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Auth Rate Distribution</h3>
      <p className="text-sm text-muted-foreground mb-6">Average Revenue by Auth Rate Range</p>

      <div className="flex items-end gap-6 h-64">
        {bins.map((bin, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="w-full flex items-end justify-center gap-1 h-48">
              <div
                className="w-1/3 rounded-t transition-all hover:opacity-80"
                style={{
                  backgroundColor: bin.color,
                  height: `${(bin.avgRevenue / maxRevenue) * 100}%`,
                  opacity: 0.8,
                }}
              />
            </div>
            <div className="text-xs text-muted-foreground mt-2 text-center">
              <p>{bin.label}</p>
              <p className="text-foreground font-semibold">${Math.round(bin.avgRevenue / 1000)}K</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
