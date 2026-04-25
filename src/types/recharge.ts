/**
 * Type definitions mirroring the Recharge Referrals API response structure.
 * See: https://developer.rechargepayments.com/2021-11/referrals
 *
 * These types are used by the mock service layer now and will map 1:1
 * to live Recharge API responses when credentials are connected.
 */

export interface ReferralCode {
  code: string;
  url: string;
  created_at: string;
}

export interface ReferralReward {
  id: string;
  type: "referrer_credit" | "friend_discount";
  status: "pending" | "earned" | "redeemed" | "expired";
  amount: number;
  currency: string;
  friend_name: string;
  friend_email: string;
  created_at: string;
  earned_at: string | null;
}

export interface ReferralStats {
  total_referrals: number;
  successful_referrals: number;
  pending_referrals: number;
  total_earned: number;
  available_credit: number;
  pending_credit: number;
  currency: string;
}

export interface ReferralUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  referral_code: ReferralCode;
  stats: ReferralStats;
  rewards: ReferralReward[];
}

export interface ReferralActivity {
  id: string;
  friend_name: string;
  action: "signed_up" | "ordered" | "reward_earned";
  timestamp: string;
  amount?: number;
}

export interface RechargeReferralResponse {
  user: ReferralUser;
  recent_activity: ReferralActivity[];
}

export interface EmailInvitePayload {
  to_email: string;
  to_name: string;
  referral_code: string;
  sender_name: string;
}

export interface EmailInviteResponse {
  success: boolean;
  message: string;
}
