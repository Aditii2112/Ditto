"use client";

import type { ReferralUser } from "@/types/recharge";

interface HeroCardProps {
  user: ReferralUser;
  className?: string;
}

export default function HeroCard({ user, className }: HeroCardProps) {
  return (
    <section
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#3B3A2F] to-[#2A2920] px-8 py-12 text-white md:px-14 md:py-16 ${className ?? ""}`}
    >
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#C75B2B]/10 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#C75B2B]/5 blur-2xl" />

      <div className="relative z-10">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#E8C5A0]">
          Your Referral Hub
        </p>
        <h1 className="mb-4 font-serif text-3xl font-light leading-tight md:text-4xl lg:text-5xl">
          {user.first_name}, share the glow
        </h1>
        <p className="max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
          Give your friends 20% off their first DITTO order, and earn{" "}
          <span className="font-medium text-[#E8C5A0]">
            &pound;20 credit
          </span>{" "}
          for every friend who orders. No limits.
        </p>

        <div className="mt-8 flex flex-wrap gap-6">
          <Stat label="Friends Referred" value={user.stats.total_referrals} />
          <Stat
            label="Successful"
            value={user.stats.successful_referrals}
          />
          <Stat
            label="Credit Earned"
            value={`£${user.stats.total_earned}`}
          />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-2xl font-semibold md:text-3xl">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-white/50">
        {label}
      </p>
    </div>
  );
}
