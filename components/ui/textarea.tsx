/* components/ui/textarea.tsx
   Textarea minimal, no JavaScript – puro Tailwind, mesmo padrão dos
   demais componentes shadcn/ui presentes no template.
*/
import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        // mesma paleta / radius dos Inputs existentes
        "flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 " +
          "text-sm ring-offset-background placeholder:text-muted-foreground " +
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
          "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };
