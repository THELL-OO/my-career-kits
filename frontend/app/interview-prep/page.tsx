"use client"

import { useState } from "react"
import { MessageSquare, Sparkles, ChevronDown, ChevronUp } from "lucide-react"
import { ServicePageLayout } from "@/components/service-page-layout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const sampleQuestions = [
  {
    question: "Tell me about a time you had to debug a complex production issue. How did you approach it?",
    tip: "Use the STAR method (Situation, Task, Action, Result). Focus on your systematic approach and the impact of your solution.",
    category: "Behavioral",
  },
  {
    question: "How would you design a scalable notification system for a social media application?",
    tip: "Discuss pub/sub patterns, message queues, and how you'd handle millions of users. Mention trade-offs between push and pull.",
    category: "System Design",
  },
  {
    question: "What is the difference between a stack and a queue? When would you use each?",
    tip: "Explain LIFO vs FIFO with real examples. Mention use cases like undo functionality (stack) and task scheduling (queue).",
    category: "Technical",
  },
  {
    question: "Describe a project where you had to learn a new technology quickly. What was your approach?",
    tip: "Highlight your learning agility and resourcefulness. Mention documentation, prototyping, and seeking feedback from peers.",
    category: "Behavioral",
  },
  {
    question: "How do you ensure code quality in your projects?",
    tip: "Discuss testing strategies, code reviews, linting, CI/CD, and documentation practices. Give specific examples.",
    category: "Technical",
  },
]

export default function InterviewPrepPage() {
  const [resumeText, setResumeText] = useState("")
  const [generated, setGenerated] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const handleGenerate = () => {
    if (resumeText.trim()) {
      setGenerated(true)
    }
  }

  return (
    <ServicePageLayout
      title="Interview Prep Assistant"
      description="Get customized interview questions based on your resume."
      icon={MessageSquare}
    >
      <div className="flex flex-col gap-6">
        <div className="rounded-xl border border-border/60 bg-card p-6">
          <Label htmlFor="resume" className="mb-3 block text-sm font-medium text-foreground">
            Paste your resume
          </Label>
          <Textarea
            id="resume"
            placeholder="Paste your resume content so we can generate relevant questions..."
            className="min-h-[160px] bg-secondary/50 border-border/60 text-foreground placeholder:text-muted-foreground"
            value={resumeText}
            onChange={(e) => { setResumeText(e.target.value); setGenerated(false) }}
          />
          <Button
            className="mt-4 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleGenerate}
            disabled={!resumeText.trim()}
          >
            <Sparkles className="h-4 w-4" />
            Generate Questions
          </Button>
        </div>

        {generated && (
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-foreground font-sans">
              Practice Questions
            </h3>
            {sampleQuestions.map((q, idx) => (
              <div key={idx} className="rounded-xl border border-border/60 bg-card">
                <button
                  className="flex w-full items-center justify-between p-5 text-left"
                  onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                  aria-expanded={expandedIndex === idx}
                >
                  <div className="flex items-start gap-3 pr-4">
                    <span className="mt-0.5 shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {q.category}
                    </span>
                    <span className="text-sm font-medium text-foreground">{q.question}</span>
                  </div>
                  {expandedIndex === idx ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                </button>
                {expandedIndex === idx && (
                  <div className="border-t border-border/40 px-5 py-4">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-primary">Tip: </span>
                      {q.tip}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ServicePageLayout>
  )
}
