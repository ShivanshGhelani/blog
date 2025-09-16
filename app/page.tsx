import { BlogHeader } from "@/components/blog-header"
import { HeroSection } from "@/components/hero-section"
import { BlogPostCard } from "@/components/blog-post-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, Filter } from "lucide-react"

// Mock data for demonstration
const mockPosts = [
  {
    id: "1",
    title: "Top 10 AI Tools That Are Revolutionizing Affiliate Marketing in 2024",
    excerpt:
      "Discover the cutting-edge AI tools that successful affiliate marketers are using to automate their workflows, optimize conversions, and scale their businesses.",
    category: "AI Tools",
    readTime: "8 min read",
    views: 12500,
    trending: true,
    publishedAt: "2024-01-15",
    imageUrl: "/ai-tools-dashboard-interface.jpg",
    slug: "top-ai-tools-affiliate-marketing-2024",
  },
  {
    id: "2",
    title: "Amazon Associates Program: Complete Guide to Maximizing Your Earnings",
    excerpt:
      "Learn the insider strategies and optimization techniques that top Amazon affiliates use to generate consistent six-figure incomes.",
    category: "Amazon",
    readTime: "12 min read",
    views: 8900,
    trending: false,
    publishedAt: "2024-01-12",
    imageUrl: "/amazon-affiliate-marketing-dashboard.jpg",
    slug: "amazon-associates-complete-guide",
  },
  {
    id: "3",
    title: "Social Media Automation: How to Scale Your Affiliate Content Across Platforms",
    excerpt: "Master the art of cross-platform content distribution with these proven automation strategies and tools.",
    category: "Social Media",
    readTime: "6 min read",
    views: 15200,
    trending: true,
    publishedAt: "2024-01-10",
    imageUrl: "/social-media-automation-dashboard.png",
    slug: "social-media-automation-affiliate-content",
  },
  {
    id: "4",
    title: "Email Marketing Funnels That Convert: A Data-Driven Approach",
    excerpt:
      "Analyze real conversion data from successful affiliate email campaigns and learn how to replicate their success.",
    category: "Email Marketing",
    readTime: "10 min read",
    views: 6700,
    trending: false,
    publishedAt: "2024-01-08",
    imageUrl: "/email-marketing-funnel-analytics.jpg",
    slug: "email-marketing-funnels-data-driven",
  },
  {
    id: "5",
    title: "SEO Secrets: How to Rank Affiliate Content in 2024",
    excerpt:
      "The latest SEO strategies and algorithm updates you need to know to dominate search results with your affiliate content.",
    category: "SEO",
    readTime: "9 min read",
    views: 11300,
    trending: true,
    publishedAt: "2024-01-05",
    imageUrl: "/seo-analytics-dashboard.png",
    slug: "seo-secrets-affiliate-content-2024",
  },
  {
    id: "6",
    title: "Cryptocurrency Affiliate Programs: The Ultimate Guide to High-Converting Offers",
    excerpt:
      "Navigate the lucrative world of crypto affiliate marketing with our comprehensive guide to the best programs and strategies.",
    category: "Cryptocurrency",
    readTime: "7 min read",
    views: 9800,
    trending: false,
    publishedAt: "2024-01-03",
    imageUrl: "/cryptocurrency-trading-dashboard.png",
    slug: "cryptocurrency-affiliate-programs-guide",
  },
]

const categories = ["All", "AI Tools", "Amazon", "Social Media", "Email Marketing", "SEO", "Cryptocurrency"]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <BlogHeader />
      <HeroSection />

      <main className="container mx-auto px-4 py-12">
        {/* Trending Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-secondary" />
            <h2 className="text-2xl font-bold">Trending Now</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPosts
              .filter((post) => post.trending)
              .map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
          </div>
        </section>

        {/* All Posts Section */}
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-secondary" />
              <h2 className="text-2xl font-bold">Latest Articles</h2>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={category === "All" ? "default" : "outline"}
                    className="cursor-pointer hover:bg-secondary hover:text-secondary-foreground transition-colors"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
                  <span className="text-secondary-foreground font-bold text-sm">TF</span>
                </div>
                <span className="font-bold text-xl">TrendFlow</span>
              </div>
              <p className="text-muted-foreground text-sm">
                AI-powered affiliate marketing insights and automation platform.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    AI Tools
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Amazon
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Social Media
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Email Marketing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Getting Started
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Best Practices
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Tools
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 TrendFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
