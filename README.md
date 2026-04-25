# DITTO — Refer a Friend Page

A high-converting referral page for DITTO cycle supplements, built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. Integrates with Recharge's referral system via a Custom SDK approach.

## Brief Responses (Audit / Build / Test)

### 1) Audit — why the current page underperforms

- **Commercial gaps**
  - **Weak value framing**: the “mutual benefit” isn’t shown clearly side-by-side (friend gets discount, referrer earns credit).
  - **Low trust & motivation**: minimal social proof and no visibility into “people like me are earning rewards”.
  - **No momentum**: no reward dashboard or progress feedback loop to encourage repeat referrals.

- **Structural / UX gaps**
  - **High-friction gate**: asks for full registration immediately instead of letting existing subscribers share instantly.
  - **Wall of text**: the “how it works” content is not progressive; users must parse everything at once.
  - **Sharing isn’t one-click**: the primary action should be copy/share first, not a long form.
  - **No progress state**: users can’t see steps like “Invite sent → Friend ordered → Reward earned”.

- **Technical gaps**
  - **Not integrated headlessly**: a widget/iframe approach can limit UI control and experimentation velocity.
  - **No modular layer for Recharge**: without a service layer + typed contracts, swapping mock → live is harder and riskier.

### 2) Build — what was built and why it fits Recharge migration

- **Approach chosen**: Recharge **Custom SDK / API** style integration (headless UI in React/Next.js), instead of the native widget.
  - **Why**: full brand control, better UX patterns (progressive disclosure, sticky visual, premium layout), and easier experimentation.

- **Integration flow (mocked, ready for live handoff)**
  - **Authentication**: identify subscriber via active Shopify session or email lookup (planned for live).
  - **Data fetching**: `useRechargeReferral()` uses `useEffect` to fetch:
    - `referral_code` (unique link)
    - `reward_balance` / credits split into **available vs pending**
    - reward history + recent activity for social proof
  - **Intermediary layer**: `src/services/rechargeService.ts` returns hardcoded data that mirrors the expected Recharge JSON structure.

- **Structural & commercial enhancements implemented**
  - **Progressive disclosure**: `ProgressTracker` shows the flow step-by-step.
  - **One-click sharing**: `CopyLinkWidget` includes clipboard copy + Web Share API (mobile WhatsApp/iMessage share).
  - **Social proof**: `SocialProof` rotates “recently earned” style activity + community totals.
  - **Immediate value clarity**: `RewardDashboard` shows **Friend’s Reward** and **Your Reward** side-by-side plus **Available vs Pending** credits.
  - **Lead capture**: `EmailInviteTool` provides in-page invites (CRM capture path).

### 3) Test — what to A/B test first, metrics, and success at 30/90 days

#### A/B tests (highest impact first)

- **Primary CTA**
  - Variant A: “Copy link”
  - Variant B: “Share now” (Web Share first on mobile, copy secondary)
  - Metric focus: share initiation rate, referral link clicks

- **Value proposition framing**
  - Variant A: “Give 20%, Get £20”
  - Variant B: “Give 20%, Get 20%”
  - Metric focus: referral-start and conversion downstream

- **Progress + gamification**
  - Show reward dashboard above the fold vs below
  - Metric focus: repeat shares per referrer, second referral rate

- **Social proof**
  - Ticker visible by default vs collapsed
  - Metric focus: CTA click-through, session-to-share conversion

#### Metrics that matter

- **Activation**
  - Referral page CTR from account / post-purchase touchpoints
  - Share initiation rate (copy/share button clicks)
  - Referral link clicks per referrer

- **Conversion**
  - Friend checkout conversion rate (new customer only)
  - First-order AOV and subscription conversion (if applicable)

- **Loop / retention**
  - Successful referrals per active referrer
  - Time-to-first-successful-referral
  - Repeat share rate (users who share again within 7/30 days)

- **Operational**
  - Fraud/abuse signals (self-referrals, duplicate emails, coupon abuse)

#### What success looks like

- **30 days**
  - Higher share initiation and referral link clicks vs baseline
  - Measurable lift in new-customer first orders attributed to referrals
  - Early signal of repeat sharing behavior (referrers sharing multiple times)

