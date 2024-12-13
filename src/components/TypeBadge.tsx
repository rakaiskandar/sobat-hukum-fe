import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const variants = cva("px-[10px] py-[2px] whitespace-nowrap w-fit text-[13px] font-semibold flex items-center justify-center rounded-full", {
  variants: {
    type: {
      yellow: "bg-yellow-100 text-yellow-600",
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      red: "bg-red-100 text-red-600",
    },
  },
  defaultVariants: {
    type: "blue",
  },
});

export interface TypeBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof variants> {}

const TypeBadge = React.forwardRef<HTMLDivElement, TypeBadgeProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className={cn(variants({ type, className }))} ref={ref} {...props} />
    );
  }
);

TypeBadge.displayName = "Type";

export default TypeBadge;