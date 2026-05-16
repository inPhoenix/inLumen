import { useEffect, useMemo, useState } from "react";
import "./App.scss";
import {
  DriftOverlay,
  Feed,
  NameOverlay,
  RefineryOverlay,
  SearchOverlay,
  Sidebar,
  TopBar,
} from "./components";
import { STORAGE_KEYS } from "./constants/storageKeys";
import { DATA } from "./data";
import {
  safeLoadJSON,
  safeLoadString,
  safeSaveJSON,
  safeSaveString,
} from "./utils/storage";

function App() {
  const initialMemory = useMemo(() => {
    const fromStorage = safeLoadJSON(STORAGE_KEYS.memory, {});
    return DATA.phrases.reduce((acc, phrase) => {
      acc[phrase.id] =
        typeof fromStorage[phrase.id] === "number"
          ? fromStorage[phrase.id]
          : phrase.memory;
      return acc;
    }, {});
  }, []);

  const [view, setView] = useState("today");
  const [levelFilter, setLevelFilter] = useState("all");
  const [expanded, setExpanded] = useState("p-second-look");
  const [activePatterns, setActivePatterns] = useState([]);
  const [memoryMap, setMemoryMap] = useState(initialMemory);
  const [mastered, setMastered] = useState(
    () => new Set(safeLoadJSON(STORAGE_KEYS.mastered, [])),
  );
  const [preMasterMemory, setPreMasterMemory] = useState(() =>
    safeLoadJSON(STORAGE_KEYS.preMasterMemory, {}),
  );
  const [displayName, setDisplayName] = useState(() =>
    safeLoadString(STORAGE_KEYS.name, DATA.user.name),
  );
  const [boostedId, setBoostedId] = useState(null);
  const [driftOpen, setDriftOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [nameEditorOpen, setNameEditorOpen] = useState(false);
  const [refinerySeed, setRefinerySeed] = useState(null);

  useEffect(() => safeSaveJSON(STORAGE_KEYS.memory, memoryMap), [memoryMap]);
  useEffect(
    () => safeSaveJSON(STORAGE_KEYS.mastered, [...mastered]),
    [mastered],
  );
  useEffect(
    () => safeSaveJSON(STORAGE_KEYS.preMasterMemory, preMasterMemory),
    [preMasterMemory],
  );
  useEffect(
    () => safeSaveString(STORAGE_KEYS.name, displayName),
    [displayName],
  );

  useEffect(() => {
    const onKey = (event) => {
      const key = event.key.toLowerCase();
      const activeTag = document.activeElement?.tagName;
      const isTyping = activeTag === "INPUT" || activeTag === "TEXTAREA";

      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }

      if (
        event.key === "Enter" &&
        !isTyping &&
        !driftOpen &&
        !searchOpen &&
        !nameEditorOpen &&
        refinerySeed === null
      ) {
        setRefinerySeed("general");
      }

      if (event.key === "Escape") {
        setDriftOpen(false);
        setSearchOpen(false);
        setNameEditorOpen(false);
        setRefinerySeed(null);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [driftOpen, searchOpen, nameEditorOpen, refinerySeed]);

  const counts = useMemo(() => {
    return {
      today: DATA.phrases.filter((phrase) =>
        phrase.caughtAt.startsWith("Today"),
      ).length,
      all: DATA.phrases.length,
      due: DATA.phrases.filter(
        (phrase) =>
          (memoryMap[phrase.id] ?? phrase.memory) < 50 &&
          !mastered.has(phrase.id),
      ).length,
      mastered: DATA.phrases.filter(
        (phrase) =>
          mastered.has(phrase.id) ||
          (memoryMap[phrase.id] ?? phrase.memory) >= 92,
      ).length,
    };
  }, [memoryMap, mastered]);

  const visiblePhrases = useMemo(() => {
    let list = DATA.phrases;
    if (view === "today")
      list = list.filter((phrase) => phrase.caughtAt.startsWith("Today"));
    if (view === "review")
      list = list.filter(
        (phrase) =>
          (memoryMap[phrase.id] ?? phrase.memory) < 50 &&
          !mastered.has(phrase.id),
      );
    if (view === "mastered") {
      list = list.filter(
        (phrase) =>
          mastered.has(phrase.id) ||
          (memoryMap[phrase.id] ?? phrase.memory) >= 92,
      );
    }
    if (levelFilter !== "all")
      list = list.filter((phrase) => phrase.level === levelFilter);
    if (activePatterns.length)
      list = list.filter((phrase) =>
        phrase.patterns.some((id) => activePatterns.includes(id)),
      );
    return list;
  }, [view, levelFilter, activePatterns, memoryMap, mastered]);

  const whisper = useMemo(() => {
    const recurring = DATA.phrases
      .filter((phrase) => phrase.hot)
      .sort((a, b) => b.seen - a.seen)[0];
    return `“${recurring.raw.split(",")[0]}” returned ${recurring.seen}× — run the radar.`;
  }, []);

  function togglePattern(patternId) {
    setActivePatterns((current) =>
      current.includes(patternId)
        ? current.filter((id) => id !== patternId)
        : [...current, patternId],
    );
  }

  function restoreMemory(phraseId, amount = 22) {
    setMemoryMap((current) => ({
      ...current,
      [phraseId]: Math.min(100, (current[phraseId] ?? 0) + amount),
    }));
    setBoostedId(phraseId);
    window.setTimeout(() => setBoostedId(null), 760);
  }

  function toggleMastery(phraseId) {
    const phrase = DATA.phrases.find((item) => item.id === phraseId);
    if (!phrase) return;

    if (mastered.has(phraseId)) {
      setMastered((current) => {
        const next = new Set(current);
        next.delete(phraseId);
        return next;
      });
      const restoredMemory = preMasterMemory[phraseId] ?? phrase.memory;
      setMemoryMap((current) => ({ ...current, [phraseId]: restoredMemory }));
      setPreMasterMemory((current) => {
        const next = { ...current };
        delete next[phraseId];
        return next;
      });
    } else {
      const previousMemory = memoryMap[phraseId] ?? phrase.memory;
      setPreMasterMemory((current) => ({
        ...current,
        [phraseId]: previousMemory,
      }));
      setMastered((current) => new Set([...current, phraseId]));
      setMemoryMap((current) => ({ ...current, [phraseId]: 100 }));
    }

    setBoostedId(phraseId);
    window.setTimeout(() => setBoostedId(null), 760);
  }

  function openRefinery(phraseId) {
    setRefinerySeed(phraseId || "general");
  }

  function saveDisplayName(nextName) {
    setDisplayName(nextName);
    setNameEditorOpen(false);
  }

  function openPhraseFromSearch(phraseId) {
    setView("all");
    setLevelFilter("all");
    setActivePatterns([]);
    setExpanded(phraseId);
    setSearchOpen(false);
  }

  const userWithName = { ...DATA.user, name: displayName };

  return (
    <div className="app-shell">
      <Sidebar
        user={userWithName}
        view={view}
        setView={setView}
        counts={counts}
        openDrift={() => setDriftOpen(true)}
        levelFilter={levelFilter}
        setLevelFilter={setLevelFilter}
        masteredCount={counts.mastered}
        levels={DATA.levels}
        patterns={DATA.patterns}
      />
      <div className="main">
        <TopBar
          user={userWithName}
          openRefinery={openRefinery}
          openSearch={() => setSearchOpen(true)}
          openNameEditor={() => setNameEditorOpen(true)}
          whisper={whisper}
        />
        <Feed
          phrases={visiblePhrases}
          expanded={expanded}
          setExpanded={setExpanded}
          activePatterns={activePatterns}
          togglePattern={togglePattern}
          memoryMap={memoryMap}
          mastered={mastered}
          boostedId={boostedId}
          onRemember={restoreMemory}
          onPractice={openRefinery}
          onMaster={toggleMastery}
          levelFilter={levelFilter}
          setLevelFilter={setLevelFilter}
          levels={DATA.levels}
          patterns={DATA.patterns}
          totalPhraseCount={DATA.phrases.length}
        />
      </div>

      {driftOpen && <DriftOverlay onClose={() => setDriftOpen(false)} />}
      {searchOpen && (
        <SearchOverlay
          onClose={() => setSearchOpen(false)}
          onOpenPhrase={openPhraseFromSearch}
        />
      )}
      {nameEditorOpen && (
        <NameOverlay
          currentName={displayName}
          onClose={() => setNameEditorOpen(false)}
          onSave={saveDisplayName}
        />
      )}
      {refinerySeed !== null && (
        <RefineryOverlay
          key={refinerySeed}
          initialPhraseId={refinerySeed === "general" ? null : refinerySeed}
          onRestore={restoreMemory}
          onClose={() => setRefinerySeed(null)}
        />
      )}
    </div>
  );
}

export default App;
