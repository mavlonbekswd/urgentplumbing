"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { business } from "@/data/business";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

// One enquiry form, three layouts:
//   short — home page hero: name, phone, postcode, service, optional message
//   full  — contact page: as short, plus optional email, and the message is required
//   area  — "Do you cover my postcode?": postcode and phone only
//
// Delivery: FormSubmit (formsubmit.co), the same service and inbox the previous site used.
//  - With JavaScript: validated in the browser, sent in-page to FormSubmit's AJAX endpoint,
//    with loading, success and error states.
//  - Without JavaScript: the browser's own validation runs (required/pattern attributes) and
//    the form posts normally; FormSubmit then redirects to /thank-you.
// Spam: FormSubmit's honeypot field (_honey) — real people never see or fill it.
// Email is never required: a phone number is what a plumber needs to get back to someone.
//
// Photo upload is not included: FormSubmit's AJAX endpoint doesn't accept files, so customers
// are pointed to email (or WhatsApp, when configured) for photos.

type Field = "name" | "phone" | "email" | "postcode" | "service" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "error";
export type EnquiryVariant = "short" | "full" | "area";

const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELDS: Record<EnquiryVariant, Field[]> = {
  short: ["name", "phone", "postcode", "service", "message"],
  full: ["name", "phone", "email", "postcode", "service", "message"],
  area: ["postcode", "phone"],
};

const OPTIONAL: Record<EnquiryVariant, Field[]> = {
  short: ["message"],
  full: ["email"],
  area: [],
};

const LABELS: Record<Field, string> = {
  name: "Name",
  phone: "Phone number",
  email: "Email",
  postcode: "Postcode",
  service: "Service required",
  message: "Tell us what happened",
};

function validate(values: Partial<Record<Field, string>>, fields: Field[], optional: Field[]): Errors {
  const errors: Errors = {};
  const has = (f: Field) => fields.includes(f);
  const v = (f: Field) => (values[f] ?? "").trim();

  if (has("name") && v("name").length < 2) errors.name = "Please tell us your name.";

  if (has("phone")) {
    const digits = v("phone").replace(/\D/g, "");
    if (!digits) errors.phone = "Please add a phone number so we can get back to you.";
    else if (!/^(0\d{9,10}|44\d{9,10})$/.test(digits))
      errors.phone = "That doesn't look like a UK phone number — for example 07700 900123.";
  }

  if (has("email") && v("email") && !EMAIL.test(v("email")))
    errors.email = "That email address doesn't look right. You can leave it blank.";

  if (has("postcode")) {
    if (!v("postcode")) errors.postcode = "Please add your postcode so we know where you are.";
    else if (!UK_POSTCODE.test(v("postcode"))) errors.postcode = "Please enter a full UK postcode, for example CB1 2AB.";
  }

  if (has("service") && !v("service")) errors.service = "Please choose the closest match, or 'Something else'.";

  if (has("message") && !optional.includes("message") && v("message").length < 10)
    errors.message = "Please describe the problem in a sentence or two — it helps us prepare.";

  return errors;
}

