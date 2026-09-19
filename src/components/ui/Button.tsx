import Link from "next/link";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium tracking-wider uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-40 disabled:cursor-not-allowed select-none";

    const sizeStyles = {
      sm: "text-xs px-4 py-2 gap-2",
      md: "text-xs px-6 py-3.5 gap-2.5",
      lg: "text-sm px-8 py-4 gap-3",
    };

    const variantStyles = {
      primary:
        "bg-ivory text-background hover:bg-white active:scale-[0.98] border border-ivory",
      secondary:
        "bg-surface text-ivory hover:bg-surface-elevated active:scale-[0.98] border border-surface-border",
      gold:
        "bg-gold text-background hover:bg-gold-hover active:scale-[0.98] font-semibold",
      outline:
        "bg-transparent text-ivory hover:text-white hover:border-ivory border border-surface-border active:scale-[0.98]",
      ghost:
        "bg-transparent text-ivory-muted hover:text-ivory hover:bg-surface active:scale-[0.98]",
    };

    const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

    const content = (
      <>
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          className={combinedStyles}
          aria-disabled={disabled || isLoading}
          tabIndex={disabled ? -1 : undefined}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={combinedStyles}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
