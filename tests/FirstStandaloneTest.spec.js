const{test,expect} = require('@playwright/test')

test('Login with valid credentials',async ({page})=>{

   await page.goto("https://rahulshettyacademy.com/client");
   const username=page.locator("#userEmail");
   const password=page.locator("#userPassword");
   const login=page.locator("#login");
   const products=page.locator("div[class='card-body'] h5");
   await username.fill("Savi321@gmail.com");
   await password.fill("Savitha!23");
   await login.click();
   //console.log(await products.first().textContent());
   //await page.waitForLoadState('networkidle'); -> if it is not working
   await (products.first()).waitFor();
  console.log(await products.allTextContents()) ;

});