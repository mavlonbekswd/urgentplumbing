import { business } from "@/data/business";
import { ButtonLink } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/CallButton";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/seo";

// Shown after a contact-form submission when JavaScript is off (FormSubmit redirects here).
export const metadata = pageMetadata({
  title: "Thanks for your message",
  description: "We've received your message.",
  path: "/thank-you",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <section className="bg-mist">
      <Container className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl rounded-xl border border-line bg-white p-6 text-center shadow-raised sm:p-10">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-green-600 text-white">
            <Icon name="check" className="size-7" weight="bold" />
          </span>
          <h1 className="mt-6 text-h2">Thanks — we&apos;ve got your message.</h1>
          <p className="mt-4 text-lead text-body">
            We&apos;ll get back to you using the details you gave us. If things get worse in the meantime, please call
            rather than waiting.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CallButton />
            <ButtonLink href="/" variant="secondary">
              Back to the home page
            </ButtonLink>
          </div>
          <p className="mt-6 text-[0.9375rem] text-muted">{business.name}</p>
        </div>
      </Container>
    </section>
  );
}
