export function TrustStrip() {
  return (
    <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-center gap-3.5 px-7 pb-16 pt-2 text-[13.5px] text-mut">
      <span className="flex items-center gap-2.5">
        <svg className="h-[15px] w-[15px] text-coral-lab" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4v16h16" />
          <path d="M7 14l4-4 3 3 5-6" />
        </svg>
        CSV · Excel · manual entry
      </span>
      <span className="h-[18px] w-px bg-white/12" />
      <span>
        <b className="font-mono font-bold text-ink">Read-only</b> SQL, every time
      </span>
      <span className="h-[18px] w-px bg-white/12" />
      <span>
        <b className="font-mono font-bold text-ink">40+</b> chart types
      </span>
      <span className="h-[18px] w-px bg-white/12" />
      <span>
        Every answer ships its <b className="font-mono font-bold text-ink">query</b>
      </span>
    </div>
  );
}
