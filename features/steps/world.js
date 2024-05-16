const { After, Before, setDefaultTimeout } = require('@cucumber/cucumber');
const { Browser, chromium, Page } = require('playwright');

let page;
let context;
let browser;

setDefaultTimeout(60000);

Before(async () => {
  try {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://www.demoblaze.com/");
    console.log("captured site title as", await page.title());
  } catch (error) {
    console.log("Chrome navigation to demo site failed due to", error);
    throw new Error("Chrome navigation to demo site failed due to", error);
  }
});

After(async () => {
  await browser.close();
});

// Exports remain the same
module.exports = { page, context, browser};
