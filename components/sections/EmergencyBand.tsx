import { business, GAS_EMERGENCY } from "@/data/business";
import { emergencySigns, stopcockSteps } from "@/data/content";
import { ButtonLink } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/CallButton";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NumberedSteps } from "./NumberedSteps";
import { PhoneLink } from "@/components/ui/PhoneLink";

/** The "if it can't wait" band: calm, practical, with the call button front and centre. */
export function EmergencyBand() {
  return (
    <Section tone="navy" labelledBy="emergency-heading">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <SectionHeading
            id="emergency-heading"
            label="If it can't wait"
            title="Water where it shouldn't be? Call us now."
            intro={
              <p>
                Don&apos;t wait for a reply to a form. Ring <PhoneLink onDark />, tell us what you can see, and
                we&apos;ll help you make it safe while we arrange the repair.
              </p>
            }
            onDark
          />
          <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {emergencySigns.map((s) => (
              <li key={s} className="flex items-center gap-3 text-white">
                <Icon name="alert" className="size-5 text-green-300" />
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CallButton size="lg" />
            <ButtonLink href="/services/emergency-plumbing" variant="onDark" size="lg">
              Emergency plumbing
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-lg border border-navy-700 bg-navy-800 p-6 sm:p-8">
          <h3 className="text-h3 text-white">While you&apos;re calling us</h3>
          <p className="mt-2 text-navy-200">Three things that limit the damage:</p>
          <div className="mt-6">
            <NumberedSteps steps={stopcockSteps} onDark />
          </div>
          <p className="mt-8 flex gap-3 border-t border-navy-700 pt-6 text-[0.9375rem] text-navy-200">
            <Icon name="info" className="mt-0.5 size-5 text-green-300" />
            <span>
              Smell gas? That isn&apos;t a plumbing call. Leave the property and ring the National Gas Emergency Service
              on{" "}
              <a href={GAS_EMERGENCY.href} className="whitespace-nowrap font-semibold text-white underline underline-offset-4">
                {GAS_EMERGENCY.display}
              </a>
              .
            </span>
          </p>
        </div>
      </div>
    </Section>
  );
}
