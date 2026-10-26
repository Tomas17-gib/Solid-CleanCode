export class CheckoutService {
  #paymentMethod;
  #notifier;

  constructor({ paymentMethod, notifier }) {
    this.#paymentMethod = paymentMethod;
    this.#notifier = notifier;
  }

  checkout(cart, discount) {
    const subtotal = cart.calculateSubtotal();
    const discountAmount = discount.calculateDiscount(subtotal);
    const total = subtotal - discountAmount;
    const receipt = this.#paymentMethod.pay(total);
    this.#notifier.notify(`Pago recibido por ${total}`);
    return { subtotal, discountAmount, total, receipt };
  }
}
