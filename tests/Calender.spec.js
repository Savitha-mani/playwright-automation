const{test,expect} = require("@playwright/test")

test('Calender filling',async ({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();
    const year="2027";
    const month="9";
    const day="6";
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
    const [newpage] = await Promise.all([
    context.waitForEvent("page"),
    page.getByText("Top Deals").click(),
  ]);
   await newpage.locator(".react-date-picker__calendar-button").click();
   await newpage.locator(".react-calendar__navigation__label__labelText").click();
    await newpage.locator(".react-calendar__navigation__label__labelText").click();
    await newpage.getByText(year).click();
    await newpage.locator(".react-calendar__tile").nth(Number(month)-1).click();
    await newpage.getByRole("button",{name:day}).first().click();


})