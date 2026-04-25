"use client";

const STEPS = [
  {
    number: 1,
    title: "Share Your Link",
    description: "Send your unique referral link to friends via any channel.",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16,6 12,2 8,6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "Friend Orders",
    description:
      "Your friend gets 20% off their first order — applied automatically.",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    number: 3,
    title: "You Earn £20",
    description:
      "£20 credit is added to your account. Use it on your next order.",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export default function ProgressTracker() {
  return (
    <section className="rounded-2xl border border-[#E5D5C5] bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-8 text-center font-serif text-2xl font-medium text-[#1A1A1A]">
        How It Works
      </h2>

      <div className="relative">
        <div className="absolute left-[23px] top-[40px] hidden h-[calc(100%-80px)] w-px bg-gradient-to-b from-[#C75B2B] via-[#C75B2B]/40 to-[#E5D5C5] md:left-1/2 md:-translate-x-px md:block" />

        <div className="grid gap-8 md:gap-0">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="relative flex items-start gap-5 md:gap-0"
            >
              <div
                className={`flex md:w-1/2 ${
                  i % 2 === 0
                    ? "md:justify-end md:pr-12"
                    : "md:order-2 md:justify-start md:pl-12"
                }`}
              >
                <div className="max-w-xs">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#C75B2B]">
                    Step {step.number}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-[#1A1A1A]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#777]">
                    {step.description}
                  </p>
                </div>
              </div>

              <div
                className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-[#C75B2B] bg-white text-[#C75B2B] md:absolute md:left-1/2 md:top-2 md:-translate-x-1/2 ${
                  i % 2 !== 0 ? "md:order-1" : ""
                }`}
              >
                {step.icon}
              </div>

              <div
                className={`hidden md:block md:w-1/2 ${
                  i % 2 === 0 ? "" : "md:order-0"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
