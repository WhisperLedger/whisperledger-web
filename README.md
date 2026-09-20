# WhisperLedger Web (Landing Page & Executive Admin Console)

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

A unified, high-performance web application combining the **WhisperLedger Public Landing Page** and the **Executive Admin Governance Console** (`/admin`).

---

## 🌟 Overview & Key Sections

### 1. Public Marketing Portal (`/`)
- **Hero & Value Proposition**: Showcases the "Money Autopilot for Shared & Personal Living".
- **Interactive 3-Way Outflow Simulator (`OutflowSimulator.tsx`)**:
  - Dynamically demonstrates how bank debits are categorized into *True Personal Outflow*, *Shared Living*, and *100% Recoverable Receivables*.
  - Visualizes how fronting group bills shields disposable *Safe-to-Spend* liquidity.
- **Household Debt Simplifier Demo (`DebtSimplifierDemo.tsx`)**:
  - Interactive demonstration of the greedy **Minimum-Cash-Flow** graph algorithm.
  - Shows 6 raw circular roommate IOUs collapsing into 2 direct UPI transfers with zero debt residue.
- **The 4 Innovation Pillars**: Real-time on-device SMS parsing, Money Recovery Engine, Money Leak Detective, and Biometric Keystore security.
- **Comparison Table**: Direct feature breakdown comparing WhisperLedger against legacy apps (Splitwise, Walnut).
- **Direct APK Downloads**: Instant access to verified Android application releases.

### 2. Executive Admin Console (`/admin` and `/admin/login`)
- **Live System Telemetry**:
  - Real-time registered users, active household clusters, total volume tracked, and pending recoverable wealth.
- **Cluster Diagnostics**:
  - Status indicators for the Go 1.24 runtime (p99 latency), PostgreSQL connection pool (max connections, active workers), and JWT security gateway.
- **Directory Governance**:
  - Searchable and filterable user directory with role badges (`platform_admin`, `household_admin`, `user`).
- **Interactive Demo Mode**: One-click bypass for client presentations and offline previews.

---

## 📁 Directory Structure

```
whisperledger-web/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx             # Responsive header with branding & APK download
│   │   ├── Footer.tsx             # Technical footer with architecture references
│   │   ├── OutflowSimulator.tsx   # Interactive 3-way outflow simulation engine
│   │   └── DebtSimplifierDemo.tsx # Interactive minimum-cash-flow graph demo
│   ├── pages/
│   │   ├── LandingPage.tsx        # High-conversion public portal
│   │   ├── AdminLogin.tsx         # Console authentication & JWT token storage
│   │   └── AdminDashboard.tsx     # Platform analytics & user directory
│   ├── services/
│   │   └── api.ts                 # Type-safe client to Go backend (/api/v1)
│   ├── App.tsx                    # Client-side router configuration
│   ├── main.tsx                   # React DOM root mounting
│   └── index.css                  # Custom Tailwind glassmorphic styling
├── Dockerfile                     # Multi-stage production container
├── nginx.conf                     # Nginx static server + API proxy configuration
├── vite.config.ts                 # Vite config with /api reverse proxy to Go backend
├── tailwind.config.js
└── package.json
```

---

## 🔌 Go Backend Integration

`src/services/api.ts` communicates seamlessly with the `whisperledger-backend` API:
- Automatic Bearer token extraction from `localStorage`.
- Proxies `/api/*` to `http://localhost:8080/api/*` during local development.
- In production, Nginx proxies requests to the `api` container.

---

## 🛠 Local Setup & Development

### 1. Prerequisites
- **Node.js 20+** or **Node.js 25+**
- **npm** (v10+)

### 2. Installation
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```
Generates an optimized bundle in `dist/` in under 2 seconds.

---

## 🐳 Docker Deployment

To build and run the production web container via Nginx:

```bash
docker build -t whisperledger-web .
docker run -p 80:80 whisperledger-web
```
