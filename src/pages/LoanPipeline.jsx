export default function LoanPipeline() {
  const stages = [
    "Lead",
    "Customer",
    "KYC",
    "Loan",
    "Bank Login",
    "Sanction",
    "Disbursement",
  ];

  return (
    <div
      style={{
        padding: "30px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h1>Loan Pipeline</h1>

      <p>
        Track applications across the complete loan lifecycle.
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          marginTop: "30px",
        }}
      >
        {stages.map((stage) => (
          <div
            key={stage}
            style={{
              minWidth: "220px",
              background: "white",
              padding: "20px",
              borderRadius: "16px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h3>{stage}</h3>

            <div
              style={{
                marginTop: "15px",
                padding: "12px",
                background: "#e2e8f0",
                borderRadius: "8px",
              }}
            >
              Case #1001
            </div>

            <div
              style={{
                marginTop: "10px",
                padding: "12px",
                background: "#e2e8f0",
                borderRadius: "8px",
              }}
            >
              Case #1002
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}