/**
 * Lumen Refinery — standalone learning data.
 *
 * This file is the content engine for the React app. A future human or AI editor
 * should be able to update the learning deck without opening App.js.
 *
 * PUBLIC CONTRACT — keep these exports:
 *   - DATA: user stats, levels, pattern metadata, phrase cards, and drills.
 *   - NOTE_PACKS: expandable Notes content for each pattern/card category.
 *   - scannerRules: regex-based hints used by the Radar/search input.
 *
 * HOW THE APP CONSUMES THIS FILE:
 *   1. DATA.levels builds the sidebar level/progress language.
 *   2. DATA.patterns builds filter chips and the Drift Map.
 *      - id must be stable.
 *      - level must match one DATA.levels id.
 *      - x/y are 0–1 map coordinates.
 *      - hue controls the orb/tag color.
 *      - count controls orb size and should roughly match card frequency.
 *   3. DATA.phrases builds the cards.
 *      - wrong/right are generated arrays of { t, k } where k is "same", "del", or "ins".
 *      - raw/refined are plain strings used by search, drills, and accessibility.
 *      - patterns must point to ids in DATA.patterns and NOTE_PACKS.
 *      - memory is 0–100; low memory creates stronger review urgency.
 *      - hot marks recurring/high-priority cards.
 *   4. NOTE_PACKS[patternId] powers the Notes button on cards.
 *      - mistakes: short before/after pairs.
 *      - examples: reusable tutor-style examples.
 *      - tips: compact rules the learner can apply before sending.
 *   5. scannerRules are lightweight pattern detectors, not a grammar checker.
 *
 * EDITING RULES FOR HUMANS OR AI:
 *   - Update CARD_BLUEPRINTS, not DATA.phrases directly.
 *   - For each card, keep id, level, source, raw, refined, patterns, why, cue, reuse, bad, good.
 *   - bad must appear in raw; good must appear in refined. The helper turns them into red/amber diff segments.
 *   - Focus on the sentence being improved, not on the wrapper used to request correction.
 *   - Keep examples generic: no real domains, customer names, private channels, credentials, or internal codenames.
 *   - Do not treat British vs American spelling variants as mistakes.
 *   - Prefer high-frequency tutor examples: present perfect, auxiliaries, articles, preposition chunks,
 *     -ing patterns, countability, concise work updates, small talk, and NVC.
 */

const segmentAround = (text, needle, kind) => {
  if (!needle) return [{ t: text, k: "same" }];
  const start = text.indexOf(needle);

  if (start === -1) return [{ t: text, k: "same" }];

  return [
    { t: text.slice(0, start), k: "same" },
    { t: needle, k: kind },
    { t: text.slice(start + needle.length), k: "same" },
  ].filter((part) => part.t);
};

const deckLabelByLevel = {
  "level-1": "Grammar deck",
  "level-2": "Workplace deck",
  "level-3": "Conversation deck",
  "level-4": "NVC deck",
};

const makePhrase = (card, index) => {
  const { bad, good, memory, seen, hot, caughtAt, ...rest } = card;

  return {
    ...rest,
    caughtAt:
      caughtAt ||
      `${deckLabelByLevel[card.level] || "Learning deck"} · ${String(index + 1).padStart(3, "0")}`,
    wrong: segmentAround(card.raw, bad || card.raw, "del"),
    right: segmentAround(card.refined, good || card.refined, "ins"),
    memory: memory ?? Math.max(18, 92 - ((index * 7) % 78)),
    seen: seen ?? (1 + (index % 6)),
    ...(hot ? { hot: true } : {}),
  };
};

const DATA_META = {
  "version": "v6-300-card-tutor-data",
  "audience": "English learner who writes technical/workplace messages and wants common small talk + nonviolent communication practice.",
  "designIntent": "A 300-card, generic, tutor-style deck. It avoids private project details and avoids treating correction prompts as language mistakes.",
  "aiUpdateGuide": [
    "Keep exports unchanged: DATA, NOTE_PACKS, scannerRules.",
    "Add or edit cards in CARD_BLUEPRINTS, not in DATA.phrases directly.",
    "Each card needs id, level, source, raw, refined, patterns, why, cue, reuse, bad, and good.",
    "bad must appear in raw; good must appear in refined. The helper turns those substrings into red/amber diff segments.",
    "patterns must match ids in DATA.patterns and NOTE_PACKS.",
    "Avoid real domains, customer names, private channels, internal codenames, and references to the correction tool.",
    "Prefer high-frequency examples a language tutor would teach: present perfect, auxiliaries, articles, preposition chunks, -ing patterns, countability, tone, small talk, and NVC."
  ],
  "commonMistakeClusters": [
    "Verb-form control: have + participle, auxiliary + base verb, question order.",
    "Portuguese-to-English transfer: preposition chunks, collocations, count/mass nouns, article decisions.",
    "Workplace clarity: concise status updates, evidence-based tone, exact technical naming.",
    "Conversation comfort: openers, follow-ups, remote-call microphrases, graceful exits.",
    "Conflict language: observation, feeling, need, request, boundary, repair."
  ],
  "researchBasis": [
    "Cambridge learner-error categories: common mistakes, prepositions, countability, word choice, word order, and word patterns.",
    "British Council grammar guidance: present perfect, auxiliary/base verb behavior, and verbs followed by -ing forms.",
    "Purdue OWL punctuation guidance: comma splices and independent-clause bridges.",
    "Conversation research and teaching: follow-up questions, open-ended prompts, and lightweight small talk.",
    "NVC guidance: observations, feelings, needs, requests, boundaries, and repair language."
  ],
  "cardCount": 300,
  "addedInThisVersion": 200,
  "finalLevelDistribution": {
    "level-1": 75,
    "level-3": 75,
    "level-2": 75,
    "level-4": 75
  }
};

const USER = {
  "name": "Phoenix",
  "level": 7,
  "levelName": "Observer",
  "nextLevelName": "Curator",
  "refined": 428,
  "nextThreshold": 500,
  "streak": 12,
  "goal": 16,
  "today": {
    "caught": 16,
    "refined": 12,
    "reviewed": 14
  }
};

const LEVELS = [
  {
    "id": "level-1",
    "label": "Level 1",
    "name": "Grammar foundation",
    "short": "Verb forms, articles, prepositions",
    "promise": "Build the automatic checks tutors use before polishing style."
  },
  {
    "id": "level-2",
    "label": "Level 2",
    "name": "Workplace clarity",
    "short": "Concise status, tone, naming, bridges",
    "promise": "Turn technical messages into shorter, clearer, safer workplace English."
  },
  {
    "id": "level-3",
    "label": "Level 3",
    "name": "Everyday small talk",
    "short": "Openers, follow-ups, remote calls, exits",
    "promise": "Use common conversational chunks without sounding translated or abrupt."
  },
  {
    "id": "level-4",
    "label": "Level 4",
    "name": "Nonviolent communication",
    "short": "Observation, feeling, need, request",
    "promise": "Disagree, set boundaries, and repair tension without blame."
  }
];

const PATTERNS = [
  {
    "id": "present_perfect",
    "label": "Have + participle",
    "x": 0.62,
    "y": 0.18,
    "hue": 50,
    "level": "level-1",
    "cue": "When you write have/has, the next main verb usually becomes a past participle.",
    "move": "Read the verb skeleton only: have + done, has + finished, I’ve applied.",
    "count": 12
  },
  {
    "id": "aux_base",
    "label": "Auxiliary + base verb",
    "x": 0.48,
    "y": 0.15,
    "hue": 58,
    "level": "level-1",
    "cue": "After does, did, will, can, could, should, and would, the main verb returns to base form.",
    "move": "Strip the sentence to helper + verb: does work, did change, will break.",
    "count": 20
  },
  {
    "id": "question_order",
    "label": "Question word order",
    "x": 0.34,
    "y": 0.19,
    "hue": 42,
    "level": "level-1",
    "cue": "Questions usually move the auxiliary before the subject.",
    "move": "Use the frame: question word + auxiliary + subject + base verb.",
    "count": 15
  },
  {
    "id": "articles",
    "label": "Article & determiner",
    "x": 0.22,
    "y": 0.33,
    "hue": 205,
    "level": "level-1",
    "cue": "A/an/the/my often carries the naturalness missing from a sentence.",
    "move": "Ask: one example, known item, general category, or something that belongs to this context?",
    "count": 14
  },
  {
    "id": "preposition_chunks",
    "label": "Preposition chunk",
    "x": 0.64,
    "y": 0.38,
    "hue": 28,
    "level": "level-1",
    "cue": "English prepositions often live inside fixed chunks: depend on, point to, work on, look at.",
    "move": "Learn the whole expression instead of translating one preposition.",
    "count": 19
  },
  {
    "id": "gerund_patterns",
    "label": "Verb + -ing pattern",
    "x": 0.78,
    "y": 0.26,
    "hue": 150,
    "level": "level-1",
    "cue": "After avoid, finish, suggest, mind, and prevent, English often wants an -ing phrase.",
    "move": "Turn the second action into an object: avoid breaking, suggest updating, prevent seeing.",
    "count": 9
  },
  {
    "id": "count_mass",
    "label": "Count vs mass",
    "x": 0.84,
    "y": 0.46,
    "hue": 135,
    "level": "level-1",
    "cue": "Feedback, information, advice, research, and equipment usually behave as mass nouns.",
    "move": "Use more feedback, some information, a piece of advice—not plural -s.",
    "count": 7
  },
  {
    "id": "collocation",
    "label": "Natural chunk",
    "x": 0.44,
    "y": 0.38,
    "hue": 15,
    "level": "level-1",
    "cue": "Some phrases are reusable blocks: take a photo, take a look, jump to a call.",
    "move": "Store the full chunk so you do not rebuild it from Portuguese under pressure.",
    "count": 11
  },
  {
    "id": "comma_bridge",
    "label": "Comma bridge",
    "x": 0.72,
    "y": 0.58,
    "hue": 75,
    "level": "level-2",
    "cue": "If both sides of a comma are complete thoughts, the comma is too weak.",
    "move": "Use a period, semicolon, or connector such as so, because, then, or however.",
    "count": 12
  },
  {
    "id": "concision",
    "label": "Concise rewrite",
    "x": 0.52,
    "y": 0.76,
    "hue": 285,
    "level": "level-2",
    "cue": "Keep action + reason + next step; cut the scaffolding around it.",
    "move": "Ask: what should the reader know or do after this sentence?",
    "count": 23
  },
  {
    "id": "register",
    "label": "Tone tuning",
    "x": 0.16,
    "y": 0.74,
    "hue": 230,
    "level": "level-2",
    "cue": "Could, might, I’m seeing, and it looks like soften tone while keeping the ask clear.",
    "move": "Match certainty to evidence and warmth to the channel.",
    "count": 41
  },
  {
    "id": "word_choice",
    "label": "Word choice",
    "x": 0.86,
    "y": 0.82,
    "hue": 120,
    "level": "level-2",
    "cue": "The word can be understandable but still not the word tutors or teammates expect.",
    "move": "Choose the high-frequency workplace term before choosing a clever term.",
    "count": 19
  },
  {
    "id": "tech_naming",
    "label": "Tech naming",
    "x": 0.58,
    "y": 0.09,
    "hue": 280,
    "level": "level-2",
    "cue": "React, Sass, App.scss, localStorage, ZIP, and API names need exact casing.",
    "move": "Scan product/API/file names separately from grammar.",
    "count": 8
  },
  {
    "id": "privacy_safe",
    "label": "Generic examples",
    "x": 0.88,
    "y": 0.16,
    "hue": 340,
    "level": "level-2",
    "cue": "Learning examples should teach the pattern without exposing real domains, customers, or codenames.",
    "move": "Replace specifics with generic labels: staging preview, customer account, review branch.",
    "count": 9
  },
  {
    "id": "small_openers",
    "label": "Small talk opener",
    "x": 0.2,
    "y": 0.16,
    "hue": 35,
    "level": "level-3",
    "cue": "Start with a light, answerable question tied to the moment.",
    "move": "Use openers that invite a short story: how’s your day going?",
    "count": 21
  },
  {
    "id": "small_followup",
    "label": "Follow-up question",
    "x": 0.3,
    "y": 0.44,
    "hue": 60,
    "level": "level-3",
    "cue": "The second question often creates the connection.",
    "move": "Listen for one detail and ask about that detail.",
    "count": 15
  },
  {
    "id": "small_work",
    "label": "Work-safe topic",
    "x": 0.64,
    "y": 0.38,
    "hue": 100,
    "level": "level-3",
    "cue": "Safe topics include projects, tools, weekend, lunch, light plans, and shared context.",
    "move": "Avoid salary, politics, religion, appearance, and overly personal questions.",
    "count": 16
  },
  {
    "id": "small_remote",
    "label": "Remote-call ease",
    "x": 0.78,
    "y": 0.28,
    "hue": 185,
    "level": "level-3",
    "cue": "Remote-call phrases should reduce awkwardness quickly.",
    "move": "Use soft practical lines: I think you might be muted.",
    "count": 14
  },
  {
    "id": "small_appreciation",
    "label": "Specific appreciation",
    "x": 0.68,
    "y": 0.72,
    "hue": 310,
    "level": "level-3",
    "cue": "Specific appreciation feels genuine and gives the other person useful signal.",
    "move": "Praise the action or effect, not identity or appearance.",
    "count": 9
  },
  {
    "id": "small_exit",
    "label": "Graceful exit",
    "x": 0.4,
    "y": 0.84,
    "hue": 250,
    "level": "level-3",
    "cue": "A good exit is warm and clear.",
    "move": "Use appreciation + reason: Great talking with you — I need to jump to another call.",
    "count": 8
  },
  {
    "id": "small_share",
    "label": "Balanced self-share",
    "x": 0.18,
    "y": 0.6,
    "hue": 165,
    "level": "level-3",
    "cue": "Small talk should not feel like an interview.",
    "move": "Share one small detail, then return the floor.",
    "count": 5
  },
  {
    "id": "nvc_observation",
    "label": "NVC observation",
    "x": 0.24,
    "y": 0.88,
    "hue": 15,
    "level": "level-4",
    "cue": "Say what happened, not what the person is.",
    "move": "Use camera language: when I saw, heard, noticed, or did not receive...",
    "count": 31
  },
  {
    "id": "nvc_feeling",
    "label": "NVC feeling",
    "x": 0.5,
    "y": 0.88,
    "hue": 330,
    "level": "level-4",
    "cue": "Name the feeling without making the other person responsible for it.",
    "move": "Use I feel concerned, blocked, confused, or frustrated—not you made me.",
    "count": 16
  },
  {
    "id": "nvc_need",
    "label": "NVC need",
    "x": 0.74,
    "y": 0.88,
    "hue": 120,
    "level": "level-4",
    "cue": "Needs make the conflict solvable.",
    "move": "Name clarity, predictability, focus, support, ownership, autonomy, or alignment.",
    "count": 27
  },
  {
    "id": "nvc_request",
    "label": "NVC request",
    "x": 0.88,
    "y": 0.62,
    "hue": 200,
    "level": "level-4",
    "cue": "Requests are concrete and leave room for alternatives.",
    "move": "Ask for the next action, owner, or timeline.",
    "count": 39
  },
  {
    "id": "nvc_boundary",
    "label": "Calm boundary",
    "x": 0.58,
    "y": 0.62,
    "hue": 265,
    "level": "level-4",
    "cue": "A boundary names capacity without blame.",
    "move": "State what you can do, what you cannot do, and what would help.",
    "count": 9
  },
  {
    "id": "nvc_repair",
    "label": "Repair line",
    "x": 0.36,
    "y": 0.58,
    "hue": 345,
    "level": "level-4",
    "cue": "Repair protects ego and reopens the conversation.",
    "move": "Try: I may not have explained that clearly.",
    "count": 11
  }
];

