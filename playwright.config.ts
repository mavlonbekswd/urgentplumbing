import { defineConfig, devices } from "@playwright/test";

// The real WhatsApp number isn't confirmed yet (see data/business.ts), so the suite builds the
// site with Ofcom's reserved drama number 07700 900123 to exercise every WhatsApp placement. It is
// fictional, can never ring anyone, and is only used for this test build.
process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ??= "447700900123";

// The suite builds and serves the production site itself on a dedicated port, into its own
// build folder, so it never clashes with a `next dev` server you already have running.
const PORT = 4123;
export const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } },
      testIgnore: /mobile|layout/,
    },
    {
      name: "mobile",
      use: { ...devices["Desktop Chrome"], viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: false },
      testMatch: /mobile|layout/,
    },
  ],
  webServer: {
    command: `npm run build && npx next start -p ${PORT} -H 127.0.0.1`,
    url: BASE_URL,
    env: { NEXT_DIST_DIR: ".next-test" },
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
