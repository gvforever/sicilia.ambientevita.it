export const metadata = { title: 'Admin — AmbienteVita Sicilia', robots: { index: false, follow: false } };
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin">{children}</div>;
}
