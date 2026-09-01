# PropVest — Fractional Real Estate Investment Platform

A modern React single-page application for fractional co-ownership and investment in Nigerian real estate. PropVest enables users to invest in verified prime properties, buy into off-plan developments with flexible instalment plans, manage portfolios, and withdraw returns, alongside dedicated Developer and Admin portals.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** ([nodejs.org](https://nodejs.org))
- **npm** or **yarn** / **pnpm**

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server (runs at http://localhost:3000)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
propvest-app/
├── index.html                  # HTML entry point & global dark theme baseline
├── vite.config.js              # Vite configuration (React plugin, dev server on port 3000)
├── package.json                # Project scripts & dependencies (React 18, Vite 5)
├── package-lock.json
├── README.md                   # Project documentation
│
└── src/
    ├── main.jsx                # React root mount point
    ├── App.jsx                 # App root: mode switching (User / Dev / Admin) & navigation
    │
    ├── constants/              # App-wide constants, mock data, and theme tokens
    │   ├── theme.js            # Design tokens, color palette (C), and currency formatters (nfmt)
    │   └── data.js             # Mock data (properties, investments, off-plan projects, banks, etc.)
    │
    ├── components/             # Reusable UI & modal components
    │   ├── HardCopyModal.jsx   # Modal for requesting physical document dispatch
    │   └── ui/
    │       ├── Bar.jsx         # Custom progress bar component
    │       ├── Chip.jsx        # Status tags & category badge chips
    │       └── Stat.jsx        # Formatted KPI / metric display card
    │
    └── features/               # Feature-based domain modules
        ├── dashboard/
        │   ├── Dashboard.jsx       # User home, portfolio metrics, quick actions & highlights
        │   └── AddFundsWidget.jsx  # Wallet top-up modal (card & NIBSS bank transfer flows)
        ├── properties/
        │   ├── Properties.jsx      # Marketplace with search, category filters, property detail & investing
        │   └── PropCard.jsx        # Individual property listing card
        ├── portfolio/
        │   ├── Portfolio.jsx       # Holdings breakdown, dividend history, performance analytics
        │   └── ValuationRow.jsx    # Valuation appreciation tracking item
        ├── offplan/
        │   ├── OffPlan.jsx         # Off-plan projects, milestone progress & instalment purchase tiers
        │   └── RenderView.jsx      # Architectural SVG & 3D render visualizer
        ├── withdraw/
        │   └── Withdraw.jsx        # Wallet payouts to verified Nigerian bank accounts
        ├── documents/
        │   └── Documents.jsx       # Secure document vault (deeds, legal certificates, e-signing)
        ├── profile/
        │   └── Profile.jsx         # KYC identity levels (BVN, NIN), personal details & settings
        ├── support/
        │   └── Support.jsx         # Helpdesk, ticket submission, FAQ & simulated live chat
        ├── developer/
        │   └── DeveloperPortal.jsx # Developer console: project listings, inspection logs, payout requests
        └── admin/
            └── AdminDashboard.jsx  # Comprehensive 8-tab operations center (KYC, properties, approvals, ledger)
```

---

## 🏛 Feature Overview

### 1. User Investment Experience
- **Dashboard**: Net worth, wallet balances, dividend yields, and recent activity.
- **Properties Marketplace**: Fractional investment opportunities with financial calculators, yield estimates, and share acquisition.
- **Portfolio Management**: Active holdings, yield distributions, capital appreciation tracking, and certificate downloads.
- **Off-Plan Projects**: Construction milestone tracker, finish tier selection (Shell, Standard, Luxury), and instalment payment plans.
- **Wallet & Payouts**: Secure top-up (Card/Transfer) and verified bank withdrawals.
- **Document Vault**: Tamper-proof title deeds, survey plans, and physical hard-copy delivery requests.
- **KYC & Security**: Multi-tier KYC verification (BVN, NIN, Utility bills) in compliance with SEC regulations.
- **Support**: In-app ticketing, simulated real-time chat, and FAQs.

### 2. Developer Portal
- Manage submitted developments and construction phases.
- Upload milestone updates, site inspection reports, and engineer certifications.
- Request milestone-based escrow payouts and track investor subscriptions.

### 3. Admin Operations Centre
- Complete operations dashboard with 8 management modules:
  - User verification & KYC review queues
  - Property listing moderation and valuation updates
  - Off-plan development escrow management
  - Financial ledger, transaction approvals, and audit logs

---

## 🎨 Design System & Theme

All design tokens and color constants are centralized in [`src/constants/theme.js`](file:///c:/Users/USER/go_projects/propvest-app/src/constants/theme.js):

| Token | Value | Purpose |
|---|---|---|
| `C.bg` | `#0B0D11` | Root page background |
| `C.card` / `C.cardH` | `#13161C` / `#181B22` | Card container / hover states |
| `C.border` | `#1E222D` | Section borders and dividers |
| `C.brown` / `C.brownD` / `C.brownL` | `#A0522D` / `#7A3B1E` / `#C4956A` | Primary brand accent tones |
| `C.gold` / `C.goldL` | `#B8860B` / `#D4A017` | Premium badges & highlights |
| `C.green` / `C.greenL` / `C.greenG` | `#2D6A4F` / `#40916C` / `#52B788` | Returns, success & verified badges |
| `C.teal` / `C.tealL` / `C.tealG` | `#0F4C5C` / `#0E7490` / `#22D3EE` | Off-plan developments & tech accents |
| `C.indigo` / `C.indigoL` / `C.indigoG` | `#3730A3` / `#6366F1` / `#A5B4FC` | Developer portal & secondary highlights |
| `C.white` / `C.cream` / `C.muted` | `#FDFAF6` / `#EDE8E0` / `#6B7280` | High-contrast typography hierarchy |

---

## 🔌 Backend Integration Guide

Currently, the application runs client-side with mock datasets defined in [`src/constants/data.js`](file:///c:/Users/USER/go_projects/propvest-app/src/constants/data.js).

### Recommended Production Stack
- **Backend API**: Node.js (NestJS / Express) or Go / Python (FastAPI)
- **Database**: PostgreSQL (relational investment ledgers, property listings, users)
- **Identity & KYC**: NIBSS BVN verification, Smile ID, or Dojah (NIN/BVN lookup)
- **Payment Gateway**: Paystack / Flutterwave (Card, Direct Debit, Virtual Bank Accounts)
- **Storage**: AWS S3 / Cloudflare R2 (Deeds, survey documents, construction photos)
- **Authentication**: JWT / OAuth2 with multi-factor authentication (MFA)

### Connecting APIs
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://api.staysmartpropvest.com/v1
VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxx
```

Access in application code:
```javascript
const API_URL = import.meta.env.VITE_API_BASE_URL;
```

---

## 🚢 Deployment

### Vercel
```bash
npx vercel
```

### Netlify
```bash
npm run build
# Deploy the generated `dist/` directory
```

### Static Hosting / Docker (Nginx)
```bash
npm run build
# Serve `dist/` with Nginx or any static file server
```

---

## 📄 License

Proprietary — StaySmart PropVest Ltd © 2026. All rights reserved.
