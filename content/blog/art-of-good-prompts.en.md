---
slug: art-of-good-prompts
locale: en
title: "The Art of Writing Good Prompts: How to Better Communicate with Artificial Intelligence"
description: Master the art of prompt engineering to get better results from AI, save time and tokens, and maintain greater control over AI interactions.
date: 2025-01-15
tags:
  - ai
  - prompts
  - productivity
  - tutorial
featuredImageUrl: null
readingTimeText: 8 min read
published: true
stageType: article
eventLocation: null
eventDate: null
ctaLabel: Read more
ctaUrl: null
---

# The Art of Writing Good Prompts: How to Better Communicate with Artificial Intelligence

## AI Doesn't Read Your Mind

One of the most important realizations when working with AI is this: **AI doesn't read your mind. It only follows what you say.** This simple truth changes everything about how we interact with artificial intelligence.

When we change how we ask for things, we change everything AI can do for us. The difference between a vague request and a well-crafted prompt can mean the difference between getting exactly what you need and getting something that's close but not quite right.

## Why Good Prompts Matter

The benefits of learning to write effective prompts are immediate and tangible:

- **Better Results**: Get outputs that match your vision and requirements
- **Less Time Wasted**: Reduce back-and-forth iterations and revisions
- **Fewer Tokens Spent**: More efficient prompts mean lower costs
- **Greater Control**: Direct the AI's behavior and output more precisely
- **Avoid AI "Guessing"**: Prevent the AI from making assumptions that lead to unwanted results

## The Foundation of Good Prompts

### Specificity is Key

The most common mistake when writing prompts is being too vague. AI systems are powerful, but they need clear direction. When you say "make it better" or "improve this," the AI has to guess what "better" means to you. Instead, be specific about what you want.

**Bad Prompt:**
> "Make this code better"

**Good Prompt:**
> "Refactor this function to use async/await instead of promises, add error handling for network failures, and include JSDoc comments for all parameters"

### Don't Let AI Assume

When you leave gaps in your instructions, AI will fill them with assumptions—and those assumptions might not align with what you actually want. Be explicit about your requirements, constraints, and expectations.

**Bad Prompt:**
> "Create a landing page"

**Good Prompt:**
> "Create a landing page for a SaaS product targeting small business owners. Use a hero section with a clear value proposition, include three feature cards with icons, add a pricing section with three tiers, and ensure the design is mobile-responsive with a maximum width of 1200px"

### Write in English (When Possible)

While many AI models support multiple languages, English prompts often produce more consistent and higher-quality results. This is because:

- Most training data is in English
- English has more precise technical terminology
- The model's understanding of English is typically more nuanced

If you're working in a non-English context, you can still write your prompts in English and ask for outputs in your target language.

### Define a Role

One of the most powerful techniques in prompt engineering is role-playing. By assigning the AI a specific role, you guide its behavior and expertise.

**Examples:**
- "You are an experienced full-stack developer specializing in React..."
- "Act as a senior UX designer with expertise in accessibility..."
- "You are a technical writer who explains complex concepts simply..."

When you define a role, the AI adopts the perspective, knowledge, and communication style of that role, leading to more appropriate and useful responses.

### Ask for Structure

AI outputs can be overwhelming if they're unstructured. By explicitly requesting a specific format or structure, you make the output more useful and easier to work with.

**Bad Prompt:**
> "Explain how React hooks work"

**Good Prompt:**
> "Explain how React hooks work. Structure your response as: (1) Brief overview, (2) Common hooks with examples, (3) Best practices, (4) Common pitfalls to avoid"

## The Formula for a Good Prompt

After working with AI extensively, I've developed a formula that consistently produces excellent results:

### **Role + Task + Format + Context + Constraints + Examples**

Let's break down each component:

### 1. Role
Define who the AI should be. This sets the expertise level and perspective.

**Example:**
> "You are an experienced full-stack developer specializing in React and modern web applications..."

### 2. Task
Clearly state what you want the AI to do. Be specific and actionable.

**Example:**
> "Build a comprehensive service quotation page that allows users to create, customize, and send professional quotes to clients..."

### 3. Format
Specify how you want the output structured or formatted.

