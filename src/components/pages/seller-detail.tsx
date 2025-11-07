"use client"

import { useState } from "react"
import SellerProfile from "@/components/seller-profile"
import SellerTable from "@/components/seller-table"

interface SellerDetailPageProps {
  data: any[]
}

export default function SellerDetailPage({ data }: SellerDetailPageProps) {
  const [selectedSeller, setSelectedSeller] = useState(data[0])

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold">판매자 상세 분석</h2>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <SellerTable data={data} onSelectSeller={setSelectedSeller} highlightedSeller={selectedSeller} />
        </div>

        {selectedSeller && (
          <div>
            <SellerProfile seller={selectedSeller} similarSellers={data.slice(1, 6)} />
          </div>
        )}
      </div>
    </div>
  )
}
