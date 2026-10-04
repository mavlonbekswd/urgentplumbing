import { business } from "@/data/business";
import { coverageRegions, townsInDisplayOrder } from "@/data/locations";
import { ButtonLink } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/CallButton";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LocationGrid } from "./LocationGrid";

export function AreasPreview() {
  return (
    <Section tone="mist" labelledBy="areas-heading">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          id="areas-heading"
          label="Areas we cover"
          title="Plumbing & drainage across the local area."
          intro={
            <p>
              We&apos;re based in {business.base.town} and work in towns and villages across {coverageRegions}.
            </p>
          }
        />
        <ButtonLink href="/areas-we-cover" variant="secondary" icon="arrowRight" iconPosition="end" className="shrink-0">
          Check your area
        </ButtonLink>
      </div>

      <LocationGrid towns={townsInDisplayOrder} label="Towns we cover" className="mt-10 xl:grid-cols-5" />

      <div className="mt-8 flex flex-col gap-5 rounded-lg border border-line bg-white p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3.5">
          <Icon name="search" weight="duotone" className="mt-0.5 size-8 text-navy-700" />
          <div>
            <h3 className="text-lg font-bold">Can&apos;t see your town?</h3>
            <p className="mt-1 text-body">
              Call us and we&apos;ll let you know whether we cover your postcode. We also work in the villages between
              these towns.
            </p>
          </div>
        </div>
        <CallButton label="short" className="shrink-0" />
      </div>
    </Section>
  );
}
