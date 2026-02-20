import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* AI badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm text-primary backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="font-medium">AI-Powered Career Acceleration</span>
          </div>

          <h1 className="text-balance font-mono text-5xl font-extrabold leading-tight tracking-tight text-foreground md:text-7xl md:leading-tight">
            Your Career Toolkit.{" "}
            <em className="font-mono italic text-primary">Supercharged.</em>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Eliminate guesswork and unlock seamless career acceleration with six AI-powered tools.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8 shadow-lg shadow-primary/20">
              Explore Tools
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-border text-foreground hover:bg-secondary gap-2 px-8">
              Learn More
            </Button>
          </div>

          {/* Trust badge below buttons */}
          <div className="mt-10 flex flex-col items-center gap-3 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-background"
                  style={{ backgroundColor: `oklch(0.${3 + i * 1} 0.08 ${160 + i * 25})` }}
                />
              ))}
            </div>
            <span>Trusted by 10,000+ users worldwide</span>
          </div>
        </div>
      </div>
    </section>
  )
}
