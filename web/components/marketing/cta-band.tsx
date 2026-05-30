export function CtaBand() {
  return (
    <section className="mx-auto max-w-[1180px] px-7 py-20 text-center">
      <h2 className="mb-3.5 text-[clamp(30px,4vw,46px)] font-black leading-[1.05] tracking-[-0.035em] text-ink">
        Ready to talk to your data?
      </h2>
      <p className="mb-[26px] text-[17px] text-sub">
        Upload a file and get your first answer in under two minutes.
      </p>
      <a
        href="#"
        className="inline-flex items-center gap-2 rounded-[11px] bg-coral px-[22px] py-[13px] text-[15px] font-semibold text-[#06222F] transition-colors hover:bg-coral-lab"
      >
        Get started free
        <svg className="h-[15px] w-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </section>
  );
}
