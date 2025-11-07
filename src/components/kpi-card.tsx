interface KPICardProps {
  label: string
  value: any
  suffix?: string
}

export default function KPICard({ label, value, suffix }: KPICardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <p className="text-muted-foreground text-sm font-medium mb-2">{label}</p>
      <p className="text-3xl font-bold text-primary">
        {value}
        {suffix && <span className="text-lg ml-1">{suffix}</span>}
      </p>
    </div>
  )
}
