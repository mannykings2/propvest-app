# PropVest Backend — Go + Docker Architecture

## Project Structure

```
propvest-api/
├── cmd/
│   └── api/
│       └── main.go              # entrypoint
├── internal/
│   ├── auth/                    # JWT, sessions, middleware
│   ├── domain/                  # pure business logic, no framework deps
│   │   ├── user/
│   │   ├── property/
│   │   ├── investment/
│   │   ├── offplan/
│   │   ├── wallet/
│   │   ├── payout/
│   │   ├── kyc/
│   │   ├── support/
│   │   ├── document/
│   │   └── notification/
│   ├── handler/                 # HTTP handlers (one file per domain)
│   ├── middleware/              # auth, rate limit, CORS, logging
│   ├── repository/              # DB queries (one file per domain)
│   ├── service/                 # orchestration layer between handler and repo
│   └── worker/                  # background jobs (payouts, notifications)
├── migrations/                  # SQL migration files
├── config/
│   └── config.go                # env-based config
├── docker/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── wait-for-it.sh
├── docker-compose.yml
├── docker-compose.prod.yml
└── Makefile
```

---

## Tech Stack

| Concern | Choice | Why |
|---|---|---|
| HTTP router | `chi` | Lightweight, idiomatic, middleware-friendly |
| Database | PostgreSQL | Relational, ACID, handles financial data correctly |
| ORM/query | `sqlc` | Generates type-safe Go from raw SQL — no magic |
| Migrations | `golang-migrate` | Simple, reversible, file-based |
| Auth | JWT (RS256) + refresh tokens | Stateless, easy to scale |
| Cache | Redis | Sessions, rate limiting, wallet locks |
| File storage | MinIO (S3-compatible) | Self-hosted, easy to swap to AWS S3 |
| Background jobs | `asynq` (Redis-backed) | Payout processing, notifications |
| Email | SMTP via `gomail` | Swap to SendGrid/Mailgun in prod |
| Payments | Paystack SDK | Nigerian payment gateway |
| Config | `viper` + `.env` | 12-factor app |
| Logging | `zerolog` | Structured JSON logs |
| Validation | `go-playground/validator` | Struct tag validation |

---

## Database Schema

### Core Tables

