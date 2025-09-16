"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { socialPlatforms, mockSocialPosts } from "@/lib/social-media"
import {
  Share2,
  Users,
  TrendingUp,
  Calendar,
  Plus,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
} from "lucide-react"

export function SocialDashboard() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])

  const connectedPlatforms = socialPlatforms.filter((p) => p.connected)
  const totalFollowers = connectedPlatforms.reduce((sum, p) => sum + p.followers, 0)
  const avgEngagement = connectedPlatforms.reduce((sum, p) => sum + p.engagement, 0) / connectedPlatforms.length

  const publishedPosts = mockSocialPosts.filter((p) => p.status === "published")
  const scheduledPosts = mockSocialPosts.filter((p) => p.status === "scheduled")
  const draftPosts = mockSocialPosts.filter((p) => p.status === "draft")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "scheduled":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "draft":
        return <Edit className="h-4 w-4 text-yellow-600" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Share2 className="h-8 w-8 text-secondary" />
            Social Media Management
          </h1>
          <p className="text-muted-foreground">Automate and schedule your social media content across platforms</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Platforms</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectedPlatforms.length}</div>
            <p className="text-xs text-muted-foreground">of {socialPlatforms.length} platforms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFollowers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all platforms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgEngagement.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Posts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledPosts.length}</div>
            <p className="text-xs text-muted-foreground">Ready to publish</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="platforms" className="space-y-6">
        <TabsList>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialPlatforms.map((platform) => (
              <Card key={platform.id} className={platform.connected ? "ring-2 ring-green-200" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{platform.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{platform.name}</CardTitle>
                        <CardDescription>{platform.connected ? "Connected" : "Not connected"}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={platform.connected ? "default" : "secondary"}>
                      {platform.connected ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {platform.connected ? (
                    <>
                      <div className="flex justify-between text-sm">
                        <span>Followers:</span>
                        <span className="font-medium">{platform.followers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Engagement:</span>
                        <span className="font-medium">{platform.engagement}%</span>
                      </div>
                      <Progress value={platform.engagement * 10} className="h-2" />
                      <Button variant="outline" className="w-full bg-transparent">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                    </>
                  ) : (
                    <Button className="w-full" style={{ backgroundColor: platform.color }}>
                      Connect {platform.name}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="posts" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <Badge variant="outline" className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-600" />
                Published ({publishedPosts.length})
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-blue-600" />
                Scheduled ({scheduledPosts.length})
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2">
                <Edit className="h-3 w-3 text-yellow-600" />
                Drafts ({draftPosts.length})
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            {mockSocialPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(post.status)}
                        <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
                        <div className="flex gap-1">
                          {post.platforms.map((platformId) => {
                            const platform = socialPlatforms.find((p) => p.id === platformId)
                            return platform ? (
                              <span key={platformId} className="text-sm">
                                {platform.icon}
                              </span>
                            ) : null
                          })}
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed">{post.content}</p>

                      <div className="flex flex-wrap gap-1">
                        {post.hashtags.map((hashtag) => (
                          <Badge key={hashtag} variant="outline" className="text-xs">
                            {hashtag}
                          </Badge>
                        ))}
                      </div>

                      {post.status === "published" && (
                        <div className="flex gap-6 text-sm text-muted-foreground">
                          <span>❤️ {post.engagement.likes}</span>
                          <span>🔄 {post.engagement.shares}</span>
                          <span>💬 {post.engagement.comments}</span>
                          <span>🔗 {post.engagement.clicks}</span>
                        </div>
                      )}

                      {post.scheduledAt && (
                        <p className="text-xs text-muted-foreground">
                          Scheduled for: {new Date(post.scheduledAt).toLocaleString()}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      {post.status === "published" && (
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Analytics
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>Engagement rates by platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {connectedPlatforms.map((platform) => (
                  <div key={platform.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{platform.icon}</span>
                        <span className="font-medium">{platform.name}</span>
                      </div>
                      <span className="text-sm font-medium">{platform.engagement}%</span>
                    </div>
                    <Progress value={platform.engagement * 10} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Performance</CardTitle>
                <CardDescription>Last 7 days</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Impressions</span>
                  <span className="font-bold">45.2K</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Engagements</span>
                  <span className="font-bold">1.8K</span>
                </div>
                <div className="flex justify-between">
                  <span>Click-through Rate</span>
                  <span className="font-bold">3.2%</span>
                </div>
                <div className="flex justify-between">
                  <span>New Followers</span>
                  <span className="font-bold text-green-600">+127</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
