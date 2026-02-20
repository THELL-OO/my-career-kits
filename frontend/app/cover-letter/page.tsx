"use client"

import { useState } from "react"
import { FileText, Sparkles, Copy, Check } from "lucide-react"
import { ServicePageLayout } from "@/components/service-page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const sampleLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the Software Engineer position at your company. With my background in full-stack development and passion for building scalable applications, I believe I would be a valuable addition to your team.

In my current role, I have successfully delivered multiple high-impact projects, improving system performance by 40% and reducing deployment time by 60%. My experience with React, Node.js, and cloud infrastructure aligns well with the requirements outlined in your job posting.

I am particularly drawn to your company's mission of democratizing technology and would welcome the opportunity to contribute to your innovative team. I look forward to discussing how my skills and experience can benefit your organization.

Sincerely,
[Your Name]`

export default function CoverLetterPage() {
  const [jobTitle, setJobTitle] = useState("")
  const [company, setCompany] = useState("")
  const [details, setDetails] = useState("")
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (jobTitle.trim() && company.trim()) {
      setGenerated(true)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleLetter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ServicePageLayout
      title="Cover Letter Generator"
      description="Generate personalized cover letters tailored to your job application."
      icon={FileText}
    >
      <div className="flex flex-col gap-6">
        <div className="rounded-xl border border-border/60 bg-card p-6">
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="job-title" className="mb-1.5 block text-sm font-medium text-foreground">
                Job Title
              </Label>
              <Input
                id="job-title"
                placeholder="e.g., Software Engineer"
                className="bg-secondary/50 border-border/60 text-foreground placeholder:text-muted-foreground"
                value={jobTitle}
                onChange={(e) => { setJobTitle(e.target.value); setGenerated(false) }}
              />
            </div>
            <div>
              <Label htmlFor="company" className="mb-1.5 block text-sm font-medium text-foreground">
                Company Name
              </Label>
              <Input
                id="company"
                placeholder="e.g., Acme Corp"
                className="bg-secondary/50 border-border/60 text-foreground placeholder:text-muted-foreground"
                value={company}
                onChange={(e) => { setCompany(e.target.value); setGenerated(false) }}
              />
            </div>
            <div>
              <Label htmlFor="details" className="mb-1.5 block text-sm font-medium text-foreground">
                Additional Details (optional)
              </Label>
              <Textarea
                id="details"
                placeholder="Key skills, experience highlights, or specific requirements..."
                className="min-h-[100px] bg-secondary/50 border-border/60 text-foreground placeholder:text-muted-foreground"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
            <Button
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleGenerate}
              disabled={!jobTitle.trim() || !company.trim()}
            >
              <Sparkles className="h-4 w-4" />
              Generate Cover Letter
            </Button>
          </div>
        </div>

        {generated && (
          <div className="rounded-xl border border-border/60 bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground font-sans">Generated Cover Letter</h3>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <div className="rounded-lg bg-secondary/50 p-5 text-sm leading-relaxed text-foreground whitespace-pre-line">
              {sampleLetter}
            </div>
          </div>
        )}
      </div>
    </ServicePageLayout>
  )
}
