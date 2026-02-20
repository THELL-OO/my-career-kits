import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ServicesGrid } from "@/components/services-grid"
import { HowItWorks } from "@/components/how-it-works"
import { StatsSection } from "@/components/stats-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen w-full relative bg-black text-foreground">
      {/* Ocean Abyss Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.72 0.15 170 / 0.2), transparent 70%), #000000",
        }}
      />

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <ServicesGrid />
          <HowItWorks />
          <StatsSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
