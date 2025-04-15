import { test, devices, expect, Page } from "playwright/test";

test.use({ headless: false });

let windowHandling = test.extend<{
  newTabPage: Page;
  newWindowPage: Page;
  multipleWindowsPage: Page[];
}>({
  newTabPage: async ({ page, context }, use) => {
    await page.goto("https://demo.automationtesting.in/Windows.html");
    let open = '//a//button[@class="btn btn-info"]';
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      await page.click(open),
    ]);
    use(newPage);
  },
  newWindowPage: async ({ page, context }, use) => {
    await page.goto("https://demo.automationtesting.in/Windows.html");
    let newSeperatewindow = '[href="#Seperate"]';
    await page.click(newSeperatewindow);
    let open = '[onclick="newwindow()"]';
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      await page.click(open),
    ]);
    use(newPage);
  },
  multipleWindowsPage: async ({ page, context }, use) => {
    await page.goto("https://demo.automationtesting.in/Windows.html");
    let multipleSeperatewindow = '[href="#Multiple"]';
    await page.click(multipleSeperatewindow);
    let open = '[onclick="multiwindow()"]';
    let windows: Page[] = [];
    context.on("page", async (newPage) => {
      newPage.waitForLoadState();
      windows.push(newPage);
    });
    await page.click(open);
    await page.waitForTimeout(3000);
    use(windows);
  },
});

windowHandling(
  "Playwright switching between tabs",
  async ({ page, newWindowPage }) => {
    await newWindowPage.close();
    await page.close();
  }
);

windowHandling(
  "Palywright multitabs handling",
  async ({ page, multipleWindowsPage }) => {
    for (const eachWindow of await multipleWindowsPage) {
      await eachWindow.bringToFront();
      await eachWindow.waitForTimeout(1000);
      console.log(await eachWindow.title());
      await eachWindow.close();
    }
    console.log(await page.title());
    await page.close();
  }
);