- **90 days**
  - Sustained improvement in successful referrals per referrer
  - Meaningful share of new customers coming through referrals
  - Stronger repeat referral loop (more multi-referrers, lower time-to-success)

## Quick Start

```bash
npm install
npm run dev     # → http://localhost:3000
npm run build   # production build
```

## Architecture

### Why Custom SDK over Native Widget

Recharge provides a drop-in referral widget, but it renders inside an iframe with limited styling control. The Custom SDK approach builds a **headless UI** that:

- Matches DITTO's brand identity pixel-perfectly (warm cream, forest green, terracotta)
- Enables progressive disclosure instead of a wall-of-text form
- Supports native mobile sharing (Web Share API → WhatsApp, iMessage)
- Provides a gamified reward dashboard to drive repeat referrals
- Captures lead data through the built-in email invite tool

### Mock Service Layer

Since live Recharge credentials are not provided, all API calls go through an **intermediary service layer** (`src/services/rechargeService.ts`) that returns hardcoded data mirroring the exact Recharge API JSON structure.

**To connect to live Recharge:**

1. Replace the mock implementations in `rechargeService.ts` with real `fetch()` calls
2. Add the `X-Recharge-Access-Token` header
3. No component changes required — they consume the same data shape

### Recharge API Endpoints Required

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/v1/referrals/:customer_id` | Fetch referral code, stats, reward history |
| `POST` | `/v1/referrals/:customer_id/invite` | Send email invite via Recharge |
| `GET` | `/v1/referrals/stats` | Community-wide referral stats (social proof) |

**Authentication:** Bearer token via `X-Recharge-Access-Token` header.

**Subscriber identification:** The live implementation should identify the subscriber through their active Shopify session or email lookup.

## File Structure

```
src/
├── app/
│   ├── globals.css        # DITTO brand tokens + Tailwind config
│   ├── layout.tsx          # Root layout with Playfair Display serif font
│   └── page.tsx            # Main referral page (assembles all components)
├── components/
│   ├── Navbar.tsx          # Sticky nav matching DITTO's site header
│   ├── HeroCard.tsx        # "Aditi, share the glow" personalised greeting
│   ├── CopyLinkWidget.tsx  # One-tap copy + Web Share API + social buttons
│   ├── EmailInviteTool.tsx # Built-in email invite form (CRM lead capture)
│   ├── RewardDashboard.tsx # Available vs Pending credits + reward history
│   ├── ProgressTracker.tsx # 3-step "How It Works" progressive disclosure
│   ├── SocialProof.tsx     # Animated activity ticker + community stats
│   ├── FAQ.tsx             # Accordion FAQ section
│   └── Footer.tsx          # Site footer
├── hooks/
│   └── useRechargeReferral.ts  # Central hook wrapping all Recharge operations
├── services/
│   └── rechargeService.ts      # Mock → Live intermediary service layer
└── types/
    └── recharge.ts             # TypeScript types matching Recharge API schema
```

## Component → Commercial Impact

| Component | Function | Impact |
|-----------|----------|--------|
| **HeroCard** | Personalised greeting ("Aditi, share the glow") | Emotional connection |
| **CopyLinkWidget** | Single-tap copy + "Copied!" confirmation | Reduces friction |
| **EmailInviteTool** | Send invites from the page | CRM lead capture |
| **RewardDashboard** | Available vs Pending credits | Gamification loop |
| **ProgressTracker** | Step-by-step flow | Replaces wall of text |
| **SocialProof** | Live activity ticker + community count | Social validation |

## Key Design Decisions

1. **Progressive Disclosure** — Instead of showing everything at once (the current page's problem), the flow guides users: Hero → Share → Track → Learn
2. **Web Share API** — Mobile users get native sharing to WhatsApp/iMessage, the highest-converting channels for referrals
3. **Dual Reward Display** — "Friend's Reward" and "Your Reward" shown side-by-side to emphasise mutual benefit
4. **Activity Ticker** — Auto-rotating "recently earned" notifications create urgency and social proof
5. **No iframe dependency** — Full control over UX, accessibility, and performance
