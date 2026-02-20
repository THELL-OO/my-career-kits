"use client"

import { useState } from "react"
import { Target, Search, CheckCircle2, XCircle } from "lucide-react"
import { ServicePageLayout } from "@/components/service-page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const existingSkills = [
  { name: "JavaScript", match: true },
  { name: "React", match: true },
  { name: "Node.js", match: true },
  { name: "HTML/CSS", match: true },
  { name: "Git", match: true },
]

const missingSkills = [
  { name: "TypeScript", priority: "High" },
  { name: "Docker", priority: "High" },
  { name: "Kubernetes", priority: "Medium" },
  { name: "CI/CD Pipelines", priority: "Medium" },
  { name: "GraphQL", priority: "Low" },
]

export default function SkillGapPage() {
  const [targetRole, setTargetRole] = useState("")
  const [currentSkills, setCurrentSkills] = useState("")
  const [analyzed, setAnalyzed] = useState(false)

  const handleDetect = () => {
    if (targetRole.trim() && currentSkills.trim()) {
      setAnalyzed(true)
    }
  }

  return (
    <ServicePageLayout
      title="Skill Gap Detector"
      description="Identify missing skills required for your target role."
      icon={Target}
    >
      <div className="flex flex-col gap-6">
        <div className="rounded-xl border border-border/60 bg-card p-6">
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="target-role" className="mb-1.5 block text-sm font-medium text-foreground">
                Target Role
              </Label>
              <Input
                id="target-role"
                placeholder="e.g., Senior Full-Stack Developer"
                className="bg-secondary/50 border-border/60 text-foreground placeholder:text-muted-foreground"
                value={targetRole}
                onChange={(e) => { setTargetRole(e.target.value); setAnalyzed(false) }}
              />
            </div>
            <div>
              <Label htmlFor="skills" className="mb-1.5 block text-sm font-medium text-foreground">
                Your Current Skills
              </Label>
              <Textarea
                id="skills"
                placeholder="List your current skills, one per line or comma-separated..."
                className="min-h-[120px] bg-secondary/50 border-border/60 text-foreground placeholder:text-muted-foreground"
                value={currentSkills}
                onChange={(e) => { setCurrentSkills(e.target.value); setAnalyzed(false) }}
              />
            </div>
            <Button
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleDetect}
              disabled={!targetRole.trim() || !currentSkills.trim()}
            >
              <Search className="h-4 w-4" />
              Detect Skill Gaps
            </Button>
          </div>
        </div>

        {analyzed && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border/60 bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground font-sans">Skills You Have</h3>
              </div>
              <ul className="flex flex-col gap-2">
                {existingSkills.map((skill) => (
                  <li key={skill.name} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border/60 bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-destructive" />
                <h3 className="text-lg font-semibold text-foreground font-sans">Skills to Acquire</h3>
              </div>
              <ul className="flex flex-col gap-2">
                {missingSkills.map((skill) => (
                  <li key={skill.name} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-foreground">
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                      {skill.name}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      skill.priority === "High"
                        ? "bg-destructive/10 text-destructive"
                        : skill.priority === "Medium"
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary text-muted-foreground"
                    }`}>
                      {skill.priority}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </ServicePageLayout>
  )
}
