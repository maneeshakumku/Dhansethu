import { page, card, badge } from "../ui";

export default function ModulePage({ title, summary, features, note }) {
  return (
    <div style={page}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        <h1 style={{ margin: 0 }}>{title}</h1>
        <span style={badge("#a8841a")}>Planned – next phase</span>
      </div>
      <p style={{ maxWidth: "700px", color: "#475569" }}>{summary}</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "16px", marginTop: "24px" }}>
        {features.map((f) => (
          <div key={f} style={{ ...card, borderLeft: "4px solid #e3c15a", padding: "16px 20px" }}>
            {f}
          </div>
        ))}
      </div>

      {note && (
        <p style={{ ...card, marginTop: "24px", background: "#fffbeb", color: "#78350f", maxWidth: "700px" }}>{note}</p>
      )}
    </div>
  );
}
