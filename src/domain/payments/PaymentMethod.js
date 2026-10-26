export class PaymentMethod {
  pay(amount) {
    throw new Error("Cada método de pago debe implementar pay(amount)");
  }
}
