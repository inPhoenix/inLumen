const VIEW_TABS = [
  { id: "today", label: "Today", countKey: "today" },
  { id: "all", label: "All", countKey: "all" },
  { id: "review", label: "Review", countKey: "due" },
  { id: "mastered", label: "Mastered", countKey: "mastered" },
];

export function MobileNav({
  user,
  view,
  setView,
  counts,
  levelFilter,
  setLevelFilter,
  levels,
}) {
  return (
    <header className="mobile-nav">
      <div className="mobile-brand">
        <span className="brand-mark" aria-hidden="true" />
        <span className="brand-name">
          lumen<span>.</span>
        </span>
        <span className="mobile-streak">✦ {user.streak} day streak</span>
      </div>
      <nav className="mobile-tabs" aria-label="Journal views">
        {VIEW_TABS.map((tab) => (
          <button
            key={tab.id}
            className={view === tab.id ? "active" : ""}
            onClick={() => setView(tab.id)}
          >
            <span>{tab.label}</span>
            <span className="ct">{counts[tab.countKey]}</span>
          </button>
        ))}
      </nav>
      <div className="mobile-levels" aria-label="Level filter">
        <button
          className={levelFilter === "all" ? "active" : ""}
          onClick={() => setLevelFilter("all")}
        >
          All levels
        </button>
        {levels.map((level) => (
          <button
            key={level.id}
            className={levelFilter === level.id ? "active" : ""}
            onClick={() => setLevelFilter(level.id)}
            title={`${level.label}: ${level.name}`}
          >
            {level.label.replace("Level ", "L")}
          </button>
        ))}
      </div>
    </header>
  );
}
