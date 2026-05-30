import { Logo } from "./logo";

const COLS: { head: string; links: [string, string][] }[] = [
  {
    head: "Product",
    links: [
      ["How it works", "#how"],
      ["Features", "#features"],
      ["Security", "#security"],
      ["Pricing", "#"],
    ],
  },
  {
    head: "Company",
    links: [
      ["About", "#"],
      ["Blog", "#"],
      ["Careers", "#"],
    ],
  },
  {
    head: "Legal",
    links: [
      ["Privacy", "#"],
      ["Terms", "#"],
      ["Security", "#"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-[30px] border-t border-white/[0.07] pb-[50px] pt-10">
      <div className="mx-auto max-w-[1180px] px-7">
        <div className="flex flex-wrap justify-between gap-[30px]">
          <div className="max-w-[280px]">
            <Logo />
            <p className="mt-3 text-[13px] text-mut">
              Ask your data anything. Answers, tables, and charts — with the query shown.
            </p>
          </div>
          <div className="flex flex-wrap gap-14">
            {COLS.map((col) => (
              <div key={col.head}>
                <h4 className="mb-[13px] text-[11px] font-bold uppercase tracking-[0.08em] text-mut">
                  {col.head}
                </h4>
                {col.links.map(([label, href]) => (
                  <a
                    key={label + href}
                    href={href}
                    className="mb-[9px] block text-sm text-sub transition-colors hover:text-ink"
                  >
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-[34px] flex flex-wrap justify-between gap-3.5 border-t border-white/[0.07] pt-5 text-[12.5px] text-mut">
          <span>© 2026 InsightFlow</span>
          <span>Built with Next.js · FastAPI · PostgreSQL</span>
        </div>
      </div>
    </footer>
  );
}
