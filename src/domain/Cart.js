import { ValidationError } from "../errors/ValidationError.js";

export class Cart {
  #lines = new Map();

  addProduct(product, quantity = 1) {
    this.#validateQuantity(quantity);
    const currentQuantity = this.#quantityOf(product.id);
    this.#lines.set(product.id, { product, quantity: currentQuantity + quantity });
  }

  calculateSubtotal() {
    return this.lines.reduce(
      (total, { product, quantity }) => total + product.price * quantity,
      0
    );
  }

  get lines() {
    return [...this.#lines.values()];
  }

  #quantityOf(productId) {
    return this.#lines.get(productId)?.quantity ?? 0;
  }

  #validateQuantity(quantity) {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new ValidationError("La cantidad debe ser un entero positivo");
    }
  }
}