const CARD_BLUEPRINTS = [
  {
    "id": "grammar-present-perfect-finish",
    "level": "level-1",
    "source": "Grammar lab · present perfect",
    "raw": "I’ve finish the report.",
    "refined": "I’ve finished the report.",
    "patterns": [
      "present_perfect"
    ],
    "why": "The sentence idea is clear, but the verb form needs to match the helper verb or question structure.",
    "cue": "Before polishing tone, check the helper verb and the main verb as a pair.",
    "reuse": "I’ve finished the update and I’m ready for review.",
    "caughtAt": "Grammar deck · 01",
    "bad": "finish",
    "good": "finished",
    "hot": true,
    "seen": 7,
    "memory": 18
  },
  {
    "id": "grammar-present-perfect-push",
    "level": "level-1",
    "source": "Grammar lab · deployment update",
    "raw": "We’ve push the update.",
    "refined": "We’ve pushed the update.",
    "patterns": [
      "present_perfect"
    ],
    "why": "The sentence idea is clear, but the verb form needs to match the helper verb or question structure.",
    "cue": "Before polishing tone, check the helper verb and the main verb as a pair.",
    "reuse": "We’ve pushed the update to the review branch.",
    "caughtAt": "Grammar deck · 02",
    "bad": "push",
    "good": "pushed",
    "seen": 5,
    "memory": 24
  },
  {
    "id": "grammar-present-perfect-make",
    "level": "level-1",
    "source": "Grammar lab · completion",
    "raw": "I have make the changes.",
    "refined": "I have made the changes.",
    "patterns": [
      "present_perfect"
    ],
    "why": "The sentence idea is clear, but the verb form needs to match the helper verb or question structure.",
    "cue": "Before polishing tone, check the helper verb and the main verb as a pair.",
    "reuse": "I have made the changes and added a note.",
    "caughtAt": "Grammar deck · 03",
    "bad": "make",
    "good": "made",
    "seen": 5,
    "memory": 28
  },
  {
    "id": "grammar-aux-does-work",
    "level": "level-1",
    "source": "Grammar lab · questions",
    "raw": "Does this works for you?",
    "refined": "Does this work for you?",
    "patterns": [
      "aux_base",
      "question_order"
    ],
    "why": "The sentence idea is clear, but the verb form needs to match the helper verb or question structure.",
    "cue": "Before polishing tone, check the helper verb and the main verb as a pair.",
    "reuse": "Does this time work for you?",
    "caughtAt": "Grammar deck · 04",
    "bad": "works",
    "good": "work",
    "hot": true,
    "seen": 8,
    "memory": 22
  },
  {
    "id": "grammar-aux-will-break",
    "level": "level-1",
    "source": "Grammar lab · future",
    "raw": "Will it breaks if we remove this check?",
    "refined": "Will it break if we remove this check?",
    "patterns": [
      "aux_base"
    ],
    "why": "The sentence idea is clear, but the verb form needs to match the helper verb or question structure.",
    "cue": "Before polishing tone, check the helper verb and the main verb as a pair.",
    "reuse": "Will it break if we remove this check?",
    "caughtAt": "Grammar deck · 05",
    "bad": "breaks",
    "good": "break",
    "seen": 4,
    "memory": 34
  },
  {
    "id": "grammar-aux-did-change",
    "level": "level-1",
    "source": "Grammar lab · past question",
    "raw": "Why did you changed the order?",
    "refined": "Why did you change the order?",
    "patterns": [
      "aux_base",
      "question_order"
    ],
    "why": "The sentence idea is clear, but the verb form needs to match the helper verb or question structure.",
    "cue": "Before polishing tone, check the helper verb and the main verb as a pair.",
    "reuse": "Why did you change the order?",
    "caughtAt": "Grammar deck · 06",
    "bad": "changed",
    "good": "change",
    "seen": 6,
    "memory": 30
  },
  {
    "id": "grammar-question-yesterday",
    "level": "level-1",
    "source": "Grammar lab · question order",
    "raw": "What you did yesterday?",
    "refined": "What did you do yesterday?",
    "patterns": [
      "question_order",
      "aux_base"
    ],
    "why": "The sentence idea is clear, but the verb form needs to match the helper verb or question structure.",
    "cue": "Before polishing tone, check the helper verb and the main verb as a pair.",
    "reuse": "What did you do yesterday?",
    "caughtAt": "Grammar deck · 07",
    "bad": "you did",
    "good": "did you do",
    "seen": 4,
    "memory": 41
  },
  {
    "id": "grammar-question-tools",
    "level": "level-1",
    "source": "Grammar lab · question order",
    "raw": "What tools you use for that?",
    "refined": "What tools are you using for that?",
    "patterns": [
      "question_order",
      "small_work"
    ],
    "why": "The sentence idea is clear, but the verb form needs to match the helper verb or question structure.",
    "cue": "Before polishing tone, check the helper verb and the main verb as a pair.",
    "reuse": "What tools are you using for that?",
    "caughtAt": "Grammar deck · 08",
    "bad": "tools you use",
    "good": "tools are you using",
    "seen": 3,
    "memory": 46
  },
  {
    "id": "article-example",
    "level": "level-1",
    "source": "Grammar lab · articles",
    "raw": "Could you give me a example?",
    "refined": "Could you give me an example?",
    "patterns": [
      "articles"
    ],
    "why": "The sentence needs the right article or determiner so the noun sounds natural in context.",
    "cue": "Ask whether the noun is one item, a known item, a general category, or something that belongs to the speaker.",
    "reuse": "Could you give me an example?",
    "caughtAt": "Grammar deck · 09",
    "bad": "a example",
    "good": "an example",
    "hot": true,
    "seen": 7,
    "memory": 24
  },
  {
    "id": "article-screen",
    "level": "level-1",
    "source": "Grammar lab · determiner",
    "raw": "I’ll share screen in a second.",
    "refined": "I’ll share my screen in a second.",
    "patterns": [
      "articles",
      "small_remote"
    ],
    "why": "The sentence needs the right article or determiner so the noun sounds natural in context.",
    "cue": "Ask whether the noun is one item, a known item, a general category, or something that belongs to the speaker.",
    "reuse": "I’ll share my screen in a second.",
    "caughtAt": "Grammar deck · 10",
    "bad": "share screen",
    "good": "share my screen",
    "seen": 6,
    "memory": 37
  },
  {
    "id": "article-area",
    "level": "level-1",
    "source": "Grammar lab · articles",
    "raw": "This is a area I want to improve.",
    "refined": "This is an area I want to improve.",
    "patterns": [
      "articles",
      "register"
    ],
    "why": "The sentence needs the right article or determiner so the noun sounds natural in context.",
    "cue": "Ask whether the noun is one item, a known item, a general category, or something that belongs to the speaker.",
    "reuse": "This is an area where I want to build more confidence.",
    "caughtAt": "Grammar deck · 11",
    "bad": "a area",
    "good": "an area",
    "seen": 5,
    "memory": 33
  },
  {
    "id": "article-loading-state",
    "level": "level-1",
    "source": "Grammar lab · technical nouns",
    "raw": "The button stays in loading state.",
    "refined": "The button stays in the loading state.",
    "patterns": [
      "articles",
      "preposition_chunks"
    ],
    "why": "The sentence needs the right article or determiner so the noun sounds natural in context.",
    "cue": "Ask whether the noun is one item, a known item, a general category, or something that belongs to the speaker.",
    "reuse": "The button stays in the loading state.",
    "caughtAt": "Grammar deck · 12",
    "bad": "loading state",
    "good": "the loading state",
    "seen": 4,
    "memory": 50
  },
  {
    "id": "prep-depend-on",
    "level": "level-1",
    "source": "Grammar lab · prepositions",
    "raw": "It depends of the environment.",
    "refined": "It depends on the environment.",
    "patterns": [
      "preposition_chunks"
    ],
    "why": "The wording is understandable, but English stores this meaning in a fixed preposition chunk.",
    "cue": "Do not translate the preposition; recall the whole expression.",
    "reuse": "It depends on the environment.",
    "caughtAt": "Grammar deck · 13",
    "bad": "depends of",
    "good": "depends on",
    "hot": true,
    "seen": 9,
    "memory": 16
  },
  {
    "id": "prep-points-to",
    "level": "level-1",
    "source": "Grammar lab · links",
    "raw": "The link points for the preview.",
    "refined": "The link points to the preview.",
    "patterns": [
      "preposition_chunks"
    ],
    "why": "The wording is understandable, but English stores this meaning in a fixed preposition chunk.",
    "cue": "Do not translate the preposition; recall the whole expression.",
    "reuse": "The link points to the preview.",
    "caughtAt": "Grammar deck · 14",
    "bad": "points for",
    "good": "points to",
    "seen": 6,
    "memory": 27
  },
  {
    "id": "prep-work-on",
    "level": "level-1",
    "source": "Grammar lab · work chunks",
    "raw": "I’m working in the ticket now.",
    "refined": "I’m working on the ticket now.",
    "patterns": [
      "preposition_chunks"
    ],
    "why": "The wording is understandable, but English stores this meaning in a fixed preposition chunk.",
    "cue": "Do not translate the preposition; recall the whole expression.",
    "reuse": "I’m working on the ticket now.",
    "caughtAt": "Grammar deck · 15",
    "bad": "working in",
    "good": "working on",
    "seen": 5,
    "memory": 38
  },
  {
    "id": "prep-look-at",
    "level": "level-1",
    "source": "Grammar lab · review request",
    "raw": "Could you take a look of this?",
    "refined": "Could you take a look at this?",
    "patterns": [
      "preposition_chunks",
      "collocation",
      "register"
    ],
    "why": "The wording is understandable, but English stores this meaning in a fixed preposition chunk.",
    "cue": "Do not translate the preposition; recall the whole expression.",
    "reuse": "Could you take a quick look at this?",
    "caughtAt": "Grammar deck · 16",
    "bad": "look of",
    "good": "look at",
    "hot": true,
    "seen": 8,
    "memory": 20
  },
  {
    "id": "prep-explain-to",
    "level": "level-1",
    "source": "Grammar lab · verb pattern",
    "raw": "Can you explain me the difference?",
    "refined": "Can you explain the difference to me?",
    "patterns": [
      "preposition_chunks",
      "collocation"
    ],
    "why": "The wording is understandable, but English stores this meaning in a fixed preposition chunk.",
    "cue": "Do not translate the preposition; recall the whole expression.",
    "reuse": "Could you explain the difference to me?",
    "caughtAt": "Grammar deck · 17",
    "bad": "explain me the difference",
    "good": "explain the difference to me",
    "seen": 4,
    "memory": 44
  },
  {
    "id": "prep-discuss",
    "level": "level-1",
    "source": "Grammar lab · transitive verbs",
    "raw": "We need to discuss about the next step.",
    "refined": "We need to discuss the next step.",
    "patterns": [
      "preposition_chunks",
      "word_choice"
    ],
    "why": "The wording is understandable, but English stores this meaning in a fixed preposition chunk.",
    "cue": "Do not translate the preposition; recall the whole expression.",
    "reuse": "We need to discuss the next step.",
    "caughtAt": "Grammar deck · 18",
    "bad": "discuss about",
    "good": "discuss",
    "seen": 4,
    "memory": 52
  },
  {
    "id": "gerund-avoid-fails",
    "level": "level-1",
    "source": "Grammar lab · verb patterns",
    "raw": "We should avoid the request fails silently.",
    "refined": "We should avoid the request failing silently.",
    "patterns": [
      "gerund_patterns"
    ],
    "why": "The second action needs to become a noun-like -ing phrase, not a full mini-sentence.",
    "cue": "After avoid, finish, suggest, mind, and prevent, test the -ing form.",
    "reuse": "We should avoid the request failing silently.",
    "caughtAt": "Grammar deck · 19",
    "bad": "the request fails",
    "good": "the request failing",
    "hot": true,
    "seen": 7,
    "memory": 21
  },
  {
    "id": "gerund-prevent-seeing",
    "level": "level-1",
    "source": "Grammar lab · verb patterns",
    "raw": "This check prevents the user sees the wrong page.",
    "refined": "This check prevents the user from seeing the wrong page.",
    "patterns": [
      "gerund_patterns",
      "preposition_chunks"
    ],
    "why": "The second action needs to become a noun-like -ing phrase, not a full mini-sentence.",
    "cue": "After avoid, finish, suggest, mind, and prevent, test the -ing form.",
    "reuse": "This check prevents the user from seeing the wrong page.",
    "caughtAt": "Grammar deck · 20",
    "bad": "the user sees",
    "good": "the user from seeing",
    "seen": 3,
    "memory": 49
  },
  {
    "id": "gerund-suggest-update",
    "level": "level-1",
    "source": "Grammar lab · verb patterns",
    "raw": "I suggest to update the copy.",
    "refined": "I suggest updating the copy.",
    "patterns": [
      "gerund_patterns"
    ],
    "why": "The second action needs to become a noun-like -ing phrase, not a full mini-sentence.",
    "cue": "After avoid, finish, suggest, mind, and prevent, test the -ing form.",
    "reuse": "I suggest updating the copy.",
    "caughtAt": "Grammar deck · 21",
    "bad": "to update",
    "good": "updating",
    "seen": 4,
    "memory": 43
  },
  {
    "id": "gerund-finish-writing",
    "level": "level-1",
    "source": "Grammar lab · verb patterns",
    "raw": "I’ll finish to write the notes.",
    "refined": "I’ll finish writing the notes.",
    "patterns": [
      "gerund_patterns"
    ],
    "why": "The second action needs to become a noun-like -ing phrase, not a full mini-sentence.",
    "cue": "After avoid, finish, suggest, mind, and prevent, test the -ing form.",
    "reuse": "I’ll finish writing the notes.",
    "caughtAt": "Grammar deck · 22",
    "bad": "to write",
    "good": "writing",
    "seen": 2,
    "memory": 61
  },
  {
    "id": "count-feedback",
    "level": "level-1",
    "source": "Grammar lab · countability",
    "raw": "Thanks for the feedbacks.",
    "refined": "Thanks for the feedback.",
    "patterns": [
      "count_mass"
    ],
    "why": "The issue is countability: some nouns take plural forms, while mass nouns usually do not.",
    "cue": "Check whether the noun is countable before adding -s.",
    "reuse": "Thanks for the feedback.",
    "caughtAt": "Grammar deck · 23",
    "bad": "feedbacks",
    "good": "feedback",
    "hot": true,
    "seen": 8,
    "memory": 18
  },
  {
    "id": "count-information",
    "level": "level-1",
    "source": "Grammar lab · countability",
    "raw": "I need more informations about the flow.",
    "refined": "I need more information about the flow.",
    "patterns": [
      "count_mass"
    ],
    "why": "The issue is countability: some nouns take plural forms, while mass nouns usually do not.",
    "cue": "Check whether the noun is countable before adding -s.",
    "reuse": "I need more information about the flow.",
    "caughtAt": "Grammar deck · 24",
    "bad": "informations",
    "good": "information",
    "seen": 5,
    "memory": 29
  },
  {
    "id": "count-examples",
    "level": "level-1",
    "source": "Grammar lab · agreement",
    "raw": "This examples contains common mistakes.",
    "refined": "These examples contain common mistakes.",
    "patterns": [
      "count_mass",
      "aux_base"
    ],
    "why": "The issue is countability: some nouns take plural forms, while mass nouns usually do not.",
    "cue": "Check whether the noun is countable before adding -s.",
    "reuse": "These examples contain common mistakes.",
    "caughtAt": "Grammar deck · 25",
    "bad": "This examples contains",
    "good": "These examples contain",
    "seen": 7,
    "memory": 23
  },
  {
    "id": "chunk-photo",
    "level": "level-1",
    "source": "Grammar lab · collocations",
    "raw": "Can you make a photo of the board?",
    "refined": "Can you take a photo of the board?",
    "patterns": [
      "collocation",
      "word_choice"
    ],
    "why": "The phrase is not built word by word; English uses the chunk take a photo.",
    "cue": "Learn high-frequency chunks as complete phrases.",
    "reuse": "Can you take a photo of the board?",
    "caughtAt": "Grammar deck · 26",
    "bad": "make a photo",
    "good": "take a photo",
    "seen": 3,
    "memory": 58
  },
  {
    "id": "chunk-jump-call",
    "level": "level-3",
    "source": "Small talk lab · exit chunk",
    "raw": "I need to go in another call.",
    "refined": "I need to jump to another call.",
    "patterns": [
      "collocation",
      "small_exit"
    ],
    "why": "The revised phrase uses a common workplace exit chunk.",
    "cue": "Use jump to another call when leaving a meeting or chat.",
    "reuse": "I need to jump to another call.",
    "caughtAt": "Conversation deck · 27",
    "bad": "go in",
    "good": "jump to",
    "seen": 5,
    "memory": 32
  },
  {
    "id": "chunk-lost-thread",
    "level": "level-3",
    "source": "Remote lab · recovery chunk",
    "raw": "I lost the context for a second.",
    "refined": "I lost the thread for a second.",
    "patterns": [
      "collocation",
      "small_remote"
    ],
    "why": "Lost the thread is the common phrase when you lose the flow of a conversation.",
    "cue": "Use thread for the line of thought in a meeting.",
    "reuse": "I lost the thread for a second — could you repeat that?",
    "caughtAt": "Conversation deck · 28",
    "bad": "context",
    "good": "thread",
    "seen": 4,
    "memory": 42
  },
  {
    "id": "word-replicate",
    "level": "level-2",
    "source": "Workplace lab · implementation",
    "raw": "I’ll mimic the same changes in the other app.",
    "refined": "I’ll replicate the same changes in the other app.",
    "patterns": [
      "word_choice",
      "concision"
    ],
    "why": "The revised word is the more common tutor/workplace choice for this context.",
    "cue": "Choose the term a fluent speaker would expect in the same situation.",
    "reuse": "I’ll replicate the same changes in the other app.",
    "caughtAt": "Workplace deck · 29",
    "bad": "mimic",
    "good": "replicate",
    "hot": true,
    "seen": 6,
    "memory": 26
  },
  {
    "id": "word-available-testing",
    "level": "level-2",
    "source": "Workplace lab · release wording",
    "raw": "The test version is public for test.",
    "refined": "The test version is available for testing.",
    "patterns": [
      "word_choice",
      "register"
    ],
    "why": "The revised word is the more common tutor/workplace choice for this context.",
    "cue": "Choose the term a fluent speaker would expect in the same situation.",
    "reuse": "The test version is available for testing.",
    "caughtAt": "Workplace deck · 30",
    "bad": "public for test",
    "good": "available for testing",
    "seen": 4,
    "memory": 44
  },
  {
    "id": "word-search-internet",
    "level": "level-2",
    "source": "Workplace lab · research request",
    "raw": "Search on internet for examples.",
    "refined": "Search the internet for examples.",
    "patterns": [
      "word_choice",
      "preposition_chunks",
      "articles"
    ],
    "why": "The revised word is the more common tutor/workplace choice for this context.",
    "cue": "Choose the term a fluent speaker would expect in the same situation.",
    "reuse": "Search the internet for examples.",
    "caughtAt": "Workplace deck · 31",
    "bad": "on internet",
    "good": "the internet",
    "seen": 5,
    "memory": 39
  },
  {
    "id": "word-nonviolent",
    "level": "level-4",
    "source": "Communication lab · term",
    "raw": "Use no violent communication.",
    "refined": "Use nonviolent communication.",
    "patterns": [
      "word_choice",
      "nvc_observation"
    ],
    "why": "The revised word is the more common tutor/workplace choice for this context.",
    "cue": "Choose the term a fluent speaker would expect in the same situation.",
    "reuse": "Use nonviolent communication.",
    "caughtAt": "NVC deck · 32",
    "bad": "no violent",
    "good": "nonviolent",
    "seen": 3,
    "memory": 55
  },
  {
    "id": "bridge-ready-share",
    "level": "level-2",
    "source": "Workplace lab · punctuation",
    "raw": "The update is ready, I’ll share the link.",
    "refined": "The update is ready; I’ll share the link.",
    "patterns": [
      "comma_bridge"
    ],
    "why": "Two complete thoughts need a stronger bridge than a comma or no punctuation.",
    "cue": "If both sides can stand alone, use a period, semicolon, or connector.",
    "reuse": "The update is ready; I’ll share the link.",
    "caughtAt": "Workplace deck · 33",
    "bad": ",",
    "good": ";",
    "hot": true,
    "seen": 7,
    "memory": 26
  },
  {
    "id": "bridge-looks-good-next",
    "level": "level-2",
    "source": "Workplace lab · next steps",
    "raw": "Everything looks good what we need to do next.",
    "refined": "Everything looks good; here’s what we need to do next.",
    "patterns": [
      "comma_bridge",
      "concision",
      "register"
    ],
    "why": "Two complete thoughts need a stronger bridge than a comma or no punctuation.",
    "cue": "If both sides can stand alone, use a period, semicolon, or connector.",
    "reuse": "Everything looks good; here’s what we need to do next.",
    "caughtAt": "Workplace deck · 34",
    "bad": "good what",
    "good": "good; here’s what",
    "seen": 6,
    "memory": 35
  },
  {
    "id": "bridge-agree-helps",
    "level": "level-2",
    "source": "Workplace lab · agreement",
    "raw": "I agree, it makes the flow clearer.",
    "refined": "I agree; it makes the flow clearer.",
    "patterns": [
      "comma_bridge"
    ],
    "why": "Two complete thoughts need a stronger bridge than a comma or no punctuation.",
    "cue": "If both sides can stand alone, use a period, semicolon, or connector.",
    "reuse": "I agree; it makes the flow clearer.",
    "caughtAt": "Workplace deck · 35",
    "bad": ",",
    "good": ";",
    "seen": 3,
    "memory": 57
  },
  {
    "id": "concision-tests",
    "level": "level-2",
    "source": "Workplace lab · status update",
    "raw": "I’m just doing some tests to make sure everything is working.",
    "refined": "I’m running a few final tests.",
    "patterns": [
      "concision",
      "word_choice"
    ],
    "why": "The revised version keeps the action and next step while removing extra scaffolding.",
    "cue": "Keep action + reason + next step; cut the rest.",
    "reuse": "I’m running a few final tests, then I’ll share the update.",
    "caughtAt": "Workplace deck · 36",
    "bad": "just doing some tests to make sure everything is working",
    "good": "running a few final tests",
    "hot": true,
    "seen": 6,
    "memory": 25
  },
  {
    "id": "concision-pr-feedback",
    "level": "level-2",
    "source": "Workplace lab · PR update",
    "raw": "I’m finishing the comments from the reviewer.",
    "refined": "I’m working through PR feedback.",
    "patterns": [
      "concision",
      "word_choice"
    ],
    "why": "The revised version keeps the action and next step while removing extra scaffolding.",
    "cue": "Keep action + reason + next step; cut the rest.",
    "reuse": "I’m working through PR feedback.",
    "caughtAt": "Workplace deck · 37",
    "bad": "finishing the comments from the reviewer",
    "good": "working through PR feedback",
    "seen": 4,
    "memory": 46
  },
  {
    "id": "concision-next-steps",
    "level": "level-2",
    "source": "Workplace lab · planning",
    "raw": "Here is what we need to do after that.",
    "refined": "Here are the next steps.",
    "patterns": [
      "concision"
    ],
    "why": "The revised version keeps the action and next step while removing extra scaffolding.",
    "cue": "Keep action + reason + next step; cut the rest.",
    "reuse": "Here are the next steps.",
    "caughtAt": "Workplace deck · 38",
    "bad": "what we need to do after that",
    "good": "the next steps",
    "seen": 3,
    "memory": 58
  },
  {
    "id": "register-review",
    "level": "level-2",
    "source": "Workplace lab · request",
    "raw": "Can you look at this now?",
    "refined": "Could you take a quick look when you have a moment?",
    "patterns": [
      "register"
    ],
    "why": "The revised wording keeps the ask clear while sounding calmer and more professional.",
    "cue": "Use softer modal verbs and evidence language without hiding the request.",
    "reuse": "Could you take a quick look when you have a moment?",
    "caughtAt": "Workplace deck · 39",
    "bad": "Can you look at this now",
    "good": "Could you take a quick look when you have a moment",
    "seen": 6,
    "memory": 31
  },
  {
    "id": "register-evidence",
    "level": "level-2",
    "source": "Workplace lab · bug report",
    "raw": "This is wrong.",
    "refined": "I’m seeing a mismatch with the expected behavior.",
    "patterns": [
      "register",
      "nvc_observation"
    ],
    "why": "The revised wording keeps the ask clear while sounding calmer and more professional.",
    "cue": "Use softer modal verbs and evidence language without hiding the request.",
    "reuse": "I’m seeing a mismatch with the expected behavior.",
    "caughtAt": "Workplace deck · 40",
    "bad": "This is wrong",
    "good": "I’m seeing a mismatch with the expected behavior",
    "hot": true,
    "seen": 7,
    "memory": 19
  },
  {
    "id": "register-uncertainty",
    "level": "level-2",
    "source": "Workplace lab · investigation",
    "raw": "The feature is broken.",
    "refined": "It looks like the feature is not behaving as expected.",
    "patterns": [
      "register",
      "nvc_observation"
    ],
    "why": "The revised wording keeps the ask clear while sounding calmer and more professional.",
    "cue": "Use softer modal verbs and evidence language without hiding the request.",
    "reuse": "It looks like the feature is not behaving as expected.",
    "caughtAt": "Workplace deck · 41",
    "bad": "is broken",
    "good": "is not behaving as expected",
    "seen": 4,
    "memory": 45
  },
  {
    "id": "tech-localstorage",
    "level": "level-2",
    "source": "Technical lab · naming",
    "raw": "Use local storage to persist the setting.",
    "refined": "Use localStorage to persist the setting.",
    "patterns": [
      "tech_naming",
      "concision"
    ],
    "why": "The browser API name uses exact casing; the grammar can be fine while the technical name is still wrong.",
    "cue": "Scan API and file names separately from grammar.",
    "reuse": "Use localStorage to persist the setting.",
    "caughtAt": "Workplace deck · 42",
    "bad": "local storage",
    "good": "localStorage",
    "seen": 4,
    "memory": 48
  },
  {
    "id": "tech-sass",
    "level": "level-2",
    "source": "Technical lab · naming",
    "raw": "Use sass features to organize the styles.",
    "refined": "Use Sass features to organize the styles.",
    "patterns": [
      "tech_naming"
    ],
    "why": "Technical names should keep their conventional casing.",
    "cue": "Scan framework, package, and file names before sending.",
    "reuse": "Use Sass features to organize the styles.",
    "caughtAt": "Workplace deck · 43",
    "bad": "sass",
    "good": "Sass",
    "seen": 3,
    "memory": 54
  },
  {
    "id": "privacy-generic",
    "level": "level-2",
    "source": "Data hygiene lab · examples",
    "raw": "Use the customer domain in the example.",
    "refined": "Use a generic staging preview in the example.",
    "patterns": [
      "privacy_safe",
      "register"
    ],
    "why": "The example should teach the language pattern without exposing real project details.",
    "cue": "Replace real names, domains, and internal labels with generic placeholders.",
    "reuse": "Use a generic staging preview in the example.",
    "caughtAt": "Workplace deck · 44",
    "bad": "customer domain",
    "good": "generic staging preview",
    "seen": 3,
    "memory": 52
  },
  {
    "id": "small-opener-day",
    "level": "level-3",
    "source": "Small talk lab · opener",
    "raw": "Hi, how are you?",
    "refined": "Hey, how’s your day going?",
    "patterns": [
      "small_openers"
    ],
    "why": "This opener gives the other person room to answer naturally instead of forcing a yes/no reply.",
    "cue": "Tie the opener to the moment and make it easy to answer.",
    "reuse": "Hey, how’s your day going?",
    "caughtAt": "Conversation deck · 45",
    "bad": "Hi, how are you",
    "good": "Hey, how’s your day going",
    "hot": true,
    "seen": 5,
    "memory": 22
  },
  {
    "id": "small-opener-week",
    "level": "level-3",
    "source": "Small talk lab · opener",
    "raw": "Are you busy?",
    "refined": "How’s your week looking?",
    "patterns": [
      "small_openers",
      "register"
    ],
    "why": "This opener gives the other person room to answer naturally instead of forcing a yes/no reply.",
    "cue": "Tie the opener to the moment and make it easy to answer.",
    "reuse": "How’s your week looking?",
    "caughtAt": "Conversation deck · 46",
    "bad": "Are you busy",
    "good": "How’s your week looking",
    "seen": 4,
    "memory": 37
  },
  {
    "id": "small-opener-weekend",
    "level": "level-3",
    "source": "Small talk lab · opener",
    "raw": "Did you do something on the weekend?",
    "refined": "Did you get up to anything fun over the weekend?",
    "patterns": [
      "small_openers",
      "collocation"
    ],
    "why": "This opener gives the other person room to answer naturally instead of forcing a yes/no reply.",
    "cue": "Tie the opener to the moment and make it easy to answer.",
    "reuse": "Did you get up to anything fun over the weekend?",
    "caughtAt": "Conversation deck · 47",
    "bad": "do something on",
    "good": "get up to anything fun over",
    "seen": 4,
    "memory": 41
  },
  {
    "id": "small-opener-project",
    "level": "level-3",
    "source": "Small talk lab · work opener",
    "raw": "You like this project?",
    "refined": "How are you finding the project so far?",
    "patterns": [
      "small_openers",
      "small_work"
    ],
    "why": "This opener gives the other person room to answer naturally instead of forcing a yes/no reply.",
    "cue": "Tie the opener to the moment and make it easy to answer.",
    "reuse": "How are you finding the project so far?",
    "caughtAt": "Conversation deck · 48",
    "bad": "You like this project",
    "good": "How are you finding the project so far",
    "seen": 3,
    "memory": 55
  },
  {
    "id": "small-opener-after-work",
    "level": "level-3",
    "source": "Small talk lab · opener",
    "raw": "Do you have plans after work?",
    "refined": "Any plans after work?",
    "patterns": [
      "small_openers",
      "concision"
    ],
    "why": "This opener gives the other person room to answer naturally instead of forcing a yes/no reply.",
    "cue": "Tie the opener to the moment and make it easy to answer.",
    "reuse": "Any plans after work?",
    "caughtAt": "Conversation deck · 49",
    "bad": "Do you have",
    "good": "Any",
    "seen": 3,
    "memory": 60
  },
  {
    "id": "small-follow-best-part",
    "level": "level-3",
    "source": "Small talk lab · follow-up",
    "raw": "Oh nice.",
    "refined": "Oh nice — what was the best part?",
    "patterns": [
      "small_followup"
    ],
    "why": "A follow-up question shows you listened and keeps the conversation alive.",
    "cue": "Ask about one detail they already gave you.",
    "reuse": "Oh nice — what was the best part?",
    "caughtAt": "Conversation deck · 50",
    "bad": ".",
    "good": " — what was the best part?",
    "hot": true,
    "seen": 6,
    "memory": 24
  },
  {
    "id": "small-follow-get-into",
    "level": "level-3",
    "source": "Small talk lab · follow-up",
    "raw": "Interesting.",
    "refined": "Interesting — how did you get into that?",
    "patterns": [
      "small_followup"
    ],
    "why": "A follow-up question shows you listened and keeps the conversation alive.",
    "cue": "Ask about one detail they already gave you.",
    "reuse": "Interesting — how did you get into that?",
    "caughtAt": "Conversation deck · 51",
    "bad": ".",
    "good": " — how did you get into that?",
    "seen": 5,
    "memory": 32
  },
  {
    "id": "small-follow-enjoy",
    "level": "level-3",
    "source": "Small talk lab · follow-up",
    "raw": "So you like it?",
    "refined": "What do you enjoy most about it?",
    "patterns": [
      "small_followup"
    ],
    "why": "A follow-up question shows you listened and keeps the conversation alive.",
    "cue": "Ask about one detail they already gave you.",
    "reuse": "What do you enjoy most about it?",
    "caughtAt": "Conversation deck · 52",
    "bad": "So you like",
    "good": "What do you enjoy most about",
    "seen": 3,
    "memory": 47
  },
  {
    "id": "small-follow-next",
    "level": "level-3",
    "source": "Small talk lab · follow-up",
    "raw": "And?",
    "refined": "What happened next?",
    "patterns": [
      "small_followup",
      "register"
    ],
    "why": "A full question sounds warmer than a bare prompt.",
    "cue": "Use a complete question when the other person is telling a story.",
    "reuse": "What happened next?",
    "caughtAt": "Conversation deck · 53",
    "bad": "And",
    "good": "What happened next",
    "seen": 3,
    "memory": 53
  },
  {
    "id": "small-follow-recommend",
    "level": "level-3",
    "source": "Small talk lab · follow-up",
    "raw": "Do you recommend?",
    "refined": "Would you recommend it?",
    "patterns": [
      "small_followup",
      "articles"
    ],
    "why": "Recommend usually needs the thing being recommended.",
    "cue": "Attach the object: recommend it, recommend the place, recommend the book.",
    "reuse": "Would you recommend it?",
    "caughtAt": "Conversation deck · 54",
    "bad": "Do you recommend",
    "good": "Would you recommend it",
    "seen": 2,
    "memory": 64
  },
  {
    "id": "small-follow-good",
    "level": "level-3",
    "source": "Small talk lab · follow-up",
    "raw": "It was good?",
    "refined": "What made it good?",
    "patterns": [
      "small_followup"
    ],
    "why": "A follow-up question shows you listened and keeps the conversation alive.",
    "cue": "Ask about one detail they already gave you.",
    "reuse": "What made it good?",
    "caughtAt": "Conversation deck · 55",
    "bad": "It was",
    "good": "What made it",
    "seen": 2,
    "memory": 71
  },
  {
    "id": "small-work-team",
    "level": "level-3",
    "source": "Small talk lab · work-safe topic",
    "raw": "Which team you are?",
    "refined": "Which team are you on?",
    "patterns": [
      "small_work",
      "question_order",
      "preposition_chunks"
    ],
    "why": "Which team are you on? is the common workplace chunk.",
    "cue": "Use work-safe topics and natural team/project chunks.",
    "reuse": "Which team are you on?",
    "caughtAt": "Conversation deck · 56",
    "bad": "team you are",
    "good": "team are you on",
    "hot": true,
    "seen": 5,
    "memory": 28
  },
  {
    "id": "small-work-working-on",
    "level": "level-3",
    "source": "Small talk lab · work-safe topic",
    "raw": "What are you working these days?",
    "refined": "What are you working on these days?",
    "patterns": [
      "small_work",
      "preposition_chunks"
    ],
    "why": "Work on is the chunk for projects, tasks, and tickets.",
    "cue": "Use work on for tasks and projects.",
    "reuse": "What are you working on these days?",
    "caughtAt": "Conversation deck · 57",
    "bad": "working these",
    "good": "working on these",
    "seen": 5,
    "memory": 30
  },
  {
    "id": "small-work-busy-day",
    "level": "level-3",
    "source": "Small talk lab · work-safe topic",
    "raw": "Do you have much job today?",
    "refined": "Do you have a busy day today?",
    "patterns": [
      "small_work",
      "word_choice"
    ],
    "why": "Job is a role; workload or day fits the question here.",
    "cue": "Ask about the day or workload, not job as a quantity.",
    "reuse": "Do you have a busy day today?",
    "caughtAt": "Conversation deck · 58",
    "bad": "much job",
    "good": "a busy day",
    "seen": 4,
    "memory": 45
  },
  {
    "id": "small-work-task-going",
    "level": "level-3",
    "source": "Small talk lab · work-safe topic",
    "raw": "This task is hard?",
    "refined": "How’s that task going?",
    "patterns": [
      "small_work",
      "register"
    ],
    "why": "Ask about progress rather than labeling the task.",
    "cue": "Use gentle progress questions for work chat.",
    "reuse": "How’s that task going?",
    "caughtAt": "Conversation deck · 59",
    "bad": "This task is hard",
    "good": "How’s that task going",
    "seen": 3,
    "memory": 57
  },
  {
    "id": "small-work-time-off",
    "level": "level-3",
    "source": "Small talk lab · work-safe topic",
    "raw": "You have holiday soon?",
    "refined": "Do you have any time off coming up?",
    "patterns": [
      "small_work",
      "collocation",
      "question_order"
    ],
    "why": "Time off is a safer general term than holiday for workplace chat.",
    "cue": "Use time off for a neutral work-safe question.",
    "reuse": "Do you have any time off coming up?",
    "caughtAt": "Conversation deck · 60",
    "bad": "You have holiday soon",
    "good": "Do you have any time off coming up",
    "seen": 3,
    "memory": 63
  },
  {
    "id": "small-work-lunch",
    "level": "level-3",
    "source": "Small talk lab · work-safe topic",
    "raw": "Did you eat lunch?",
    "refined": "Have you had lunch yet?",
    "patterns": [
      "small_work",
      "present_perfect"
    ],
    "why": "Have you had lunch yet? is the natural daily check-in chunk.",
    "cue": "Use have you had for daily meals when the day is still in progress.",
    "reuse": "Have you had lunch yet?",
    "caughtAt": "Conversation deck · 61",
    "bad": "Did you eat",
    "good": "Have you had",
    "seen": 3,
    "memory": 66
  },
  {
    "id": "small-remote-hear",
    "level": "level-3",
    "source": "Remote lab · call check",
    "raw": "Can you hear me good?",
    "refined": "Can you hear me okay?",
    "patterns": [
      "small_remote",
      "word_choice"
    ],
    "why": "The revised phrase makes the remote-call moment smoother and less embarrassing.",
    "cue": "Use practical, soft language for call friction.",
    "reuse": "Can you hear me okay?",
    "caughtAt": "Conversation deck · 62",
    "bad": "good",
    "good": "okay",
    "hot": true,
    "seen": 6,
    "memory": 20
  },
  {
    "id": "small-remote-muted",
    "level": "level-3",
    "source": "Remote lab · call friction",
    "raw": "You are muted.",
    "refined": "I think you might be muted.",
    "patterns": [
      "small_remote",
      "register"
    ],
    "why": "The revised phrase makes the remote-call moment smoother and less embarrassing.",
    "cue": "Use practical, soft language for call friction.",
    "reuse": "I think you might be muted.",
    "caughtAt": "Conversation deck · 63",
    "bad": "You are",
    "good": "I think you might be",
    "hot": true,
    "seen": 7,
    "memory": 18
  },
  {
    "id": "small-remote-connection",
    "level": "level-3",
    "source": "Remote lab · call friction",
    "raw": "Your internet is bad.",
    "refined": "Your connection seems a bit unstable.",
    "patterns": [
      "small_remote",
      "register"
    ],
    "why": "The revised phrase makes the remote-call moment smoother and less embarrassing.",
    "cue": "Use practical, soft language for call friction.",
    "reuse": "Your connection seems a bit unstable.",
    "caughtAt": "Conversation deck · 64",
    "bad": "internet is bad",
    "good": "connection seems a bit unstable",
    "seen": 5,
    "memory": 38
  },
  {
    "id": "small-remote-share-screen",
    "level": "level-3",
    "source": "Remote lab · meeting host",
    "raw": "I will share screen.",
    "refined": "I’ll share my screen.",
    "patterns": [
      "small_remote",
      "articles",
      "concision"
    ],
    "why": "The revised phrase makes the remote-call moment smoother and less embarrassing.",
    "cue": "Use practical, soft language for call friction.",
    "reuse": "I’ll share my screen.",
    "caughtAt": "Conversation deck · 65",
    "bad": "will share screen",
    "good": "’ll share my screen",
    "seen": 5,
    "memory": 42
  },
  {
    "id": "small-remote-wait",
    "level": "level-3",
    "source": "Remote lab · meeting host",
    "raw": "Let’s wait people.",
    "refined": "Let’s give everyone a minute to join.",
    "patterns": [
      "small_remote",
      "register"
    ],
    "why": "The revised phrase makes the remote-call moment smoother and less embarrassing.",
    "cue": "Use practical, soft language for call friction.",
    "reuse": "Let’s give everyone a minute to join.",
    "caughtAt": "Conversation deck · 66",
    "bad": "wait people",
    "good": "give everyone a minute to join",
    "seen": 4,
    "memory": 51
  },
  {
    "id": "small-remote-interrupt",
    "level": "level-3",
    "source": "Remote lab · turn-taking",
    "raw": "I don’t want interrupt.",
    "refined": "I don’t want to interrupt, but can I add one thing?",
    "patterns": [
      "small_remote",
      "register",
      "aux_base"
    ],
    "why": "The revised phrase makes the remote-call moment smoother and less embarrassing.",
    "cue": "Use practical, soft language for call friction.",
    "reuse": "I don’t want to interrupt, but can I add one thing?",
    "caughtAt": "Conversation deck · 67",
    "bad": "want interrupt",
    "good": "want to interrupt",
    "seen": 3,
    "memory": 62
  },
  {
    "id": "small-appreciation-presentation",
    "level": "level-3",
    "source": "Small talk lab · appreciation",
    "raw": "Your presentation was good.",
    "refined": "I really liked how clear your presentation was.",
    "patterns": [
      "small_appreciation"
    ],
    "why": "Specific appreciation sounds more genuine than a generic good.",
    "cue": "Name the behavior or effect you appreciated.",
    "reuse": "I really liked how clear your presentation was.",
    "caughtAt": "Conversation deck · 68",
    "bad": "Your presentation was good",
    "good": "I really liked how clear your presentation was",
    "seen": 3,
    "memory": 54
  },
  {
    "id": "small-appreciation-help",
    "level": "level-3",
    "source": "Small talk lab · appreciation",
    "raw": "Thanks, useful.",
    "refined": "Thanks — that made the next step much clearer.",
    "patterns": [
      "small_appreciation",
      "comma_bridge"
    ],
    "why": "Name the positive effect of the help.",
    "cue": "Gratitude becomes warmer when it explains the effect.",
    "reuse": "Thanks — that made the next step much clearer.",
    "caughtAt": "Conversation deck · 69",
    "bad": "useful",
    "good": "that made the next step much clearer",
    "seen": 2,
    "memory": 67
  },
  {
    "id": "small-appreciation-fast",
    "level": "level-3",
    "source": "Small talk lab · appreciation",
    "raw": "You did fast.",
    "refined": "You turned that around really quickly.",
    "patterns": [
      "small_appreciation",
      "word_choice"
    ],
    "why": "Turned that around is a common workplace appreciation chunk.",
    "cue": "Praise the action with a natural work phrase.",
    "reuse": "You turned that around really quickly.",
    "caughtAt": "Conversation deck · 70",
    "bad": "did fast",
    "good": "turned that around really quickly",
    "seen": 2,
    "memory": 70
  },
  {
    "id": "small-appreciation-flow",
    "level": "level-3",
    "source": "Small talk lab · appreciation",
    "raw": "Good job on this.",
    "refined": "Nice work on this — the flow is much easier to follow now.",
    "patterns": [
      "small_appreciation",
      "small_work"
    ],
    "why": "Adding what improved makes the compliment more useful.",
    "cue": "Specific praise is easier to trust and respond to.",
    "reuse": "Nice work on this — the flow is much easier to follow now.",
    "caughtAt": "Conversation deck · 71",
    "bad": "Good job on this",
    "good": "Nice work on this — the flow is much easier to follow now",
    "seen": 3,
    "memory": 59
  },
  {
    "id": "small-exit-catch-up",
    "level": "level-3",
    "source": "Small talk lab · graceful exit",
    "raw": "Talk later.",
    "refined": "Great talking with you — let’s catch up later.",
    "patterns": [
      "small_exit"
    ],
    "why": "Warmth before the exit keeps the relationship open.",
    "cue": "Exit with appreciation plus a reason or future signal.",
    "reuse": "Great talking with you — let’s catch up later.",
    "caughtAt": "Conversation deck · 72",
    "bad": "Talk",
    "good": "Great talking with you — let’s catch up",
    "seen": 3,
    "memory": 55
  },
  {
    "id": "small-exit-get-back",
    "level": "level-3",
    "source": "Small talk lab · graceful exit",
    "raw": "I will stop here.",
    "refined": "I’ll let you get back to it.",
    "patterns": [
      "small_exit",
      "register"
    ],
    "why": "This exit respects the other person’s time.",
    "cue": "Use a warm handoff when ending informal work chat.",
    "reuse": "I’ll let you get back to it.",
    "caughtAt": "Conversation deck · 73",
    "bad": "will stop here",
    "good": "’ll let you get back to it",
    "seen": 2,
    "memory": 69
  },
  {
    "id": "small-exit-wrap",
    "level": "level-3",
    "source": "Small talk lab · meeting close",
    "raw": "Let’s finish.",
    "refined": "Shall we wrap here?",
    "patterns": [
      "small_exit",
      "register"
    ],
    "why": "Wrap here is a friendly meeting-close phrase.",
    "cue": "Use wrap to close a meeting without sounding abrupt.",
    "reuse": "Shall we wrap here?",
    "caughtAt": "Conversation deck · 74",
    "bad": "Let’s finish",
    "good": "Shall we wrap here",
    "seen": 3,
    "memory": 58
  },
  {
    "id": "small-share-lowkey",
    "level": "level-3",
    "source": "Small talk lab · self-share",
    "raw": "My weekend was normal.",
    "refined": "It was pretty low-key, which was exactly what I needed.",
    "patterns": [
      "small_share",
      "small_openers"
    ],
    "why": "One small detail gives the other person something to respond to.",
    "cue": "Share one sentence, then return the floor.",
    "reuse": "It was pretty low-key, which was exactly what I needed.",
    "caughtAt": "Conversation deck · 75",
    "bad": "My weekend was normal",
    "good": "It was pretty low-key, which was exactly what I needed",
    "seen": 4,
    "memory": 44
  },
  {
    "id": "small-share-tried",
    "level": "level-3",
    "source": "Small talk lab · self-share",
    "raw": "I don’t know this.",
    "refined": "I haven’t tried that before — what do you like about it?",
    "patterns": [
      "small_share",
      "small_followup"
    ],
    "why": "This shares your context briefly and invites their opinion.",
    "cue": "Self-share plus one question keeps the balance.",
    "reuse": "I haven’t tried that before — what do you like about it?",
    "caughtAt": "Conversation deck · 76",
    "bad": "don’t know this",
    "good": "haven’t tried that before — what do you like about it",
    "seen": 4,
    "memory": 43
  },
  {
    "id": "nvc-ignore",
    "level": "level-4",
    "source": "NVC lab · reply delay",
    "raw": "You always ignore my messages.",
    "refined": "When I don’t get a reply by the end of the day, I feel blocked because I need visibility. Could you let me know when you expect to reply?",
    "patterns": [
      "nvc_observation",
      "nvc_feeling",
      "nvc_need",
      "nvc_request"
    ],
    "why": "The revised version separates observation from judgment, which makes the message easier to hear.",
    "cue": "Start with what a camera could record.",
    "reuse": "When I don’t get a reply by the end of the day, I feel blocked because I need visibility. Could you let me know when you expect to reply?",
    "caughtAt": "NVC deck · 77",
    "bad": "You always ignore my messages",
    "good": "When I don’t get a reply by the end of the day, I feel blocked because I need visibility. Could you let me know when you expect to reply",
    "hot": true,
    "seen": 6,
    "memory": 16
  },
  {
    "id": "nvc-implementation",
    "level": "level-4",
    "source": "NVC lab · code review",
    "raw": "This implementation is wrong.",
    "refined": "I’m seeing behavior that doesn’t match the acceptance criteria. Could we compare it with the expected flow?",
    "patterns": [
      "nvc_observation",
      "nvc_request",
      "register"
    ],
    "why": "The revised version separates observation from judgment, which makes the message easier to hear.",
    "cue": "Start with what a camera could record.",
    "reuse": "I’m seeing behavior that doesn’t match the acceptance criteria. Could we compare it with the expected flow?",
    "caughtAt": "NVC deck · 78",
    "bad": "This implementation is wrong",
    "good": "I’m seeing behavior that doesn’t match the acceptance criteria. Could we compare it with the expected flow",
    "hot": true,
    "seen": 5,
    "memory": 22
  },
  {
    "id": "nvc-no-tests",
    "level": "level-4",
    "source": "NVC lab · PR review",
    "raw": "You didn’t test this.",
    "refined": "I’m not seeing test evidence in the PR. Could you add the test notes or point me to where they are?",
    "patterns": [
      "nvc_observation",
      "nvc_request"
    ],
    "why": "The revised version separates observation from judgment, which makes the message easier to hear.",
    "cue": "Start with what a camera could record.",
    "reuse": "I’m not seeing test evidence in the PR. Could you add the test notes or point me to where they are?",
    "caughtAt": "NVC deck · 79",
    "bad": "You didn’t test this",
    "good": "I’m not seeing test evidence in the PR. Could you add the test notes or point me to where they are",
    "seen": 5,
    "memory": 31
  },
  {
    "id": "nvc-last-minute",
    "level": "level-4",
    "source": "NVC lab · scope change",
    "raw": "Stop changing things at the last minute.",
    "refined": "When requirements change after implementation starts, I feel concerned about rework because I need predictability. Could we confirm the scope before I continue?",
    "patterns": [
      "nvc_observation",
      "nvc_feeling",
      "nvc_need",
      "nvc_request"
    ],
    "why": "The revised version separates observation from judgment, which makes the message easier to hear.",
    "cue": "Start with what a camera could record.",
    "reuse": "When requirements change after implementation starts, I feel concerned about rework because I need predictability. Could we confirm the scope before I continue?",
    "caughtAt": "NVC deck · 80",
    "bad": "Stop changing things at the last minute",
    "good": "When requirements change after implementation starts, I feel concerned about rework because I need predictability. Could we confirm the scope before I continue",
    "hot": true,
    "seen": 6,
    "memory": 20
  },
  {
    "id": "nvc-not-clear",
    "level": "level-4",
    "source": "NVC lab · clarification",
    "raw": "You are not clear.",
    "refined": "I’m having trouble understanding the expected outcome. Could you share one example of the final behavior?",
    "patterns": [
      "nvc_observation",
      "nvc_request"
    ],
    "why": "The revised version separates observation from judgment, which makes the message easier to hear.",
    "cue": "Start with what a camera could record.",
    "reuse": "I’m having trouble understanding the expected outcome. Could you share one example of the final behavior?",
    "caughtAt": "NVC deck · 81",
    "bad": "You are not clear",
    "good": "I’m having trouble understanding the expected outcome. Could you share one example of the final behavior",
    "seen": 6,
    "memory": 26
  },
  {
    "id": "nvc-wait",
    "level": "level-4",
    "source": "NVC lab · review delay",
    "raw": "You make me wait.",
    "refined": "When the review is delayed, I feel blocked because I need momentum. Could you let me know a realistic review time?",
    "patterns": [
      "nvc_observation",
      "nvc_feeling",
      "nvc_need",
      "nvc_request"
    ],
    "why": "The revised version owns the feeling instead of making the other person responsible for it.",
    "cue": "Use I feel + emotion, then connect it to a need.",
    "reuse": "When the review is delayed, I feel blocked because I need momentum. Could you let me know a realistic review time?",
    "caughtAt": "NVC deck · 82",
    "bad": "You make me wait",
    "good": "When the review is delayed, I feel blocked because I need momentum. Could you let me know a realistic review time",
    "seen": 5,
    "memory": 36
  },
  {
    "id": "nvc-not-my-problem",
    "level": "level-4",
    "source": "NVC lab · ownership",
    "raw": "This is not my problem.",
    "refined": "I want to help, and I need clarity on ownership. Could we confirm who should take the next step?",
    "patterns": [
      "nvc_boundary",
      "nvc_need",
      "nvc_request"
    ],
    "why": "The revised version protects capacity without attacking the other person.",
    "cue": "State what you can do, what you cannot do, and what would help.",
    "reuse": "I want to help, and I need clarity on ownership. Could we confirm who should take the next step?",
    "caughtAt": "NVC deck · 83",
    "bad": "This is not my problem",
    "good": "I want to help, and I need clarity on ownership. Could we confirm who should take the next step",
    "seen": 4,
    "memory": 45
  },
  {
    "id": "nvc-why-did",
    "level": "level-4",
    "source": "NVC lab · curiosity",
    "raw": "Why did you do this?",
    "refined": "Can you walk me through the reasoning behind this change?",
    "patterns": [
      "nvc_request",
      "register"
    ],
    "why": "The revised version turns pressure or blame into a concrete request.",
    "cue": "Ask for a clear next action, owner, or timeline.",
    "reuse": "Can you walk me through the reasoning behind this change?",
    "caughtAt": "NVC deck · 84",
    "bad": "Why did you do this",
    "good": "Can you walk me through the reasoning behind this change",
    "seen": 4,
    "memory": 51
  },
  {
    "id": "nvc-bad-idea",
    "level": "level-4",
    "source": "NVC lab · disagreement",
    "raw": "That’s a bad idea.",
    "refined": "I’m concerned this option may increase complexity. Could we compare it with a simpler approach?",
    "patterns": [
      "nvc_feeling",
      "nvc_request"
    ],
    "why": "The revised version owns the feeling instead of making the other person responsible for it.",
    "cue": "Use I feel + emotion, then connect it to a need.",
    "reuse": "I’m concerned this option may increase complexity. Could we compare it with a simpler approach?",
    "caughtAt": "NVC deck · 85",
    "bad": "That’s a bad idea",
    "good": "I’m concerned this option may increase complexity. Could we compare it with a simpler approach",
    "seen": 5,
    "memory": 34
  },
  {
    "id": "nvc-told-earlier",
    "level": "level-4",
    "source": "NVC lab · timing",
    "raw": "You should have told me earlier.",
    "refined": "I would have liked to know earlier because I need time to adjust the plan. Could we flag changes sooner next time?",
    "patterns": [
      "nvc_feeling",
      "nvc_need",
      "nvc_request"
    ],
    "why": "The revised version owns the feeling instead of making the other person responsible for it.",
    "cue": "Use I feel + emotion, then connect it to a need.",
    "reuse": "I would have liked to know earlier because I need time to adjust the plan. Could we flag changes sooner next time?",
    "caughtAt": "NVC deck · 86",
    "bad": "You should have told me earlier",
    "good": "I would have liked to know earlier because I need time to adjust the plan. Could we flag changes sooner next time",
    "seen": 5,
    "memory": 40
  },
  {
    "id": "nvc-disagree",
    "level": "level-4",
    "source": "NVC lab · disagreement",
    "raw": "I don’t agree with this.",
    "refined": "I see the trade-off differently. My concern is maintainability, so I’d like to discuss one alternative.",
    "patterns": [
      "nvc_observation",
      "nvc_need",
      "register"
    ],
    "why": "The revised version separates observation from judgment, which makes the message easier to hear.",
    "cue": "Start with what a camera could record.",
    "reuse": "I see the trade-off differently. My concern is maintainability, so I’d like to discuss one alternative.",
    "caughtAt": "NVC deck · 87",
    "bad": "don’t agree with this",
    "good": "see the trade-off differently. My concern is maintainability, so I’d like to discuss one alternative",
    "seen": 4,
    "memory": 47
  },
  {
    "id": "nvc-need-now",
    "level": "level-4",
    "source": "NVC lab · urgency",
    "raw": "I need this now.",
    "refined": "This is time-sensitive because it blocks the release. Could you prioritize it today, or tell me what timeline is realistic?",
    "patterns": [
      "nvc_request",
      "nvc_need"
    ],
    "why": "The revised version turns pressure or blame into a concrete request.",
    "cue": "Ask for a clear next action, owner, or timeline.",
    "reuse": "This is time-sensitive because it blocks the release. Could you prioritize it today, or tell me what timeline is realistic?",
    "caughtAt": "NVC deck · 88",
    "bad": "I need this now",
    "good": "This is time-sensitive because it blocks the release. Could you prioritize it today, or tell me what timeline is realistic",
    "hot": true,
    "seen": 6,
    "memory": 21
  },
  {
    "id": "nvc-breaking-work",
    "level": "level-4",
    "source": "NVC lab · coordination",
    "raw": "You keep breaking my work.",
    "refined": "The latest change affects the flow I’m testing. Could we coordinate before changing that path again?",
    "patterns": [
      "nvc_observation",
      "nvc_request"
    ],
    "why": "The revised version separates observation from judgment, which makes the message easier to hear.",
    "cue": "Start with what a camera could record.",
    "reuse": "The latest change affects the flow I’m testing. Could we coordinate before changing that path again?",
    "caughtAt": "NVC deck · 89",
    "bad": "You keep breaking my work",
    "good": "The latest change affects the flow I’m testing. Could we coordinate before changing that path again",
    "seen": 5,
    "memory": 39
  },
  {
    "id": "nvc-assigning",
    "level": "level-4",
    "source": "NVC lab · capacity",
    "raw": "Don’t assign me things without asking.",
    "refined": "Before assigning new work, could you check my capacity so I can protect the current priorities?",
    "patterns": [
      "nvc_boundary",
      "nvc_request",
      "nvc_need"
    ],
    "why": "The revised version protects capacity without attacking the other person.",
    "cue": "State what you can do, what you cannot do, and what would help.",
    "reuse": "Before assigning new work, could you check my capacity so I can protect the current priorities?",
    "caughtAt": "NVC deck · 90",
    "bad": "Don’t assign me things without asking",
    "good": "Before assigning new work, could you check my capacity so I can protect the current priorities",
    "seen": 4,
    "memory": 49
  },
  {
    "id": "nvc-frustrated",
    "level": "level-4",
    "source": "NVC lab · handoff",
    "raw": "I’m frustrated with you.",
    "refined": "I’m feeling frustrated because I need more predictability in the handoff. Could we agree on the next checkpoint?",
    "patterns": [
      "nvc_feeling",
      "nvc_need",
      "nvc_request"
    ],
    "why": "The revised version owns the feeling instead of making the other person responsible for it.",
    "cue": "Use I feel + emotion, then connect it to a need.",
    "reuse": "I’m feeling frustrated because I need more predictability in the handoff. Could we agree on the next checkpoint?",
    "caughtAt": "NVC deck · 91",
    "bad": "frustrated with you",
    "good": "feeling frustrated because I need more predictability in the handoff. Could we agree on the next checkpoint",
    "seen": 5,
    "memory": 30
  },
  {
    "id": "nvc-useless-meeting",
    "level": "level-4",
    "source": "NVC lab · meeting",
    "raw": "This meeting was useless.",
    "refined": "I’m not sure we reached a clear decision. Could we capture the owner and next step before we close?",
    "patterns": [
      "nvc_observation",
      "nvc_request"
    ],
    "why": "The revised version separates observation from judgment, which makes the message easier to hear.",
    "cue": "Start with what a camera could record.",
    "reuse": "I’m not sure we reached a clear decision. Could we capture the owner and next step before we close?",
    "caughtAt": "NVC deck · 92",
    "bad": "This meeting was useless",
    "good": "I’m not sure we reached a clear decision. Could we capture the owner and next step before we close",
    "seen": 4,
    "memory": 52
  },
  {
    "id": "nvc-nobody-told",
    "level": "level-4",
    "source": "NVC lab · visibility",
    "raw": "Nobody told me.",
    "refined": "I didn’t see that update. Where should I look next time so I don’t miss it?",
    "patterns": [
      "nvc_observation",
      "nvc_request"
    ],
    "why": "The revised version separates observation from judgment, which makes the message easier to hear.",
    "cue": "Start with what a camera could record.",
    "reuse": "I didn’t see that update. Where should I look next time so I don’t miss it?",
    "caughtAt": "NVC deck · 93",
    "bad": "Nobody told me",
    "good": "I didn’t see that update. Where should I look next time so I don’t miss it",
    "seen": 4,
    "memory": 57
  },
  {
    "id": "nvc-overcomplicate",
    "level": "level-4",
    "source": "NVC lab · simplification",
    "raw": "You are overcomplicating it.",
    "refined": "I’m worried this adds complexity. Could we compare it with a simpler option before deciding?",
    "patterns": [
      "nvc_feeling",
      "nvc_request"
    ],
    "why": "The revised version owns the feeling instead of making the other person responsible for it.",
    "cue": "Use I feel + emotion, then connect it to a need.",
    "reuse": "I’m worried this adds complexity. Could we compare it with a simpler option before deciding?",
    "caughtAt": "NVC deck · 94",
    "bad": "You are overcomplicating it",
    "good": "I’m worried this adds complexity. Could we compare it with a simpler option before deciding",
    "seen": 4,
    "memory": 50
  },
  {
    "id": "nvc-cant-work",
    "level": "level-4",
    "source": "NVC lab · ambiguity",
    "raw": "I can’t work like this.",
    "refined": "I’m having trouble moving forward with the current ambiguity. Could we clarify the acceptance criteria first?",
    "patterns": [
      "nvc_feeling",
      "nvc_need",
      "nvc_request"
    ],
    "why": "The revised version owns the feeling instead of making the other person responsible for it.",
    "cue": "Use I feel + emotion, then connect it to a need.",
    "reuse": "I’m having trouble moving forward with the current ambiguity. Could we clarify the acceptance criteria first?",
    "caughtAt": "NVC deck · 95",
    "bad": "can’t work like this",
    "good": "’m having trouble moving forward with the current ambiguity. Could we clarify the acceptance criteria first",
    "seen": 5,
    "memory": 35
  },
  {
    "id": "nvc-missed-point",
    "level": "level-4",
    "source": "NVC lab · repair",
    "raw": "You missed the point.",
    "refined": "I think I may not have explained the goal clearly. What I meant was that the issue is the user flow, not the styling.",
    "patterns": [
      "nvc_repair",
      "nvc_observation"
    ],
    "why": "The revised line protects the relationship before clarifying the meaning.",
    "cue": "Assume misunderstanding before assuming bad intent.",
    "reuse": "I think I may not have explained the goal clearly. What I meant was that the issue is the user flow, not the styling.",
    "caughtAt": "NVC deck · 96",
    "bad": "You missed the point",
    "good": "I think I may not have explained the goal clearly. What I meant was that the issue is the user flow, not the styling",
    "hot": true,
    "seen": 6,
    "memory": 22
  },
  {
    "id": "nvc-defensive",
    "level": "level-4",
    "source": "NVC lab · tension",
    "raw": "You’re defensive.",
    "refined": "I’m noticing we’re both explaining our side. Could we pause and align on what each of us needs?",
    "patterns": [
      "nvc_observation",
      "nvc_need",
      "nvc_request"
    ],
    "why": "The revised version separates observation from judgment, which makes the message easier to hear.",
    "cue": "Start with what a camera could record.",
    "reuse": "I’m noticing we’re both explaining our side. Could we pause and align on what each of us needs?",
    "caughtAt": "NVC deck · 97",
    "bad": "You’re defensive",
    "good": "I’m noticing we’re both explaining our side. Could we pause and align on what each of us needs",
    "seen": 4,
    "memory": 48
  },
  {
    "id": "nvc-urgent-demand",
    "level": "level-4",
    "source": "NVC lab · urgency",
    "raw": "This is urgent, do it now.",
    "refined": "This is time-sensitive because it affects today’s release. Would you be willing to take it today, or suggest another owner?",
    "patterns": [
      "nvc_request",
      "nvc_need"
    ],
    "why": "The revised version turns pressure or blame into a concrete request.",
    "cue": "Ask for a clear next action, owner, or timeline.",
    "reuse": "This is time-sensitive because it affects today’s release. Would you be willing to take it today, or suggest another owner?",
    "caughtAt": "NVC deck · 98",
    "bad": "urgent, do it now",
    "good": "time-sensitive because it affects today’s release. Would you be willing to take it today, or suggest another owner",
    "seen": 5,
    "memory": 29
  },
  {
    "id": "nvc-already-said",
    "level": "level-4",
    "source": "NVC lab · repair",
    "raw": "I already said that.",
    "refined": "I may not have been clear earlier. Let me restate the key point in one sentence.",
    "patterns": [
      "nvc_repair",
      "register"
    ],
    "why": "The revised line avoids shaming the listener and gives you a clean reset.",
    "cue": "Use repair language when the conversation is stuck.",
    "reuse": "I may not have been clear earlier. Let me restate the key point in one sentence.",
    "caughtAt": "NVC deck · 99",
    "bad": "already said that",
    "good": "may not have been clear earlier. Let me restate the key point in one sentence",
    "seen": 4,
    "memory": 53
  },
  {
    "id": "nvc-different-problem",
    "level": "level-4",
    "source": "NVC lab · repair",
    "raw": "That’s not what I asked.",
    "refined": "The current version solves a different problem. Could we go back to the original goal?",
    "patterns": [
      "nvc_repair",
      "nvc_request"
    ],
    "why": "The revised version names the mismatch without accusing the other person.",
    "cue": "Name the difference in problem, then ask for the next action.",
    "reuse": "The current version solves a different problem. Could we go back to the original goal?",
    "caughtAt": "NVC deck · 100",
    "bad": "That’s not what I asked",
    "good": "The current version solves a different problem. Could we go back to the original goal",
    "seen": 4,
    "memory": 43
  },
  {
    "id": "grammar-v6-present-perfect-01",
    "level": "level-1",
    "source": "Grammar expansion · present perfect",
    "raw": "I’ve send the file.",
    "refined": "I’ve sent the file.",
    "patterns": [
      "present_perfect"
    ],
    "why": "The verb idea is right, but present perfect needs have/has plus a past participle.",
    "cue": "When you see have/has, check that the next main verb is a participle.",
    "reuse": "I’ve sent the file for review.",
    "bad": "send",
    "good": "sent",
    "hot": true
  },
  {
    "id": "grammar-v6-present-perfect-02",
    "level": "level-1",
    "source": "Grammar expansion · present perfect",
    "raw": "I’ve already did it.",
    "refined": "I’ve already done it.",
    "patterns": [
      "present_perfect"
    ],
    "why": "The verb idea is right, but present perfect needs have/has plus a past participle.",
    "cue": "When you see have/has, check that the next main verb is a participle.",
    "reuse": "I’ve already done the update.",
    "bad": "did",
    "good": "done",
    "hot": true
  },
  {
    "id": "grammar-v6-present-perfect-03",
    "level": "level-1",
    "source": "Grammar expansion · present perfect",
    "raw": "I haven’t receive the invite yet.",
    "refined": "I haven’t received the invite yet.",
    "patterns": [
      "present_perfect"
    ],
    "why": "The verb idea is right, but present perfect needs have/has plus a past participle.",
    "cue": "When you see have/has, check that the next main verb is a participle.",
    "reuse": "I haven’t received the invite yet.",
    "bad": "receive",
    "good": "received"
  },
  {
    "id": "grammar-v6-present-perfect-04",
    "level": "level-1",
    "source": "Grammar expansion · present perfect",
    "raw": "Have you saw the notes?",
    "refined": "Have you seen the notes?",
    "patterns": [
      "present_perfect"
    ],
    "why": "The verb idea is right, but present perfect needs have/has plus a past participle.",
    "cue": "When you see have/has, check that the next main verb is a participle.",
    "reuse": "Have you seen the release notes?",
    "bad": "saw",
    "good": "seen"
  },
  {
    "id": "grammar-v6-present-perfect-05",
    "level": "level-1",
    "source": "Grammar expansion · present perfect",
    "raw": "The page has load correctly.",
    "refined": "The page has loaded correctly.",
    "patterns": [
      "present_perfect"
    ],
    "why": "The verb idea is right, but present perfect needs have/has plus a past participle.",
    "cue": "When you see have/has, check that the next main verb is a participle.",
    "reuse": "The page has loaded correctly.",
    "bad": "load",
    "good": "loaded"
  },
  {
    "id": "grammar-v6-present-perfect-06",
    "level": "level-1",
    "source": "Grammar expansion · present perfect",
    "raw": "I’ve been work on this since morning.",
    "refined": "I’ve been working on this since morning.",
    "patterns": [
      "present_perfect"
    ],
    "why": "The verb idea is right, but present perfect needs have/has plus a past participle.",
    "cue": "When you see have/has, check that the next main verb is a participle.",
    "reuse": "I’ve been working on this since morning.",
    "bad": "work",
    "good": "working"
  },
  {
    "id": "grammar-v6-present-perfect-07",
    "level": "level-1",
    "source": "Grammar expansion · present perfect",
    "raw": "She has went home.",
    "refined": "She has gone home.",
    "patterns": [
      "present_perfect"
    ],
    "why": "The verb idea is right, but present perfect needs have/has plus a past participle.",
    "cue": "When you see have/has, check that the next main verb is a participle.",
    "reuse": "She has gone home for the day.",
    "bad": "went",
    "good": "gone"
  },
  {
    "id": "grammar-v6-present-perfect-08",
    "level": "level-1",
    "source": "Grammar expansion · present perfect",
    "raw": "We have discuss the options.",
    "refined": "We have discussed the options.",
    "patterns": [
      "present_perfect"
    ],
    "why": "The verb idea is right, but present perfect needs have/has plus a past participle.",
    "cue": "When you see have/has, check that the next main verb is a participle.",
    "reuse": "We have discussed the options and chose one.",
    "bad": "discuss",
    "good": "discussed"
  },
  {
    "id": "grammar-v6-aux-base-01",
    "level": "level-1",
    "source": "Grammar expansion · helper verbs",
    "raw": "Does it makes sense?",
    "refined": "Does it make sense?",
    "patterns": [
      "aux_base"
    ],
    "why": "The helper verb already carries tense or modality, so the main verb should return to base form.",
    "cue": "After does/did/will/can/could/should/would, test the base verb.",
    "reuse": "Does it make sense to use this approach?",
    "bad": "makes",
    "good": "make",
    "hot": true
  },
  {
    "id": "grammar-v6-aux-base-02",
    "level": "level-1",
    "source": "Grammar expansion · helper verbs",
    "raw": "Did you pushed the branch?",
    "refined": "Did you push the branch?",
    "patterns": [
      "aux_base"
    ],
    "why": "The helper verb already carries tense or modality, so the main verb should return to base form.",
    "cue": "After does/did/will/can/could/should/would, test the base verb.",
    "reuse": "Did you push the branch?",
    "bad": "pushed",
    "good": "push"
  },
  {
    "id": "grammar-v6-aux-base-03",
    "level": "level-1",
    "source": "Grammar expansion · helper verbs",
    "raw": "Will this breaks the layout?",
    "refined": "Will this break the layout?",
    "patterns": [
      "aux_base"
    ],
    "why": "The helper verb already carries tense or modality, so the main verb should return to base form.",
    "cue": "After does/did/will/can/could/should/would, test the base verb.",
    "reuse": "Will this break the layout?",
    "bad": "breaks",
    "good": "break",
    "hot": true
  },
  {
    "id": "grammar-v6-aux-base-04",
    "level": "level-1",
    "source": "Grammar expansion · helper verbs",
    "raw": "Can you checks the logs?",
    "refined": "Can you check the logs?",
    "patterns": [
      "aux_base"
    ],
    "why": "The helper verb already carries tense or modality, so the main verb should return to base form.",
    "cue": "After does/did/will/can/could/should/would, test the base verb.",
    "reuse": "Can you check the logs?",
    "bad": "checks",
    "good": "check"
  },
  {
    "id": "grammar-v6-aux-base-05",
    "level": "level-1",
    "source": "Grammar expansion · helper verbs",
    "raw": "Could you shares the file?",
    "refined": "Could you share the file?",
    "patterns": [
      "aux_base"
    ],
    "why": "The helper verb already carries tense or modality, so the main verb should return to base form.",
    "cue": "After does/did/will/can/could/should/would, test the base verb.",
    "reuse": "Could you share the file?",
    "bad": "shares",
    "good": "share"
  },
  {
    "id": "grammar-v6-aux-base-06",
    "level": "level-1",
    "source": "Grammar expansion · helper verbs",
    "raw": "Should we uses this approach?",
    "refined": "Should we use this approach?",
    "patterns": [
      "aux_base"
    ],
    "why": "The helper verb already carries tense or modality, so the main verb should return to base form.",
    "cue": "After does/did/will/can/could/should/would, test the base verb.",
    "reuse": "Should we use this approach?",
    "bad": "uses",
    "good": "use"
  },
  {
    "id": "grammar-v6-aux-base-07",
    "level": "level-1",
    "source": "Grammar expansion · helper verbs",
    "raw": "Would it helps?",
    "refined": "Would it help?",
    "patterns": [
      "aux_base"
    ],
    "why": "The helper verb already carries tense or modality, so the main verb should return to base form.",
    "cue": "After does/did/will/can/could/should/would, test the base verb.",
    "reuse": "Would it help to add a fallback?",
    "bad": "helps",
    "good": "help"
  },
  {
    "id": "grammar-v6-question-order-01",
    "level": "level-1",
    "source": "Grammar expansion · questions",
    "raw": "Why this happens?",
    "refined": "Why does this happen?",
    "patterns": [
      "question_order",
      "aux_base"
    ],
    "why": "The question is understandable, but English usually moves the auxiliary before the subject.",
    "cue": "Use question word + auxiliary + subject + base verb.",
    "reuse": "Why does this happen in staging?",
    "bad": "Why this happens",
    "good": "Why does this happen",
    "hot": true
  },
  {
    "id": "grammar-v6-question-order-02",
    "level": "level-1",
    "source": "Grammar expansion · questions",
    "raw": "When you will start?",
    "refined": "When will you start?",
    "patterns": [
      "question_order",
      "aux_base"
    ],
    "why": "The question is understandable, but English usually moves the auxiliary before the subject.",
    "cue": "Use question word + auxiliary + subject + base verb.",
    "reuse": "When will you start the review?",
    "bad": "When you will start",
    "good": "When will you start"
  },
  {
    "id": "grammar-v6-question-order-03",
    "level": "level-1",
    "source": "Grammar expansion · questions",
    "raw": "Where I can find it?",
    "refined": "Where can I find it?",
    "patterns": [
      "question_order",
      "aux_base"
    ],
    "why": "The question is understandable, but English usually moves the auxiliary before the subject.",
    "cue": "Use question word + auxiliary + subject + base verb.",
    "reuse": "Where can I find the document?",
    "bad": "Where I can find it",
    "good": "Where can I find it",
    "hot": true
  },
  {
    "id": "grammar-v6-question-order-04",
    "level": "level-1",
    "source": "Grammar expansion · questions",
    "raw": "What you think about this?",
    "refined": "What do you think about this?",
    "patterns": [
      "question_order",
      "aux_base"
    ],
    "why": "The question is understandable, but English usually moves the auxiliary before the subject.",
    "cue": "Use question word + auxiliary + subject + base verb.",
    "reuse": "What do you think about this option?",
    "bad": "What you think",
    "good": "What do you think"
  },
  {
    "id": "grammar-v6-question-order-05",
    "level": "level-1",
    "source": "Grammar expansion · questions",
    "raw": "How I can test it?",
    "refined": "How can I test it?",
    "patterns": [
      "question_order",
      "aux_base"
    ],
    "why": "The question is understandable, but English usually moves the auxiliary before the subject.",
    "cue": "Use question word + auxiliary + subject + base verb.",
    "reuse": "How can I test this flow?",
    "bad": "How I can test it",
    "good": "How can I test it"
  },
  {
    "id": "grammar-v6-question-order-06",
    "level": "level-1",
    "source": "Grammar expansion · questions",
    "raw": "Which option we should use?",
    "refined": "Which option should we use?",
    "patterns": [
      "question_order",
      "aux_base"
    ],
    "why": "The question is understandable, but English usually moves the auxiliary before the subject.",
    "cue": "Use question word + auxiliary + subject + base verb.",
    "reuse": "Which option should we use?",
    "bad": "Which option we should use",
    "good": "Which option should we use"
  },
  {
    "id": "grammar-v6-question-order-07",
    "level": "level-1",
    "source": "Grammar expansion · questions",
    "raw": "Why it failed?",
    "refined": "Why did it fail?",
    "patterns": [
      "question_order",
      "aux_base"
    ],
    "why": "The question is understandable, but English usually moves the auxiliary before the subject.",
    "cue": "Use question word + auxiliary + subject + base verb.",
    "reuse": "Why did it fail in production?",
    "bad": "Why it failed",
    "good": "Why did it fail"
  },
  {
    "id": "grammar-v6-articles-01",
    "level": "level-1",
    "source": "Grammar expansion · articles",
    "raw": "I found issue in the flow.",
    "refined": "I found an issue in the flow.",
    "patterns": [
      "articles"
    ],
    "why": "The noun needs a determiner so the sentence sounds complete and natural.",
    "cue": "Ask whether this is one item, a known item, or something owned by the context.",
    "reuse": "I found an issue in the checkout flow.",
    "bad": "issue",
    "good": "an issue",
    "hot": true
  },
  {
    "id": "grammar-v6-articles-02",
    "level": "level-1",
    "source": "Grammar expansion · articles",
    "raw": "Can you send link?",
    "refined": "Can you send the link?",
    "patterns": [
      "articles"
    ],
    "why": "The noun needs a determiner so the sentence sounds complete and natural.",
    "cue": "Ask whether this is one item, a known item, or something owned by the context.",
    "reuse": "Can you send the link when you have a chance?",
    "bad": "link",
    "good": "the link"
  },
  {
    "id": "grammar-v6-articles-03",
    "level": "level-1",
    "source": "Grammar expansion · articles",
    "raw": "We need create ticket.",
    "refined": "We need to create a ticket.",
    "patterns": [
      "articles",
      "collocation"
    ],
    "why": "The noun needs a determiner so the sentence sounds complete and natural.",
    "cue": "Ask whether this is one item, a known item, or something owned by the context.",
    "reuse": "We need to create a ticket for this.",
    "bad": "create ticket",
    "good": "to create a ticket"
  },
  {
    "id": "grammar-v6-articles-04",
    "level": "level-1",
    "source": "Grammar expansion · articles",
    "raw": "It is expected behavior.",
    "refined": "It is the expected behavior.",
    "patterns": [
      "articles"
    ],
    "why": "The noun needs a determiner so the sentence sounds complete and natural.",
    "cue": "Ask whether this is one item, a known item, or something owned by the context.",
    "reuse": "It is the expected behavior for this state.",
    "bad": "expected behavior",
    "good": "the expected behavior"
  },
  {
    "id": "grammar-v6-articles-05",
    "level": "level-1",
    "source": "Grammar expansion · articles",
    "raw": "I’ll check with team.",
    "refined": "I’ll check with the team.",
    "patterns": [
      "articles"
    ],
    "why": "The noun needs a determiner so the sentence sounds complete and natural.",
    "cue": "Ask whether this is one item, a known item, or something owned by the context.",
    "reuse": "I’ll check with the team before changing it.",
    "bad": "team",
    "good": "the team"
  },
  {
    "id": "grammar-v6-articles-06",
    "level": "level-1",
    "source": "Grammar expansion · articles",
    "raw": "There is error in console.",
    "refined": "There is an error in the console.",
    "patterns": [
      "articles"
    ],
    "why": "The noun needs a determiner so the sentence sounds complete and natural.",
    "cue": "Ask whether this is one item, a known item, or something owned by the context.",
    "reuse": "There is an error in the console.",
    "bad": "error in console",
    "good": "an error in the console",
    "hot": true
  },
  {
    "id": "grammar-v6-articles-07",
    "level": "level-1",
    "source": "Grammar expansion · articles",
    "raw": "The user sees empty page.",
    "refined": "The user sees an empty page.",
    "patterns": [
      "articles"
    ],
    "why": "The noun needs a determiner so the sentence sounds complete and natural.",
    "cue": "Ask whether this is one item, a known item, or something owned by the context.",
    "reuse": "The user sees an empty page after login.",
    "bad": "empty page",
    "good": "an empty page"
  },
  {
    "id": "grammar-v6-preposition-01",
    "level": "level-1",
    "source": "Grammar expansion · preposition chunks",
    "raw": "It depends of the environment.",
    "refined": "It depends on the environment.",
    "patterns": [
      "preposition_chunks"
    ],
    "why": "The grammar is close, but the natural phrase uses a fixed preposition chunk.",
    "cue": "Learn the whole chunk instead of translating the preposition.",
    "reuse": "It depends on the environment.",
    "bad": "depends of",
    "good": "depends on",
    "hot": true
  },
  {
    "id": "grammar-v6-preposition-02",
    "level": "level-1",
    "source": "Grammar expansion · preposition chunks",
    "raw": "I’m working in this task.",
    "refined": "I’m working on this task.",
    "patterns": [
      "preposition_chunks"
    ],
    "why": "The grammar is close, but the natural phrase uses a fixed preposition chunk.",
    "cue": "Learn the whole chunk instead of translating the preposition.",
    "reuse": "I’m working on this task now.",
    "bad": "working in",
    "good": "working on",
    "hot": true
  },
  {
    "id": "grammar-v6-preposition-03",
    "level": "level-1",
    "source": "Grammar expansion · preposition chunks",
    "raw": "The error happens on the modal.",
    "refined": "The error happens in the modal.",
    "patterns": [
      "preposition_chunks"
    ],
    "why": "The grammar is close, but the natural phrase uses a fixed preposition chunk.",
    "cue": "Learn the whole chunk instead of translating the preposition.",
    "reuse": "The error happens in the modal.",
    "bad": "on the modal",
    "good": "in the modal"
  },
  {
    "id": "grammar-v6-preposition-04",
    "level": "level-1",
    "source": "Grammar expansion · preposition chunks",
    "raw": "Let’s discuss about the plan.",
    "refined": "Let’s discuss the plan.",
    "patterns": [
      "preposition_chunks"
    ],
    "why": "The grammar is close, but the natural phrase uses a fixed preposition chunk.",
    "cue": "Learn the whole chunk instead of translating the preposition.",
    "reuse": "Let’s discuss the plan after standup.",
    "bad": "discuss about",
    "good": "discuss",
    "hot": true
  },
  {
    "id": "grammar-v6-preposition-05",
    "level": "level-1",
    "source": "Grammar expansion · preposition chunks",
    "raw": "He explained me the issue.",
    "refined": "He explained the issue to me.",
    "patterns": [
      "preposition_chunks"
    ],
    "why": "The grammar is close, but the natural phrase uses a fixed preposition chunk.",
    "cue": "Learn the whole chunk instead of translating the preposition.",
    "reuse": "He explained the issue to me.",
    "bad": "explained me the issue",
    "good": "explained the issue to me"
  },
  {
    "id": "grammar-v6-preposition-06",
    "level": "level-1",
    "source": "Grammar expansion · preposition chunks",
    "raw": "I’m waiting your feedback.",
    "refined": "I’m waiting for your feedback.",
    "patterns": [
      "preposition_chunks"
    ],
    "why": "The grammar is close, but the natural phrase uses a fixed preposition chunk.",
    "cue": "Learn the whole chunk instead of translating the preposition.",
    "reuse": "I’m waiting for your feedback before merging.",
    "bad": "waiting your feedback",
    "good": "waiting for your feedback"
  },
  {
    "id": "grammar-v6-preposition-07",
    "level": "level-1",
    "source": "Grammar expansion · preposition chunks",
    "raw": "This approach is different of the previous one.",
    "refined": "This approach is different from the previous one.",
    "patterns": [
      "preposition_chunks"
    ],
    "why": "The grammar is close, but the natural phrase uses a fixed preposition chunk.",
    "cue": "Learn the whole chunk instead of translating the preposition.",
    "reuse": "This approach is different from the previous one.",
    "bad": "different of",
    "good": "different from"
  },
  {
    "id": "grammar-v6-preposition-08",
    "level": "level-1",
    "source": "Grammar expansion · preposition chunks",
    "raw": "I’ll add it in the ticket.",
    "refined": "I’ll add it to the ticket.",
    "patterns": [
      "preposition_chunks"
    ],
    "why": "The grammar is close, but the natural phrase uses a fixed preposition chunk.",
    "cue": "Learn the whole chunk instead of translating the preposition.",
    "reuse": "I’ll add it to the ticket.",
    "bad": "in the ticket",
    "good": "to the ticket"
  },
  {
    "id": "grammar-v6-gerund-01",
    "level": "level-1",
    "source": "Grammar expansion · -ing patterns",
    "raw": "We should avoid to reload the page.",
    "refined": "We should avoid reloading the page.",
    "patterns": [
      "gerund_patterns"
    ],
    "why": "The second action needs to become a noun-like -ing phrase.",
    "cue": "After avoid, suggest, finish, mind, and prevent, test the -ing shape.",
    "reuse": "We should avoid reloading the page.",
    "bad": "avoid to reload",
    "good": "avoid reloading",
    "hot": true
  },
  {
    "id": "grammar-v6-gerund-02",
    "level": "level-1",
    "source": "Grammar expansion · -ing patterns",
    "raw": "I suggest to move it later.",
    "refined": "I suggest moving it later.",
    "patterns": [
      "gerund_patterns"
    ],
    "why": "The second action needs to become a noun-like -ing phrase.",
    "cue": "After avoid, suggest, finish, mind, and prevent, test the -ing shape.",
    "reuse": "I suggest moving it later.",
    "bad": "suggest to move",
    "good": "suggest moving"
  },
  {
    "id": "grammar-v6-gerund-03",
    "level": "level-1",
    "source": "Grammar expansion · -ing patterns",
    "raw": "I finished to update the copy.",
    "refined": "I finished updating the copy.",
    "patterns": [
      "gerund_patterns"
    ],
    "why": "The second action needs to become a noun-like -ing phrase.",
    "cue": "After avoid, suggest, finish, mind, and prevent, test the -ing shape.",
    "reuse": "I finished updating the copy.",
    "bad": "finished to update",
    "good": "finished updating"
  },
  {
    "id": "grammar-v6-gerund-04",
    "level": "level-1",
    "source": "Grammar expansion · -ing patterns",
    "raw": "Would you mind to check this?",
    "refined": "Would you mind checking this?",
    "patterns": [
      "gerund_patterns"
    ],
    "why": "The second action needs to become a noun-like -ing phrase.",
    "cue": "After avoid, suggest, finish, mind, and prevent, test the -ing shape.",
    "reuse": "Would you mind checking this?",
    "bad": "mind to check",
    "good": "mind checking"
  },
  {
    "id": "grammar-v6-gerund-05",
    "level": "level-1",
    "source": "Grammar expansion · -ing patterns",
    "raw": "This prevents the user to submit twice.",
    "refined": "This prevents the user from submitting twice.",
    "patterns": [
      "gerund_patterns"
    ],
    "why": "The second action needs to become a noun-like -ing phrase.",
    "cue": "After avoid, suggest, finish, mind, and prevent, test the -ing shape.",
    "reuse": "This prevents the user from submitting twice.",
    "bad": "to submit",
    "good": "from submitting",
    "hot": true
  },
  {
    "id": "grammar-v6-count-mass-01",
    "level": "level-1",
    "source": "Grammar expansion · countability",
    "raw": "Thanks for the advices.",
    "refined": "Thanks for the advice.",
    "patterns": [
      "count_mass"
    ],
    "why": "The meaning is clear, but the noun behaves as countable or uncountable in English.",
    "cue": "Check whether the noun takes plural -s or needs a phrase such as some/a piece of.",
    "reuse": "Thanks for the advice.",
    "bad": "advices",
    "good": "advice",
    "hot": true
  },
  {
    "id": "grammar-v6-count-mass-02",
    "level": "level-1",
    "source": "Grammar expansion · countability",
    "raw": "I need more informations.",
    "refined": "I need more information.",
    "patterns": [
      "count_mass"
    ],
    "why": "The meaning is clear, but the noun behaves as countable or uncountable in English.",
    "cue": "Check whether the noun takes plural -s or needs a phrase such as some/a piece of.",
    "reuse": "I need more information before deciding.",
    "bad": "informations",
    "good": "information",
    "hot": true
  },
  {
    "id": "grammar-v6-count-mass-03",
    "level": "level-1",
    "source": "Grammar expansion · countability",
    "raw": "The equipments are ready.",
    "refined": "The equipment is ready.",
    "patterns": [
      "count_mass"
    ],
    "why": "The meaning is clear, but the noun behaves as countable or uncountable in English.",
    "cue": "Check whether the noun takes plural -s or needs a phrase such as some/a piece of.",
    "reuse": "The equipment is ready.",
    "bad": "equipments are",
    "good": "equipment is"
  },
  {
    "id": "grammar-v6-count-mass-04",
    "level": "level-1",
    "source": "Grammar expansion · countability",
    "raw": "I received many feedbacks.",
    "refined": "I received a lot of feedback.",
    "patterns": [
      "count_mass"
    ],
    "why": "The meaning is clear, but the noun behaves as countable or uncountable in English.",
    "cue": "Check whether the noun takes plural -s or needs a phrase such as some/a piece of.",
    "reuse": "I received a lot of feedback on the proposal.",
    "bad": "many feedbacks",
    "good": "a lot of feedback"
  },
  {
    "id": "grammar-v6-collocation-01",
    "level": "level-1",
    "source": "Grammar expansion · natural chunks",
    "raw": "Can you do a review of this?",
    "refined": "Could you review this?",
    "patterns": [
      "collocation"
    ],
    "why": "This is a natural-chunk issue: the words work better as a stored expression.",
    "cue": "Store the useful phrase as one block and reuse it under pressure.",
    "reuse": "Could you review this when you have a moment?",
    "bad": "do a review of this",
    "good": "review this",
    "hot": true
  },
  {
    "id": "grammar-v6-collocation-02",
    "level": "level-1",
    "source": "Grammar expansion · natural chunks",
    "raw": "I need to take a decision.",
    "refined": "I need to make a decision.",
    "patterns": [
      "collocation"
    ],
    "why": "This is a natural-chunk issue: the words work better as a stored expression.",
    "cue": "Store the useful phrase as one block and reuse it under pressure.",
    "reuse": "I need to make a decision by Friday.",
    "bad": "take a decision",
    "good": "make a decision",
    "hot": true
  },
  {
    "id": "grammar-v6-collocation-03",
    "level": "level-1",
    "source": "Grammar expansion · natural chunks",
    "raw": "Let’s make a call tomorrow.",
    "refined": "Let’s have a call tomorrow.",
    "patterns": [
      "collocation"
    ],
    "why": "This is a natural-chunk issue: the words work better as a stored expression.",
    "cue": "Store the useful phrase as one block and reuse it under pressure.",
    "reuse": "Let’s have a call tomorrow.",
    "bad": "make a call",
    "good": "have a call"
  },
  {
    "id": "work-v6-comma-bridge-01",
    "level": "level-2",
    "source": "Workplace expansion · sentence bridge",
    "raw": "The build is ready, I will share it.",
    "refined": "The build is ready; I will share it.",
    "patterns": [
      "comma_bridge"
    ],
    "why": "Two complete thoughts need a stronger bridge than a comma.",
    "cue": "Use a period, semicolon, or connector such as so, because, then, or however.",
    "reuse": "The build is ready; I will share it.",
    "bad": ",",
    "good": ";",
    "hot": true
  },
  {
    "id": "work-v6-comma-bridge-02",
    "level": "level-2",
    "source": "Workplace expansion · sentence bridge",
    "raw": "The bug is fixed, we can retest.",
    "refined": "The bug is fixed; we can retest.",
    "patterns": [
      "comma_bridge"
    ],
    "why": "Two complete thoughts need a stronger bridge than a comma.",
    "cue": "Use a period, semicolon, or connector such as so, because, then, or however.",
    "reuse": "The bug is fixed; we can retest.",
    "bad": ",",
    "good": ";"
  },
  {
    "id": "work-v6-comma-bridge-03",
    "level": "level-2",
    "source": "Workplace expansion · sentence bridge",
    "raw": "I checked the logs, there is no error.",
    "refined": "I checked the logs; there is no error.",
    "patterns": [
      "comma_bridge"
    ],
    "why": "Two complete thoughts need a stronger bridge than a comma.",
    "cue": "Use a period, semicolon, or connector such as so, because, then, or however.",
    "reuse": "I checked the logs; there is no error.",
    "bad": ",",
    "good": ";",
    "hot": true
  },
  {
    "id": "work-v6-comma-bridge-04",
    "level": "level-2",
    "source": "Workplace expansion · sentence bridge",
    "raw": "The deadline changed, we need to update the plan.",
    "refined": "The deadline changed, so we need to update the plan.",
    "patterns": [
      "comma_bridge"
    ],
    "why": "Two complete thoughts need a stronger bridge than a comma.",
    "cue": "Use a period, semicolon, or connector such as so, because, then, or however.",
    "reuse": "The deadline changed, so we need to update the plan.",
    "bad": ", we",
    "good": ", so we"
  },
  {
    "id": "work-v6-comma-bridge-05",
    "level": "level-2",
    "source": "Workplace expansion · sentence bridge",
    "raw": "The branch is old, I will rebase it.",
    "refined": "The branch is old, so I will rebase it.",
    "patterns": [
      "comma_bridge"
    ],
    "why": "Two complete thoughts need a stronger bridge than a comma.",
    "cue": "Use a period, semicolon, or connector such as so, because, then, or however.",
    "reuse": "The branch is old, so I will rebase it.",
    "bad": ", I",
    "good": ", so I"
  },
  {
    "id": "work-v6-comma-bridge-06",
    "level": "level-2",
    "source": "Workplace expansion · sentence bridge",
    "raw": "The API is slow, the UI waits too long.",
    "refined": "The API is slow; the UI waits too long.",
    "patterns": [
      "comma_bridge"
    ],
    "why": "Two complete thoughts need a stronger bridge than a comma.",
    "cue": "Use a period, semicolon, or connector such as so, because, then, or however.",
    "reuse": "The API is slow; the UI waits too long.",
    "bad": ",",
    "good": ";"
  },
  {
    "id": "work-v6-comma-bridge-07",
    "level": "level-2",
    "source": "Workplace expansion · sentence bridge",
    "raw": "The copy is updated, nothing else changed.",
    "refined": "The copy is updated; nothing else changed.",
    "patterns": [
      "comma_bridge"
    ],
    "why": "Two complete thoughts need a stronger bridge than a comma.",
    "cue": "Use a period, semicolon, or connector such as so, because, then, or however.",
    "reuse": "The copy is updated; nothing else changed.",
    "bad": ",",
    "good": ";"
  },
  {
    "id": "work-v6-comma-bridge-08",
    "level": "level-2",
    "source": "Workplace expansion · sentence bridge",
    "raw": "I agree with the approach, it keeps the flow simple.",
    "refined": "I agree with the approach because it keeps the flow simple.",
    "patterns": [
      "comma_bridge"
    ],
    "why": "Two complete thoughts need a stronger bridge than a comma.",
    "cue": "Use a period, semicolon, or connector such as so, because, then, or however.",
    "reuse": "I agree with the approach because it keeps the flow simple.",
    "bad": ", it",
    "good": " because it"
  },
  {
    "id": "work-v6-concision-01",
    "level": "level-2",
    "source": "Workplace expansion · concise update",
    "raw": "I am writing here to say that I completed the update.",
    "refined": "I completed the update.",
    "patterns": [
      "concision"
    ],
    "why": "The message has useful content, but the refined version removes extra scaffolding.",
    "cue": "Keep action, reason, and next step; cut the words around them.",
    "reuse": "I completed the update.",
    "bad": "I am writing here to say that ",
    "good": "I completed"
  },
  {
    "id": "work-v6-concision-02",
    "level": "level-2",
    "source": "Workplace expansion · concise update",
    "raw": "Just to let you know, I think the issue is fixed.",
    "refined": "I think the issue is fixed.",
    "patterns": [
      "concision"
    ],
    "why": "The message has useful content, but the refined version removes extra scaffolding.",
    "cue": "Keep action, reason, and next step; cut the words around them.",
    "reuse": "I think the issue is fixed.",
    "bad": "Just to let you know, ",
    "good": "I think",
    "hot": true
  },
  {
    "id": "work-v6-concision-03",
    "level": "level-2",
    "source": "Workplace expansion · concise update",
    "raw": "I wanted to ask if maybe you can check this.",
    "refined": "Could you check this?",
    "patterns": [
      "concision",
      "register"
    ],
    "why": "The message has useful content, but the refined version removes extra scaffolding.",
    "cue": "Keep action, reason, and next step; cut the words around them.",
    "reuse": "Could you check this?",
    "bad": "I wanted to ask if maybe you can",
    "good": "Could you",
    "hot": true
  },
  {
    "id": "work-v6-concision-04",
    "level": "level-2",
    "source": "Workplace expansion · concise update",
    "raw": "From my side, the only thing that is missing is the review.",
    "refined": "Only the review is missing.",
    "patterns": [
      "concision"
    ],
    "why": "The message has useful content, but the refined version removes extra scaffolding.",
    "cue": "Keep action, reason, and next step; cut the words around them.",
    "reuse": "Only the review is missing.",
    "bad": "From my side, the only thing that is missing is",
    "good": "Only"
  },
  {
    "id": "work-v6-concision-05",
    "level": "level-2",
    "source": "Workplace expansion · concise update",
    "raw": "I did some investigation and found that the issue is in the cache.",
    "refined": "I traced the issue to the cache.",
    "patterns": [
      "concision"
    ],
    "why": "The message has useful content, but the refined version removes extra scaffolding.",
    "cue": "Keep action, reason, and next step; cut the words around them.",
    "reuse": "I traced the issue to the cache.",
    "bad": "did some investigation and found that the issue is in",
    "good": "traced the issue to"
  },
  {
    "id": "work-v6-concision-06",
    "level": "level-2",
    "source": "Workplace expansion · concise update",
    "raw": "There is one thing that I think we need to decide.",
    "refined": "We need to decide one thing.",
    "patterns": [
      "concision"
    ],
    "why": "The message has useful content, but the refined version removes extra scaffolding.",
    "cue": "Keep action, reason, and next step; cut the words around them.",
    "reuse": "We need to decide one thing.",
    "bad": "There is one thing that I think we need to decide",
    "good": "We need to decide one thing"
  },
  {
    "id": "work-v6-concision-07",
    "level": "level-2",
    "source": "Workplace expansion · concise update",
    "raw": "I was checking and it seems that the button is not visible.",
    "refined": "The button does not appear to be visible.",
    "patterns": [
      "concision"
    ],
    "why": "The message has useful content, but the refined version removes extra scaffolding.",
    "cue": "Keep action, reason, and next step; cut the words around them.",
    "reuse": "The button does not appear to be visible.",
    "bad": "I was checking and it seems that ",
    "good": "The button"
  },
  {
    "id": "work-v6-concision-08",
    "level": "level-2",
    "source": "Workplace expansion · concise update",
    "raw": "The main idea here is that we need to keep the same behavior.",
    "refined": "We need to keep the same behavior.",
    "patterns": [
      "concision"
    ],
    "why": "The message has useful content, but the refined version removes extra scaffolding.",
    "cue": "Keep action, reason, and next step; cut the words around them.",
    "reuse": "We need to keep the same behavior.",
    "bad": "The main idea here is that ",
    "good": "We need"
  },
  {
    "id": "work-v6-concision-09",
    "level": "level-2",
    "source": "Workplace expansion · concise update",
    "raw": "I think it would be good if we could maybe simplify this.",
    "refined": "We should simplify this.",
    "patterns": [
      "concision",
      "register"
    ],
    "why": "The message has useful content, but the refined version removes extra scaffolding.",
    "cue": "Keep action, reason, and next step; cut the words around them.",
    "reuse": "We should simplify this.",
    "bad": "I think it would be good if we could maybe",
    "good": "We should",
    "hot": true
  },
  {
    "id": "work-v6-concision-10",
    "level": "level-2",
    "source": "Workplace expansion · concise update",
    "raw": "This is the current state from what I can see.",
    "refined": "This is the current state.",
    "patterns": [
      "concision"
    ],
    "why": "The message has useful content, but the refined version removes extra scaffolding.",
    "cue": "Keep action, reason, and next step; cut the words around them.",
    "reuse": "This is the current state.",
    "bad": " from what I can see",
    "good": "This is"
  },
  {
    "id": "work-v6-concision-11",
    "level": "level-2",
    "source": "Workplace expansion · concise update",
    "raw": "I only changed the small part related to the label.",
    "refined": "I only changed the label.",
    "patterns": [
      "concision"
    ],
    "why": "The message has useful content, but the refined version removes extra scaffolding.",
    "cue": "Keep action, reason, and next step; cut the words around them.",
    "reuse": "I only changed the label.",
    "bad": "the small part related to the ",
    "good": "label"
  },
  {
    "id": "work-v6-concision-12",
    "level": "level-2",
    "source": "Workplace expansion · concise update",
    "raw": "I will continue working on this after I finish the review.",
    "refined": "I’ll continue after the review.",
    "patterns": [
      "concision"
    ],
    "why": "The message has useful content, but the refined version removes extra scaffolding.",
    "cue": "Keep action, reason, and next step; cut the words around them.",
    "reuse": "I’ll continue after the review.",
    "bad": "working on this after I finish the ",
    "good": "after the "
  },
  {
    "id": "work-v6-concision-13",
    "level": "level-2",
    "source": "Workplace expansion · concise update",
    "raw": "The reason is because the modal opens twice.",
    "refined": "The reason is that the modal opens twice.",
    "patterns": [
      "concision"
    ],
    "why": "The message has useful content, but the refined version removes extra scaffolding.",
    "cue": "Keep action, reason, and next step; cut the words around them.",
    "reuse": "The reason is that the modal opens twice.",
    "bad": "because",
    "good": "that"
  },
  {
    "id": "work-v6-concision-14",
    "level": "level-2",
    "source": "Workplace expansion · concise update",
    "raw": "I can take a look and try to understand what is happening.",
    "refined": "I can investigate it.",
    "patterns": [
      "concision"
    ],
    "why": "The message has useful content, but the refined version removes extra scaffolding.",
    "cue": "Keep action, reason, and next step; cut the words around them.",
    "reuse": "I can investigate it.",
    "bad": "take a look and try to understand what is happening",
    "good": "investigate it"
  },
  {
    "id": "work-v6-concision-15",
    "level": "level-2",
    "source": "Workplace expansion · concise update",
    "raw": "The problem happens when the user clicks very fast.",
    "refined": "The issue happens on rapid clicks.",
    "patterns": [
      "concision"
    ],
    "why": "The message has useful content, but the refined version removes extra scaffolding.",
    "cue": "Keep action, reason, and next step; cut the words around them.",
    "reuse": "The issue happens on rapid clicks.",
    "bad": "problem happens when the user clicks very fast",
    "good": "issue happens on rapid clicks"
  },
  {
    "id": "work-v6-register-01",
    "level": "level-2",
    "source": "Workplace expansion · tone tuning",
    "raw": "Fix this today.",
    "refined": "Could you take this today?",
    "patterns": [
      "register"
    ],
    "why": "The refined version keeps the ask clear while making the tone easier to receive.",
    "cue": "Use could/would, evidence language, and one clear next step.",
    "reuse": "Could you take this today, or suggest another owner?",
    "bad": "Fix this today",
    "good": "Could you take this today",
    "hot": true
  },
  {
    "id": "work-v6-register-02",
    "level": "level-2",
    "source": "Workplace expansion · tone tuning",
    "raw": "You forgot to update it.",
    "refined": "I noticed this still needs an update.",
    "patterns": [
      "register",
      "nvc_observation"
    ],
    "why": "The refined version keeps the ask clear while making the tone easier to receive.",
    "cue": "Use could/would, evidence language, and one clear next step.",
    "reuse": "I noticed this still needs an update.",
    "bad": "You forgot to update it",
    "good": "I noticed this still needs an update"
  },
  {
    "id": "work-v6-register-03",
    "level": "level-2",
    "source": "Workplace expansion · tone tuning",
    "raw": "This is not working.",
    "refined": "I’m seeing this fail in the checkout flow.",
    "patterns": [
      "register",
      "nvc_observation"
    ],
    "why": "The refined version keeps the ask clear while making the tone easier to receive.",
    "cue": "Use could/would, evidence language, and one clear next step.",
    "reuse": "I’m seeing this fail in the checkout flow.",
    "bad": "This is not working",
    "good": "I’m seeing this fail in the checkout flow",
    "hot": true
  },
  {
    "id": "work-v6-register-04",
    "level": "level-2",
    "source": "Workplace expansion · tone tuning",
    "raw": "Can you answer?",
    "refined": "Could you reply when you have a moment?",
    "patterns": [
      "register"
    ],
    "why": "The refined version keeps the ask clear while making the tone easier to receive.",
    "cue": "Use could/would, evidence language, and one clear next step.",
    "reuse": "Could you reply when you have a moment?",
    "bad": "Can you answer",
    "good": "Could you reply when you have a moment"
  },
  {
    "id": "work-v6-register-05",
    "level": "level-2",
    "source": "Workplace expansion · tone tuning",
    "raw": "It is your fault.",
    "refined": "It looks like this happened during the last update; could we check it together?",
    "patterns": [
      "register",
      "nvc_observation"
    ],
    "why": "The refined version keeps the ask clear while making the tone easier to receive.",
    "cue": "Use could/would, evidence language, and one clear next step.",
    "reuse": "It looks like this happened during the last update; could we check it together?",
    "bad": "It is your fault",
    "good": "It looks like this happened during the last update; could we check it together"
  },
  {
    "id": "work-v6-register-06",
    "level": "level-2",
    "source": "Workplace expansion · tone tuning",
    "raw": "Why is this late?",
    "refined": "Do you have an updated ETA?",
    "patterns": [
      "register"
    ],
    "why": "The refined version keeps the ask clear while making the tone easier to receive.",
    "cue": "Use could/would, evidence language, and one clear next step.",
    "reuse": "Do you have an updated ETA?",
    "bad": "Why is this late",
    "good": "Do you have an updated ETA",
    "hot": true
  },
  {
    "id": "work-v6-register-07",
    "level": "level-2",
    "source": "Workplace expansion · tone tuning",
    "raw": "Send me the file.",
    "refined": "Could you send me the file when you have a chance?",
    "patterns": [
      "register"
    ],
    "why": "The refined version keeps the ask clear while making the tone easier to receive.",
    "cue": "Use could/would, evidence language, and one clear next step.",
    "reuse": "Could you send me the file when you have a chance?",
    "bad": "Send me the file",
    "good": "Could you send me the file when you have a chance"
  },
  {
    "id": "work-v6-register-08",
    "level": "level-2",
    "source": "Workplace expansion · tone tuning",
    "raw": "You need to test it.",
    "refined": "Could you add test notes before we merge?",
    "patterns": [
      "register"
    ],
    "why": "The refined version keeps the ask clear while making the tone easier to receive.",
    "cue": "Use could/would, evidence language, and one clear next step.",
    "reuse": "Could you add test notes before we merge?",
    "bad": "You need to test it",
    "good": "Could you add test notes before we merge"
  },
  {
    "id": "work-v6-register-09",
    "level": "level-2",
    "source": "Workplace expansion · tone tuning",
    "raw": "That makes no sense.",
    "refined": "I’m not following the reasoning yet.",
    "patterns": [
      "register"
    ],
    "why": "The refined version keeps the ask clear while making the tone easier to receive.",
    "cue": "Use could/would, evidence language, and one clear next step.",
    "reuse": "I’m not following the reasoning yet.",
    "bad": "That makes no sense",
    "good": "I’m not following the reasoning yet"
  },
  {
    "id": "work-v6-register-10",
    "level": "level-2",
    "source": "Workplace expansion · tone tuning",
    "raw": "This is bad.",
    "refined": "I’m concerned about this approach.",
    "patterns": [
      "register"
    ],
    "why": "The refined version keeps the ask clear while making the tone easier to receive.",
    "cue": "Use could/would, evidence language, and one clear next step.",
    "reuse": "I’m concerned about this approach.",
    "bad": "This is bad",
    "good": "I’m concerned about this approach"
  },
  {
    "id": "work-v6-register-11",
    "level": "level-2",
    "source": "Workplace expansion · tone tuning",
    "raw": "You should know this.",
    "refined": "I may be missing context here.",
    "patterns": [
      "register"
    ],
    "why": "The refined version keeps the ask clear while making the tone easier to receive.",
    "cue": "Use could/would, evidence language, and one clear next step.",
    "reuse": "I may be missing context here.",
    "bad": "You should know this",
    "good": "I may be missing context here"
  },
  {
    "id": "work-v6-register-12",
    "level": "level-2",
    "source": "Workplace expansion · tone tuning",
    "raw": "You are blocking me.",
    "refined": "I’m blocked on this until I get the review.",
    "patterns": [
      "register",
      "nvc_observation"
    ],
    "why": "The refined version keeps the ask clear while making the tone easier to receive.",
    "cue": "Use could/would, evidence language, and one clear next step.",
    "reuse": "I’m blocked on this until I get the review.",
    "bad": "You are blocking me",
    "good": "I’m blocked on this until I get the review"
  },
  {
    "id": "work-v6-register-13",
    "level": "level-2",
    "source": "Workplace expansion · tone tuning",
    "raw": "Do it again.",
    "refined": "Could you rerun it once more?",
    "patterns": [
      "register"
    ],
    "why": "The refined version keeps the ask clear while making the tone easier to receive.",
    "cue": "Use could/would, evidence language, and one clear next step.",
    "reuse": "Could you rerun it once more?",
    "bad": "Do it again",
    "good": "Could you rerun it once more"
  },
  {
    "id": "work-v6-register-14",
    "level": "level-2",
    "source": "Workplace expansion · tone tuning",
    "raw": "This is confusing.",
    "refined": "I’m having trouble following the current flow.",
    "patterns": [
      "register",
      "nvc_observation"
    ],
    "why": "The refined version keeps the ask clear while making the tone easier to receive.",
    "cue": "Use could/would, evidence language, and one clear next step.",
    "reuse": "I’m having trouble following the current flow.",
    "bad": "This is confusing",
    "good": "I’m having trouble following the current flow"
  },
  {
    "id": "work-v6-register-15",
    "level": "level-2",
    "source": "Workplace expansion · tone tuning",
    "raw": "You changed too much.",
    "refined": "This change touches more areas than I expected.",
    "patterns": [
      "register",
      "nvc_observation"
    ],
    "why": "The refined version keeps the ask clear while making the tone easier to receive.",
    "cue": "Use could/would, evidence language, and one clear next step.",
    "reuse": "This change touches more areas than I expected.",
    "bad": "You changed too much",
    "good": "This change touches more areas than I expected"
  },
  {
    "id": "work-v6-word-choice-01",
    "level": "level-2",
    "source": "Workplace expansion · word choice",
    "raw": "I will investigate the problem deeply.",
    "refined": "I will look into the issue.",
    "patterns": [
      "word_choice"
    ],
    "why": "The original is understandable, but the refined phrase is the word a tutor or teammate would expect.",
    "cue": "Pick the workplace chunk that native speakers use in the same situation.",
    "reuse": "I’ll look into the issue.",
    "bad": "investigate the problem deeply",
    "good": "look into the issue",
    "hot": true
  },
  {
    "id": "work-v6-word-choice-02",
    "level": "level-2",
    "source": "Workplace expansion · word choice",
    "raw": "This solution is very heavy.",
    "refined": "This solution is too complex.",
    "patterns": [
      "word_choice"
    ],
    "why": "The original is understandable, but the refined phrase is the word a tutor or teammate would expect.",
    "cue": "Pick the workplace chunk that native speakers use in the same situation.",
    "reuse": "This solution is too complex for this flow.",
    "bad": "very heavy",
    "good": "too complex"
  },
  {
    "id": "work-v6-word-choice-03",
    "level": "level-2",
    "source": "Workplace expansion · word choice",
    "raw": "The page is broken in mobile.",
    "refined": "The page breaks on mobile.",
    "patterns": [
      "word_choice"
    ],
    "why": "The original is understandable, but the refined phrase is the word a tutor or teammate would expect.",
    "cue": "Pick the workplace chunk that native speakers use in the same situation.",
    "reuse": "The page breaks on mobile.",
    "bad": "broken in mobile",
    "good": "breaks on mobile"
  },
  {
    "id": "work-v6-word-choice-04",
    "level": "level-2",
    "source": "Workplace expansion · word choice",
    "raw": "I am blocked by this doubt.",
    "refined": "I’m blocked by this question.",
    "patterns": [
      "word_choice"
    ],
    "why": "The original is understandable, but the refined phrase is the word a tutor or teammate would expect.",
    "cue": "Pick the workplace chunk that native speakers use in the same situation.",
    "reuse": "I’m blocked by this question.",
    "bad": "this doubt",
    "good": "this question"
  },
  {
    "id": "work-v6-word-choice-05",
    "level": "level-2",
    "source": "Workplace expansion · word choice",
    "raw": "I will align with you later.",
    "refined": "I will sync with you later.",
    "patterns": [
      "word_choice"
    ],
    "why": "The original is understandable, but the refined phrase is the word a tutor or teammate would expect.",
    "cue": "Pick the workplace chunk that native speakers use in the same situation.",
    "reuse": "I’ll sync with you later.",
    "bad": "align with you",
    "good": "sync with you"
  },
  {
    "id": "work-v6-word-choice-06",
    "level": "level-2",
    "source": "Workplace expansion · word choice",
    "raw": "The feature is released to test.",
    "refined": "The feature is available for testing.",
    "patterns": [
      "word_choice"
    ],
    "why": "The original is understandable, but the refined phrase is the word a tutor or teammate would expect.",
    "cue": "Pick the workplace chunk that native speakers use in the same situation.",
    "reuse": "The feature is available for testing.",
    "bad": "released to test",
    "good": "available for testing",
    "hot": true
  },
  {
    "id": "work-v6-word-choice-07",
    "level": "level-2",
    "source": "Workplace expansion · word choice",
    "raw": "I moved the thing to another place.",
    "refined": "I moved the component to another section.",
    "patterns": [
      "word_choice"
    ],
    "why": "The original is understandable, but the refined phrase is the word a tutor or teammate would expect.",
    "cue": "Pick the workplace chunk that native speakers use in the same situation.",
    "reuse": "I moved the component to another section.",
    "bad": "the thing to another place",
    "good": "the component to another section"
  },
  {
    "id": "work-v6-word-choice-08",
    "level": "level-2",
    "source": "Workplace expansion · word choice",
    "raw": "The task is on doing.",
    "refined": "The task is in progress.",
    "patterns": [
      "word_choice"
    ],
    "why": "The original is understandable, but the refined phrase is the word a tutor or teammate would expect.",
    "cue": "Pick the workplace chunk that native speakers use in the same situation.",
    "reuse": "The task is in progress.",
    "bad": "on doing",
    "good": "in progress"
  },
  {
    "id": "work-v6-tech-naming-01",
    "level": "level-2",
    "source": "Workplace expansion · tech naming",
    "raw": "The javascript file was updated.",
    "refined": "The JavaScript file was updated.",
    "patterns": [
      "tech_naming"
    ],
    "why": "The sentence is mostly fine, but exact technical casing matters.",
    "cue": "Scan API names, file names, and package names before grammar polishing.",
    "reuse": "The JavaScript file was updated.",
    "bad": "javascript",
    "good": "JavaScript",
    "hot": true
  },
  {
    "id": "work-v6-tech-naming-02",
    "level": "level-2",
    "source": "Workplace expansion · tech naming",
    "raw": "This react component needs a prop.",
    "refined": "This React component needs a prop.",
    "patterns": [
      "tech_naming"
    ],
    "why": "The sentence is mostly fine, but exact technical casing matters.",
    "cue": "Scan API names, file names, and package names before grammar polishing.",
    "reuse": "This React component needs a prop.",
    "bad": "react component",
    "good": "React component"
  },
  {
    "id": "work-v6-tech-naming-03",
    "level": "level-2",
    "source": "Workplace expansion · tech naming",
    "raw": "The app scss file changed.",
    "refined": "The App.scss file changed.",
    "patterns": [
      "tech_naming"
    ],
    "why": "The sentence is mostly fine, but exact technical casing matters.",
    "cue": "Scan API names, file names, and package names before grammar polishing.",
    "reuse": "The App.scss file changed.",
    "bad": "app scss",
    "good": "App.scss"
  },
  {
    "id": "work-v6-tech-naming-04",
    "level": "level-2",
    "source": "Workplace expansion · tech naming",
    "raw": "Use local storage for the preference.",
    "refined": "Use localStorage for the preference.",
    "patterns": [
      "tech_naming"
    ],
    "why": "The sentence is mostly fine, but exact technical casing matters.",
    "cue": "Scan API names, file names, and package names before grammar polishing.",
    "reuse": "Use localStorage for the preference.",
    "bad": "local storage",
    "good": "localStorage",
    "hot": true
  },
  {
    "id": "work-v6-tech-naming-05",
    "level": "level-2",
    "source": "Workplace expansion · tech naming",
    "raw": "The json file is invalid.",
    "refined": "The JSON file is invalid.",
    "patterns": [
      "tech_naming"
    ],
    "why": "The sentence is mostly fine, but exact technical casing matters.",
    "cue": "Scan API names, file names, and package names before grammar polishing.",
    "reuse": "The JSON file is invalid.",
    "bad": "json",
    "good": "JSON"
  },
  {
    "id": "work-v6-tech-naming-06",
    "level": "level-2",
    "source": "Workplace expansion · tech naming",
    "raw": "The readme needs the preview link.",
    "refined": "The README needs the preview link.",
    "patterns": [
      "tech_naming"
    ],
    "why": "The sentence is mostly fine, but exact technical casing matters.",
    "cue": "Scan API names, file names, and package names before grammar polishing.",
    "reuse": "The README needs the preview link.",
    "bad": "readme",
    "good": "README"
  },
  {
    "id": "work-v6-privacy-safe-01",
    "level": "level-2",
    "source": "Workplace expansion · privacy-safe wording",
    "raw": "Use the real customer name in the example.",
    "refined": "Use a generic customer account in the example.",
    "patterns": [
      "privacy_safe"
    ],
    "why": "The content can teach the pattern without exposing private details.",
    "cue": "Replace real names, hosts, accounts, and tokens with safe generic placeholders.",
    "reuse": "Use a generic customer account in the example.",
    "bad": "the real customer name",
    "good": "a generic customer account",
    "hot": true
  },
  {
    "id": "work-v6-privacy-safe-02",
    "level": "level-2",
    "source": "Workplace expansion · privacy-safe wording",
    "raw": "The example includes a private URL.",
    "refined": "The example uses a staging preview placeholder.",
    "patterns": [
      "privacy_safe"
    ],
    "why": "The content can teach the pattern without exposing private details.",
    "cue": "Replace real names, hosts, accounts, and tokens with safe generic placeholders.",
    "reuse": "The example uses a staging preview placeholder.",
    "bad": "includes a private URL",
    "good": "uses a staging preview placeholder",
    "hot": true
  },
  {
    "id": "work-v6-privacy-safe-03",
    "level": "level-2",
    "source": "Workplace expansion · privacy-safe wording",
    "raw": "Keep the internal channel name in the card.",
    "refined": "Replace the internal channel name with a generic channel.",
    "patterns": [
      "privacy_safe"
    ],
    "why": "The content can teach the pattern without exposing private details.",
    "cue": "Replace real names, hosts, accounts, and tokens with safe generic placeholders.",
    "reuse": "Replace the internal channel name with a generic channel.",
    "bad": "Keep",
    "good": "Replace"
  },
  {
    "id": "work-v6-privacy-safe-04",
    "level": "level-2",
    "source": "Workplace expansion · privacy-safe wording",
    "raw": "This card mentions the vendor account.",
    "refined": "This card mentions a generic external account.",
    "patterns": [
      "privacy_safe"
    ],
    "why": "The content can teach the pattern without exposing private details.",
    "cue": "Replace real names, hosts, accounts, and tokens with safe generic placeholders.",
    "reuse": "This card mentions a generic external account.",
    "bad": "the vendor account",
    "good": "a generic external account"
  },
  {
    "id": "work-v6-privacy-safe-05",
    "level": "level-2",
    "source": "Workplace expansion · privacy-safe wording",
    "raw": "The log shows the user email.",
    "refined": "The log shows a placeholder email.",
    "patterns": [
      "privacy_safe"
    ],
    "why": "The content can teach the pattern without exposing private details.",
    "cue": "Replace real names, hosts, accounts, and tokens with safe generic placeholders.",
    "reuse": "The log shows a placeholder email.",
    "bad": "the user email",
    "good": "a placeholder email"
  },
  {
    "id": "work-v6-privacy-safe-06",
    "level": "level-2",
    "source": "Workplace expansion · privacy-safe wording",
    "raw": "Use the production host as an example.",
    "refined": "Use a generic host placeholder as an example.",
    "patterns": [
      "privacy_safe"
    ],
    "why": "The content can teach the pattern without exposing private details.",
    "cue": "Replace real names, hosts, accounts, and tokens with safe generic placeholders.",
    "reuse": "Use a generic host placeholder as an example.",
    "bad": "the production host",
    "good": "a generic host placeholder"
  },
  {
    "id": "work-v6-privacy-safe-07",
    "level": "level-2",
    "source": "Workplace expansion · privacy-safe wording",
    "raw": "The note contains an access token.",
    "refined": "The note contains a placeholder token.",
    "patterns": [
      "privacy_safe"
    ],
    "why": "The content can teach the pattern without exposing private details.",
    "cue": "Replace real names, hosts, accounts, and tokens with safe generic placeholders.",
    "reuse": "The note contains a placeholder token.",
    "bad": "an access token",
    "good": "a placeholder token",
    "hot": true
  },
  {
    "id": "work-v6-privacy-safe-08",
    "level": "level-2",
    "source": "Workplace expansion · privacy-safe wording",
    "raw": "The card exposes the account ID.",
    "refined": "The card uses a generic account ID.",
    "patterns": [
      "privacy_safe"
    ],
    "why": "The content can teach the pattern without exposing private details.",
    "cue": "Replace real names, hosts, accounts, and tokens with safe generic placeholders.",
    "reuse": "The card uses a generic account ID.",
    "bad": "exposes the account ID",
    "good": "uses a generic account ID"
  },
  {
    "id": "small-v6-opener-01",
    "level": "level-3",
    "source": "Small talk expansion · opener",
    "raw": "How are you?",
    "refined": "How’s your day going so far?",
    "patterns": [
      "small_openers"
    ],
    "why": "The opener becomes easier to answer when it invites a small story.",
    "cue": "Ask something light, answerable, and tied to the moment.",
    "reuse": "How’s your day going so far?",
    "bad": "How are you",
    "good": "How’s your day going so far",
    "hot": true
  },
  {
    "id": "small-v6-opener-02",
    "level": "level-3",
    "source": "Small talk expansion · opener",
    "raw": "What did you do today?",
    "refined": "What have you been up to today?",
    "patterns": [
      "small_openers",
      "question_order"
    ],
    "why": "The opener becomes easier to answer when it invites a small story.",
    "cue": "Ask something light, answerable, and tied to the moment.",
    "reuse": "What have you been up to today?",
    "bad": "What did you do",
    "good": "What have you been up to"
  },
  {
    "id": "small-v6-opener-03",
    "level": "level-3",
    "source": "Small talk expansion · opener",
    "raw": "Do you like the event?",
    "refined": "How are you finding the event so far?",
    "patterns": [
      "small_openers"
    ],
    "why": "The opener becomes easier to answer when it invites a small story.",
    "cue": "Ask something light, answerable, and tied to the moment.",
    "reuse": "How are you finding the event so far?",
    "bad": "Do you like",
    "good": "How are you finding",
    "hot": true
  },
  {
    "id": "small-v6-opener-04",
    "level": "level-3",
    "source": "Small talk expansion · opener",
    "raw": "Where are you from?",
    "refined": "Where are you joining from today?",
    "patterns": [
      "small_openers"
    ],
    "why": "The opener becomes easier to answer when it invites a small story.",
    "cue": "Ask something light, answerable, and tied to the moment.",
    "reuse": "Where are you joining from today?",
    "bad": "from",
    "good": "joining from today"
  },
  {
    "id": "small-v6-opener-05",
    "level": "level-3",
    "source": "Small talk expansion · opener",
    "raw": "Is everything good?",
    "refined": "How’s everything going on your side?",
    "patterns": [
      "small_openers"
    ],
    "why": "The opener becomes easier to answer when it invites a small story.",
    "cue": "Ask something light, answerable, and tied to the moment.",
    "reuse": "How’s everything going on your side?",
    "bad": "Is everything good",
    "good": "How’s everything going on your side"
  },
  {
    "id": "small-v6-opener-06",
    "level": "level-3",
    "source": "Small talk expansion · opener",
    "raw": "Are you having a good week?",
    "refined": "How’s your week going so far?",
    "patterns": [
      "small_openers"
    ],
    "why": "The opener becomes easier to answer when it invites a small story.",
    "cue": "Ask something light, answerable, and tied to the moment.",
    "reuse": "How’s your week going so far?",
    "bad": "Are you having a good week",
    "good": "How’s your week going so far"
  },
  {
    "id": "small-v6-opener-07",
    "level": "level-3",
    "source": "Small talk expansion · opener",
    "raw": "You had lunch?",
    "refined": "Have you had a chance to grab lunch?",
    "patterns": [
      "small_openers",
      "question_order"
    ],
    "why": "The opener becomes easier to answer when it invites a small story.",
    "cue": "Ask something light, answerable, and tied to the moment.",
    "reuse": "Have you had a chance to grab lunch?",
    "bad": "You had lunch",
    "good": "Have you had a chance to grab lunch"
  },
  {
    "id": "small-v6-opener-08",
    "level": "level-3",
    "source": "Small talk expansion · opener",
    "raw": "Did you rest?",
    "refined": "Did you get any time to recharge?",
    "patterns": [
      "small_openers"
    ],
    "why": "The opener becomes easier to answer when it invites a small story.",
    "cue": "Ask something light, answerable, and tied to the moment.",
    "reuse": "Did you get any time to recharge?",
    "bad": "Did you rest",
    "good": "Did you get any time to recharge"
  },
  {
    "id": "small-v6-followup-01",
    "level": "level-3",
    "source": "Small talk expansion · follow-up",
    "raw": "Cool.",
    "refined": "Cool — what got you interested in that?",
    "patterns": [
      "small_followup"
    ],
    "why": "A follow-up shows you listened and keeps the conversation alive.",
    "cue": "Pick one detail from their answer and ask about that detail.",
    "reuse": "Cool — what got you interested in that?",
    "bad": ".",
    "good": " — what got you interested in that?",
    "hot": true
  },
  {
    "id": "small-v6-followup-02",
    "level": "level-3",
    "source": "Small talk expansion · follow-up",
    "raw": "Nice.",
    "refined": "Nice — how did it go?",
    "patterns": [
      "small_followup"
    ],
    "why": "A follow-up shows you listened and keeps the conversation alive.",
    "cue": "Pick one detail from their answer and ask about that detail.",
    "reuse": "Nice — how did it go?",
    "bad": ".",
    "good": " — how did it go?"
  },
  {
    "id": "small-v6-followup-03",
    "level": "level-3",
    "source": "Small talk expansion · follow-up",
    "raw": "Good.",
    "refined": "That sounds good — what made it work?",
    "patterns": [
      "small_followup"
    ],
    "why": "A follow-up shows you listened and keeps the conversation alive.",
    "cue": "Pick one detail from their answer and ask about that detail.",
    "reuse": "That sounds good — what made it work?",
    "bad": "Good",
    "good": "That sounds good — what made it work"
  },
  {
    "id": "small-v6-followup-04",
    "level": "level-3",
    "source": "Small talk expansion · follow-up",
    "raw": "I see.",
    "refined": "I see — what happened after that?",
    "patterns": [
      "small_followup"
    ],
    "why": "A follow-up shows you listened and keeps the conversation alive.",
    "cue": "Pick one detail from their answer and ask about that detail.",
    "reuse": "I see — what happened after that?",
    "bad": ".",
    "good": " — what happened after that?"
  },
  {
    "id": "small-v6-followup-05",
    "level": "level-3",
    "source": "Small talk expansion · follow-up",
    "raw": "Interesting.",
    "refined": "Interesting — what surprised you about it?",
    "patterns": [
      "small_followup"
    ],
    "why": "A follow-up shows you listened and keeps the conversation alive.",
    "cue": "Pick one detail from their answer and ask about that detail.",
    "reuse": "Interesting — what surprised you about it?",
    "bad": ".",
    "good": " — what surprised you about it?",
    "hot": true
  },
  {
    "id": "small-v6-followup-06",
    "level": "level-3",
    "source": "Small talk expansion · follow-up",
    "raw": "Sounds fun.",
    "refined": "Sounds fun — would you do it again?",
    "patterns": [
      "small_followup"
    ],
    "why": "A follow-up shows you listened and keeps the conversation alive.",
    "cue": "Pick one detail from their answer and ask about that detail.",
    "reuse": "Sounds fun — would you do it again?",
    "bad": ".",
    "good": " — would you do it again?"
  },
  {
    "id": "small-v6-followup-07",
    "level": "level-3",
    "source": "Small talk expansion · follow-up",
    "raw": "Really?",
    "refined": "Really? What was that like?",
    "patterns": [
      "small_followup"
    ],
    "why": "A follow-up shows you listened and keeps the conversation alive.",
    "cue": "Pick one detail from their answer and ask about that detail.",
    "reuse": "Really? What was that like?",
    "bad": "Really?",
    "good": "Really? What was that like?"
  },
  {
    "id": "small-v6-followup-08",
    "level": "level-3",
    "source": "Small talk expansion · follow-up",
    "raw": "Okay.",
    "refined": "Okay — what are you thinking of trying next?",
    "patterns": [
      "small_followup"
    ],
    "why": "A follow-up shows you listened and keeps the conversation alive.",
    "cue": "Pick one detail from their answer and ask about that detail.",
    "reuse": "Okay — what are you thinking of trying next?",
    "bad": ".",
    "good": " — what are you thinking of trying next?"
  },
  {
    "id": "small-v6-work-01",
    "level": "level-3",
    "source": "Small talk expansion · work-safe topic",
    "raw": "What do you do here?",
    "refined": "What kind of work are you focused on here?",
    "patterns": [
      "small_work",
      "small_openers"
    ],
    "why": "This version is more natural for everyday workplace conversation.",
    "cue": "Use shared context: project, team, tools, sprint, meeting, lunch, or time off.",
    "reuse": "What kind of work are you focused on here?",
    "bad": "What do you do",
    "good": "What kind of work are you focused on"
  },
  {
    "id": "small-v6-work-02",
    "level": "level-3",
    "source": "Small talk expansion · work-safe topic",
    "raw": "Which project is yours?",
    "refined": "Which project are you working on at the moment?",
    "patterns": [
      "small_work",
      "small_openers"
    ],
    "why": "This version is more natural for everyday workplace conversation.",
    "cue": "Use shared context: project, team, tools, sprint, meeting, lunch, or time off.",
    "reuse": "Which project are you working on at the moment?",
    "bad": "is yours",
    "good": "are you working on at the moment",
    "hot": true
  },
  {
    "id": "small-v6-work-03",
    "level": "level-3",
    "source": "Small talk expansion · work-safe topic",
    "raw": "Are you new?",
    "refined": "Have you been with the team long?",
    "patterns": [
      "small_work",
      "small_openers"
    ],
    "why": "This version is more natural for everyday workplace conversation.",
    "cue": "Use shared context: project, team, tools, sprint, meeting, lunch, or time off.",
    "reuse": "Have you been with the team long?",
    "bad": "Are you new",
    "good": "Have you been with the team long"
  },
  {
    "id": "small-v6-work-04",
    "level": "level-3",
    "source": "Small talk expansion · work-safe topic",
    "raw": "Is your work hard?",
    "refined": "How has the work been going?",
    "patterns": [
      "small_work",
      "small_openers"
    ],
    "why": "This version is more natural for everyday workplace conversation.",
    "cue": "Use shared context: project, team, tools, sprint, meeting, lunch, or time off.",
    "reuse": "How has the work been going?",
    "bad": "Is your work hard",
    "good": "How has the work been going"
  },
  {
    "id": "small-v6-work-05",
    "level": "level-3",
    "source": "Small talk expansion · work-safe topic",
    "raw": "Do you have a lot of tasks?",
    "refined": "Is it a busy week for you?",
    "patterns": [
      "small_work",
      "small_openers"
    ],
    "why": "This version is more natural for everyday workplace conversation.",
    "cue": "Use shared context: project, team, tools, sprint, meeting, lunch, or time off.",
    "reuse": "Is it a busy week for you?",
    "bad": "Do you have a lot of tasks",
    "good": "Is it a busy week for you"
  },
  {
    "id": "small-v6-work-06",
    "level": "level-3",
    "source": "Small talk expansion · work-safe topic",
    "raw": "What is your role?",
    "refined": "What does your role usually involve?",
    "patterns": [
      "small_work",
      "small_openers"
    ],
    "why": "This version is more natural for everyday workplace conversation.",
    "cue": "Use shared context: project, team, tools, sprint, meeting, lunch, or time off.",
    "reuse": "What does your role usually involve?",
    "bad": "What is your role",
    "good": "What does your role usually involve"
  },
  {
    "id": "small-v6-work-07",
    "level": "level-3",
    "source": "Small talk expansion · work-safe topic",
    "raw": "Are you enjoying the team?",
    "refined": "How are you finding the team so far?",
    "patterns": [
      "small_work",
      "small_openers"
    ],
    "why": "This version is more natural for everyday workplace conversation.",
    "cue": "Use shared context: project, team, tools, sprint, meeting, lunch, or time off.",
    "reuse": "How are you finding the team so far?",
    "bad": "Are you enjoying",
    "good": "How are you finding",
    "hot": true
  },
  {
    "id": "small-v6-remote-01",
    "level": "level-3",
    "source": "Small talk expansion · remote call",
    "raw": "Your sound is low.",
    "refined": "Your audio is a little quiet.",
    "patterns": [
      "small_remote"
    ],
    "why": "Remote-call language works best when it reduces awkwardness.",
    "cue": "Use soft, practical phrases for audio, screen sharing, connection, and interruptions.",
    "reuse": "Your audio is a little quiet.",
    "bad": "sound is low",
    "good": "audio is a little quiet"
  },
  {
    "id": "small-v6-remote-02",
    "level": "level-3",
    "source": "Small talk expansion · remote call",
    "raw": "You disappeared.",
    "refined": "I think your video dropped for a second.",
    "patterns": [
      "small_remote",
      "register"
    ],
    "why": "Remote-call language works best when it reduces awkwardness.",
    "cue": "Use soft, practical phrases for audio, screen sharing, connection, and interruptions.",
    "reuse": "I think your video dropped for a second.",
    "bad": "You disappeared",
    "good": "I think your video dropped for a second",
    "hot": true
  },
  {
    "id": "small-v6-remote-03",
    "level": "level-3",
    "source": "Small talk expansion · remote call",
    "raw": "Can you repeat, I didn’t listen.",
    "refined": "Could you repeat that? I missed the last part.",
    "patterns": [
      "small_remote",
      "register"
    ],
    "why": "Remote-call language works best when it reduces awkwardness.",
    "cue": "Use soft, practical phrases for audio, screen sharing, connection, and interruptions.",
    "reuse": "Could you repeat that? I missed the last part.",
    "bad": "Can you repeat, I didn’t listen",
    "good": "Could you repeat that? I missed the last part",
    "hot": true
  },
  {
    "id": "small-v6-remote-04",
    "level": "level-3",
    "source": "Small talk expansion · remote call",
    "raw": "My internet is bad.",
    "refined": "My connection is a bit unstable.",
    "patterns": [
      "small_remote"
    ],
    "why": "Remote-call language works best when it reduces awkwardness.",
    "cue": "Use soft, practical phrases for audio, screen sharing, connection, and interruptions.",
    "reuse": "My connection is a bit unstable.",
    "bad": "internet is bad",
    "good": "connection is a bit unstable"
  },
  {
    "id": "small-v6-remote-05",
    "level": "level-3",
    "source": "Small talk expansion · remote call",
    "raw": "I will turn on camera.",
    "refined": "I’ll turn my camera on.",
    "patterns": [
      "small_remote"
    ],
    "why": "Remote-call language works best when it reduces awkwardness.",
    "cue": "Use soft, practical phrases for audio, screen sharing, connection, and interruptions.",
    "reuse": "I’ll turn my camera on.",
    "bad": "turn on camera",
    "good": "turn my camera on"
  },
  {
    "id": "small-v6-remote-06",
    "level": "level-3",
    "source": "Small talk expansion · remote call",
    "raw": "I don’t see your screen.",
    "refined": "I’m not seeing your screen yet.",
    "patterns": [
      "small_remote",
      "register"
    ],
    "why": "Remote-call language works best when it reduces awkwardness.",
    "cue": "Use soft, practical phrases for audio, screen sharing, connection, and interruptions.",
    "reuse": "I’m not seeing your screen yet.",
    "bad": "I don’t see",
    "good": "I’m not seeing"
  },
  {
    "id": "small-v6-appreciation-01",
    "level": "level-3",
    "source": "Small talk expansion · appreciation",
    "raw": "Good explanation.",
    "refined": "That explanation made the decision much clearer.",
    "patterns": [
      "small_appreciation"
    ],
    "why": "Specific appreciation feels warmer and more sincere than a generic compliment.",
    "cue": "Praise the action or effect, not identity or appearance.",
    "reuse": "That explanation made the decision much clearer.",
    "bad": "Good explanation",
    "good": "That explanation made the decision much clearer",
    "hot": true
  },
  {
    "id": "small-v6-appreciation-02",
    "level": "level-3",
    "source": "Small talk expansion · appreciation",
    "raw": "Thanks, you helped.",
    "refined": "Thanks — your explanation helped me move forward.",
    "patterns": [
      "small_appreciation"
    ],
    "why": "Specific appreciation feels warmer and more sincere than a generic compliment.",
    "cue": "Praise the action or effect, not identity or appearance.",
    "reuse": "Thanks — your explanation helped me move forward.",
    "bad": "you helped",
    "good": "your explanation helped me move forward"
  },
  {
    "id": "small-v6-appreciation-03",
    "level": "level-3",
    "source": "Small talk expansion · appreciation",
    "raw": "Good work.",
    "refined": "Nice work on the handoff; it was easy to follow.",
    "patterns": [
      "small_appreciation"
    ],
    "why": "Specific appreciation feels warmer and more sincere than a generic compliment.",
    "cue": "Praise the action or effect, not identity or appearance.",
    "reuse": "Nice work on the handoff; it was easy to follow.",
    "bad": "Good work",
    "good": "Nice work on the handoff; it was easy to follow"
  },
  {
    "id": "small-v6-appreciation-04",
    "level": "level-3",
    "source": "Small talk expansion · appreciation",
    "raw": "You are very smart.",
    "refined": "I really liked the way you broke down the problem.",
    "patterns": [
      "small_appreciation"
    ],
    "why": "Specific appreciation feels warmer and more sincere than a generic compliment.",
    "cue": "Praise the action or effect, not identity or appearance.",
    "reuse": "I really liked the way you broke down the problem.",
    "bad": "You are very smart",
    "good": "I really liked the way you broke down the problem",
    "hot": true
  },
  {
    "id": "small-v6-appreciation-05",
    "level": "level-3",
    "source": "Small talk expansion · appreciation",
    "raw": "The demo was nice.",
    "refined": "The demo was clear and easy to follow.",
    "patterns": [
      "small_appreciation"
    ],
    "why": "Specific appreciation feels warmer and more sincere than a generic compliment.",
    "cue": "Praise the action or effect, not identity or appearance.",
    "reuse": "The demo was clear and easy to follow.",
    "bad": "nice",
    "good": "clear and easy to follow"
  },
  {
    "id": "small-v6-exit-01",
    "level": "level-3",
    "source": "Small talk expansion · exit",
    "raw": "I need to leave.",
    "refined": "I need to jump now, but it was great talking with you.",
    "patterns": [
      "small_exit"
    ],
    "why": "A graceful exit keeps warmth while closing the conversation.",
    "cue": "Use appreciation plus a reason or handoff.",
    "reuse": "I need to jump now, but it was great talking with you.",
    "bad": "leave",
    "good": "jump now, but it was great talking with you",
    "hot": true
  },
  {
    "id": "small-v6-exit-02",
    "level": "level-3",
    "source": "Small talk expansion · exit",
    "raw": "Enough for me.",
    "refined": "That’s all from me for now.",
    "patterns": [
      "small_exit"
    ],
    "why": "A graceful exit keeps warmth while closing the conversation.",
    "cue": "Use appreciation plus a reason or handoff.",
    "reuse": "That’s all from me for now.",
    "bad": "Enough for me",
    "good": "That’s all from me for now"
  },
  {
    "id": "small-v6-exit-03",
    "level": "level-3",
    "source": "Small talk expansion · exit",
    "raw": "We can finish.",
    "refined": "Shall we wrap it up here?",
    "patterns": [
      "small_exit"
    ],
    "why": "A graceful exit keeps warmth while closing the conversation.",
    "cue": "Use appreciation plus a reason or handoff.",
    "reuse": "Shall we wrap it up here?",
    "bad": "We can finish",
    "good": "Shall we wrap it up here",
    "hot": true
  },
  {
    "id": "small-v6-exit-04",
    "level": "level-3",
    "source": "Small talk expansion · exit",
    "raw": "I stop here.",
    "refined": "I’ll pause here and let you get back to it.",
    "patterns": [
      "small_exit"
    ],
    "why": "A graceful exit keeps warmth while closing the conversation.",
    "cue": "Use appreciation plus a reason or handoff.",
    "reuse": "I’ll pause here and let you get back to it.",
    "bad": "I stop here",
    "good": "I’ll pause here and let you get back to it"
  },
  {
    "id": "small-v6-share-01",
    "level": "level-3",
    "source": "Small talk expansion · self-share",
    "raw": "Nothing special.",
    "refined": "Nothing too exciting — I finally got some time to rest.",
    "patterns": [
      "small_share"
    ],
    "why": "A small self-share gives the other person something to respond to.",
    "cue": "Share one detail, then return the floor with a question.",
    "reuse": "Nothing too exciting — I finally got some time to rest.",
    "bad": "Nothing special",
    "good": "Nothing too exciting — I finally got some time to rest",
    "hot": true
  },
  {
    "id": "small-v6-share-02",
    "level": "level-3",
    "source": "Small talk expansion · self-share",
    "raw": "I don’t know what to say.",
    "refined": "I’m still figuring it out, but it sounds interesting.",
    "patterns": [
      "small_share"
    ],
    "why": "A small self-share gives the other person something to respond to.",
    "cue": "Share one detail, then return the floor with a question.",
    "reuse": "I’m still figuring it out, but it sounds interesting.",
    "bad": "I don’t know what to say",
    "good": "I’m still figuring it out, but it sounds interesting"
  },
  {
    "id": "small-v6-share-03",
    "level": "level-3",
    "source": "Small talk expansion · self-share",
    "raw": "I only worked.",
    "refined": "Mostly work, but I managed to get a quiet evening.",
    "patterns": [
      "small_share"
    ],
    "why": "A small self-share gives the other person something to respond to.",
    "cue": "Share one detail, then return the floor with a question.",
    "reuse": "Mostly work, but I managed to get a quiet evening.",
    "bad": "I only worked",
    "good": "Mostly work, but I managed to get a quiet evening"
  },
  {
    "id": "nvc-v6-observation-01",
    "level": "level-4",
    "source": "NVC expansion · observation",
    "raw": "You always change your mind.",
    "refined": "The scope changed after we started implementation.",
    "patterns": [
      "nvc_observation"
    ],
    "why": "The refined version separates what happened from judgment.",
    "cue": "Start with what a camera could record.",
    "reuse": "The scope changed after we started implementation.",
    "bad": "You always change your mind",
    "good": "The scope changed after we started implementation",
    "hot": true
  },
  {
    "id": "nvc-v6-observation-02",
    "level": "level-4",
    "source": "NVC expansion · observation",
    "raw": "You ignored the ticket.",
    "refined": "I don’t see an update on the ticket.",
    "patterns": [
      "nvc_observation"
    ],
    "why": "The refined version separates what happened from judgment.",
    "cue": "Start with what a camera could record.",
    "reuse": "I don’t see an update on the ticket.",
    "bad": "You ignored the ticket",
    "good": "I don’t see an update on the ticket"
  },
  {
    "id": "nvc-v6-observation-03",
    "level": "level-4",
    "source": "NVC expansion · observation",
    "raw": "You didn’t read the doc.",
    "refined": "I’m seeing a question that is answered in the document.",
    "patterns": [
      "nvc_observation"
    ],
    "why": "The refined version separates what happened from judgment.",
    "cue": "Start with what a camera could record.",
    "reuse": "I’m seeing a question that is answered in the document.",
    "bad": "You didn’t read the doc",
    "good": "I’m seeing a question that is answered in the document"
  },
  {
    "id": "nvc-v6-observation-04",
    "level": "level-4",
    "source": "NVC expansion · observation",
    "raw": "This is a mess.",
    "refined": "I see three different versions of the flow.",
    "patterns": [
      "nvc_observation"
    ],
    "why": "The refined version separates what happened from judgment.",
    "cue": "Start with what a camera could record.",
    "reuse": "I see three different versions of the flow.",
    "bad": "This is a mess",
    "good": "I see three different versions of the flow"
  },
  {
    "id": "nvc-v6-observation-05",
    "level": "level-4",
    "source": "NVC expansion · observation",
    "raw": "You are interrupting me.",
    "refined": "I noticed I was interrupted twice while explaining the issue.",
    "patterns": [
      "nvc_observation"
    ],
    "why": "The refined version separates what happened from judgment.",
    "cue": "Start with what a camera could record.",
    "reuse": "I noticed I was interrupted twice while explaining the issue.",
    "bad": "You are interrupting me",
    "good": "I noticed I was interrupted twice while explaining the issue",
    "hot": true
  },
  {
    "id": "nvc-v6-observation-06",
    "level": "level-4",
    "source": "NVC expansion · observation",
    "raw": "You are not listening.",
    "refined": "I don’t think my last point was addressed.",
    "patterns": [
      "nvc_observation"
    ],
    "why": "The refined version separates what happened from judgment.",
    "cue": "Start with what a camera could record.",
    "reuse": "I don’t think my last point was addressed.",
    "bad": "You are not listening",
    "good": "I don’t think my last point was addressed"
  },
  {
    "id": "nvc-v6-observation-07",
    "level": "level-4",
    "source": "NVC expansion · observation",
    "raw": "You are rushing.",
    "refined": "The timeline moved earlier than I expected.",
    "patterns": [
      "nvc_observation"
    ],
    "why": "The refined version separates what happened from judgment.",
    "cue": "Start with what a camera could record.",
    "reuse": "The timeline moved earlier than I expected.",
    "bad": "You are rushing",
    "good": "The timeline moved earlier than I expected"
  },
  {
    "id": "nvc-v6-observation-08",
    "level": "level-4",
    "source": "NVC expansion · observation",
    "raw": "You are hiding information.",
    "refined": "I don’t have access to the context I need.",
    "patterns": [
      "nvc_observation"
    ],
    "why": "The refined version separates what happened from judgment.",
    "cue": "Start with what a camera could record.",
    "reuse": "I don’t have access to the context I need.",
    "bad": "You are hiding information",
    "good": "I don’t have access to the context I need"
  },
  {
    "id": "nvc-v6-observation-09",
    "level": "level-4",
    "source": "NVC expansion · observation",
    "raw": "You keep changing the design.",
    "refined": "The design changed twice this week.",
    "patterns": [
      "nvc_observation"
    ],
    "why": "The refined version separates what happened from judgment.",
    "cue": "Start with what a camera could record.",
    "reuse": "The design changed twice this week.",
    "bad": "You keep changing the design",
    "good": "The design changed twice this week",
    "hot": true
  },
  {
    "id": "nvc-v6-observation-10",
    "level": "level-4",
    "source": "NVC expansion · observation",
    "raw": "You created confusion.",
    "refined": "I’m seeing different interpretations of the same requirement.",
    "patterns": [
      "nvc_observation"
    ],
    "why": "The refined version separates what happened from judgment.",
    "cue": "Start with what a camera could record.",
    "reuse": "I’m seeing different interpretations of the same requirement.",
    "bad": "You created confusion",
    "good": "I’m seeing different interpretations of the same requirement"
  },
  {
    "id": "nvc-v6-feeling-01",
    "level": "level-4",
    "source": "NVC expansion · feeling",
    "raw": "You make me nervous.",
    "refined": "I feel nervous because the deadline is close.",
    "patterns": [
      "nvc_feeling",
      "nvc_need"
    ],
    "why": "The refined version owns the feeling instead of blaming the other person.",
    "cue": "Use I feel plus an emotion, not I feel like plus a judgment.",
    "reuse": "I feel nervous because the deadline is close.",
    "bad": "You make me nervous",
    "good": "I feel nervous because the deadline is close"
  },
  {
    "id": "nvc-v6-feeling-02",
    "level": "level-4",
    "source": "NVC expansion · feeling",
    "raw": "You are stressing me out.",
    "refined": "I’m feeling pressure because the scope is still changing.",
    "patterns": [
      "nvc_feeling",
      "nvc_need"
    ],
    "why": "The refined version owns the feeling instead of blaming the other person.",
    "cue": "Use I feel plus an emotion, not I feel like plus a judgment.",
    "reuse": "I’m feeling pressure because the scope is still changing.",
    "bad": "You are stressing me out",
    "good": "I’m feeling pressure because the scope is still changing",
    "hot": true
  },
  {
    "id": "nvc-v6-feeling-03",
    "level": "level-4",
    "source": "NVC expansion · feeling",
    "raw": "This makes me angry.",
    "refined": "I feel frustrated because I expected more clarity.",
    "patterns": [
      "nvc_feeling",
      "nvc_need"
    ],
    "why": "The refined version owns the feeling instead of blaming the other person.",
    "cue": "Use I feel plus an emotion, not I feel like plus a judgment.",
    "reuse": "I feel frustrated because I expected more clarity.",
    "bad": "This makes me angry",
    "good": "I feel frustrated because I expected more clarity"
  },
  {
    "id": "nvc-v6-feeling-04",
    "level": "level-4",
    "source": "NVC expansion · feeling",
    "raw": "You made me feel stupid.",
    "refined": "I feel embarrassed because I need room to ask basic questions.",
    "patterns": [
      "nvc_feeling",
      "nvc_need"
    ],
    "why": "The refined version owns the feeling instead of blaming the other person.",
    "cue": "Use I feel plus an emotion, not I feel like plus a judgment.",
    "reuse": "I feel embarrassed because I need room to ask basic questions.",
    "bad": "You made me feel stupid",
    "good": "I feel embarrassed because I need room to ask basic questions"
  },
  {
    "id": "nvc-v6-feeling-05",
    "level": "level-4",
    "source": "NVC expansion · feeling",
    "raw": "I feel like you don’t trust me.",
    "refined": "I feel concerned because I need trust in the handoff.",
    "patterns": [
      "nvc_feeling",
      "nvc_need"
    ],
    "why": "The refined version owns the feeling instead of blaming the other person.",
    "cue": "Use I feel plus an emotion, not I feel like plus a judgment.",
    "reuse": "I feel concerned because I need trust in the handoff.",
    "bad": "I feel like you don’t trust me",
    "good": "I feel concerned because I need trust in the handoff",
    "hot": true
  },
  {
    "id": "nvc-v6-feeling-06",
    "level": "level-4",
    "source": "NVC expansion · feeling",
    "raw": "You are making this hard.",
    "refined": "I feel stuck because the criteria are not clear yet.",
    "patterns": [
      "nvc_feeling",
      "nvc_need"
    ],
    "why": "The refined version owns the feeling instead of blaming the other person.",
    "cue": "Use I feel plus an emotion, not I feel like plus a judgment.",
    "reuse": "I feel stuck because the criteria are not clear yet.",
    "bad": "You are making this hard",
    "good": "I feel stuck because the criteria are not clear yet"
  },
  {
    "id": "nvc-v6-feeling-07",
    "level": "level-4",
    "source": "NVC expansion · feeling",
    "raw": "I feel like this is unfair.",
    "refined": "I feel discouraged because I need consistency in the process.",
    "patterns": [
      "nvc_feeling",
      "nvc_need"
    ],
    "why": "The refined version owns the feeling instead of blaming the other person.",
    "cue": "Use I feel plus an emotion, not I feel like plus a judgment.",
    "reuse": "I feel discouraged because I need consistency in the process.",
    "bad": "I feel like this is unfair",
    "good": "I feel discouraged because I need consistency in the process"
  },
  {
    "id": "nvc-v6-feeling-08",
    "level": "level-4",
    "source": "NVC expansion · feeling",
    "raw": "You made me lose time.",
    "refined": "I feel frustrated because I need to protect focus time.",
    "patterns": [
      "nvc_feeling",
      "nvc_need"
    ],
    "why": "The refined version owns the feeling instead of blaming the other person.",
    "cue": "Use I feel plus an emotion, not I feel like plus a judgment.",
    "reuse": "I feel frustrated because I need to protect focus time.",
    "bad": "You made me lose time",
    "good": "I feel frustrated because I need to protect focus time"
  },
  {
    "id": "nvc-v6-need-01",
    "level": "level-4",
    "source": "NVC expansion · need",
    "raw": "I need you to stop changing things.",
    "refined": "I need predictability around scope changes.",
    "patterns": [
      "nvc_need"
    ],
    "why": "Naming the need makes the conflict easier to solve.",
    "cue": "Name clarity, predictability, support, visibility, focus, or autonomy.",
    "reuse": "I need predictability around scope changes.",
    "bad": "you to stop changing things",
    "good": "predictability around scope changes",
    "hot": true
  },
  {
    "id": "nvc-v6-need-02",
    "level": "level-4",
    "source": "NVC expansion · need",
    "raw": "I need you to answer faster.",
    "refined": "I need more visibility on review timing.",
    "patterns": [
      "nvc_need"
    ],
    "why": "Naming the need makes the conflict easier to solve.",
    "cue": "Name clarity, predictability, support, visibility, focus, or autonomy.",
    "reuse": "I need more visibility on review timing.",
    "bad": "you to answer faster",
    "good": "more visibility on review timing",
    "hot": true
  },
  {
    "id": "nvc-v6-need-03",
    "level": "level-4",
    "source": "NVC expansion · need",
    "raw": "I need you to explain better.",
    "refined": "I need a concrete example of the expected behavior.",
    "patterns": [
      "nvc_need"
    ],
    "why": "Naming the need makes the conflict easier to solve.",
    "cue": "Name clarity, predictability, support, visibility, focus, or autonomy.",
    "reuse": "I need a concrete example of the expected behavior.",
    "bad": "you to explain better",
    "good": "a concrete example of the expected behavior"
  },
  {
    "id": "nvc-v6-need-04",
    "level": "level-4",
    "source": "NVC expansion · need",
    "raw": "I need you to care.",
    "refined": "I need confidence that this priority is visible.",
    "patterns": [
      "nvc_need"
    ],
    "why": "Naming the need makes the conflict easier to solve.",
    "cue": "Name clarity, predictability, support, visibility, focus, or autonomy.",
    "reuse": "I need confidence that this priority is visible.",
    "bad": "you to care",
    "good": "confidence that this priority is visible"
  },
  {
    "id": "nvc-v6-need-05",
    "level": "level-4",
    "source": "NVC expansion · need",
    "raw": "I need you to decide now.",
    "refined": "I need clarity on the decision timeline.",
    "patterns": [
      "nvc_need"
    ],
    "why": "Naming the need makes the conflict easier to solve.",
    "cue": "Name clarity, predictability, support, visibility, focus, or autonomy.",
    "reuse": "I need clarity on the decision timeline.",
    "bad": "you to decide now",
    "good": "clarity on the decision timeline",
    "hot": true
  },
  {
    "id": "nvc-v6-need-06",
    "level": "level-4",
    "source": "NVC expansion · need",
    "raw": "I need you to not interrupt.",
    "refined": "I need space to finish the explanation.",
    "patterns": [
      "nvc_need"
    ],
    "why": "Naming the need makes the conflict easier to solve.",
    "cue": "Name clarity, predictability, support, visibility, focus, or autonomy.",
    "reuse": "I need space to finish the explanation.",
    "bad": "you to not interrupt",
    "good": "space to finish the explanation"
  },
  {
    "id": "nvc-v6-need-07",
    "level": "level-4",
    "source": "NVC expansion · need",
    "raw": "I need you to trust me.",
    "refined": "I need autonomy to finish the implementation.",
    "patterns": [
      "nvc_need"
    ],
    "why": "Naming the need makes the conflict easier to solve.",
    "cue": "Name clarity, predictability, support, visibility, focus, or autonomy.",
    "reuse": "I need autonomy to finish the implementation.",
    "bad": "you to trust me",
    "good": "autonomy to finish the implementation"
  },
  {
    "id": "nvc-v6-request-01",
    "level": "level-4",
    "source": "NVC expansion · request",
    "raw": "Stop delaying the review.",
    "refined": "Could you review this by tomorrow or suggest another reviewer?",
    "patterns": [
      "nvc_request"
    ],
    "why": "The refined version turns pressure into a concrete, doable request.",
    "cue": "Ask for a specific next action and leave room for an alternative.",
    "reuse": "Could you review this by tomorrow or suggest another reviewer?",
    "bad": "Stop delaying the review",
    "good": "Could you review this by tomorrow or suggest another reviewer",
    "hot": true
  },
  {
    "id": "nvc-v6-request-02",
    "level": "level-4",
    "source": "NVC expansion · request",
    "raw": "Tell me what you want.",
    "refined": "Could you share one example of the expected result?",
    "patterns": [
      "nvc_request"
    ],
    "why": "The refined version turns pressure into a concrete, doable request.",
    "cue": "Ask for a specific next action and leave room for an alternative.",
    "reuse": "Could you share one example of the expected result?",
    "bad": "Tell me what you want",
    "good": "Could you share one example of the expected result"
  },
  {
    "id": "nvc-v6-request-03",
    "level": "level-4",
    "source": "NVC expansion · request",
    "raw": "Don’t change the scope again.",
    "refined": "Could we confirm scope before adding new changes?",
    "patterns": [
      "nvc_request"
    ],
    "why": "The refined version turns pressure into a concrete, doable request.",
    "cue": "Ask for a specific next action and leave room for an alternative.",
    "reuse": "Could we confirm scope before adding new changes?",
    "bad": "Don’t change the scope again",
    "good": "Could we confirm scope before adding new changes",
    "hot": true
  },
  {
    "id": "nvc-v6-request-04",
    "level": "level-4",
    "source": "NVC expansion · request",
    "raw": "Fix the ticket.",
    "refined": "Could you update the ticket with the owner and next step?",
    "patterns": [
      "nvc_request"
    ],
    "why": "The refined version turns pressure into a concrete, doable request.",
    "cue": "Ask for a specific next action and leave room for an alternative.",
    "reuse": "Could you update the ticket with the owner and next step?",
    "bad": "Fix the ticket",
    "good": "Could you update the ticket with the owner and next step"
  },
  {
    "id": "nvc-v6-request-05",
    "level": "level-4",
    "source": "NVC expansion · request",
    "raw": "Reply faster.",
    "refined": "Could you let me know when you expect to reply?",
    "patterns": [
      "nvc_request"
    ],
    "why": "The refined version turns pressure into a concrete, doable request.",
    "cue": "Ask for a specific next action and leave room for an alternative.",
    "reuse": "Could you let me know when you expect to reply?",
    "bad": "Reply faster",
    "good": "Could you let me know when you expect to reply"
  },
  {
    "id": "nvc-v6-request-06",
    "level": "level-4",
    "source": "NVC expansion · request",
    "raw": "Don’t send vague feedback.",
    "refined": "Could you point to the specific part you want changed?",
    "patterns": [
      "nvc_request"
    ],
    "why": "The refined version turns pressure into a concrete, doable request.",
    "cue": "Ask for a specific next action and leave room for an alternative.",
    "reuse": "Could you point to the specific part you want changed?",
    "bad": "Don’t send vague feedback",
    "good": "Could you point to the specific part you want changed"
  },
  {
    "id": "nvc-v6-request-07",
    "level": "level-4",
    "source": "NVC expansion · request",
    "raw": "Make a decision.",
    "refined": "Could we decide between option A and option B today?",
    "patterns": [
      "nvc_request"
    ],
    "why": "The refined version turns pressure into a concrete, doable request.",
    "cue": "Ask for a specific next action and leave room for an alternative.",
    "reuse": "Could we decide between option A and option B today?",
    "bad": "Make a decision",
    "good": "Could we decide between option A and option B today"
  },
  {
    "id": "nvc-v6-request-08",
    "level": "level-4",
    "source": "NVC expansion · request",
    "raw": "Stop adding meetings.",
    "refined": "Could we handle this async unless a decision is blocked?",
    "patterns": [
      "nvc_request"
    ],
    "why": "The refined version turns pressure into a concrete, doable request.",
    "cue": "Ask for a specific next action and leave room for an alternative.",
    "reuse": "Could we handle this async unless a decision is blocked?",
    "bad": "Stop adding meetings",
    "good": "Could we handle this async unless a decision is blocked"
  },
  {
    "id": "nvc-v6-request-09",
    "level": "level-4",
    "source": "NVC expansion · request",
    "raw": "Explain yourself.",
    "refined": "Could you walk me through the reason for the change?",
    "patterns": [
      "nvc_request"
    ],
    "why": "The refined version turns pressure into a concrete, doable request.",
    "cue": "Ask for a specific next action and leave room for an alternative.",
    "reuse": "Could you walk me through the reason for the change?",
    "bad": "Explain yourself",
    "good": "Could you walk me through the reason for the change"
  },
  {
    "id": "nvc-v6-request-10",
    "level": "level-4",
    "source": "NVC expansion · request",
    "raw": "Don’t surprise me with changes.",
    "refined": "Could you flag scope changes before implementation starts?",
    "patterns": [
      "nvc_request"
    ],
    "why": "The refined version turns pressure into a concrete, doable request.",
    "cue": "Ask for a specific next action and leave room for an alternative.",
    "reuse": "Could you flag scope changes before implementation starts?",
    "bad": "Don’t surprise me with changes",
    "good": "Could you flag scope changes before implementation starts",
    "hot": true
  },
  {
    "id": "nvc-v6-boundary-01",
    "level": "level-4",
    "source": "NVC expansion · boundary",
    "raw": "I won’t take this.",
    "refined": "I can take this after the current priority is complete.",
    "patterns": [
      "nvc_boundary",
      "nvc_request"
    ],
    "why": "The refined version protects capacity without blaming the other person.",
    "cue": "Say what you can do, what you cannot do, and what would help.",
    "reuse": "I can take this after the current priority is complete.",
    "bad": "I won’t take this",
    "good": "I can take this after the current priority is complete"
  },
  {
    "id": "nvc-v6-boundary-02",
    "level": "level-4",
    "source": "NVC expansion · boundary",
    "raw": "I can’t help today.",
    "refined": "I’m at capacity today, but I can help tomorrow morning.",
    "patterns": [
      "nvc_boundary",
      "nvc_request"
    ],
    "why": "The refined version protects capacity without blaming the other person.",
    "cue": "Say what you can do, what you cannot do, and what would help.",
    "reuse": "I’m at capacity today, but I can help tomorrow morning.",
    "bad": "I can’t help today",
    "good": "I’m at capacity today, but I can help tomorrow morning",
    "hot": true
  },
  {
    "id": "nvc-v6-boundary-03",
    "level": "level-4",
    "source": "NVC expansion · boundary",
    "raw": "This is outside my job.",
    "refined": "I can clarify the issue, but I can’t own the implementation.",
    "patterns": [
      "nvc_boundary",
      "nvc_request"
    ],
    "why": "The refined version protects capacity without blaming the other person.",
    "cue": "Say what you can do, what you cannot do, and what would help.",
    "reuse": "I can clarify the issue, but I can’t own the implementation.",
    "bad": "This is outside my job",
    "good": "I can clarify the issue, but I can’t own the implementation"
  },
  {
    "id": "nvc-v6-boundary-04",
    "level": "level-4",
    "source": "NVC expansion · boundary",
    "raw": "Don’t ping me after hours.",
    "refined": "I’m offline after work hours; please leave a note and I’ll respond the next day.",
    "patterns": [
      "nvc_boundary",
      "nvc_request"
    ],
    "why": "The refined version protects capacity without blaming the other person.",
    "cue": "Say what you can do, what you cannot do, and what would help.",
    "reuse": "I’m offline after work hours; please leave a note and I’ll respond the next day.",
    "bad": "Don’t ping me after hours",
    "good": "I’m offline after work hours; please leave a note and I’ll respond the next day",
    "hot": true
  },
  {
    "id": "nvc-v6-boundary-05",
    "level": "level-4",
    "source": "NVC expansion · boundary",
    "raw": "I’m not doing both.",
    "refined": "I can do either the review or the implementation today, not both.",
    "patterns": [
      "nvc_boundary",
      "nvc_request"
    ],
    "why": "The refined version protects capacity without blaming the other person.",
    "cue": "Say what you can do, what you cannot do, and what would help.",
    "reuse": "I can do either the review or the implementation today, not both.",
    "bad": "I’m not doing both",
    "good": "I can do either the review or the implementation today, not both"
  },
  {
    "id": "nvc-v6-boundary-06",
    "level": "level-4",
    "source": "NVC expansion · boundary",
    "raw": "Stop putting this on me.",
    "refined": "I need us to confirm ownership before I take the next step.",
    "patterns": [
      "nvc_boundary",
      "nvc_request"
    ],
    "why": "The refined version protects capacity without blaming the other person.",
    "cue": "Say what you can do, what you cannot do, and what would help.",
    "reuse": "I need us to confirm ownership before I take the next step.",
    "bad": "Stop putting this on me",
    "good": "I need us to confirm ownership before I take the next step",
    "hot": true
  },
  {
    "id": "nvc-v6-boundary-07",
    "level": "level-4",
    "source": "NVC expansion · boundary",
    "raw": "I can’t attend every meeting.",
    "refined": "I can join the decision meeting, but I’ll skip the status-only meeting.",
    "patterns": [
      "nvc_boundary",
      "nvc_request"
    ],
    "why": "The refined version protects capacity without blaming the other person.",
    "cue": "Say what you can do, what you cannot do, and what would help.",
    "reuse": "I can join the decision meeting, but I’ll skip the status-only meeting.",
    "bad": "I can’t attend every meeting",
    "good": "I can join the decision meeting, but I’ll skip the status-only meeting"
  },
  {
    "id": "nvc-v6-repair-01",
    "level": "level-4",
    "source": "NVC expansion · repair",
    "raw": "You misunderstood me.",
    "refined": "I may not have been clear; let me rephrase the goal.",
    "patterns": [
      "nvc_repair"
    ],
    "why": "The refined version protects the relationship while clarifying the point.",
    "cue": "Assume misunderstanding before assuming bad intent.",
    "reuse": "I may not have been clear; let me rephrase the goal.",
    "bad": "You misunderstood me",
    "good": "I may not have been clear; let me rephrase the goal",
    "hot": true
  },
  {
    "id": "nvc-v6-repair-02",
    "level": "level-4",
    "source": "NVC expansion · repair",
    "raw": "That is not what I said.",
    "refined": "Let me clarify what I meant.",
    "patterns": [
      "nvc_repair"
    ],
    "why": "The refined version protects the relationship while clarifying the point.",
    "cue": "Assume misunderstanding before assuming bad intent.",
    "reuse": "Let me clarify what I meant.",
    "bad": "That is not what I said",
    "good": "Let me clarify what I meant"
  },
  {
    "id": "nvc-v6-repair-03",
    "level": "level-4",
    "source": "NVC expansion · repair",
    "raw": "You are missing the point.",
    "refined": "I think we may be focusing on different parts of the issue.",
    "patterns": [
      "nvc_repair"
    ],
    "why": "The refined version protects the relationship while clarifying the point.",
    "cue": "Assume misunderstanding before assuming bad intent.",
    "reuse": "I think we may be focusing on different parts of the issue.",
    "bad": "You are missing the point",
    "good": "I think we may be focusing on different parts of the issue"
  },
  {
    "id": "nvc-v6-repair-04",
    "level": "level-4",
    "source": "NVC expansion · repair",
    "raw": "I said this already.",
    "refined": "I may have buried the key point earlier; here it is again.",
    "patterns": [
      "nvc_repair"
    ],
    "why": "The refined version protects the relationship while clarifying the point.",
    "cue": "Assume misunderstanding before assuming bad intent.",
    "reuse": "I may have buried the key point earlier; here it is again.",
    "bad": "I said this already",
    "good": "I may have buried the key point earlier; here it is again",
    "hot": true
  },
  {
    "id": "nvc-v6-repair-05",
    "level": "level-4",
    "source": "NVC expansion · repair",
    "raw": "No, wrong.",
    "refined": "I see a different result in the logs.",
    "patterns": [
      "nvc_repair"
    ],
    "why": "The refined version protects the relationship while clarifying the point.",
    "cue": "Assume misunderstanding before assuming bad intent.",
    "reuse": "I see a different result in the logs.",
    "bad": "No, wrong",
    "good": "I see a different result in the logs"
  },
  {
    "id": "nvc-v6-repair-06",
    "level": "level-4",
    "source": "NVC expansion · repair",
    "raw": "You read it wrong.",
    "refined": "The wording may be ambiguous; I meant the second flow.",
    "patterns": [
      "nvc_repair"
    ],
    "why": "The refined version protects the relationship while clarifying the point.",
    "cue": "Assume misunderstanding before assuming bad intent.",
    "reuse": "The wording may be ambiguous; I meant the second flow.",
    "bad": "You read it wrong",
    "good": "The wording may be ambiguous; I meant the second flow"
  },
  {
    "id": "nvc-v6-repair-07",
    "level": "level-4",
    "source": "NVC expansion · repair",
    "raw": "That answer is useless.",
    "refined": "I’m still missing the part about the next step.",
    "patterns": [
      "nvc_repair"
    ],
    "why": "The refined version protects the relationship while clarifying the point.",
    "cue": "Assume misunderstanding before assuming bad intent.",
    "reuse": "I’m still missing the part about the next step.",
    "bad": "That answer is useless",
    "good": "I’m still missing the part about the next step"
  },
  {
    "id": "nvc-v6-repair-08",
    "level": "level-4",
    "source": "NVC expansion · repair",
    "raw": "This conversation is going nowhere.",
    "refined": "I think we’re stuck; could we reset around the decision we need?",
    "patterns": [
      "nvc_repair",
      "nvc_request"
    ],
    "why": "The refined version protects the relationship while clarifying the point.",
    "cue": "Assume misunderstanding before assuming bad intent.",
    "reuse": "I think we’re stuck; could we reset around the decision we need?",
    "bad": "This conversation is going nowhere",
    "good": "I think we’re stuck; could we reset around the decision we need",
    "hot": true
  }
];

