import { cn } from "@/lib/cn";

/** "How it works" — four numbered steps joined by a line on wide screens. */
export function ProcessSteps({ steps, className }: { steps: { title: string; body: string }[]; className?: string }) {
  return (
    <ol className={cn("relative grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6", className)}>
      {/* connecting line behind the numbers on desktop */}
      <span aria-hidden="true" className="absolute left-6 right-[calc(25%-2.625rem)] top-6 hidden h-0.5 bg-navy-200 lg:block" />
      {steps.map((step, i) => (
        <li key={step.title} className="relative flex gap-4 lg:block">
          <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-4 border-mist bg-navy-700 font-display text-xl font-bold text-white lg:mb-5">
            <span className="sr-only">Step </span>
            {i + 1}
          </span>
          <div>
            <h3 className="text-h3">{step.title}</h3>
            <p className="mt-2 text-body">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