```sql
-- Users
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_id        TEXT UNIQUE NOT NULL,          -- USR-001
  email         TEXT UNIQUE NOT NULL,
  phone         TEXT,
  password_hash TEXT NOT NULL,
  full_name     TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'user',  -- user | developer | admin
  kyc_status    TEXT NOT NULL DEFAULT 'pending',
  kyc_score     INT DEFAULT 0,
  is_suspended  BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- User profiles (extended info)
CREATE TABLE user_profiles (
  user_id        UUID PRIMARY KEY REFERENCES users(id),
  dob            DATE,
  gender         TEXT,
  nationality    TEXT,
  address        TEXT,
  state          TEXT,
  bvn            TEXT,                          -- encrypted at rest
  nin            TEXT,                          -- encrypted at rest
  tax_id         TEXT,
  occupation     TEXT,
  employer       TEXT,
  net_worth      TEXT,
  annual_income  TEXT,
  investor_class TEXT DEFAULT 'Regular',
  bank_name      TEXT,
  bank_account   TEXT,                          -- encrypted at rest
  bank_verified  BOOLEAN DEFAULT false
);

-- Wallets
CREATE TABLE wallets (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID UNIQUE REFERENCES users(id),
  main_balance    BIGINT DEFAULT 0,             -- in kobo (₦1 = 100 kobo)
  rental_balance  BIGINT DEFAULT 0,
  equity_balance  BIGINT DEFAULT 0,
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Properties
CREATE TABLE properties (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_id            TEXT UNIQUE NOT NULL,
  name              TEXT NOT NULL,
  location          TEXT NOT NULL,
  type              TEXT NOT NULL,              -- Residential | Apartment | Commercial | Land
  income_type       TEXT NOT NULL,              -- rental | resale
  category          TEXT NOT NULL,              -- rental | lease | resale | sold
  status            TEXT NOT NULL DEFAULT 'funding',
  prop_status       TEXT NOT NULL DEFAULT 'Funding',
  spv_name          TEXT NOT NULL,
  total_slots       INT NOT NULL,
  slots_sold        INT DEFAULT 0,
  price_per_slot    BIGINT NOT NULL,            -- kobo
  total_value       BIGINT NOT NULL,
  yield_pct         NUMERIC(5,2),
  monthly_rent      BIGINT DEFAULT 0,
  annual_rent       BIGINT DEFAULT 0,
  hold_years        INT DEFAULT 3,
  sale_eligible_date DATE,
  lock_end_date     DATE,
  funded_pct        NUMERIC(5,2) DEFAULT 0,
  col               TEXT DEFAULT '#A0522D',
  vote_active       BOOLEAN DEFAULT false,
  vote_for          INT DEFAULT 0,
  vote_against      INT DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);

-- Investments (user <-> property)
CREATE TABLE investments (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users(id),
  property_id   UUID REFERENCES properties(id),
  slots         INT NOT NULL DEFAULT 1,
  equity_pct    NUMERIC(5,2) NOT NULL,
  amount_paid   BIGINT NOT NULL,               -- kobo
  service_fee   BIGINT NOT NULL,
  purchase_date TIMESTAMPTZ DEFAULT now(),
  current_val   BIGINT,
  my_vote       TEXT,                          -- for | against | null
  UNIQUE(user_id, property_id)
);

-- Off-plan properties
CREATE TABLE offplan_properties (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  location    TEXT NOT NULL,
  type        TEXT NOT NULL,
  base_price  BIGINT NOT NULL,
  stage       TEXT NOT NULL,                   -- Foundation | Superstructure | Roofing | Finishing
  completion  TEXT NOT NULL,
  developer   TEXT NOT NULL,
  down_pct    INT NOT NULL,
  status      TEXT DEFAULT 'active',
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE offplan_plans (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  offplan_id    UUID REFERENCES offplan_properties(id),
  label         TEXT NOT NULL,
  months        INT NOT NULL,
  interest_rate NUMERIC(5,2) DEFAULT 0
);

CREATE TABLE offplan_finish_types (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  offplan_id  UUID REFERENCES offplan_properties(id),
  label       TEXT NOT NULL,                   -- Carcass | Semi-Finished | Fully Finished
  price       BIGINT NOT NULL,
  description TEXT
);

-- Off-plan subscriptions
CREATE TABLE offplan_subscriptions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID REFERENCES users(id),
  offplan_id        UUID REFERENCES offplan_properties(id),
  plan_id           UUID REFERENCES offplan_plans(id),
  finish_type_id    UUID REFERENCES offplan_finish_types(id),
  total_price       BIGINT NOT NULL,
  down_payment      BIGINT NOT NULL,
  subscription_fee  BIGINT NOT NULL,
  monthly_amount    BIGINT NOT NULL,
  balance           BIGINT NOT NULL,
  status            TEXT DEFAULT 'active',     -- active | defaulted | completed | cancelled
  start_date        TIMESTAMPTZ DEFAULT now(),
  next_payment_date DATE
);

-- Wallet transactions (immutable ledger)
CREATE TABLE wallet_transactions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES users(id),
  type         TEXT NOT NULL,                  -- deposit | withdrawal | investment | rental_income | fee | refund
  amount       BIGINT NOT NULL,                -- kobo, always positive
  direction    TEXT NOT NULL,                  -- credit | debit
  balance_after BIGINT NOT NULL,
  reference    TEXT UNIQUE,
  description  TEXT,
  status       TEXT DEFAULT 'completed',
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- Rental income history
CREATE TABLE rental_distributions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id),
  investment_id UUID REFERENCES investments(id),
  user_id     UUID REFERENCES users(id),
  period      TEXT NOT NULL,                   -- "Feb 2026"
  gross_amount BIGINT NOT NULL,
  mgmt_fee    BIGINT NOT NULL,
  wht_amount  BIGINT NOT NULL,
  net_amount  BIGINT NOT NULL,
  status      TEXT DEFAULT 'pending',          -- pending | paid
  paid_at     TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- KYC submissions
CREATE TABLE kyc_submissions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID UNIQUE REFERENCES users(id),
  status           TEXT DEFAULT 'pending',
  score            INT DEFAULT 0,
  risk_level       TEXT DEFAULT 'Low',
  submitted_at     TIMESTAMPTZ DEFAULT now(),
  reviewed_at      TIMESTAMPTZ,
  reviewed_by      UUID REFERENCES users(id),
  rejection_reason TEXT
);

CREATE TABLE kyc_documents (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kyc_id      UUID REFERENCES kyc_submissions(id),
  doc_type    TEXT NOT NULL,                   -- nin | address | selfie | income | bvn_consent
  file_key    TEXT NOT NULL,                   -- MinIO/S3 key
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- Support tickets
CREATE TABLE support_tickets (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_id      TEXT UNIQUE NOT NULL,            -- TKT-001
  user_id     UUID REFERENCES users(id),
  subject     TEXT NOT NULL,
  category    TEXT NOT NULL,
  status      TEXT DEFAULT 'open',
  priority    TEXT DEFAULT 'medium',
  assigned_to UUID REFERENCES users(id),
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE support_messages (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID REFERENCES support_tickets(id),
  sender_id UUID REFERENCES users(id),
  from_role TEXT NOT NULL,                     -- user | agent
  body      TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Documents
CREATE TABLE documents (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id),
  property_id UUID REFERENCES properties(id),
  name        TEXT NOT NULL,
  type        TEXT NOT NULL,                   -- Legal | Title | Financial | SPV | Off-Plan
  file_key    TEXT NOT NULL,
  email_only  BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Staff
CREATE TABLE staff (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id),
  role        TEXT NOT NULL,                   -- manager | accountant | support | compliance
  permissions TEXT[] DEFAULT '{}',
  status      TEXT DEFAULT 'active',
  joined_at   TIMESTAMPTZ DEFAULT now()
);

-- Sale votes
CREATE TABLE sale_votes (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id    UUID REFERENCES properties(id),
  triggered_by   UUID REFERENCES users(id),
  status         TEXT DEFAULT 'active',        -- active | passed | failed | expired
  votes_for      INT DEFAULT 0,
  votes_against  INT DEFAULT 0,
  required_votes INT NOT NULL,
  created_at     TIMESTAMPTZ DEFAULT now(),
  closes_at      TIMESTAMPTZ
);

CREATE TABLE sale_vote_entries (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vote_id   UUID REFERENCES sale_votes(id),
  user_id   UUID REFERENCES users(id),
  vote      TEXT NOT NULL,                     -- for | against
  cast_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE(vote_id, user_id)
);
```

