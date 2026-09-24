import { useEffect, useState } from 'react';

function buildApiUrl(path) {
  const configuredBase = import.meta.env.VITE_API_URL;

  if (configuredBase) {
    return `${configuredBase.replace(/\/$/, '')}${path}`;
  }

  if (typeof window === 'undefined') {
    return path;
  }

  return `${window.location.origin}${path}`;
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const contentType = response.headers.get('content-type') || '';
  const rawBody = await response.text();

  let payload = null;

  if (rawBody) {
    try {
      payload = contentType.includes('application/json') ? JSON.parse(rawBody) : rawBody;
    } catch {
      payload = rawBody;
    }
  }

  if (!response.ok) {
    const message = typeof payload === 'string' ? payload : payload?.error || `Request failed with ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

export default function AuthDemoPage() {
  const [mode, setMode] = useState('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await fetchJson(buildApiUrl('/api/auth'));
        if (!cancelled) {
          setUnlocked(true);
        }
      } catch {
        // no active session, stay on the login form
      } finally {
        if (!cancelled) {
          setCheckingSession(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError('');
    setNotice('');
  };

  const handleLogout = async () => {
    try {
      await fetchJson(buildApiUrl('/api/auth'), { method: 'DELETE' });
    } catch {
      // ignore network errors on logout, still clear local state
    }

    setUnlocked(false);
    setPassword('');
    setMode('login');
    setError('');
    setNotice('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setNotice('');
    setSubmitting(true);

    try {
      await fetchJson(buildApiUrl('/api/auth'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mode, email: email.trim(), password }),
      });

      if (mode === 'signup') {
        setNotice('Account created! Now log in below.');
        setPassword('');
        setMode('login');
      } else {
        setUnlocked(true);
      }
    } catch (submitError) {
      setError(submitError.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-demo-page">
      <section className="auth-demo-shell">
        <span className="eyebrow">Auth demo</span>
        <h1>Unlock a photo of Skye.</h1>
        <p>
          Auth demo! Create an account (any fake email and a simple
          password works), then log in to reveal a picture of my dog.
        </p>

        {checkingSession ? (
          <p className="auth-demo-notice">Checking session…</p>
        ) : !unlocked ? (
          <>
            <div className="auth-demo-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'signup'}
                className={`auth-demo-tab ${mode === 'signup' ? 'is-active' : ''}`}
                onClick={() => switchMode('signup')}
              >
                Create account
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'login'}
                className={`auth-demo-tab ${mode === 'login' ? 'is-active' : ''}`}
                onClick={() => switchMode('login')}
              >
                Log in
              </button>
            </div>

            <form className="auth-demo-form" onSubmit={handleSubmit}>
              <label htmlFor="auth-email">Email address</label>
              <input
                id="auth-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <label htmlFor="auth-password">Password</label>
              <input
                id="auth-password"
                type="password"
                required
                minLength={4}
                placeholder="Anything, it's just a demo"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <button type="submit" className="primary-btn" disabled={submitting}>
                {submitting
                  ? 'Please wait…'
                  : mode === 'signup'
                    ? 'Create account'
                    : 'Log in & unlock photo'}
              </button>
              {notice && <p className="auth-demo-notice">{notice}</p>}
              {error && <p className="auth-demo-error">{error}</p>}
            </form>
          </>
        ) : (
          <div className="auth-demo-reveal">
            <p className="auth-demo-success">Thanks! Here&apos;s Skye.</p>
            <img src="/assets/photos/Skye.png" alt="Skye the dog" />
            <button type="button" className="auth-demo-logout" onClick={handleLogout}>
              Log out
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
