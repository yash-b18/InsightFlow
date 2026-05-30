import { SectionHead } from "./section-head";

const FEATURES = [
  {
    title: "Plain English → SQL",
    body: "Ask a question; InsightFlow writes a correct, dialect-aware SQL query against your data.",
    icon: <path d="M4 7h16M4 12h10M4 17h7" />,
  },
  {
    title: "Safe by design",
    body: "SELECT-only, validated, and executed on a read-only role with row and time limits. It can't mutate anything.",
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    title: "Charts, instantly",
    body: "The right chart for the shape of your answer — bar, line, area, scatter — themed and ready to share.",
    icon: (
      <>
        <path d="M4 19V5M4 19h16" />
        <path d="M7 15l3-3 3 2 4-5" />
      </>
    ),
  },
  {
    title: "Always shows its work",
    body: "Every answer comes with the exact query that produced it. Inspect it, copy it, trust it.",
    icon: <path d="M8 6L3 12l5 6M16 6l5 6-5 6" />,
  },
  {
    title: "Projects & history",
    body: "Save insights into projects and keep a running history of every question and answer.",
    icon: <path d="M3 7a2 2 0 012-2h3.5l2 2H19a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />,
  },
  {
    title: "Bring your own data",
    body: "CSV, Excel, or type it in. Each dataset is profiled and loaded so the AI knows its exact shape.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M9 9v11" />
      </>
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="py-16">
      <div className="mx-auto max-w-[1180px] px-7">
        <SectionHead
          eyebrow="Features"
          title="Everything you need to interrogate a dataset"
          sub="Built for people who have questions, not query languages."
        />
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-[14px] border border-white/12 bg-panel p-[22px] transition-colors hover:border-white/[0.18] hover:bg-panel-2"
            >
              <div className="mb-[15px] flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-white/12 bg-white/[0.05] text-coral-lab">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {f.icon}
                </svg>
              </div>
              <h3 className="mb-1.5 text-[15.5px] font-bold tracking-[-0.01em] text-ink">
                {f.title}
              </h3>
              <p className="text-[13.5px] text-sub">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
