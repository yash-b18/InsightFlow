import { SectionHead } from "./section-head";

const STEPS = [
  {
    no: "01",
    title: "Upload & profile",
    body: "Drop a CSV or Excel file, or type a table. InsightFlow profiles every column — types, ranges, null counts, and distributions.",
    icon: (
      <>
        <path d="M12 16V4M7 9l5-5 5 5" />
        <path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" />
      </>
    ),
  },
  {
    no: "02",
    title: "Ask in plain English",
    body: "Ask anything about the dataset. A guardrail keeps answers grounded in your data and politely declines off-topic questions.",
    icon: <path d="M12 3l1.9 4.6L18.5 9l-4.6 1.4L12 15l-1.9-4.6L5.5 9l4.6-1.4z" />,
  },
  {
    no: "03",
    title: "Get the full answer",
    body: "A written answer, a table, a chart, and the generated SQL — saved to your project so your team can build on it.",
    icon: (
      <>
        <path d="M4 19V5M4 19h16" />
        <rect x="7" y="10" width="3" height="6" />
        <rect x="12" y="6" width="3" height="10" />
        <rect x="17" y="13" width="3" height="3" />
      </>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-16">
      <div className="mx-auto max-w-[1180px] px-7">
        <SectionHead
          eyebrow="How it works"
          title="From raw file to real answer in three steps"
          sub="No SQL, no spreadsheet gymnastics, no waiting on the data team."
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.no}
              className="overflow-hidden rounded-2xl border border-white/12 bg-panel p-6"
            >
              <div className="font-mono text-xs font-semibold tracking-[0.1em] text-coral-lab">
                {s.no}
              </div>
              <div className="mb-3.5 mt-4 flex h-[42px] w-[42px] items-center justify-center rounded-[11px] border border-coral/28 bg-coral/12 text-coral-lab">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon}
                </svg>
              </div>
              <h3 className="mb-[7px] text-[17px] font-bold tracking-[-0.02em] text-ink">
                {s.title}
              </h3>
              <p className="text-sm text-sub">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
