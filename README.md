# PropVest — Fractional Real Estate Investment Platform

A React single-page application for fractional co-ownership of Nigerian real estate.

---

## Quick Start

### Prerequisites
- Node.js 18+ (https://nodejs.org)
- npm or yarn

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server (opens at http://localhost:3000)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## Project Structure

```
propvest-app/
├── index.html          # HTML entry point
├── vite.config.js      # Vite config (React plugin, port 3000)
├── package.json
├── src/
│   ├── main.jsx        # React root render
│   └── App.jsx         # All components and logic (single-file)
└── public/             # Static assets (favicon, images)
```

---

## What's Inside App.jsx

All components live in a single file for simplicity. When you're ready to scale:

| Component | Description |
|-----------|-------------|
| `PropVestApp` | Root — mode switcher, tab navigation, routing |
| `Dashboard` | User home, wallet stats, quick actions |
| `AddFundsWidget` | Bank transfer / card top-up modal |
| `Properties` | Property browser with search & filter |
| `PropCard` | Individual property listing card |
| `Portfolio` | User investment overview |
| `ValuationRow` | Property valuation change display |
| `OffPlan` | Off-plan projects with finish tier selector |
| `RenderView` | SVG architectural renders |
| `Withdraw` | Wallet management & bank withdrawal |
| `Documents` | Document vault with email-only enforcement |
| `Support` | Tickets, live chat simulation, FAQ |
| `Profile` | KYC, identity & personal info |
| `HardCopyModal` | Physical document delivery request |
| `DeveloperPortal` | Developer property listing & management |
| `AdminDashboard` | Full admin panel (8 tabs) |

---

## Splitting Into Components (Recommended for Production)

When you're ready to split the single file into a proper component tree:

```
src/
├── App.jsx
├── constants/
│   ├── colors.js        # C = { bg, card, brown, ... }
│   ├── data.js          # INVESTMENTS, PROPS, OFF_PLAN, etc.
│   └── banks.js         # BANKS array
├── components/
│   ├── ui/
│   │   ├── Chip.jsx
│   │   ├── Bar.jsx
│   │   ├── Stat.jsx
│   │   └── HardCopyModal.jsx
│   ├── dashboard/
│   │   ├── Dashboard.jsx
│   │   └── AddFundsWidget.jsx
│   ├── properties/
│   │   ├── Properties.jsx
│   │   └── PropCard.jsx
│   ├── portfolio/
│   │   ├── Portfolio.jsx
│   │   └── ValuationRow.jsx
│   ├── offplan/
│   │   ├── OffPlan.jsx
│   │   └── RenderView.jsx
│   ├── withdraw/
│   │   └── Withdraw.jsx
│   ├── documents/
│   │   └── Documents.jsx
│   ├── support/
│   │   └── Support.jsx
│   ├── profile/
│   │   └── Profile.jsx
│   ├── developer/
│   │   └── DeveloperPortal.jsx
│   └── admin/
│       └── AdminDashboard.jsx
└── hooks/
    └── useWallet.js     # Future: wallet state management
```

---

## Adding a Real Backend

The app is currently a fully static frontend with hardcoded data.
To connect to a real backend, replace the hardcoded constants in App.jsx with API calls:

### Recommended Stack
- **API**: Node.js + Express or NestJS
- **Database**: PostgreSQL (properties, users, investments)
- **Auth**: JWT + BVN/NIN verification via NIBSS
- **Payments**: Paystack (card top-up, verification)
- **Storage**: AWS S3 or Cloudinary (documents, renders)
- **Hosting**: Vercel (frontend) + Railway/Render (backend)

### Example: Replace hardcoded INVESTMENTS

```jsx
// Currently (hardcoded):
const INVESTMENTS = [
  { id:1, name:"Maitama Residency", ... },
  ...
];

// Replace with:
const [investments, setInvestments] = useState([]);
useEffect(() => {
  fetch('/api/v1/investments?userId=USR-001')
    .then(r => r.json())
    .then(data => setInvestments(data));
}, []);
```

---

## Environment Variables

Create a `.env` file in the root for future API integration:

```env
VITE_API_BASE_URL=https://api.staysmartpropvest.com
VITE_PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxx
VITE_ENVIRONMENT=development
```

Access in code: `import.meta.env.VITE_API_BASE_URL`

---

## Key Design Decisions

- **Single-file architecture**: All 4,000+ lines in one file for rapid prototyping. Split into components when the team grows.
- **No external CSS**: All styles are inline React style objects using the `C` color palette.
- **No routing library**: Tab-based navigation via `useState`. Replace with React Router when adding deep links.
- **No state management**: `useState` throughout. Add Zustand or Context when wallet/auth state needs to be shared.
- **Mobile-first**: Fixed `maxWidth: 480px` container simulates a mobile app. Responsive breakpoints to be added for desktop.

---

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag & drop the `dist/` folder to netlify.com
```

### Manual (nginx)

```bash
npm run build
# Serve the dist/ folder with nginx or any static server
```

---

## Colours Reference

All brand colours are in the `C` object at the top of App.jsx:

| Token | Hex | Use |
|-------|-----|-----|
| `C.brownDk` | `#7A3B1E` | Primary dark brown |
| `C.brown` | `#A0522D` | Primary brown |
| `C.brownL` | `#C4956A` | Light brown / accents |
| `C.cream` | `#EDE8E0` | Cream text |
| `C.gold` | `#D4A017` | Gold highlights |
| `C.greenG` | `#52B788` | Success / income green |
| `C.tealG` | `#22D3EE` | Off-plan teal |
| `C.bg` | `#0B0D11` | Page background |
| `C.card` | `#13161C` | Card background |

---

## Browser Support

- Chrome 90+ ✓
- Safari 14+ ✓
- Firefox 88+ ✓
- Edge 90+ ✓
- Mobile Safari (iOS 14+) ✓
- Chrome Android ✓

---

## License

Proprietary — StaySmart PropVest Ltd © 2026. All rights reserved.
