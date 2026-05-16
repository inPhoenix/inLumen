import { collectCardNotes, levelById, patternById } from "../../utils/learning";
import { MemoryBar } from "./MemoryBar";

function renderSegments(parts, mode) {
  return parts.map((part, index) => {
    const cls =
      part.k === "del" ? "diff-del" : part.k === "ins" ? "diff-ins" : "";
    return (
      <span key={`${mode}-${index}`} className={cls}>
        {part.t}
      </span>
    );
  });
}

export function PhraseCard({
  phrase,
  expanded,
  onToggle,
  memory,
  onRemember,
  onPractice,
  onMaster,
  mastered,
  boosted,
}) {
  const level = levelById[phrase.level];
  const notes = collectCardNotes(phrase);
  const notesId = `notes-${phrase.id}`;

  return (
    <article
      className={`phrase-card ${expanded ? "expanded" : ""} ${phrase.hot ? "hot" : ""} ${
        boosted ? "shimmer" : ""
      } ${mastered ? "mastered" : ""}`}
    >
      <div className="card-head">
        <span>{phrase.caughtAt}</span>
        <span className="dot-sep">·</span>
        <span className="source">{phrase.source}</span>
        <span className="level-pill">{level.label}</span>
        {phrase.hot ? (
          <span className="hot-pill">RECURRING · {phrase.seen}×</span>
        ) : (
          <span className="seen-count">seen {phrase.seen}×</span>
        )}
      </div>

      <div className="phrase-block">
        <div className="phrase-wrong">
          {renderSegments(phrase.wrong, `${phrase.id}-wrong`)}
        </div>
        <div className="phrase-arrow">↓ refined</div>
        <div className="phrase-right">
          {renderSegments(phrase.right, `${phrase.id}-right`)}
        </div>
      </div>

      <div className="card-foot">
        {phrase.patterns.map((patternId) => {
          const pattern = patternById[patternId];
          return (
            <span
              key={patternId}
              className="tag"
              style={{ "--h": pattern.hue }}
            >
              <span className="tag-dot" />
              {pattern.label}
            </span>
          );
        })}
        <button
          className={`notes-toggle ${expanded ? "open" : ""}`}
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={notesId}
        >
          <span>Notes</span>
          <span className="notes-badge">{notes.mistakes.length}</span>
          <span className="chevron" aria-hidden="true">
            ⌄
          </span>
        </button>
        <MemoryBar value={memory} />
      </div>

      <div
        id={notesId}
        className={`notes-panel ${expanded ? "open" : ""}`}
        aria-hidden={!expanded}
      >
        <div className="notes-inner">
          <div className="lesson-note">
            <div className="lesson-label">why this slipped</div>
            <p>{phrase.why}</p>
            <div className="metacog-grid">
              <div>
                <span>metacognition cue</span>
                <strong>{phrase.cue}</strong>
              </div>
              <div>
                <span>reuse line</span>
                <strong>{phrase.reuse}</strong>
              </div>
            </div>
          </div>

          <div className="notes-deck">
            <section className="note-card note-card--wide">
              <div className="note-kicker">pattern notes</div>
              <h4>{notes.title}</h4>
              <ul className="tip-list">
                {notes.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </section>

            <section className="note-card">
              <div className="note-kicker">common mistakes</div>
              <div className="mini-pairs">
                {notes.mistakes.map(([bad, good]) => (
                  <div key={`${bad}-${good}`}>
                    <span>{bad}</span>
                    <strong>{good}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="note-card">
              <div className="note-kicker">more examples</div>
              <div className="example-list">
                {notes.examples.map(([bad, good]) => (
                  <div key={`${bad}-${good}`}>
                    <span>{bad}</span>
                    <strong>{good}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="note-card note-card--wide drill-note">
              <div className="note-kicker">micro-drill</div>
              <p>{notes.drill}</p>
            </section>
          </div>

          <div className="card-actions">
            <button
              className="btn btn-mini"
              onClick={() => onRemember(phrase.id)}
            >
              I remember it <span className="kbd-hint">+22 mem</span>
            </button>
            <button
              className="btn btn-mini"
              onClick={() => onPractice(phrase.id)}
            >
              Practice this <span className="kbd-hint">drill</span>
            </button>
            <button
              className={`btn btn-mini ${mastered ? "is-mastered" : ""}`}
              onClick={() => onMaster(phrase.id)}
            >
              {mastered ? "Undo mastered" : "Mark mastered"}{" "}
              <span className="kbd-hint">{mastered ? "↺" : "✓"}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