> All monetary values are stored in **kobo** (smallest unit). Never use floats for money — always integers.

---

## API Design

Base URL: `/api/v1`

### Auth

```
POST   /auth/register
POST   /auth/login
POST   /auth/refresh
POST   /auth/logout
POST   /auth/forgot-password
POST   /auth/reset-password
```

### User / Investor

```
GET    /me
PUT    /me
GET    /me/wallet
GET    /me/wallet/transactions
POST   /me/wallet/add-funds
POST   /me/wallet/withdraw
POST   /me/wallet/transfer-earnings

GET    /me/kyc
POST   /me/kyc/submit
POST   /me/kyc/documents

GET    /me/investments
GET    /me/investments/:id
POST   /me/investments/:id/vote
POST   /me/investments/:id/trigger-sale
GET    /me/investments/income-history

GET    /properties
GET    /properties/:id
POST   /properties/:id/invest

GET    /offplan
GET    /offplan/:id
POST   /offplan/:id/subscribe
GET    /offplan/subscriptions
POST   /offplan/subscriptions/:id/pay

GET    /documents
GET    /documents/:id/download
POST   /documents/statement
POST   /documents/hardcopy

GET    /support/tickets
POST   /support/tickets
GET    /support/tickets/:id
POST   /support/tickets/:id/messages
GET    /support/faq

POST   /withdraw/verify-account
POST   /withdraw/initiate
GET    /withdraw/history
```

