const CHECKS: [string, string][] = [
  ["Inspectable", "read and copy the exact SQL behind any answer."],
  ["Grounded", "the model only sees your schema and stats, never your raw rows."],
  ["Repeatable", "save any answer to a project and re-run it anytime."],
];

export function Showcase() {
  return (
    <section className="py-16">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-[46px] px-7 md:grid-cols-2">
        <div>
          <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-coral-lab">
            No black boxes
          </span>
          <h2 className="mb-3.5 mt-3.5 text-[clamp(26px,3vw,36px)] font-extrabold leading-[1.12] tracking-[-0.03em] text-ink">
            Every answer comes with the query that produced it
          </h2>
          <p className="mb-[18px] text-[16px] text-sub">
            InsightFlow never asks you to take its word for it. See the generated SQL, the rows it
            ran on, and the assumptions it made — then save it as a repeatable insight.
          </p>
          <div className="flex flex-col gap-[11px]">
            {CHECKS.map(([term, rest]) => (
              <div key={term} className="flex items-start gap-[11px] text-[14.5px] text-sub">
                <span className="mt-px flex h-[22px] w-[22px] flex-none items-center justify-center rounded-[7px] border border-coral/28 bg-coral/12 text-coral-lab">
                  <svg className="h-[15px] w-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span>
                  <b className="text-ink">{term}</b> — {rest}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[14px] border border-white/12 shadow-[0_30px_60px_-22px_rgba(0,0,0,0.55)]">
          <div className="flex items-center gap-2 border-b border-white/12 bg-inset px-[13px] py-2.5">
            <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#FF5F57" }} />
            <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#FEBC2E" }} />
            <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#28C840" }} />
            <span className="ml-1 font-mono text-[11px] text-mut">generated_query.sql</span>
          </div>
          <pre className="overflow-auto whitespace-pre bg-[#05202C] p-4 font-mono text-[12.5px] leading-[1.75] text-[#C8DCE4]">
<span className="text-[#5E7C8B]">-- only SELECT · validated · read-only role</span>{"\n"}
<span className="text-[#FF9E86]">SELECT</span> region,{"\n"}
{"       "}<span className="text-[#6FD3C6]">SUM</span>(revenue) <span className="text-[#FF9E86]">FILTER</span> (<span className="text-[#FF9E86]">WHERE</span> quarter = <span className="text-[#E2B07A]">{"'Q2'"}</span>) <span className="text-[#FF9E86]">AS</span> q2,{"\n"}
{"       "}<span className="text-[#6FD3C6]">SUM</span>(revenue) <span className="text-[#FF9E86]">FILTER</span> (<span className="text-[#FF9E86]">WHERE</span> quarter = <span className="text-[#E2B07A]">{"'Q3'"}</span>) <span className="text-[#FF9E86]">AS</span> q3,{"\n"}
{"       "}<span className="text-[#6FD3C6]">ROUND</span>(<span className="text-[#E58AA0]">100.0</span>*(q3-q2)/<span className="text-[#6FD3C6]">NULLIF</span>(q2,<span className="text-[#E58AA0]">0</span>),<span className="text-[#E58AA0]">1</span>) <span className="text-[#FF9E86]">AS</span> growth_pct{"\n"}
<span className="text-[#FF9E86]">FROM</span> q3_sales{"\n"}
<span className="text-[#FF9E86]">GROUP BY</span> region{"\n"}
<span className="text-[#FF9E86]">ORDER BY</span> growth_pct <span className="text-[#FF9E86]">DESC</span>;
          </pre>
        </div>
      </div>
    </section>
  );
}
