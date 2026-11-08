import { useState } from "react";
import { loadPolicies, PRODUCTS } from "../data";
import { page, card, input, btn, badge, inr } from "../ui";

// Assumed rate/tenure to estimate the EMI of the requested loan (demo only)
const emi = (P, rate = 9, years = 20) => {
  const r = rate / 1200, n = years * 12;
  return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
};
const today = () => new Date().toISOString().slice(0, 10);

function evaluate(p, c) {
  const checks = [];
  const add = (ok, soft, text) => checks.push({ ok, soft, text });

  add(c.cibil >= p.minCibil, c.cibil >= p.minCibil - 20, `CIBIL ${c.cibil} (policy minimum ${p.minCibil})`);
  add(c.income >= p.minIncome, c.income >= p.minIncome * 0.9, `Monthly income ${inr(c.income)} (policy minimum ${inr(p.minIncome)})`);

  const foir = ((c.existingEmi + emi(c.loan)) / c.income) * 100;
  add(foir <= p.maxFoir, foir <= p.maxFoir + 5, `FOIR ${foir.toFixed(0)}% (policy maximum ${p.maxFoir}%)`);

  if (p.maxLtv > 0 && c.propertyValue > 0) {
    const ltv = (c.loan / c.propertyValue) * 100;
    add(ltv <= p.maxLtv, ltv <= p.maxLtv + 5, `LTV ${ltv.toFixed(0)}% (policy maximum ${p.maxLtv}%)`);
  }
  add(c.loan >= p.minLoan && c.loan <= p.maxLoan, false, `Loan ${inr(c.loan)} (policy range ${inr(p.minLoan)} – ${inr(p.maxLoan)})`);
  add(p.locations.some((l) => l.toLowerCase() === c.city.trim().toLowerCase()), false, `Location ${c.city} (policy covers ${p.locations.join(", ")})`);

  const result = checks.every((x) => x.ok) ? "Recommended" : checks.every((x) => x.ok || x.soft) ? "Manual Review" : "Not Eligible";
  return { policy: p, checks, result };
}

const COLORS = { Recommended: "#16a34a", "Manual Review": "#f97316", "Not Eligible": "#dc2626" };
const ORDER = { Recommended: 0, "Manual Review": 1, "Not Eligible": 2 };

export default function Recommendation() {
  const [c, setC] = useState({ name: "Rajesh Kumar", product: "Home Loan", income: 85000, existingEmi: 8000, cibil: 745, loan: 4500000, propertyValue: 6000000, city: "Hyderabad" });
  const [results, setResults] = useState(null);
  const set = (k) => (e) => setC({ ...c, [k]: e.target.value });

  const run = (e) => {
    e.preventDefault();
    const cust = { ...c, income: +c.income, existingEmi: +c.existingEmi, cibil: +c.cibil, loan: +c.loan, propertyValue: +c.propertyValue };
    const list = loadPolicies()
      .filter((p) => p.active && p.product === c.product && p.effective <= today() && p.expiry >= today())
      .map((p) => evaluate(p, cust))
      .sort((a, b) => ORDER[a.result] - ORDER[b.result]);
    setResults(list);
  };

  const fields = [["name", "Customer name", "text"], ["income", "Monthly income (₹)", "number"], ["existingEmi", "Existing EMIs (₹/month)", "number"],
    ["cibil", "CIBIL score", "number"], ["loan", "Loan amount (₹)", "number"], ["propertyValue", "Property value (₹)", "number"], ["city", "City / location", "text"]];

  return (
    <div style={page}>
      <h1>Bank Recommendation</h1>
      <p>Enter the customer profile to see which bank policies match.</p>

      <form onSubmit={run} style={card}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "12px" }}>
          <label>Loan product
            <select value={c.product} onChange={set("product")} style={input}>{PRODUCTS.map((p) => <option key={p}>{p}</option>)}</select>
          </label>
          {fields.map(([k, label, type]) => (
            <label key={k}>{label}<input required type={type} value={c[k]} onChange={set(k)} style={input} /></label>
          ))}
        </div>
        <button type="submit" style={{ ...btn(), marginTop: "16px" }}>Check eligibility</button>
      </form>

      {results && (
        <div style={{ marginTop: "24px" }}>
          <h2>Results for {c.name}</h2>
          {results.length === 0 && <p>No active {c.product} policies are valid today. Add or activate one under Bank Policies.</p>}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "20px" }}>
            {results.map(({ policy, checks, result }) => (
              <div key={policy.id} style={{ ...card, borderTop: `5px solid ${COLORS[result]}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ margin: 0 }}>{policy.bank}</h3>
                  <span style={badge(COLORS[result])}>{result}</span>
                </div>
                <p style={{ color: "#64748b" }}>{policy.product} · TAT {policy.tat}</p>
                <ul style={{ paddingLeft: "18px", margin: 0 }}>
                  {checks.map((x, i) => (
                    <li key={i} style={{ marginBottom: "6px", color: x.ok ? "#166534" : x.soft ? "#c2410c" : "#b91c1c" }}>
                      {x.ok ? "Matches: " : x.soft ? "Close to limit: " : "Does not match: "}{x.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p style={{ color: "#64748b", marginTop: "20px" }}>
            EMI is estimated at 9% over 20 years. Final credit approval remains with the bank/NBFC or authorized credit team.
          </p>
        </div>
      )}
    </div>
  );
}
