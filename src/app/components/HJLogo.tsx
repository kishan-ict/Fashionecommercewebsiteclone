import React from "react";

interface HJLogoProps {
  className?: string;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: { container: "gap-0.5", hj: "text-[20px]", tagline: "text-[6px]", letterSpacing: "0.25em" },
  md: { container: "gap-1", hj: "text-[28px]", tagline: "text-[7px]", letterSpacing: "0.3em" },
  lg: { container: "gap-1", hj: "text-[36px]", tagline: "text-[8px]", letterSpacing: "0.3em" },
  xl: { container: "gap-1.5", hj: "text-[48px]", tagline: "text-[10px]", letterSpacing: "0.35em" },
};

export function HJLogo({ className = "", variant = "dark", size = "md" }: HJLogoProps) {
  const s = sizeMap[size];
  const primaryColor = variant === "dark" ? "#000000" : "#FFFFFF";
  const goldColor = "#C9A96E";

  return (
    <div className={`flex flex-col items-center ${s.container} ${className}`}>
      {/* Main Logo Mark */}
      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: s.hj.replace("text-[", "").replace("]", ""),
          fontWeight: 700,
          letterSpacing: s.letterSpacing,
          lineHeight: 1,
          color: primaryColor,
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ color: primaryColor }}>H</span>
        <span
          style={{
            color: goldColor,
            fontStyle: "italic",
            marginLeft: "1px",
            marginRight: "1px",
          }}
        >
          &amp;
        </span>
        <span style={{ color: primaryColor }}>J</span>
      </div>
      {/* Tagline */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: s.tagline.replace("text-[", "").replace("]", ""),
          letterSpacing: "0.35em",
          color: goldColor,
          fontWeight: 500,
          textTransform: "uppercase" as const,
          lineHeight: 1,
          marginTop: "2px",
        }}
      >
        FASHION
      </div>
      {/* Gold underline accent */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background: `linear-gradient(to right, transparent, ${goldColor}, transparent)`,
          marginTop: "3px",
        }}
      />
    </div>
  );
}

export function HJLogoCompact({ variant = "dark", className = "" }: { variant?: "dark" | "light"; className?: string }) {
  const primaryColor = variant === "dark" ? "#000000" : "#FFFFFF";
  const goldColor = "#C9A96E";

  return (
    <span
      className={className}
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 700,
        fontSize: "1.5rem",
        letterSpacing: "0.15em",
        lineHeight: 1,
        color: primaryColor,
      }}
    >
      H<span style={{ color: goldColor, fontStyle: "italic" }}>&amp;</span>J
    </span>
  );
}
