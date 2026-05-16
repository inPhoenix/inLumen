export function PatternFilters({ activePatterns, togglePattern, patterns }) {
  return (
    <div className="feed-controls">
      <span className="kbd-hint">Filter</span>
      {patterns.map((pattern) => (
        <button
          key={pattern.id}
          className={
            activePatterns.includes(pattern.id) ? "chip active" : "chip"
          }
          onClick={() => togglePattern(pattern.id)}
          style={{ "--h": pattern.hue }}
        >
          <span className="chip-dot" />
          {pattern.label}
          <span className="ct">{pattern.count}</span>
        </button>
      ))}
    </div>
  );
}
