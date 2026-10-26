import { ValidationError } from "../errors/ValidationError.js";

export class Product {
  constructor({ id, name, price }) {
    this.#validatePrice(price);
    this.id = id;
    this.name = name;
    this.price = price;
  }

  #validatePrice(price) {
    if (!Number.isFinite(price) || price < 0) {
      throw new ValidationError("El precio debe ser un número mayor o igual a 0");
    }
  }
}
