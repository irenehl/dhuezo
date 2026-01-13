---
projectId: nameless-mindfulness-app
locale: en
orderIndex: 1
previewImageUrl: /og-image-nameless.webp
deployedUrl: https://nameless.dhuezo.dev/
repoUrl: https://github.com/irenehl/nameless
featured: true
title: Nameless - Mindfulness & Calm Activities
description: A React Native mobile app offering gentle, interactive mindfulness activities designed to help users find calm through focused, meditative games.
tags:
  - React Native
  - Expo
  - TypeScript
  - NativeWind
---

# Nameless - Mindfulness & Calm Activities

A beautifully designed React Native mobile application that provides soothing, interactive activities to help users find calm and focus through gentle, meditative games.

## Overview

Nameless is a mobile mindfulness app built with React Native and Expo, offering a collection of calming activities designed to reduce stress and promote focus. The app features a clean, minimalist interface with customizable themes and color palettes, creating a personalized experience for each user.

## The Challenge & Solution

The challenge was creating a digital mindfulness tool that feels genuinely calming rather than adding to digital stress. Most apps in this space are either too gamified (creating pressure) or too passive (losing engagement). Users needed activities that promote focus and calm without feeling like work or competition.

The solution was to design gentle, interactive activities that require focus but have no time pressure or scoring systems. Activities like "Counting Calm" and "Connect the Dots" engage the mind in a meditative way, similar to traditional mindfulness practices like counting breaths or drawing mandalas.

Technical challenges included creating smooth animations that feel calming rather than jarring, implementing haptic feedback that enhances rather than distracts, and ensuring the app works well for users with motion sensitivity. The app includes accessibility features like reduced motion options and customizable color palettes to accommodate different needs.

The architecture prioritizes performance and smooth interactions, using Lottie for animations and optimizing rendering to maintain 60fps even during complex interactions. State management ensures user preferences persist across sessions, creating a personalized experience that adapts to each user's needs.

## Technologies Used

- **React Native 0.81.5** - Cross-platform mobile framework
- **Expo ~54.0** - Development platform and tooling
- **TypeScript 5.3** - Type-safe development
- **NativeWind 4.2** - Tailwind CSS for React Native
- **Lottie React Native** - Smooth animations
- **Expo Haptics** - Tactile feedback
- **React Native SVG** - Vector graphics rendering

## Features

### Core Activities

1. **Counting Calm**
   - Tap numbers, letters, evens, and odds in sequential order
   - Multiple rounds with varying difficulty
   - Gentle breathing pauses between rounds
   - Visual progress tracking

2. **Connect the Dots**
   - Drag lines between numbered dots to reveal geometric patterns
   - Multiple pattern variations
   - Smooth drawing interactions with haptic feedback
   - Pattern preview cards

### User Experience

- **Customizable Themes** - Light and dark mode support
- **Color Palettes** - Multiple palette options (pastel, vibrant, etc.)
- **Accessibility** - Reduced motion option for users with motion sensitivity
- **Haptic Feedback** - Optional tactile responses for interactions
- **Breathing Interludes** - Guided breathing breaks between activities
- **Wave Transitions** - Smooth visual transitions between game states

### Technical Highlights

- **State Management** - Custom settings and app state management
- **Persistent Storage** - User preferences saved with AsyncStorage
- **Responsive Design** - Adapts to different screen sizes
- **Performance Optimized** - Efficient rendering and animation handling
- **Type Safety** - Full TypeScript coverage

## Architecture

The app follows a feature-based architecture:

- **Features** - Self-contained activity modules (counting, connect-dots, breathing, etc.)
- **Components** - Reusable UI components (Button, Card, Modal, etc.)
- **Services** - Cross-cutting services (haptics, audio)
- **State** - Global state management (settings, app flags, logs)
- **Theme** - Centralized theming system with color tokens

## Design Philosophy

Nameless emphasizes:
- **Gentle Interactions** - No pressure, no rush, move slowly
- **Visual Calm** - Soft colors, subtle animations, minimal distractions
- **Focus & Flow** - Activities designed to promote mindfulness and present-moment awareness
- **Personalization** - Users can customize their experience through settings

## Conclusion

Nameless demonstrates how thoughtful design and user experience can create meaningful digital tools for mental wellness. The app combines modern mobile development practices with a focus on creating calm, meditative experiences that help users find peace in their daily lives.
