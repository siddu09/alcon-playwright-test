import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../hooks/world';
import { IndividualOrderPage } from '../../pages/order/individual-order.page';

Given('I open the MyAlcon Japan store login page', async function (this: CustomWorld) {
  const orderPage = new IndividualOrderPage(this.page);
  await orderPage.openJapanStore();
  await orderPage.acceptCookiesIfVisible();
  await orderPage.clickLoginFromHome();
});

When(
  'I login to MyAlcon with email {string} and password {string}',
  async function (this: CustomWorld, email: string, password: string) {
    const orderPage = new IndividualOrderPage(this.page);
    await orderPage.loginWith(email, password);
  }
);

When('I create a new individual order', async function (this: CustomWorld) {
  const orderPage = new IndividualOrderPage(this.page);
  await orderPage.openNewOrder();
  await orderPage.selectIndividualOrder();
});

When(
  'I select product {string} from Daily Contact Lenses',
  async function (this: CustomWorld, productName: string) {
    const orderPage = new IndividualOrderPage(this.page);
    await orderPage.selectProductByName(productName);
  }
);

When('I configure random lens values for both eyes', async function (this: CustomWorld) {
  const orderPage = new IndividualOrderPage(this.page);
  const selections = await orderPage.selectRandomLensValuesForBothEyes();
  this.testData['lensSelections'] = selections;
});

When('I select pack size as Trial 5', async function (this: CustomWorld) {
  const orderPage = new IndividualOrderPage(this.page);
  await orderPage.selectPackSizeTrial();
});

Then('Add to cart should be enabled', async function (this: CustomWorld) {
  const orderPage = new IndividualOrderPage(this.page);
  await expect(await orderPage.isAddToCartEnabled()).toBe(true);
});

When('I add configured product to cart', async function (this: CustomWorld) {
  const orderPage = new IndividualOrderPage(this.page);
  this.testData['cartCountBefore'] = await orderPage.getMiniCartCount();
  await orderPage.clickAddToCart();
});

When('I navigate to your cart from home header', async function (this: CustomWorld) {
  const orderPage = new IndividualOrderPage(this.page);
  await orderPage.openCartFromHomeHeader();
});

Then('I should see product {string} in cart', async function (
  this: CustomWorld,
  productName: string
) {
  const orderPage = new IndividualOrderPage(this.page);
  await orderPage.assertProductExistsInCart(productName);
});
