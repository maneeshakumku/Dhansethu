import { useState } from "react";
import { loadUsers, saveUsers, customers, dsas } from "../data";
import { page, card, input, btn, th, td, badge } from "../ui";
import MyDetails from "./MyDetails";

const STAFF_ROLES = { admin: "Admin", employee: "Employee" };
const dsaCodes = [...new Set(dsas.map((d) => d.code))];
const blank = { name: "", email: "", password: "", role: "employee" };

export default function Admin({ user }) {
  const [users, setUsers] = useState(loadUsers);
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [kind, setKind] = useState("customer");
  const [pick, setPick] = useState({ customer: customers[0].id, dsa: dsaCodes[0] });

  const commit = (list) => { setUsers(list); saveUsers(list); };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = (e) => {
    e.preventDefault();
    const email = form.email.trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === email)) {
      setError("An account with this email already exists.");
      return;
    }
    commit([...users, { name: form.name.trim(), email, password: form.password, role: form.role, active: true }]);
    setForm(null);
    setError("");
  };
  const toggle = (u) => commit(users.map((x) => (x.email === u.email ? { ...x, active: !x.active } : x)));

  const previewUser = kind === "customer"
    ? { role: "customer", customerId: pick.customer }
    : { role: "dsa", dsaCode: pick.dsa };

  return (
    <div style={page}>
      <h1>Admin</h1>

      <h2>Staff sign-in accounts</h2>
      <p>People at Dhan Setu who can sign in to this portal. Admin sees everything; Employee sees the working pages only.</p>
      <button style={btn()} onClick={() => { setForm(blank); setError(""); }}>Add staff user</button>

      {form && (
        <form onSubmit={save} style={{ ...card, margin: "20px 0" }}>
          <h3 style={{ marginTop: 0 }}>New staff user</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "12px" }}>
            <label>Role
              <select value={form.role} onChange={set("role")} style={input}>
                {Object.entries(STAFF_ROLES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </label>
            <label>Full name<input required value={form.name} onChange={set("name")} style={input} /></label>
            <label>Email<input required type="email" value={form.email} onChange={set("email")} style={input} /></label>
            <label>Password<input required minLength={6} placeholder="At least 6 characters" value={form.password} onChange={set("password")} style={input} /></label>
          </div>
          {error && <p role="alert" style={{ color: "#dc2626" }}>{error}</p>}
          <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
            <button type="submit" style={btn()}>Create account</button>
            <button type="button" style={btn("#64748b")} onClick={() => setForm(null)}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ ...card, marginTop: "20px", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>{["Name", "Email", "Role", "Status", ""].map((h) => <th key={h} style={th}>{h}</th>)}</tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.email}>
                <td style={td}><strong>{u.name}</strong></td>
                <td style={td}>{u.email}</td>
                <td style={td}>{STAFF_ROLES[u.role]}</td>
                <td style={td}><span style={badge(u.active ? "#16a34a" : "#dc2626")}>{u.active ? "Active" : "Turned off"}</span></td>
                <td style={td}>
                  <button
                    disabled={u.email === user.email}
                    title={u.email === user.email ? "You cannot turn off your own account" : ""}
                    style={{ ...btn(u.active ? "#dc2626" : "#16a34a"), opacity: u.email === user.email ? 0.4 : 1 }}
                    onClick={() => toggle(u)}
                  >
                    {u.active ? "Turn off" : "Turn on"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: "40px" }}>Customer view preview</h2>
      <p>See exactly what one customer, or one DSA partner, would see: only their own details. Customers do not sign in to this portal.</p>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
        <select value={kind} onChange={(e) => setKind(e.target.value)} style={{ ...input, maxWidth: "220px" }}>
          <option value="customer">Customer</option>
          <option value="dsa">DSA partner</option>
        </select>
        {kind === "customer" ? (
          <select value={pick.customer} onChange={(e) => setPick({ ...pick, customer: e.target.value })} style={{ ...input, maxWidth: "300px" }}>
            {customers.map((c) => <option key={c.id} value={c.id}>{c.id} – {c.name}</option>)}
          </select>
        ) : (
          <select value={pick.dsa} onChange={(e) => setPick({ ...pick, dsa: e.target.value })} style={{ ...input, maxWidth: "300px" }}>
            {dsaCodes.map((c) => <option key={c}>{c}</option>)}
          </select>
        )}
      </div>

      <div style={{ border: "2px dashed #e3c15a", borderRadius: "16px", overflow: "hidden" }}>
        <div style={{ background: "#fffbeb", color: "#78350f", padding: "8px 16px", fontWeight: 600 }}>Preview only – read-only view</div>
        <div style={{ zoom: 0.95 }}>
          <MyDetails user={previewUser} />
        </div>
      </div>
    </div>
  );
}
