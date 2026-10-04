import { business, CONTENT_LAST_UPDATED } from "@/data/business";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${business.name} uses the details you give us when you call, email or use our contact form.`,
  path: "/privacy",
});

// TODO: BUSINESS OWNER TO CONFIRM — if the business trades as a limited company, add the
// registered name in data/business.ts; it will appear in the "Who we are" section below.

export default function PrivacyPage() {
  return (
    <LegalPage crumbs={[{ name: "Privacy policy", href: "/privacy" }]} title="Privacy policy" updated={CONTENT_LAST_UPDATED}>
      <p>
        This policy explains what information {business.name} collects when you contact us or use this website, what
        we do with it, and your rights. We&apos;ve tried to keep it short and plain.
      </p>

      <h2>Who we are</h2>
      <p>
        {business.legalName ? `${business.name} is a trading name of ${business.legalName}. ` : ""}
        We are a plumbing and drainage business based in {business.base.town}. For anything to do with your personal
        information, contact us at <a href={business.email.href}>{business.email.address}</a> or on{" "}
        <a href={business.phone.href}>{business.phone.display}</a>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>When you use our contact form:</strong> your name, phone number, postcode, the service you need, your
          message and, if you give it, your email address.
        </li>
        <li>
          <strong>When you call or email us:</strong> your contact details and whatever you tell us about the job,
          including any photos you send.
        </li>
        <li>
          <strong>When we carry out work:</strong> the address, details of the work, and the records needed for
          invoicing and any guarantee.
        </li>
        <li>
          <strong>When you visit the website:</strong> our hosting provider automatically keeps short-term technical
          logs (such as IP address and browser type) to keep the site running and secure.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiry, give you a quote and arrange a visit.</li>
        <li>To carry out the work and deal with any follow-up or guarantee issue.</li>
        <li>To keep the records we&apos;re required to keep, such as for tax.</li>
      </ul>
      <p>
        We use your information because you&apos;ve asked us to do something (to respond to you, or to quote for and
        carry out work), because we have a legal obligation to keep certain records, or because we have a legitimate
        interest in running our business properly. We don&apos;t use your details for marketing, and we never sell
        them.
      </p>

      <h2>Who else sees it</h2>
      <p>We only share your information with services we need to run the business:</p>
      <ul>
        <li>
          <strong>FormSubmit</strong> (formsubmit.co), which delivers contact-form messages to our email inbox.
        </li>
        <li>
          <strong>Our email provider</strong>, which stores the emails we send and receive.
        </li>
        <li>
          <strong>Our website host</strong>, which serves this website and keeps the technical logs mentioned above.
        </li>
      </ul>
      <p>
        Some of these providers process data outside the UK. Where that happens, we rely on the safeguards available
        under UK data protection law. We&apos;ll also share information if the law requires us to.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiries only for as long as we need them to deal with your request. Where we carry out work, we keep
        job records for as long as we need them for guarantee, insurance, tax and legal purposes, and then delete them.
      </p>

      <h2>Cookies</h2>
      <p>
        This website doesn&apos;t use analytics, advertising or tracking cookies. If that ever changes, we&apos;ll
        update this policy and ask for your consent where the law requires it.
      </p>

      <h2>Your rights</h2>
      <p>Under UK data protection law you can ask us to:</p>
      <ul>
        <li>give you a copy of the information we hold about you;</li>
        <li>correct anything that&apos;s wrong;</li>
        <li>delete your information, where we don&apos;t need to keep it;</li>
        <li>restrict or object to how we use it.</li>
      </ul>
      <p>
        To do any of these, email <a href={business.email.href}>{business.email.address}</a>. If you&apos;re unhappy
        with how we&apos;ve handled your information, you can complain to the Information Commissioner&apos;s Office at{" "}
        <a href="https://ico.org.uk/make-a-complaint/" rel="noopener noreferrer">
          ico.org.uk
        </a>{" "}
        or on 0303 123 1113 — though we&apos;d appreciate the chance to put it right first.
      </p>

      <h2>Changes to this policy</h2>
      <p>If we change how we use your information, we&apos;ll update this page and the date at the top.</p>
    </LegalPage>
  );
}
