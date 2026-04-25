"use client";

import { useState, useCallback } from "react";
import type { EmailInviteResponse } from "@/types/recharge";

interface EmailInviteToolProps {
  onSendInvite: (email: string, name: string) => Promise<EmailInviteResponse>;
}

export default function EmailInviteTool({ onSendInvite }: EmailInviteToolProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [sentEmails, setSentEmails] = useState<string[]>([]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email || !name) return;

      setStatus("sending");
      try {
        const result = await onSendInvite(email, name);
        if (result.success) {
          setSentEmails((prev) => [...prev, email]);
          setStatus("sent");
          setMessage(result.message);
          setEmail("");
          setName("");
          setTimeout(() => setStatus("idle"), 3000);
        } else {
          setStatus("error");
          setMessage(result.message);
        }
      } catch {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    },
    [email, name, onSendInvite]
  );

  return (
    <div className="rounded-2xl border border-[#E5D5C5] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FBF7F2]">
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="#C75B2B"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <div>
          <h2 className="font-serif text-xl font-medium text-[#1A1A1A]">
            Invite by Email
          </h2>
          <p className="text-sm text-[#888]">
            We&apos;ll send them a personalised invite with your referral link.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Friend's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="rounded-lg border border-[#E5D5C5] bg-[#FBF7F2] px-4 py-3 text-sm text-[#1A1A1A] outline-none transition placeholder:text-[#BBB] focus:border-[#C75B2B] focus:ring-1 focus:ring-[#C75B2B]/20"
          />
          <input
            type="email"
            placeholder="Friend's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-lg border border-[#E5D5C5] bg-[#FBF7F2] px-4 py-3 text-sm text-[#1A1A1A] outline-none transition placeholder:text-[#BBB] focus:border-[#C75B2B] focus:ring-1 focus:ring-[#C75B2B]/20"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-lg bg-[#C75B2B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#A84A22] disabled:opacity-60"
        >
          {status === "sending" ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="opacity-25"
                />
                <path
                  d="M4 12a8 8 0 0 1 8-8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="opacity-75"
                />
              </svg>
              Sending...
            </span>
          ) : (
            "Send Invite"
          )}
        </button>
      </form>

      {status === "sent" && (
        <p className="mt-3 flex items-center gap-2 text-sm text-emerald-600">
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
          {message}
        </p>
      )}

      {status === "error" && (
        <p className="mt-3 text-sm text-red-500">{message}</p>
      )}

      {sentEmails.length > 0 && (
        <div className="mt-5 border-t border-[#E5D5C5] pt-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#AAA]">
            Invites sent this session
          </p>
          <div className="flex flex-wrap gap-2">
            {sentEmails.map((e) => (
              <span
                key={e}
                className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700"
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
