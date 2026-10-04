import { expect, test } from "@playwright/test";
import { services } from "../data/services";

test.describe("desktop navigation", () => {
  test("main links work and mark the active page", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    for (const [label, path] of [
      ["Guarantee", "/guarantee"],
      ["Areas We Cover", "/areas-we-cover"],
      ["About", "/about"],
      ["Contact", "/contact"],
      ["Home", "/"],
    ] as const) {
      await nav.getByRole("link", { name: label, exact: true }).click();
      await expect(page).toHaveURL(path);
      await expect(nav.getByRole("link", { name: label, exact: true })).toHaveAttribute("aria-current", "page");
    }
  });

  test("services dropdown opens on hover and stays open while moving into it", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Services" });
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await button.hover();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    const panel = page.locator(`#${await button.getAttribute("aria-controls")}`);
    const firstLink = panel.getByRole("link", { name: services[0]!.navLabel });
    await firstLink.hover();
    await expect(panel).toBeVisible();
    await firstLink.click();
    await expect(page).toHaveURL(`/services/${services[0]!.slug}`);
    await expect(button).toHaveAttribute("aria-expanded", "false");
  });

  test("services dropdown works with the keyboard", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Services" });
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(button).toBeFocused();

    await page.keyboard.press("ArrowDown");
    await expect(button).toHaveAttribute("aria-expanded", "true");
    const panel = page.locator(`#${await button.getAttribute("aria-controls")}`);
    await expect(panel.getByRole("link").first()).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(panel.getByRole("link").nth(1)).toBeFocused();

    // Tabbing out of the menu closes it.
    for (let i = 0; i < 12; i++) await page.keyboard.press("Tab");
    await expect(button).toHaveAttribute("aria-expanded", "false");
  });

  test("services dropdown toggles on click and closes on outside click", async ({ page }) => {
    await page.goto("/about");
    const button = page.getByRole("button", { name: "Services" });
    await button.dispatchEvent("click");
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await page.mouse.click(10, 600);
    await expect(button).toHaveAttribute("aria-expanded", "false");
  });

  test("skip link moves focus to the main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });
});
