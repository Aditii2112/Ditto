"use client";

import type { ReferralStats, ReferralReward } from "@/types/recharge";

interface RewardDashboardProps {
  stats: ReferralStats;
  rewards: ReferralReward[];
}

export default function RewardDashboard({
  stats,
  rewards,
}: RewardDashboardProps) {
  const earnedRewards = rewards.filter((r) => r.status === "earned");
  const pendingRewards = rewards.filter((r) => r.status === "pending");

  return (
    <div className="rounded-2xl border border-[#E5D5C5] bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-6 font-serif text-xl font-medium text-[#1A1A1A]">
        Your Rewards
      </h2>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <CreditCard
          label="Available Credit"
          amount={stats.available_credit}
          currency={stats.currency}
          variant="available"
        />
        <CreditCard
          label="Pending Credit"
          amount={stats.pending_credit}
          currency={stats.currency}
          variant="pending"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex items-center gap-3 rounded-xl bg-[#FBF7F2] p-4">
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-2xl font-semibold text-[#1A1A1A]">
              20%
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-[#1A1A1A]">
              Friend&apos;s Reward
            </p>
            <p className="text-xs text-[#888]">Off their first order</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-[#FBF7F2] p-4">
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-2xl font-semibold text-[#1A1A1A]">
              &pound;20
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-[#1A1A1A]">Your Reward</p>
            <p className="text-xs text-[#888]">Credit per referral</p>
          </div>
        </div>
      </div>

      {(earnedRewards.length > 0 || pendingRewards.length > 0) && (
        <div className="mt-6 border-t border-[#E5D5C5] pt-5">
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-[#AAA]">
            Reward History
          </h3>
          <div className="space-y-2">
            {[...pendingRewards, ...earnedRewards].map((reward) => (
              <div
                key={reward.id}
                className="flex items-center justify-between rounded-lg border border-[#F0E8DF] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      reward.status === "earned"
                        ? "bg-emerald-500"
                        : "bg-amber-400"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">
                      {reward.friend_name}
                    </p>
                    <p className="text-xs text-[#AAA]">
                      {reward.status === "earned"
                        ? `Earned ${formatDate(reward.earned_at!)}`
                        : "Waiting for order"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#1A1A1A]">
                    &pound;{reward.amount}
                  </p>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase ${
                      reward.status === "earned"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {reward.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CreditCard({
  label,
  amount,
  currency,
  variant,
}: {
  label: string;
  amount: number;
  currency: string;
  variant: "available" | "pending";
}) {
  const symbol = currency === "GBP" ? "£" : "$";
  return (
    <div
      className={`rounded-xl p-5 ${
        variant === "available"
          ? "bg-gradient-to-br from-[#3B3A2F] to-[#2A2920] text-white"
          : "border border-dashed border-[#E5D5C5] bg-[#FEFCF9] text-[#1A1A1A]"
      }`}
    >
      <p
        className={`text-xs font-medium uppercase tracking-wider ${
          variant === "available" ? "text-white/60" : "text-[#AAA]"
        }`}
      >
        {label}
      </p>
      <p className="mt-2 font-serif text-3xl font-semibold">
        {symbol}
        {amount}
      </p>
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}
