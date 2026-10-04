import Link from "next/link";
import { business, CONTENT_LAST_UPDATED, GAS_EMERGENCY } from "@/data/business";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: `The terms that apply to using the ${business.name} website.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage crumbs={[{ name: "Terms of use", href: "/terms" }]} title="Terms of use" updated={CONTENT_LAST_UPDATED}>
      <p>
        These terms cover your use of this website, {business.domain}, run by {business.name}
        {business.legalName ? ` (a trading name of ${business.legalName})` : ""}. By using the site, you accept them.
        They don&apos;t cover plumbing work itself — the details of each job are agreed with you directly.
      </p>

      <h2>Information on this website</h2>
      <p>
        The advice on this site — for example, how to turn off a stopcock or what to do about a blocked drain — is
        general guidance. Every property is different, so use your own judgement and only do what&apos;s safe. If in
        doubt, call us or a qualified professional.
      </p>
      <p>
        If you smell gas, leave the property and call the National Gas Emergency Service on{" "}
        <a href={GAS_EMERGENCY.href}>{GAS_EMERGENCY.display}</a>.
      </p>
      <p>
        We try to keep the information here accurate and up to date, but we can&apos;t promise it&apos;s complete or
        free from error, and we may change it at any time.
      </p>

      <h2>Quotes and work</h2>
      <p>
        Nothing on this website is an offer to carry out work at a particular price. Prices and the scope of each job
        are agreed with you before work starts. Our approach to workmanship is set out on our{" "}
        <Link href="/guarantee">guarantee page</Link>.
      </p>

      <h2>Contacting us through the site</h2>
      <p>
        Please don&apos;t use the contact form for emergencies — call {business.phone.display} instead. How we handle
        the details you send is explained in our <Link href="/privacy">privacy policy</Link>.
      </p>

      <h2>Links to other websites</h2>
      <p>Where we link to other websites, we aren&apos;t responsible for their content or how they use your information.</p>

      <h2>Our content</h2>
      <p>
        The text, logo and design of this website belong to {business.name}. Please don&apos;t copy them for commercial
        use without our permission.
      </p>

      <h2>Liability</h2>
      <p>
        We aren&apos;t liable for any loss arising from your use of this website or reliance on its general guidance,
        except where the law doesn&apos;t allow us to limit our liability — for example, for death or personal injury
        caused by negligence, or for fraud. Nothing in these terms affects your statutory rights.
      </p>

      <h2>Law</h2>
      <p>These terms are governed by the law of England and Wales.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email <a href={business.email.href}>{business.email.address}</a> or call{" "}
        <a href={business.phone.href}>{business.phone.display}</a>.
      </p>
    </LegalPage>
  );
}
