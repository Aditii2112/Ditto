"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  RechargeReferralResponse,
  EmailInviteResponse,
} from "@/types/recharge";
import {
  fetchReferralData,
  sendEmailInvite,
  fetchCommunityStats,
} from "@/services/rechargeService";

interface UseRechargeReferralReturn {
  data: RechargeReferralResponse | null;
  communityStats: {
    total_community_referrals: number;
    total_rewards_distributed: number;
    currency: string;
  } | null;
  isLoading: boolean;
  error: string | null;
  sendInvite: (
    email: string,
    name: string
  ) => Promise<EmailInviteResponse>;
  refresh: () => Promise<void>;
}

/**
 * Hook wrapping all Recharge referral operations.
 *
 * Currently backed by mock data. When connecting to live Recharge:
 * 1. Update rechargeService.ts to use real fetch calls
 * 2. Pass the subscriber's session/token to this hook
 * 3. No changes needed in components — they consume the same shape
 */
export function useRechargeReferral(): UseRechargeReferralReturn {
  const [data, setData] = useState<RechargeReferralResponse | null>(null);
  const [communityStats, setCommunityStats] = useState<{
    total_community_referrals: number;
    total_rewards_distributed: number;
    currency: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [referralData, stats] = await Promise.all([
        fetchReferralData(),
        fetchCommunityStats(),
      ]);
      setData(referralData);
      setCommunityStats(stats);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load referral data"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const sendInvite = useCallback(
    async (email: string, name: string): Promise<EmailInviteResponse> => {
      if (!data) {
        return { success: false, message: "Referral data not loaded" };
      }
      return sendEmailInvite({
        to_email: email,
        to_name: name,
        referral_code: data.user.referral_code.code,
        sender_name: data.user.first_name,
      });
    },
    [data]
  );

  return {
    data,
    communityStats,
    isLoading,
    error,
    sendInvite,
    refresh: loadData,
  };
}
