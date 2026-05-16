export function Sidebar({
  user,
  view,
  setView,
  counts,
  openDrift,
  levelFilter,
  setLevelFilter,
  masteredCount,
  levels,
  patterns,
  activePatterns,
  togglePattern,
  clearPatterns,
  collapsed,
  onToggleCollapse,
}) {
  const progress = Math.min(
    100,
    Math.round((user.refined / user.nextThreshold) * 100),
  );
  const remaining = user.nextThreshold - user.refined;
  const previewPatterns = patterns.slice(0, 6);
  const activePatternCount = activePatterns.length;

  function expandFromEmptySpace(event) {
    if (!collapsed || event.target.closest("button")) return;
    onToggleCollapse();
  }

  return (
    <aside
      className={`sidebar ${collapsed ? "is-collapsed" : ""}`}
      aria-label="Learning sidebar"
      onClick={expandFromEmptySpace}
    >
      <div className="sidebar-head">
        <div className="brand" aria-label="Lumen Refinery">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">
            lumen<span>.</span>
          </span>
          <span className="brand-tag">refinery</span>
        </div>
        <button
          className="sidebar-toggle"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <span className="sidebar-toggle-icon" aria-hidden="true">
            ‹
          </span>
        </button>
      </div>

      <section className="level-card" aria-label="Level progress">
        <div className="level-top">
          <div className="level-num">{user.level}</div>
          <div className="level-meta">
            <div className="level-name">{user.levelName}</div>
            <div className="level-sub">next · {user.nextLevelName}</div>
          </div>
        </div>
        <div className="level-bar" aria-hidden="true">
          <div className="level-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="level-counts">
          <span>{user.refined} refined</span>
          <span>{remaining} to go</span>
        </div>
      </section>

      <section className="stat-row" aria-label="Daily stats">
        <div className="stat">
          <div className="stat-val amber">
            <span className="stat-flame">✦</span>
            {user.streak}
          </div>
          <div className="stat-label">day streak</div>
        </div>
        <div className="stat">
          <div className="stat-val">
            {user.today.caught}/{user.goal}
          </div>
          <div className="stat-label">caught today</div>
        </div>
      </section>

      <nav className="nav" aria-label="Journal views">
        <div className="nav-label">Journal</div>
        <button
          className={view === "today" ? "active" : ""}
          onClick={() => setView("today")}
          title="Today's catch"
        >
          <span className="nav-code">T</span>
          <span className="dot" />
          <span className="nav-text">Today's catch</span>
          <span className="count">{counts.today}</span>
        </button>
        <button
          className={view === "all" ? "active" : ""}
          onClick={() => setView("all")}
          title="All phrases"
        >
          <span className="nav-code">A</span>
          <span className="dot" />
          <span className="nav-text">All phrases</span>
          <span className="count">{counts.all}</span>
        </button>
        <button
          className={view === "review" ? "active" : ""}
          onClick={() => setView("review")}
          title="Due to review"
        >
          <span className="nav-code">R</span>
          <span className="dot" />
          <span className="nav-text">Due to review</span>
          <span className="count">{counts.due}</span>
        </button>
        <button
          className={view === "mastered" ? "active" : ""}
          onClick={() => setView("mastered")}
          title="Mastered"
        >
          <span className="nav-code">M</span>
          <span className="dot" />
          <span className="nav-text">Mastered</span>
          <span className="count">{masteredCount}</span>
        </button>
      </nav>

      <section className="level-path" aria-label="Learning levels">
        <div className="nav-label">Levels</div>
        <button
          className={levelFilter === "all" ? "active" : ""}
          onClick={() => setLevelFilter("all")}
          title="All levels"
        >
          <span className="level-short">All</span>
          <span className="level-text">All levels</span>
        </button>
        {levels.map((level) => (
          <button
            key={level.id}
            className={levelFilter === level.id ? "active" : ""}
            onClick={() => setLevelFilter(level.id)}
            title={`${level.label}: ${level.name}`}
          >
            <span className="level-short">
              {level.label.replace("Level ", "L")}
            </span>
            <span className="level-text">{level.label}</span>
            <small>{level.name}</small>
          </button>
        ))}
      </section>

      <section className="pattern-panel" aria-label="Pattern filters">
        <div className="filter-head">
          <div className="nav-label">Patterns</div>
          {activePatternCount > 0 && (
            <button
              className="clear-patterns"
              onClick={clearPatterns}
              title="Clear pattern filters"
            >
              clear {activePatternCount}
            </button>
          )}
        </div>
        <div className="pattern-list">
          {patterns.map((pattern) => (
            <button
              key={pattern.id}
              className={
                activePatterns.includes(pattern.id)
                  ? "pattern-filter active"
                  : "pattern-filter"
              }
              onClick={() => togglePattern(pattern.id)}
              style={{ "--h": pattern.hue }}
              aria-pressed={activePatterns.includes(pattern.id)}
              title={pattern.label}
            >
              <span className="chip-dot" />
              <span className="pattern-name">{pattern.label}</span>
              <span className="ct">{pattern.count}</span>
            </button>
          ))}
        </div>
      </section>

      <button className="drift-mini" onClick={openDrift}>
        <div className="drift-mini-title">
          <span>Drift map</span>
          <span>open ↗</span>
        </div>
        <svg className="drift-mini-svg" viewBox="0 0 240 64" aria-hidden="true">
          {previewPatterns.map((pattern, index) => {
            const next = previewPatterns[(index + 1) % previewPatterns.length];
            return (
              <line
                key={`mini-line-${pattern.id}`}
                x1={pattern.x * 240}
                y1={pattern.y * 64}
                x2={next.x * 240}
                y2={next.y * 64}
                stroke="oklch(42% 0.02 60)"
                strokeWidth="0.6"
                opacity="0.45"
              />
            );
          })}
          {patterns.map((pattern) => (
            <circle
              key={pattern.id}
              cx={pattern.x * 240}
              cy={pattern.y * 64}
              r={Math.min(10, 3 + pattern.count * 0.22)}
              fill={`oklch(70% 0.13 ${pattern.hue})`}
              opacity="0.78"
            />
          ))}
        </svg>
        <div className="drift-mini-foot">
          {patterns.length} patterns drifting
        </div>
      </button>

      <section className="ritual-card">
        <div className="ritual-title">3-minute ritual</div>
        <ol>
          <li>Predict the trap.</li>
          <li>Reveal the repair.</li>
          <li>Name the rule.</li>
          <li>Reuse it once.</li>
        </ol>
      </section>
    </aside>
  );
}