const DRILLS = [
  {
    "id": "drill-present-perfect-finish",
    "phraseId": "grammar-present-perfect-finish",
    "patternId": "present_perfect",
    "prompt": "Choose the present perfect form:",
    "sentence": [
      "I’ve ",
      "____",
      " the report."
    ],
    "options": [
      "finish",
      "finished",
      "finishing",
      "finishes"
    ],
    "answer": 1,
    "why": "After I’ve, use the past participle: finished."
  },
  {
    "id": "drill-does-work",
    "phraseId": "grammar-aux-does-work",
    "patternId": "aux_base",
    "prompt": "After does, use the base verb:",
    "sentence": [
      "Does this ",
      "____",
      " for you?"
    ],
    "options": [
      "works",
      "work",
      "worked",
      "working"
    ],
    "answer": 1,
    "why": "Does carries the tense, so the main verb is work."
  },
  {
    "id": "drill-will-break",
    "phraseId": "grammar-aux-will-break",
    "patternId": "aux_base",
    "prompt": "After will, use the base verb:",
    "sentence": [
      "Will it ",
      "____",
      " if we remove this check?"
    ],
    "options": [
      "breaks",
      "breaking",
      "break",
      "broke"
    ],
    "answer": 2,
    "why": "Will is followed by the base verb: break."
  },
  {
    "id": "drill-question-order",
    "phraseId": "grammar-question-yesterday",
    "patternId": "question_order",
    "prompt": "Choose the natural question order:",
    "sentence": [
      "What ",
      "____",
      " yesterday?"
    ],
    "options": [
      "you did",
      "did you do",
      "you do did",
      "did you did"
    ],
    "answer": 1,
    "why": "The common frame is question word + did + subject + base verb."
  },
  {
    "id": "drill-example-article",
    "phraseId": "article-example",
    "patternId": "articles",
    "prompt": "Pick the natural article:",
    "sentence": [
      "Could you give me ",
      "____",
      " example?"
    ],
    "options": [
      "a",
      "an",
      "the one",
      "no article"
    ],
    "answer": 1,
    "why": "Example begins with a vowel sound, so use an."
  },
  {
    "id": "drill-screen",
    "phraseId": "article-screen",
    "patternId": "articles",
    "prompt": "Choose the determiner:",
    "sentence": [
      "I’ll share ",
      "____",
      " screen."
    ],
    "options": [
      "screen",
      "my",
      "a my",
      "no"
    ],
    "answer": 1,
    "why": "In a call, it is your screen: share my screen."
  },
  {
    "id": "drill-depend",
    "phraseId": "prep-depend-on",
    "patternId": "preposition_chunks",
    "prompt": "Choose the fixed chunk:",
    "sentence": [
      "It depends ",
      "____",
      " the environment."
    ],
    "options": [
      "of",
      "on",
      "in",
      "for"
    ],
    "answer": 1,
    "why": "The chunk is depend on."
  },
  {
    "id": "drill-points",
    "phraseId": "prep-points-to",
    "patternId": "preposition_chunks",
    "prompt": "Choose the link chunk:",
    "sentence": [
      "The link points ",
      "____",
      " the preview."
    ],
    "options": [
      "for",
      "to",
      "on",
      "of"
    ],
    "answer": 1,
    "why": "Links point to something."
  },
  {
    "id": "drill-look-at",
    "phraseId": "prep-look-at",
    "patternId": "preposition_chunks",
    "prompt": "Choose the natural review phrase:",
    "sentence": [
      "Could you take a look ",
      "____",
      " this?"
    ],
    "options": [
      "of",
      "at",
      "in",
      "for"
    ],
    "answer": 1,
    "why": "The phrase is take a look at."
  },
  {
    "id": "drill-avoid",
    "phraseId": "gerund-avoid-fails",
    "patternId": "gerund_patterns",
    "prompt": "After avoid, use the -ing form:",
    "sentence": [
      "Avoid the request ",
      "____",
      " silently."
    ],
    "options": [
      "fails",
      "to fail",
      "failing",
      "is failing"
    ],
    "answer": 2,
    "why": "Avoid takes a noun-like -ing form: failing."
  },
  {
    "id": "drill-suggest",
    "phraseId": "gerund-suggest-update",
    "patternId": "gerund_patterns",
    "prompt": "After suggest, choose the natural pattern:",
    "sentence": [
      "I suggest ",
      "____",
      " the copy."
    ],
    "options": [
      "to update",
      "updating",
      "update",
      "will update"
    ],
    "answer": 1,
    "why": "Suggest is commonly followed by -ing."
  },
  {
    "id": "drill-feedback",
    "phraseId": "count-feedback",
    "patternId": "count_mass",
    "prompt": "Choose the countability-safe noun:",
    "sentence": [
      "Thanks for the ",
      "____",
      "."
    ],
    "options": [
      "feedbacks",
      "feedback",
      "feedbacking",
      "feedbackes"
    ],
    "answer": 1,
    "why": "Feedback is usually a mass noun."
  },
  {
    "id": "drill-information",
    "phraseId": "count-information",
    "patternId": "count_mass",
    "prompt": "Choose the mass noun form:",
    "sentence": [
      "I need more ",
      "____",
      " about the flow."
    ],
    "options": [
      "informations",
      "information",
      "informative",
      "infos"
    ],
    "answer": 1,
    "why": "Information is usually not pluralized."
  },
  {
    "id": "drill-photo",
    "phraseId": "chunk-photo",
    "patternId": "collocation",
    "prompt": "Choose the natural chunk:",
    "sentence": [
      "Can you ",
      "____",
      " a photo of the board?"
    ],
    "options": [
      "make",
      "do",
      "take",
      "build"
    ],
    "answer": 2,
    "why": "English uses take a photo."
  },
  {
    "id": "drill-thread",
    "phraseId": "chunk-lost-thread",
    "patternId": "collocation",
    "prompt": "Recover a meeting moment:",
    "sentence": [
      "I lost the ",
      "____",
      " for a second."
    ],
    "options": [
      "context",
      "thread",
      "conversation item",
      "line only"
    ],
    "answer": 1,
    "why": "Lost the thread means you lost the flow."
  },
  {
    "id": "drill-replicate",
    "phraseId": "word-replicate",
    "patternId": "word_choice",
    "prompt": "Pick the expected implementation verb:",
    "sentence": [
      "I’ll ",
      "____",
      " the same changes."
    ],
    "options": [
      "mimic",
      "replicate",
      "copycat",
      "simulate"
    ],
    "answer": 1,
    "why": "Replicate is the expected workplace verb for reproducing changes."
  },
  {
    "id": "drill-semicolon",
    "phraseId": "bridge-ready-share",
    "patternId": "comma_bridge",
    "prompt": "Bridge two complete thoughts:",
    "sentence": [
      "The update is ready",
      "____",
      " I’ll share the link."
    ],
    "options": [
      ",",
      ";",
      " and,",
      " because"
    ],
    "answer": 1,
    "why": "A semicolon can connect two complete, closely related thoughts."
  },
  {
    "id": "drill-concise-tests",
    "phraseId": "concision-tests",
    "patternId": "concision",
    "prompt": "Choose the concise status chunk:",
    "sentence": [
      "I’m ",
      "____",
      " a few final tests."
    ],
    "options": [
      "doing some tests to make sure",
      "running",
      "making sure around",
      "checking in a test way"
    ],
    "answer": 1,
    "why": "Running tests is concise and natural."
  },
  {
    "id": "drill-could",
    "phraseId": "register-review",
    "patternId": "register",
    "prompt": "Tune the request:",
    "sentence": [
      "",
      "____",
      " take a quick look when you have a moment?"
    ],
    "options": [
      "Can you now",
      "Could you",
      "You need to",
      "Look at this"
    ],
    "answer": 1,
    "why": "Could you is a common polite request frame."
  },
  {
    "id": "drill-localstorage",
    "phraseId": "tech-localstorage",
    "patternId": "tech_naming",
    "prompt": "Use the exact browser API casing:",
    "sentence": [
      "Use ",
      "____",
      " to persist the setting."
    ],
    "options": [
      "local storage",
      "Local Storage",
      "localStorage",
      "localstorage"
    ],
    "answer": 2,
    "why": "The Web Storage API property is localStorage."
  },
  {
    "id": "drill-small-day",
    "phraseId": "small-opener-day",
    "patternId": "small_openers",
    "prompt": "Pick a warmer opener:",
    "sentence": [
      "Hey, how’s your ",
      "____",
      " going?"
    ],
    "options": [
      "day",
      "status",
      "life issue",
      "busy"
    ],
    "answer": 0,
    "why": "How’s your day going? invites more than fine."
  },
  {
    "id": "drill-weekend",
    "phraseId": "small-opener-weekend",
    "patternId": "small_openers",
    "prompt": "Choose the natural weekend chunk:",
    "sentence": [
      "Did you get up to anything fun ",
      "____",
      " the weekend?"
    ],
    "options": [
      "on",
      "over",
      "in",
      "at"
    ],
    "answer": 1,
    "why": "Over the weekend is the natural chunk."
  },
  {
    "id": "drill-follow-best",
    "phraseId": "small-follow-best-part",
    "patternId": "small_followup",
    "prompt": "Add a follow-up:",
    "sentence": [
      "Oh nice — what was ",
      "____",
      "?"
    ],
    "options": [
      "good",
      "the best part",
      "you did",
      "it"
    ],
    "answer": 1,
    "why": "What was the best part? gives the person an easy next answer."
  },
  {
    "id": "drill-get-into",
    "phraseId": "small-follow-get-into",
    "patternId": "small_followup",
    "prompt": "Ask a curious follow-up:",
    "sentence": [
      "Interesting — how did you ",
      "____",
      " that?"
    ],
    "options": [
      "enter in",
      "get into",
      "start in",
      "go for"
    ],
    "answer": 1,
    "why": "Get into is the natural phrase for starting an interest."
  },
  {
    "id": "drill-working-on",
    "phraseId": "small-work-working-on",
    "patternId": "small_work",
    "prompt": "Choose the workplace chunk:",
    "sentence": [
      "What are you working ",
      "____",
      " these days?"
    ],
    "options": [
      "in",
      "of",
      "on",
      "at"
    ],
    "answer": 2,
    "why": "You work on tasks, tickets, and projects."
  },
  {
    "id": "drill-team",
    "phraseId": "small-work-team",
    "patternId": "small_work",
    "prompt": "Ask about a team naturally:",
    "sentence": [
      "Which team are you ",
      "____",
      "?"
    ],
    "options": [
      "in",
      "on",
      "at",
      "from"
    ],
    "answer": 1,
    "why": "Which team are you on? is the natural workplace phrase."
  },
  {
    "id": "drill-muted",
    "phraseId": "small-remote-muted",
    "patternId": "small_remote",
    "prompt": "Soften a remote-call note:",
    "sentence": [
      "I think you ",
      "____",
      " muted."
    ],
    "options": [
      "are",
      "might be",
      "is",
      "should"
    ],
    "answer": 1,
    "why": "Might be softens a potentially embarrassing call moment."
  },
  {
    "id": "drill-hear",
    "phraseId": "small-remote-hear",
    "patternId": "small_remote",
    "prompt": "Choose the natural call check:",
    "sentence": [
      "Can you hear me ",
      "____",
      "?"
    ],
    "options": [
      "good",
      "okay",
      "nice",
      "clearful"
    ],
    "answer": 1,
    "why": "Can you hear me okay? is the standard call check."
  },
  {
    "id": "drill-appreciation",
    "phraseId": "small-appreciation-presentation",
    "patternId": "small_appreciation",
    "prompt": "Make appreciation specific:",
    "sentence": [
      "I really liked how ",
      "____",
      " your presentation was."
    ],
    "options": [
      "good",
      "clear",
      "normal",
      "fast"
    ],
    "answer": 1,
    "why": "Specific praise feels more sincere than generic praise."
  },
  {
    "id": "drill-exit",
    "phraseId": "chunk-jump-call",
    "patternId": "small_exit",
    "prompt": "End the chat smoothly:",
    "sentence": [
      "I need to ",
      "____",
      " to another call."
    ],
    "options": [
      "go",
      "jump",
      "leave out",
      "stop"
    ],
    "answer": 1,
    "why": "Jump to another call is a common workplace exit phrase."
  },
  {
    "id": "drill-lowkey",
    "phraseId": "small-share-lowkey",
    "patternId": "small_share",
    "prompt": "Give a small self-share:",
    "sentence": [
      "It was pretty ",
      "____",
      ", which was exactly what I needed."
    ],
    "options": [
      "normal",
      "low-key",
      "nothing",
      "empty"
    ],
    "answer": 1,
    "why": "Low-key gives a little personality without oversharing."
  },
  {
    "id": "drill-nvc-observe",
    "phraseId": "nvc-implementation",
    "patternId": "nvc_observation",
    "prompt": "Replace judgment with observation:",
    "sentence": [
      "I’m seeing behavior that doesn’t match the ",
      "____",
      "."
    ],
    "options": [
      "bad idea",
      "acceptance criteria",
      "wrong person",
      "mess"
    ],
    "answer": 1,
    "why": "Acceptance criteria is observable; wrong is a judgment."
  },
  {
    "id": "drill-nvc-reply",
    "phraseId": "nvc-ignore",
    "patternId": "nvc_request",
    "prompt": "Turn blame into a request:",
    "sentence": [
      "Could you let me know when you expect to ",
      "____",
      "?"
    ],
    "options": [
      "reply",
      "stop ignoring",
      "explain yourself",
      "be better"
    ],
    "answer": 0,
    "why": "Reply is a concrete action; stop ignoring is an accusation."
  },
  {
    "id": "drill-nvc-needs",
    "phraseId": "nvc-last-minute",
    "patternId": "nvc_need",
    "prompt": "Name the need behind the reaction:",
    "sentence": [
      "I feel concerned about rework because I need ",
      "____",
      "."
    ],
    "options": [
      "control",
      "predictability",
      "you to stop",
      "pressure"
    ],
    "answer": 1,
    "why": "Predictability names the need without blaming the person."
  },
  {
    "id": "drill-nvc-ownership",
    "phraseId": "nvc-not-my-problem",
    "patternId": "nvc_boundary",
    "prompt": "Set a calm boundary:",
    "sentence": [
      "I want to help, and I need clarity on ",
      "____",
      "."
    ],
    "options": [
      "who failed",
      "ownership",
      "your problem",
      "the excuse"
    ],
    "answer": 1,
    "why": "Ownership frames the boundary around work, not blame."
  },
  {
    "id": "drill-nvc-tradeoff",
    "phraseId": "nvc-disagree",
    "patternId": "nvc_repair",
    "prompt": "Disagree without escalation:",
    "sentence": [
      "I see the trade-off ",
      "____",
      "."
    ],
    "options": [
      "wrong",
      "differently",
      "bad",
      "against you"
    ],
    "answer": 1,
    "why": "Differently creates room for discussion."
  },
  {
    "id": "drill-nvc-urgent",
    "phraseId": "nvc-need-now",
    "patternId": "nvc_request",
    "prompt": "Make urgency actionable:",
    "sentence": [
      "Could you prioritize it today, or tell me what timeline is ",
      "____",
      "?"
    ],
    "options": [
      "realistic",
      "late",
      "wrong",
      "excuse"
    ],
    "answer": 0,
    "why": "A realistic timeline gives room for alternatives."
  },
  {
    "id": "drill-nvc-capacity",
    "phraseId": "nvc-assigning",
    "patternId": "nvc_boundary",
    "prompt": "Ask for a capacity check:",
    "sentence": [
      "Before assigning new work, could you check my ",
      "____",
      "?"
    ],
    "options": [
      "patience",
      "capacity",
      "calendar only",
      "problem"
    ],
    "answer": 1,
    "why": "Capacity is a neutral boundary word."
  },
  {
    "id": "drill-nvc-meeting",
    "phraseId": "nvc-useless-meeting",
    "patternId": "nvc_request",
    "prompt": "Turn meeting frustration into action:",
    "sentence": [
      "Could we capture the owner and next step before we ",
      "____",
      "?"
    ],
    "options": [
      "complain",
      "close",
      "forget",
      "stop badly"
    ],
    "answer": 1,
    "why": "Owner + next step makes the request actionable."
  },
  {
    "id": "drill-nvc-repair",
    "phraseId": "nvc-missed-point",
    "patternId": "nvc_repair",
    "prompt": "Protect ego while clarifying:",
    "sentence": [
      "I think I may not have explained the ",
      "____",
      " clearly."
    ],
    "options": [
      "goal",
      "your mistake",
      "obvious thing",
      "problem person"
    ],
    "answer": 0,
    "why": "This repairs the interaction before restating the point."
  },
  {
    "id": "drill-v6-001",
    "phraseId": "grammar-v6-present-perfect-01",
    "patternId": "present_perfect",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "I’ve ",
      "____",
      " the file."
    ],
    "options": [
      "send",
      "sent",
      "doing",
      "does"
    ],
    "answer": 1,
    "why": "When you see have/has, check that the next main verb is a participle."
  },
  {
    "id": "drill-v6-002",
    "phraseId": "grammar-v6-present-perfect-02",
    "patternId": "present_perfect",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "I’ve already ",
      "____",
      " it."
    ],
    "options": [
      "did",
      "done",
      "doing",
      "does"
    ],
    "answer": 1,
    "why": "When you see have/has, check that the next main verb is a participle."
  },
  {
    "id": "drill-v6-003",
    "phraseId": "grammar-v6-present-perfect-03",
    "patternId": "present_perfect",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "I haven’t ",
      "____",
      " the invite yet."
    ],
    "options": [
      "receive",
      "received",
      "doing",
      "does"
    ],
    "answer": 1,
    "why": "When you see have/has, check that the next main verb is a participle."
  },
  {
    "id": "drill-v6-004",
    "phraseId": "grammar-v6-present-perfect-04",
    "patternId": "present_perfect",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Have you ",
      "____",
      " the notes?"
    ],
    "options": [
      "saw",
      "seen",
      "doing",
      "does"
    ],
    "answer": 1,
    "why": "When you see have/has, check that the next main verb is a participle."
  },
  {
    "id": "drill-v6-005",
    "phraseId": "grammar-v6-present-perfect-05",
    "patternId": "present_perfect",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "The page has ",
      "____",
      " correctly."
    ],
    "options": [
      "load",
      "loaded",
      "doing",
      "does"
    ],
    "answer": 1,
    "why": "When you see have/has, check that the next main verb is a participle."
  },
  {
    "id": "drill-v6-006",
    "phraseId": "grammar-v6-present-perfect-06",
    "patternId": "present_perfect",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "I’ve been ",
      "____",
      " on this since morning."
    ],
    "options": [
      "work",
      "working",
      "doing",
      "does"
    ],
    "answer": 1,
    "why": "When you see have/has, check that the next main verb is a participle."
  },
  {
    "id": "drill-v6-007",
    "phraseId": "grammar-v6-present-perfect-07",
    "patternId": "present_perfect",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "She has ",
      "____",
      " home."
    ],
    "options": [
      "went",
      "gone",
      "doing",
      "does"
    ],
    "answer": 1,
    "why": "When you see have/has, check that the next main verb is a participle."
  },
  {
    "id": "drill-v6-008",
    "phraseId": "grammar-v6-present-perfect-08",
    "patternId": "present_perfect",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "We have ",
      "____",
      " the options."
    ],
    "options": [
      "discuss",
      "discussed",
      "doing",
      "does"
    ],
    "answer": 1,
    "why": "When you see have/has, check that the next main verb is a participle."
  },
  {
    "id": "drill-v6-009",
    "phraseId": "grammar-v6-aux-base-01",
    "patternId": "aux_base",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Does it ",
      "____",
      " sense?"
    ],
    "options": [
      "makes",
      "make",
      "makesing",
      "worked"
    ],
    "answer": 1,
    "why": "After does/did/will/can/could/should/would, test the base verb."
  },
  {
    "id": "drill-v6-010",
    "phraseId": "grammar-v6-aux-base-02",
    "patternId": "aux_base",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Did you ",
      "____",
      " the branch?"
    ],
    "options": [
      "pushed",
      "push",
      "pusheding",
      "worked"
    ],
    "answer": 1,
    "why": "After does/did/will/can/could/should/would, test the base verb."
  },
  {
    "id": "drill-v6-011",
    "phraseId": "grammar-v6-aux-base-03",
    "patternId": "aux_base",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Will this ",
      "____",
      " the layout?"
    ],
    "options": [
      "breaks",
      "break",
      "breaksing",
      "worked"
    ],
    "answer": 1,
    "why": "After does/did/will/can/could/should/would, test the base verb."
  },
  {
    "id": "drill-v6-012",
    "phraseId": "grammar-v6-aux-base-04",
    "patternId": "aux_base",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Can you ",
      "____",
      " the logs?"
    ],
    "options": [
      "checks",
      "check",
      "checksing",
      "worked"
    ],
    "answer": 1,
    "why": "After does/did/will/can/could/should/would, test the base verb."
  },
  {
    "id": "drill-v6-013",
    "phraseId": "grammar-v6-aux-base-05",
    "patternId": "aux_base",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Could you ",
      "____",
      " the file?"
    ],
    "options": [
      "shares",
      "share",
      "sharesing",
      "worked"
    ],
    "answer": 1,
    "why": "After does/did/will/can/could/should/would, test the base verb."
  },
  {
    "id": "drill-v6-014",
    "phraseId": "grammar-v6-aux-base-06",
    "patternId": "aux_base",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Should we ",
      "____",
      " this approach?"
    ],
    "options": [
      "uses",
      "use",
      "usesing",
      "worked"
    ],
    "answer": 1,
    "why": "After does/did/will/can/could/should/would, test the base verb."
  },
  {
    "id": "drill-v6-015",
    "phraseId": "grammar-v6-aux-base-07",
    "patternId": "aux_base",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Would it ",
      "____",
      "?"
    ],
    "options": [
      "helps",
      "help",
      "helpsing",
      "worked"
    ],
    "answer": 1,
    "why": "After does/did/will/can/could/should/would, test the base verb."
  },
  {
    "id": "drill-v6-016",
    "phraseId": "grammar-v6-question-order-01",
    "patternId": "question_order",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "?"
    ],
    "options": [
      "Why this happens",
      "Why does this happen",
      "Where I can",
      "option 4"
    ],
    "answer": 1,
    "why": "Use question word + auxiliary + subject + base verb."
  },
  {
    "id": "drill-v6-017",
    "phraseId": "grammar-v6-question-order-02",
    "patternId": "question_order",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "?"
    ],
    "options": [
      "When you will start",
      "When will you start",
      "Where I can",
      "Why this happens"
    ],
    "answer": 1,
    "why": "Use question word + auxiliary + subject + base verb."
  },
  {
    "id": "drill-v6-018",
    "phraseId": "grammar-v6-question-order-03",
    "patternId": "question_order",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "?"
    ],
    "options": [
      "Where I can find it",
      "Where can I find it",
      "Where I can",
      "Why this happens"
    ],
    "answer": 1,
    "why": "Use question word + auxiliary + subject + base verb."
  },
  {
    "id": "drill-v6-019",
    "phraseId": "grammar-v6-question-order-04",
    "patternId": "question_order",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      " about this?"
    ],
    "options": [
      "What you think",
      "What do you think",
      "Where I can",
      "Why this happens"
    ],
    "answer": 1,
    "why": "Use question word + auxiliary + subject + base verb."
  },
  {
    "id": "drill-v6-020",
    "phraseId": "grammar-v6-question-order-05",
    "patternId": "question_order",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "?"
    ],
    "options": [
      "How I can test it",
      "How can I test it",
      "Where I can",
      "Why this happens"
    ],
    "answer": 1,
    "why": "Use question word + auxiliary + subject + base verb."
  },
  {
    "id": "drill-v6-021",
    "phraseId": "work-v6-comma-bridge-01",
    "patternId": "comma_bridge",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "The build is ready",
      "____",
      " I will share it."
    ],
    "options": [
      ",",
      ";",
      "and,",
      "option 4"
    ],
    "answer": 1,
    "why": "Use a period, semicolon, or connector such as so, because, then, or however."
  },
  {
    "id": "drill-v6-022",
    "phraseId": "work-v6-comma-bridge-02",
    "patternId": "comma_bridge",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "The bug is fixed",
      "____",
      " we can retest."
    ],
    "options": [
      ",",
      ";",
      "and,",
      "option 4"
    ],
    "answer": 1,
    "why": "Use a period, semicolon, or connector such as so, because, then, or however."
  },
  {
    "id": "drill-v6-023",
    "phraseId": "work-v6-comma-bridge-03",
    "patternId": "comma_bridge",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "I checked the logs",
      "____",
      " there is no error."
    ],
    "options": [
      ",",
      ";",
      "and,",
      "option 4"
    ],
    "answer": 1,
    "why": "Use a period, semicolon, or connector such as so, because, then, or however."
  },
  {
    "id": "drill-v6-024",
    "phraseId": "work-v6-comma-bridge-04",
    "patternId": "comma_bridge",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "The deadline changed",
      "____",
      " need to update the plan."
    ],
    "options": [
      ", we",
      ", so we",
      ",",
      "and,"
    ],
    "answer": 1,
    "why": "Use a period, semicolon, or connector such as so, because, then, or however."
  },
  {
    "id": "drill-v6-025",
    "phraseId": "work-v6-comma-bridge-05",
    "patternId": "comma_bridge",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "The branch is old",
      "____",
      " will rebase it."
    ],
    "options": [
      ", I",
      ", so I",
      ",",
      "and,"
    ],
    "answer": 1,
    "why": "Use a period, semicolon, or connector such as so, because, then, or however."
  },
  {
    "id": "drill-v6-026",
    "phraseId": "work-v6-comma-bridge-06",
    "patternId": "comma_bridge",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "The API is slow",
      "____",
      " the UI waits too long."
    ],
    "options": [
      ",",
      ";",
      "and,",
      "option 4"
    ],
    "answer": 1,
    "why": "Use a period, semicolon, or connector such as so, because, then, or however."
  },
  {
    "id": "drill-v6-027",
    "phraseId": "work-v6-comma-bridge-07",
    "patternId": "comma_bridge",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "The copy is updated",
      "____",
      " nothing else changed."
    ],
    "options": [
      ",",
      ";",
      "and,",
      "option 4"
    ],
    "answer": 1,
    "why": "Use a period, semicolon, or connector such as so, because, then, or however."
  },
  {
    "id": "drill-v6-028",
    "phraseId": "work-v6-comma-bridge-08",
    "patternId": "comma_bridge",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "I agree with the approach",
      "____",
      " keeps the flow simple."
    ],
    "options": [
      ", it",
      " because it",
      ",",
      "and,"
    ],
    "answer": 1,
    "why": "Use a period, semicolon, or connector such as so, because, then, or however."
  },
  {
    "id": "drill-v6-029",
    "phraseId": "work-v6-concision-01",
    "patternId": "concision",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Choose the refined version: ",
      "____",
      ""
    ],
    "options": [
      "I am writing here to say that ",
      "",
      "just basically",
      "making sure"
    ],
    "answer": 1,
    "why": "Keep action, reason, and next step; cut the words around them."
  },
  {
    "id": "drill-v6-030",
    "phraseId": "work-v6-concision-02",
    "patternId": "concision",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Choose the refined version: ",
      "____",
      ""
    ],
    "options": [
      "Just to let you know, ",
      "",
      "just basically",
      "making sure"
    ],
    "answer": 1,
    "why": "Keep action, reason, and next step; cut the words around them."
  },
  {
    "id": "drill-v6-031",
    "phraseId": "work-v6-concision-03",
    "patternId": "concision",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      " check this?"
    ],
    "options": [
      "I wanted to ask if maybe you can",
      "Could you",
      "just basically",
      "making sure"
    ],
    "answer": 1,
    "why": "Keep action, reason, and next step; cut the words around them."
  },
  {
    "id": "drill-v6-032",
    "phraseId": "work-v6-concision-04",
    "patternId": "concision",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      " the review is missing."
    ],
    "options": [
      "From my side, the only thing that is missing is",
      "Only",
      "just basically",
      "making sure"
    ],
    "answer": 1,
    "why": "Keep action, reason, and next step; cut the words around them."
  },
  {
    "id": "drill-v6-033",
    "phraseId": "work-v6-concision-05",
    "patternId": "concision",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "I ",
      "____",
      " the cache."
    ],
    "options": [
      "did some investigation and found that the issue is in",
      "traced the issue to",
      "just basically",
      "making sure"
    ],
    "answer": 1,
    "why": "Keep action, reason, and next step; cut the words around them."
  },
  {
    "id": "drill-v6-034",
    "phraseId": "work-v6-concision-06",
    "patternId": "concision",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "."
    ],
    "options": [
      "There is one thing that I think we need to decide",
      "We need to decide one thing",
      "just basically",
      "making sure"
    ],
    "answer": 1,
    "why": "Keep action, reason, and next step; cut the words around them."
  },
  {
    "id": "drill-v6-035",
    "phraseId": "work-v6-concision-07",
    "patternId": "concision",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Choose the refined version: ",
      "____",
      ""
    ],
    "options": [
      "I was checking and it seems that ",
      "",
      "just basically",
      "making sure"
    ],
    "answer": 1,
    "why": "Keep action, reason, and next step; cut the words around them."
  },
  {
    "id": "drill-v6-036",
    "phraseId": "work-v6-concision-08",
    "patternId": "concision",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Choose the refined version: ",
      "____",
      ""
    ],
    "options": [
      "The main idea here is that ",
      "",
      "just basically",
      "making sure"
    ],
    "answer": 1,
    "why": "Keep action, reason, and next step; cut the words around them."
  },
  {
    "id": "drill-v6-037",
    "phraseId": "work-v6-concision-09",
    "patternId": "concision",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      " simplify this."
    ],
    "options": [
      "I think it would be good if we could maybe",
      "We should",
      "just basically",
      "making sure"
    ],
    "answer": 1,
    "why": "Keep action, reason, and next step; cut the words around them."
  },
  {
    "id": "drill-v6-038",
    "phraseId": "work-v6-concision-10",
    "patternId": "concision",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Choose the refined version: ",
      "____",
      ""
    ],
    "options": [
      " from what I can see",
      "",
      "just basically",
      "making sure"
    ],
    "answer": 1,
    "why": "Keep action, reason, and next step; cut the words around them."
  },
  {
    "id": "drill-v6-039",
    "phraseId": "work-v6-concision-11",
    "patternId": "concision",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Choose the refined version: ",
      "____",
      ""
    ],
    "options": [
      "the small part related to the ",
      "",
      "just basically",
      "making sure"
    ],
    "answer": 1,
    "why": "Keep action, reason, and next step; cut the words around them."
  },
  {
    "id": "drill-v6-040",
    "phraseId": "work-v6-concision-12",
    "patternId": "concision",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "I’ll continue ",
      "____",
      "review."
    ],
    "options": [
      "working on this after I finish the ",
      "after the ",
      "just basically",
      "making sure"
    ],
    "answer": 1,
    "why": "Keep action, reason, and next step; cut the words around them."
  },
  {
    "id": "drill-v6-041",
    "phraseId": "small-v6-opener-01",
    "patternId": "small_openers",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "?"
    ],
    "options": [
      "How are you",
      "How’s your day going so far",
      "Are you busy?",
      "Good?"
    ],
    "answer": 1,
    "why": "Ask something light, answerable, and tied to the moment."
  },
  {
    "id": "drill-v6-042",
    "phraseId": "small-v6-opener-02",
    "patternId": "small_openers",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      " today?"
    ],
    "options": [
      "What did you do",
      "What have you been up to",
      "Are you busy?",
      "Good?"
    ],
    "answer": 1,
    "why": "Ask something light, answerable, and tied to the moment."
  },
  {
    "id": "drill-v6-043",
    "phraseId": "small-v6-opener-03",
    "patternId": "small_openers",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      " the event so far?"
    ],
    "options": [
      "Do you like",
      "How are you finding",
      "Are you busy?",
      "Good?"
    ],
    "answer": 1,
    "why": "Ask something light, answerable, and tied to the moment."
  },
  {
    "id": "drill-v6-044",
    "phraseId": "small-v6-opener-04",
    "patternId": "small_openers",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Where are you ",
      "____",
      "?"
    ],
    "options": [
      "from",
      "joining from today",
      "Are you busy?",
      "Good?"
    ],
    "answer": 1,
    "why": "Ask something light, answerable, and tied to the moment."
  },
  {
    "id": "drill-v6-045",
    "phraseId": "small-v6-opener-05",
    "patternId": "small_openers",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "?"
    ],
    "options": [
      "Is everything good",
      "How’s everything going on your side",
      "Are you busy?",
      "Good?"
    ],
    "answer": 1,
    "why": "Ask something light, answerable, and tied to the moment."
  },
  {
    "id": "drill-v6-046",
    "phraseId": "small-v6-opener-06",
    "patternId": "small_openers",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "?"
    ],
    "options": [
      "Are you having a good week",
      "How’s your week going so far",
      "Are you busy?",
      "Good?"
    ],
    "answer": 1,
    "why": "Ask something light, answerable, and tied to the moment."
  },
  {
    "id": "drill-v6-047",
    "phraseId": "small-v6-opener-07",
    "patternId": "small_openers",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "?"
    ],
    "options": [
      "You had lunch",
      "Have you had a chance to grab lunch",
      "Are you busy?",
      "Good?"
    ],
    "answer": 1,
    "why": "Ask something light, answerable, and tied to the moment."
  },
  {
    "id": "drill-v6-048",
    "phraseId": "small-v6-opener-08",
    "patternId": "small_openers",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "?"
    ],
    "options": [
      "Did you rest",
      "Did you get any time to recharge",
      "Are you busy?",
      "Good?"
    ],
    "answer": 1,
    "why": "Ask something light, answerable, and tied to the moment."
  },
  {
    "id": "drill-v6-049",
    "phraseId": "small-v6-followup-01",
    "patternId": "small_followup",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Cool",
      "____",
      ""
    ],
    "options": [
      ".",
      " — what got you interested in that?",
      "Cool.",
      "And?"
    ],
    "answer": 1,
    "why": "Pick one detail from their answer and ask about that detail."
  },
  {
    "id": "drill-v6-050",
    "phraseId": "small-v6-followup-02",
    "patternId": "small_followup",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Nice",
      "____",
      ""
    ],
    "options": [
      ".",
      " — how did it go?",
      "Cool.",
      "And?"
    ],
    "answer": 1,
    "why": "Pick one detail from their answer and ask about that detail."
  },
  {
    "id": "drill-v6-051",
    "phraseId": "small-v6-followup-03",
    "patternId": "small_followup",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "?"
    ],
    "options": [
      "Good",
      "That sounds good — what made it work",
      "Cool.",
      "And?"
    ],
    "answer": 1,
    "why": "Pick one detail from their answer and ask about that detail."
  },
  {
    "id": "drill-v6-052",
    "phraseId": "small-v6-followup-04",
    "patternId": "small_followup",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "I see",
      "____",
      ""
    ],
    "options": [
      ".",
      " — what happened after that?",
      "Cool.",
      "And?"
    ],
    "answer": 1,
    "why": "Pick one detail from their answer and ask about that detail."
  },
  {
    "id": "drill-v6-053",
    "phraseId": "small-v6-followup-05",
    "patternId": "small_followup",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Interesting",
      "____",
      ""
    ],
    "options": [
      ".",
      " — what surprised you about it?",
      "Cool.",
      "And?"
    ],
    "answer": 1,
    "why": "Pick one detail from their answer and ask about that detail."
  },
  {
    "id": "drill-v6-054",
    "phraseId": "small-v6-followup-06",
    "patternId": "small_followup",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Sounds fun",
      "____",
      ""
    ],
    "options": [
      ".",
      " — would you do it again?",
      "Cool.",
      "And?"
    ],
    "answer": 1,
    "why": "Pick one detail from their answer and ask about that detail."
  },
  {
    "id": "drill-v6-055",
    "phraseId": "small-v6-followup-07",
    "patternId": "small_followup",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      ""
    ],
    "options": [
      "Really?",
      "Really? What was that like?",
      "Cool.",
      "And?"
    ],
    "answer": 1,
    "why": "Pick one detail from their answer and ask about that detail."
  },
  {
    "id": "drill-v6-056",
    "phraseId": "small-v6-followup-08",
    "patternId": "small_followup",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Okay",
      "____",
      ""
    ],
    "options": [
      ".",
      " — what are you thinking of trying next?",
      "Cool.",
      "And?"
    ],
    "answer": 1,
    "why": "Pick one detail from their answer and ask about that detail."
  },
  {
    "id": "drill-v6-057",
    "phraseId": "small-v6-work-01",
    "patternId": "small_work",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      " here?"
    ],
    "options": [
      "What do you do",
      "What kind of work are you focused on",
      "You like it?",
      "What are you working?"
    ],
    "answer": 1,
    "why": "Use shared context: project, team, tools, sprint, meeting, lunch, or time off."
  },
  {
    "id": "drill-v6-058",
    "phraseId": "small-v6-work-02",
    "patternId": "small_work",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "Which project ",
      "____",
      "?"
    ],
    "options": [
      "is yours",
      "are you working on at the moment",
      "You like it?",
      "What are you working?"
    ],
    "answer": 1,
    "why": "Use shared context: project, team, tools, sprint, meeting, lunch, or time off."
  },
  {
    "id": "drill-v6-059",
    "phraseId": "small-v6-work-03",
    "patternId": "small_work",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "?"
    ],
    "options": [
      "Are you new",
      "Have you been with the team long",
      "You like it?",
      "What are you working?"
    ],
    "answer": 1,
    "why": "Use shared context: project, team, tools, sprint, meeting, lunch, or time off."
  },
  {
    "id": "drill-v6-060",
    "phraseId": "small-v6-work-04",
    "patternId": "small_work",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "?"
    ],
    "options": [
      "Is your work hard",
      "How has the work been going",
      "You like it?",
      "What are you working?"
    ],
    "answer": 1,
    "why": "Use shared context: project, team, tools, sprint, meeting, lunch, or time off."
  },
  {
    "id": "drill-v6-061",
    "phraseId": "nvc-v6-observation-01",
    "patternId": "nvc_observation",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "."
    ],
    "options": [
      "You always change your mind",
      "The scope changed after we started implementation",
      "You always...",
      "This is wrong."
    ],
    "answer": 1,
    "why": "Start with what a camera could record."
  },
  {
    "id": "drill-v6-062",
    "phraseId": "nvc-v6-observation-02",
    "patternId": "nvc_observation",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "."
    ],
    "options": [
      "You ignored the ticket",
      "I don’t see an update on the ticket",
      "You always...",
      "This is wrong."
    ],
    "answer": 1,
    "why": "Start with what a camera could record."
  },
  {
    "id": "drill-v6-063",
    "phraseId": "nvc-v6-observation-03",
    "patternId": "nvc_observation",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "."
    ],
    "options": [
      "You didn’t read the doc",
      "I’m seeing a question that is answered in the document",
      "You always...",
      "This is wrong."
    ],
    "answer": 1,
    "why": "Start with what a camera could record."
  },
  {
    "id": "drill-v6-064",
    "phraseId": "nvc-v6-observation-04",
    "patternId": "nvc_observation",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "."
    ],
    "options": [
      "This is a mess",
      "I see three different versions of the flow",
      "You always...",
      "This is wrong."
    ],
    "answer": 1,
    "why": "Start with what a camera could record."
  },
  {
    "id": "drill-v6-065",
    "phraseId": "nvc-v6-observation-05",
    "patternId": "nvc_observation",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "."
    ],
    "options": [
      "You are interrupting me",
      "I noticed I was interrupted twice while explaining the issue",
      "You always...",
      "This is wrong."
    ],
    "answer": 1,
    "why": "Start with what a camera could record."
  },
  {
    "id": "drill-v6-066",
    "phraseId": "nvc-v6-observation-06",
    "patternId": "nvc_observation",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "."
    ],
    "options": [
      "You are not listening",
      "I don’t think my last point was addressed",
      "You always...",
      "This is wrong."
    ],
    "answer": 1,
    "why": "Start with what a camera could record."
  },
  {
    "id": "drill-v6-067",
    "phraseId": "nvc-v6-observation-07",
    "patternId": "nvc_observation",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "."
    ],
    "options": [
      "You are rushing",
      "The timeline moved earlier than I expected",
      "You always...",
      "This is wrong."
    ],
    "answer": 1,
    "why": "Start with what a camera could record."
  },
  {
    "id": "drill-v6-068",
    "phraseId": "nvc-v6-observation-08",
    "patternId": "nvc_observation",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "."
    ],
    "options": [
      "You are hiding information",
      "I don’t have access to the context I need",
      "You always...",
      "This is wrong."
    ],
    "answer": 1,
    "why": "Start with what a camera could record."
  },
  {
    "id": "drill-v6-069",
    "phraseId": "nvc-v6-observation-09",
    "patternId": "nvc_observation",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "."
    ],
    "options": [
      "You keep changing the design",
      "The design changed twice this week",
      "You always...",
      "This is wrong."
    ],
    "answer": 1,
    "why": "Start with what a camera could record."
  },
  {
    "id": "drill-v6-070",
    "phraseId": "nvc-v6-observation-10",
    "patternId": "nvc_observation",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "."
    ],
    "options": [
      "You created confusion",
      "I’m seeing different interpretations of the same requirement",
      "You always...",
      "This is wrong."
    ],
    "answer": 1,
    "why": "Start with what a camera could record."
  },
  {
    "id": "drill-v6-071",
    "phraseId": "nvc-v6-feeling-01",
    "patternId": "nvc_feeling",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "."
    ],
    "options": [
      "You make me nervous",
      "I feel nervous because the deadline is close",
      "You make me...",
      "I feel like..."
    ],
    "answer": 1,
    "why": "Use I feel plus an emotion, not I feel like plus a judgment."
  },
  {
    "id": "drill-v6-072",
    "phraseId": "nvc-v6-feeling-02",
    "patternId": "nvc_feeling",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "."
    ],
    "options": [
      "You are stressing me out",
      "I’m feeling pressure because the scope is still changing",
      "You make me...",
      "I feel like..."
    ],
    "answer": 1,
    "why": "Use I feel plus an emotion, not I feel like plus a judgment."
  },
  {
    "id": "drill-v6-073",
    "phraseId": "nvc-v6-feeling-03",
    "patternId": "nvc_feeling",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "."
    ],
    "options": [
      "This makes me angry",
      "I feel frustrated because I expected more clarity",
      "You make me...",
      "I feel like..."
    ],
    "answer": 1,
    "why": "Use I feel plus an emotion, not I feel like plus a judgment."
  },
  {
    "id": "drill-v6-074",
    "phraseId": "nvc-v6-feeling-04",
    "patternId": "nvc_feeling",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "."
    ],
    "options": [
      "You made me feel stupid",
      "I feel embarrassed because I need room to ask basic questions",
      "You make me...",
      "I feel like..."
    ],
    "answer": 1,
    "why": "Use I feel plus an emotion, not I feel like plus a judgment."
  },
  {
    "id": "drill-v6-075",
    "phraseId": "nvc-v6-feeling-05",
    "patternId": "nvc_feeling",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "."
    ],
    "options": [
      "I feel like you don’t trust me",
      "I feel concerned because I need trust in the handoff",
      "You make me...",
      "I feel like..."
    ],
    "answer": 1,
    "why": "Use I feel plus an emotion, not I feel like plus a judgment."
  },
  {
    "id": "drill-v6-076",
    "phraseId": "nvc-v6-feeling-06",
    "patternId": "nvc_feeling",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "."
    ],
    "options": [
      "You are making this hard",
      "I feel stuck because the criteria are not clear yet",
      "You make me...",
      "I feel like..."
    ],
    "answer": 1,
    "why": "Use I feel plus an emotion, not I feel like plus a judgment."
  },
  {
    "id": "drill-v6-077",
    "phraseId": "nvc-v6-feeling-07",
    "patternId": "nvc_feeling",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "."
    ],
    "options": [
      "I feel like this is unfair",
      "I feel discouraged because I need consistency in the process",
      "You make me...",
      "I feel like..."
    ],
    "answer": 1,
    "why": "Use I feel plus an emotion, not I feel like plus a judgment."
  },
  {
    "id": "drill-v6-078",
    "phraseId": "nvc-v6-feeling-08",
    "patternId": "nvc_feeling",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "",
      "____",
      "."
    ],
    "options": [
      "You made me lose time",
      "I feel frustrated because I need to protect focus time",
      "You make me...",
      "I feel like..."
    ],
    "answer": 1,
    "why": "Use I feel plus an emotion, not I feel like plus a judgment."
  },
  {
    "id": "drill-v6-079",
    "phraseId": "nvc-v6-need-01",
    "patternId": "nvc_need",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "I need ",
      "____",
      "."
    ],
    "options": [
      "you to stop changing things",
      "predictability around scope changes",
      "I need you...",
      "because you..."
    ],
    "answer": 1,
    "why": "Name clarity, predictability, support, visibility, focus, or autonomy."
  },
  {
    "id": "drill-v6-080",
    "phraseId": "nvc-v6-need-02",
    "patternId": "nvc_need",
    "prompt": "Choose the tutor-style refinement:",
    "sentence": [
      "I need ",
      "____",
      "."
    ],
    "options": [
      "you to answer faster",
      "more visibility on review timing",
      "I need you...",
      "because you..."
    ],
    "answer": 1,
    "why": "Name clarity, predictability, support, visibility, focus, or autonomy."
  }
];

