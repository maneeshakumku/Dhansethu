import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

function App() {
  const [page, setPage] = useState("home");

  const navButton = {
    background: "transparent",
    color: "white",
    border: "1px solid #374151",
    padding: "10px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  };

  const activeButton = {
    ...navButton,
    background: "#16a34a",
    border: "1px solid #16a34a",
    boxShadow: "0 4px 14px rgba(22,163,74,0.35)",
  };

  return (
    <div>
      <nav
        style={{
          background: "#0f172a",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h2
            style={{
              color: "white",
              margin: 0,
            }}
          >
            Dhan Setu
          </h2>

          <small
            style={{
              color: "#94a3b8",
            }}
          >
            Loan Services Platform
          </small>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button
            style={page === "home" ? activeButton : navButton}
            onClick={() => setPage("home")}
          >
            Home
          </button>

          <button
            style={page === "dashboard" ? activeButton : navButton}
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </button>

          <button
            style={page === "login" ? activeButton : navButton}
            onClick={() => setPage("login")}
          >
            CRM
          </button>

          <button
            style={page === "register" ? activeButton : navButton}
            onClick={() => setPage("register")}
          >
            Admin
          </button>

          <button
            style={page === "analytics" ? activeButton : navButton}
            onClick={() => setPage("analytics")}
          >
            Reports
          </button>
        </div>
      </nav>

      {page === "home" && <Home />}
      {page === "dashboard" && <Dashboard />}
      {page === "login" && <Login />}
      {page === "register" && <Register />}
      {page === "analytics" && <Analytics />}
    </div>
  );
}

export default App;