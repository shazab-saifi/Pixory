import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none shadow-md cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-black text-white hover:bg-black/90',
        secondary: 'bg-white text-black hover:bg-gray-100',
      },
      size: {
        sm: 'h-8 px-2 text-xs sm:h-9 sm:px-3 sm:text-sm',
        md: 'h-9 px-3 text-sm sm:h-10 sm:px-4 md:text-sm md:h-11 md:px-5',
        lg: 'h-10 px-4 text-sm sm:h-11 sm:text-base md:h-12 md:text-lg',
        icon: 'h-8 w-8 sm:h-10 sm:w-10',
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
    return <button ref={ref} className={cn(buttonVariants({variant, size}), className)} {...rest}>
      {children}
    </button>
  }
)

Button.displayName = "Button";

export default Button