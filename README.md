# Inventory Management Mobile App

A simple inventory management mobile app with a backend API, built with Expo and Express + Prisma.

## Overview

This project includes:
- `mobile/`: React Native mobile app using Expo.
- `server/`: Node/Express API with Prisma for data persistence.

The app tracks products, stock levels, categories, and dashboard statistics.

## Screenshots

Below are sample app screens included in `mobile/assets/screenshots/`:

**Dashboard**

![Dashboard](mobile/assets/screenshots/1.1.jpeg)

**Product List**

![Product List](mobile/assets/screenshots/1.3.jpeg)

**Add Product**

![Add Product](mobile/assets/screenshots/1.5.jpeg)

**Product Details**

![Product Details](mobile/assets/screenshots/1.7.jpeg)

**Update Stock**

![Update Stock](mobile/assets/screenshots/1.9.jpeg)

More screenshots are available in `mobile/assets/screenshots/`, including validation states and full-form flows for Add Product and Update Stock.
These images cover the app’s core screens and validation behavior, so reviewers can verify the user experience.

## Requirements

- Node.js 18+ (or a compatible version)
- npm
- Expo CLI installed globally if you want to use `expo` commands directly: `npm install -g expo-cli`
- A local PostgreSQL database or Prisma-compatible database for the backend

## Backend Installation and Launch

1. Open a terminal in the `server/` folder.
2. Install dependencies:

```bash
cd server
npm install
```

3. Create or update `.env` with a valid `DATABASE_URL`.

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

4. Apply Prisma migrations to create tables and seed data if necessary:

```bash
npx prisma migrate dev --name init
```

5. Generate Prisma client and start the backend:

```bash
npm run generate
npm run dev
```

6. (Optional) Open Prisma Studio to inspect the database:

```bash
npx prisma studio
```

6. The backend should start on `http://localhost:5000` by default.

## Mobile App Installation and Launch

1. Open a terminal in the `mobile/` folder.
2. Install dependencies:

```bash
cd mobile
npm install
```

3. Configure the API base URL in `mobile/src/services/api.ts`.

If running the backend locally from the same computer, set `baseURL` to your desktop machine IP or `localhost` depending on the device/emulator.

Example:

```ts
export const api = axios.create({
  baseURL: "http://192.168.1.102:5000/api",
});
```

4. Start the app:

```bash
npm start
```

Or use Expo directly:

```bash
npx expo start
```

5. Use Expo Go or an emulator to open the app.

## Project Structure

- `mobile/src/screens/`: app screens for Dashboard, Product List, Product Form, Product Details, and Stock Update
- `mobile/src/services/`: API client and services for product and dashboard data
- `mobile/src/components/`: reusable UI components and form fields
- `server/src/`: Express routes, controllers, services, and Prisma database config

## Technical Choices

This project is built to balance rapid development, maintainability, and real-world usability.
The chosen stack supports a clean mobile experience, safe API interactions, and a simple backend structure.

### Mobile App

- **Expo + React Native**: lets the app run on Android and iOS without separate native builds, which speeds development and testing.
- **React Navigation**: provides a conventional mobile navigation pattern with bottom tabs and nested stacks.
- **React Hook Form + Zod**: keeps form state lightweight while enforcing validation rules and strong typing.
- **Axios**: makes API requests easy and readable, with centralized base URL configuration.
- **Victory / Victory Native**: provides chart components that render nicely in a React Native dashboard.
- **Zustand**: a simple state management library used when app-level state is needed without heavy boilerplate.
- **Safe Area Context + Gesture Handler**: ensures UI behaves correctly on modern devices with notches and navigation gestures.

### Backend

- **Express**: a minimal, familiar framework for building REST APIs and routing logic.
- **Prisma**: offers type-safe database access, schema migrations, and easy seeding for development.
- **PostgreSQL**: a stable production-ready database with good support for relational data.
- **Zod**: validates incoming API requests and reduces runtime errors by enforcing data shapes.

## Notes

- The mobile app currently expects the API base URL in `mobile/src/services/api.ts`.
- Use the device IP address if testing from a real phone on the same network.
- The app supports adding, editing, deleting products, and updating stock.

## Quick Start Summary

```bash
# Backend
cd server
npm install
npm run dev

# Mobile
cd mobile
npm install
npm start
```

Or use Expo directly:

```bash
npx expo start
```

Enjoy the inventory manager app!