### Admin (require `admin` role)

```
GET    /admin/overview
GET    /admin/activity

GET    /admin/users
GET    /admin/users/:id
POST   /admin/users/:id/suspend
POST   /admin/users/:id/impersonate

GET    /admin/kyc
GET    /admin/kyc/:userId
POST   /admin/kyc/:userId/approve
POST   /admin/kyc/:userId/reject

GET    /admin/properties
POST   /admin/properties
GET    /admin/properties/:id
PUT    /admin/properties/:id
POST   /admin/properties/:id/publish

GET    /admin/finance/overview
GET    /admin/finance/distributions
POST   /admin/finance/process-payout
GET    /admin/finance/accounts
PUT    /admin/finance/charges

GET    /admin/staff
POST   /admin/staff
PUT    /admin/staff/:id
POST   /admin/staff/:id/suspend
PUT    /admin/staff/:id/permissions

GET    /admin/compliance
GET    /admin/support/tickets
POST   /admin/support/tickets/:id/reply
POST   /admin/support/tickets/:id/close
```

### Developer (require `developer` role)

```
GET    /developer/overview
GET    /developer/properties
POST   /developer/properties
GET    /developer/properties/:id
PUT    /developer/properties/:id
POST   /developer/properties/:id/documents
GET    /developer/properties/:id/subscribers
```

---

## Docker Setup

### `docker-compose.yml` (development)

```yaml
version: "3.9"

services:
  api:
    build:
      context: .
      dockerfile: docker/Dockerfile.dev
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgres://propvest:secret@postgres:5432/propvest?sslmode=disable
      - REDIS_URL=redis://redis:6379
      - MINIO_ENDPOINT=minio:9000
      - MINIO_ACCESS_KEY=minioadmin
      - MINIO_SECRET_KEY=minioadmin
      - JWT_PRIVATE_KEY_PATH=/run/secrets/jwt_private
      - PAYSTACK_SECRET_KEY=${PAYSTACK_SECRET_KEY}
      - APP_ENV=development
    volumes:
      - .:/app
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    command: air

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: propvest
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: propvest
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U propvest"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5

  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    volumes:
      - minio_data:/data

  migrate:
    image: migrate/migrate
    volumes:
      - ./migrations:/migrations
    command: ["-path", "/migrations", "-database", "postgres://propvest:secret@postgres:5432/propvest?sslmode=disable", "up"]
    depends_on:
      postgres:
        condition: service_healthy

volumes:
  postgres_data:
  redis_data:
  minio_data:
```

### `docker/Dockerfile` (production)

```dockerfile
# Build stage
FROM golang:1.23-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o /propvest-api ./cmd/api

# Final stage — minimal image
FROM gcr.io/distroless/static-debian12
COPY --from=builder /propvest-api /propvest-api
EXPOSE 8080
ENTRYPOINT ["/propvest-api"]
```

The final image is ~10MB with zero shell, zero OS packages.

### `docker/Dockerfile.dev`

```dockerfile
FROM golang:1.23-alpine
WORKDIR /app
RUN go install github.com/air-verse/air@latest
COPY go.mod go.sum ./
RUN go mod download
EXPOSE 8080
CMD ["air"]
```

