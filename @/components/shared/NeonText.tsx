import type React from "react";
import { cn } from "@/lib/utils";

interface NeonTextProps {
  children: React.ReactNode;
  className?: string;
  color?: "pink" | "blue" | "purple" | "cyan" | "green" | "yellow";
  size?: "sm" | "md" | "lg" | "xl";
  intensity?: "low" | "medium" | "high";
}

export function NeonText({
  children,
  className,
  color = "pink",
  size = "xl",
  intensity = "medium",
}: NeonTextProps) {
  const colorClasses = {
    pink: "text-pink-100",
    blue: "text-blue-100",
    purple: "text-purple-100",
    cyan: "text-cyan-100",
    green: "text-green-100",
    yellow: "text-yellow-100",
  };

  const glowColors = {
    pink: "text-pink-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
    cyan: "text-cyan-400",
    green: "text-green-400",
    yellow: "text-yellow-400",
  };

  const sizeClasses = {
    sm: "text-4xl md:text-5xl",
    md: "text-5xl md:text-6xl",
    lg: "text-6xl md:text-7xl",
    xl: "text-7xl md:text-9xl",
  };

  const intensityClasses = {
    low: "neon-glow-low",
    medium: "neon-glow-medium",
    high: "neon-glow-high",
  };

  return (
    <div className="relative inline-block">
      {/* Multiple glow layers for depth */}
      <p
        className={cn(
          "absolute inset-0 font-extrabold blur-lg opacity-40",
          glowColors[color],
          sizeClasses[size],
        )}
        aria-hidden="true"
      >
        {children}
      </p>

      <p
        className={cn(
          "absolute inset-0 font-extrabold blur-md opacity-60",
          glowColors[color],
          sizeClasses[size],
        )}
        aria-hidden="true"
      >
        {children}
      </p>

      <p
        className={cn(
          "absolute inset-0 font-extrabold blur-sm opacity-80",
          glowColors[color],
          sizeClasses[size],
        )}
        aria-hidden="true"
      >
        {children}
      </p>

      {/* Main readable text layer */}
      <p
        className={cn(
          "relative font-extrabold tracking-wider drop-shadow-lg",
          colorClasses[color], // Light color for readability
          sizeClasses[size],
          intensityClasses[intensity],
          className,
        )}
      >
        {children}
      </p>
    </div>
  );
}
