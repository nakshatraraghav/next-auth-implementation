"use client";

import { cva, VariantProps } from "class-variance-authority";

import { CircleIcon } from "@radix-ui/react-icons";

const buttonVariants = cva(
  `
  flex
  justify-center
  rounded-md
  px-3
  py-1.5
  text-sm
  font-semibold
  focus-visible:outline
  focus-visible:outline-2
  focus-visible:outline-offset-2
  transition-all
  duration-300
`,
  {
    variants: {
      variant: {
        default: "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600",
        secondary: "text-gray-900",
        destructive:
          "bg-red-600 hover:bg-red-800 focus-visible:outline-rose-600",
        disabled: "opacity-50 border-2 border-white cursor-not-allowed",
        oauth:
          "w-full px-4 py-2.5 ring-1 ring-inset ring-gray-300 focus:outline-offset-0",
      },
      size: {
        default: "",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        fw: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  size,
  className,
  onClick,
  loading,
}) => {
  return (
    <button
      onClick={onClick}
      className={buttonVariants({
        variant,
        size,
        className,
      })}
    >
      {!loading ? children : <CircleIcon className="animate-spin" />}
    </button>
  );
};

export default Button;
