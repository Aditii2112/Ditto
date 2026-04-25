"use client";

import { useEffect, useState, useRef } from "react";
import type { ReferralActivity } from "@/types/recharge";

interface SocialProofProps {
  activities: ReferralActivity[];
  communityStats: {
    total_community_referrals: number;
    total_rewards_distributed: number;
    currency: string;
  } | null;
}

const ACTION_LABELS: Record<ReferralActivity["action"], string> = {
  signed_up: "just signed up via referral",
  ordered: "placed their first order",
  reward_earned: "earned a reward",
};

export default function SocialProof({
  activities,
  communityStats,
}: SocialProofProps) {
  const [visibleIdx, setVisibleIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (activities.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setVisibleIdx((prev) => (prev + 1) % activities.length);
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, [activities.length]);

  const current = activities[visibleIdx];

  return (
    <section className="rounded-2xl border border-[#E5D5C5] bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-6 font-serif text-xl font-medium text-[#1A1A1A]">
        The DITTO Community
      </h2>

      {communityStats && (
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-[#FBF7F2] p-4 text-center">
            <p className="font-serif text-2xl font-semibold text-[#C75B2B]">
              {communityStats.total_community_referrals.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-[#888]">Friends Referred</p>
          </div>
          <div className="rounded-xl bg-[#FBF7F2] p-4 text-center">
            <p className="font-serif text-2xl font-semibold text-[#C75B2B]">
              &pound;
              {communityStats.total_rewards_distributed.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-[#888]">Rewards Distributed</p>
          </div>
        </div>
      )}

      {current && (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#FBF7F2] to-[#FEF9F5] px-5 py-4">
          <div
            key={current.id}
            className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C75B2B]/10 text-xs font-bold text-[#C75B2B]">
              {current.friend_name.charAt(0)}
            </div>
            <p className="text-sm text-[#555]">
              <span className="font-semibold text-[#1A1A1A]">
                {current.friend_name}
              </span>{" "}
              {ACTION_LABELS[current.action]}
              {current.amount && (
                <span className="font-semibold text-[#C75B2B]">
                  {" "}
                  — £{current.amount}
                </span>
              )}
            </p>
            <span className="ml-auto shrink-0 text-xs text-[#BBB]">
              {timeAgo(current.timestamp)}
            </span>
          </div>

          <div className="mt-3 flex gap-1">
            {activities.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i === visibleIdx ? "bg-[#C75B2B]" : "bg-[#E5D5C5]"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 flex items-center gap-3">
        <div className="flex -space-x-2">
          {["S", "P", "E", "C", "A"].map((initial, i) => (
            <div
              key={i}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#3B3A2F] text-[10px] font-bold text-white"
            >
              {initial}
            </div>
          ))}
        </div>
        <p className="text-xs text-[#888]">
          Join 2,800+ people sharing DITTO with friends
        </p>
      </div>
    </section>
  );
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
