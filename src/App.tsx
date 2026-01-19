import {ReactElement, useEffect, useState} from 'react';
import {sortAndFormat} from './sortJson';

const DEFAULT = `{
  "z": 1,
  "a": { "b": 2, "a": 1 }
}`;

export default function App(): ReactElement {
  const [input, setInput] = useState(DEFAULT);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const val = localStorage.getItem('theme');
      if (val === 'light') return 'light';
    } catch {}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const formatted = sortAndFormat(input);
        setOutput(formatted);
        setError(null);
      } catch (e: any) {
        setOutput('');
        setError(e.message ?? 'Invalid JSON');
      }
    }, 200);
    return () => clearTimeout(t);
  }, [input]);

  useEffect(() => {
    document.documentElement.classList.toggle('theme-light', theme === 'light');
    try {
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  async function handleCopy() {
    if (error || !output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }
  return (
    <main className="container">
      <header className="header">
        <div className="title-row">
          <img src="/favicon.png" alt="Sort JSON logo" className="site-logo" width="28" height="28" />
          <h1>Sort JSON</h1>
          <a
            className="github-link"
            href="https://github.com/ffflorian/sortjson.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            title="View source on GitHub"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 .297a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0012 .297z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
        <div className="controls">
          <button
            title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
            aria-pressed={theme === 'light'}
            className="icon-button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.8 1.8-1.8zM1 13h3v-2H1v2zm10 9h2v-3h-2v3zm7.03-2.03l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM17.24 4.84l1.79-1.79L17.24 1.26l-1.8 1.79 1.8 1.79zM20 11v2h3v-2h-3zM4.22 18.36l-1.79 1.79 1.79 1.79 1.79-1.79-1.79-1.79zM12 6a6 6 0 100 12 6 6 0 000-12z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        </div>
      </header>
      <section className="grid">
        <div className="pane">
          <label className="label" htmlFor="input-json">
            Input JSON
          </label>
          <textarea
            id="input-json"
            aria-label="Input JSON"
            className="input"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>
        <div className="pane output-pane">
          <div className="output-header">
            <label className="label" htmlFor="output-json">
              Sorted JSON output
            </label>
            <div className="output-actions">
              <button
                className="icon-button"
                onClick={handleCopy}
                title="Copy sorted JSON"
                aria-label="copy-output"
                disabled={!!error || !output}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path d="M16 1H4a2 2 0 00-2 2v12h2V3h12V1z" fill="currentColor" />
                  <path
                    d="M20 5H8a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2zm0 16H8V7h12v14z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              {copied && <span className="copied-badge">Copied</span>}
            </div>
          </div>
          <pre
            id="output-json"
            aria-label="Sorted JSON output"
            className="output"
            data-error={error ? 'true' : 'false'}
          >
            {error ? `Error: ${error}` : output}
          </pre>
        </div>
      </section>
    </main>
  );
}
