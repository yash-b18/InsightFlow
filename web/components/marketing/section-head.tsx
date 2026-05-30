export function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="mx-auto mb-11 max-w-[680px] text-center">
      <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-coral-lab">
        {eyebrow}
      </span>
      <h2 className="mb-3 mt-3.5 text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink">
        {title}
      </h2>
      <p className="text-[16.5px] text-sub">{sub}</p>
    </div>
  );
}
