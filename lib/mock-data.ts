export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  status: "draft" | "published" | "scheduled"
  readTime: string
  views: number
  trending: boolean
  publishedAt: string
  createdAt: string
  updatedAt: string
  imageUrl: string
  slug: string
  author: {
    id: string
    name: string
    avatar: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 AI Tools That Are Revolutionizing Affiliate Marketing in 2024",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    excerpt:
      "Discover the cutting-edge AI tools that successful affiliate marketers are using to automate their workflows, optimize conversions, and scale their businesses.",
    category: "AI Tools",
    tags: ["AI", "Marketing", "Automation", "Tools"],
    status: "published",
    readTime: "8 min read",
    views: 12500,
    trending: true,
    publishedAt: "2024-01-15T10:00:00Z",
    createdAt: "2024-01-14T15:30:00Z",
    updatedAt: "2024-01-15T09:45:00Z",
    imageUrl: "/ai-tools-dashboard-interface.jpg",
    slug: "top-ai-tools-affiliate-marketing-2024",
    author: {
      id: "1",
      name: "Admin User",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    seo: {
      metaTitle: "Top 10 AI Tools for Affiliate Marketing 2024 | TrendFlow",
      metaDescription:
        "Discover the best AI tools for affiliate marketing in 2024. Boost your conversions and automate your workflow with these powerful solutions.",
      keywords: ["AI tools", "affiliate marketing", "automation", "2024"],
    },
  },
  {
    id: "2",
    title: "Amazon Associates Program: Complete Guide to Maximizing Your Earnings",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    excerpt:
      "Learn the insider strategies and optimization techniques that top Amazon affiliates use to generate consistent six-figure incomes.",
    category: "Amazon",
    tags: ["Amazon", "Associates", "Earnings", "Strategy"],
    status: "published",
    readTime: "12 min read",
    views: 8900,
    trending: false,
    publishedAt: "2024-01-12T14:00:00Z",
    createdAt: "2024-01-11T10:15:00Z",
    updatedAt: "2024-01-12T13:30:00Z",
    imageUrl: "/amazon-affiliate-marketing-dashboard.jpg",
    slug: "amazon-associates-complete-guide",
    author: {
      id: "2",
      name: "Content Editor",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    seo: {
      metaTitle: "Amazon Associates Guide: Maximize Your Affiliate Earnings",
      metaDescription:
        "Complete guide to Amazon Associates program. Learn proven strategies to increase your affiliate commissions and build a profitable business.",
      keywords: ["Amazon Associates", "affiliate earnings", "Amazon affiliate", "commission"],
    },
  },
  {
    id: "3",
    title: "Social Media Automation: How to Scale Your Affiliate Content Across Platforms",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    excerpt: "Master the art of cross-platform content distribution with these proven automation strategies and tools.",
    category: "Social Media",
    tags: ["Social Media", "Automation", "Content", "Scaling"],
    status: "draft",
    readTime: "6 min read",
    views: 0,
    trending: false,
    publishedAt: "",
    createdAt: "2024-01-16T09:00:00Z",
    updatedAt: "2024-01-16T11:20:00Z",
    imageUrl: "/social-media-automation-dashboard.png",
    slug: "social-media-automation-affiliate-content",
    author: {
      id: "1",
      name: "Admin User",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    seo: {
      metaTitle: "Social Media Automation for Affiliate Marketing",
      metaDescription:
        "Learn how to automate your social media content distribution and scale your affiliate marketing across multiple platforms.",
      keywords: ["social media automation", "affiliate content", "cross-platform", "scaling"],
    },
  },
]

export const mockCategories = [
  { id: "1", name: "AI Tools", slug: "ai-tools", postCount: 15, color: "#6366f1" },
  { id: "2", name: "Amazon", slug: "amazon", postCount: 23, color: "#f59e0b" },
  { id: "3", name: "Social Media", slug: "social-media", postCount: 18, color: "#10b981" },
  { id: "4", name: "Email Marketing", slug: "email-marketing", postCount: 12, color: "#ef4444" },
  { id: "5", name: "SEO", slug: "seo", postCount: 20, color: "#8b5cf6" },
  { id: "6", name: "Cryptocurrency", slug: "cryptocurrency", postCount: 8, color: "#f97316" },
]

export const mockAnalytics = {
  totalPosts: 1234,
  totalViews: 45200,
  activeUsers: 2345,
  aiGenerated: 89,
  monthlyGrowth: {
    posts: 12,
    views: 8,
    users: 15,
    aiContent: 25,
  },
  topPosts: [
    { title: "Top 10 AI Tools That Are Revolutionizing Affiliate Marketing", views: 12500, growth: 15 },
    { title: "Amazon Associates Program: Complete Guide", views: 8900, growth: -2 },
    { title: "SEO Secrets: How to Rank Affiliate Content", views: 11300, growth: 8 },
  ],
  trafficSources: [
    { source: "Organic Search", percentage: 45, visitors: 20340 },
    { source: "Social Media", percentage: 25, visitors: 11275 },
    { source: "Direct", percentage: 20, visitors: 9020 },
    { source: "Referral", percentage: 10, visitors: 4510 },
  ],
}
