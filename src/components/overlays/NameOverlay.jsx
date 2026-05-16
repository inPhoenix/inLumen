import { useState } from "react";
import { DATA } from "../../data";

export function NameOverlay({ currentName, onClose, onSave }) {
  const [draft, setDraft] = useState(currentName);

  function submit(event) {
    event.preventDefault();
    const nextName = draft.trim() || DATA.user.name;
    onSave(nextName);
  }

  return (
    <div className="overlay" onClick={onClose}>
      <section
        className="overlay-panel name-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="overlay-head">
          <div>
            <h2>Change journal name</h2>
            <p>This updates the greeting and persists in localStorage.</p>
          </div>
          <button
            className="overlay-close"
            onClick={onClose}
            aria-label="Close name editor"
          >
            ×
          </button>
        </div>
        <form className="overlay-body name-form" onSubmit={submit}>
          <label className="field-label">
            <span>Display name</span>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              autoFocus
            />
          </label>
          <div className="name-actions">
            <button type="button" className="btn ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn primary">
              Save name
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
