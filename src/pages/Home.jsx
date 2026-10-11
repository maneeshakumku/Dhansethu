export default function Home() {
  return (
    <div
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          background: "#0f172a",
          color: "white",
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <h2 style={{ margin: 0 }}>Dhan Setu</h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <span>CRM</span>
          <span>Loans</span>
          <span>Accounts</span>
          <span>Reports</span>
          <span>Admin</span>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(135deg,#0f172a,#16a34a)",
          color: "white",
          textAlign: "center",
          padding: "100px 20px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            marginBottom: "16px",
          }}
        >
          Dhan Setu
        </h1>

        <h2
          style={{
            fontSize: "clamp(1.2rem, 2vw, 2rem)",
            marginBottom: "20px",
          }}
        >
          Integrated Loan Services Platform
        </h2>

        <p
          style={{
            maxWidth: "800px",
            margin: "auto",
            lineHeight: "1.8",
            fontSize: "18px",
          }}
        >
          Manage Leads, Customers, KYC, Loans, HR,
          Accounts, Bank Policies and DSA Operations
          from one unified platform.
        </p>

        <div style={{ marginTop: "30px" }}>
          <button
            style={{
              background: "white",
              color: "#16a34a",
              border: "none",
              padding: "14px 28px",
              borderRadius: "10px",
              marginRight: "10px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Book Demo
          </button>

          <button
            style={{
              background: "transparent",
              color: "white",
              border: "2px solid white",
              padding: "14px 28px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Learn More
          </button>
        </div>
      </section>

      {/* KPI CARDS */}
      <section
        style={{
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          {[
            ["1250+", "Total Leads"],
            ["820+", "Customers"],
            ["450+", "Loans Processed"],
            ["₹12.5 Cr", "Disbursement Value"],
          ].map(([number, label]) => (
            <div
              key={label}
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "16px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h2 style={{ color: "#16a34a" }}>
                {number}
              </h2>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section
        style={{
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2>Platform Modules</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "20px",
            maxWidth: "1200px",
            margin: "40px auto",
          }}
        >
          {[
            "CRM & Lead Management",
            "Loan Processing",
            "Customer KYC",
            "HR & Payroll",
            "Accounts & Invoices",
            "Bank Policy Management",
            "DSA Management",
            "Business Reports",
          ].map((item) => (
            <div
              key={item}
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "16px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#0f172a",
          color: "white",
          textAlign: "center",
          padding: "30px",
        }}
      >
        <h3>Dhan Setu Loan Services</h3>
        <p>
          CRM • Loans • HR • Accounts • Reports
        </p>
      </footer>
    </div>
  );
}