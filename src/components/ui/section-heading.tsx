import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subcopy?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subcopy,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-orange-dark">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl text-ink md:text-4xl">{title}</h2>
      {subcopy && <p className="mx-auto mt-3 max-w-2xl text-ink-soft">{subcopy}</p>}
    </div>
  );
}
