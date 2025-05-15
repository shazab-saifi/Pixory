import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none shadow-md cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-black text-white hover:bg-black/90',
        secondary: 'bg-white text-black hover:bg-white/80',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-11 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({children, className, variant, size, ...rest}, ref) => {
    return <button className={cn(buttonVariants({variant, size}), className)} {...rest}>
      {children}
    </button>
  }
)

export default Button