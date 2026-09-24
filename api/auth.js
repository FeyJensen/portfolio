import { createAuthAccount, createSession, deleteSession, getSessionEmail, verifyAuthLogin } from './db.js';
import { clearSessionCookieHeader, parseCookies, sessionCookieHeader, SESSION_COOKIE_NAME } from './cookies.js';

export default async function handler(req, res) {
  const cookies = parseCookies(req);

  if (req.method === 'GET') {
    const email = await getSessionEmail(cookies[SESSION_COOKIE_NAME]);

    if (!email) {
      return res.status(401).json({ error: 'Not authenticated.' });
    }

    return res.status(200).json({ email });
  }

  if (req.method === 'DELETE') {
    await deleteSession(cookies[SESSION_COOKIE_NAME]);
    res.setHeader('Set-Cookie', clearSessionCookieHeader());
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const { mode, email, password } = req.body || {};

    if (mode === 'login') {
      const account = await verifyAuthLogin({ email, password });
      const { sessionId } = await createSession(account.email);
      res.setHeader('Set-Cookie', sessionCookieHeader(sessionId));
      return res.status(200).json(account);
    }

    const account = await createAuthAccount({ email, password });
    return res.status(201).json(account);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
