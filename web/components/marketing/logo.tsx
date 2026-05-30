export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] border border-white/12 bg-inset">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 15.5L9 10l3.5 3.5L20 6"
            stroke="#FB7A5C"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="6" r="2.4" fill="#FFB59E" />
        </svg>
      </div>
      <span className="text-base font-bold tracking-[-0.02em] text-ink">InsightFlow</span>
    </div>
  );
}
