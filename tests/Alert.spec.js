import { test, expect } from '@playwright/test';
import { deserialize } from 'node:v8';

test('Alert', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await page.locator("#alertbtn").click();
  page.on("dialog",dialog=>dialog.accept());
  await page.locator("#confirmbtn").click();
  page.on("dialog",dialog=>dialog.dismiss());
  await page.locator("#mousehover").hover();
    const frame=await page.frame({name:"iframe-name"});
  await frame.getByRole("link", { name: "All Access Plan" }).click();
  await frame.locator(".text h2").first().waitFor();
 const name= await frame.locator(".text h2").textContent();
 console.log(name.split(" ")[1]);
});