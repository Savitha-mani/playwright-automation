const { test, expect } = require('@playwright/test');

test('First Playwright Test - login incorrectly', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log("Page title:", await page.title());

    await page.locator("[name='username']").fill("rahul");
    await page.locator('#password').fill("Learning@830$3mK2");
    await page.locator('#signInBtn').click();

    // Assert error message
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
});

test('Fill the login correctly', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log("Page title:", await page.title());

    await page.locator("[name='username']").fill("rahulshettyacademy");
    await page.locator('#password').fill("Learning@830$3mK2");
    await page.locator('#signInBtn').click();

    // Wait for the next page to load fully
    await page.waitForLoadState('networkidle');

    const cardTitle = await page.locator(".card-title").first().textContent();
    console.log("Card title:", cardTitle);

    // Take a screenshot
    console.log("Taking screenshot...");
    await page.screenshot({ path: 'login-success.png', fullPage: true });
});


test('playwright dropdown and radio buttons',async ({page})=>{

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await page.locator("#username").fill("rahulshettyacademy ");
await page.locator("#password").fill("Learning@830$3mK2");
await page.locator("input[type='radio']").nth(1).click();
await page.locator("#okayBtn").click();
const dropdown=await page.locator("select.form-control");
dropdown.selectOption("consult");
//await page.locator("#terms").click();
await page.locator("#terms").uncheck();
await  expect(page.locator("input[type='radio']").last()).toBeChecked();
await expect( page.locator("#terms")).not.toBeChecked();

});


test('window handles',async ({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const link=page.locator("a[href*='documents-request']");
    await expect (link).toHaveAttribute("class","blinkingText");
    const[newPage]=await Promise.all(
        [
            context.waitForEvent('page'),
            link.click(),
        ]
    )
     const message=await newPage.locator(".red").textContent();
     const Arraytext= message.split("@");
    const domain=Arraytext[1];
    await page.locator("#username").fill(domain);
  console.log( await page.locator("#username").inputValue()) ;


});

