const CONTENT = {
  signup: {
    eyebrow: "InsightFlow",
    title: "Talk to your data. Get answers, not dashboards.",
    lede: null as string | null,
    bullets: [
      "Ask anything in plain English",
      "Get answers, tables, charts — and the SQL",
      "Read-only & private by design",
    ],
    showCard: true,
  },
  login: {
    eyebrow: "Secure by design",
    title: "Your data stays yours.",
    lede: "Queries run read-only with row and time limits. The model sees your schema — never your raw rows.",
    bullets: [
      "SELECT-only, validated queries",
      "Read-only database role",
      "Passwords hashed, never stored in plain text",
    ],
    showCard: false,
  },
} as const;

export type BrandVariant = keyof typeof CONTENT;

function CheckIcon() {
  return (
    <svg className="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function MiniCard() {
  const bars = [
    { h: "100%", c: "#FB7A5C" },
    { h: "72%", c: "rgba(251,122,92,.30)" },
    { h: "58%", c: "rgba(251,122,92,.30)" },
    { h: "40%", c: "rgba(251,122,92,.30)" },
  ];
  return (
    <div className="max-w-[430px] overflow-hidden rounded-[14px] border border-white/[0.18] bg-panel shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]">
      <div className="flex items-center gap-2 border-b border-white/[0.07] bg-panel-2 px-3.5 py-[11px]">
        <span className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-coral">
          <svg width="12" height="12" viewBox="0 0 24 24">
            <path d="M12 3l1.9 4.6L18.5 9l-4.6 1.4L12 15l-1.9-4.6L5.5 9l4.6-1.4z" fill="#06222F" />
          </svg>
        </span>
        <span className="text-xs font-bold text-ink">InsightFlow</span>
        <span className="rounded-[5px] border border-white/12 bg-white/[0.05] px-1.5 py-px font-mono text-[10px] text-mut">
          Sonnet 4.6
        </span>
      </div>
      <div className="p-3.5">
        <p className="mb-3 text-[13px] leading-[1.55] text-sub">
          <b className="text-ink">APAC</b> grew fastest at{" "}
          <span className="font-bold text-coral-lab">+38.2%</span> QoQ, adding{" "}
          <b className="text-ink">$612K</b>.
        </p>
        <div className="flex h-[72px] items-end gap-3.5 px-1">
          {bars.map((b, i) => (
            <div
              key={i}
              className="flex-1 rounded-t"
              style={{ height: b.h, background: b.c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BrandPanel({ variant }: { variant: BrandVariant }) {
  const c = CONTENT[variant];
  return (
    <div
      className="relative hidden flex-col justify-center overflow-hidden border-l border-white/12 p-12 md:flex"
      style={{
        background: [
          "radial-gradient(700px 380px at 80% 8%, rgba(251,122,92,.16), transparent 60%)",
          "radial-gradient(600px 500px at 10% 100%, rgba(34,140,170,.18), transparent 55%)",
          "linear-gradient(160deg, #0A3A52, #0C4A66)",
        ].join(","),
      }}
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-coral-lab">
        {c.eyebrow}
      </div>
      <h2 className="mb-6 mt-4 max-w-[420px] text-[34px] font-black leading-[1.05] tracking-[-0.03em] text-ink">
        {c.title}
      </h2>
      {c.showCard && <MiniCard />}
      {c.lede && <p className="mb-1.5 max-w-[400px] text-[15.5px] text-sub">{c.lede}</p>}
      <div className="mt-7 flex flex-col gap-3.5">
        {c.bullets.map((b) => (
          <div key={b} className="flex items-center gap-3 text-[14.5px] text-sub">
            <span className="flex h-6 w-6 flex-none items-center justify-center rounded-[7px] border border-coral/28 bg-coral/12 text-coral-lab">
              {variant === "login" ? <ShieldIcon /> : <CheckIcon />}
            </span>
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}
