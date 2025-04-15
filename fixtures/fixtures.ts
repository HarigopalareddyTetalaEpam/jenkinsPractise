import { test as base, Page } from "playwright/test";
export const test = base.extend<{ loginPage: Page }>({
  loginPage: async ({ page }, use) => {
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    await page.fill('[name="username"]', "Admin");
    await page.fill('[name="password"]', "admin123");
    await page.click('[type="submit"]');
    await use(page);
  },
});
