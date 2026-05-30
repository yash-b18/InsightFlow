import { Logo } from "./logo";

const LINKS: [string, string][] = [
  ["How it works", "#how"],
  ["Features", "#features"],
  ["Security", "#security"],
  ["Pricing", "#"],
];

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.07] bg-[rgba(6,34,47,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center gap-3.5 px-7">
        <Logo />
        <div className="ml-8 hidden gap-7 md:flex">
          {LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium text-sub transition-colors hover:text-ink"
            >
              {label}
            </a>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3.5">
          <a
            href="/login"
            className="text-sm font-semibold text-ink transition-colors hover:text-coral-lab"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="inline-flex items-center gap-2 rounded-[10px] bg-coral px-4 py-2.5 text-sm font-semibold text-[#06222F] transition-colors hover:bg-coral-lab"
          >
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
}
