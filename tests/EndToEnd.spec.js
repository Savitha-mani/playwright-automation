const { test, expect } = require('@playwright/test');

test.skip('place order and fetch order details', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const country = "India";
    let list = ['ADIDAS ORIGINAL', 'ZARA COAT 3'];

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("Savi321@gmail.com");
    await page.locator("#userPassword").fill("Savitha!23");
    await page.getByRole("button",{name:"Login"}).click();

    //await page.locator(".card-body").first().waitFor();
    //const products = await page.locator(".card-body");

    /*for (let i = 0; i < await products.count(); i++) {
        const prod = await products.nth(i);
        try {
            const productName = await prod.locator("h5").textContent();
            if (list.includes(productName.trim())) {
                await prod.locator(".fa-shopping-cart").click();
                console.log("product added", productName);
            }
        } catch (error) {
            console.log(`Error handling product at index ${i}:`, error.message);
        }
    }*/
   for(const ProductNames of list){

    await page.locator(".card-body").filter({hasText:ProductNames}).getByRole("button",{name:"Add To Cart"}).click()
   };

    const carticon = page.locator("button[routerlink='/dashboard/cart']");
    await carticon.click();
    //await page.locator(".cartSection").first().waitFor();
    //const allItemsInCart = await page.locator(".cartSection h3").allTextContents();
    console.log(allItemsInCart);
    expect(allItemsInCart.sort()).toEqual(list.sort());

    await page.locator("button:has-text('Checkout')").click();

    await page.locator(".input.txt").nth(0).clear();
    await page.locator("input.txt").nth(0).fill("73902353058093");
    await page.locator(".input.txt").nth(1).fill("311");

    await page.locator(".input.ddl").nth(0).selectOption({ label: '02' });
    await page.locator(".input.ddl").nth(1).selectOption({ label: '17' });

    await page.locator(".user__name.mt-5 input").nth(0).clear();
    await page.locator(".user__name.mt-5 input").nth(0).fill("jagananbu2@gmail.com");
    await page.locator(".user__name.mt-5 input").nth(1).pressSequentially("Ind");

    const dropDown = await page.locator(".ta-results");
    await dropDown.waitFor();
    const countryButtons = dropDown.locator("button");
    await countryButtons.first().waitFor();

    for (let i = 0; i < await countryButtons.count(); i++) {
        const countryDesired = countryButtons.nth(i);
        try {
            const countryName = (await countryDesired.textContent()).trim().toLowerCase();
            if (countryName === country.trim().toLowerCase()) {
                console.log(countryName);
                await countryDesired.click();
            }
        } catch (error) {
            console.log(`Error handling countryName Handling ${i}:`, error.message);
        }
    }

    await page.locator(".action__submit").click();

    const actualText = await page.locator(".hero-primary").textContent();
    console.log("Actual text:", `"${actualText}"`);
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order.");

    const orderpage = page.locator(".ng-star-inserted");
    await orderpage.first().waitFor();
    const orderelements = orderpage.locator("tr td label");
    await orderelements.first().waitFor();

    let firstTwoOrders = [];
    for (let i = 1; i < await orderelements.count(); i++) {
        const ordernumbers = orderelements.nth(i);
        const orderlist = await ordernumbers.allTextContents();
        const cleanorderlist = orderlist.filter(text => text).join('').replace(/\|/g, '').trim();
        firstTwoOrders.push(cleanorderlist);
    }
    console.log(firstTwoOrders);

    const orderIcon = page.locator("button[routerlink$='/dashboard/myorders']");
    await orderIcon.click();

    const orderRows = page.locator(".table tbody tr");
    await orderRows.first().waitFor();

    const rowCount = await orderRows.count();
    for (let i = 0; i < rowCount; i++) {
        const row = orderRows.nth(i);
        const orderids = (await row.locator("th").allTextContents())
            .map(t => t.trim())
            .filter(t => t);
        for (const orderid of firstTwoOrders) {
            for (const order of orderids) {
                if (orderid === order) {
                    const view = await row.getByRole("button", { name: 'view' });
                    await view.click();
                    break;
                }
            }

        }

    }

});