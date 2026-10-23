import { cn } from "@/lib/cn";

const star = "M12 1.8l2.95 6.3 6.85.8-5.08 4.68 1.38 6.77L12 16.9l-6.1 3.45 1.38-6.77L2.2 8.9l6.85-.8z";

/** Five painted stars, with halves. Unrated films say so in words. */
export function Stars({ value, className }: { value?: number; className?: string }) {
  if (value == null) return <span className={cn("label text-wine", className)}>Not rated</span>;
  return (
    <span className={cn("inline-flex items-center gap-[2px]", className)} role="img" aria-label={`${value} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <svg key={i} viewBox="0 0 24 22" className="h-[0.95em] w-[0.95em]" aria-hidden>
            <path d={star} fill="none" stroke="var(--wine)" strokeWidth={1.1} opacity={0.55} />
            {fill > 0 && (
              <path d={star} fill="var(--brass)" style={fill < 1 ? { clipPath: `inset(0 ${100 - fill * 100}% 0 0)` } : undefined} />
            )}
          </svg>
        );
      })}
    </span>
  );
}
