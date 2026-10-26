import express from "express";
import { Product } from "./domain/Product.js";
import { Cart } from "./domain/Cart.js";
import { CheckoutService } from "./domain/CheckoutService.js";
import { CardPayment } from "./domain/payments/CardPayment.js";
import { CashPayment } from "./domain/payments/CashPayment.js";
import { MemoryNotifier } from "./domain/notifications/MemoryNotifier.js";
import { PercentageDiscount } from "./domain/discounts/PercentageDiscount.js";
import { FixedAmountDiscount } from "./domain/discounts/FixedAmountDiscount.js";
import { NoDiscount } from "./domain/discounts/NoDiscount.js";
import { ValidationError } from "./errors/ValidationError.js";

const CATALOG = [
  { id: 1, name: "Balón", price: 50000 },
  { id: 2, name: "Guantes", price: 35000 },
  { id: 3, name: "Botines", price: 120000 },
];

const DISCOUNTS = {
  none: () => new NoDiscount(),
  percentage: (value) => new PercentageDiscount(value),
  fixed: (value) => new FixedAmountDiscount(value),
};

const PAYMENTS = {
  card: (holder) => new CardPayment(holder),
  cash: () => new CashPayment(),
};

const notifier = new MemoryNotifier();
const app = express();
app.use(express.json());
app.use(express.static("public"));

app.get("/api/products", (req, res) => res.json(CATALOG));

app.post("/api/checkout", (req, res, next) => {
  try {
    const { items, discount, payment } = req.body;
    const cart = buildCart(items);
    const service = new CheckoutService({
      paymentMethod: createFrom(PAYMENTS, payment.type, payment.holder),
      notifier,
    });
    const discountToApply = createFrom(DISCOUNTS, discount.type, discount.value);
    res.json(service.checkout(cart, discountToApply));
  } catch (error) {
    next(error);
  }
});

app.get("/api/notifications", (req, res) => res.json(notifier.messages));

app.use((error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res.status(400).json({ error: error.message });
  }
  console.error(error);
  res.status(500).json({ error: "Error interno del servidor" });
});

function buildCart(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new ValidationError("El carrito no puede estar vacío");
  }
  const cart = new Cart();
  items.forEach(({ id, quantity }) => cart.addProduct(findProduct(id), quantity));
  return cart;
}

function findProduct(id) {
  const data = CATALOG.find((product) => product.id === id);
  if (!data) throw new ValidationError(`Producto inexistente: ${id}`);
  return new Product(data);
}

function createFrom(factories, type, argument) {
  const factory = factories[type];
  if (!factory) throw new ValidationError(`Opción no soportada: ${type}`);
  return factory(argument);
}

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
