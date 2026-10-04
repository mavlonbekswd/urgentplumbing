import { readdirSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { homeWorkPhotos, ourWorkGroups, ourWorkLeadPhoto, photos, servicePhotos } from "../data/photos";
import { allRoutes } from "./routes";

test("every published photo file is listed in data/photos.ts, and every listed photo exists", async ({ request }) => {
  // Anything in /public is reachable online, so a held-back photo must never be left there.
  const files = readdirSync(join(__dirname, "..", "public", "images", "work")).filter((f) => !f.startsWith("."));
  const listed = Object.values(photos).map((p) => p.src.replace("/images/work/", ""));
  expect(files.sort()).toEqual([...listed].sort());

  for (const p of Object.values(photos)) {
    const res = await request.get(p.src);
    expect(res.status(), p.src).toBe(200);
    expect(p.alt.length, p.src).toBeGreaterThan(15);
    expect(p.caption.length, p.src).toBeGreaterThan(5);
  }
});

test("every published photo is shown on Our Work", async ({ page }) => {
  await page.goto("/our-work");
  const shown = await page.locator("figure[data-photo]").evaluateAll((els) => els.map((e) => e.getAttribute("data-photo")));
  const expected = [ourWorkLeadPhoto, ...ourWorkGroups.flatMap((g) => g.photos)];
  expect(shown).toEqual(expected);
  expect(new Set(expected).size).toBe(Object.keys(photos).length);
});

test("no page has a broken image, and every image has alt text", async ({ page }) => {
  test.setTimeout(120_000);
  for (const path of allRoutes) {
    await page.goto(path);
    // Bring lazy images into view so they actually load.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
    });
    await page.waitForLoadState("networkidle");
    const bad = await page.evaluate(() =>
      [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
    );
    expect(bad, path).toEqual([]);
    const missingAlt = await page.locator("img:not([alt])").count();
    expect(missingAlt, path).toBe(0);
  }
});

test("home page work photos lazy-load and are served through the image optimiser", async ({ page }) => {
  await page.goto("/");
  const imgs = page.locator('section[aria-labelledby="real-work-heading"] img');
  await expect(imgs).toHaveCount(homeWorkPhotos.length);
  for (const img of await imgs.all()) {
    await expect(img).toHaveAttribute("loading", "lazy");
    await expect(img).toHaveAttribute("src", /\/_next\/image\?url=%2Fimages%2Fwork%2F/);
    await expect(img).toHaveAttribute("sizes", /.+/);
  }
  // The hero keeps the enquiry form; no photo competes with it.
  await expect(page.locator("main section").first().locator("img")).toHaveCount(0);
});

test("each service page shows the photo matched to it", async ({ page }) => {
  for (const [slug, id] of Object.entries(servicePhotos)) {
    await page.goto(`/services/${slug}`);
    await expect(page.locator(`figure[data-photo="${id}"]`)).toBeVisible();
    await expect(page.locator(`figure[data-photo="${id}"] figcaption`)).toHaveText(photos[id].caption);
  }
});

test("no photo is used more than twice outside the Our Work gallery", async ({ page }) => {
  const counts = new Map<string, number>();
  for (const path of allRoutes.filter((p) => p !== "/our-work")) {
    await page.goto(path);
    for (const id of await page.locator("figure[data-photo]").evaluateAll((els) => els.map((e) => e.getAttribute("data-photo")!))) {
      counts.set(id, (counts.get(id) ?? 0) + 1);
    }
  }
  for (const [id, n] of counts) expect(n, id).toBeLessThanOrEqual(2);
});
