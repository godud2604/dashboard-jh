"use client"

import { useMemo } from "react"

interface CorrelationMatrixProps {
  data: any[]
}

export default function CorrelationMatrix({ data }: CorrelationMatrixProps) {
  const correlation = useMemo(() => {
    const metrics = ["revenue", "followerCount", "productCount", "authPassRate", "engagement"]
    const corr = Array(5)
      .fill(null)
      .map(() => Array(5).fill(0))

    // 간단한 피어슨 상관계수 계산
    metrics.forEach((m1, i) => {
      metrics.forEach((m2, j) => {
        if (i === j) {
          corr[i][j] = 1
        } else if (i < j) {
          let sum = 0
          const mean1 = data.reduce((s, d: any) => s + d[m1], 0) / data.length
          const mean2 = data.reduce((s, d: any) => s + d[m2], 0) / data.length
          const std1 = Math.sqrt(data.reduce((s, d: any) => s + Math.pow(d[m1] - mean1, 2), 0) / data.length)
          const std2 = Math.sqrt(data.reduce((s, d: any) => s + Math.pow(d[m2] - mean2, 2), 0) / data.length)

          data.forEach((d: any) => {
            sum += ((d[m1] - mean1) / std1) * ((d[m2] - mean2) / std2)
          })
          corr[i][j] = corr[j][i] = sum / data.length
        }
      })
    })

    return { corr, metrics }
  }, [data])

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Correlation Matrix</h3>

      <div className="overflow-x-auto">
        <table className="text-xs">
          <thead>
            <tr>
              <th />
              {correlation.metrics.map((m) => (
                <th key={m} className="px-2 py-1 text-muted-foreground">
                  {m.slice(0, 4)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {correlation.corr.map((row, i) => (
              <tr key={i}>
                <td className="px-2 py-1 text-muted-foreground text-right">{correlation.metrics[i].slice(0, 4)}</td>
                {row.map((val, j) => {
                  const intensity = Math.abs(val)
                  const color = val > 0 ? `rgba(88, 199, 255, ${intensity})` : `rgba(244, 63, 94, ${intensity})`
                  return (
                    <td
                      key={j}
                      className="w-12 h-8 border border-muted/20"
                      style={{ backgroundColor: color }}
                      title={`${val.toFixed(2)}`}
                    >
                      <span className="text-xs text-foreground">{val.toFixed(2)}</span>
                    </td>
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
