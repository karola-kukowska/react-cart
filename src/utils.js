export const calculateCart = (cart) => {
  let totalAmount = 0;
  let totalPrice = 0;
  const cartArr = Array.from(cart.values());
  for (let { price, amount } of cartArr) {
    totalAmount += amount;
    totalPrice += amount * price;
  }
  totalPrice = totalPrice.toFixed(2);
  return { totalAmount, totalPrice };
};
