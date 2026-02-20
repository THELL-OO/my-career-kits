import Link from "next/link"
import {
  FileSearch,
  FileText,
  GitCompareArrows,
  Target,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react"

const services = [
  {
    title: "Resume Analyzer",
    description:
      "Upload your resume and get an AI-powered score with smart improvement insights.",
    path: "/resume-analyzer",
    icon: FileSearch,
  },
  {
    title: "Cover Letter Generator",
    description:
      "Generate personalized cover letters tailored to your job application.",
    path: "/cover-letter",
    icon: FileText,
  },
  {
    title: "Job Match Analyzer",
    description:
      "Compare your resume with job descriptions and get a compatibility score.",
    path: "/job-match",
    icon: GitCompareArrows,
  },
  {
    title: "Skill Gap Detector",
    description:
      "Identify missing skills required for your target role.",
    path: "/skill-gap",
    icon: Target,
  },
  {
    title: "Interview Prep Assistant",
    description:
      "Get customized interview questions based on your resume.",
    path: "/interview-prep",
    icon: MessageSquare,
  },
  {
    title: "Career Path Recommender",
    description:
      "Discover smart career growth paths powered by AI insights.",
    path: "/career-path",
    icon: TrendingUp,
  },
]

export function ServicesGrid() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            What we offer
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl font-sans">
            Six tools to accelerate your career
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
            Our AI-powered suite covers every stage of your job search, from crafting the perfect resume to preparing for your interview.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.path}
                href={service.path}
                className="group relative flex flex-col rounded-xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:bg-secondary/50"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground font-sans">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
