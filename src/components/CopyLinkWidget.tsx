"use client";

import { useState, useCallback } from "react";
import type { ReferralCode } from "@/types/recharge";

interface CopyLinkWidgetProps {
  referralCode: ReferralCode;
  userName: string;
}

export default function CopyLinkWidget({
  referralCode,
  userName,
}: CopyLinkWidgetProps) {
  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(referralCode.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setShareError("Could not copy. Please select and copy the link manually.");
      setTimeout(() => setShareError(null), 3000);
    }
  }, [referralCode.url]);

  const handleNativeShare = useCallback(async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title: "DITTO — 20% Off Your First Order",
        text: `${userName} is sharing 20% off DITTO cycle supplements with you! Use this link to get your discount:`,
        url: referralCode.url,
      });
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setShareError("Sharing was cancelled or failed.");
        setTimeout(() => setShareError(null), 3000);
      }
    }
  }, [referralCode.url, userName]);

  const canNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="rounded-2xl border border-[#E5D5C5] bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-1 font-serif text-xl font-medium text-[#1A1A1A]">
        Your Unique Link
      </h2>
      <p className="mb-5 text-sm text-[#888]">
        Share this link and earn &pound;20 for every friend who orders.
      </p>

      <div className="flex items-stretch gap-2">
        <div className="flex min-w-0 flex-1 items-center rounded-lg border border-[#E5D5C5] bg-[#FBF7F2] px-4 py-3">
          <span className="truncate text-sm text-[#555]">
            {referralCode.url}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className={`flex shrink-0 items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all ${
            copied
              ? "bg-emerald-600 text-white"
              : "bg-[#C75B2B] text-white hover:bg-[#A84A22]"
          }`}
        >
          {copied ? (
            <>
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {shareError && (
        <p className="mt-2 text-xs text-red-500">{shareError}</p>
      )}

      {canNativeShare && (
        <button
          onClick={handleNativeShare}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#E5D5C5] px-5 py-3 text-sm font-medium text-[#3B3A2F] transition hover:bg-[#FBF7F2]"
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16,6 12,2 8,6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          Share via WhatsApp, iMessage &amp; more
        </button>
      )}

      <div className="mt-5 flex items-center gap-4">
        <span className="text-xs font-medium uppercase tracking-wider text-[#AAA]">
          Or share on
        </span>
        <div className="flex gap-3">
          <SocialButton
            label="WhatsApp"
            href={`https://wa.me/?text=${encodeURIComponent(
              `Hey! I've been using DITTO cycle supplements and love them. Here's 20% off your first order: ${referralCode.url}`
            )}`}
            color="#25D366"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
          </SocialButton>

          <SocialButton
            label="Facebook"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              referralCode.url
            )}`}
            color="#1877F2"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </SocialButton>

          <SocialButton
            label="X / Twitter"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `I love @dittodaily cycle supplements! Get 20% off your first order: ${referralCode.url}`
            )}`}
            color="#000"
          >
            <path d="M4 4l6.5 8L4 20h2l5.5-6.5L16 20h4l-7-8.5L19.5 4H18l-5 6L9 4H4z" />
          </SocialButton>
        </div>
      </div>
    </div>
  );
}

function SocialButton({
  label,
  href,
  color,
  children,
}: {
  label: string;
  href: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Share on ${label}`}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5D5C5] transition hover:border-transparent hover:shadow-md"
      style={{ color }}
    >
      <svg
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        {children}
      </svg>
    </a>
  );
}
