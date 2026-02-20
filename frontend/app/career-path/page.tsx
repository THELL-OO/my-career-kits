"use client"

import { useState } from "react"
import { TrendingUp, Sparkles, ArrowRight } from "lucide-react"
import { ServicePageLayout } from "@/components/service-page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const careerPaths = [
  {
    title: "Engineering Manager",
    timeline: "2-3 years",
    description: "Transition from IC to leading a team of engineers. Focus on people management, project delivery, and technical strategy.",
    nextSteps: ["Lead a small team or project", "Develop mentoring skills", "Take management training courses"],
  },
  {
    title: "Staff Engineer",
    timeline: "3-4 years",
    description: "Deepen your technical expertise and influence. Drive architectural decisions and mentor senior engineers across teams.",
    nextSteps: ["Own a critical system end-to-end", "Write RFCs and technical design docs", "Contribute to open source"],
  },
  {
    title: "Product Engineer",
    timeline: "1-2 years",
    description: "Blend engineering skills with product sense. Work closely with designers and PMs to ship user-facing features.",
    nextSteps: ["Participate in product discovery", "Learn UX research basics", "Build and ship a side project"],
  },
]

export default function CareerPathPage() {
  const [currentRole, setCurrentRole] = useState("")
  const [experience, setExperience] = useState("")
  const [interests, setInterests] = useState("")
  const [explored, setExplored] = useState(false)

  const handleExplore = () => {
    if (currentRole.trim()) {
      setExplored(true)
    }
  }

  return (
    <ServicePageLayout
      title="Career Path Recommender"
      description="Discover smart career growth paths powered by AI insights."
      icon={TrendingUp}
    >
      <div className="flex flex-col gap-6">
        <div className="rounded-xl border border-border/60 bg-card p-6">
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="current-role" className="mb-1.5 block text-sm font-medium text-foreground">
                Current Role
              </Label>
              <Input
                id="current-role"
                placeholder="e.g., Senior Software Engineer"
                className="bg-secondary/50 border-border/60 text-foreground placeholder:text-muted-foreground"
                value={currentRole}
                onChange={(e) => { setCurrentRole(e.target.value); setExplored(false) }}
              />
            </div>
            <div>
              <Label htmlFor="experience" className="mb-1.5 block text-sm font-medium text-foreground">
                Years of Experience
              </Label>
              <Input
                id="experience"
                placeholder="e.g., 5"
                className="bg-secondary/50 border-border/60 text-foreground placeholder:text-muted-foreground"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="interests" className="mb-1.5 block text-sm font-medium text-foreground">
                Career Interests (optional)
              </Label>
              <Textarea
                id="interests"
                placeholder="What excites you? Leadership, deep technical work, product building..."
                className="min-h-[80px] bg-secondary/50 border-border/60 text-foreground placeholder:text-muted-foreground"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
            <Button
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleExplore}
              disabled={!currentRole.trim()}
            >
              <Sparkles className="h-4 w-4" />
              Explore Paths
            </Button>
          </div>
        </div>

        {explored && (
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-foreground font-sans">
              Recommended Career Paths
            </h3>
            {careerPaths.map((path) => (
              <div key={path.title} className="rounded-xl border border-border/60 bg-card p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-foreground font-sans">{path.title}</h4>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {path.timeline}
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {path.description}
                </p>
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
                    Next Steps
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {path.nextSteps.map((step) => (
                      <li key={step} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="h-3 w-3 text-primary" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ServicePageLayout>
  )
}
