export const PRODUCTS = ["Home Loan", "LAP", "Business Loan", "Personal Loan"];
const KEY = "dhansetu_policies";
const L = ["Hyderabad", "Secunderabad", "Vijayawada", "Visakhapatnam"];
const mk = (id, bank, product, minCibil, minIncome, maxFoir, maxLtv, minLoan, maxLoan, tat, locations = L) => ({
  id, bank, product, minCibil, minIncome, maxFoir, maxLtv, minLoan, maxLoan, tat, locations,
  effective: "2026-04-01", expiry: "2027-03-31", version: 1, active: true,
  history: ["v1 created on 2026-04-01"],
});

// Sample data for demo only – bank names are placeholders
const seed = [
  mk("POL001", "Bank A", "Home Loan", 700, 25000, 50, 80, 500000, 10000000, "7 days"),
  mk("POL002", "Bank B", "Home Loan", 725, 30000, 55, 85, 1000000, 20000000, "5 days"),
  mk("POL003", "Bank C", "Home Loan", 750, 40000, 50, 90, 2000000, 30000000, "10 days", ["Hyderabad", "Secunderabad"]),
  mk("POL004", "Bank B", "LAP", 700, 35000, 60, 65, 1000000, 15000000, "8 days"),
  mk("POL005", "Bank D", "LAP", 680, 30000, 55, 60, 500000, 10000000, "6 days"),
  mk("POL006", "Bank A", "Business Loan", 720, 40000, 55, 0, 500000, 5000000, "4 days"),
  mk("POL007", "Bank C", "Personal Loan", 740, 30000, 50, 0, 100000, 2500000, "2 days"),
];

export function loadPolicies() {
  try {
    const s = localStorage.getItem(KEY);
    if (s) return JSON.parse(s);
  } catch { /* storage unavailable */ }
  return seed;
}
export function savePolicies(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* ignore */ }
}

const d = (code, name, state, district, city, branch, bank, product, manager, active = true) =>
  ({ code, name, state, district, city, branch, bank, product, manager, active });
export const dsas = [
  d("DSA001", "Sample Associates", "Telangana", "Hyderabad", "Hyderabad", "Banjara Hills", "Bank A", "Home Loan", "Suresh"),
  d("DSA002", "Sample Finserv", "Andhra Pradesh", "NTR", "Vijayawada", "Benz Circle", "Bank B", "LAP", "Ramesh"),
  d("DSA003", "Sample Loans", "Telangana", "Rangareddy", "Secunderabad", "Begumpet", "Bank C", "Home Loan", "Suresh"),
  d("DSA004", "Sample Capital", "Andhra Pradesh", "Visakhapatnam", "Visakhapatnam", "Dwaraka Nagar", "Bank D", "LAP", "Lakshmi"),
  d("DSA005", "Sample Advisors", "Telangana", "Hyderabad", "Hyderabad", "Kukatpally", "Bank B", "Business Loan", "Suresh"),
  d("DSA006", "Sample Money", "Andhra Pradesh", "NTR", "Vijayawada", "Governorpet", "Bank A", "Personal Loan", "Ramesh", false),
  d("DSA007", "Sample Credit", "Telangana", "Hyderabad", "Hyderabad", "Madhapur", "Bank C", "Personal Loan", "Anita"),
  d("DSA008", "Sample Partners", "Andhra Pradesh", "Visakhapatnam", "Visakhapatnam", "MVP Colony", "Bank A", "Home Loan", "Lakshmi"),
];

export const STAGES = ["Lead", "Customer", "KYC", "Loan", "Bank Login", "Sanction", "Disbursement"];

// Sample customers (demo only)
export const customers = [
  { id: "CUST001", name: "Rajesh Kumar", mobile: "9876543210", email: "rajesh@example.com", loanType: "Home Loan", amount: 4500000, bank: "Bank A", stage: 2, status: "KYC Pending", dsa: "DSA001",
    docs: [["Aadhaar card", "Verified"], ["PAN card", "Verified"], ["Income proof", "Pending"]] },
  { id: "CUST002", name: "Anita Sharma", mobile: "9998887777", email: "anita@example.com", loanType: "LAP", amount: 6000000, bank: "Bank B", stage: 4, status: "Bank Login", dsa: "DSA002",
    docs: [["Aadhaar card", "Verified"], ["PAN card", "Verified"], ["Property papers", "Verified"]] },
  { id: "CUST003", name: "Vikram Reddy", mobile: "8887776665", email: "vikram@example.com", loanType: "Home Loan", amount: 5200000, bank: "Bank C", stage: 5, status: "Sanctioned", dsa: "DSA001",
    docs: [["Aadhaar card", "Verified"], ["PAN card", "Verified"], ["Income proof", "Verified"]] },
];

// DEMO STAFF LOGINS ONLY. Passwords in front-end code are not secure.
// Real sign-in must be checked on a server before this goes live.
export const users = [
  { email: "admin@dhansetu.com", password: "admin123", role: "admin", name: "Admin" },
  { email: "staff@dhansetu.com", password: "staff123", role: "employee", name: "Anil (Employee)" },
];
export const ROLE_LABEL = { admin: "Admin", employee: "Employee", customer: "Customer", dsa: "DSA partner" };

// Accounts are kept in the browser for the demo; the Admin page adds and turns them off.
const USERS_KEY = "dhansetu_users";
export function loadUsers() {
  try {
    const s = localStorage.getItem(USERS_KEY);
    if (s) return JSON.parse(s).filter((u) => u.role === "admin" || u.role === "employee");
  } catch { /* storage unavailable */ }
  return users.map((u) => ({ ...u, active: true }));
}
export function saveUsers(list) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(list)); } catch { /* ignore */ }
}
