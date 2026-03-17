interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  centered = true,
}: SectionHeaderProps) {
  const alignClass = centered ? "text-center items-center" : "text-left items-start";

  /* Split title if highlight is provided at the end */
  const titleBefore = highlight ? title.replace(highlight, "").trim() : title;

  return (
    <div className={`flex flex-col gap-3 mb-12 ${alignClass}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#4FD1C5] uppercase">
          <span className="w-6 h-px bg-[#4FD1C5]" />
          {eyebrow}
          <span className="w-6 h-px bg-[#4FD1C5]" />
        </span>
      )}

      <h2
        className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white leading-tight"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        {highlight ? (
          <>
            {titleBefore}{" "}
            <span className="gradient-text">{highlight}</span>
          </>
        ) : (
          title
        )}
      </h2>

      {/* Animated underline */}
      <div
        className={`flex ${centered ? "justify-center" : "justify-start"}`}
      >
        <div className="h-1 w-16 bg-gradient-to-r from-[#4FD1C5] to-[#2B6CB0] rounded-full" />
        <div className="h-1 w-4 ml-1 bg-[#FF6600] rounded-full" />
      </div>

      {description && (
        <p className="text-[#64748B] dark:text-slate-400 max-w-xl leading-relaxed text-base">
          {description}
        </p>
      )}
    </div>
  );
}