export const NOTE_PACKS = {
  "present_perfect": {
    "title": "Have + past participle",
    "mistakes": [
      [
        "I’ve finish the report.",
        "I’ve finished the report."
      ],
      [
        "We’ve push the update.",
        "We’ve pushed the update."
      ],
      [
        "I have make the changes.",
        "I have made the changes."
      ],
      [
        "I have seen it yesterday.",
        "I saw it yesterday."
      ]
    ],
    "examples": [
      [
        "I’ve done the review.",
        "The review is complete now."
      ],
      [
        "We’ve fixed the issue.",
        "The issue has a present result."
      ],
      [
        "I’ve worked here since 2022.",
        "The situation continues now."
      ],
      [
        "I’ve send the file.",
        "I’ve sent the file."
      ],
      [
        "I’ve already did it.",
        "I’ve already done it."
      ],
      [
        "I haven’t receive the invite yet.",
        "I haven’t received the invite yet."
      ],
      [
        "Have you saw the notes?",
        "Have you seen the notes?"
      ],
      [
        "The page has load correctly.",
        "The page has loaded correctly."
      ]
    ],
    "tips": [
      "Formula: have/has + past participle.",
      "Use present perfect for experience, recent result, or a past action connected to now.",
      "Use simple past with finished-time markers such as yesterday or last week.",
      "When you see have/has, check that the next main verb is a participle."
    ]
  },
  "aux_base": {
    "title": "Auxiliary + base verb",
    "mistakes": [
      [
        "Does this works?",
        "Does this work?"
      ],
      [
        "Will it breaks?",
        "Will it break?"
      ],
      [
        "Why did you changed it?",
        "Why did you change it?"
      ],
      [
        "Can you checks this?",
        "Can you check this?"
      ]
    ],
    "examples": [
      [
        "Does the button work?",
        "does + base verb"
      ],
      [
        "Did the test pass?",
        "did + base verb"
      ],
      [
        "Will the change affect the page?",
        "will + base verb"
      ],
      [
        "Does it makes sense?",
        "Does it make sense?"
      ],
      [
        "Did you pushed the branch?",
        "Did you push the branch?"
      ],
      [
        "Will this breaks the layout?",
        "Will this break the layout?"
      ],
      [
        "Can you checks the logs?",
        "Can you check the logs?"
      ],
      [
        "Could you shares the file?",
        "Could you share the file?"
      ]
    ],
    "tips": [
      "The helper carries the tense; the main verb stays simple.",
      "Check does/did/will/can/could/should/would before checking anything else.",
      "This is one of the fastest mistakes to catch with a one-second scan.",
      "After does/did/will/can/could/should/would, test the base verb."
    ]
  },
  "question_order": {
    "title": "Question order",
    "mistakes": [
      [
        "What you did?",
        "What did you do?"
      ],
      [
        "Which team you are on?",
        "Which team are you on?"
      ],
      [
        "What tools you use?",
        "What tools are you using?"
      ],
      [
        "Where this is?",
        "Where is this?"
      ]
    ],
    "examples": [
      [
        "How does this work?",
        "question word + auxiliary + subject + verb"
      ],
      [
        "What did you change?",
        "did + subject + base verb"
      ],
      [
        "Which option are you testing?",
        "be verb before subject"
      ],
      [
        "Why this happens?",
        "Why does this happen?"
      ],
      [
        "When you will start?",
        "When will you start?"
      ],
      [
        "Where I can find it?",
        "Where can I find it?"
      ],
      [
        "What you think about this?",
        "What do you think about this?"
      ],
      [
        "How I can test it?",
        "How can I test it?"
      ]
    ],
    "tips": [
      "Use a frame instead of translating: what + did + you + do.",
      "If there is no be/modal/helper, add do/does/did.",
      "Subject questions are the exception: Who broke the build?",
      "Use question word + auxiliary + subject + base verb."
    ]
  },
  "articles": {
    "title": "A/an/the/my naturalness pass",
    "mistakes": [
      [
        "a example",
        "an example"
      ],
      [
        "share screen",
        "share my screen"
      ],
      [
        "a area",
        "an area"
      ],
      [
        "in loading state",
        "in the loading state"
      ]
    ],
    "examples": [
      [
        "Could you give me an example?",
        "one example"
      ],
      [
        "I’ll share my screen.",
        "your screen in this context"
      ],
      [
        "The loading state is stuck.",
        "known UI state"
      ],
      [
        "I found issue in the flow.",
        "I found an issue in the flow."
      ],
      [
        "Can you send link?",
        "Can you send the link?"
      ],
      [
        "We need create ticket.",
        "We need to create a ticket."
      ],
      [
        "It is expected behavior.",
        "It is the expected behavior."
      ],
      [
        "I’ll check with team.",
        "I’ll check with the team."
      ]
    ],
    "tips": [
      "Use an before vowel sounds.",
      "Use my/the when the noun belongs to the current situation.",
      "Articles are small but they strongly affect naturalness.",
      "Ask whether this is one item, a known item, or something owned by the context."
    ]
  },
  "preposition_chunks": {
    "title": "Prepositions as chunks",
    "mistakes": [
      [
        "depends of",
        "depends on"
      ],
      [
        "points for",
        "points to"
      ],
      [
        "work in a ticket",
        "work on a ticket"
      ],
      [
        "take a look of",
        "take a look at"
      ]
    ],
    "examples": [
      [
        "The result depends on the environment.",
        "depend on"
      ],
      [
        "The link points to the preview.",
        "point to"
      ],
      [
        "I’m working on the ticket.",
        "work on"
      ],
      [
        "Could you take a look at this?",
        "look at"
      ],
      [
        "It depends of the environment.",
        "It depends on the environment."
      ],
      [
        "I’m working in this task.",
        "I’m working on this task."
      ],
      [
        "The error happens on the modal.",
        "The error happens in the modal."
      ],
      [
        "Let’s discuss about the plan.",
        "Let’s discuss the plan."
      ]
    ],
    "tips": [
      "Prepositions are often part of the phrase, not a separate translation problem.",
      "Keep a chunk list for your most common work messages.",
      "When a sentence sounds close but odd, check the preposition first.",
      "Learn the whole chunk instead of translating the preposition."
    ]
  },
  "gerund_patterns": {
    "title": "Verb + -ing pattern",
    "mistakes": [
      [
        "avoid it breaks",
        "avoid it breaking"
      ],
      [
        "suggest to update",
        "suggest updating"
      ],
      [
        "finish to write",
        "finish writing"
      ],
      [
        "prevent the user sees it",
        "prevent the user from seeing it"
      ]
    ],
    "examples": [
      [
        "Avoid breaking the flow.",
        "avoid + -ing"
      ],
      [
        "I suggest updating the copy.",
        "suggest + -ing"
      ],
      [
        "This prevents users from seeing the wrong page.",
        "prevent + object + from + -ing"
      ],
      [
        "We should avoid to reload the page.",
        "We should avoid reloading the page."
      ],
      [
        "I suggest to move it later.",
        "I suggest moving it later."
      ],
      [
        "I finished to update the copy.",
        "I finished updating the copy."
      ],
      [
        "Would you mind to check this?",
        "Would you mind checking this?"
      ],
      [
        "This prevents the user to submit twice.",
        "This prevents the user from submitting twice."
      ]
    ],
    "tips": [
      "After avoid, finish, suggest, mind, and enjoy, test -ing.",
      "Prevent often takes object + from + -ing.",
      "If the second half sounds like a full sentence, reshape it into an action.",
      "After avoid, suggest, finish, mind, and prevent, test the -ing shape."
    ]
  },
  "count_mass": {
    "title": "Countability and agreement",
    "mistakes": [
      [
        "feedbacks",
        "feedback"
      ],
      [
        "informations",
        "information"
      ],
      [
        "this examples",
        "these examples"
      ],
      [
        "advices",
        "advice"
      ]
    ],
    "examples": [
      [
        "I need more information.",
        "mass noun"
      ],
      [
        "Thanks for the feedback.",
        "mass noun"
      ],
      [
        "These examples contain common mistakes.",
        "plural agreement"
      ],
      [
        "Thanks for the advices.",
        "Thanks for the advice."
      ],
      [
        "I need more informations.",
        "I need more information."
      ],
      [
        "The equipments are ready.",
        "The equipment is ready."
      ],
      [
        "I received many feedbacks.",
        "I received a lot of feedback."
      ]
    ],
    "tips": [
      "Feedback, information, advice, research, and equipment usually do not take plural -s.",
      "Use some/more/a piece of with mass nouns.",
      "Check plural noun + plural verb: examples contain.",
      "Check whether the noun takes plural -s or needs a phrase such as some/a piece of."
    ]
  },
  "collocation": {
    "title": "Natural chunks",
    "mistakes": [
      [
        "make a photo",
        "take a photo"
      ],
      [
        "make a second look",
        "take a second look"
      ],
      [
        "lost the context",
        "lost the thread"
      ],
      [
        "go in another call",
        "jump to another call"
      ]
    ],
    "examples": [
      [
        "Can you take a photo?",
        "take a photo"
      ],
      [
        "Could you take a second look?",
        "take a look"
      ],
      [
        "I lost the thread for a second.",
        "lose the thread"
      ],
      [
        "I need to jump to another call.",
        "jump to a call"
      ],
      [
        "We need create ticket.",
        "We need to create a ticket."
      ],
      [
        "Can you do a review of this?",
        "Could you review this?"
      ],
      [
        "I need to take a decision.",
        "I need to make a decision."
      ],
      [
        "Let’s make a call tomorrow.",
        "Let’s have a call tomorrow."
      ]
    ],
    "tips": [
      "Collocations are memory items; collect them like vocabulary.",
      "A phrase can be grammatically understandable and still not idiomatic.",
      "Use high-frequency chunks for repeated workplace situations.",
      "Store the useful phrase as one block and reuse it under pressure."
    ]
  },
  "comma_bridge": {
    "title": "Bridge complete thoughts",
    "mistakes": [
      [
        "The update is ready, I’ll share it.",
        "The update is ready; I’ll share it."
      ],
      [
        "I agree, it helps.",
        "I agree; it helps."
      ],
      [
        "Everything looks good what we need...",
        "Everything looks good; here’s what we need..."
      ],
      [
        "That’s it.",
        "That’s all from me for now."
      ]
    ],
    "examples": [
      [
        "It’s ready; I’ll share the link.",
        "semicolon bridge"
      ],
      [
        "The plan changed, so we need to confirm scope.",
        "connector bridge"
      ],
      [
        "I agree. It makes the flow clearer.",
        "period bridge"
      ],
      [
        "The build is ready, I will share it.",
        "The build is ready; I will share it."
      ],
      [
        "The bug is fixed, we can retest.",
        "The bug is fixed; we can retest."
      ],
      [
        "I checked the logs, there is no error.",
        "I checked the logs; there is no error."
      ],
      [
        "The deadline changed, we need to update the plan.",
        "The deadline changed, so we need to update the plan."
      ],
      [
        "The branch is old, I will rebase it.",
        "The branch is old, so I will rebase it."
      ]
    ],
    "tips": [
      "A comma is weak between two complete sentences.",
      "Use a semicolon when the ideas are tightly connected.",
      "Use so/because/then when the relationship matters.",
      "Use a period, semicolon, or connector such as so, because, then, or however."
    ]
  },
  "concision": {
    "title": "Compress without losing meaning",
    "mistakes": [
      [
        "doing some tests to make sure...",
        "running final tests"
      ],
      [
        "comments from the reviewer",
        "PR feedback"
      ],
      [
        "what we need to do next",
        "next steps"
      ],
      [
        "a lot of surrounding explanation",
        "action + reason + next step"
      ]
    ],
    "examples": [
      [
        "I’m running a few final tests.",
        "status"
      ],
      [
        "I’m working through PR feedback.",
        "progress"
      ],
      [
        "Here are the next steps.",
        "planning"
      ],
      [
        "I am writing here to say that I completed the update.",
        "I completed the update."
      ],
      [
        "Just to let you know, I think the issue is fixed.",
        "I think the issue is fixed."
      ],
      [
        "I wanted to ask if maybe you can check this.",
        "Could you check this?"
      ],
      [
        "From my side, the only thing that is missing is the review.",
        "Only the review is missing."
      ],
      [
        "I did some investigation and found that the issue is in the cache.",
        "I traced the issue to the cache."
      ]
    ],
    "tips": [
      "Keep the reader’s decision path visible.",
      "Cut repeated context if the channel already has it.",
      "Concise does not mean cold; keep one warmth marker when useful.",
      "Keep action, reason, and next step; cut the words around them."
    ]
  },
  "register": {
    "title": "Calm professional tone",
    "mistakes": [
      [
        "Can you look now?",
        "Could you take a quick look when you have a moment?"
      ],
      [
        "This is wrong.",
        "I’m seeing a mismatch."
      ],
      [
        "The feature is broken.",
        "It looks like the feature isn’t behaving as expected."
      ],
      [
        "You are muted.",
        "I think you might be muted."
      ]
    ],
    "examples": [
      [
        "Could you take a quick look?",
        "polite request"
      ],
      [
        "I’m seeing a mismatch with the expected behavior.",
        "evidence language"
      ],
      [
        "It looks like the connection is unstable.",
        "soft report"
      ],
      [
        "I wanted to ask if maybe you can check this.",
        "Could you check this?"
      ],
      [
        "I think it would be good if we could maybe simplify this.",
        "We should simplify this."
      ],
      [
        "Fix this today.",
        "Could you take this today?"
      ],
      [
        "You forgot to update it.",
        "I noticed this still needs an update."
      ],
      [
        "This is not working.",
        "I’m seeing this fail in the checkout flow."
      ]
    ],
    "tips": [
      "Use could/would for requests.",
      "Use I’m seeing or it looks like when reporting evidence.",
      "Tone should make the message easier to act on, not vague.",
      "Use could/would, evidence language, and one clear next step."
    ]
  },
  "word_choice": {
    "title": "Expected everyday/workplace words",
    "mistakes": [
      [
        "mimic the changes",
        "replicate the changes"
      ],
      [
        "public for test",
        "available for testing"
      ],
      [
        "no violent communication",
        "nonviolent communication"
      ],
      [
        "search on internet",
        "search the internet"
      ]
    ],
    "examples": [
      [
        "I’ll replicate the same changes.",
        "implementation"
      ],
      [
        "The version is available for testing.",
        "release wording"
      ],
      [
        "Search the internet for examples.",
        "research request"
      ],
      [
        "I will investigate the problem deeply.",
        "I will look into the issue."
      ],
      [
        "This solution is very heavy.",
        "This solution is too complex."
      ],
      [
        "The page is broken in mobile.",
        "The page breaks on mobile."
      ],
      [
        "I am blocked by this doubt.",
        "I’m blocked by this question."
      ],
      [
        "I will align with you later.",
        "I will sync with you later."
      ]
    ],
    "tips": [
      "Prefer the word a tutor or teammate would expect first.",
      "Literal translations often sound close but not fluent.",
      "Use standard learning terms: small talk, nonviolent communication, feedback.",
      "Pick the workplace chunk that native speakers use in the same situation."
    ]
  },
  "tech_naming": {
    "title": "Technical casing pass",
    "mistakes": [
      [
        "local storage",
        "localStorage"
      ],
      [
        "sass",
        "Sass"
      ],
      [
        "app.scss",
        "App.scss"
      ],
      [
        "zip",
        "ZIP"
      ]
    ],
    "examples": [
      [
        "Use localStorage to persist the setting.",
        "API casing"
      ],
      [
        "Use Sass features.",
        "technology name"
      ],
      [
        "Create a ZIP with the changed files.",
        "abbreviation"
      ],
      [
        "The javascript file was updated.",
        "The JavaScript file was updated."
      ],
      [
        "This react component needs a prop.",
        "This React component needs a prop."
      ],
      [
        "The app scss file changed.",
        "The App.scss file changed."
      ],
      [
        "Use local storage for the preference.",
        "Use localStorage for the preference."
      ],
      [
        "The json file is invalid.",
        "The JSON file is invalid."
      ]
    ],
    "tips": [
      "Technical casing errors look like technical uncertainty.",
      "Scan API, file, framework, and package names separately.",
      "Do this pass after grammar but before sending.",
      "Scan API names, file names, and package names before grammar polishing."
    ]
  },
  "privacy_safe": {
    "title": "Generic examples",
    "mistakes": [
      [
        "real customer domain",
        "staging preview"
      ],
      [
        "customer name",
        "customer account"
      ],
      [
        "private channel",
        "review channel"
      ],
      [
        "internal codename",
        "developer test build"
      ]
    ],
    "examples": [
      [
        "Use a staging preview in the example.",
        "generic URL context"
      ],
      [
        "Use customer account instead of a real name.",
        "generic customer context"
      ],
      [
        "Use review branch instead of a private branch name.",
        "generic repo context"
      ],
      [
        "Use the real customer name in the example.",
        "Use a generic customer account in the example."
      ],
      [
        "The example includes a private URL.",
        "The example uses a staging preview placeholder."
      ],
      [
        "Keep the internal channel name in the card.",
        "Replace the internal channel name with a generic channel."
      ],
      [
        "This card mentions the vendor account.",
        "This card mentions a generic external account."
      ],
      [
        "The log shows the user email.",
        "The log shows a placeholder email."
      ]
    ],
    "tips": [
      "Teaching cards should preserve the language pattern, not the private detail.",
      "Replace real domains, customer names, and internal labels.",
      "Generic examples are easier to reuse and safer to share.",
      "Replace real names, hosts, accounts, and tokens with safe generic placeholders."
    ]
  },
  "small_openers": {
    "title": "Openers that invite a small story",
    "mistakes": [
      [
        "Are you busy?",
        "How’s your week looking?"
      ],
      [
        "You like this project?",
        "How are you finding the project?"
      ],
      [
        "Did you do something?",
        "Did you get up to anything fun?"
      ],
      [
        "Hi, how are you?",
        "Hey, how’s your day going?"
      ]
    ],
    "examples": [
      [
        "How’s your day going?",
        "simple day opener"
      ],
      [
        "Any plans after work?",
        "light plan opener"
      ],
      [
        "How are you finding the project so far?",
        "work-safe opener"
      ],
      [
        "How are you?",
        "How’s your day going so far?"
      ],
      [
        "What did you do today?",
        "What have you been up to today?"
      ],
      [
        "Do you like the event?",
        "How are you finding the event so far?"
      ],
      [
        "Where are you from?",
        "Where are you joining from today?"
      ],
      [
        "Is everything good?",
        "How’s everything going on your side?"
      ]
    ],
    "tips": [
      "Open-ended questions create more room than yes/no questions.",
      "Tie the opener to the shared moment.",
      "Small talk is a bridge, not an interview.",
      "Ask something light, answerable, and tied to the moment."
    ]
  },
  "small_followup": {
    "title": "Follow-up questions",
    "mistakes": [
      [
        "Oh nice.",
        "Oh nice — what was the best part?"
      ],
      [
        "Interesting.",
        "Interesting — how did you get into that?"
      ],
      [
        "So you like it?",
        "What do you enjoy most about it?"
      ],
      [
        "And?",
        "What happened next?"
      ]
    ],
    "examples": [
      [
        "What was the best part?",
        "experience follow-up"
      ],
      [
        "How did you get into that?",
        "origin follow-up"
      ],
      [
        "What made it good?",
        "reason follow-up"
      ],
      [
        "Cool.",
        "Cool — what got you interested in that?"
      ],
      [
        "Nice.",
        "Nice — how did it go?"
      ],
      [
        "Good.",
        "That sounds good — what made it work?"
      ],
      [
        "I see.",
        "I see — what happened after that?"
      ],
      [
        "Interesting.",
        "Interesting — what surprised you about it?"
      ]
    ],
    "tips": [
      "Follow-ups show listening better than generic reactions.",
      "Ask about one detail they already offered.",
      "Avoid rapid-fire questions; one good follow-up is enough.",
      "Pick one detail from their answer and ask about that detail."
    ]
  },
  "small_work": {
    "title": "Work-safe topics",
    "mistakes": [
      [
        "What are you working?",
        "What are you working on?"
      ],
      [
        "Which team you are?",
        "Which team are you on?"
      ],
      [
        "Do you have much job?",
        "Do you have a busy day?"
      ],
      [
        "You have holiday soon?",
        "Do you have any time off coming up?"
      ]
    ],
    "examples": [
      [
        "What are you working on these days?",
        "project topic"
      ],
      [
        "How’s that task going?",
        "progress topic"
      ],
      [
        "How do you find working remotely?",
        "work preference topic"
      ],
      [
        "What do you do here?",
        "What kind of work are you focused on here?"
      ],
      [
        "Which project is yours?",
        "Which project are you working on at the moment?"
      ],
      [
        "Are you new?",
        "Have you been with the team long?"
      ],
      [
        "Is your work hard?",
        "How has the work been going?"
      ],
      [
        "Do you have a lot of tasks?",
        "Is it a busy week for you?"
      ]
    ],
    "tips": [
      "Good workplace small talk is light, opt-in, and not too personal.",
      "Safe topics: project, tool, meeting, lunch, weekend, light plans.",
      "Avoid salary, politics, religion, age, appearance, and private family details.",
      "Use shared context: project, team, tools, sprint, meeting, lunch, or time off."
    ]
  },
  "small_remote": {
    "title": "Remote-call microphrases",
    "mistakes": [
      [
        "Can you hear me good?",
        "Can you hear me okay?"
      ],
      [
        "You are muted.",
        "I think you might be muted."
      ],
      [
        "Your internet is bad.",
        "Your connection seems unstable."
      ],
      [
        "Let’s wait people.",
        "Let’s give everyone a minute to join."
      ]
    ],
    "examples": [
      [
        "I’ll share my screen.",
        "host phrase"
      ],
      [
        "I lost the thread for a second.",
        "recovery phrase"
      ],
      [
        "I don’t want to interrupt, but...",
        "turn-taking phrase"
      ],
      [
        "Your sound is low.",
        "Your audio is a little quiet."
      ],
      [
        "You disappeared.",
        "I think your video dropped for a second."
      ],
      [
        "Can you repeat, I didn’t listen.",
        "Could you repeat that? I missed the last part."
      ],
      [
        "My internet is bad.",
        "My connection is a bit unstable."
      ],
      [
        "I will turn on camera.",
        "I’ll turn my camera on."
      ]
    ],
    "tips": [
      "Remote language should reduce awkwardness quickly.",
      "Use might/seems for issues that could embarrass someone.",
      "Meeting-host phrases should be short and predictable.",
      "Use soft, practical phrases for audio, screen sharing, connection, and interruptions."
    ]
  },
  "small_appreciation": {
    "title": "Specific appreciation",
    "mistakes": [
      [
        "Good job.",
        "Nice work on the flow."
      ],
      [
        "It was useful.",
        "That made the next step clearer."
      ],
      [
        "You did fast.",
        "You turned that around quickly."
      ],
      [
        "Your presentation was good.",
        "I liked how clear your presentation was."
      ]
    ],
    "examples": [
      [
        "Nice work on this — the flow is easier to follow.",
        "specific effect"
      ],
      [
        "Thanks — that clarified the next step.",
        "specific gratitude"
      ],
      [
        "I like that idea; it makes the decision easier.",
        "agreement with reason"
      ],
      [
        "Good explanation.",
        "That explanation made the decision much clearer."
      ],
      [
        "Thanks, you helped.",
        "Thanks — your explanation helped me move forward."
      ],
      [
        "Good work.",
        "Nice work on the handoff; it was easy to follow."
      ],
      [
        "You are very smart.",
        "I really liked the way you broke down the problem."
      ],
      [
        "The demo was nice.",
        "The demo was clear and easy to follow."
      ]
    ],
    "tips": [
      "Specific praise sounds sincere.",
      "Praise the action or effect, not appearance or identity.",
      "Gratitude can be a safe doorway into warm conversation.",
      "Praise the action or effect, not identity or appearance."
    ]
  },
  "small_exit": {
    "title": "Graceful exits",
    "mistakes": [
      [
        "I need go.",
        "I need to jump to another call."
      ],
      [
        "Talk later.",
        "Great talking with you — let’s catch up later."
      ],
      [
        "Let’s finish.",
        "Shall we wrap here?"
      ],
      [
        "I will stop here.",
        "I’ll let you get back to it."
      ]
    ],
    "examples": [
      [
        "That’s all from me for now.",
        "meeting close"
      ],
      [
        "I’ll let you get back to it.",
        "chat close"
      ],
      [
        "I need to jump to another call.",
        "work exit"
      ],
      [
        "I need to leave.",
        "I need to jump now, but it was great talking with you."
      ],
      [
        "Enough for me.",
        "That’s all from me for now."
      ],
      [
        "We can finish.",
        "Shall we wrap it up here?"
      ],
      [
        "I stop here.",
        "I’ll pause here and let you get back to it."
      ]
    ],
    "tips": [
      "A good exit has warmth plus a reason or handoff.",
      "Wrap is a friendly verb for meetings.",
      "Do not disappear right after asking for help.",
      "Use appreciation plus a reason or handoff."
    ]
  },
  "small_share": {
    "title": "Balanced self-share",
    "mistakes": [
      [
        "My weekend was normal.",
        "It was pretty low-key."
      ],
      [
        "I don’t know this.",
        "I haven’t tried that before."
      ],
      [
        "I did nothing.",
        "Nothing too exciting — I got some time to recharge."
      ],
      [
        "Weather is good.",
        "I actually like this weather."
      ]
    ],
    "examples": [
      [
        "It was pretty low-key, which was exactly what I needed.",
        "small personal detail"
      ],
      [
        "I haven’t tried that before — what do you like about it?",
        "share + question"
      ],
      [
        "Nothing too exciting — I got some time to recharge.",
        "low-pressure answer"
      ],
      [
        "Nothing special.",
        "Nothing too exciting — I finally got some time to rest."
      ],
      [
        "I don’t know what to say.",
        "I’m still figuring it out, but it sounds interesting."
      ],
      [
        "I only worked.",
        "Mostly work, but I managed to get a quiet evening."
      ]
    ],
    "tips": [
      "Small talk works best as a back-and-forth.",
      "Share one sentence, not a monologue.",
      "Then ask a question connected to what you shared.",
      "Share one detail, then return the floor with a question."
    ]
  },
  "nvc_observation": {
    "title": "Observation without judgment",
    "mistakes": [
      [
        "You’re unclear.",
        "I’m having trouble understanding the expected outcome."
      ],
      [
        "This is wrong.",
        "This doesn’t match the acceptance criteria."
      ],
      [
        "Nobody told me.",
        "I didn’t see that update."
      ],
      [
        "You keep breaking it.",
        "The latest change affects the flow."
      ]
    ],
    "examples": [
      [
        "I’m seeing behavior that doesn’t match the acceptance criteria.",
        "observable mismatch"
      ],
      [
        "I didn’t see that update.",
        "observable visibility gap"
      ],
      [
        "I’m noticing we’re both explaining our side.",
        "observable tension"
      ],
      [
        "You forgot to update it.",
        "I noticed this still needs an update."
      ],
      [
        "This is not working.",
        "I’m seeing this fail in the checkout flow."
      ],
      [
        "It is your fault.",
        "It looks like this happened during the last update; could we check it together?"
      ],
      [
        "You are blocking me.",
        "I’m blocked on this until I get the review."
      ],
      [
        "This is confusing.",
        "I’m having trouble following the current flow."
      ]
    ],
    "tips": [
      "Use what a camera could record.",
      "Avoid always/never unless you have literal data.",
      "Observation first lowers defensiveness.",
      "Start with what a camera could record."
    ]
  },
  "nvc_feeling": {
    "title": "Own the feeling",
    "mistakes": [
      [
        "You make me frustrated.",
        "I feel frustrated."
      ],
      [
        "You make me wait.",
        "I feel blocked."
      ],
      [
        "This is annoying.",
        "I feel concerned."
      ],
      [
        "I feel like you ignored me.",
        "I feel blocked when I don’t get a reply."
      ]
    ],
    "examples": [
      [
        "I feel blocked because I need visibility.",
        "feeling + need"
      ],
      [
        "I’m concerned about rework.",
        "concern without blame"
      ],
      [
        "I’m feeling stuck with the current ambiguity.",
        "feeling tied to context"
      ],
      [
        "You make me nervous.",
        "I feel nervous because the deadline is close."
      ],
      [
        "You are stressing me out.",
        "I’m feeling pressure because the scope is still changing."
      ],
      [
        "This makes me angry.",
        "I feel frustrated because I expected more clarity."
      ],
      [
        "You made me feel stupid.",
        "I feel embarrassed because I need room to ask basic questions."
      ],
      [
        "I feel like you don’t trust me.",
        "I feel concerned because I need trust in the handoff."
      ]
    ],
    "tips": [
      "I feel like usually introduces a thought, not a feeling.",
      "Use feeling words: concerned, confused, blocked, frustrated.",
      "Feelings are most useful when connected to needs.",
      "Use I feel plus an emotion, not I feel like plus a judgment."
    ]
  },
  "nvc_need": {
    "title": "Name the need",
    "mistakes": [
      [
        "because you didn’t reply",
        "because I need visibility"
      ],
      [
        "because you changed it",
        "because I need predictability"
      ],
      [
        "because you assigned it",
        "because I need capacity clarity"
      ],
      [
        "because this is confusing",
        "because I need alignment"
      ]
    ],
    "examples": [
      [
        "I need clarity on ownership.",
        "ownership need"
      ],
      [
        "I need predictability in the handoff.",
        "predictability need"
      ],
      [
        "I need clearer acceptance criteria.",
        "clarity need"
      ],
      [
        "You make me nervous.",
        "I feel nervous because the deadline is close."
      ],
      [
        "You are stressing me out.",
        "I’m feeling pressure because the scope is still changing."
      ],
      [
        "This makes me angry.",
        "I feel frustrated because I expected more clarity."
      ],
      [
        "You made me feel stupid.",
        "I feel embarrassed because I need room to ask basic questions."
      ],
      [
        "I feel like you don’t trust me.",
        "I feel concerned because I need trust in the handoff."
      ]
    ],
    "tips": [
      "Needs are not demands or strategies.",
      "Common work needs: clarity, ownership, support, predictability, focus, autonomy.",
      "When the need is visible, the request becomes easier to accept.",
      "Name clarity, predictability, support, visibility, focus, or autonomy."
    ]
  },
  "nvc_request": {
    "title": "Concrete requests",
    "mistakes": [
      [
        "Do it now.",
        "Could you take it today?"
      ],
      [
        "Review this soon.",
        "Could you let me know a realistic review time?"
      ],
      [
        "Tell me earlier.",
        "Could we flag changes sooner next time?"
      ],
      [
        "Fix the communication.",
        "Could we agree on the next checkpoint?"
      ]
    ],
    "examples": [
      [
        "Could you prioritize this today, or suggest another owner?",
        "specific request"
      ],
      [
        "Could you share one example of the final behavior?",
        "clarifying request"
      ],
      [
        "Could we capture the owner and next step before we close?",
        "meeting request"
      ],
      [
        "Stop delaying the review.",
        "Could you review this by tomorrow or suggest another reviewer?"
      ],
      [
        "Tell me what you want.",
        "Could you share one example of the expected result?"
      ],
      [
        "Don’t change the scope again.",
        "Could we confirm scope before adding new changes?"
      ],
      [
        "Fix the ticket.",
        "Could you update the ticket with the owner and next step?"
      ],
      [
        "Reply faster.",
        "Could you let me know when you expect to reply?"
      ]
    ],
    "tips": [
      "Requests should be concrete, positive, and time-bounded when needed.",
      "Leave room for a no or alternative.",
      "A clear request is kinder than vague pressure.",
      "Ask for a specific next action and leave room for an alternative."
    ]
  },
  "nvc_boundary": {
    "title": "Boundaries without blame",
    "mistakes": [
      [
        "This is not my problem.",
        "I need clarity on ownership."
      ],
      [
        "Don’t assign me things.",
        "Please check my capacity first."
      ],
      [
        "I can’t work like this.",
        "I need clearer criteria before I continue."
      ],
      [
        "Stop adding tasks.",
        "I can take this after the current priority is done."
      ]
    ],
    "examples": [
      [
        "I can take this on after the current release work is complete.",
        "capacity boundary"
      ],
      [
        "I’m at capacity today; could we find another owner?",
        "owner request"
      ],
      [
        "I can clarify the issue, but I can’t own the implementation right now.",
        "scope boundary"
      ],
      [
        "I won’t take this.",
        "I can take this after the current priority is complete."
      ],
      [
        "I can’t help today.",
        "I’m at capacity today, but I can help tomorrow morning."
      ],
      [
        "This is outside my job.",
        "I can clarify the issue, but I can’t own the implementation."
      ],
      [
        "Don’t ping me after hours.",
        "I’m offline after work hours; please leave a note and I’ll respond the next day."
      ],
      [
        "I’m not doing both.",
        "I can do either the review or the implementation today, not both."
      ]
    ],
    "tips": [
      "A boundary protects capacity while keeping connection.",
      "State what you can do as well as what you cannot do.",
      "Boundaries are clearer when tied to priorities.",
      "Say what you can do, what you cannot do, and what would help."
    ]
  },
  "nvc_repair": {
    "title": "Repair lines",
    "mistakes": [
      [
        "You missed the point.",
        "I may not have explained it clearly."
      ],
      [
        "I already said that.",
        "Let me restate the key point."
      ],
      [
        "That’s not what I asked.",
        "The current version solves a different problem."
      ],
      [
        "You misunderstood me.",
        "I may not have been clear."
      ]
    ],
    "examples": [
      [
        "I think I may not have explained the goal clearly.",
        "ego-safe reset"
      ],
      [
        "Let me restate the key point in one sentence.",
        "clarity reset"
      ],
      [
        "I think we’re solving slightly different problems.",
        "scope repair"
      ],
      [
        "You misunderstood me.",
        "I may not have been clear; let me rephrase the goal."
      ],
      [
        "That is not what I said.",
        "Let me clarify what I meant."
      ],
      [
        "You are missing the point.",
        "I think we may be focusing on different parts of the issue."
      ],
      [
        "I said this already.",
        "I may have buried the key point earlier; here it is again."
      ],
      [
        "No, wrong.",
        "I see a different result in the logs."
      ]
    ],
    "tips": [
      "Repair lines are especially useful in public channels.",
      "Assume misunderstanding before bad intent.",
      "Protecting ego often makes your correction easier to hear.",
      "Assume misunderstanding before assuming bad intent."
    ]
  }
};

