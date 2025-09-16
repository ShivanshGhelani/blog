"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { contentTemplates, generateContent, type ContentTemplate, type GeneratedContent } from "@/lib/ai-content"
import { Loader2, Sparkles, FileText, Copy, Download, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ContentGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null)
  const [inputs, setInputs] = useState<Record<string, string>>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const { toast } = useToast()

  const handleTemplateSelect = (template: ContentTemplate) => {
    setSelectedTemplate(template)
    setInputs({})
    setGeneratedContent(null)
  }

  const handleInputChange = (fieldName: string, value: string) => {
    setInputs((prev) => ({ ...prev, [fieldName]: value }))
  }

  const handleGenerate = async () => {
    if (!selectedTemplate) return

    // Validate required fields
    const missingFields = selectedTemplate.fields
      .filter((field) => field.required && !inputs[field.name])
      .map((field) => field.label)

    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: `Please fill in: ${missingFields.join(", ")}`,
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const content = await generateContent(selectedTemplate, inputs)
      setGeneratedContent(content)
      toast({
        title: "Content Generated Successfully!",
        description: "Your AI-generated content is ready for review.",
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to Clipboard",
      description: "Content has been copied to your clipboard.",
    })
  }

  const categories = [...new Set(contentTemplates.map((t) => t.category))]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-secondary" />
        <h1 className="text-3xl font-bold">AI Content Generator</h1>
      </div>
      <p className="text-muted-foreground">Generate high-quality affiliate content using AI-powered templates</p>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="templates">Choose Template</TabsTrigger>
          <TabsTrigger value="generate" disabled={!selectedTemplate}>
            Generate Content
          </TabsTrigger>
          <TabsTrigger value="preview" disabled={!generatedContent}>
            Preview & Edit
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div key={category} className="space-y-4">
                <h3 className="font-semibold text-lg">{category}</h3>
                {contentTemplates
                  .filter((template) => template.category === category)
                  .map((template) => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedTemplate?.id === template.id ? "ring-2 ring-secondary" : ""
                      }`}
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <CardDescription className="text-sm">{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="generate" className="space-y-6">
          {selectedTemplate && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {selectedTemplate.name}
                </CardTitle>
                <CardDescription>{selectedTemplate.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTemplate.fields.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={field.name}>
                      {field.label}
                      {field.required && <span className="text-destructive ml-1">*</span>}
                    </Label>

                    {field.type === "text" && (
                      <Input
                        id={field.name}
                        placeholder={field.placeholder}
                        value={inputs[field.name] || ""}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                      />
                    )}

                    {field.type === "textarea" && (
                      <Textarea
                        id={field.name}
                        placeholder={field.placeholder}
                        value={inputs[field.name] || ""}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        rows={3}
                      />
                    )}

                    {field.type === "select" && field.options && (
                      <Select
                        value={inputs[field.name] || ""}
                        onValueChange={(value) => handleInputChange(field.name, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ))}

                <Button onClick={handleGenerate} disabled={isGenerating} className="w-full" size="lg">
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Content...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Content
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          {generatedContent && (
            <div className="space-y-6">
              {/* Content Preview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Generated Content Preview</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{generatedContent.template}</Badge>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedContent.content)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Title</Label>
                      <p className="text-lg font-semibold">{generatedContent.title}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Excerpt</Label>
                      <p className="text-muted-foreground">{generatedContent.excerpt}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Content</Label>
                      <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-sm">{generatedContent.content}</pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SEO Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>SEO Optimization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Meta Title</Label>
                    <p className="text-sm">{generatedContent.metaTitle}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Meta Description</Label>
                    <p className="text-sm text-muted-foreground">{generatedContent.metaDescription}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Keywords</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {generatedContent.keywords.map((keyword) => (
                        <Badge key={keyword} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {generatedContent.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-4">
                <Button size="lg" className="flex-1">
                  <FileText className="mr-2 h-4 w-4" />
                  Save as Draft
                </Button>
                <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                  <Eye className="mr-2 h-4 w-4" />
                  Publish Now
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
