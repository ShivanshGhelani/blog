import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="h-5 w-5 text-secondary" />
          <span className="text-secondary font-medium">AI-Powered Content</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
          Discover the Latest
          <span className="text-secondary"> Affiliate Trends</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Stay ahead of the curve with AI-generated insights, trending products, and expert analysis in the world of
          affiliate marketing.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button size="lg" className="bg-secondary hover:bg-secondary/90">
            Explore Trends
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-semibold">Real-time Trends</h3>
            <p className="text-sm text-muted-foreground text-center">
              AI-powered analysis of the hottest affiliate products and niches
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-semibold">Smart Insights</h3>
            <p className="text-sm text-muted-foreground text-center">
              Data-driven recommendations to maximize your affiliate earnings
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Zap className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-semibold">Automated Content</h3>
            <p className="text-sm text-muted-foreground text-center">
              Fresh, SEO-optimized content generated automatically
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
