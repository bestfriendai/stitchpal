# StitchPal - Setup Guide

## Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **Expo CLI**: `npm install -g expo`
- **EAS CLI** (for building): `npm install -g eas-cli`
- **Apple Developer Account** (for iOS builds)
- **Google Play Console** (for Android builds)

## Installation

```bash
# Navigate to project directory
cd builds/stitchpal

# Install dependencies
npm install

# Start development server
npx expo start
```

## Running the App

### Development (Expo Go)
```bash
npx expo start
# Then press 'i' for iOS simulator, 'a' for Android emulator
```

### Development Build (iOS)
```bash
# Generate native iOS project
npx expo prebuild --platform ios

# Run on simulator
npx expo run:ios
```

### Production Build (iOS via EAS)
```bash
# Configure EAS (first time)
eas build:configure

# Build for App Store
eas build -p ios --profile production
```

## RevenueCat Setup

### 1. Create RevenueCat Account
1. Go to [RevenueCat.com](https://www.revenuecat.com)
2. Create a new project for StitchPal

### 2. Configure Products
Create these products in RevenueCat:

| Product | Platform | Type | ID |
|---------|----------|------|-----|
| Monthly | iOS/Android | Subscription | stitchpal_monthly |
| Annual | iOS/Android | Subscription | stitchpal_annual |

### 3. Get API Key
1. In RevenueCat dashboard, go to **Project Settings** → **API Keys**
2. Copy the **Public App Key**
3. Add to your app's environment or `.env` file

### 4. Configure Entitlements

**iOS (App Store Connect):**
1. Go to your app in App Store Connect
2. Enable **In-App Purchases**
3. Create the subscription products matching RevenueCat

**Android (Google Play):**
1. Create products in Google Play Console
2. Link to RevenueCat via **Project Settings** → **Google Play**

### 5. Update Code
In `src/services/purchases.ts`, replace the stub with actual RevenueCat integration:

```typescript
import { Purchases } from '@react-native-purchases/purchases';

const API_KEY = 'your_revenuecat_public_key';

export const initPurchases = async () => {
  Purchases.configure({ apiKey: API_KEY });
  Purchases.setAttributes({ appUserId: /* user identifier */ });
};

export const subscribe = async (productId: string) => {
  const { product } = await Purchases.getProducts([productId]);
  await Purchases.purchaseProduct(product[0]);
};
```

## App Store Connect Setup

### 1. Create App
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Create new iOS app:
   - **Bundle ID**: `com.stitchpal.app`
   - **Name**: StitchPal
   - **Primary Language**: English

### 2. Screenshots Required
Create these screenshots (use Simulator):
- iPhone 6.7" (1x): 1290×2790
- iPhone 6.1" (2x): 1179×2556
- iPad Pro 12.9" (2x): 2048×2732

### 3. Submit for Review
- App information
- Pricing and availability
- In-app purchases (if using RevenueCat)
- Build uploaded via Xcode or EAS

## EAS Build Commands

```bash
# Development build (for testing)
eas build -p ios --profile development

# Production build (for App Store)
eas build -p ios --profile production

# Android
eas build -p android --profile production
```

## Submission Checklist

- [ ] Bundle ID matches: `com.stitchpal.app`
- [ ] App name: "StitchPal"
- [ ] Privacy Policy URL submitted
- [ ] Subscription products configured in RevenueCat
- [ ] Screenshots captured (all required sizes)
- [ ] Build uploaded via EAS or Xcode
- [ ] Test subscription flow in Sandbox mode
- [ ] App Store Connect metadata complete

## Troubleshooting

### Metro Bundler Issues
```bash
npx expo start --clear
```

### EAS Build Failures
- Check Apple Developer Program membership
- Verify bundle identifier exists in App Store Connect
- Ensure iOS certificates are valid

### RevenueCat Issues
- Verify API key is correct
- Check products are "Ready to Submit" in App Store Connect
- Test in Sandbox mode first
