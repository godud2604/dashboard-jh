"use client"
import BoxPlotChart from "@/components/charts/boxplot-chart"
import HeatmapChart from "@/components/charts/heatmap-chart"
import ParetoChart from "@/components/charts/pareto-chart"

interface SegmentsPageProps {
  data: any[]
}

export default function SegmentsPage({ data }: SegmentsPageProps) {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold">집단 분석</h2>

      <div className="grid grid-cols-2 gap-8">
        <BoxPlotChart data={data} />
        <ParetoChart data={data} />
      </div>

      <div className="w-full">
        <HeatmapChart data={data} />
      </div>
    </div>
  )
}
