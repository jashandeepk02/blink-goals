# Blink Goals 🎯

A goal-based savings planner built with **React Native, Expo, and TypeScript** that helps users turn financial targets into simple, actionable contribution plans.

Users can create a savings goal, choose a contribution pace, track their progress, and add contributions as they work toward completing their target.

## ✨ Features

* Create personalized financial goals
* Set a target amount and goal timeline
* Generate contribution plans based on the selected timeline
* Compare **daily, weekly, and monthly** contribution options
* Choose a preferred contribution pace
* Track saved and remaining amounts
* Visualize goal progress with a dynamic progress indicator
* Add contributions to an active goal
* Automatically update progress as contributions are added
* Display a completion state when the target is reached
* Mobile-first interface built with React Native

## 📱 User Flow

```text
Home
  ↓
Create Goal
  ↓
Enter Goal Details
  ↓
Build Plan
  ↓
Choose Contribution Pace
  ↓
Start Goal
  ↓
Track Progress
  ↓
Add Contributions
  ↓
Complete Goal 🎉
```

## 💡 How It Works

### 1. Create a Goal

Start by defining a financial goal such as a trip, purchase, emergency fund, or personal milestone.

Provide:

* Goal name
* Target amount
* Start date
* Target date

### 2. Build a Contribution Plan

Based on the target amount and selected timeline, the app generates multiple contribution options:

* Daily
* Weekly
* Monthly

This makes it easier to understand how a larger financial target can be broken down into smaller contributions.

### 3. Choose Your Pace

Select the contribution frequency that best fits your preferred saving routine.

The selected plan becomes part of the active goal.

### 4. Track Progress

Once the goal starts, the progress screen provides a clear overview of:

* Target amount
* Amount saved
* Remaining amount
* Target date
* Selected contribution plan
* Completion percentage

### 5. Add Contributions

Add contributions to the active goal and see the progress update immediately.

As contributions increase:

```text
Saved Amount ↑
Remaining Amount ↓
Progress % ↑
```

When the target amount is reached, the goal transitions into a completion state.

## 🛠 Tech Stack

* **React Native** — Mobile application development
* **Expo** — React Native development and tooling
* **TypeScript** — Type-safe application development
* **Expo Router** — File-based navigation and routing
* **React Hooks** — Component-level state and interaction management

## 🧱 Project Structure

```text
blink-goals/
├── app/                 # Application screens and Expo Router routes
├── components/          # Reusable UI components
├── constants/           # Shared application constants
├── hooks/               # Custom React hooks
├── assets/              # Images and static assets
├── app.json             # Expo configuration
├── package.json
└── tsconfig.json
```

The application follows a simple screen-based architecture using Expo Router, with reusable components extracted where appropriate.

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Node.js
* npm
* Expo Go on a physical device, or an iOS/Android simulator

### Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd blink-goals
```

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

Scan the QR code using **Expo Go**, or launch the project using an available iOS/Android simulator.

## 📲 Running on a Device

After starting the Expo development server:

```bash
npx expo start
```

you can run the application using:

* Expo Go on iOS
* Expo Go on Android
* iOS Simulator
* Android Emulator

## 🧠 What I Explored

This project was an opportunity to explore mobile application development with React Native while applying existing React and TypeScript development patterns.

Some of the areas explored include:

* React Native core components and layout patterns
* Mobile-first UI development
* Expo development workflow
* File-based navigation with Expo Router
* Form and input handling on mobile
* Date-based user input
* Cross-screen application state
* Dynamic financial calculations
* Progress-driven UI
* Reusable React Native components
* Mobile interaction patterns

## 🔮 Future Improvements

Some ideas for extending the project further:

* Persist goals across application sessions
* Support multiple active goals
* Add milestone celebrations at 25%, 50%, and 75%
* Contribution streaks
* Goal history
* Goal editing
* Push reminders for scheduled contributions
* Shareable goal milestone cards
* Enhanced animations and micro-interactions
* Backend synchronization
* Authentication and user profiles
* Additional accessibility improvements
