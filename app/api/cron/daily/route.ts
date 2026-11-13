import { runBirthdays, runRenewals } from '@/lib/automations';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get('authorization') !== `Bearer ${secret}`) return new Response('Unauthorized', { status: 401 });
  const birthdays = await runBirthdays();
  const renewals = await runRenewals();
  return Response.json({ birthdays, renewals });
}
