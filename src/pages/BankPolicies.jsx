import { useState } from "react";
import { loadPolicies, savePolicies, PRODUCTS } from "../data";
import { page, card, input, btn, th, td, badge, inr } from "../ui";

const today = () => new Date().toISOString().slice(0, 10);
const NUM = ["minCibil", "minIncome", "maxFoir", "maxLtv", "minLoan", "maxLoan"];
const FIELDS = [
  ["bank", "Bank", "text"], ["minCibil", "Min CIBIL", "number"], ["minIncome", "Min monthly income (₹)", "number"],
  ["maxFoir", "Max FOIR (%)", "number"], ["maxLtv", "Max LTV (%) – 0 if not applicable", "number"],
  ["minLoan", "Min loan (₹)", "number"], ["maxLoan", "Max loan (₹)", "number"], ["tat", "TAT", "text"],
  ["locations", "Cities (comma separated)", "text"], ["effective", "Effective date", "date"], ["expiry", "Expiry date", "date"],
];
const blank = () => ({
  bank: "", product: "Home Loan", minCibil: 700, minIncome: 25000, maxFoir: 50, maxLtv: 80, minLoan: 500000,
  maxLoan: 10000000, tat: "7 days", locations: "Hyderabad, Vijayawada, Visakhapatnam", effective: today(), expiry: "2027-12-31",
});

export default function BankPolicies() {
  const [policies, setPolicies] = useState(loadPolicies);
  const [form, setForm] = useState(null);
  const [q, setQ] = useState("");

  const commit = (list) => { setPolicies(list); savePolicies(list); };

  const save = (e) => {
    e.preventDefault();
    const f = { ...form, locations: form.locations.split(",").map((s) => s.trim()).filter(Boolean) };
    NUM.forEach((k) => (f[k] = Number(f[k])));
    if (f.id) {
      commit(policies.map((p) => p.id === f.id
        ? { ...f, version: p.version + 1, history: [...p.history, `v${p.version + 1} edited on ${today()}`] } : p));
    } else {
      commit([...policies, { ...f, id: "POL" + Date.now(), version: 1, active: true, history: [`v1 created on ${today()}`] }]);
    }
    setForm(null);
  };

  const toggle = (p) =>
    commit(policies.map((x) => x.id === p.id
      ? { ...x, active: !x.active, history: [...x.history, `${x.active ? "Deactivated" : "Activated"} on ${today()}`] } : x));

  const shown = policies.filter((p) => (p.bank + p.product).toLowerCase().includes(q.toLowerCase()));

  return (
    <div style={page}>
      <h1>Bank Policies</h1>
      <p>Eligibility rules used by the Bank Recommendation engine. Every change is versioned and logged.</p>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
        <input placeholder="Search bank or product" value={q} onChange={(e) => setQ(e.target.value)} style={{ ...input, maxWidth: "280px" }} />
        <button style={btn()} onClick={() => setForm(blank())}>Add policy</button>
      </div>

      {form && (
        <form onSubmit={save} style={{ ...card, marginBottom: "20px" }}>
          <h3 style={{ marginTop: 0 }}>{form.id ? `Edit policy ${form.id}` : "New policy"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "12px" }}>
            <label>Product
              <select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} style={input}>
                {PRODUCTS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </label>
            {FIELDS.map(([k, label, type]) => (
              <label key={k}>{label}
                <input required type={type} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} style={input} />
              </label>
            ))}
          </div>
          <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
            <button type="submit" style={btn()}>Save policy</button>
            <button type="button" style={btn("#64748b")} onClick={() => setForm(null)}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ ...card, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["Bank", "Product", "Min CIBIL", "Min income", "Max FOIR", "Max LTV", "Loan range", "TAT", "Valid", "Version", "Status", ""].map((h) => <th key={h} style={th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {shown.map((p) => {
              const expired = p.expiry < today();
              return (
                <tr key={p.id}>
                  <td style={td}><strong>{p.bank}</strong></td>
                  <td style={td}>{p.product}</td>
                  <td style={td}>{p.minCibil}</td>
                  <td style={td}>{inr(p.minIncome)}</td>
                  <td style={td}>{p.maxFoir}%</td>
                  <td style={td}>{p.maxLtv ? p.maxLtv + "%" : "–"}</td>
                  <td style={td}>{inr(p.minLoan)} – {inr(p.maxLoan)}</td>
                  <td style={td}>{p.tat}</td>
                  <td style={td}>{p.effective} to {p.expiry}</td>
                  <td style={td}>
                    <details>
                      <summary>v{p.version}</summary>
                      {p.history.map((h, i) => <div key={i} style={{ fontSize: "12px" }}>{h}</div>)}
                    </details>
                  </td>
                  <td style={td}>
                    <span style={badge(expired ? "#f97316" : p.active ? "#16a34a" : "#dc2626")}>
                      {expired ? "Expired" : p.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ ...td, whiteSpace: "nowrap" }}>
                    <button style={btn("#2563eb")} onClick={() => setForm({ ...p, locations: p.locations.join(", ") })}>Edit</button>{" "}
                    <button style={btn(p.active ? "#dc2626" : "#16a34a")} onClick={() => toggle(p)}>{p.active ? "Deactivate" : "Activate"}</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
