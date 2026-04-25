/**
 * Recharge Referral Service — Mock Layer
 *
 * This intermediary service mirrors the exact JSON structure returned by
 * the Recharge API. In production, swap the mock implementations below
 * with real fetch calls to the Recharge endpoints.
 *
 * Live endpoints required:
 *   GET  /v1/referrals/:customer_id        → fetchReferralData()
 *   POST /v1/referrals/:customer_id/invite → sendEmailInvite()
 *
 * Auth: Bearer token via X-Recharge-Access-Token header
 */

import type {
  RechargeReferralResponse,
  EmailInvitePayload,
  EmailInviteResponse,
  ReferralActivity,
} from "@/types/recharge";

const MOCK_DELAY_MS = 600;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MOCK_ACTIVITY: ReferralActivity[] = [
  {
    id: "act_1",
    friend_name: "Sarah M.",
    action: "reward_earned",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    amount: 20,
  },
  {
    id: "act_2",
    friend_name: "Priya K.",
    action: "ordered",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "act_3",
    friend_name: "Emma L.",
    action: "signed_up",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "act_4",
    friend_name: "Chloe R.",
    action: "reward_earned",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    amount: 20,
  },
  {
    id: "act_5",
    friend_name: "Ayla T.",
    action: "ordered",
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
  },
];

const MOCK_REFERRAL_DATA: RechargeReferralResponse = {
  user: {
    id: "cust_abc123",
    first_name: "Aditi",
    last_name: "Agrawal",
    email: "aditi.agrawal2112@gmail.com",
    referral_code: {
      code: "ADITI-DITTO-20",
      url: "https://dittodaily.com/ref/ADITI-DITTO-20",
      created_at: "2026-01-15T10:00:00Z",
    },
    stats: {
      total_referrals: 7,
      successful_referrals: 4,
      pending_referrals: 2,
      total_earned: 80,
      available_credit: 40,
      pending_credit: 40,
      currency: "GBP",
    },
    rewards: [
      {
        id: "rew_1",
        type: "referrer_credit",
        status: "earned",
        amount: 20,
        currency: "GBP",
        friend_name: "Sarah M.",
        friend_email: "sarah@example.com",
        created_at: "2026-03-10T10:00:00Z",
        earned_at: "2026-03-12T14:30:00Z",
      },
      {
        id: "rew_2",
        type: "referrer_credit",
        status: "earned",
        amount: 20,
        currency: "GBP",
        friend_name: "Chloe R.",
        friend_email: "chloe@example.com",
        created_at: "2026-03-20T10:00:00Z",
        earned_at: "2026-03-22T09:15:00Z",
      },
      {
        id: "rew_3",
        type: "referrer_credit",
        status: "pending",
        amount: 20,
        currency: "GBP",
        friend_name: "Priya K.",
        friend_email: "priya@example.com",
        created_at: "2026-04-18T10:00:00Z",
        earned_at: null,
      },
      {
        id: "rew_4",
        type: "referrer_credit",
        status: "pending",
        amount: 20,
        currency: "GBP",
        friend_name: "Emma L.",
        friend_email: "emma@example.com",
        created_at: "2026-04-22T10:00:00Z",
        earned_at: null,
      },
    ],
  },
  recent_activity: MOCK_ACTIVITY,
};

/**
 * Fetch referral data for the authenticated subscriber.
 *
 * LIVE IMPLEMENTATION:
 *   const res = await fetch(`${RECHARGE_BASE}/v1/referrals/${customerId}`, {
 *     headers: { "X-Recharge-Access-Token": token }
 *   });
 *   return res.json();
 */
export async function fetchReferralData(): Promise<RechargeReferralResponse> {
  await delay(MOCK_DELAY_MS);
  return structuredClone(MOCK_REFERRAL_DATA);
}

/**
 * Send a referral invite email via Recharge.
 *
 * LIVE IMPLEMENTATION:
 *   const res = await fetch(`${RECHARGE_BASE}/v1/referrals/${customerId}/invite`, {
 *     method: "POST",
 *     headers: {
 *       "X-Recharge-Access-Token": token,
 *       "Content-Type": "application/json"
 *     },
 *     body: JSON.stringify(payload)
 *   });
 *   return res.json();
 */
export async function sendEmailInvite(
  payload: EmailInvitePayload
): Promise<EmailInviteResponse> {
  await delay(MOCK_DELAY_MS);
  console.log("[Mock] Email invite sent:", payload);
  return {
    success: true,
    message: `Invite sent to ${payload.to_name} at ${payload.to_email}`,
  };
}

/**
 * Fetch community-wide referral stats for social proof.
 *
 * LIVE IMPLEMENTATION:
 *   const res = await fetch(`${RECHARGE_BASE}/v1/referrals/stats`, {
 *     headers: { "X-Recharge-Access-Token": token }
 *   });
 *   return res.json();
 */
export async function fetchCommunityStats(): Promise<{
  total_community_referrals: number;
  total_rewards_distributed: number;
  currency: string;
}> {
  await delay(MOCK_DELAY_MS / 2);
  return {
    total_community_referrals: 2847,
    total_rewards_distributed: 56940,
    currency: "GBP",
  };
}
