import { useEffect, useState } from "react";
import { patternById } from "../../utils/learning";

export function RefineryOverlay({
  onClose,
  initialPhraseId,
  onRestore,
  drills,
  scopeLabel,
}) {
  const firstIndex = Math.max(
    0,
    drills.findIndex((drill) => drill.phraseId === initialPhraseId),
  );
  const [step, setStep] = useState(firstIndex);
  const [picked, setPicked] = useState(null);
  const [restored, setRestored] = useState(new Set());
  const drill = drills[step];
  const correct = drill && picked !== null && picked === drill.answer;

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Enter" && picked !== null) next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picked, step]);

  function choose(index) {
    if (!drill || picked !== null) return;
    setPicked(index);
    if (index === drill.answer && drill.phraseId && !restored.has(drill.id)) {
      setRestored((current) => new Set([...current, drill.id]));
      onRestore(drill.phraseId, 16);
    }
  }

  function next() {
    setPicked(null);
    setStep((current) => {
      if (current + 1 >= drills.length) {
        onClose();
        return current;
      }
      return current + 1;
    });
  }

  if (!drill) {
    return (
      <div className="overlay" onClick={onClose}>
        <section
          className="overlay-panel refinery-panel"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="overlay-head">
            <div>
              <h2>The Refinery</h2>
              <p>
                No drills are available for this focus yet.
                <span className="refinery-scope">Focus · {scopeLabel}</span>
              </p>
            </div>
            <button
              className="overlay-close"
              onClick={onClose}
              aria-label="Close refinery"
            >
              ×
            </button>
          </div>
          <div className="overlay-body refinery">
            <div className="empty-state">
              Choose another level or switch back to all levels to practice the
              full deck.
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="overlay" onClick={onClose}>
      <section
        className="overlay-panel refinery-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="overlay-head">
          <div>
            <h2>The Refinery</h2>
            <p>
              Practice resurfaces your own slips: predict first, then reveal.
              <span className="refinery-scope"> Focus · {scopeLabel}</span>
            </p>
          </div>
          <button
            className="overlay-close"
            onClick={onClose}
            aria-label="Close refinery"
          >
            ×
          </button>
        </div>
        <div className="overlay-body refinery">
          <div className="refinery-meta">
            <span>
              Drill {step + 1} of {drills.length}
            </span>
            <div className="refinery-dots">
              {drills.map((item, index) => (
                <span
                  key={item.id}
                  className={`d ${index < step ? "done" : ""} ${index === step ? "active" : ""}`}
                />
              ))}
            </div>
            <span>pattern · {patternById[drill.patternId].label}</span>
          </div>

          <div className="refinery-prompt">{drill.prompt}</div>
          <div className="refinery-sentence">
            {drill.sentence.map((piece, index) =>
              piece === "____" ? (
                <span
                  key={`blank-${index}`}
                  className={`refinery-blank ${picked !== null ? (correct ? "correct" : "wrong") : ""}`}
                >
                  {picked === null ? "____" : drill.options[picked]}
                </span>
              ) : (
                <span key={`piece-${index}`}>{piece}</span>
              ),
            )}
          </div>

          <div className="refinery-options">
            {drill.options.map((option, index) => {
              let optionClass = "";
              if (picked !== null) {
                if (index === drill.answer) optionClass = "correct";
                else if (index === picked) optionClass = "wrong";
                else optionClass = "faded";
              }
              return (
                <button
                  key={option}
                  className={`refinery-option ${optionClass}`}
                  onClick={() => choose(index)}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="refinery-foot">
            <div
              className={`refinery-feedback ${picked === null ? "" : correct ? "correct" : "wrong"}`}
            >
              {picked === null
                ? "Pick the version that sounds native."
                : correct
                  ? `Refined. ${drill.why}`
                  : `Not quite. ${drill.why}`}
            </div>
            <div className="spacer" />
            {picked !== null && (
              <button className="btn primary" onClick={next}>
                {step + 1 >= drills.length ? "Finish session" : "Next drill"} →
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