---

## Key Implementation Patterns

### 1. Layered Architecture

Every domain follows the same three-layer pattern:

```
Handler → Service → Repository
```

- **Handler** — parse HTTP request, validate input, call service, write response
- **Service** — business logic, orchestration, calls multiple repos if needed
- **Repository** — pure DB queries, no business logic

Example — processing a payout:

```go
// handler/finance.go
func (h *FinanceHandler) ProcessPayout(w http.ResponseWriter, r *http.Request) {
    var req ProcessPayoutRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        render.BadRequest(w, "invalid request body")
        return
    }
    if err := validate.Struct(req); err != nil {
        render.ValidationError(w, err)
        return
    }
    result, err := h.financeService.ProcessPayout(r.Context(), req)
    if err != nil {
        render.InternalError(w, err)
        return
    }
    render.JSON(w, http.StatusOK, result)
}

// service/finance.go
func (s *FinanceService) ProcessPayout(ctx context.Context, req ProcessPayoutRequest) (*PayoutResult, error) {
    prop, err := s.propertyRepo.GetByID(ctx, req.PropertyID)
    if err != nil {
        return nil, err
    }
    mgmtFee := prop.MonthlyRent / 10          // 10%
    wht := prop.MonthlyRent * 9 / 100         // 9%
    net := prop.MonthlyRent - mgmtFee - wht

    for _, invID := range req.InvestorIDs {
        inv, _ := s.investmentRepo.GetByID(ctx, invID)
        share := net * inv.EquityPct / 100
        if err := s.walletService.Credit(ctx, inv.UserID, share, "rental_income", prop.Name); err != nil {
            return nil, err
        }
    }
    return s.distributionRepo.Create(ctx, req.PropertyID, net)
}
```

### 2. Money Handling

Always use integers (kobo). Never `float64` for money.

```go
// domain/money.go
type Kobo int64

func (k Kobo) ToNaira() float64 { return float64(k) / 100 }
func FromNaira(n float64) Kobo  { return Kobo(math.Round(n * 100)) }
func (k Kobo) String() string   { return fmt.Sprintf("₦%s", formatKobo(k)) }
```

### 3. Wallet Locking

Use Redis distributed locks before any wallet debit to prevent double-spend:

```go
func (s *WalletService) Debit(ctx context.Context, userID uuid.UUID, amount Kobo, txType string) error {
    lockKey := fmt.Sprintf("wallet:lock:%s", userID)
    locked, err := s.redis.SetNX(ctx, lockKey, 1, 5*time.Second)
    if err != nil || !locked {
        return ErrWalletLocked
    }
    defer s.redis.Del(ctx, lockKey)

    wallet, err := s.repo.GetForUpdate(ctx, userID) // SELECT ... FOR UPDATE
    if err != nil {
        return err
    }
    if wallet.MainBalance < int64(amount) {
        return ErrInsufficientFunds
    }
    return s.repo.Debit(ctx, userID, amount, txType)
}
```

### 4. JWT Auth Middleware

Two tokens: short-lived access (15 min) + long-lived refresh (7 days).
Access token carries: `userID`, `role`, `permissions[]`.
Refresh token stored in Redis, invalidated on logout.

```go
func AuthMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := extractBearerToken(r)
        claims, err := jwt.Verify(token)
        if err != nil {
            render.Unauthorized(w)
            return
        }
        ctx := context.WithValue(r.Context(), ctxKeyUser, claims)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}

func RequireRole(roles ...string) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            claims := UserFromContext(r.Context())
            if !slices.Contains(roles, claims.Role) {
                render.Forbidden(w)
                return
            }
            next.ServeHTTP(w, r)
        })
    }
}
```

### 5. Background Workers

Payout processing, email notifications, and instalment debits run as background jobs via `asynq`:

