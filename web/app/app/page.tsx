"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getMe, logout, type User } from "@/lib/auth";
import { ApiError } from "@/lib/api";
import { Logo } from "@/components/marketing/logo";

export default function AppHome() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getMe()
      .then((u) => {
        if (active) setUser(u);
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) router.replace("/login");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [router]);

  async function onLogout() {
    try {
      await logout();
    } finally {
      router.replace("/login");
    }
  }

  if (loading) {
    return <main className="grid min-h-screen place-items-center text-mut">Loading…</main>;
  }
  if (!user) return null;

  return (
    <main className="grid min-h-screen place-items-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/12 bg-panel p-8 text-center shadow-2xl">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-[-0.02em] text-ink">
          Welcome, {user.name.split(" ")[0]}
        </h1>
        <p className="mt-2 text-sub">You&apos;re signed in as {user.email}.</p>
        <p className="mt-1 text-sm text-mut">
          Upload, profiling, and the ask engine are coming next.
        </p>
        <button
          onClick={onLogout}
          className="mt-6 rounded-lg border border-white/12 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-white/[0.09]"
        >
          Log out
        </button>
      </div>
    </main>
  );
}
