import { cn } from "@/lib/cn";

/** Numbered list used for "what to do right now" instructions. */
export function NumberedSteps({ steps, onDark = false }: { steps: string[]; onDark?: boolean }) {
  return (
    <ol className="space-y-4">
      {steps.map((step, i) => (
        <li key={step} className="flex gap-4">
          <span
            aria-hidden="true"
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-full font-display text-base font-bold",
              onDark ? "bg-white text-navy-900" : "bg-navy-700 text-white",
            )}
          >
            {i + 1}
          </span>
          <span className={cn("min-w-0 pt-0.5 [overflow-wrap:anywhere]", onDark ? "text-navy-100" : "text-body")}>{step}</span>
        </li>
      ))}
    </ol>
  );
}
