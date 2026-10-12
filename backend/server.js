const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory order list (resets when the server restarts)
let orders = [
  { id: 1, customer: "Aman Singh", item: "Laptop", quantity: 1, status: "Pending" },
  { id: 2, customer: "Riya Sharma", item: "Keyboard", quantity: 2, status: "Shipped" },
];
let nextId = 3;

// Get all orders
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// Add an order
app.post("/api/orders", (req, res) => {
  const { customer, item, quantity } = req.body;
  if (!customer || !item || !quantity) {
    return res.status(400).json({ error: "customer, item and quantity are required" });
  }
  const order = {
    id: nextId++,
    customer,
    item,
    quantity: Number(quantity),
    status: "Pending",
  };
  orders.push(order);
  res.status(201).json(order);
});

// Update an order's status
app.patch("/api/orders/:id", (req, res) => {
  const order = orders.find((o) => o.id === Number(req.params.id));
  if (!order) return res.status(404).json({ error: "Order not found" });
  if (req.body.status) order.status = req.body.status;
  res.json(order);
});

// Delete an order
app.delete("/api/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!orders.some((o) => o.id === id)) {
    return res.status(404).json({ error: "Order not found" });
  }
  orders = orders.filter((o) => o.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
