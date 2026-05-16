import { DATA, NOTE_PACKS } from "../data";

export const patternById = Object.fromEntries(
  DATA.patterns.map((pattern) => [pattern.id, pattern]),
);
export const levelById = Object.fromEntries(
  DATA.levels.map((level) => [level.id, level]),
);

export function uniquePairs(pairs, max = 5) {
  const seen = new Set();
  return pairs
    .filter((pair) => {
      const key = pair.join("→");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, max);
}

export function collectCardNotes(phrase) {
  const packs = phrase.patterns.map((id) => NOTE_PACKS[id]).filter(Boolean);
  const primary = packs[0] || NOTE_PACKS.prompt;

  return {
    title: primary.title,
    mistakes: uniquePairs(
      packs.flatMap((pack) => pack.mistakes),
      6,
    ),
    examples: uniquePairs(
      [[phrase.raw, phrase.refined], ...packs.flatMap((pack) => pack.examples)],
      5,
    ),
    tips: [
      ...new Set([phrase.cue, ...packs.flatMap((pack) => pack.tips)]),
    ].slice(0, 5),
    drill: `Cover the refined line and rewrite this from memory: “${phrase.raw}”`,
  };
}

export function memoryClass(value) {
  if (value < 35) return "low";
  if (value < 70) return "mid";
  return "high";
}
