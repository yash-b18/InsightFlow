export function MarketingBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10"
      style={{
        background: [
          "radial-gradient(900px 500px at 82% -5%, rgba(251,122,92,0.16), transparent 60%)",
          "radial-gradient(800px 600px at 10% 12%, rgba(34,140,170,0.16), transparent 55%)",
          "linear-gradient(168deg, var(--color-ocean-1) 0%, #0A3A52 45%, var(--color-ocean-2) 100%)",
        ].join(","),
      }}
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage: "linear-gradient(to bottom, black, transparent 45%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 45%)",
        }}
      />
    </div>
  );
}
