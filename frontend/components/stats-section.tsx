const stats = [
  { value: "50K+", label: "Resumes Analyzed" },
  { value: "92%", label: "User Satisfaction" },
  { value: "35K+", label: "Cover Letters Generated" },
  { value: "3x", label: "Faster Job Search" },
]

export function StatsSection() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl border border-border/60 bg-card p-10 md:p-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <span className="text-4xl font-bold text-primary md:text-5xl font-sans">
                  {stat.value}
                </span>
                <span className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
