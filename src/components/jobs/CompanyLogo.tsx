import { useState } from "react";
import { cn } from "@/utils/cn";

type CompanyLogoProps = {
  name: string;
  logo?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "w-8 h-8 text-base",
  md: "w-10 h-10 text-lg",
  lg: "w-12 h-12 text-xl",
} as const;

export function CompanyLogo({
  name,
  logo,
  size = "md",
  className,
}: CompanyLogoProps) {
  const [errored, setErrored] = useState(false);

  const initial = name.charAt(0).toUpperCase();
  const showImage = Boolean(logo) && !errored;

  return (
    <div
      className={cn(
        "rounded-md bg-badge-neutral-bg text-badge-neutral-text",
        "flex items-center justify-center font-bold shrink-0 overflow-hidden",
        sizeClasses[size],
        className,
      )}
    >
      {showImage ? (
        <img
          src={logo}
          alt={`${name} logo`}
          className="w-full h-full object-contain"
          loading="lazy"
          onError={() => setErrored(true)}
        />
      ) : (
        <span>{initial}</span>
      )}
    </div>
  );
}