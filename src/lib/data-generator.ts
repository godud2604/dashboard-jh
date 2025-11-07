export function generateSampleData(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: `S${String(i + 1).padStart(6, "0")}`,
    followerCount: Math.floor(Math.random() * 1000000 + 1000),
    productCount: Math.floor(Math.random() * 5000 + 10),
    avgProductLikes: Math.floor(Math.random() * 1000 + 10),
    revenue: Math.floor(Math.random() * 10000000 + 100000),
    authPassRate: Math.random() * 100,
    badgeLevel: Math.floor(Math.random() * 4),
  }))
}
