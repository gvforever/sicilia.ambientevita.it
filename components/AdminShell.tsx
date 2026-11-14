import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE, requireAdmin } from '@/lib/admin';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  requireAdmin();
  async function logout() {
    'use server';
    cookies().delete(ADMIN_COOKIE);
    redirect('/admin/login');
  }
  return (<>
    <div className="adm-bar"><div className="container">
      <strong>AmbienteVita · Admin</strong>
      <Link href="/admin">Tableau de bord</Link>
      <Link href="/admin/messaggi">Messages</Link>
      <Link href="/admin/tessere">Cartes de membre</Link>
      <a href="/api/admin">Export dons (Excel)</a>
      <a href="/api/admin?t=contacts">Export messages</a>
      <Link href="/it" target="_blank">Voir le site</Link>
      <form action={logout}><button>Déconnexion</button></form>
    </div></div>
    <div className="container adm">{children}</div>
  </>);
}
