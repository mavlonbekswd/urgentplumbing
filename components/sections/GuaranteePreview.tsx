import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const commitments = [
  "The work and the price agreed with you before we start",
  "No extra work without asking you first",
  "Everything tested before we leave",
  "If something we did isn't right, we come back and look at it",
];

export function GuaranteePreview() {
  return (
    <Section tone="green" labelledBy="guarantee-heading">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            id="guarantee-heading"
            label="Our guarantee"
            title="If something we've done isn't right, tell us."
            intro={
              <p>
                We&apos;d rather hear about a problem than have you live with it. Our guarantee page explains, in
                plain English, what you can expect from us and what to do if you&apos;re not happy with a job.
              </p>
            }
          />
          <ButtonLink href="/guarantee" variant="secondary" icon="arrowRight" iconPosition="end" className="mt-8">
            Read our guarantee
          </ButtonLink>
        </div>
        <ul className="divide-y divide-green-100 rounded-lg border border-green-100 bg-white">
          {commitments.map((c) => (
            <li key={c} className="flex items-start gap-4 p-5">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-green-600 text-white">
                <Icon name="check" className="size-4" weight="bold" />
              </span>
              <span className="pt-0.5 font-semibold text-navy-900">{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
