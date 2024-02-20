import { BasketItem } from "@/types/basketItem";
import _restaurantData from "@/data/restaurant.json";

export function calculateTotalPrice(
  basketItems: BasketItem | Array<BasketItem>
) {
  let totalPrice = 0;

  let array = new Array<BasketItem>();
  Array.isArray(basketItems) ? (array = basketItems) : array.push(basketItems);

  array.forEach((basketItem) => {
    let itemPrice = 0;
    const product = Object.values(_restaurantData.menu.products).find(
      (product) => product.id == basketItem.productId
    );
    if (!product) {
      throw new Error("Could not find product in menu data");
    }

    const variant = product.variants.find(
      (variant) => variant.id == basketItem.variantId
    );
    if (!variant) {
      throw new Error("Could not find variant in menu data");
    }

    itemPrice = itemPrice + variant.prices.onsite;

    basketItem.optionIds.forEach((optionId) => {
      const option = Object.values(_restaurantData.menu.options).find(
        (option) => option.id == optionId
      );
      if (option) {
        itemPrice = itemPrice + option.prices.onsite;
      }
    });
    itemPrice = itemPrice * basketItem.amount;
    totalPrice = totalPrice + itemPrice;
  });

  return totalPrice;
}

export function calculateTotalItems(basketItems: Array<BasketItem>) {
  return basketItems.reduce((prev, current) => prev + current.amount, 0);
}
