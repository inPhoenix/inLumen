export function LevelStrip({
  levelFilter,
  setLevelFilter,
  levels,
  totalPhraseCount,
}) {
  return (
    <section className="level-strip" aria-label="Syllabus levels">
      <button
        className={levelFilter === "all" ? "level-chip active" : "level-chip"}
        onClick={() => setLevelFilter("all")}
      >
        <span>All</span>
        <strong>Full path</strong>
        <small>{totalPhraseCount} cards</small>
      </button>
      {levels.map((level) => (
        <button
          key={level.id}
          className={
            levelFilter === level.id ? "level-chip active" : "level-chip"
          }
          onClick={() => setLevelFilter(level.id)}
        >
          <span>{level.label}</span>
          <strong>{level.name}</strong>
          <small>{level.short}</small>
        </button>
      ))}
    </section>
  );
}
