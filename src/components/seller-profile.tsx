interface SellerProfileProps {
  seller: any
  similarSellers: any[]
}

export default function SellerProfile({ seller, similarSellers }: SellerProfileProps) {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Seller #{seller.id}</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Priority Score</span>
            <span className="text-accent font-semibold">{seller.priorityScore.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Revenue</span>
            <span className="text-foreground">${Math.round(seller.revenue)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Followers</span>
            <span className="text-foreground">{Math.round(seller.followerCount / 1000)}K</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Products</span>
            <span className="text-foreground">{seller.productCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Engagement</span>
            <span className="text-foreground">{seller.engagement.toFixed(4)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Auth Rate</span>
            <span className="text-foreground">{seller.authPassRate.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-semibold text-foreground mb-3">Similar Sellers</h4>
        <div className="space-y-2 text-sm">
          {similarSellers.map((s) => (
            <div key={s.id} className="flex justify-between text-muted-foreground hover:text-foreground cursor-pointer">
              <span>Seller #{s.id}</span>
              <span className="text-accent">{s.priorityScore.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
