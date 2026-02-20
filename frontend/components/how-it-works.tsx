import { Upload, Cpu, Download } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Info",
    description:
      "Share your resume, job description, or career details. Our tools accept multiple formats.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Analysis",
    description:
      "Our advanced AI engine processes your data, comparing it against industry standards and trends.",
  },
  {
    number: "03",
    icon: Download,
    title: "Get Results",
    description:
      "Receive actionable insights, scores, and personalized recommendations to move your career forward.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            How it works
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl font-sans">
            Three simple steps
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
            Getting started is easy. Upload, analyze, and act on your results.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border/60 bg-secondary/50">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <span className="mb-2 text-xs font-bold uppercase tracking-widest text-primary font-sans">
                  Step {step.number}
                </span>
                <h3 className="mb-2 text-xl font-semibold text-foreground font-sans">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
