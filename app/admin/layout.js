import '../globals.css';

export const metadata = {
  title: 'Admin Panel — Pettagama.lk',
  description: 'Admin dashboard for Pettagama.lk',
};

export default function AdminLayout({ children }) {
  return <div className="admin-layout">{children}</div>;
}
