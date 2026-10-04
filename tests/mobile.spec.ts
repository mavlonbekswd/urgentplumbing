import { expect, test } from "@playwright/test";
import { business } from "../data/business";

test.describe("mobile", () => {
  test("call bar is always visible with the right number", async ({ page }) => {
    await page.goto("/services/leak-repairs");
    const bar = page.locator(`div.fixed a[href="${business.phone.href}"]`);
    await expect(bar).toBeVisible();
    await page.mouse.wheel(0, 3000);
    await expect(bar).toBeInViewport();
    // Second action: WhatsApp when configured, otherwise the enquiry form.
    const second = business.whatsapp
      ? page.locator(`div.fixed a[href="${business.whatsapp.href}"]`)
      : page.locator('div.fixed a[href="/contact#enquiry"]');
    await expect(second).toBeVisible();
    await expect(second).toBeInViewport();
  });

  test("menu opens as a dialog, locks scrolling and closes with Escape", async ({ page }) => {
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: "Menu" });
    await menuButton.click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();
    await expect(page.locator("html")).toHaveClass(/menu-open/);
    await expect(dialog.getByRole("link", { name: new RegExp(`Call .*${business.phone.display}`) })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(page.locator("html")).not.toHaveClass(/menu-open/);
    await expect(menuButton).toBeFocused();
  });

  test("services accordion in the menu reaches a service page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    const servicesToggle = dialog.getByRole("button", { name: "Services" });
    await expect(servicesToggle).toHaveAttribute("aria-expanded", "false");
    await servicesToggle.click();
    await expect(servicesToggle).toHaveAttribute("aria-expanded", "true");
    await dialog.getByRole("link", { name: "Blocked drains" }).click();
    await expect(page).toHaveURL("/services/blocked-drains");
    await expect(dialog).toBeHidden();
    await expect(page.locator("html")).not.toHaveClass(/menu-open/);
  });

  test("menu closes when the backdrop is tapped", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
    await page.mouse.click(5, 400);
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeHidden();
  });

  test("hero order on phones: headline, call actions, then the enquiry form", async ({ page }) => {
    await page.goto("/");
    const top = async (loc: import("@playwright/test").Locator) => (await loc.boundingBox())!.y;
    const h1 = await top(page.locator("h1"));
    const call = await top(page.locator("main").getByRole("link", { name: /Call/ }).first());
    const form = await top(page.locator("#enquiry"));
    expect(h1).toBeLessThan(call);
    expect(call).toBeLessThan(form);
    const box = (await page.locator("#enquiry").boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(375);
  });

  test("FAQ accordion opens and closes", async ({ page }) => {
    await page.goto("/");
    const item = page.locator("details").filter({ hasText: "Where is my stopcock?" });
    await expect(item).not.toHaveAttribute("open", "");
    await item.locator("summary").click();
    await expect(item).toHaveAttribute("open", "");
    await expect(item.getByText("kitchen sink")).toBeVisible();
  });
});
