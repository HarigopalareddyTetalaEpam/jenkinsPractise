import { chromium, defineConfig, devices, firefox } from "playwright/test";

export default defineConfig({
  forbidOnly: true,
  quiet: false,
  testMatch: ["tests/*.spec.ts"],
  testIgnore: ["**/deprecated/**"],
  workers: 3,
  fullyParallel: true,
  use: {
    browserName: "chromium",
    isMobile: true,
    baseURL: "https://www.google.com",
    trace: "retain-on-failure",
  },
});