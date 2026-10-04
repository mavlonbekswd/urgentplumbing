import { expect, test } from "@playwright/test";
import { allRoutes } from "./routes";

const ORIGIN = "https://urgentplumbing.uk";

test("robots.txt allows crawling and points at the sitemap", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toContain("Allow: /");
  expect(body).toContain(`Sitemap: ${ORIGIN}/sitemap.xml`);
  expect(body).not.toMatch(/Disallow: \/\s*$/m);
});

test("sitemap lists every page on the canonical domain", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  expect(res.status()).toBe(200);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  expect(locs.length).toBe(allRoutes.length);
  for (const path of allRoutes) expect(locs).toContain(path === "/" ? `${ORIGIN}/` : `${ORIGIN}${path}`);
  expect(xml).not.toContain("thank-you");
});

test("thank-you page is not indexed", async ({ page }) => {
  await page.goto("/thank-you");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("Open Graph image is generated", async ({ request }) => {
  const res = await request.get("/opengraph-image");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("image/png");
});

test("structured data is valid JSON and contains no unverified claims", async ({ page }) => {
  const forbiddenKeys = ["aggregateRating", "review", "ratingValue", "reviewCount", "sameAs", "geo", "openingHoursSpecification", "priceRange", "foundingDate", "award"];
  for (const path of allRoutes) {
    await page.goto(path);
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks.length, path).toBeGreaterThan(0);
    for (const raw of blocks) {
      const data = JSON.parse(raw);
      const text = JSON.stringify(data);
      for (const key of forbiddenKeys) expect(text, `${path} has ${key}`).not.toContain(`"${key}"`);
    }
    const types = blocks.map((b) => JSON.parse(b)["@type"]);
    expect(types).toContain("Plumber");
    if (path !== "/") expect(types).toContain("BreadcrumbList");
    if (path.startsWith("/services/")) expect(types).toContain("Service");
  }
});

test("FAQ structured data matches the questions on the page", async ({ page }) => {
  await page.goto("/");
  const faq = (await page.locator('script[type="application/ld+json"]').allTextContents())
    .map((b) => JSON.parse(b))
    .find((d) => d["@type"] === "FAQPage");
  expect(faq).toBeTruthy();
  const visible = await page.locator("details summary").allInnerTexts();
  expect(faq.mainEntity.map((q: { name: string }) => q.name)).toEqual(visible.map((t) => t.trim()));
});

// Claims the previous site made without evidence. None of them may come back.
const unverifiedClaims = [
  /licen[sc]ed/i,
  /fully insured|insured\b/i,
  /\b\d+\+?\s*years/i,
  /100\s*%/,
  /satisfaction guaranteed/i,
  /same[- ]day/i,
  /\b\d+\s*(?:-|to)\s*\d+\s*hours?/i,
  /within \d+ (?:minutes|hours)/i,
  /5[- ]star|★/i,
  /\breviews?\b/i,
  /award/i,
  /gas safe registered (?:engineers?|plumbers?) (?:on|in) (?:our|the) team/i,
];

test("no page makes unverified trust claims", async ({ page }) => {
  for (const path of [...allRoutes, "/thank-you"]) {
    await page.goto(path);
    const text = await page.locator("body").innerText();
    for (const claim of unverifiedClaims) expect(text, `${path} matches ${claim}`).not.toMatch(claim);
  }
});

// The business is based in Cambridge but covers a much wider area; the copy mustn't read as
// Cambridge-only. Service pages shouldn't need to mention it at all.
test("Cambridge doesn't dominate the page copy", async ({ page }) => {
  for (const path of allRoutes) {
    await page.goto(path);
    const text = await page.locator("main").innerText();
    const count = text.match(/Cambridge(?!shire)/g)?.length ?? 0;
    expect(count, `${path} mentions Cambridge ${count} times`).toBeLessThanOrEqual(path.startsWith("/services") ? 0 : 3);
  }
});
