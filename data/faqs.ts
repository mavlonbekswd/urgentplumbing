import type { Faq } from "./services";
import { business } from "./business";

const { phone, email, whatsapp } = business;

export const homeFaqs: Faq[] = [
  {
    q: "How do I know if my plumbing problem is an emergency?",
    a: "Treat it as an emergency if water is escaping and you can't stop it, water is near anything electrical, you've lost your water supply, or sewage is backing up into the house. In those cases, call us rather than filling in a form. A dripping tap, a running toilet or a slow sink is worth fixing, but can usually wait for a booked visit.",
  },
  {
    q: "Can I get a quote before you start?",
    a: "Yes. Tell us what's wrong on the phone or through the callback form. For some jobs we can give you an idea of cost from a description or a photo; for others we need to see it first. Either way, we agree the price with you before any work begins.",
  },
  {
    q: "Which areas do you cover?",
    a: "We're based in Cambridge and work across the towns around it — including Ely, Newmarket, Huntingdon, St Ives, St Neots, Saffron Walden, Royston, Haverhill and Bury St Edmunds. The full list is on our Areas We Cover page. If you're nearby but not listed, call and ask.",
  },
  {
    q: "What should I have ready when I call?",
    a: "Your postcode, a short description of what's happening and when it started, and whether you've turned the water off. If you can, take a photo or two. It also helps to know whether you have a combi boiler or a hot water cylinder, and anything we should know about parking or access.",
  },
  {
    q: "Where is my stopcock?",
    a: "Usually under the kitchen sink. If not, try a downstairs toilet, the airing cupboard, under the stairs, the garage, or wherever the water pipe comes into the house. Turn it clockwise to shut the water off. It's worth finding it now, before you need it.",
  },
  {
    q: "Do you work for businesses as well as homes?",
    a: "Yes. We work in homes and for local businesses. Tell us about the property and how it's used, and we'll arrange a time that causes the least disruption.",
  },
  {
    q: "How can I contact you?",
    a: `Call ${phone.display} — that's the quickest way, and the right one for anything urgent.${whatsapp ? " For a quick question, or to send a photo, message us on WhatsApp." : ""} For quotes and jobs that can wait, send an enquiry using the form on our home or contact page, or email ${email.address}.`,
  },
];

export const contactFaqs: Faq[] = [
  {
    q: "How much will it cost?",
    a: "It depends on the job, so we don't publish a price list that wouldn't fit your situation. We'll explain how we charge before anyone comes out, and agree the price for the work with you before it starts.",
  },
  {
    q: "Can I send photos?",
    a: `Yes, please do.${whatsapp ? " The easiest way is WhatsApp," : ""} ${whatsapp ? "or email" : "Email"} them to ${email.address} with your name and postcode. A photo of the problem — or of the label on a cylinder or boiler — often tells us a lot.`,
  },
  {
    q: "Should I use the form or call?",
    a: `If water is leaking, a drain is overflowing or you have no water, call ${phone.display}. The form is best for quotes and jobs that can wait, like a new tap or a slow drain.`,
  },
  {
    q: "What happens to the details I send?",
    a: "We only use them to reply to you about your enquiry. Our privacy policy explains how the form works and how long we keep messages.",
  },
];
