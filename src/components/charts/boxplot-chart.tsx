"use client"

import { useMemo } from "react"

interface BoxPlotChartProps {
  data: any[]
}

export default function BoxPlotChart({ data }: BoxPlotChartProps) {
  const stats = useMemo(() => {
    const levels = [0, 1, 2, 3]
    return levels
      .map((level) => {
        const sellers = data.filter((d) => d.badgeLevel === level)
        if (sellers.length === 0) return null

        const revenues = sellers.map((d) => d.revenue).sort((a, b) => a - b)
        const q1 = revenues[Math.floor(revenues.length * 0.25)]
        const median = revenues[Math.floor(revenues.length * 0.5)]
        const q3 = revenues[Math.floor(revenues.length * 0.75)]
        const min = Math.min(...revenues)
        const max = Math.max(...revenues)

        return { level, q1, median, q3, min, max, count: sellers.length }
      })
      .filter(Boolean)
  }, [data])

  const maxRevenue = Math.max(...stats.map((s) => s?.max || 0))

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Revenue Distribution by Badge Level</h3>

      <svg viewBox="0 0 500 300" className="w-full">
        {stats.map((stat, i) => {
          if (!stat) return null
          const x = 100 + i * 100
          const scale = 200 / maxRevenue

          return (
            <g key={i}>
              {/* Whiskers */}
              <line
                x1={x}
                y1={250 - stat.min * scale}
                x2={x}
                y2={250 - stat.max * scale}
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted-foreground"
              />

              {/* Box */}
              <rect
                x={x - 20}
                y={250 - stat.q3 * scale}
                width={40}
                height={(stat.q3 - stat.q1) * scale}
                fill="currentColor"
                className="text-primary"
                opacity="0.6"
              />

              {/* Median line */}
              <line
                x1={x - 20}
                y1={250 - stat.median * scale}
                x2={x + 20}
                y2={250 - stat.median * scale}
                stroke="white"
                strokeWidth="2"
              />

              {/* Label */}
              <text x={x} y={270} textAnchor="middle" className="text-xs" fill="currentColor">
                L{stat.level}
              </text>
              <text x={x} y={285} textAnchor="middle" className="text-xs" fill="currentColor">
                n={stat.count}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
