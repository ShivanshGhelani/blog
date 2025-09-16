export interface ContentTemplate {
  id: string
  name: string
  description: string
  category: string
  prompt: string
  fields: {
    name: string
    label: string
    type: "text" | "textarea" | "select"
    required: boolean
    options?: string[]
    placeholder?: string
  }[]
}

export interface GeneratedContent {
  id: string
  title: string
  content: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  category: string
  tags: string[]
  createdAt: string
  template: string
}

export const contentTemplates: ContentTemplate[] = [
  {
    id: "product-review",
    name: "Product Review",
    description: "Generate comprehensive affiliate product reviews",
    category: "Reviews",
    prompt:
      "Write a detailed affiliate product review for {productName} in the {category} niche. Include pros, cons, features, and a compelling call-to-action.",
    fields: [
      {
        name: "productName",
        label: "Product Name",
        type: "text",
        required: true,
        placeholder: "Enter the product name",
      },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        options: ["Technology", "Health & Fitness", "Home & Garden", "Fashion", "Business", "Education"],
      },
      {
        name: "keyFeatures",
        label: "Key Features",
        type: "textarea",
        required: false,
        placeholder: "List the main features (optional)",
      },
      {
        name: "targetAudience",
        label: "Target Audience",
        type: "text",
        required: false,
        placeholder: "Who is this product for?",
      },
    ],
  },
  {
    id: "comparison-post",
    name: "Product Comparison",
    description: "Create detailed comparison posts between products",
    category: "Comparisons",
    prompt:
      "Create a comprehensive comparison between {product1} and {product2} in the {category} category. Include a detailed comparison table, pros and cons for each, and recommendations.",
    fields: [
      {
        name: "product1",
        label: "First Product",
        type: "text",
        required: true,
        placeholder: "Enter first product name",
      },
      {
        name: "product2",
        label: "Second Product",
        type: "text",
        required: true,
        placeholder: "Enter second product name",
      },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        options: ["Technology", "Health & Fitness", "Home & Garden", "Fashion", "Business", "Education"],
      },
      {
        name: "comparisonPoints",
        label: "Comparison Points",
        type: "textarea",
        required: false,
        placeholder: "What aspects should be compared? (price, features, quality, etc.)",
      },
    ],
  },
  {
    id: "how-to-guide",
    name: "How-To Guide",
    description: "Generate step-by-step tutorial content",
    category: "Tutorials",
    prompt:
      "Create a comprehensive how-to guide on {topic} for {targetAudience}. Include step-by-step instructions, tips, and recommended tools or products.",
    fields: [
      {
        name: "topic",
        label: "Topic",
        type: "text",
        required: true,
        placeholder: "What should the guide teach?",
      },
      {
        name: "targetAudience",
        label: "Target Audience",
        type: "select",
        required: true,
        options: ["Beginners", "Intermediate", "Advanced", "General Audience"],
      },
      {
        name: "difficulty",
        label: "Difficulty Level",
        type: "select",
        required: true,
        options: ["Easy", "Medium", "Hard"],
      },
      {
        name: "timeRequired",
        label: "Estimated Time",
        type: "text",
        required: false,
        placeholder: "How long will this take?",
      },
    ],
  },
  {
    id: "trend-analysis",
    name: "Trend Analysis",
    description: "Analyze current trends in specific niches",
    category: "Analysis",
    prompt:
      "Analyze the current trends in {niche} for {year}. Include market insights, emerging opportunities, and product recommendations.",
    fields: [
      {
        name: "niche",
        label: "Niche/Industry",
        type: "text",
        required: true,
        placeholder: "Enter the niche or industry",
      },
      {
        name: "year",
        label: "Year",
        type: "select",
        required: true,
        options: ["2024", "2025"],
      },
      {
        name: "focus",
        label: "Focus Area",
        type: "select",
        required: false,
        options: ["Products", "Services", "Technology", "Market Growth", "Consumer Behavior"],
      },
    ],
  },
  {
    id: "listicle",
    name: "Top X List",
    description: "Create engaging listicle content",
    category: "Lists",
    prompt:
      "Create a 'Top {number} {topic}' listicle for {year}. Include detailed descriptions, pros/cons, and affiliate recommendations for each item.",
    fields: [
      {
        name: "number",
        label: "Number of Items",
        type: "select",
        required: true,
        options: ["5", "10", "15", "20"],
      },
      {
        name: "topic",
        label: "Topic",
        type: "text",
        required: true,
        placeholder: "e.g., 'AI Tools for Content Creation'",
      },
      {
        name: "year",
        label: "Year",
        type: "select",
        required: true,
        options: ["2024", "2025"],
      },
      {
        name: "criteria",
        label: "Selection Criteria",
        type: "textarea",
        required: false,
        placeholder: "What makes these items the best?",
      },
    ],
  },
]

