# SubSphere — Modern Full-Stack Subscription & Product E-Commerce Platform

SubSphere is a production-ready, full-stack subscription box and e-commerce web application built using **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma (SQLite)**.

---

## ✨ Features

- **🛍️ Complete E-Commerce & Subscription Box Catalog:**
  - Dynamic product catalog across multiple categories (Beauty & Skincare, Tech Gadgets, Artisan Coffee, Wellness, Eco-Living).
  - Search, category pill filtering, and sorting (Featured, Top Rated, Price Low/High).
- **🔁 Hybrid Purchase Model (Buy Once vs. Subscribe & Save):**
  - Instant toggle between one-time purchase and subscription checkout.
  - Automatic savings calculation (e.g. Save 20% on subscriptions).
  - Customizable delivery cadences (Monthly, Bi-Monthly, Quarterly).
- **🛒 Real-Time Cart & Slider Drawer:**
  - Slide-over cart drawer with instant line-item updates, quantity adjust, and one-click subscription mode switching.
  - Dedicated cart page with discount voucher support (`SUBSCRIBE10` for 10% off).
- **💳 Multi-Method Checkout:**
  - Simulated instant Credit/Debit Card checkout.
  - Mobile Financial Services (bKash / Nagad).
  - Cash on Delivery (COD).
  - Instant order generation with customized tracking code (`SUB-XXXXXX-XXX`).
- **📦 Shipment & Order Tracking (`/orders`):**
  - Real-time order timeline with detailed item breakdowns and status.
- **🔄 Recurring Subscription Management Dashboard (`/subscriptions`):**
  - View all active, paused, or cancelled subscription boxes.
  - Next delivery countdown and single-click pause, resume, and cancel capabilities.
- **⭐ Customer Reviews & Real-Time Feedback:**
  - Product-level customer reviews with interactive star ratings and immediate submission.
- **💾 Full-Stack Backend (Prisma + SQLite):**
  - Zero-configuration, local SQLite database (`dev.db`).
  - RESTful Next.js API Routes:
    - `GET /api/products` (auto-seeds if database is empty)
    - `GET /api/products/[id]`
    - `POST /api/orders` & `GET /api/orders`
    - `GET /api/subscriptions` & `PATCH /api/subscriptions/[id]`
    - `POST /api/reviews`

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database & Seed Initial Products
```bash
# Push database schema to SQLite
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed sample subscription boxes and reviews
node scripts/seed.mjs
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & Lucide Icons
- **Database & ORM:** SQLite with Prisma ORM
- **State Management:** React Context API (`CartContext`)

---

## 📁 Project Architecture

```
SubSphere/
├── prisma/
│   ├── dev.db             # Local SQLite database
│   └── schema.prisma      # Prisma database models
├── public/                # Static assets & legacy branding
├── scripts/
│   └── seed.mjs           # Database seeder script
├── src/
│   ├── app/
│   │   ├── api/           # Backend API route handlers
│   │   ├── cart/          # Cart page
│   │   ├── checkout/      # Multi-step checkout page
│   │   ├── orders/        # Orders tracking page
│   │   ├── products/[id]/ # Dynamic product details & reviews
│   │   ├── subscriptions/ # Subscription management dashboard
│   │   ├── globals.css    # Global Tailwind styles
│   │   ├── layout.tsx     # Root layout with CartProvider & Navbar
│   │   └── page.tsx       # Homepage with Hero, Catalog & Testimonials
│   ├── components/        # Navbar, Footer, ProductCard, CartDrawer
│   ├── context/           # CartContext state provider
│   ├── lib/               # Prisma client singleton
│   └── types/             # TypeScript definitions
└── _legacy_vite_backup/   # Safe backup of previous Vite project
```
