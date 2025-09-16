import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, TrendingUp } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: string
  views: number
  trending: boolean
  publishedAt: string
  imageUrl: string
  slug: string
}

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={post.imageUrl || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {post.trending && (
          <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
            <TrendingUp className="h-3 w-3 mr-1" />
            Trending
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-xs">
            {post.category}
          </Badge>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {post.views.toLocaleString()}
            </div>
          </div>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-bold text-lg mb-2 group-hover:text-secondary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{new Date(post.publishedAt).toLocaleDateString()}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="text-secondary hover:text-secondary/80 text-sm font-medium transition-colors"
          >
            Read more →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
