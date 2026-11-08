import { useState } from "react";
import { dsas } from "../data";
import { page, card, input, th, td, badge } from "../ui";

const FILTERS = [["state", "State"], ["district", "District"], ["city", "City"], ["branch", "Branch"], ["bank", "Bank"], ["product", "Loan Product"]];

export default function DSACodes() {
  const [f, setF] = useState({ code: "", status: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const rows = dsas.filter(
    (r) =>
      FILTERS.every(([k]) => !f[k] || r[k] === f[k]) &&
      (!f.code || r.code.toLowerCase().includes(f.code.toLowerCase())) &&
      (!f.status || (f.status === "Active") === r.active)
  );

  return (
    <div style={page}>
      <h1>DSA Codes</h1>
      <p>Location and bank wise DSA master</p>

      <div style={{ ...card, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "12px" }}>
        {FILTERS.map(([k, label]) => (
          <select key={k} value={f[k] || ""} onChange={set(k)} style={input}>
            <option value="">{label}: All</option>
            {[...new Set(dsas.map((r) => r[k]))].map((v) => <option key={v}>{v}</option>)}
          </select>
        ))}
        <input placeholder="DSA Code" value={f.code} onChange={set("code")} style={input} />
        <select value={f.status} onChange={set("status")} style={input}>
          <option value="">Status: All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <div style={{ ...card, marginTop: "20px", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["DSA Code", "Name", "State", "District", "City", "Branch", "Bank", "Product", "Manager", "Status"].map((h) => <th key={h} style={th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.code}>
                <td style={td}><strong>{r.code}</strong></td>
                <td style={td}>{r.name}</td><td style={td}>{r.state}</td><td style={td}>{r.district}</td>
                <td style={td}>{r.city}</td><td style={td}>{r.branch}</td><td style={td}>{r.bank}</td>
                <td style={td}>{r.product}</td><td style={td}>{r.manager}</td>
                <td style={td}><span style={badge(r.active ? "#16a34a" : "#dc2626")}>{r.active ? "Active" : "Inactive"}</span></td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td style={td} colSpan={10}>No DSA matches these filters. Clear a filter to see more.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
