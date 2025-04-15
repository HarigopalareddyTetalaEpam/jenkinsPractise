import { test } from "../fixtures/fixtures";
test.use({ headless: false });
test("custom base fixture", async ({ loginPage }) => {
  console.log(await loginPage.title());
  await loginPage.waitForTimeout(3000);
  await loginPage.close();
});
