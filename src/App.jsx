function App() {
  return (
    <div>
      <section
        style={{
          background: "linear-gradient(135deg,#0f9d58,#34a853)",
          color: "white",
          textAlign: "center",
          padding: "100px 20px",
        }}
      >
        <h1 style={{ fontSize: "60px", marginBottom: "20px" }}>DhanSethu</h1>

        <p style={{ fontSize: "22px", marginBottom: "30px" }}>
          Your Financial Bridge
        </p>

        <button
          style={{
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Get Started
        </button>
      </section>

      <section
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          padding: "50px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ border: "1px solid #ddd", padding: "20px", width: "250px" }}>
          <h3>Expense Tracking</h3>
          <p>Track daily expenses effortlessly.</p>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "20px", width: "250px" }}>
          <h3>Budget Planning</h3>
          <p>Create monthly budgets and stay on target.</p>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "20px", width: "250px" }}>
          <h3>Analytics</h3>
          <p>Understand spending habits with insights.</p>
        </div>
      </section>
    </div>
  );
}

export default App;