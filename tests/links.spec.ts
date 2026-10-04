import { expect, test } from "@playwright/test";
import { business, GAS_EMERGENCY } from "../data/business";
import { allRoutes } from "./routes";

test("every tel: and mailto: link points at the right place", async ({ page }) => {
  const allowedTel = new Set<string>([business.phone.href, GAS_EMERGENCY.href]);
  for (const path of allRoutes) {
    await page.goto(path);
    const tels = await page.locator('a[href^="tel:"]').evaluateAll((els) => els.map((e) => e.getAttribute("href")));
    expect(tels.length, `${path} should have call links`).toBeGreaterThan(0);
    for (const href of tels) expect(allowedTel.has(href!), `${path}: ${href}`).toBe(true);

    const mails = await page.locator('a[href^="mailto:"]').evaluateAll((els) => els.map((e) => e.getAttribute("href")));
    for (const href of mails) expect(href).toBe(business.email.href);
  }
  // The number is valid E.164 for a Cambridge landline (no stray 0 after +44).
  expect(business.phone.href).toBe("tel:+441223482425");
});

test("no internal link is dead", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const path of allRoutes) {
    await page.goto(path);
    const hrefs = await page
      .locator('a[href^="/"]')
      .evaluateAll((els) => els.map((e) => (e as HTMLAnchorElement).getAttribute("href")!));
    hrefs.forEach((h) => seen.add(h.split("#")[0] || "/"));
  }
  for (const href of seen) {
    const res = await request.get(href);
    expect(res.status(), href).toBe(200);
  }
});

test("anchor targets exist", async ({ page }) => {
  await page.goto("/contact#enquiry");
  await expect(page.locator("#enquiry")).toBeVisible();
  await page.goto("/#enquiry");
  await expect(page.locator("#enquiry")).toBeVisible();
  await expect(page.locator("#main")).toHaveCount(1);
});

test.describe("WhatsApp", () => {
  test("is configured centrally with a pre-filled message", async () => {
    expect(business.whatsapp).not.toBeNull();
    const url = new URL(business.whatsapp!.href);
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toMatch(/^\/44\d{9,10}$/);
    expect(url.searchParams.get("text")).toBe("Hi Urgent Plumbing, I need help with a plumbing issue.");
  });

  test("appears in the hero, closing call-to-action, footer, contact page and service pages", async ({ page }) => {
    const wa = business.whatsapp!.href;
    await page.goto("/");
    await expect(page.locator("main section").first().locator(`a[href="${wa}"]`)).toBeVisible();
    await expect(page.locator(`section[aria-labelledby="cta-heading"] a[href="${wa}"]`)).toBeVisible();
    await expect(page.locator(`footer a[href="${wa}"]`)).toBeVisible();
    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: "WhatsApp us" })).toBeVisible();
    await page.goto("/services/leak-repairs");
    await expect(page.locator(`main a[href="${wa}"]`).first()).toBeVisible();
  });

  test("every WhatsApp link uses the configured number and opens safely", async ({ page }) => {
    for (const path of allRoutes) {
      await page.goto(path);
      const links = await page.locator('a[href*="wa.me"]').evaluateAll((els) =>
        els.map((e) => [e.getAttribute("href"), e.getAttribute("target"), e.getAttribute("rel")]),
      );
      for (const [href, target, rel] of links) {
        expect(href, path).toBe(business.whatsapp!.href);
        expect(target).toBe("_blank");
        expect(rel).toContain("noopener");
      }
    }
  });
});
