export default function Dashboard() {
  const card = {
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    minWidth: "220px",
    flex: "1",
  };

  return (
    <div
      style={{
        background: "#f1f5f9",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1>Dhan Setu Business Portal</h1>
      <p>Loan Services Administration Dashboard</p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        <div style={card}>
          <h3>Total Leads</h3>
          <h1>1,250</h1>
        </div>

        <div style={card}>
          <h3>Active Customers</h3>
          <h1>820</h1>
        </div>

        <div style={card}>
          <h3>Loans Processed</h3>
          <h1>450</h1>
        </div>

        <div style={card}>
          <h3>Sanction Amount</h3>
          <h1>₹12.5 Cr</h1>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        <div style={card}>
          <h3>Employees</h3>
          <p>32 Active Employees</p>
        </div>

        <div style={card}>
          <h3>DSA Partners</h3>
          <p>85 Active DSAs</p>
        </div>

        <div style={card}>
          <h3>Bank Partners</h3>
          <p>14 Connected Banks</p>
        </div>

        <div style={card}>
          <h3>Pending Follow Ups</h3>
          <p>18 Cases</p>
        </div>
      </div>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          marginTop: "30px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Loan Processing Pipeline</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <div>Lead</div>
          <div>→</div>
          <div>Customer</div>
          <div>→</div>
          <div>KYC</div>
          <div>→</div>
          <div>Loan</div>
          <div>→</div>
          <div>Bank Login</div>
          <div>→</div>
          <div>Sanction</div>
          <div>→</div>
          <div>Disbursement</div>
        </div>
      </div>
    </div>
  );
}