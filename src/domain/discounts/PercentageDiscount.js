import { Discount } from "./Discount.js";
import { ValidationError } from "../../errors/ValidationError.js";

export class PercentageDiscount extends Discount {
  #percentage;

  constructor(percentage) {
    super();
    if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) {
      throw new ValidationError("El porcentaje debe ser un número entre 0 y 100");
    }
    this.#percentage = percentage;
  }

  computeAmount(subtotal) {
    return Math.round(subtotal * (this.#percentage / 100));
  }
}
