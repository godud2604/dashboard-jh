export function calculateMetrics(seller: any) {
  // 참여도(Engagement)
  const engagement = seller.avgProductLikes / (seller.followerCount + 1)

  // 상품당수익
  const revenuePerProduct = seller.revenue / (seller.productCount + 1)

  // 팔로워수익전환율
  const conversionRate = seller.revenue / (seller.followerCount + 1)

  // 활동지수
  const maxProductCount = 5000
  const maxLikes = 1000
  const activityIndex = (seller.productCount / maxProductCount) * 0.5 + (seller.avgProductLikes / maxLikes) * 0.5

  // 신뢰지수
  const trustIndex = (seller.authPassRate / 100) * 0.5 + (seller.badgeLevel / 3) * 0.5

  // 우선순위점수
  const revenuNorm = Math.min(seller.revenue / 1000000, 1)
  const engagementNorm = Math.min(engagement * 1000, 1)
  const priorityScore = revenuNorm * 0.4 + engagementNorm * 0.2 + trustIndex * 0.2 + activityIndex * 0.2

  return {
    ...seller,
    engagement,
    revenuePerProduct,
    conversionRate,
    activityIndex,
    trustIndex,
    priorityScore,
  }
}