export const DATA = {
  meta: DATA_META,
  user: USER,
  levels: LEVELS,
  patterns: PATTERNS,
  phrases: CARD_BLUEPRINTS.map(makePhrase),
  drills: DRILLS,
};



// Ensure every active pattern has a Notes drawer, even if a future editor adds
// a pattern but forgets to write a custom NOTE_PACKS entry. Custom packs above
// win; this fallback builds tutor-style notes from the cards already assigned
// to that pattern.
const buildAutoNotePack = (pattern) => {
  const pairs = PHRASES
    .filter((phrase) => phrase.patterns.includes(pattern.id))
    .map((phrase) => [phrase.raw, phrase.refined]);

  return {
    title: pattern.label,
    mistakes: pairs.slice(0, 4),
    examples: pairs.slice(4, 8),
    tips: [
      pattern.cue,
      pattern.move,
      "Practice the same pattern with different content until the repair feels automatic.",
    ].filter(Boolean),
  };
};

for (const pattern of PATTERNS) {
  if (!NOTE_PACKS[pattern.id]) {
    NOTE_PACKS[pattern.id] = buildAutoNotePack(pattern);
  }
}

export const scannerRules = [
  {
    id: "scan-have-participle",
    label: "Possible have/has + wrong verb form",
    test: /\b(i['’]?ve|we['’]?ve|you['’]?ve|they['’]?ve|have|has)\s+(apply|finish|make|do|change|start|push|deploy|check|write|send|receive|discuss|load|went|saw)\b/i,
    advice: "After have/has, test the participle: applied, finished, made, done, sent, received, discussed, loaded, gone, seen.",
  },
  {
    id: "scan-aux-base",
    label: "Possible auxiliary + non-base verb",
    test: /\b(does|did|will|can|could|should|would)\b\s+[^.!?]{0,40}\b(works|makes|breaks|checks|shares|uses|helps|pushed|changed|loaded)\b/i,
    advice: "After does/did/will/can/could/should/would, use the base verb: work, make, break, check, share, use, help, push.",
  },
  {
    id: "scan-question-order",
    label: "Possible question word-order issue",
    test: /\b(why this|where i can|how i can|what you think|when you will|which option we should|why it failed)\b/i,
    advice: "Use question word + auxiliary + subject: Why does this happen? Where can I find it? What do you think?",
  },
  {
    id: "scan-countability",
    label: "Possible count/mass noun slip",
    test: /\b(feedbacks|informations|advices|equipments|this examples|many feedbacks)\b/i,
    advice: "Check countability: feedback, information, advice, equipment, these examples, a lot of feedback.",
  },
  {
    id: "scan-article-gap",
    label: "Possible article/determiner gap",
    test: /\b(a\s+(example|area)|send link|share screen|found issue|error in console|empty page|with team)\b/i,
    advice: "Check a/an/the/my: an example, send the link, share my screen, an issue, an error in the console, the team.",
  },
  {
    id: "scan-preposition-chunk",
    label: "Possible preposition chunk slip",
    test: /\b(depends of|working in this task|take a look of|second look of|discuss about|explained me|waiting your feedback|different of|points for|jump in another call)\b/i,
    advice: "Try the stored chunk: depends on, working on, take a look at, discuss the plan, explain it to me, waiting for, different from, points to, jump to.",
  },
  {
    id: "scan-gerund-pattern",
    label: "Possible verb + -ing pattern",
    test: /\b(avoid|suggest|finish|mind|enjoy|consider|prevent)\b[^.!?]{0,70}\b(to\s+\w+|stays|fails|breaks|sees|throws|submit)\b/i,
    advice: "After avoid/suggest/finish/mind/enjoy/consider, test the -ing form. With prevent, try object + from + -ing.",
  },
  {
    id: "scan-comma-bridge",
    label: "Possible comma splice",
    test: /\b(is|are|was|were|ready|done|changed|applied|made|finished|fixed|updated)\b[^.!?]{0,90},\s+(i|it|we|they|nothing|the|this|that)\b/i,
    advice: "If both sides of the comma are complete thoughts, use a period, semicolon, or connector.",
  },
  {
    id: "scan-filler-loop",
    label: "Possible filler loop",
    test: /\b(kind of|you know|basically|just|maybe|making sure).{0,100}\b(kind of|you know|basically|just|maybe|making sure)\b/i,
    advice: "Remove repeated scaffolding words unless they intentionally change the tone.",
  },
  {
    id: "scan-tech-naming",
    label: "Possible technical naming/casing drift",
    test: /\b(local storage|javascript|react component|app scss|json file|readme|sass|zip|succesfully|gramatically)\b/i,
    advice: "Scan exact technical names: localStorage, JavaScript, React component, App.scss, JSON, README, Sass, ZIP, successfully, grammatically.",
  },
  {
    id: "scan-privacy",
    label: "Possible private detail in a learning example",
    test: /\b[a-z0-9.-]+\.(info|internal|corp|local|dev|staging)\b|real customer|private url|production host|access token|user email|account id|private channel|internal codename|real domain/i,
    advice: "Replace real domains, names, emails, tokens, accounts, and hosts with generic placeholders such as staging preview, customer account, or placeholder token.",
  },
  {
    id: "scan-small-talk-closed",
    label: "Small talk may be too closed",
    test: /\b(are you busy\?|you like this|it was good\?|so you like it\?|do you recommend\?|what are you working\?|is everything good\?|are you new\?)\b/i,
    advice: "Use an open-ended small-talk question: How’s your week looking? What do you enjoy most about it? How are you finding the team?",
  },
  {
    id: "scan-small-talk-followup",
    label: "Possible missing follow-up",
    test: /^(oh nice|interesting|cool|good|nice|okay)\.?$/i,
    advice: "Add one curious follow-up: What was the best part? How did it go? What surprised you about it?",
  },
  {
    id: "scan-remote-call",
    label: "Remote-call phrase can be softer",
    test: /\b(you are muted|your internet is bad|your sound is low|you disappeared|let'?s wait people|can you hear me good|i will share screen|i don'?t want interrupt|i don'?t see your screen)\b/i,
    advice: "Use warmer remote-call chunks: I think you might be muted; your connection seems unstable; your audio is quiet; I’ll share my screen.",
  },
  {
    id: "scan-nvc-blame",
    label: "Possible blame or judgment wording",
    test: /\b(you always|you never|you ignored|you didn'?t read|you are not clear|this is wrong|that'?s a bad idea|you missed the point|you are defensive|you make me|you created confusion)\b/i,
    advice: "Try NVC order: observation → feeling/concern → need → concrete request.",
  },
  {
    id: "scan-nvc-demand",
    label: "Possible demand instead of request",
    test: /\b(do it now|stop changing|stop delaying|don'?t assign|you should have told|fix the communication|review this soon|i need this now|make a decision|reply faster)\b/i,
    advice: "Turn pressure into a specific request with room for an alternative: Could you take it today, or suggest another owner?",
  },
  {
    id: "scan-nvc-feeling",
    label: "Possible feeling mixed with judgment",
    test: /\bi feel (like|that)\b/i,
    advice: "After I feel, use an emotion word: concerned, confused, blocked, frustrated, nervous, discouraged. Then name the need.",
  },
  {
    id: "scan-collocation",
    label: "Possible natural-chunk slip",
    test: /\b(make a photo|make a call|take a decision|come back to you|do a review|lost the context|jump in another call|turn on camera)\b/i,
    advice: "Try the natural chunk: take a photo, have a call, make a decision, get back to you, review this, lost the thread, jump to another call, turn my camera on.",
  },
];
