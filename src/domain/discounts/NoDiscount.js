import { Discount } from "./Discount.js";

export class NoDiscount extends Discount {
  computeAmount() {
    return 0;
  }
}
