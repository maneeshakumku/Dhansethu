import Logo from "../Logo";
export default function Home({ signedIn }) {
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
          background: "#0a1f4d",
          color: "white",
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Logo />

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {[
            ["CRM", "#/crm"],
            ["Loans", "#/loans"],
            ["Reports", "#/reports"],
          ].map(([label, href]) => (
            <a key={label} href={href} style={{ color: "white", textDecoration: "none" }}>
              {label}
            </a>
          ))}
          <a
            href={signedIn ? "#/dashboard" : "#/login"}
            style={{ color: "#e3c15a", textDecoration: "none", fontWeight: 600 }}
          >
            {signedIn ? "Dashboard" : "Staff Login"}
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(135deg,#0a1f4d,#13307a)",
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
          Bridging Your Financial Dreams
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
            onClick={() => (window.location.hash = "#/login")}
            style={{
              background: "#e3c15a",
              color: "#0a1f4d",
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
            onClick={() =>
              document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" })
            }
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
              <h2 style={{ color: "#a8841a" }}>
                {number}
              </h2>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="modules"
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
          background: "#0a1f4d",
          color: "white",
          textAlign: "center",
          padding: "30px",
        }}
      >
        <Logo size={44} />
        <p style={{ marginBottom: 4 }}>8-3-315/7/1, B R Raju Building, Maruthi Nagar, Yousufguda, Hyderabad, Telangana – 500045</p>
        <p style={{ margin: 4 }}>+91 6300988789 · dhansetuloanservicespvtltd@gmail.com</p>
        <p style={{ margin: 4, opacity: 0.7, fontSize: "13px" }}>
          Loan approval, interest rates and terms are subject to applicable lender eligibility and policies.
        </p>
      </footer>
    </div>
  );
}