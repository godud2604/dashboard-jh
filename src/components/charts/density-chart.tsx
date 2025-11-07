"use client"

interface DensityChartProps {
  data: any[]
}

export default function DensityChart({ data }: DensityChartProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Product Count vs Engagement</h3>
      <p className="text-sm text-muted-foreground mb-4">2D Density Distribution</p>

      <svg viewBox="0 0 400 400" className="w-full aspect-square bg-muted/10 rounded-lg">
        {/* Hexbin visualization */}
        {data.slice(0, 200).map((d, i) => {
          const x = (d.productCount / Math.max(...data.map((m) => m.productCount))) * 350 + 25
          const y = 350 - (d.engagement / Math.max(...data.map((m) => m.engagement))) * 350 + 25
          return <circle key={i} cx={x} cy={y} r="3" fill="currentColor" className="text-accent" opacity="0.3" />
        })}

        {/* Axes */}
        <line x1="25" y1="25" x2="25" y2="375" stroke="currentColor" strokeWidth="1" className="text-border" />
        <line x1="25" y1="375" x2="375" y2="375" stroke="currentColor" strokeWidth="1" className="text-border" />
      </svg>
    </div>
  )
}
