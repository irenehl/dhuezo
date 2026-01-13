---
projectId: food-dice
locale: en
orderIndex: 1
previewImage: /og-image-food-dice.webp
deployedUrl: https://food-dice.dhuezo.dev
repoUrl: https://github.com/irenehl/nameless
featured: true
title: Food Dice
description: A mobile app that helps you discover restaurants randomly based on your food preferences and location using Google Maps Places API.
tags:
  - React Native
  - Expo
  - TypeScript
  - NativeWind
  - Google Maps API
---

# Food Dice

A mobile application developed with Expo that helps you find restaurants randomly based on your food preferences and location. Let the app choose your next place to eat!

## Overview

Food Dice is a React Native mobile app that solves the "where should we eat?" dilemma by randomly selecting restaurants based on user preferences. Users can input multiple food types they'd like to try, set a search radius in kilometers, and use their current location or enter an address manually. The app then searches for restaurants using Google Maps Places API and randomly selects one from the results.

## Technologies Used

- **Expo** (~51.0.0) - Framework for mobile development
- **React Native** (0.74.5) - UI framework
- **TypeScript** (~5.3.3) - Type safety and better developer experience
- **NativeWind** (^4.0.0) - Tailwind CSS for React Native
- **Google Maps Places API (New)** - Restaurant search and location services
- **expo-location** (~17.0.1) - GPS location access
- **react-native-maps** (1.14.0) - Interactive map visualization
- **i18next** (^23.7.16) - Internationalization framework
- **expo-localization** (~15.0.2) - System language detection
- **axios** (^1.6.5) - HTTP client for API requests

## Features

- **Multi-food type search**: Enter multiple food preferences (e.g., Pizza, Chicken, Burgers) and search for all of them simultaneously
- **Customizable search radius**: Set the distance in kilometers for restaurant discovery
- **Location flexibility**: Use GPS location or manually enter an address
- **Random restaurant selection**: The app randomly picks a restaurant from search results, making decisions fun and spontaneous
- **Rich restaurant details**: View restaurant name, address, distance, rating, and location on an interactive map
- **Google Maps integration**: Open selected restaurants directly in Google Maps app
- **Internationalization**: Full support for English and Spanish with automatic language detection based on system settings
- **Modern UI**: Beautiful dark-themed interface built with NativeWind (Tailwind CSS)
- **Error handling**: Comprehensive error messages and validation for better user experience

## Architecture

The app follows a clean component-based architecture:

- **Screens**: Main application screens (HomeScreen)
- **Components**: Reusable UI components (FoodInputFields, DistanceInput, LocationInput, SearchButton, ResultDisplay)
- **Services**: Business logic and API integration (places.ts, location.ts)
- **i18n**: Internationalization configuration and translation files
- **Types**: TypeScript type definitions for type safety

## Key Implementation Details

### Google Maps Places API Integration

The app uses the modern **Places API (New)** with the `searchText` endpoint, which provides better results and more accurate location data compared to the legacy API. The implementation:

- Searches for each food type separately and combines results
- Filters restaurants by radius to ensure accuracy
- Handles API errors gracefully with user-friendly messages
- Supports multiple languages for better localization

### Location Services

- Automatically attempts to get user's current location on app load
- Falls back to manual address input if GPS is unavailable
- Uses Geocoding API to convert addresses to coordinates
- Calculates distances between user location and restaurants

### Random Selection Algorithm

Simple but effective random selection from filtered results ensures variety in restaurant suggestions while respecting user preferences.

## User Experience

The app provides a smooth, intuitive experience:

1. Users add food types they're interested in
2. Set their preferred search radius
3. Configure location (automatic or manual)
4. Tap search to find restaurants
5. View randomly selected restaurant with full details
6. Option to open in Google Maps or try again for a different result

## Development Setup

The project includes comprehensive setup instructions in the README, covering:

- Google Cloud Platform API configuration
- Environment variable setup
- Installation and running instructions
- Troubleshooting common issues
- Multi-platform support (iOS, Android, Web)

## Conclusion

Food Dice demonstrates modern mobile app development practices with React Native and Expo, showcasing integration with external APIs, location services, internationalization, and a polished user interface. The app solves a real-world problem (decision fatigue when choosing where to eat) with an elegant, user-friendly solution.

