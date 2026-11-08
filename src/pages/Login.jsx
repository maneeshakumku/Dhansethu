import { useState } from "react";
import Logo from "../Logo";
import { loadUsers } from "../data";

const NAVY = "#0a1f4d";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const field = { width: "100%", padding: "12px", marginTop: "12px", border: "1px solid #cbd5e1", borderRadius: "8px", boxSizing: "border-box", fontSize: "16px" };

  const submit = (e) => {
    e.preventDefault();
    const u = loadUsers().find((x) => x.email.toLowerCase() === email.trim().toLowerCase() && x.password === password);
    if (!u) {
      setError("Email or password is incorrect. Check them and try again.");
      return;
    }
    if (u.active === false) {
      setError("This account is turned off. Please contact the Dhan Setu admin.");
      return;
    }
    const { password: _pw, ...safe } = u;
    onLogin(safe);
  };

  return (
    <div style={{ background: `linear-gradient(160deg, ${NAVY} 0%, #13307a 100%)`, minHeight: "100vh", padding: "20px", fontFamily: "Inter, Arial, sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form onSubmit={submit} style={{ width: "100%", maxWidth: "420px", background: "white", padding: "32px", borderRadius: "16px", borderTop: "5px solid #e3c15a", boxShadow: "0 10px 30px rgba(0,0,0,0.25)", boxSizing: "border-box" }}>
        <div style={{ textAlign: "center" }}><Logo variant="full" size={220} /></div>
        <h2 style={{ marginTop: 0, marginBottom: 4, textAlign: "center", color: NAVY }}>Staff sign in</h2>
        <p style={{ marginTop: 0, textAlign: "center", color: "#64748b", fontSize: "14px" }}>For Dhan Setu admins and employees</p>

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={field} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={field} />
        {error && <p role="alert" style={{ color: "#dc2626", marginBottom: 0 }}>{error}</p>}

        <button type="submit" style={{ marginTop: "20px", width: "100%", background: NAVY, color: "white", padding: "13px", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: 600, cursor: "pointer" }}>
          Sign in
        </button>
        <p style={{ textAlign: "center", marginBottom: 0 }}>
          <a href="#/register" style={{ color: NAVY }}>Create admin account</a> · <a href="#/" style={{ color: NAVY }}>Home</a>
        </p>
      </form>
    </div>
  );
}
