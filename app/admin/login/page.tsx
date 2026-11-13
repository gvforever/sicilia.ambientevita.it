import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE, adminHash, isAdmin } from '@/lib/admin';

export const dynamic = 'force-dynamic';

export default function Login({ searchParams }: { searchParams: { e?: string } }) {
  if (isAdmin()) redirect('/admin');
  async function login(fd: FormData) {
    'use server';
    const ok = !!process.env.ADMIN_TOKEN && String(fd.get('password') || '') === process.env.ADMIN_TOKEN;
    if (!ok) redirect('/admin/login?e=1');
    cookies().set(ADMIN_COOKIE, adminHash(), { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 });
    redirect('/admin');
  }
  return (
    <div className="adm-login">
      <img src="https://www.ambientevita.it/images/Logo_Ambiente_e_Vita.webp" alt="" style={{ height: 56 }} />
      <h1 style={{ fontSize: '1.8rem' }}>AmbienteVita Sicilia</h1>
      <p style={{ color: 'var(--muted)' }}>Espace administrateur</p>
      <form action={login}>
        <p><input name="password" type="password" placeholder="Mot de passe" required autoFocus /></p>
        {searchParams.e && <p style={{ color: '#b71c1c' }}>Mot de passe incorrect.</p>}
        <button className="btn green" style={{ width: '100%' }}>Se connecter</button>
      </form>
    </div>
  );
}
