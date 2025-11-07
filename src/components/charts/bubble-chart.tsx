"use client"

import { useMemo } from "react"

interface BubbleChartProps {
  data: any[]
}

export default function BubbleChart({ data }: BubbleChartProps) {
  const maxBubbleSize = 60
  const minBubbleSize = 10

  const bubbles = useMemo(() => {
    const maxRevenue = Math.max(...data.map((d) => d.revenue))
    const maxFollowers = Math.max(...data.map((d) => d.followerCount))
    const maxProducts = Math.max(...data.map((d) => d.productCount))

    return data
      .filter((_, i) => i < 100)
      .map((d) => ({
        ...d,
        x: (d.followerCount / maxFollowers) * 100,
        y: (d.revenue / maxRevenue) * 100,
        size: (d.productCount / maxProducts) * (maxBubbleSize - minBubbleSize) + minBubbleSize,
        color: `hsl(${200 + d.badgeLevel * 30}, 70%, 50%)`,
      }))
  }, [data])

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Seller Distribution</h3>
      <p className="text-sm text-muted-foreground mb-4">
        X: Followers | Y: Revenue | Size: Products | Color: Badge Level
      </p>

      <svg viewBox="0 0 100 100" className="w-full aspect-square bg-muted/10 rounded-lg">
        {/* Grid */}
        {[0, 25, 50, 75, 100].map((i) => (
          <line
            key={`v-${i}`}
            x1={i}
            y1="0"
            x2={i}
            y2="100"
            stroke="currentColor"
            strokeWidth="0.2"
            className="text-muted"
          />
        ))}
        {[0, 25, 50, 75, 100].map((i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i}
            x2="100"
            y2={i}
            stroke="currentColor"
            strokeWidth="0.2"
            className="text-muted"
          />
        ))}

        {/* Bubbles */}
        {bubbles.map((bubble, i) => (
          <circle
            key={i}
            cx={bubble.x}
            cy={100 - bubble.y}
            r={bubble.size / 10}
            fill={bubble.color}
            opacity="0.6"
            className="hover:opacity-100 transition-opacity cursor-pointer"
          />
        ))}
      </svg>
    </div>
  )
}
