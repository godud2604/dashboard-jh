"use client"

import { useMemo } from "react"

interface HeatmapChartProps {
  data: any[]
}

export default function HeatmapChart({ data }: HeatmapChartProps) {
  const heatmap = useMemo(() => {
    const productBins = 5
    const authBins = 5

    const matrix = Array(authBins)
      .fill(null)
      .map(() => Array(productBins).fill(0))
    const counts = Array(authBins)
      .fill(null)
      .map(() => Array(productBins).fill(0))

    const maxProducts = Math.max(...data.map((d) => d.productCount))
    const authRanges = [0, 20, 40, 60, 80, 100]
    const productRanges = [
      0,
      maxProducts / 5,
      (maxProducts * 2) / 5,
      (maxProducts * 3) / 5,
      (maxProducts * 4) / 5,
      maxProducts,
    ]

    data.forEach((seller) => {
      let authBin = 0
      for (let i = 0; i < authRanges.length - 1; i++) {
        if (seller.authPassRate >= authRanges[i] && seller.authPassRate < authRanges[i + 1]) {
          authBin = i
          break
        }
      }

      let productBin = 0
      for (let i = 0; i < productRanges.length - 1; i++) {
        if (seller.productCount >= productRanges[i] && seller.productCount < productRanges[i + 1]) {
          productBin = i
          break
        }
      }

      matrix[authBin][productBin] += seller.revenue
      counts[authBin][productBin] += 1
    })

    const maxValue = Math.max(...matrix.flat())
    return { matrix, counts, maxValue }
  }, [data])

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Revenue Heatmap: Auth Rate × Product Count</h3>

      <div className="overflow-x-auto">
        <table className="text-xs">
          <tbody>
            {heatmap.matrix.map((row, i) => (
              <tr key={i}>
                {row.map((value, j) => {
                  const intensity = value / heatmap.maxValue
                  return (
                    <td
                      key={j}
                      className="w-12 h-12 border border-muted/20"
                      style={{
                        backgroundColor: `rgba(88, 199, 255, ${intensity})`,
                      }}
                      title={`Auth: ${i * 20}-${(i + 1) * 20}%, Revenue: $${Math.round(value)}, Count: ${heatmap.counts[i][j]}`}
                    />
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
