"use client";

import heroProduct from "@/assets/ditto-hero-product.png";
import { useRechargeReferral } from "@/hooks/useRechargeReferral";
import Navbar from "@/components/Navbar";
import HeroCard from "@/components/HeroCard";
import CopyLinkWidget from "@/components/CopyLinkWidget";
import EmailInviteTool from "@/components/EmailInviteTool";
import RewardDashboard from "@/components/RewardDashboard";
import ProgressTracker from "@/components/ProgressTracker";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function ReferralPage() {
  const { data, communityStats, isLoading, error, sendInvite } =
    useRechargeReferral();

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {isLoading && <LoadingSkeleton />}

        {error && (
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {data && (
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,42%)] lg:items-start lg:gap-10">
              <HeroCard user={data.user} className="lg:col-start-1 lg:row-start-1" />

              <figure className="overflow-hidden rounded-2xl bg-[#E35D38] lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start">
                <img
                  src={heroProduct.src}
                  width={heroProduct.width}
                  height={heroProduct.height}
                  alt="DITTO cycle supplement — hand holding a capsule over the jar"
                  className="block h-auto w-full max-w-full object-cover lg:min-h-[min(72vh,52rem)] lg:max-h-[calc(100vh-7rem)]"
                  decoding="async"
                  fetchPriority="high"
                />
              </figure>

              <div className="min-w-0 space-y-6 lg:col-start-1 lg:row-start-2">
                <div className="grid gap-6 lg:grid-cols-2">
                  <CopyLinkWidget
                    referralCode={data.user.referral_code}
                    userName={data.user.first_name}
                  />
                  <EmailInviteTool onSendInvite={sendInvite} />
                </div>

                <RewardDashboard
                  stats={data.user.stats}
                  rewards={data.user.rewards}
                />

                <ProgressTracker />

                <SocialProof
                  activities={data.recent_activity}
                  communityStats={communityStats}
                />

                <FAQ />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

function LoadingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,42%)] lg:gap-10">
        <div className="h-64 animate-pulse rounded-2xl bg-[#E5D5C5]/40 lg:col-start-1 lg:row-start-1" />
        <div className="hidden h-[28rem] animate-pulse rounded-2xl bg-[#E5D5C5]/40 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:block" />
        <div className="space-y-6 lg:col-start-1 lg:row-start-2">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="h-48 animate-pulse rounded-2xl bg-[#E5D5C5]/40" />
            <div className="h-48 animate-pulse rounded-2xl bg-[#E5D5C5]/40" />
          </div>
          <div className="h-56 animate-pulse rounded-2xl bg-[#E5D5C5]/40" />
        </div>
      </div>
    </div>
  );
}
