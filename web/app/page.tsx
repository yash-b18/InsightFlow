export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/12 bg-panel/90 p-8 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-inset">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
          <h1 className="text-lg font-bold tracking-tight text-ink">InsightFlow</h1>
        </div>
        <p className="mt-4 text-sub">
          Scaffold is live. Theme tokens, fonts, and the three-service stack are wired up.
        </p>
        <button className="mt-6 rounded-lg bg-coral px-4 py-2 text-sm font-medium text-[#06222F]">
          Get started
        </button>
        <p className="mt-4 font-mono text-xs text-mut">api · /health · /readyz</p>
      </div>
    </main>
  );
}
