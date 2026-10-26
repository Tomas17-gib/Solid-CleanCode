import { PaymentMethod } from "./PaymentMethod.js";
import { ValidationError } from "../../errors/ValidationError.js";

export class CardPayment extends PaymentMethod {
  #cardHolder;

  constructor(cardHolder) {
    super();
    if (typeof cardHolder !== "string" || cardHolder.trim() === "") {
      throw new ValidationError("El titular de la tarjeta es obligatorio");
    }
    this.#cardHolder = cardHolder;
  }

  pay(amount) {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new ValidationError("El monto a pagar debe ser mayor a 0");
    }
    return { method: "card", holder: this.#cardHolder, amount };
  }
}
