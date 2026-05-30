const TAGS = [
  "SELECT-only",
  "read-only role",
  "statement timeout",
  "no raw rows to the model",
  "validated queries",
];

export function Security() {
  return (
    <section id="security" className="py-16">
      <div className="mx-auto max-w-[1180px] px-7">
        <div className="grid grid-cols-1 items-center gap-7 rounded-[20px] border border-white/12 bg-gradient-to-br from-panel to-panel-2 p-10 text-center md:grid-cols-[auto_1fr] md:text-left">
          <div className="mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-[20px] border border-coral/28 bg-coral/12 text-coral-lab md:mx-0">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h2 className="mb-2.5 text-[26px] font-extrabold tracking-[-0.025em] text-ink">
              Your data stays yours
            </h2>
            <p className="max-w-[680px] text-[15.5px] text-sub">
              Queries run read-only on an isolated database role with row and statement-timeout
              limits, so a question can never change or overload your data. The model sees your
              schema and column statistics — never your raw rows — and nothing is used to train
              anyone&apos;s model.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2.5 md:justify-start">
              {TAGS.map((t) => (
                <span
                  key={t}
                  className="rounded-[7px] border border-white/12 bg-white/[0.04] px-2.5 py-[5px] font-mono text-[11.5px] text-sub"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
