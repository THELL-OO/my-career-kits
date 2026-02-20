"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  FileSearch,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Loader2,
  Check,
  X,
} from "lucide-react"
import { ServicePageLayout } from "@/components/service-page-layout"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface AnalysisResult {
  filename: string
  size: number
  score: number
  message: string
}

const SCAN_STEPS = [
  { label: "Scanning your file", duration: 1200 },
  { label: "Parsing resume content", duration: 1500 },
  { label: "Analyzing your experience", duration: 2000 },
  { label: "Extracting your skills", duration: 1500 },
  { label: "Generating insights", duration: 1800 },
]

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState("")
  const [currentStep, setCurrentStep] = useState(-1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback((selected: File | null) => {
    if (!selected) return
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!validTypes.includes(selected.type)) {
      setError("Please upload a PDF, DOC, or DOCX file.")
      return
    }
    if (fileUrl) URL.revokeObjectURL(fileUrl)
    setFile(selected)
    setFileUrl(URL.createObjectURL(selected))
    setResult(null)
    setError("")
    setCurrentStep(-1)
    setCompletedSteps([])
  }, [fileUrl])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files?.[0] ?? null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files?.[0] ?? null)
  }

  const runScanSteps = (): Promise<void> => {
    return new Promise((resolve) => {
      let stepIndex = 0
      setCompletedSteps([])
      setCurrentStep(0)

      const runNext = () => {
        if (stepIndex >= SCAN_STEPS.length) {
          resolve()
          return
        }
        setCurrentStep(stepIndex)
        setTimeout(() => {
          setCompletedSteps((prev) => [...prev, stepIndex])
          stepIndex++
          runNext()
        }, SCAN_STEPS[stepIndex].duration)
      }
      runNext()
    })
  }

  const handleSubmit = async () => {
    if (!file) return

    setLoading(true)
    setError("")
    setResult(null)

    // Run scanning animation
    const scanPromise = runScanSteps()

    // API call in parallel
    const formData = new FormData()
    formData.append("resume_file", file)

    try {
      const [, response] = await Promise.all([
        scanPromise,
        fetch("https://api.mycareerkits.com/analyze-resume", {
          method: "POST",
          body: formData,
        }),
      ])

      if (!response.ok) {
        throw new Error("Failed to analyze resume")
      }

      const data = await response.json()
      setResult(data)
    } catch {
      // If API fails, show scan complete but with error
      setError("Something went wrong while analyzing. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const removeFile = () => {
    if (fileUrl) URL.revokeObjectURL(fileUrl)
    setFile(null)
    setFileUrl(null)
    setResult(null)
    setError("")
    setCurrentStep(-1)
    setCompletedSteps([])
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl)
    }
  }, [fileUrl])

  return (
    <ServicePageLayout
      title="Resume Analyzer"
      description="Upload your resume and get an AI-powered score with smart improvement insights."
      icon={FileSearch}
    >
      <div className="flex flex-col gap-6">
        {/* Upload Area */}
        {!file && (
          <div
            className={`rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
              dragOver
                ? "border-primary bg-primary/5"
                : "border-border/60 bg-card hover:border-primary/50"
            }`}
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="fileUpload"
            />
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Upload className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">
                  Drop your resume here
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  or{" "}
                  <label
                    htmlFor="fileUpload"
                    className="cursor-pointer font-medium text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    click to browse
                  </label>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Supports PDF, DOC, DOCX
                </p>
              </div>
            </div>
          </div>
        )}

        {/* File Selected - Show file info + analyze button */}
        {file && !loading && !result && (
          <div className="rounded-xl border border-border/60 bg-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Button
              className="mt-5 w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSubmit}
            >
              <FileSearch className="h-4 w-4" />
              Analyze Resume
            </Button>
          </div>
        )}

        {/* Scanning Steps */}
        {loading && (
          <div className="rounded-xl border border-border/60 bg-card p-6">
            <h3 className="mb-5 text-base font-semibold text-foreground">
              Analyzing your resume
            </h3>
            <div className="flex flex-col gap-4">
              {SCAN_STEPS.map((step, index) => {
                const isCompleted = completedSteps.includes(index)
                const isActive = currentStep === index && !isCompleted
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ${
                        isCompleted
                          ? "bg-primary text-primary-foreground"
                          : isActive
                            ? "border-2 border-primary bg-transparent"
                            : "border border-border bg-secondary/50"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-4 w-4" />
                      ) : isActive ? (
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                      )}
                    </div>
                    <span
                      className={`text-sm transition-colors ${
                        isCompleted
                          ? "font-medium text-foreground"
                          : isActive
                            ? "font-medium text-primary"
                            : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
            <Button
              className="mt-3 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              size="sm"
              onClick={removeFile}
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="flex flex-col gap-5">
            {/* Score Card */}
            <div className="rounded-xl border border-border/60 bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Resume Score
              </h3>
              <div className="flex items-center gap-4">
                <Progress value={result.score} className="h-3 flex-1" />
                <span className="text-2xl font-bold text-primary">
                  {result.score}/100
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{result.message}</p>
            </div>

            {/* Details Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <div className="mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold text-foreground">File Info</h4>
                </div>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <p>
                    <span className="text-foreground">Filename:</span>{" "}
                    {result.filename}
                  </p>
                  <p>
                    <span className="text-foreground">Size:</span>{" "}
                    {(result.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border/60 bg-card p-6">
                <div className="mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Status</h4>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  {SCAN_STEPS.map((step, i) => (
                    <div key={i} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-primary" />
                      <span>{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resume Preview */}
            {fileUrl && file?.type === "application/pdf" && (
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  Resume Preview
                </h3>
                <div className="overflow-hidden rounded-lg border border-border/40">
                  <iframe
                    src={fileUrl}
                    title="Resume preview"
                    className="h-[600px] w-full bg-white"
                  />
                </div>
              </div>
            )}

            {/* Upload another */}
            <Button
              variant="outline"
              className="gap-2 border-border text-foreground hover:bg-secondary"
              onClick={removeFile}
            >
              <Upload className="h-4 w-4" />
              Analyze Another Resume
            </Button>
          </div>
        )}
      </div>
    </ServicePageLayout>
  )
}
