"use client"

import { useState } from "react"
import { GitCompareArrows, ArrowRight } from "lucide-react"
import { ServicePageLayout } from "@/components/service-page-layout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

const matchResults = [
  { category: "Technical Skills", score: 85 },
  { category: "Experience Level", score: 72 },
  { category: "Education", score: 90 },
  { category: "Soft Skills", score: 68 },
  { category: "Industry Knowledge", score: 78 },
]

export default function JobMatchPage() {
  const [resume, setResume] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [matched, setMatched] = useState(false)

  const handleMatch = () => {
    if (resume.trim() && jobDescription.trim()) {
      setMatched(true)
    }
  }

  const overallScore = Math.round(matchResults.reduce((a, b) => a + b.score, 0) / matchResults.length)

  return (
    <ServicePageLayout
      title="Job Match Analyzer"
      description="Compare your resume with job descriptions and get a compatibility score."
      icon={GitCompareArrows}
    >
      <div className="flex flex-col gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border/60 bg-card p-6">
            <Label htmlFor="resume" className="mb-3 block text-sm font-medium text-foreground">
              Your Resume
            </Label>
            <Textarea
              id="resume"
              placeholder="Paste your resume text..."
              className="min-h-[180px] bg-secondary/50 border-border/60 text-foreground placeholder:text-muted-foreground"
              value={resume}
              onChange={(e) => { setResume(e.target.value); setMatched(false) }}
            />
          </div>

          <div className="rounded-xl border border-border/60 bg-card p-6">
            <Label htmlFor="job-desc" className="mb-3 block text-sm font-medium text-foreground">
              Job Description
            </Label>
            <Textarea
              id="job-desc"
              placeholder="Paste the job description..."
              className="min-h-[180px] bg-secondary/50 border-border/60 text-foreground placeholder:text-muted-foreground"
              value={jobDescription}
              onChange={(e) => { setJobDescription(e.target.value); setMatched(false) }}
            />
          </div>
        </div>

        <Button
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={handleMatch}
          disabled={!resume.trim() || !jobDescription.trim()}
        >
          <ArrowRight className="h-4 w-4" />
          Compare Match
        </Button>

        {matched && (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-border/60 bg-card p-6 text-center">
              <p className="mb-2 text-sm text-muted-foreground">Overall Match Score</p>
              <span className="text-5xl font-bold text-primary font-sans">{overallScore}%</span>
            </div>

            <div className="rounded-xl border border-border/60 bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground font-sans">Category Breakdown</h3>
              <div className="flex flex-col gap-4">
                {matchResults.map((result) => (
                  <div key={result.category} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{result.category}</span>
                      <span className="font-medium text-primary font-sans">{result.score}%</span>
                    </div>
                    <Progress value={result.score} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ServicePageLayout>
  )
}
