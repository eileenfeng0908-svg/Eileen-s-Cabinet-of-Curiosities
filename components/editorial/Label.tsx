import { cn } from "@/lib/cn";

/** The archival voice: small, uppercase, tracked. */
export function Label({
  children,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "p" | "div" | "dt" | "dd";
}) {
  return <Tag className={cn("label", className)}>{children}</Tag>;
}
