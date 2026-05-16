import { useMemo } from "react";
import { PhraseCard } from "./PhraseCard";
import { StoryCallout } from "./StoryCallout";

export function Feed({
  phrases,
  expanded,
  setExpanded,
  memoryMap,
  mastered,
  boostedId,
  onRemember,
  onPractice,
  onMaster,
}) {
  const grouped = useMemo(() => {
    return phrases.reduce((acc, phrase) => {
      const key = phrase.caughtAt.split(" · ")[0];
      if (!acc[key]) acc[key] = [];
      acc[key].push(phrase);
      return acc;
    }, {});
  }, [phrases]);

  return (
    <main className="feed-area">
      <StoryCallout />

      {Object.entries(grouped).map(([day, list]) => (
        <section key={day} className="day-group">
          <div className="feed-sep">{day}</div>
          {list.map((phrase) => (
            <PhraseCard
              key={phrase.id}
              phrase={phrase}
              expanded={expanded === phrase.id}
              onToggle={() =>
                setExpanded(expanded === phrase.id ? null : phrase.id)
              }
              memory={memoryMap[phrase.id] ?? phrase.memory}
              onRemember={onRemember}
              onPractice={onPractice}
              onMaster={onMaster}
              mastered={mastered.has(phrase.id)}
              boosted={boostedId === phrase.id}
            />
          ))}
        </section>
      ))}

      {Object.keys(grouped).length === 0 && (
        <div className="empty-state">
          Nothing caught for that filter. A quiet kind of progress.
        </div>
      )}
    </main>
  );
}
