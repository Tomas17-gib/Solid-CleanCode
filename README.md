# Tienda SOLID

Proyecto de práctica de Clean Code y SOLID en JavaScript (Node + Express) con una interfaz web básica.

## Cómo ejecutarlo

    npm install
    node src/server.js

Abrir http://localhost:3000

## Dónde está cada principio

| Principio | Dónde se ve |
|---|---|
| SRP | `Product`, `Cart`, `CheckoutService` y cada descuento hacen una sola cosa |
| OCP | Un descuento o pago nuevo es un archivo nuevo más una línea en `DISCOUNTS` o `PAYMENTS` de `server.js` |
| LSP | Todos los descuentos y pagos son intercambiables; `Discount.calculateDiscount` garantiza un resultado válido |
| ISP | Contratos de un solo método: `PaymentMethod.pay` y `Notifier.notify` |
| DIP | `CheckoutService` recibe `paymentMethod` y `notifier` por constructor |

## Estructura

- `src/domain/`: lógica de negocio, sin Express ni HTML
- `src/errors/`: `ValidationError`
- `src/server.js`: traduce HTTP a llamadas al dominio
- `public/`: frontend

## Manejo de errores

Los datos inválidos lanzan `ValidationError` (respuesta 400 con mensaje). Los errores inesperados se registran y devuelven 500. Ningún error se oculta.
