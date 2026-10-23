import Link from "next/link";
import { cn } from "@/lib/cn";

/** A quiet text link with a drawn underline and a small travelling arrow. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("group inline-flex items-baseline gap-2 label", className)}>
      <span className="link-draw pb-1">{children}</span>
      <span aria-hidden className="transition-transform duration-500 ease-gallery group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
