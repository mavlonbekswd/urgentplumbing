import { expect, test } from "@playwright/test";
import { allRoutes } from "./routes";

// No sideways scrolling at the widths people actually use.
const widths = [320, 375, 430, 768, 1024, 1280, 1440];

test("no horizontal overflow at any width", async ({ page }) => {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of allRoutes) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${path} at ${width}px`).toBeLessThanOrEqual(0);
    }
  }
});

test("touch targets in the header and call bar are at least 44px tall", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const targets = page.locator("header a, header button, div.fixed.bottom-0 a");
  const count = await targets.count();
  expect(count).toBeGreaterThan(2);
  for (let i = 0; i < count; i++) {
    const t = targets.nth(i);
    if (!(await t.isVisible())) continue;
    const box = await t.boundingBox();
    expect(box!.height, (await t.getAttribute("aria-label")) ?? (await t.innerText())).toBeGreaterThanOrEqual(44);
  }
});