// Mock AI generation function
export async function generateContent(
  template: ContentTemplate,
  inputs: Record<string, string>,
): Promise<GeneratedContent> {
  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 3000))

  // Mock generated content based on template
  const mockContent = {
    "product-review": {
      title: `${inputs.productName} Review: Is It Worth Your Money in 2024?`,
      content: `# ${inputs.productName} Review: Complete Analysis

## Overview
${inputs.productName} has been making waves in the ${inputs.category} space, and for good reason. After extensive testing and research, we've compiled this comprehensive review to help you make an informed decision.

## Key Features
- Advanced functionality that sets it apart from competitors
- User-friendly interface designed for ${inputs.targetAudience || "all users"}
- Excellent value proposition in the ${inputs.category} market
- Regular updates and strong customer support

## Pros and Cons

### Pros ✅
- High-quality construction and materials
- Excellent performance in real-world testing
- Competitive pricing for the features offered
- Strong customer reviews and ratings

### Cons ❌
- Learning curve for new users
- Some advanced features require additional setup
- Limited availability in certain regions

## Final Verdict
${inputs.productName} is an excellent choice for anyone looking for a reliable solution in the ${inputs.category} space. While it may have a few minor drawbacks, the overall value and performance make it a worthwhile investment.

**Rating: 4.5/5 stars**

[Get ${inputs.productName} Now - Special Discount Available]`,
      excerpt: `Comprehensive review of ${inputs.productName} - discover if this ${inputs.category} product is worth your investment with our detailed analysis.`,
      metaTitle: `${inputs.productName} Review 2024: Honest Analysis & User Experience`,
      metaDescription: `Detailed ${inputs.productName} review covering features, pros, cons, and real user experiences. Find out if it's worth buying in 2024.`,
      keywords: [inputs.productName.toLowerCase(), inputs.category.toLowerCase(), "review", "2024", "analysis"],
    },
    "comparison-post": {
      title: `${inputs.product1} vs ${inputs.product2}: Which ${inputs.category} Product Wins in 2024?`,
      content: `# ${inputs.product1} vs ${inputs.product2}: The Ultimate Comparison

## Introduction
Choosing between ${inputs.product1} and ${inputs.product2} can be challenging. Both are excellent options in the ${inputs.category} space, but they serve different needs and preferences.

## Quick Comparison Table

| Feature | ${inputs.product1} | ${inputs.product2} |
|---------|------------|------------|
| Price | $$$ | $$ |
| Ease of Use | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Features | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Support | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## ${inputs.product1} Analysis
### Pros
- Advanced feature set
- Professional-grade quality
- Excellent for power users

### Cons
- Higher price point
- Steeper learning curve

## ${inputs.product2} Analysis
### Pros
- More affordable
- User-friendly interface
- Great for beginners

### Cons
- Limited advanced features
- May outgrow needs quickly

## Final Recommendation
Choose ${inputs.product1} if you need advanced features and don't mind paying more. Go with ${inputs.product2} if you want simplicity and value.`,
      excerpt: `Detailed comparison between ${inputs.product1} and ${inputs.product2} to help you choose the best ${inputs.category} solution for your needs.`,
      metaTitle: `${inputs.product1} vs ${inputs.product2}: 2024 Comparison Guide`,
      metaDescription: `Compare ${inputs.product1} and ${inputs.product2} side-by-side. Features, pricing, pros and cons to help you make the right choice.`,
      keywords: [
        inputs.product1.toLowerCase(),
        inputs.product2.toLowerCase(),
        "comparison",
        "vs",
        inputs.category.toLowerCase(),
      ],
    },
  }

  const templateContent = mockContent[template.id as keyof typeof mockContent] || {
    title: `Generated Content: ${inputs.topic || inputs.productName || "New Article"}`,
    content: `# ${inputs.topic || inputs.productName || "New Article"}\n\nThis is AI-generated content based on your inputs. The actual implementation would use a real AI service to generate comprehensive, high-quality content.`,
    excerpt: `AI-generated content about ${inputs.topic || inputs.productName || "your specified topic"}.`,
    metaTitle: `${inputs.topic || inputs.productName || "New Article"} - Complete Guide 2024`,
    metaDescription: `Comprehensive guide about ${inputs.topic || inputs.productName || "your topic"} with expert insights and recommendations.`,
    keywords: ["ai-generated", "content", "guide"],
  }

  return {
    id: Date.now().toString(),
    ...templateContent,
    category: inputs.category || template.category,
    tags: [...templateContent.keywords, template.category.toLowerCase()],
    createdAt: new Date().toISOString(),
    template: template.name,
  }
}
