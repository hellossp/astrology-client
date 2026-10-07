"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  fullWidth = false,
  children,
  icon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5"
  };

  const variantStyles = {
    primary:
      "gold-gradient-bg text-slate-950 font-bold hover:brightness-110 shadow-lg shadow-amber-500/10 border border-amber-300/30",
    secondary:
      "bg-purple-900/40 text-amber-200 border border-purple-500/30 hover:bg-purple-800/60 shadow-md",
    outline:
      "bg-slate-900/50 text-amber-300 border border-amber-500/30 hover:border-amber-400 hover:bg-amber-500/10",
    ghost:
      "text-slate-300 hover:text-amber-300 hover:bg-slate-800/50",
    danger:
      "bg-red-900/40 text-red-200 border border-red-500/30 hover:bg-red-800/60"
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
