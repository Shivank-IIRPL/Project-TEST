import { useEffect, useState } from "react";

const API = "/api/orders";
const STATUSES = ["Pending", "Shipped", "Delivered"];

export default function App() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ customer: "", item: "", quantity: 1 });
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      const res = await fetch(API);
      setOrders(await res.json());
      setError("");
    } catch {
      setError("Cannot reach the backend. Is it running on port 5000?");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const addOrder = async (e) => {
    e.preventDefault();
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ customer: "", item: "", quantity: 1 });
      loadOrders();
    }
  };

  const updateStatus = async (id, status) => {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadOrders();
  };

  const deleteOrder = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadOrders();
  };

  return (
    <div className="container">
      <h1>Order List</h1>
      {error && <p className="error">{error}</p>}

      <form onSubmit={addOrder} className="form">
        <input
          placeholder="Customer name"
          value={form.customer}
          onChange={(e) => setForm({ ...form, customer: e.target.value })}
          required
        />
        <input
          placeholder="Item"
          value={form.item}
          onChange={(e) => setForm({ ...form, item: e.target.value })}
          required
        />
        <input
          type="number"
          min="1"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />
        <button type="submit">Add Order</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Item</th>
            <th>Qty</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.customer}</td>
              <td>{o.item}</td>
              <td>{o.quantity}</td>
              <td>
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o.id, e.target.value)}
                >
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </td>
              <td>
                <button className="delete" onClick={() => deleteOrder(o.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan="6">No orders yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
