function todayStamp() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}

export function TopBar({
  user,
  openRefinery,
  openSearch,
  openNameEditor,
  whisper,
}) {
  return (
    <header className="topbar">
      <div className="greet">
        <div className="greet-date">{todayStamp()}</div>
        <h1 className="greet-line">
          Evening, {user.name}. You caught <em>{user.today.caught}</em> slips
          today — <span className="whisper-quote">{whisper}</span>
        </h1>
      </div>
      <div className="topbar-actions">
        <button className="btn ghost name-button" onClick={openNameEditor}>
          <span>Name: {user.name}</span>
          <span className="btn-kbd">edit</span>
        </button>
        <button className="btn ghost" onClick={openSearch}>
          <span>Search / Radar</span>
          <span className="btn-kbd">⌘K</span>
        </button>
        <button className="btn primary" onClick={() => openRefinery(null)}>
          Enter the Refinery <span className="btn-kbd">↵</span>
        </button>
      </div>
    </header>
  );
}
