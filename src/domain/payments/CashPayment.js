import { PaymentMethod } from "./PaymentMethod.js";
import { ValidationError } from "../../errors/ValidationError.js";

export class CashPayment extends PaymentMethod {
  pay(amount) {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new ValidationError("El monto a pagar debe ser mayor a 0");
    }
    return { method: "cash", amount };
  }
}
