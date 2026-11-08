import { useState } from "react";
import Logo from "../Logo";

const NAVY = "#0a1f4d";
const GOLD = "#e3c15a";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const field = {
    width: "100%",
    padding: "12px",
    marginTop: "6px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    boxSizing: "border-box",
    fontSize: "16px",
  };
  const label = { display: "block", marginTop: "14px", fontWeight: 600, color: NAVY, fontSize: "14px" };

  const submit = (e) => {
    e.preventDefault();
    // TODO: send to a backend when one exists (demo only)
    setDone(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Inter, Arial, sans-serif",
        background: `linear-gradient(160deg, ${NAVY} 0%, #13307a 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={submit}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          padding: "32px",
          borderRadius: "16px",
          borderTop: `5px solid ${GOLD}`,
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          boxSizing: "border-box",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Logo variant="full" size={200} />
        </div>
        <h2 style={{ textAlign: "center", color: NAVY, margin: "0 0 4px" }}>Admin registration</h2>
        <p style={{ textAlign: "center", color: "#64748b", marginTop: 0 }}>Request access to the Dhan Setu portal</p>

        {done ? (
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <p style={{ color: "#166534", fontWeight: 600 }}>Request received for {form.name}.</p>
            <a href="#/login" style={{ color: NAVY, fontWeight: 600 }}>Go to sign in</a>
          </div>
        ) : (
          <>
            <label style={label}>Full name
              <input required placeholder="Enter your name" value={form.name} onChange={set("name")} style={field} />
            </label>
            <label style={label}>Email
              <input required type="email" placeholder="name@company.com" value={form.email} onChange={set("email")} style={field} />
            </label>
            <label style={label}>Phone
              <input required type="tel" placeholder="10-digit mobile number" value={form.phone} onChange={set("phone")} style={field} />
            </label>
            <label style={label}>Password
              <input required type="password" minLength={6} placeholder="At least 6 characters" value={form.password} onChange={set("password")} style={field} />
            </label>

            <button
              type="submit"
              style={{
                marginTop: "22px",
                width: "100%",
                background: NAVY,
                color: "white",
                padding: "13px",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Create account
            </button>

            <p style={{ textAlign: "center", marginBottom: 0 }}>
              <a href="#/login" style={{ color: NAVY }}>Already have an account?</a> ·{" "}
              <a href="#/" style={{ color: NAVY }}>Home</a>
            </p>
          </>
        )}
      </form>
    </div>
  );
}
