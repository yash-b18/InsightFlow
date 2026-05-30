import Link from "next/link";

import { Logo } from "@/components/marketing/logo";
import { BrandPanel, type BrandVariant } from "./brand-panel";

export function AuthLayout({
  children,
  brand,
}: {
  children: React.ReactNode;
  brand: BrandVariant;
}) {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div
        className="relative flex flex-col px-10 py-9"
        style={{ background: "linear-gradient(168deg, #072B40, #0A3850)" }}
      >
        <Link href="/" className="inline-flex w-fit">
          <Logo />
        </Link>
        <div className="mx-auto flex w-full max-w-[380px] flex-1 flex-col justify-center py-8">
          {children}
        </div>
      </div>
      <BrandPanel variant={brand} />
    </div>
  );
}
