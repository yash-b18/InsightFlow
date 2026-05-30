"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthField } from "@/components/auth/auth-field";
import { login } from "@/lib/auth";
import { ApiError } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setError(null);
    setLoading(true);
    try {
      await login({
        email: String(data.get("email") ?? ""),
        password: String(data.get("password") ?? ""),
      });
      router.push("/app");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  }

  return (
    <AuthLayout brand="login">
      <h1 className="mb-2 text-[27px] font-extrabold tracking-[-0.03em] text-ink">
        Welcome back
      </h1>
      <p className="mb-7 text-[14.5px] text-sub">Log in to your workspace.</p>
      <form onSubmit={onSubmit} noValidate>
        <AuthField label="Work email" name="email" type="email" placeholder="you@company.com" autoComplete="email" />
        <AuthField
          label="Password"
          name="password"
          type="password"
          placeholder="Your password"
          autoComplete="current-password"
          rightSlot={
            <a href="#" className="text-[12.5px] font-semibold text-coral-lab">
              Forgot password?
            </a>
          }
        />
        {error && <p className="mb-3 text-[13px] font-medium text-[#FF9B8A]">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-1.5 flex h-[46px] w-full items-center justify-center gap-2 rounded-[11px] bg-coral text-[15px] font-semibold text-[#06222F] transition-colors hover:bg-coral-lab disabled:opacity-70"
        >
          {loading ? "Logging in…" : "Log in"}
          {!loading && (
            <svg className="h-[15px] w-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          )}
        </button>
      </form>
      <p className="mt-5 text-center text-[14px] text-sub">
        New to InsightFlow?{" "}
        <Link href="/signup" className="font-semibold text-coral-lab">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
