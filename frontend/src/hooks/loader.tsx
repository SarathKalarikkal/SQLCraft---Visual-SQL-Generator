// Loader.tsx
import React from "react";
import clsx from "clsx";

type LoaderVariant = "orbital" | "ring" | "bars" | "dots";

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual style of the loader */
  variant?: LoaderVariant;
  /** Size in pixels for square loaders (orbital/ring/dots). For bars, sets height. */
  size?: number;
  /** Label for screen readers and optional visible caption */
  label?: string;
  /** Show the label under the loader */
  showLabel?: boolean;
  /** Fullscreen overlay mode */
  fullScreen?: boolean;
  /** Extra Tailwind classes applied to the root */
  className?: string;
  /** Accent color (CSS color). Used in gradients and bars. */
  color?: string;
  /** Secondary color for gradients (CSS color) */
  secondaryColor?: string;
  /** Background color used for the overlay or inner shapes */
  backgroundColor?: string;
}

const srOnly = "sr-only";

export const Loader: React.FC<LoaderProps> = ({
  variant = "orbital",
  size = 64,
  label = "Loading",
  showLabel = false,
  fullScreen = false,
  className,
  color = "#7c3aed",          // violet-600
  secondaryColor = "#06b6d4",  // cyan-500
  backgroundColor = "rgba(15, 23, 42, 0.9)", // slate-900/90
  ...rest
}) => {
  const dimension = `${size}px`;

  const Root = ({ children }: { children: React.ReactNode }) => (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={clsx(
        "flex flex-col items-center justify-center",
        fullScreen && "fixed inset-0 z-50 backdrop-blur-md",
        className
      )}
      style={fullScreen ? { background: backgroundColor } : undefined}
      {...rest}
    >
      {children}
      <span className={clsx(showLabel ? "mt-3 text-sm text-slate-400" : srOnly)}>
        {label}…
      </span>
    </div>
  );

  if (variant === "orbital") {
    return (
      <Root>
        <div
          className="relative rounded-full p-[3px] shadow-[0_0_40px_rgba(124,58,237,0.25)]"
          style={{
            width: dimension,
            height: dimension,
            background: `conic-gradient(from 0deg, ${color}, ${secondaryColor}, ${color})`,
          }}
        >
          <div
            className="h-full w-full rounded-full"
            style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), rgba(2,6,23,0.95))" }}
          />
          {/* glow orb */}
          <span
            className={clsx(
              "pointer-events-none absolute left-1/2 top-1/2 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full",
              "shadow-[0_0_12px_rgba(6,182,212,0.85),0_0_32px_rgba(124,58,237,0.65)]",
              "animate-[spin_1.2s_linear_infinite]"
            )}
            style={{
              background: secondaryColor,
              transformOrigin: `${size / 2}px ${size / 2}px`,
              // Position the orb on the ring using translate + rotate trick
              boxShadow: `0 0 12px ${secondaryColor}CC, 0 0 28px ${color}AA`,
            }}
          />
          {/* rotate the orb by wrapping it in a ring path */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.35)",
              mask: "radial-gradient(circle, transparent 58%, black 59%)",
            }}
          />
          {/* animated ring sweep */}
          <span
            className="absolute inset-0 rounded-full animate-[spin_2.2s_linear_infinite]"
            style={{
              background: `conic-gradient(from 0deg, transparent 60%, ${color} 85%, transparent 100%)`,
              mask: "radial-gradient(circle, transparent 55%, black 56%)",
            }}
          />
        </div>
      </Root>
    );
  }

  if (variant === "ring") {
    const border = Math.max(3, Math.round(size * 0.08));
    return (
      <Root>
        <div
          className={clsx(
            "relative rounded-full border-t-transparent animate-spin",
            "shadow-[0_0_30px_rgba(124,58,237,0.25)]"
          )}
          style={{
            width: dimension,
            height: dimension,
            borderWidth: border,
            borderColor: `${color}55`,
            borderTopColor: color,
          }}
        >
          <span
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: `inset 0 0 ${Math.round(size * 0.2)}px ${color}22`,
            }}
          />
        </div>
      </Root>
    );
  }

  if (variant === "bars") {
    const barWidth = Math.max(6, Math.round(size * 0.18));
    const barHeight = Math.max(24, Math.round(size * 0.9));
    const gap = Math.max(6, Math.round(size * 0.14));
    return (
      <Root>
        <div className="flex items-end" style={{ gap }}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={clsx(
                "rounded-md",
                "animate-[bounce_1s_infinite]",
                // staggered delays
                i === 1 && "[animation-delay:0.12s]",
                i === 2 && "[animation-delay:0.24s]",
                i === 3 && "[animation-delay:0.36s]",
                "shadow-[0_8px_24px_rgb(2,6,23,0.35)]"
              )}
              style={{
                width: barWidth,
                height: barHeight,
                background: `linear-gradient(180deg, ${secondaryColor}, ${color})`,
                filter: "saturate(120%)",
              }}
            />
          ))}
        </div>
      </Root>
    );
  }

  // dots
  const dotSize = Math.max(8, Math.round(size * 0.18));
  const dotGap = Math.max(6, Math.round(size * 0.18));
  return (
    <Root>
      <div className="flex items-center" style={{ gap: dotGap }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={clsx(
              "rounded-full",
              "animate-[pulse_1.2s_ease-in-out_infinite]",
              i === 1 && "[animation-delay:0.15s]",
              i === 2 && "[animation-delay:0.3s]",
              "shadow-[0_0_20px_rgba(124,58,237,0.35)]"
            )}
            style={{
              width: dotSize,
              height: dotSize,
              background: `radial-gradient(circle at 30% 30%, ${secondaryColor}, ${color})`,
              filter: "saturate(120%)",
            }}
          />
        ))}
      </div>
    </Root>
  );
};

export default Loader;
