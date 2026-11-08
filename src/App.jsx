import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CRM from "./pages/CRM";
import Customers from "./pages/Customers";
import LoanPipeline from "./pages/LoanPipeline";
import Analytics from "./pages/Analytics";
import BankPolicies from "./pages/BankPolicies";
import Recommendation from "./pages/Recommendation";
import DSACodes from "./pages/DSACodes";
import Banks from "./pages/Banks";
import Admin from "./pages/Admin";
import ModulePage from "./pages/ModulePage";
import PortalLayout from "./PortalLayout";

// Menu follows the client's final portal menu, in the same order
const PORTAL = {
  "/dashboard": { label: "Dashboard", el: <Dashboard /> },
  "/hr": {
    label: "HR",
    el: <ModulePage title="HR" summary="Employee records, attendance and leave in one place."
      features={["Employee login and employee master", "Attendance and leave management", "Payslips and HR reports", "Employee documents and role-based access"]} />,
  },
  "/pf": {
    label: "PF",
    el: <ModulePage title="PF" summary="Provident fund records for every employee."
      features={["PF details", "Contribution tracking", "PF history"]} />,
  },
  "/esi": {
    label: "ESI",
    el: <ModulePage title="ESI" summary="Employee State Insurance records for every employee."
      features={["ESI details", "Contribution tracking", "ESI history"]} />,
  },
  "/payroll": {
    label: "Payroll",
    el: <ModulePage title="Payroll" summary="Monthly salary processing linked to attendance, PF and ESI."
      features={["Payroll processing", "Payslip generation", "PF and ESI deductions", "Payroll reports"]} />,
  },
  "/crm": { label: "CRM", el: <CRM /> },
  "/customers": { label: "Customers", el: <Customers /> },
  "/loans": { label: "Loans", el: <LoanPipeline /> },
  "/accounts": {
    label: "Accounts",
    el: <ModulePage title="Accounts" summary="Money in and out, with receivables and payables."
      features={["Bank payouts", "Expenses", "Receivables and payables", "Commission and payment status", "Monthly accounts and MIS reports"]} />,
  },
  "/invoice": {
    label: "Invoice",
    el: <ModulePage title="Invoice" summary="Invoices for customers and DSA partners."
      features={["Customer invoices", "DSA invoices", "Invoice PDF generation", "Payment status"]} />,
  },
  "/banks": { label: "Banks", el: <Banks /> },
  "/policies": { label: "Bank Policies", el: <BankPolicies /> },
  "/recommendation": { label: "Bank Recommendation", el: <Recommendation /> },
  "/dsa": { label: "DSA Codes", el: <DSACodes /> },
  "/map": {
    label: "Location/Map",
    el: <ModulePage title="Location/Map" summary="Field team visits and customer locations on a map."
      features={["Current/field location", "Check-in and check-out location", "Customer visit location", "Route/map view", "Geo-tagged visit and daily visit history", "Employee-wise field activity", "Location-based lead/customer view"]}
      note="Location tracking requires appropriate employee consent, access controls and compliance with applicable privacy and employment requirements." />,
  },
  "/reports": { label: "Reports", el: <Analytics /> },
  "/admin": {
    label: "Admin",
    el: <ModulePage title="Admin" summary="Users, roles and system settings."
      features={["User management", "Role-based access", "Audit trail", "Portal settings"]} />,
  },
};

// Which pages each staff role may open
const ACCESS = {
  admin: "all",
  employee: ["/dashboard", "/crm", "/customers", "/loans", "/banks", "/recommendation", "/dsa", "/reports"],
};
const getRoute = () => window.location.hash.replace("#", "") || "/";
const readUser = () => {
  try { return JSON.parse(sessionStorage.getItem("dhansetu_user")); } catch { return null; }
};

export default function App() {
  const [route, setRoute] = useState(getRoute());
  const [user, setUser] = useState(readUser);

  useEffect(() => {
    const onHash = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (path) => { window.location.hash = path; };
  const login = (u) => {
    sessionStorage.setItem("dhansetu_user", JSON.stringify(u));
    setUser(u);
    go("/dashboard");
  };
  const logout = () => {
    sessionStorage.removeItem("dhansetu_user");
    setUser(null);
    go("/");
  };

  const routes = { ...PORTAL, "/admin": { label: "Admin", el: <Admin user={user} /> } };
  const allowed = (path) =>
    !!user && ACCESS[user.role] && (ACCESS[user.role] === "all" || ACCESS[user.role].includes(path));

  useEffect(() => {
    if (user && routes[route] && !allowed(route)) go("/dashboard");
  });

  if (route === "/login") return <Login onLogin={login} />;
  if (route === "/register") return <Register />;

  if (routes[route]) {
    if (!user) return <Login onLogin={login} />;
    const current = allowed(route) ? route : "/dashboard";
    const links = Object.entries(routes).filter(([p]) => allowed(p)).map(([path, v]) => ({ path, label: v.label }));
    return (
      <PortalLayout user={user} current={current} links={links} onLogout={logout}>
        {routes[current].el}
      </PortalLayout>
    );
  }

  return <Home signedIn={!!user} />;
}
