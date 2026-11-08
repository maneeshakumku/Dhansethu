import { useState } from "react";

// Files in /public:  logo.png (full logo)  and  logo-mark.png (DS symbol)
// variant "mark": symbol on a white tile + company name (for dark navy bars)
// variant "full": the complete logo with name and tagline
export default function Logo({ variant = "mark", size = 44, dark = false }) {
  const [broken, setBroken] = useState(false);

  if (variant === "full") {
    return broken ? (
      <strong style={{ color: "#0a1f4d", fontSize: "22px" }}>DHAN SETU</strong>
    ) : (
      <img src="/logo.png" alt="Dhan Setu Loan Services Private Limited" style={{ width: size, maxWidth: "100%", height: "auto" }} onError={() => setBroken(true)} />
    );
  }

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
      <span style={{ background: "white", borderRadius: "10px", padding: "3px", display: "inline-flex" }}>
        {broken ? (
          <span style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#0a1f4d" }}>DS</span>
        ) : (
          <img src="/logo-mark.png" alt="Dhan Setu" style={{ height: size, width: "auto" }} onError={() => setBroken(true)} />
        )}
      </span>
      <span style={{ lineHeight: 1.1, color: dark ? "#0a1f4d" : "white" }}>
        <strong style={{ fontSize: "18px", letterSpacing: "1px" }}>DHAN <span style={{ color: "#e3c15a" }}>SETU</span></strong>
        <br />
        <small style={{ fontSize: "10px", opacity: 0.85 }}>LOAN SERVICES PVT LTD</small>
      </span>
    </span>
  );
}
