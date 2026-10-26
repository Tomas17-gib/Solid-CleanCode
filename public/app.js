const productsContainer = document.getElementById("products");
const messageElement = document.getElementById("message");
const resultElement = document.getElementById("result");

async function loadProducts() {
  const response = await fetch("/api/products");
  const products = await response.json();
  productsContainer.innerHTML = products.map(renderProduct).join("");
}

function renderProduct({ id, name, price }) {
  return `<div class="product">
    <span>${name} - $${price}</span>
    <input type="number" min="0" value="0" data-id="${id}">
  </div>`;
}

function readSelectedItems() {
  return [...productsContainer.querySelectorAll("input")]
    .map((input) => ({ id: Number(input.dataset.id), quantity: Number(input.value) }))
    .filter((item) => item.quantity > 0);
}

function buildRequestBody() {
  return {
    items: readSelectedItems(),
    discount: {
      type: document.getElementById("discountType").value,
      value: Number(document.getElementById("discountValue").value),
    },
    payment: {
      type: document.getElementById("paymentType").value,
      holder: document.getElementById("holder").value,
    },
  };
}

function showMessage(text, kind) {
  messageElement.textContent = text;
  messageElement.className = kind;
}

async function checkout() {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildRequestBody()),
  });
  const data = await response.json();
  if (!response.ok) {
    resultElement.textContent = "";
    return showMessage(data.error, "error");
  }
  showMessage(`Pago exitoso. Total: $${data.total}`, "ok");
  resultElement.textContent = JSON.stringify(data, null, 2);
}

document.getElementById("checkout").addEventListener("click", checkout);
loadProducts();
