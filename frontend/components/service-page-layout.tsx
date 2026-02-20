import Link from "next/link"
import { ArrowLeft, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface ServicePageLayoutProps {
  title: string
  description: string
  icon: LucideIcon
  children: React.ReactNode
}

export function ServicePageLayout({
  title,
  description,
  icon: Icon,
  children,
}: ServicePageLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto max-w-4xl px-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-8 gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="mb-10 flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl font-sans">
                {title}
              </h1>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
