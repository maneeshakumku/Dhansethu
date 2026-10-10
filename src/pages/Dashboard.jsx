export default function Dashboard() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>

      <div style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap"
      }}>
        <div style={{padding:"20px",border:"1px solid #ddd"}}>
          <h3>Balance</h3>
          <h2>₹14,019</h2>
        </div>

        <div style={{padding:"20px",border:"1px solid #ddd"}}>
          <h3>Income</h3>
          <h2>₹12,550</h2>
        </div>

        <div style={{padding:"20px",border:"1px solid #ddd"}}>
          <h3>Expense</h3>
          <h2>₹7,450</h2>
        </div>
      </div>
    </div>
  );
}