export function EnquiryForm({
  variant,
  services = [],
  submitLabel = "Send enquiry",
  subject = "Website enquiry",
}: {
  variant: EnquiryVariant;
  /** Options for "Service required". */
  services?: string[];
  submitLabel?: string;
  /** First part of the email subject the business receives. */
  subject?: string;
}) {
  const fields = FIELDS[variant];
  const optional = OPTIONAL[variant];
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [sent, setSent] = useState({ name: "", postcode: "" });

  // Switch from the browser's validation to ours only once JavaScript is running.
  useEffect(() => setEnhanced(true), []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const read = (): Partial<Record<Field, string>> => {
    const fd = new FormData(formRef.current!);
    return Object.fromEntries(fields.map((f) => [f, String(fd.get(f) ?? "")]));
  };

  const recheck = (field: Field) => {
    const next = validate(read(), fields, optional);
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  };

  const onBlur = (field: Field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    recheck(field);
  };

  const onChange = (field: Field) => {
    if (touched[field] || showSummary) recheck(field);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = read();
    const found = validate(values, fields, optional);
    setErrors(found);
    setTouched(Object.fromEntries(fields.map((f) => [f, true])));

    if (fields.some((f) => found[f])) {
      setShowSummary(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setShowSummary(false);
    setStatus("submitting");

    const payload = Object.fromEntries(new FormData(formRef.current!).entries()) as Record<string, string>;
    // Spam trap filled in: behave as if all is well and send nothing.
    if (payload._honey) {
      setStatus("success");
      return;
    }
    const postcode = (values.postcode ?? "").trim().toUpperCase();
    payload._subject = [subject, payload.service, postcode].filter(Boolean).join(" — ");
    if (values.email?.trim()) payload._replyto = values.email.trim();

    try {
      const res = await fetch(business.form.ajaxEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      if (!res.ok || String(data.success) !== "true") throw new Error("Form service did not accept the message");
      setSent({ name: (values.name ?? "").trim().split(/\s+/)[0] ?? "", postcode });
      setStatus("success");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-lg border-2 border-green-600 bg-green-50 p-5 outline-none sm:p-6"
      >
        <span className="grid size-11 place-items-center rounded-full bg-green-600 text-white">
          <Icon name="check" weight="bold" className="size-6" />
        </span>
        <p className="mt-4 font-display text-h3 font-bold text-navy-900">
          {variant === "area" ? (
            <>Thanks — we&apos;ll let you know whether we cover {sent.postcode || "your postcode"}.</>
          ) : (
            <>Thanks{sent.name ? `, ${sent.name}` : ""} — we&apos;ve got your enquiry.</>
          )}
        </p>
        <p className="mt-2">
          We&apos;ll get back to you on the number you gave us. If things get worse in the meantime, please call{" "}
          <a href={business.phone.href} className="link whitespace-nowrap">
            {business.phone.display}
          </a>{" "}
          rather than waiting.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 inline-flex min-h-11 items-center font-semibold text-navy-800 underline underline-offset-4 hover:text-navy-900"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const id = (f: Field) => `${uid}-${f}`;
  const invalid = (f: Field) => Boolean(errors[f] && touched[f]);
  const describedBy = (f: Field, hint?: boolean) =>
    [hint ? `${id(f)}-hint` : null, invalid(f) ? `${id(f)}-error` : null].filter(Boolean).join(" ") || undefined;
  const errorList = fields.filter((f) => errors[f]);

  const control = (f: Field) =>
    cn(
      "mt-1.5 w-full rounded-md border-2 bg-white px-3.5 text-[1.0625rem] text-ink placeholder:text-muted/70 transition-colors focus:outline-none focus:ring-4",
      invalid(f)
        ? "border-error-700 focus:border-error-700 focus:ring-error-50"
        : "border-line-strong hover:border-navy-300 focus:border-water-600 focus:ring-water-100",
    );

  const label = (f: Field) => (
    <label htmlFor={id(f)} className="block text-[0.9375rem] font-semibold text-navy-900">
      {LABELS[f]}
      {optional.includes(f) ? (
        <span className="ml-1.5 font-normal text-muted">(optional)</span>
      ) : (
        <span className="ml-0.5 text-error-700" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );

  const fieldError = (f: Field) =>
    invalid(f) ? (
      <p id={`${id(f)}-error`} className="mt-1.5 flex items-start gap-1.5 text-[0.9375rem] font-semibold text-error-700">
        <Icon name="alert" weight="bold" className="mt-0.5 size-4" />
        {errors[f]}
      </p>
    ) : null;

  const common = (f: Field) => ({
    id: id(f),
    name: f,
    required: !optional.includes(f),
    "aria-invalid": invalid(f),
    "aria-describedby": describedBy(f, f === "message" && variant === "full"),
    onBlur: () => onBlur(f),
    onChange: () => onChange(f),
  });

  const inputs: Record<Field, ReactNode> = {
    name: (
      <div key="name">
        {label("name")}
        <input {...common("name")} type="text" autoComplete="name" minLength={2} maxLength={80} className={cn(control("name"), "h-12")} />
        {fieldError("name")}
      </div>
    ),
    phone: (
      <div key="phone">
        {label("phone")}
        <input {...common("phone")} type="tel" inputMode="tel" autoComplete="tel" maxLength={20} className={cn(control("phone"), "h-12")} />
        {fieldError("phone")}
      </div>
    ),
    email: (
      <div key="email">
        {label("email")}
        <input {...common("email")} type="email" inputMode="email" autoComplete="email" maxLength={120} className={cn(control("email"), "h-12")} />
        {fieldError("email")}
      </div>
    ),
    postcode: (
      <div key="postcode">
        {label("postcode")}
        <input
          {...common("postcode")}
          type="text"
          autoComplete="postal-code"
          autoCapitalize="characters"
          maxLength={10}
          pattern="[A-Za-z]{1,2}[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}"
          className={cn(control("postcode"), "h-12 uppercase placeholder:normal-case")}
        />
        {fieldError("postcode")}
      </div>
    ),
    service: (
      <div key="service">
        {label("service")}
        <div className="relative">
          <select {...common("service")} defaultValue="" className={cn(control("service"), "h-12 cursor-pointer appearance-none pr-11")}>
            <option value="" disabled>
              Choose a service
            </option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <Icon name="chevronDown" weight="bold" className="pointer-events-none absolute right-3.5 top-1/2 mt-[3px] size-5 -translate-y-1/2 text-navy-700" />
        </div>
        {fieldError("service")}
      </div>
    ),
    message: (
      <div key="message">
        {label("message")}
        {variant === "full" && (
          <p id={`${id("message")}-hint`} className="mt-0.5 text-[0.9375rem] text-muted">
            Where the problem is, what you can see, and when it started.
          </p>
        )}
        <textarea
          {...common("message")}
          rows={variant === "short" ? 3 : 5}
          minLength={optional.includes("message") ? undefined : 10}
          maxLength={3000}
          className={cn(control("message"), "py-2.5 leading-relaxed", variant === "short" ? "min-h-24" : "min-h-36")}
        />
        {fieldError("message")}
      </div>
    ),
  };

  // Pairs that sit side by side from the small breakpoint up.
  const pairs: Field[][] =
    variant === "area"
      ? [["postcode", "phone"]]
      : variant === "short"
        ? [["name"], ["phone", "postcode"], ["service"], ["message"]]
        : [["name", "phone"], ["email", "postcode"], ["service"], ["message"]];

  return (
    <form
      ref={formRef}
      action={business.form.endpoint}
      method="POST"
      noValidate={enhanced}
      onSubmit={enhanced ? onSubmit : undefined}
      className="space-y-4"
    >
      {/* FormSubmit settings (used by both the in-page and the no-JavaScript submission) */}
      <input type="hidden" name="_subject" value={`${subject} — ${business.name}`} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={`${business.url}/thank-you`} />
      {variant === "area" && <input type="hidden" name="service" value="Area check" />}
      {/* Honeypot: off-screen, out of the tab order and hidden from screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {showSummary && errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-md border-2 border-error-700 bg-error-50 p-3.5 outline-none">
          <p className="font-bold text-error-700">Please check {errorList.length === 1 ? "this field" : "these fields"}:</p>
          <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
            {errorList.map((f) => (
              <li key={f}>
                <a href={`#${id(f)}`} className="font-semibold text-error-700 underline underline-offset-2">
                  {LABELS[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {pairs.map((row) => (
        <div key={row.join("-")} className={cn("grid gap-4", row.length === 2 && "sm:grid-cols-2")}>
          {row.map((f) => inputs[f])}
        </div>
      ))}

      {status === "error" && (
        <div role="alert" className="rounded-md border-2 border-error-700 bg-error-50 p-3.5">
          <p className="font-bold text-error-700">Sorry — your enquiry didn&apos;t send.</p>
          <p className="mt-1">
            Nothing you typed has been lost. Please try again, or call{" "}
            <a href={business.phone.href} className="link whitespace-nowrap">
              {business.phone.display}
            </a>
            {business.whatsapp ? (
              <>
                {" "}
                or{" "}
                <a href={business.whatsapp.href} className="link" target="_blank" rel="noopener noreferrer">
                  message us on WhatsApp
                </a>
              </>
            ) : null}
            .
          </p>
        </div>
      )}

      <div className="pt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-md bg-navy-800 px-6 text-lg font-bold text-white transition-colors hover:bg-navy-900 disabled:cursor-wait disabled:opacity-80"
        >
          {status === "submitting" ? (
            <>
              <span className="size-5 animate-spin rounded-full border-[3px] border-white/40 border-t-white" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              {submitLabel}
              <Icon name="arrowRight" weight="bold" className="size-5" />
            </>
          )}
        </button>
        <p className="mt-3 flex items-start gap-2 text-[0.875rem] leading-snug text-muted">
          <Icon name="shield" className="mt-px size-4 shrink-0 text-navy-600" />
          <span>
            We&apos;ll use your details only to respond to your enquiry.{" "}
            <a href="/privacy" className="underline underline-offset-2 hover:text-navy-800">
              Privacy policy
            </a>
          </span>
        </p>
      </div>
      <p aria-live="polite" className="sr-only">
        {status === "submitting" ? "Sending your enquiry…" : ""}
      </p>
    </form>
  );
}
