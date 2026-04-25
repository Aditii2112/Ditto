# DITTO — Refer a Friend Page

A high-converting referral page for DITTO cycle supplements, built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. Integrates with Recharge's referral system via a Custom SDK approach.

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
