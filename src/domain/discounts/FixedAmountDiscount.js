import { Discount } from "./Discount.js";
import { ValidationError } from "../../errors/ValidationError.js";

export class FixedAmountDiscount extends Discount {
  #amount;

  constructor(amount) {
    super();
    if (!Number.isFinite(amount) || amount < 0) {
      throw new ValidationError("El monto debe ser un número mayor o igual a 0");
    }
    this.#amount = amount;
  }

  computeAmount() {
    return this.#amount;
  }
}
