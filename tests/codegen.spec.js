import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
 
  await page.getByRole('textbox', { name: 'email@example.com' }).click();
  await page.getByRole('textbox', { name: 'email@example.com' }).fill('Savi321@gmail.com');
  await page.getByRole('textbox', { name: 'enter your passsword' }).click();
  await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Savitha!23');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: ' Add To Cart' }).first().click();
  await page.getByRole('button', { name: ' Add To Cart' }).nth(1).click();
  await page.getByRole('button', { name: '   Cart' }).click();
  await expect(page.locator('app-profile')).toContainText('ADIDAS ORIGINAL');
  await expect(page.locator('app-profile')).toContainText('ZARA COAT 3');
  await page.getByRole('button', { name: 'Checkout❯' }).click();
  await page.getByRole('textbox').first().click();
await page.getByRole('textbox').first().clear();
  await page.getByRole('textbox').first().fill('123456');
  await page.getByRole('combobox').first().selectOption('04');
  await page.locator('select').nth(1).selectOption('18');
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('122');
  await page.getByRole('textbox', { name: 'Select Country' }).click();
  await page.getByRole('textbox', { name: 'Select Country' }).pressSequentially("Ind");
  await page.locator('.ta-item').first().waitFor();
  const items = page.locator('.ta-item');
    const count = await items.count();
for (let i = 0; i < count; i++) {
  let text = (await items.nth(i).textContent()).trim();
  const eli=new RegExp("^[^a-zA-Z0-9]+");
    text = text.replace(eli, '');
  if (text==="India") {
    await items.nth(i).click();
    break;
  }
}  
  await page.getByText('Place Order').click();

});