export interface SocialPlatform {
  id: string
  name: string
  icon: string
  color: string
  connected: boolean
  followers: number
  engagement: number
}

export interface SocialPost {
  id: string
  content: string
  platforms: string[]
  status: "draft" | "scheduled" | "published" | "failed"
  scheduledAt?: string
  publishedAt?: string
  mediaUrls: string[]
  hashtags: string[]
  engagement: {
    likes: number
    shares: number
    comments: number
    clicks: number
  }
  createdAt: string
  updatedAt: string
}

export interface ContentTemplate {
  id: string
  name: string
  content: string
  hashtags: string[]
  category: string
}

export const socialPlatforms: SocialPlatform[] = [
  {
    id: "twitter",
    name: "Twitter",
    icon: "🐦",
    color: "#1DA1F2",
    connected: true,
    followers: 12500,
    engagement: 4.2,
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "📘",
    color: "#1877F2",
    connected: true,
    followers: 8900,
    engagement: 3.8,
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "📷",
    color: "#E4405F",
    connected: false,
    followers: 0,
    engagement: 0,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    color: "#0A66C2",
    connected: true,
    followers: 5600,
    engagement: 6.1,
  },
  {
    id: "pinterest",
    name: "Pinterest",
    icon: "📌",
    color: "#BD081C",
    connected: false,
    followers: 0,
    engagement: 0,
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "🎵",
    color: "#000000",
    connected: false,
    followers: 0,
    engagement: 0,
  },
]

export const mockSocialPosts: SocialPost[] = [
  {
    id: "1",
    content:
      "🚀 Just discovered the top 10 AI tools that are revolutionizing affiliate marketing! These game-changing platforms are helping marketers automate workflows and boost conversions. Which one are you most excited to try? 🤖💰",
    platforms: ["twitter", "facebook", "linkedin"],
    status: "published",
    publishedAt: "2024-01-15T10:00:00Z",
    mediaUrls: ["/ai-tools-dashboard-interface.jpg"],
    hashtags: ["#AffiliateMarketing", "#AITools", "#MarketingAutomation", "#DigitalMarketing"],
    engagement: {
      likes: 245,
      shares: 67,
      comments: 23,
      clicks: 156,
    },
    createdAt: "2024-01-15T09:30:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    content:
      "📊 Amazon Associates vs. Other Affiliate Programs: Which one should you choose in 2024? Our comprehensive comparison breaks down commission rates, payment terms, and earning potential. Link in bio! 💡",
    platforms: ["twitter", "facebook"],
    status: "scheduled",
    scheduledAt: "2024-01-16T14:00:00Z",
    mediaUrls: ["/amazon-affiliate-marketing-dashboard.jpg"],
    hashtags: ["#AmazonAssociates", "#AffiliatePrograms", "#PassiveIncome", "#OnlineBusiness"],
    engagement: {
      likes: 0,
      shares: 0,
      comments: 0,
      clicks: 0,
    },
    createdAt: "2024-01-15T16:20:00Z",
    updatedAt: "2024-01-15T16:20:00Z",
  },
  {
    id: "3",
    content:
      "⚡ Social media automation is a game-changer for affiliate marketers! Learn how to scale your content across multiple platforms without burning out. Our latest guide covers the best tools and strategies 🔥",
    platforms: ["twitter", "linkedin"],
    status: "draft",
    mediaUrls: ["/social-media-automation-dashboard.png"],
    hashtags: ["#SocialMediaAutomation", "#ContentMarketing", "#AffiliateMarketing", "#Productivity"],
    engagement: {
      likes: 0,
      shares: 0,
      comments: 0,
      clicks: 0,
    },
    createdAt: "2024-01-15T18:45:00Z",
    updatedAt: "2024-01-15T19:10:00Z",
  },
]

export const contentTemplates: ContentTemplate[] = [
  {
    id: "product-launch",
    name: "Product Launch",
    content:
      "🚀 Exciting news! {productName} just launched and it's already making waves in the {category} space. Here's why you should check it out: {benefits}",
    hashtags: ["#ProductLaunch", "#NewProduct", "#AffiliateMarketing"],
    category: "Product Promotion",
  },
  {
    id: "how-to-tip",
    name: "How-To Tip",
    content:
      "💡 Pro Tip: {tip} This simple strategy can {benefit}. Have you tried this approach? Let me know in the comments! 👇",
    hashtags: ["#ProTip", "#MarketingTips", "#AffiliateMarketing"],
    category: "Educational",
  },
  {
    id: "comparison",
    name: "Product Comparison",
    content:
      "🤔 {product1} vs {product2}: Which one wins? After testing both, here's my honest take: {comparison}. What's your experience?",
    hashtags: ["#ProductComparison", "#Review", "#AffiliateMarketing"],
    category: "Comparison",
  },
  {
    id: "trend-alert",
    name: "Trend Alert",
    content:
      "📈 Trend Alert: {trend} is taking off in 2024! Here's what you need to know and how to capitalize on it: {insights}",
    hashtags: ["#TrendAlert", "#MarketingTrends", "#2024Trends"],
    category: "Trends",
  },
]

export async function schedulePost(post: Omit<SocialPost, "id" | "createdAt" | "updatedAt">): Promise<SocialPost> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newPost: SocialPost = {
    ...post,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    engagement: {
      likes: 0,
      shares: 0,
      comments: 0,
      clicks: 0,
    },
  }

  return newPost
}

export async function connectPlatform(platformId: string): Promise<boolean> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return Math.random() > 0.1 // 90% success rate
}
