const{test,expect} = require('@playwright/test');

test('Working on get by locator',async ({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.locator("select").selectOption("Female");;
    await page.getByLabel("Employed").click();
    await page.getByPlaceholder("Password").fill('Savi!23');
    await page.locator("xpath=//input[@name='email']").fill("test@example.com");
    await page.getByRole("button",{name:"Submit"});
    await page.getByText("Shop").click();
   await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole('button',{name:"Add"}).click();
  

})

