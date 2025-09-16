"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { socialPlatforms, contentTemplates, schedulePost } from "@/lib/social-media"
import { Calendar, ImageIcon, Hash, Send, Clock, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function PostComposer() {
  const [content, setContent] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [hashtags, setHashtags] = useState("")
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [isScheduling, setIsScheduling] = useState(false)
  const { toast } = useToast()

  const connectedPlatforms = socialPlatforms.filter((p) => p.connected)
  const characterLimit =
    Math.min(
      ...selectedPlatforms.map((id) => {
        switch (id) {
          case "twitter":
            return 280
          case "facebook":
            return 63206
          case "instagram":
            return 2200
          case "linkedin":
            return 3000
          default:
            return 280
        }
      }),
    ) || 280

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId],
    )
  }

  const handleTemplateSelect = (templateId: string) => {
    const template = contentTemplates.find((t) => t.id === templateId)
    if (template) {
      setContent(template.content)
      setHashtags(template.hashtags.join(" "))
      setSelectedTemplate(templateId)
    }
  }

  const handleSchedule = async (publishNow = false) => {
    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter some content for your post.",
        variant: "destructive",
      })
      return
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "Platform Required",
        description: "Please select at least one platform to post to.",
        variant: "destructive",
      })
      return
    }

    if (!publishNow && (!scheduledDate || !scheduledTime)) {
      toast({
        title: "Schedule Required",
        description: "Please select a date and time for scheduling.",
        variant: "destructive",
      })
      return
    }

    setIsScheduling(true)

    try {
      const scheduledAt = publishNow
        ? new Date().toISOString()
        : new Date(`${scheduledDate}T${scheduledTime}`).toISOString()

      await schedulePost({
        content,
        platforms: selectedPlatforms,
        status: publishNow ? "published" : "scheduled",
        scheduledAt: publishNow ? undefined : scheduledAt,
        publishedAt: publishNow ? scheduledAt : undefined,
        mediaUrls: [],
        hashtags: hashtags.split(" ").filter((tag) => tag.startsWith("#")),
      })

      toast({
        title: publishNow ? "Post Published!" : "Post Scheduled!",
        description: publishNow
          ? "Your post has been published to selected platforms."
          : "Your post has been scheduled successfully.",
      })

      // Reset form
      setContent("")
      setSelectedPlatforms([])
      setHashtags("")
      setScheduledDate("")
      setScheduledTime("")
      setSelectedTemplate("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsScheduling(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
          <CardDescription>Compose and schedule content across your social media platforms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Template Selection */}
          <div className="space-y-2">
            <Label>Content Template (Optional)</Label>
            <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template to get started" />
              </SelectTrigger>
              <SelectContent>
                {contentTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name} - {template.category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Content Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="content">Content</Label>
              <span className={`text-sm ${content.length > characterLimit ? "text-red-500" : "text-muted-foreground"}`}>
                {content.length}/{characterLimit}
              </span>
            </div>
            <Textarea
              id="content"
              placeholder="What's happening? Share your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className={content.length > characterLimit ? "border-red-500" : ""}
            />
          </div>

          {/* Platform Selection */}
          <div className="space-y-3">
            <Label>Select Platforms</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {connectedPlatforms.map((platform) => (
                <div key={platform.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={platform.id}
                    checked={selectedPlatforms.includes(platform.id)}
                    onCheckedChange={() => handlePlatformToggle(platform.id)}
                  />
                  <Label htmlFor={platform.id} className="flex items-center gap-2 cursor-pointer">
                    <ImageIcon className="h-4 w-4" />
                    {platform.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Hashtags */}
          <div className="space-y-2">
            <Label htmlFor="hashtags">Hashtags</Label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="hashtags"
                placeholder="#affiliate #marketing #tips"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Scheduling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Schedule Date</Label>
              <Input
                id="date"
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Schedule Time</Label>
              <Input id="time" type="time" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => handleSchedule(false)} disabled={isScheduling} className="flex-1">
              {isScheduling ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Scheduling...
                </>
              ) : (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Post
                </>
              )}
            </Button>

            <Button variant="outline" onClick={() => handleSchedule(true)} disabled={isScheduling} className="flex-1">
              <Send className="mr-2 h-4 w-4" />
              Publish Now
            </Button>

            <Button variant="outline" disabled={isScheduling}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      {content && selectedPlatforms.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>How your post will appear on selected platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedPlatforms.map((platformId) => {
                const platform = socialPlatforms.find((p) => p.id === platformId)
                if (!platform) return null

                return (
                  <div key={platformId} className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <ImageIcon className="h-4 w-4" />
                      <span className="font-medium">{platform.name}</span>
                      <Badge variant="outline" style={{ color: platform.color }}>
                        Preview
                      </Badge>
                    </div>
                    <p className="text-sm leading-relaxed">{content}</p>
                    {hashtags && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {hashtags
                          .split(" ")
                          .filter((tag) => tag.startsWith("#"))
                          .map((tag, index) => (
                            <span key={index} className="text-xs text-blue-600">
                              {tag}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
