import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(13,148,136,0.16)]",
        className
      )}
    >
      {children}
    </div>
  );
}
