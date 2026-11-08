import { useState } from "react";
import { customers } from "../data";
import { page, card, th, td, badge, btn } from "../ui";
import MyDetails from "./MyDetails";

const STATUS_COLOR = { "KYC Pending": "#f97316", "Bank Login": "#2563eb", Sanctioned: "#16a34a" };

export default function Customers() {
  const [viewing, setViewing] = useState(null);

  return (
    <div style={page}>
      <h1>Customer Management</h1>
      <p>Manage customers and loan applications. Use "View as customer" to see exactly what that customer sees.</p>

      <div style={{ ...card, marginTop: "20px", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["ID", "Name", "Mobile", "Loan Type", "Status", ""].map((h) => <th key={h} style={th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td style={td}>{c.id}</td>
                <td style={td}><strong>{c.name}</strong></td>
                <td style={td}>{c.mobile}</td>
                <td style={td}>{c.loanType}</td>
                <td style={td}><span style={badge(STATUS_COLOR[c.status] || "#64748b")}>{c.status}</span></td>
                <td style={td}>
                  <button style={btn()} onClick={() => setViewing(viewing === c.id ? null : c.id)}>
                    {viewing === c.id ? "Close" : "View as customer"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewing && (
        <div style={{ border: "2px dashed #e3c15a", borderRadius: "16px", overflow: "hidden", marginTop: "24px" }}>
          <div style={{ background: "#fffbeb", color: "#78350f", padding: "8px 16px", fontWeight: 600 }}>
            Staff preview – read-only. Customers do not sign in to this portal.
          </div>
          <MyDetails user={{ role: "customer", customerId: viewing }} />
        </div>
      )}
    </div>
  );
}
