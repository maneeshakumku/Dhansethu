export const page = { padding: "30px", background: "#f8fafc", minHeight: "100vh", fontFamily: "Inter, Arial, sans-serif" };
export const card = { background: "white", padding: "20px", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" };
export const input = { padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "15px", width: "100%", boxSizing: "border-box" };
export const btn = (bg = "#0a1f4d") => ({ background: bg, color: "white", border: "none", padding: "10px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: 600 });
export const th = { textAlign: "left", padding: "10px", borderBottom: "2px solid #e2e8f0", background: "#f1f5f9", fontSize: "14px" };
export const td = { padding: "10px", borderBottom: "1px solid #e2e8f0", fontSize: "14px", verticalAlign: "top" };
export const badge = (c) => ({ background: c + "22", color: c, padding: "3px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: 700, whiteSpace: "nowrap" });
export const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");
