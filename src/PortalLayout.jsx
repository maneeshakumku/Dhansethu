import Logo from "./Logo";
import { ROLE_LABEL } from "./data";

const css = `
.ds-shell{display:flex;min-height:100vh;font-family:Inter,Arial,sans-serif}
.ds-side{width:236px;flex-shrink:0;background:#0a1f4d;color:white;position:sticky;top:0;height:100vh;overflow-y:auto;display:flex;flex-direction:column;padding:16px 12px;box-sizing:border-box}
.ds-main{flex:1;min-width:0}
.ds-links{display:flex;flex-direction:column;gap:2px;margin:18px 0}
.ds-link{color:white;text-decoration:none;padding:9px 12px;border-radius:8px;font-size:15px}
.ds-link:hover{background:rgba(255,255,255,0.1)}
.ds-link.active{background:#e3c15a;color:#0a1f4d;font-weight:700}
.ds-out{margin-top:auto;background:transparent;color:white;border:1px solid #e3c15a;padding:10px;border-radius:8px;cursor:pointer}
@media (max-width:800px){
 .ds-shell{flex-direction:column}
 .ds-side{width:100%;height:auto;position:static}
 .ds-links{flex-direction:row;flex-wrap:wrap}
 .ds-out{margin-top:0}
}`;

export default function PortalLayout({ user, links, current, onLogout, children }) {
  return (
    <div className="ds-shell">
      <style>{css}</style>
      <aside className="ds-side">
        <a href="#/" style={{ textDecoration: "none" }}>
          <Logo size={40} />
        </a>
        <nav className="ds-links">
          {links.map((l) => (
            <a key={l.path} href={`#${l.path}`} className={"ds-link" + (current === l.path ? " active" : "")}>
              {l.label}
            </a>
          ))}
        </nav>
        {user && (
          <div style={{ margin: "12px 0 8px", fontSize: "13px" }}>
            <div style={{ fontWeight: 700 }}>{user.name}</div>
            <div style={{ color: "#e3c15a" }}>{ROLE_LABEL[user.role]}</div>
          </div>
        )}
        <button className="ds-out" onClick={onLogout}>Sign out</button>
      </aside>
      <main className="ds-main">{children}</main>
    </div>
  );
}
