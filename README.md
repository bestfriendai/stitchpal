# StitchPal 🧶

A beautiful mobile app for tracking your crochet and knitting projects. Built with React Native and Expo.

## Features

- **Project Tracking** - Keep all your WIPs organized in one place
- **Pattern Library** - Save patterns with materials lists and step-by-step instructions
- **Progress Stats** - Track your streak, yarn usage, and completed projects
- **Beautiful UI** - Dark mode support with a warm, cozy aesthetic

## Screenshots

<p float="left">
  <img src="https://placehold.co/300x600/FF6B6B/white?text=Projects" width="150" />
  <img src="https://placehold.co/300x600/4ECDC4/white?text=Patterns" width="150" />
  <img src="https://placehold.co/300x600/45B7D1/white?text=Stats" width="150" />
</p>

## Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript
- **Navigation**: Expo Router
- **Storage**: AsyncStorage
- **UI**: React Native with custom theming

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI

### Installation

```bash
# Clone the repository
cd stitchpal

# Install dependencies
npm install

# Start development server
npx expo start
```

### Running the App

```bash
# iOS Simulator
npx expo start
# Press 'i' to run on iOS

# Android Emulator
# Press 'a' to run on Android

# Web
# Press 'w' to run on web
```

## Project Structure

```
stitchpal/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation
│   │   ├── index.tsx     # Projects list
│   │   ├── patterns.tsx  # Pattern library
│   │   └── stats.tsx     # Statistics
│   ├── pattern/          # Pattern detail/new screens
│   ├── project/          # Project detail/new screens
│   ├── onboarding.tsx   # Onboarding flow
│   ├── paywall.tsx      # Subscription paywall
│   └── settings.tsx     # App settings
├── src/
│   ├── theme.ts         # Color scheme & styling
│   └── services/
│       └── purchases.ts # RevenueCat integration (stub)
└── package.json
```

## Data Storage

Projects and patterns are stored locally using AsyncStorage. The app provides sample demo data for new users to explore the UI.

## License

MIT

---

Made with ❤️ for crafters
