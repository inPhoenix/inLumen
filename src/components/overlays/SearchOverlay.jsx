import { useEffect, useMemo, useState } from "react";
import { DATA, scannerRules } from "../../data";
import { patternById } from "../../utils/learning";

const DEFAULT_DRAFT =
  "Some examples contain specific URLs, so make them generic to avoid exposing sensitive information. Also turn abrupt feedback into a clear observation, need, and request.";

export function SearchOverlay({ onClose, onOpenPhrase }) {
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState(DEFAULT_DRAFT);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DATA.phrases.slice(0, 5);
    return DATA.phrases.filter((phrase) => {
      const haystack = [
        phrase.raw,
        phrase.refined,
        phrase.why,
        ...phrase.patterns.map((id) => patternById[id].label),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  const findings = useMemo(
    () => scannerRules.filter((rule) => rule.test.test(draft)),
    [draft],
  );

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <section
        className="overlay-panel search-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="overlay-head">
          <div>
            <h2>Search / 10-second radar</h2>
            <p>
              Find a past slip or scan a new sentence against your common traps.
            </p>
          </div>
          <button
            className="overlay-close"
            onClick={onClose}
            aria-label="Close search"
          >
            ×
          </button>
        </div>
        <div className="overlay-body search-grid">
          <div className="search-column">
            <label className="field-label">
              <span>Search the journal</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="preposition, avoid, prompt, meta tag..."
                autoFocus
              />
            </label>
            <div className="result-list">
              {matches.map((phrase) => (
                <button key={phrase.id} onClick={() => onOpenPhrase(phrase.id)}>
                  <span>{phrase.source}</span>
                  <strong>{phrase.refined}</strong>
                  <small>
                    {phrase.patterns
                      .map((id) => patternById[id].label)
                      .join(" · ")}
                  </small>
                </button>
              ))}
              {matches.length === 0 && (
                <p className="empty-mini">No matching slip found.</p>
              )}
            </div>
          </div>

          <div className="radar-column">
            <label className="field-label">
              <span>Draft radar</span>
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                rows={8}
              />
            </label>
            <div className="radar-output" aria-live="polite">
              <h3>Personal-pattern warnings</h3>
              {findings.length === 0 ? (
                <p>
                  No personal-pattern warnings found. Now check audience,
                  context, and confidence manually.
                </p>
              ) : (
                findings.map((finding) => (
                  <article key={finding.id}>
                    <strong>{finding.label}</strong>
                    <span>{finding.advice}</span>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
