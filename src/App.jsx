import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

function App() {
  const [page, setPage] = useState("home");

  const Home = () => (
    <div>
      <section
        style={{
          background: "#16a34a",
          color: "white",
          textAlign: "center",
          padding: "100px 20px",
        }}
      >
        <h1>DhanSethu</h1>
        <h2>Your Financial Bridge</h2>

        <p>
          Manage expenses, budgets, loans and savings from a single dashboard.
        </p>
      </section>
    </div>
  );

  return (
    <div>
      <nav
        style={{
          display: "flex",
          gap: "15px",
          padding: "15px",
          background: "#111827",
        }}
      >
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("login")}>Login</button>
        <button onClick={() => setPage("register")}>Register</button>
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("analytics")}>Analytics</button>
      </nav>

      {page === "home" && <Home />}
      {page === "login" && <Login />}
      {page === "register" && <Register />}
      {page === "dashboard" && <Dashboard />}
      {page === "analytics" && <Analytics />}
    </div>
  );
}

export default App;