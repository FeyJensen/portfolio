export const SESSION_COOKIE_NAME = 'skye_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60;

export function parseCookies(req) {
  const header = req.headers?.cookie || '';

  return header.split(';').reduce((cookies, part) => {
    const separatorIndex = part.indexOf('=');

    if (separatorIndex === -1) {
      return cookies;
    }

    const key = part.slice(0, separatorIndex).trim();
    const value = part.slice(separatorIndex + 1).trim();

    if (key) {
      cookies[key] = decodeURIComponent(value);
    }

    return cookies;
  }, {});
}

function serializeCookie(name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];

  parts.push(`Path=${options.path || '/'}`);
  parts.push('HttpOnly');
  parts.push(`SameSite=${options.sameSite || 'Lax'}`);

  if (options.maxAge != null) {
    parts.push(`Max-Age=${options.maxAge}`);
  }

  if (options.secure) {
    parts.push('Secure');
  }

  return parts.join('; ');
}

export function sessionCookieHeader(sessionId) {
  return serializeCookie(SESSION_COOKIE_NAME, sessionId, {
    maxAge: SESSION_MAX_AGE_SECONDS,
    secure: process.env.NODE_ENV === 'production',
  });
}

export function clearSessionCookieHeader() {
  return serializeCookie(SESSION_COOKIE_NAME, '', {
    maxAge: 0,
    secure: process.env.NODE_ENV === 'production',
  });
}
