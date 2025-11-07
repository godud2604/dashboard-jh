"use client"

import CorrelationMatrix from "@/components/charts/correlation-matrix"
import DensityChart from "@/components/charts/density-chart"

interface CorrelationsPageProps {
  data: any[]
}

export default function CorrelationsPage({ data }: CorrelationsPageProps) {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold">상관관계 분석</h2>

      <div className="grid grid-cols-2 gap-8">
        <CorrelationMatrix data={data} />
        <DensityChart data={data} />
      </div>
    </div>
  )
}
