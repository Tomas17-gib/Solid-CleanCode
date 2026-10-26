import { ValidationError } from "../../errors/ValidationError.js";

export class Discount {
  calculateDiscount(subtotal) {
    const amount = this.computeAmount(subtotal);
    if (!Number.isFinite(amount)) {
      throw new ValidationError("El descuento calculado no es un número válido");
    }
    return this.#clampBetween(amount, 0, subtotal);
  }

  #clampBetween(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  computeAmount(subtotal) {
    throw new Error("Cada descuento debe implementar computeAmount");
  }
}
