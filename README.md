# 🖼️ FrameDrop | Premium Minimal Studios

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**FrameDrop** is a state-of-the-art e-commerce ecosystem designed for the curation and customization of museum-grade minimalist posters. It bridges the gap between digital art and physical spaces through a high-performance, aesthetically driven interface.

---

## 🏛️ System Architecture

FrameDrop is engineered with a **Decoupled Monolith** architecture, ensuring high scalability and maintainability.

### 🎨 Frontend (The Studio)
- **Engine**: Next.js 15 with App Router for server-side optimization.
- **Design System**: Atomic design principles implemented via Tailwind CSS v4 and Radix UI primitives.
- **State Orchestration**: Zustand for high-performance, lightweight global state management.
- **Animations**: Framer Motion for sophisticated, physics-based micro-interactions.

### ⚙️ Backend (The Core)
- **Runtime**: Node.js / Express.js with a RESTful API design.
- **Persistence**: MongoDB Atlas with Mongoose for structured schema modeling.
- **Security**: Stateless JWT authentication with Bcrypt-salted password hashing.
- **Media**: Cloudinary SDK for real-time asset optimization and secure CDN delivery.

---

## 🔥 Key Feature Modules

### 🏙️ Interactive Gallery
A mobile-first, horizontally scrolling category browser featuring circular thumbnail components and physics-based touch interactions.

### 🧪 Design Studio
A focused customization environment for selecting sizes, frame styles, and digital proofs before checkout.

### 🛡️ Admin Command Center
A comprehensive suite for operational management:
- **Inventory Matrix**: Real-time CRUD operations for product catalogs.
- **Order Stream**: Live status tracking and fulfillment management.
- **Media Vault**: Secure image uploads with automated Cloudinary processing.

### 💎 UX Pillars
- **Zero-Scroll Auth**: Perfectly framed, split-panel login and registration systems.
- **Aurora Aesthetic**: Dynamic, Grayscale-only background gradients that respond to user presence.
- **Glassmorphism**: Sophisticated blurring and translucency effects across all UI modals.

---

## 📦 Deployment & Setup

### Environment Prerequisites
Ensure you have the following keys ready in your `.env` files:

| Variable | Description |
| :--- | :--- |
| `MONGO_URI` | MongoDB Connection String |
| `JWT_SECRET` | High-entropy signing key |
| `CLOUDINARY_API_KEY` | Media API verification |

### Initial Installation
```bash
# Clone the repository
git clone https://github.com/Arish/framedrop.git

# Install all dependencies (Monorepo root)
npm install
```

---

## 👤 Author Credits

| Author | Role | Focus |
| :--- | :--- | :--- |
| **Arish** | **Frontend Developer** | UI/UX, Design Systems, React Architecture |

- **GitHub**: [@Arish03](https://github.com/Arish03)
- **Portfolio**: [arishsrinivasan](https://arishsrinivasan.in)

---

## 🗺️ Roadmap
- [x] High-End Monochrome Design System
- [x] Admin Inventory & Order Management
- [x] Cloudinary Image Integration
- [ ] Stripe Payment Gateway Integration
- [ ] User Review & Rating System
- [ ] AR Poster Preview via Mobile Devices

---

*© 2026 FrameDrop Studios · "Preserving the Art of Less"*
