import { expect, test } from "@playwright/test";
import { allRoutes } from "./routes";

const CANONICAL_ORIGIN = "https://urgentplumbing.uk";

test.describe("every page", () => {
  for (const path of allRoutes) {
    test(`${path} renders with complete metadata`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);

      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main#main")).toBeVisible();

      const title = await page.title();
      expect(title.length).toBeGreaterThan(10);
      expect(title).toContain("Urgent Plumbing & Drainage");

      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description?.length ?? 0).toBeGreaterThan(50);

      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical).toBe(path === "/" ? `${CANONICAL_ORIGIN}` : `${CANONICAL_ORIGIN}${path}`);

      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
      await expect(page.locator("html")).toHaveAttribute("lang", "en-GB");
    });
  }

  test("titles and descriptions are unique", async ({ page }) => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const path of allRoutes) {
      await page.goto(path);
      titles.add(await page.title());
      descriptions.add((await page.locator('meta[name="description"]').getAttribute("content")) ?? "");
    }
    expect(titles.size).toBe(allRoutes.length);
    expect(descriptions.size).toBe(allRoutes.length);
  });

  test("inner pages have breadcrumbs", async ({ page }) => {
    for (const path of allRoutes.filter((p) => p !== "/")) {
      await page.goto(path);
      const crumbs = page.getByRole("navigation", { name: "Breadcrumb" });
      await expect(crumbs).toBeVisible();
      await expect(crumbs.locator('[aria-current="page"]')).toHaveCount(1);
    }
  });
});

test.describe("not found", () => {
  test("unknown page returns a helpful 404", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("can't find");
    await expect(page.locator('main a[href^="tel:"]').first()).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });

  test("unknown service slug returns 404", async ({ page }) => {
    const res = await page.goto("/services/boiler-servicing");
    expect(res?.status()).toBe(404);
  });

  test("old static URLs redirect", async ({ request }) => {
    const index = await request.get("/index.html", { maxRedirects: 0 });
    expect(index.status()).toBe(308);
    expect(index.headers().location).toBe("/");
    const thanks = await request.get("/thank-you.html", { maxRedirects: 0 });
    expect(thanks.status()).toBe(308);
    expect(thanks.headers().location).toBe("/thank-you");
  });
});
