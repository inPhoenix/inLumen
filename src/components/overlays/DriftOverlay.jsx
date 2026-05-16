import { useState } from "react";
import { DATA } from "../../data";
import { patternById } from "../../utils/learning";

export function DriftOverlay({ onClose }) {
  const [active, setActive] = useState(DATA.patterns[0].id);
  const activePattern = patternById[active];
  const related = DATA.phrases.filter((phrase) =>
    phrase.patterns.includes(active),
  );

  return (
    <div className="overlay" onClick={onClose}>
      <section
        className="overlay-panel drift-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="overlay-head">
          <div>
            <h2>The drift map</h2>
            <p>
              Each orb is a recurring pattern. Bigger means it has appeared more
              often in your English.
            </p>
          </div>
          <button
            className="overlay-close"
            onClick={onClose}
            aria-label="Close drift map"
          >
            ×
          </button>
        </div>
        <div className="overlay-body drift-layout">
          <div className="drift-map">
            <svg aria-hidden="true">
              {DATA.patterns.map((pattern, index) =>
                DATA.patterns.slice(index + 1).map((other) => {
                  const distance = Math.hypot(
                    pattern.x - other.x,
                    pattern.y - other.y,
                  );
                  if (distance > 0.43) return null;
                  return (
                    <line
                      key={`${pattern.id}-${other.id}`}
                      x1={`${pattern.x * 100}%`}
                      y1={`${pattern.y * 100}%`}
                      x2={`${other.x * 100}%`}
                      y2={`${other.y * 100}%`}
                      stroke="oklch(40% 0.02 60)"
                      strokeWidth="0.6"
                      opacity="0.45"
                    />
                  );
                }),
              )}
            </svg>
            {DATA.patterns.map((pattern) => {
              const size = 26 + pattern.count * 1.55;
              return (
                <button
                  key={pattern.id}
                  className="drift-cluster"
                  style={{
                    left: `${pattern.x * 100}%`,
                    top: `${pattern.y * 100}%`,
                    "--h": pattern.hue,
                  }}
                  onClick={() => setActive(pattern.id)}
                >
                  <span
                    className={`drift-orb ${active === pattern.id ? "active" : ""}`}
                    style={{ width: size, height: size }}
                  />
                  <span className="drift-label">
                    {pattern.label}
                    <small>{pattern.count} slips</small>
                  </span>
                </button>
              );
            })}
          </div>
          <aside className="drift-detail" style={{ "--h": activePattern.hue }}>
            <span className="detail-kicker">active pattern</span>
            <h3>{activePattern.label}</h3>
            <p>{activePattern.cue}</p>
            <div className="detail-rule">
              <span>next learning move</span>
              <strong>{activePattern.move}</strong>
            </div>
            <div className="detail-list">
              {related.slice(0, 4).map((phrase) => (
                <div key={phrase.id}>
                  <span>{phrase.source}</span>
                  <p>{phrase.refined}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
