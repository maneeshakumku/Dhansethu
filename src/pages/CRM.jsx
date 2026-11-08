export default function CRM() {
  const customers = [
    {
      name: "Rajesh Kumar",
      mobile: "919876543210",
      status: "KYC Pending",
    },
    {
      name: "Anita Sharma",
      mobile: "919998887777",
      status: "Bank Login",
    },
    {
      name: "Vikram Reddy",
      mobile: "918888777666",
      status: "Sanctioned",
    },
  ];

  return (
    <div
      style={{
        padding: "30px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h1>CRM & Lead Management</h1>

      <p>Manage leads, customers and loan applications</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {customers.map((customer) => (
          <div
            key={customer.mobile}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h3>{customer.name}</h3>

            <p>
              <strong>Mobile:</strong> {customer.mobile}
            </p>

            <p>
              <strong>Status:</strong> {customer.status}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "15px",
              }}
            >
              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/${customer.mobile}`,
                    "_blank"
                  )
                }
                style={{
                  background: "#16a34a",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                WhatsApp
              </button>

              <button
                onClick={() =>
                  window.open(`tel:+${customer.mobile}`)
                }
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Call
              </button>

              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/${customer.mobile}?text=Hello ${customer.name}, regarding your loan application with Dhan Setu.`,
                    "_blank"
                  )
                }
                style={{
                  background: "#f97316",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Send Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}