```go
// worker/payout.go — runs on the 14th of every month
func (w *PayoutWorker) ProcessMonthlyPayouts(ctx context.Context, task *asynq.Task) error {
    properties, err := w.propertyRepo.GetActiveRentalProperties(ctx)
    if err != nil {
        return err
    }
    for _, prop := range properties {
        investments, _ := w.investmentRepo.GetByProperty(ctx, prop.ID)
        for _, inv := range investments {
            share := calculateShare(prop.MonthlyRent, inv.EquityPct)
            w.walletService.Credit(ctx, inv.UserID, share, "rental_income", prop.Name)
            w.notificationService.Send(ctx, inv.UserID, "Rental income credited")
        }
    }
    return nil
}
```

---

## Financial Flows

### Deposit
1. User initiates deposit (bank transfer or card)
2. Reference code generated (`USR-XXX-FUND`)
3. Funds held in escrow
4. Credited to main wallet within 30 mins on business days

### Investment
1. User selects property and slot count
2. Total = slot cost + 2% service fee
3. Wallet debited (with Redis lock)
4. Funds held in escrow until property fully funded
5. Co-ownership deed issued within 24 hrs
6. Monthly rental income distributed on the 14th

### Rental Distribution
1. Admin triggers monthly payout
2. Gross rent collected from property
3. Deduct 10% management fee
4. Deduct 9% withholding tax (WHT)
5. Net credited to each investor's rental balance
6. User can transfer to main wallet or withdraw to bank

### Withdrawal
1. User initiates withdrawal from main wallet
2. Minimum: ₦1,000 — Fee: ₦50 flat
3. Bank account verified via NIBSS
4. Processed within 30 mins on business days

### Off-Plan Subscription
1. Down payment (15–25%) + 2% subscription fee due today
2. Monthly instalments auto-debited
3. Grace period: 20 days on missed payment
4. Default after 20 days: 15% cancellation fee, 85% refund

### Sale Vote & Exit
1. Hold period expires (3–5 years)
2. Co-owner triggers sale vote — all co-owners notified
3. Threshold: >50% in favour required
4. If passed: independent NIESV valuation, property listed
5. Proceeds distributed proportionally on sale
6. If failed: co-owner may offer equity to existing co-owners at cost + 50% of unrealised gain

---

## Fee Structure

| Fee | Rate |
|---|---|
| Service fee (investments) | 2% of investment |
| Management fee (rental) | 10% of monthly rent |
| Withholding tax (WHT) | 9% of rental income |
| Withdrawal fee | ₦50 flat |
| Card top-up surcharge | 1.5% |
| Hard copy delivery | ₦1,500–₦4,500 |
| Off-plan cancellation | 15% of total paid |
| Resale commission | 2–5% |

---

## Migration Strategy

Because everything runs in Docker with named volumes, migrating to any cloud provider is straightforward:

```bash
# Dump data from current host
docker exec propvest-postgres pg_dump -U propvest propvest > backup.sql

# On new host — spin up the stack
docker compose -f docker-compose.prod.yml up -d

# Restore
cat backup.sql | docker exec -i propvest-postgres psql -U propvest propvest
```

MinIO is S3-compatible — when ready to move to AWS, use `mc mirror` to sync directly to S3 with zero code changes.

---

## Build Order (Recommended)

| # | Module | Why first |
|---|---|---|
| 1 | Auth | Everything else depends on it |
| 2 | Wallet | Core financial primitive |
| 3 | Properties | Main product |
| 4 | Portfolio | User investments and income |
| 5 | KYC | Required before investing |
| 6 | Payouts | Revenue distribution |
| 7 | Off-Plan | Secondary product |
| 8 | Withdraw | Completes the money loop |
| 9 | Support | User communication |
| 10 | Documents | Legal compliance |
| 11 | Admin | Operations and oversight |
| 12 | Developer Portal | Property supply side |

Each module is independently deployable and testable. Run the full stack locally from day one with:

```bash
docker compose up
```
