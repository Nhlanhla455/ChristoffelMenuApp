# Christoffel Menu App

A cross-platform mobile application built with **React Native**, **Expo**, and **TypeScript** for Christoffel, a private chef delivering personalised culinary experiences.

## Purpose

The app allows Christoffel to manage his changing dinner menus digitally, giving clients real-time access to the latest offerings while streamlining menu operations.

## Features

- Home screen displaying the full menu
- Total number of menu items displayed
- Average price per course (Starters, Mains, Dessert)
- Separate screen for adding and removing menu items
- Filter menu by course
- Items stored in an array — nothing is hardcoded
- Runs on Android and iOS via Expo

## Tech Stack

- React Native
- TypeScript
- Expo
- React Navigation

## Installation

```bash
git clone https://github.com/Nhlanhla455/ChristoffelMenuApp.git
cd ChristoffelMenuApp
npm install
npx expo start
```

## Project Structure

ChristoffelMenuApp/
├── App.tsx                 # Root component, navigation and global state
├── index.ts                # Entry point
├── types/
│   └── MenuItem.ts         # TypeScript interfaces and Course type
├── utils/
│   └── menuUtils.ts        # Utility functions for averages and filtering
├── screens/
│   ├── HomeScreen.tsx      # Displays full menu and statistics
│   ├── AddItemScreen.tsx   # Add and remove menu items
│   └── FilterScreen.tsx    # Filter menu by course
├── components/
│   └── MenuItemCard.tsx    # Reusable card component for menu items
├── package.json
├── tsconfig.json
└── README.md

## Changelog — Final PoE Changes from Part 2

### New Features Added

**1. Average Price by Course**
- Added `calculateAveragePriceByCourse()` function in `utils/menuUtils.ts`
- Home screen now shows average price for Starters, Mains and Dessert separately
- Displays a dash when no items exist in a course

**2. Separate Manage Menu Screen**
- Moved the add item form off the Home screen onto its own dedicated screen
- Home screen is now purely for viewing the menu
- Navigation added between Home and Manage Menu screen

**3. Remove Items Feature**
- Chef can remove any menu item from the Manage Menu screen
- Confirmation alert shown before removal to prevent accidents
- Uses the `filter()` array method to remove item by unique ID

**4. Filter by Course Screen**
- New dedicated screen with filter buttons: All, Starters, Mains, Dessert
- Uses `filterByCourse()` utility function
- Shows item count for the currently selected filter
- Accessible from the Home screen

**5. Array-based Storage**
- All menu items stored in a `useState<MenuItem[]>` array in `App.tsx`
- Items are never hardcoded — all data is entered by the chef at runtime

### Code Refactoring

**6. Separated into Multiple Files**
- `types/MenuItem.ts` — TypeScript type definitions
- `utils/menuUtils.ts` — Pure utility functions separated from UI
- `components/MenuItemCard.tsx` — Reusable card component
- Each screen in its own dedicated file

**7. TypeScript Improved**
- All props fully typed with interfaces
- `Course` is a union type not a plain string
- All function return types explicitly declared

**8. Navigation Refactored**
- `RootStackParamList` exported from `App.tsx` and reused across all screens
- Custom headers used on all screens for consistent design