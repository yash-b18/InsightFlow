export function Hero() {
  return (
    <header className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-[54px] px-7 pb-[52px] pt-[84px] md:grid-cols-[1.05fr_1fr]">
      {/* copy */}
      <div>
        <div className="mb-[22px] inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[12.5px] text-sub">
          <span className="h-[7px] w-[7px] rounded-full bg-success" />
          Now answering questions in plain English
        </div>
        <h1 className="mb-5 text-[clamp(40px,5.2vw,62px)] font-black leading-[1.02] tracking-[-0.035em] text-ink">
          Talk to your data.
          <br />
          Get answers, <span className="text-coral">not dashboards.</span>
        </h1>
        <p className="mb-[30px] max-w-[520px] text-[18px] text-sub">
          Upload a CSV or Excel file and ask questions in plain English. InsightFlow writes the
          query, runs it safely, and hands back the answer, the table, the chart — and the exact
          SQL.
        </p>
        <div className="flex flex-wrap items-center gap-3.5">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-[11px] bg-coral px-[22px] py-[13px] text-[15px] font-semibold text-[#06222F] transition-colors hover:bg-coral-lab"
          >
            Start for free
            <svg className="h-[15px] w-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-[11px] border border-white/12 bg-white/[0.04] px-[22px] py-[13px] text-[15px] font-semibold text-ink transition-colors hover:bg-white/[0.09]"
          >
            <svg className="h-[15px] w-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
            </svg>
            See it in action
          </a>
        </div>
        <div className="mt-6 flex items-center gap-[18px] text-[13px] text-mut">
          {["No credit card", "Your data never trains a model"].map((t) => (
            <span key={t} className="flex items-center gap-[7px]">
              <svg className="h-[15px] w-[15px] text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* product window */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.18] bg-panel shadow-[0_40px_80px_-24px_rgba(0,0,0,0.6)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(420px 200px at 80% -10%, rgba(251,122,92,0.18), transparent 70%)",
          }}
        />
        <div className="relative flex items-center gap-2.5 border-b border-white/12 bg-inset px-[15px] py-[11px]">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F57" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28C840" }} />
          </span>
          <span className="ml-1.5 font-mono text-[11.5px] text-mut">q3_sales.csv · Ask</span>
        </div>
        <div className="relative p-[18px]">
          <div className="mb-[15px] flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-[7px] border border-white/12 bg-white/[0.06] text-[10px] font-bold text-ink">
              YB
            </div>
            <div className="text-[15px] font-bold tracking-[-0.02em] text-ink">
              Which regions grew fastest last quarter?
            </div>
          </div>
          <div className="overflow-hidden rounded-[13px] border border-white/12 bg-panel-2">
            <div className="flex items-center gap-2 border-b border-white/[0.07] px-3.5 py-[11px]">
              <div className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-coral">
                <svg width="12" height="12" viewBox="0 0 24 24">
                  <path d="M12 3l1.9 4.6L18.5 9l-4.6 1.4L12 15l-1.9-4.6L5.5 9l4.6-1.4z" fill="#06222F" />
                </svg>
              </div>
              <span className="text-xs font-bold text-ink">InsightFlow</span>
              <span className="rounded-[5px] border border-white/12 bg-white/[0.05] px-1.5 py-px font-mono text-[10px] text-mut">
                Sonnet 4.6
              </span>
              <span className="ml-auto text-[10.5px] text-mut">2.4s</span>
            </div>
            <div className="p-3.5">
              <p className="mb-[13px] text-[13.5px] leading-[1.6] text-sub">
                <b className="text-ink">APAC</b> grew fastest at{" "}
                <span className="font-bold text-coral-lab">+38.2%</span> QoQ, adding{" "}
                <b className="text-ink">$612K</b> — about 1.4× EMEA.
              </p>
              <div className="overflow-hidden rounded-[10px] border border-white/12 bg-panel">
                <div className="border-b border-white/[0.07] bg-white/[0.03] px-3 py-[7px] text-[11px] font-bold text-ink">
                  QoQ revenue growth by region
                </div>
                <div className="px-3 pb-[5px] pt-[11px]">
                  <svg viewBox="0 0 520 130" width="100%" fontFamily="JetBrains Mono">
                    <g stroke="rgba(255,255,255,.08)">
                      <line x1="30" y1="108" x2="512" y2="108" />
                      <line x1="30" y1="76" x2="512" y2="76" />
                      <line x1="30" y1="44" x2="512" y2="44" />
                      <line x1="30" y1="14" x2="512" y2="14" />
                    </g>
                    <g fill="#7BA0B2" fontSize="9" textAnchor="end">
                      <text x="24" y="111">0</text>
                      <text x="24" y="47">30</text>
                      <text x="24" y="17">45</text>
                    </g>
                    <rect x="66" y="14" width="50" height="94" rx="3" fill="#FB7A5C" />
                    <rect x="192" y="42" width="50" height="66" rx="3" fill="rgba(251,122,92,.30)" />
                    <rect x="318" y="54" width="50" height="54" rx="3" fill="rgba(251,122,92,.30)" />
                    <rect x="444" y="72" width="50" height="36" rx="3" fill="rgba(251,122,92,.30)" />
                    <g fontSize="10" textAnchor="middle" fontWeight="600">
                      <text x="91" y="9" fill="#FF8E72">38.2</text>
                      <text x="217" y="37" fill="#A6C3D0">27.4</text>
                      <text x="343" y="49" fill="#A6C3D0">22.1</text>
                      <text x="469" y="67" fill="#A6C3D0">15.0</text>
                    </g>
                    <g fill="#A6C3D0" fontSize="9.5" textAnchor="middle" fontFamily="Satoshi">
                      <text x="91" y="126">APAC</text>
                      <text x="217" y="126">EMEA</text>
                      <text x="343" y="126">US</text>
                      <text x="469" y="126">LATAM</text>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="mt-[13px] flex gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-coral px-[11px] py-1.5 text-xs font-semibold text-[#06222F]">
                  <svg className="h-[15px] w-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 4h14a1 1 0 011 1v15l-8-4-8 4V5a1 1 0 011-1z" />
                  </svg>
                  Save insight
                </span>
                <span className="inline-flex items-center rounded-lg border border-white/12 bg-white/[0.04] px-[11px] py-1.5 text-xs font-semibold text-ink">
                  View SQL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
