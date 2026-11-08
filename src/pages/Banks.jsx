import { loadPolicies, dsas } from "../data";
import { page, card, th, td, badge } from "../ui";

export default function Banks() {
  const policies = loadPolicies();
  const names = [...new Set([...policies.map((p) => p.bank), ...dsas.map((d) => d.bank)])].sort();

  const rows = names.map((bank) => {
    const pol = policies.filter((p) => p.bank === bank);
    return {
      bank,
      products: [...new Set(pol.map((p) => p.product))].join(", ") || "–",
      policies: pol.filter((p) => p.active).length,
      dsas: dsas.filter((d) => d.bank === bank && d.active).length,
    };
  });

  return (
    <div style={page}>
      <h1>Banks</h1>
      <p>Partner banks with their active policies and DSA codes.</p>
      <div style={{ ...card, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["Bank", "Products", "Active policies", "Active DSA codes", "Status"].map((h) => <th key={h} style={th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.bank}>
                <td style={td}><strong>{r.bank}</strong></td>
                <td style={td}>{r.products}</td>
                <td style={td}>{r.policies}</td>
                <td style={td}>{r.dsas}</td>
                <td style={td}><span style={badge(r.policies ? "#16a34a" : "#64748b")}>{r.policies ? "Connected" : "No active policy"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
