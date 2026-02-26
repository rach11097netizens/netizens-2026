import React from "react";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "sm";
  showArrow?: boolean;
}

/** Split text into individual letter spans with staggered shimmer animation delays */
function ShimmerText({ children }: { children: React.ReactNode }) {
  const text = typeof children === "string" ? children : null;
  if (!text) return <>{children}</>;

  const LETTER_DELAY = 0.08;

  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="btn-letter"
          style={{ animationDelay: `${(i * LETTER_DELAY).toFixed(2)}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "default",
  showArrow = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans font-semibold rounded overflow-hidden relative select-none cursor-pointer";

  const sizes =
    size === "sm"
      ? "px-5 py-2.5 md:px-6 md:py-3 text-[14px] md:text-[15px]"
      : "px-6 py-3 md:px-[34px] md:py-[18px] text-[14px] md:text-[18px]";

  if (variant === "secondary") {
    return (
      <button
        className={`${baseStyles} bg-transparent text-regal-navy border border-regal-navy hover:bg-regal-navy hover:text-white hover:shadow-lg hover:-translate-y-[2px] active:translate-y-0 transition-all duration-300 ${sizes} ${className}`}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          <span>{children}</span>
          {showArrow && <ArrowRight size={20} className="ml-1" />}
        </span>
      </button>
    );
  }

  // Render shimmer-split text — handles string, array of strings/elements
  const renderShimmer = () => {
    if (typeof children === "string") {
      return <ShimmerText>{children}</ShimmerText>;
    }
    if (Array.isArray(children)) {
      return (
        <>
          {children.map((child, i) =>
            typeof child === "string" ? (
              <ShimmerText key={i}>{child}</ShimmerText>
            ) : (
              <span key={i}>{child}</span>
            ),
          )}
        </>
      );
    }
    return <>{children}</>;
  };

  return (
    <button
      className={`${baseStyles} btn-primary ${sizes} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        <span className="inline-flex">{renderShimmer()}</span>
        {showArrow && <ArrowRight size={20} className="ml-1" color="white" />}
      </span>
    </button>
  );
}
