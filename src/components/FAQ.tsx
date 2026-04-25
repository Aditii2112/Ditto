"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How does my friend get the discount?",
    a: "When your friend clicks your unique referral link and makes a purchase, the 20% discount is automatically applied at checkout. No code needed.",
  },
  {
    q: "Is there a maximum number of people I can refer?",
    a: "Absolutely not! For every person that you refer who makes a purchase, you'll earn £20 credit. The more you share, the more you earn.",
  },
  {
    q: "Can I refer friends who have already bought DITTO?",
    a: "The referral programme is designed for new customers only. Your friends must be first-time DITTO buyers to qualify for the discount.",
  },
  {
    q: "How do I know if my friend has used my link?",
    a: "You'll receive an email notification as soon as your friend places their order. You can also track all your referrals in the Reward Dashboard above.",
  },
  {
    q: "When can I use my credit?",
    a: "Your credit becomes available as soon as your friend's order is confirmed. It will automatically be applied to your next DITTO order.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="rounded-2xl border border-[#E5D5C5] bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-6 font-serif text-2xl font-medium text-[#1A1A1A]">
        Frequently Asked Questions
      </h2>

      <div className="divide-y divide-[#F0E8DF]">
        {FAQS.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <span className="pr-4 text-sm font-medium text-[#1A1A1A] md:text-base">
                {faq.q}
              </span>
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="#999"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className={`shrink-0 transition-transform ${
                  openIdx === i ? "rotate-180" : ""
                }`}
              >
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </button>
            <div
              className={`grid transition-all ${
                openIdx === i
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-4 text-sm leading-relaxed text-[#777]">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
