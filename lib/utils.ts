import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Smile,
  Stethoscope,
  AlignCenter,
  Sparkles,
  Baby,
  Shield,
} from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const iconLookup: Record<string, React.ElementType> = {
  Smile,
  Stethoscope,
  AlignCenter,
  Sparkles,
  Baby,
  Shield,
};

export function resolveServiceIcon(name: string): React.ElementType {
  return iconLookup[name] || Smile;
}
