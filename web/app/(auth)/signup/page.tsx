"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthField } from "@/components/auth/auth-field";
import { signup } from "@/lib/auth";
import { ApiError } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setError(null);
    setLoading(true);
    try {
      await signup({
        name: String(data.get("name") ?? ""),
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
    <AuthLayout brand="signup">
      <h1 className="mb-2 text-[27px] font-extrabold tracking-[-0.03em] text-ink">
        Create your account
      </h1>
      <p className="mb-7 text-[14.5px] text-sub">
        Start asking your data questions in minutes.
      </p>
      <form onSubmit={onSubmit} noValidate>
        <AuthField label="Full name" name="name" placeholder="Yash Bhargava" autoComplete="name" />
        <AuthField label="Work email" name="email" type="email" placeholder="you@company.com" autoComplete="email" />
        <AuthField
          label="Password"
          name="password"
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
          hint={
            <>
              <svg className="h-[13px] w-[13px] text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              At least 8 characters
            </>
          }
        />
        {error && <p className="mb-3 text-[13px] font-medium text-[#FF9B8A]">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-1.5 flex h-[46px] w-full items-center justify-center gap-2 rounded-[11px] bg-coral text-[15px] font-semibold text-[#06222F] transition-colors hover:bg-coral-lab disabled:opacity-70"
        >
          {loading ? "Creating account…" : "Create account"}
          {!loading && (
            <svg className="h-[15px] w-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          )}
        </button>
      </form>
      <p className="mt-5 text-center text-[14px] text-sub">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-coral-lab">
          Log in
        </Link>
      </p>
      <p className="mt-[18px] text-center text-[11.5px] leading-[1.5] text-mut">
        By creating an account you agree to our{" "}
        <a href="#" className="text-sub underline">Terms</a> and{" "}
        <a href="#" className="text-sub underline">Privacy Policy</a>.
      </p>
    </AuthLayout>
  );
}
