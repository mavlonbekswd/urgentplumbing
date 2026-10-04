import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = ["/", "/services", "/services/emergency-plumbing", "/guarantee", "/areas-we-cover", "/about", "/contact", "/privacy"];

for (const path of pages) {
  test(`${path} has no detectable WCAG A/AA violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
    expect(summary).toEqual([]);
  });
}

test("open services menu and mobile menu have no violations", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Services" }).hover();
  await page.waitForFunction(() => document.getAnimations().every((a) => a.playState !== "running"));
  const desktop = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(desktop.violations.map((v) => v.id)).toEqual([]);

  await page.setViewportSize({ width: 375, height: 812 });
  await page.getByRole("button", { name: "Menu" }).click();
  await page.waitForFunction(() => document.getAnimations().every((a) => a.playState !== "running"));
  const mobile = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(mobile.violations.map((v) => v.id)).toEqual([]);
});
