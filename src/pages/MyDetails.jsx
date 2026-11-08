import { customers, STAGES } from "../data";
import { page, card, th, td, badge, inr } from "../ui";

const NAVY = "#0a1f4d";
const mask = (m) => m.slice(0, 2) + "xxxxxx" + m.slice(-2);
const notice = { ...card, background: "#fffbeb", color: "#78350f", marginBottom: "20px" };

export default function MyDetails({ user }) {
  if (user.role === "dsa") {
    const leads = customers.filter((c) => c.dsa === user.dsaCode);
    return (
      <div style={{ ...page, minHeight: "auto" }}>
        <h1>My Leads</h1>
        <p style={notice}>You are signed in as DSA {user.dsaCode}. You can see only the leads linked to your code.</p>
        <div style={{ ...card, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>{["Customer", "Mobile", "Loan type", "Amount", "Stage"].map((h) => <th key={h} style={th}>{h}</th>)}</tr></thead>
            <tbody>
              {leads.map((c) => (
                <tr key={c.id}>
                  <td style={td}><strong>{c.name}</strong></td>
                  <td style={td}>{mask(c.mobile)}</td>
                  <td style={td}>{c.loanType}</td>
                  <td style={td}>{inr(c.amount)}</td>
                  <td style={td}><span style={badge("#2563eb")}>{c.status}</span></td>
                </tr>
              ))}
              {leads.length === 0 && <tr><td style={td} colSpan={5}>No leads are linked to your code yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const c = customers.find((x) => x.id === user.customerId);
  if (!c) return <div style={{ ...page, minHeight: "auto" }}><h1>My Application</h1><p>No application found for your account.</p></div>;

  const row = (k, v) => (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", padding: "10px 0", borderBottom: "1px solid #e2e8f0" }}>
      <span style={{ color: "#64748b" }}>{k}</span><strong style={{ textAlign: "right" }}>{v}</strong>
    </div>
  );

  return (
    <div style={{ ...page, minHeight: "auto" }}>
      <h1>My Application</h1>
      <p style={notice}>Welcome, {c.name}. You can see only your own application.</p>

      <div style={{ ...card, marginBottom: "20px" }}>
        <h3 style={{ marginTop: 0 }}>Loan progress</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {STAGES.map((s, i) => (
            <span key={s} style={{
              padding: "8px 14px", borderRadius: "999px", fontSize: "14px",
              background: i < c.stage ? "#dcfce7" : i === c.stage ? "#e3c15a" : "#e2e8f0",
              color: i === c.stage ? NAVY : i < c.stage ? "#166534" : "#64748b",
              fontWeight: i === c.stage ? 700 : 400,
            }}>
              {i < c.stage ? "Done: " : ""}{s}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "20px" }}>
        <div style={card}>
          <h3 style={{ marginTop: 0 }}>Application details</h3>
          {row("Application ID", c.id)}
          {row("Loan type", c.loanType)}
          {row("Loan amount", inr(c.amount))}
          {row("Bank", c.bank)}
          {row("Mobile", c.mobile)}
          {row("Email", c.email)}
          {row("Status", c.status)}
        </div>
        <div style={card}>
          <h3 style={{ marginTop: 0 }}>My documents</h3>
          {c.docs.map(([name, st]) => (
            <div key={name} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #e2e8f0" }}>
              <span>{name}</span>
              <span style={badge(st === "Verified" ? "#16a34a" : "#f97316")}>{st}</span>
            </div>
          ))}
          <p style={{ color: "#64748b", marginBottom: 0 }}>Questions? Call Dhan Setu on +91 6300988789.</p>
        </div>
      </div>
    </div>
  );
}
