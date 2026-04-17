import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    (<textarea
      className={cn(
        // "flex min-h-[80px] w-full rounded-md border  border-input bg-background px-3 py-2 text-[12px] font-PoppinsRegular ring-offset-background placeholder: text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
       "placeholder:text-xs flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-card-foreground text-[11px] shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-xs",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Textarea.displayName = "Textarea"

export { Textarea }
