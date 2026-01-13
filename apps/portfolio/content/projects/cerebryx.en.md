---
projectId: cerebryx
locale: en
orderIndex: 1
previewImageUrl: /og-image-cerebryx.webp
deployedUrl: https://cerebryx.vercel.app/
repoUrl: https://github.com/irenehl/cerebryx
featured: true
title: Cerebryx
description: Transform your reading into lasting understanding with AI-powered study sessions, generated quizzes, and instant feedback.
tags:
  - Next.js
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - OpenAI
  - Supabase
---

# Cerebryx

Cerebryx is a modern study companion application that transforms reading into active learning through timed reading sessions and AI-generated comprehension quizzes. Built with Next.js 15 and cutting-edge web technologies, it helps students and professionals improve their reading comprehension and retention.

## Overview

Cerebryx provides a focused, distraction-free environment for studying written content. Users can upload PDF documents or paste text, and the application calculates an optimal reading time based on content length. During the reading session, a countdown timer keeps users focused, and upon completion, an AI-powered quiz is generated to assess comprehension with mixed question types and difficulty levels.


## The Challenge & Solution

Cerebryx addresses the challenge of turning passive reading into active, effective learning—all in the browser, with no complex setup. PDF documents are parsed entirely client-side for privacy using PDF.js. AI generates quiz questions at varying difficulty levels to ensure real comprehension. The interface remains distraction-free, responsive, and scalable (up to 100k users). Optimistic UI updates give a fast, reliable experience even with slow connections, and all timer and quiz logic remain robust—even if parts of the system fail or the browser tab is inactive.

## Technologies Used

- **Next.js 15** - Modern React framework with App Router and server components
- **TypeScript** - Type-safe development with strict mode enabled
- **Tailwind CSS** - Utility-first CSS framework for responsive, dark-mode-first design
- **shadcn/ui** - High-quality, accessible UI component library
- **OpenAI API** - GPT-4o-mini for intelligent quiz question generation
- **PDF.js** - Client-side PDF parsing and text extraction
- **Supabase** - Authentication (Google OAuth, OTP) and database backend
- **Microsoft Clarity** - User behavior analytics and insights
- **React Context** - Client-side state management
- **Lucide React** - Modern icon library

## Key Features

### Reading Session Management
- **Multiple Input Methods**: Upload PDF files or paste text directly
- **Smart Reading Time Calculation**: Automatically estimates reading time based on word count (200 words per minute)
- **Interactive Timer**: Countdown timer with start/pause controls that runs in the background
- **Time Management**: Modal notification when reading time expires, with option to continue or proceed

### AI-Powered Quiz Generation
- **Intelligent Question Generation**: Uses OpenAI's GPT-4o-mini to create contextually relevant questions
- **Mixed Question Types**: Multiple-choice (4 options), true/false, and short-answer questions
- **Difficulty Levels**: Each question is categorized as easy, medium, or hard
- **Adaptive Question Count**: Generates 1 question per ~100 words (minimum 5, maximum 20 questions)
- **Customizable Range**: Users can configure the number of questions within the adaptive range

### Scoring and Feedback
- **Weighted Scoring System**: 
  - Easy questions = 1 point
  - Medium questions = 2 points
  - Hard questions = 3 points
- **Comprehensive Results**: Displays percentage score, points earned vs. total points, and success indicators
- **Answer Analysis**: Shows correct answers, user responses, and explanations for incorrect answers

### User Experience
- **Dark Mode Only**: Beautiful dark gradient interface (zinc-950 to neutral-950) designed for focused study sessions
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: Full keyboard navigation, proper ARIA labels, and high contrast ratios
- **Session History**: Track past study sessions with timestamps, sources, scores, and outcomes
- **Dashboard**: Overview of recent sessions, statistics, and progress tracking

### Authentication & Data Management
- **Dual-Mode Operation**: Works anonymously or with user accounts
- **Supabase Authentication**: Secure login with Google OAuth and OTP (phone/email)
- **Saved Documents**: Registered users can save documents with tags for later reading
- **Reading Goals**: Set and track time-based, document-based, and per-document reading goals
- **Search & Filter**: Find saved documents quickly with tags and search functionality

### Analytics & Insights
- **Microsoft Clarity Integration**: Comprehensive user behavior tracking and analytics
- **Session Tracking**: Monitor reading patterns, quiz performance, and engagement metrics

## Architecture Highlights

- **Server Components by Default**: Leverages Next.js 15 App Router for optimal performance
- **Client-Side Processing**: PDF parsing and quiz generation happen entirely in the browser
- **No Backend Required (Anonymous Mode)**: Core functionality works without server infrastructure
- **Type Safety**: Strict TypeScript configuration ensures robust, maintainable code
- **Component-Based Design**: Modular, reusable components following shadcn/ui conventions
- **State Management**: React Context API for efficient client-side state handling

## Technical Implementation

### PDF Processing
- Uses PDF.js for client-side PDF text extraction
- Handles various PDF formats and edge cases gracefully
- Provides user feedback for parsing failures

### AI Integration
- Robust JSON parsing with markdown code fence stripping
- Error handling for API failures with retry mechanisms
- Strict prompt engineering for consistent question quality

### Timer System
- Accurate countdown with `useEffect` and `setInterval`
- Proper cleanup to prevent memory leaks
- Background operation that continues even when tab is inactive

### Data Persistence
- Session-only storage for anonymous users
- Supabase PostgreSQL for authenticated user data
- Row Level Security (RLS) policies for data protection

## Design Philosophy

Cerebryx is built with a focus on:
- **Simplicity**: Clean, uncluttered interface that doesn't distract from studying
- **Performance**: Fast, responsive interactions with minimal loading times
- **Accessibility**: Inclusive design that works for all users
- **Privacy**: User data is handled securely, with session-only API key storage
- **User Control**: Flexible options for reading time, question count, and study preferences

## Future Enhancements

- Browser extension for quick text selection and practice
- Enhanced quiz feedback with detailed explanations
- Advanced analytics and progress visualization
- Multi-language support (i18n)
- Collaborative study features
- Export capabilities for study reports

## Conclusion

Cerebryx demonstrates how modern web technologies can be combined to create a powerful, user-friendly study tool. By leveraging AI for intelligent quiz generation, providing flexible input methods, and maintaining a focus on user experience, it transforms passive reading into active learning. The application showcases best practices in Next.js 15 development, TypeScript type safety, and accessible UI design.

