import { expect, test, type Page } from "@playwright/test";
import { business } from "../data/business";

const AJAX = business.form.ajaxEndpoint;

async function fill(page: Page, opts: { email?: boolean; message?: boolean } = {}) {
  await page.getByLabel("Name").fill("Sam Taylor");
  await page.getByLabel("Phone number").fill("07700 900456");
  if (opts.email) await page.getByLabel("Email").fill("sam@example.com");
  await page.getByLabel("Postcode").fill("CB1 2AB");
  await page.getByLabel("Service required").selectOption({ index: 1 });
  if (opts.message !== false) await page.getByLabel("Tell us what happened").fill("The kitchen sink has been draining slowly for a week.");
}

test.describe("contact page enquiry form", () => {
  test("is labelled and posts to the existing FormSubmit inbox", async ({ page }) => {
    await page.goto("/contact");
    const form = page.locator("#enquiry form");
    await expect(form).toHaveAttribute("action", business.form.endpoint);
    await expect(form).toHaveAttribute("method", "POST");
    for (const label of ["Name", "Phone number", "Email", "Postcode", "Service required", "Tell us what happened"]) {
      await expect(page.getByLabel(label)).toBeVisible();
    }
    await expect(page.getByLabel("Email")).not.toHaveAttribute("required", "");
    // Honeypot: off-screen, out of the tab order, hidden from screen readers.
    const honey = form.locator('input[name="_honey"]');
    await expect(honey).toHaveAttribute("tabindex", "-1");
    await expect(honey).not.toBeInViewport();
    await expect(form.locator('[aria-hidden="true"]:has(input[name="_honey"])')).toHaveCount(1);
  });

  test("shows helpful errors and never sends an invalid form", async ({ page }) => {
    let sent = false;
    await page.route(AJAX, (route) => {
      sent = true;
      return route.fulfill({ json: { success: "true" } });
    });
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send enquiry" }).click();
    const summary = page.getByRole("alert").filter({ hasText: "Please check" });
    await expect(summary).toBeVisible();
    await expect(summary).toBeFocused();
    await expect(page.getByText("Please tell us your name.")).toBeVisible();
    await expect(page.getByLabel("Name")).toHaveAttribute("aria-invalid", "true");

    await page.getByLabel("Postcode").fill("not a postcode");
    await page.getByLabel("Postcode").blur();
    await expect(page.getByText("Please enter a full UK postcode")).toBeVisible();
    expect(sent).toBe(false);
  });

  test("shows a loading state, then a success message", async ({ page }) => {
    let payload: Record<string, string> = {};
    await page.route(AJAX, async (route) => {
      payload = route.request().postDataJSON();
      await new Promise((r) => setTimeout(r, 400));
      await route.fulfill({ json: { success: "true" } });
    });
    await page.goto("/contact");
    await fill(page, { email: true });
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByRole("button", { name: /Sending/ })).toBeDisabled();
    const success = page.getByRole("status").filter({ hasText: "we've got your enquiry" });
    await expect(success).toBeVisible();
    await expect(success).toContainText("Thanks, Sam");
    expect(payload.name).toBe("Sam Taylor");
    expect(payload.postcode).toBe("CB1 2AB");
    expect(payload._subject).toContain("CB1 2AB");
    expect(payload._replyto).toBe("sam@example.com");
    expect(payload._honey).toBe("");
  });

  test("shows an error with other ways to reach us if sending fails", async ({ page }) => {
    await page.route(AJAX, (route) => route.fulfill({ status: 500, json: { success: "false" } }));
    await page.goto("/contact");
    await fill(page);
    await page.getByRole("button", { name: "Send enquiry" }).click();
    const error = page.getByRole("alert").filter({ hasText: "didn't send" });
    await expect(error).toBeVisible();
    await expect(error.locator(`a[href="${business.phone.href}"]`)).toBeVisible();
    await expect(page.getByLabel("Name")).toHaveValue("Sam Taylor");
  });
});

test.describe("home page hero enquiry form", () => {
  test("sits in the hero, needs no email, and the message is optional", async ({ page }) => {
    let payload: Record<string, string> = {};
    await page.route(AJAX, async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ json: { success: "true" } });
    });
    await page.goto("/");
    const card = page.locator("#enquiry");
    await expect(card.getByRole("heading", { name: "Send an enquiry" })).toBeInViewport();
    await expect(card.getByLabel("Email")).toHaveCount(0);
    await expect(card.getByLabel("Service required").locator("option")).toHaveCount(9); // placeholder + 7 services + "something else"
    await fill(page, { message: false });
    await card.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByRole("status").filter({ hasText: "we've got your enquiry" })).toBeVisible();
    expect(payload.message).toBe("");
    await expect(card.getByText("We'll use your details only to respond to your enquiry.")).toHaveCount(0); // replaced by success
  });
});

test.describe("areas page postcode check", () => {
  test("asks only for postcode and phone, and labels the enquiry as an area check", async ({ page }) => {
    let payload: Record<string, string> = {};
    await page.route(AJAX, async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ json: { success: "true" } });
    });
    await page.goto("/areas-we-cover");
    const card = page.locator("#postcode-check");
    await expect(card.getByLabel("Name")).toHaveCount(0);
    await card.getByLabel("Postcode").fill("ip14 1ab");
    await card.getByLabel("Phone number").fill("07700 900789");
    await card.getByRole("button", { name: "Ask about my area" }).click();
    await expect(page.getByRole("status")).toContainText("whether we cover IP14 1AB");
    expect(payload.service).toBe("Area check");
    expect(payload._subject).toContain("Area check");
  });
});
