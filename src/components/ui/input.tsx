import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full rounded-lg px-3 py-2 text-sm",
        
        "bg-transparent text-foreground placeholder:text-foreground/40",
        "border border-border/60 hover:border-border/80",
        
        "focus-visible:outline-none",
        "focus-visible:border-primary",
        "focus-visible:ring-2 focus-visible:ring-primary/30",
        
        // Disabled
        "disabled:opacity-50 disabled:cursor-not-allowed",

        // Error state
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/20",

        className
      )}
      {...props}
    />
  );
}

export { Input };