**Example:**
> "Create a React component using functional components with hooks. Use Tailwind CSS for styling..."

### 4. Context
Provide background information that helps the AI understand the situation and requirements.

**Example:**
> "This quotation tool will be used by Spanish-speaking small business owners and freelancers in Latin America. Users may not be tech-savvy, so the interface must be intuitive..."

### 5. Constraints
List limitations, requirements, or rules that must be followed.

**Example:**
> "Keep the component under 300 lines of code. All UI elements must be in Spanish. Use USD exclusively with formatting like: $1,500.00..."

### 6. Examples
Provide concrete examples of what you want. Examples are one of the most powerful ways to communicate your vision.

**Example:**
> "Possible service items: 'Diseño de Sitio Web - $1,500.00', 'Creación de Logo - $300.00'..."

## Real-World Example

Here's a complete prompt that follows this formula, taken from the [AI Collective Prompts repository](https://github.com/irenehl/ai-collective-prompts):

```
Role:
You are an experienced full-stack developer specializing in React and modern web applications with expertise in creating professional business tools.

Task:
Build a comprehensive service quotation page that allows users to create, customize, and send professional quotes to clients. The page should enable adding multiple service items, calculating totals automatically, and generating a downloadable PDF quote without triggering the browser's print dialog.

Format:
Create a React component using functional components with hooks. Use Tailwind CSS for styling to ensure a clean, professional appearance. Use shadcn as well.

Context:
This quotation tool will be used by Spanish-speaking small business owners and freelancers in Latin America (particularly El Salvador). Users may not be tech-savvy, so the interface must be intuitive. The tool should work entirely in the browser without backend services initially.

Constraints:
- Keep the component under 300 lines of code
- All UI elements must be in Spanish
- Use USD exclusively with formatting like: $1,500.00
- Use a library such as jsPDF or html2pdf.js to generate the PDF
- Ensure mobile responsiveness
- Include form validation with Spanish error messages

Examples:
Possible service items:
- "Diseño de Sitio Web - $1,500.00"
- "Creación de Logo - $300.00"
- "Mantenimiento Mensual - $200.00"
```

This prompt structure ensures the AI has all the information it needs to produce exactly what you're looking for.

## Common Pitfalls to Avoid

### 1. Being Too Vague
Vague prompts lead to generic outputs. Always be specific about what you want.

### 2. Forgetting Constraints
Without constraints, AI might produce something that doesn't fit your requirements. Always specify limitations.

### 3. Skipping Examples
Examples are worth a thousand words. They show the AI exactly what you mean.

### 4. Not Defining the Role
Without a role, the AI doesn't know what perspective to adopt. Always set the context.

### 5. Ignoring Format Requirements
If you need a specific format, ask for it explicitly. Don't assume the AI will guess correctly.

## Iterative Refinement

Remember that prompt engineering is iterative. Your first prompt might not be perfect, and that's okay. Use the AI's output to refine your prompt:

1. **Generate**: Create an initial prompt
2. **Review**: Examine the AI's output
3. **Identify Gaps**: What's missing or incorrect?
4. **Refine**: Update your prompt with more specificity
5. **Repeat**: Continue until you get the desired result

Each iteration teaches you more about what the AI needs to understand your requirements.

## Tools and Resources

To help you get started with better prompts, I've created the [AI Collective Prompts repository](https://github.com/irenehl/ai-collective-prompts) on GitHub. This repository contains:

- Real-world prompt examples
- Templates for common tasks
- Best practices and patterns
- Community-contributed prompts

Feel free to explore, contribute, and use these prompts as starting points for your own work.

## Conclusion

The art of writing good prompts is fundamentally about clear communication. AI is a powerful tool, but like any tool, it works best when you know how to use it effectively.

By following the formula of **Role + Task + Format + Context + Constraints + Examples**, and remembering to be specific, explicit, and structured, you can dramatically improve your AI interactions.

The benefits are clear: better results, less time wasted, fewer tokens spent, and greater control over the AI's output. Most importantly, you avoid the frustration of the AI "guessing" what you want instead of knowing exactly what you need.

Start applying these principles to your next AI interaction, and you'll immediately notice the difference. The AI doesn't read your mind—but with good prompts, it doesn't need to.



