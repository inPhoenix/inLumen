// Lumen Refinery data — content-first edition.
// The cards focus on the message being improved, not on the wrapper used to request a correction.
// Examples are sanitized: no real domains, customer names, private channels, or internal codenames.

export const DATA = {
  "user": {
    "name": "Phoenix",
    "level": 7,
    "levelName": "Observer",
    "nextLevelName": "Curator",
    "refined": 286,
    "nextThreshold": 350,
    "streak": 12,
    "goal": 14,
    "today": {
      "caught": 12,
      "refined": 9,
      "reviewed": 11
    }
  },
  "levels": [
    {
      "id": "level-1",
      "label": "Level 1",
      "name": "Grammar friction",
      "short": "Verb form, articles, prepositions",
      "promise": "Catch the tiny grammar bugs before they reach Slack."
    },
    {
      "id": "level-2",
      "label": "Level 2",
      "name": "Concise work updates",
      "short": "Status, PRs, tickets, scope",
      "promise": "Make technical updates shorter, safer, and easier to act on."
    },
    {
      "id": "level-3",
      "label": "Level 3",
      "name": "Common small talk",
      "short": "Openers, follow-ups, exits",
      "promise": "Turn everyday chat from awkward pauses into lightweight connection."
    },
    {
      "id": "level-4",
      "label": "Level 4",
      "name": "Nonviolent communication",
      "short": "Observation, feeling, need, request",
      "promise": "Make disagreement clearer without making people defensive."
    }
  ],
  "patterns": [
    {
      "id": "tense",
      "label": "Tense slip",
      "x": 0.62,
      "y": 0.2,
      "hue": 50,
      "level": "level-1",
      "cue": "When you write have/has, does/do, did, or will, check what happens to the next verb.",
      "move": "Read only the verb skeleton before sending: helper + main verb.",
      "count": 15
    },
    {
      "id": "prep",
      "label": "Preposition drift",
      "x": 0.22,
      "y": 0.3,
      "hue": 28,
      "level": "level-1",
      "cue": "URLs point to, context lives in a ticket, reviews happen on a PR, and depend takes on.",
      "move": "Memorize the whole chunk instead of translating the preposition.",
      "count": 6
    },
    {
      "id": "article",
      "label": "Article gap",
      "x": 0.48,
      "y": 0.18,
      "hue": 210,
      "level": "level-1",
      "cue": "A/an/the often carries the naturalness you are missing.",
      "move": "Ask: is this one example, a known item, or a general category?",
      "count": 5
    },
    {
      "id": "clause",
      "label": "Clause shape",
      "x": 0.42,
      "y": 0.48,
      "hue": 195,
      "level": "level-1",
      "cue": "After avoid/prevent/keep, English often wants an -ing phrase.",
      "move": "Turn the second sentence into an action: avoiding the request failing.",
      "count": 2
    },
    {
      "id": "bridge",
      "label": "Comma bridge",
      "x": 0.72,
      "y": 0.58,
      "hue": 75,
      "level": "level-2",
      "cue": "If both sides of a comma can stand alone, the comma is too weak.",
      "move": "Use a period, semicolon, or connector.",
      "count": 6
    },
    {
      "id": "filler",
      "label": "Filler loop",
      "x": 0.34,
      "y": 0.7,
      "hue": 320,
      "level": "level-2",
      "cue": "Repeated scaffolding words make good ideas feel less confident.",
      "move": "Remove one just/basically/kind of unless it changes the tone.",
      "count": 1
    },
    {
      "id": "register",
      "label": "Register tuning",
      "x": 0.14,
      "y": 0.78,
      "hue": 230,
      "level": "level-2",
      "cue": "Could, I’m seeing, I’m not sure, and based on the logs let you sound calm without sounding weak.",
      "move": "Match certainty to evidence and warmth to the channel.",
      "count": 20
    },
    {
      "id": "lexical",
      "label": "Word choice",
      "x": 0.84,
      "y": 0.82,
      "hue": 130,
      "level": "level-2",
      "cue": "Some words are understandable but not the expected workplace word.",
      "move": "Choose the term a teammate would use in the same situation.",
      "count": 15
    },
    {
      "id": "count",
      "label": "Count vs mass",
      "x": 0.78,
      "y": 0.42,
      "hue": 145,
      "level": "level-1",
      "cue": "Examples is plural; feedback and information usually are not.",
      "move": "Check agreement before polishing style.",
      "count": 2
    },
    {
      "id": "naming",
      "label": "Tech naming",
      "x": 0.57,
      "y": 0.12,
      "hue": 280,
      "level": "level-2",
      "cue": "React, Sass, App.scss, localStorage, ZIP, and package names need exact casing.",
      "move": "Scan names before grammar.",
      "count": 5
    },
    {
      "id": "privacy",
      "label": "Privacy-safe wording",
      "x": 0.88,
      "y": 0.18,
      "hue": 340,
      "level": "level-2",
      "cue": "Real domains, customer names, channels, and internal labels should become generic examples.",
      "move": "Replace specifics with staging preview, review branch, customer account, or developer test build.",
      "count": 3
    },
    {
      "id": "concision",
      "label": "Concise rewrite",
      "x": 0.52,
      "y": 0.74,
      "hue": 285,
      "level": "level-2",
      "cue": "Your content is usually useful; the excess is often around it.",
      "move": "Keep action + reason + next step.",
      "count": 10
    },
    {
      "id": "collocation",
      "label": "Natural chunk",
      "x": 0.43,
      "y": 0.3,
      "hue": 12,
      "level": "level-1",
      "cue": "Some repairs are chunks: take a second look at, apply it to, start with.",
      "move": "Learn the chunk as one piece.",
      "count": 6
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
      "count": 13
    },
    {
      "id": "small_followup",
      "label": "Follow-up question",
      "x": 0.3,
      "y": 0.44,
      "hue": 60,
      "level": "level-3",
      "cue": "The second question often matters more than the first.",
      "move": "Listen for one detail and ask about that detail.",
      "count": 11
    },
    {
      "id": "small_work",
      "label": "Work-safe topic",
      "x": 0.64,
      "y": 0.38,
      "hue": 100,
      "level": "level-3",
      "cue": "Safe topics: weekend, food, light work context, tools, travel, hobbies, and shared events.",
      "move": "Avoid politics, salary, religion, appearance, and overly personal questions.",
      "count": 12
    },
    {
      "id": "small_remote",
      "label": "Remote-call ease",
      "x": 0.78,
      "y": 0.28,
      "hue": 185,
      "level": "level-3",
      "cue": "Remote phrases should be warm, quick, and useful.",
      "move": "Prefer soft practical phrases: I think you might be muted.",
      "count": 9
    },
    {
      "id": "small_compliment",
      "label": "Specific appreciation",
      "x": 0.68,
      "y": 0.72,
      "hue": 310,
      "level": "level-3",
      "cue": "Specific appreciation feels genuine and opens conversation.",
      "move": "Praise the action or effect, not identity or appearance.",
      "count": 5
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
      "count": 6
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
      "count": 3
    },
    {
      "id": "nvc_observation",
      "label": "NVC observation",
      "x": 0.24,
      "y": 0.88,
      "hue": 15,
      "level": "level-4",
      "cue": "Say what happened, not what the person is.",
      "move": "Use camera language: when I saw/heard/noticed...",
      "count": 13
    },
    {
      "id": "nvc_feelings",
      "label": "NVC feeling",
      "x": 0.5,
      "y": 0.88,
      "hue": 330,
      "level": "level-4",
      "cue": "Name the feeling without making the other person responsible for it.",
      "move": "Use I feel concerned/frustrated/confused, not you made me.",
      "count": 8
    },
    {
      "id": "nvc_needs",
      "label": "NVC need",
      "x": 0.74,
      "y": 0.88,
      "hue": 120,
      "level": "level-4",
      "cue": "Needs make the conflict solvable.",
      "move": "Name clarity, predictability, focus, support, autonomy, or alignment.",
      "count": 12
    },
    {
      "id": "nvc_request",
      "label": "NVC request",
      "x": 0.88,
      "y": 0.62,
      "hue": 200,
      "level": "level-4",
      "cue": "Requests are concrete and leave room for alternatives.",
      "move": "Ask for the next action and timeline.",
      "count": 20
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
      "count": 2
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
      "count": 3
    }
  ],
  "phrases": [
    {
      "id": "work-apply",
      "caughtAt": "Today · 14:32",
      "source": "Work update · deployment",
      "level": "level-1",
      "wrong": [
        {
          "t": "I’ve appl",
          "k": "same"
        },
        {
          "t": "y",
          "k": "del"
        },
        {
          "t": " the changes.",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "I’ve appl",
          "k": "same"
        },
        {
          "t": "ied",
          "k": "ins"
        },
        {
          "t": " the changes.",
          "k": "same"
        }
      ],
      "raw": "I’ve apply the changes.",
      "refined": "I’ve applied the changes.",
      "patterns": [
        "tense"
      ],
      "why": "The sentence has the right idea, but the verb form needs to match the helper verb or question structure.",
      "cue": "Before sending, check the verb after have/has, does/do, did, and will.",
      "reuse": "I’ve applied the changes and pushed the branch.",
      "memory": 18,
      "seen": 7,
      "hot": true
    },
    {
      "id": "work-tests-pr",
      "caughtAt": "Today · 13:50",
      "source": "Standup · PR status",
      "level": "level-2",
      "wrong": [
        {
          "t": "Almost done",
          "k": "same"
        },
        {
          "t": ", im just doing some tests and will open the PR nextt",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Almost done",
          "k": "same"
        },
        {
          "t": " — I’m just running a few tests, then I’ll open the PR",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "Almost done, im just doing some tests and will open the PR nextt.",
      "refined": "Almost done — I’m just running a few tests, then I’ll open the PR.",
      "patterns": [
        "concision",
        "filler",
        "tense"
      ],
      "why": "The shorter version keeps the useful content and removes the noise around it.",
      "cue": "Keep the decision, action, and next step. Remove the surrounding explanation unless needed.",
      "reuse": "Almost done — I’m running a few tests, then I’ll open the PR.",
      "memory": 30,
      "seen": 5,
      "hot": true
    },
    {
      "id": "work-pr-feedback",
      "caughtAt": "Today · 12:44",
      "source": "Standup · task sequence",
      "level": "level-2",
      "wrong": [
        {
          "t": "I’m ",
          "k": "same"
        },
        {
          "t": "finishing the comments from the reviewer on my PR, then continuing with the footer us",
          "k": "del"
        },
        {
          "t": "er story.",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "I’m ",
          "k": "same"
        },
        {
          "t": "working through PR feedback, then I’ll continue the foot",
          "k": "ins"
        },
        {
          "t": "er story.",
          "k": "same"
        }
      ],
      "raw": "I’m finishing the comments from the reviewer on my PR, then continuing with the footer user story.",
      "refined": "I’m working through PR feedback, then I’ll continue the footer story.",
      "patterns": [
        "concision",
        "lexical"
      ],
      "why": "The shorter version keeps the useful content and removes the noise around it.",
      "cue": "Keep the decision, action, and next step. Remove the surrounding explanation unless needed.",
      "reuse": "I’m working through PR feedback, then I’ll continue the next story.",
      "memory": 38,
      "seen": 4
    },
    {
      "id": "work-task-works",
      "caughtAt": "Today · 12:03",
      "source": "Technical question · task",
      "level": "level-1",
      "wrong": [
        {
          "t": "How does the ChatGPT task work",
          "k": "same"
        },
        {
          "t": "s",
          "k": "del"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "How does the ChatGPT task work",
          "k": "same"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "raw": "How does the ChatGPT task works?",
      "refined": "How does the ChatGPT task work?",
      "patterns": [
        "tense",
        "naming"
      ],
      "why": "The sentence has the right idea, but the verb form needs to match the helper verb or question structure.",
      "cue": "Before sending, check the verb after have/has, does/do, did, and will.",
      "reuse": "How does this task work?",
      "memory": 28,
      "seen": 4
    },
    {
      "id": "work-reminds",
      "caughtAt": "Today · 11:36",
      "source": "Technical question · automation",
      "level": "level-1",
      "wrong": [
        {
          "t": "How will ChatGPT remind",
          "k": "same"
        },
        {
          "t": "s",
          "k": "del"
        },
        {
          "t": " me?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "How will ChatGPT remind",
          "k": "same"
        },
        {
          "t": " me?",
          "k": "same"
        }
      ],
      "raw": "How will ChatGPT reminds me?",
      "refined": "How will ChatGPT remind me?",
      "patterns": [
        "tense",
        "naming"
      ],
      "why": "The sentence has the right idea, but the verb form needs to match the helper verb or question structure.",
      "cue": "Before sending, check the verb after have/has, does/do, did, and will.",
      "reuse": "How will the reminder notify me?",
      "memory": 32,
      "seen": 3
    },
    {
      "id": "work-example",
      "caughtAt": "Today · 11:10",
      "source": "Clarification · example",
      "level": "level-1",
      "wrong": [
        {
          "t": "Give me a",
          "k": "same"
        },
        {
          "t": " example.",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Give me a",
          "k": "same"
        },
        {
          "t": "n",
          "k": "ins"
        },
        {
          "t": " example.",
          "k": "same"
        }
      ],
      "raw": "Give me a example.",
      "refined": "Give me an example.",
      "patterns": [
        "article"
      ],
      "why": "The noun needs the right article so the sentence sounds complete and natural.",
      "cue": "Ask whether the noun needs a/an/the before it.",
      "reuse": "Could you give me an example?",
      "memory": 42,
      "seen": 3
    },
    {
      "id": "work-url",
      "caughtAt": "Today · 10:22",
      "source": "Ticket note · link",
      "level": "level-1",
      "wrong": [
        {
          "t": "The URL ",
          "k": "same"
        },
        {
          "t": "of the original ticket is points to the staging preview as",
          "k": "del"
        },
        {
          "t": " below.",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "The URL ",
          "k": "same"
        },
        {
          "t": "in the original ticket points to the staging preview, as shown",
          "k": "ins"
        },
        {
          "t": " below.",
          "k": "same"
        }
      ],
      "raw": "The URL of the original ticket is points to the staging preview as below.",
      "refined": "The URL in the original ticket points to the staging preview, as shown below.",
      "patterns": [
        "prep",
        "tense",
        "collocation"
      ],
      "why": "The grammar is close, but English often stores meaning in fixed preposition chunks rather than translated prepositions.",
      "cue": "Do not translate the preposition; recall the chunk: points to, depends on, in the ticket, on the PR.",
      "reuse": "The link in the ticket points to the staging preview.",
      "memory": 24,
      "seen": 6,
      "hot": true
    },
    {
      "id": "work-avoid-loading",
      "caughtAt": "Today · 09:58",
      "source": "PR comment · loading state",
      "level": "level-1",
      "wrong": [
        {
          "t": "We need to handle ",
          "k": "same"
        },
        {
          "t": "setLoading to avoid the button stays forever in loading state",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "We need to handle ",
          "k": "same"
        },
        {
          "t": "`setLoading` to avoid the button staying in the loading state indefinitely",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "We need to handle setLoading to avoid the button stays forever in loading state.",
      "refined": "We need to handle `setLoading` to avoid the button staying in the loading state indefinitely.",
      "patterns": [
        "clause",
        "prep"
      ],
      "why": "The second part needs to become a noun-like action, not a full mini-sentence.",
      "cue": "After avoid/prevent/keep, try the -ing shape.",
      "reuse": "We should add a fallback to avoid the request failing silently.",
      "memory": 31,
      "seen": 5,
      "hot": true
    },
    {
      "id": "work-meta-tag",
      "caughtAt": "Today · 09:35",
      "source": "Release note · metadata",
      "level": "level-2",
      "wrong": [
        {
          "t": "2425 is just a meta tag,",
          "k": "del"
        },
        {
          "t": " nothing changed in the UI.",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "The version number is just metadata;",
          "k": "ins"
        },
        {
          "t": " nothing changed in the UI.",
          "k": "same"
        }
      ],
      "raw": "2425 is just a meta tag, nothing changed in the UI.",
      "refined": "The version number is just metadata; nothing changed in the UI.",
      "patterns": [
        "bridge",
        "lexical"
      ],
      "why": "The idea is clear, but the sentence needs a stronger bridge so the reader does not have to repair it mentally.",
      "cue": "If both sides of a comma can stand alone, upgrade the bridge.",
      "reuse": "The build number is just metadata; nothing changed in the UI.",
      "memory": 41,
      "seen": 3
    },
    {
      "id": "work-review-request",
      "caughtAt": "Today · 09:04",
      "source": "Slack · review request",
      "level": "level-2",
      "wrong": [
        {
          "t": "I was wondering if you c",
          "k": "same"
        },
        {
          "t": "an take a",
          "k": "del"
        },
        {
          "t": " look.",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "I was wondering if you c",
          "k": "same"
        },
        {
          "t": "ould take a quick",
          "k": "ins"
        },
        {
          "t": " look.",
          "k": "same"
        }
      ],
      "raw": "I was wondering if you can take a look.",
      "refined": "I was wondering if you could take a quick look.",
      "patterns": [
        "register",
        "tense"
      ],
      "why": "The corrected version keeps the meaning but tunes the tone for a professional, calm workplace message.",
      "cue": "Match the tone to the channel: Slack concise, PR calm, email a bit warmer.",
      "reuse": "Could you take a quick look when you have a moment?",
      "memory": 35,
      "seen": 4
    },
    {
      "id": "work-second-look",
      "caughtAt": "Today · 08:42",
      "source": "Slack · message review",
      "level": "level-1",
      "wrong": [
        {
          "t": "C",
          "k": "same"
        },
        {
          "t": "an you make a second look of",
          "k": "del"
        },
        {
          "t": " this message?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "C",
          "k": "same"
        },
        {
          "t": "ould you take a second look at",
          "k": "ins"
        },
        {
          "t": " this message?",
          "k": "same"
        }
      ],
      "raw": "Can you make a second look of this message?",
      "refined": "Could you take a second look at this message?",
      "patterns": [
        "collocation",
        "prep",
        "register"
      ],
      "why": "This is a natural-chunk problem: the whole phrase needs to sound like something English speakers actually say.",
      "cue": "Search your memory for the full phrase, not each word separately.",
      "reuse": "Could you take a second look at this before I send it?",
      "memory": 33,
      "seen": 5
    },
    {
      "id": "work-replicate",
      "caughtAt": "Today · 08:20",
      "source": "Technical update · implementation",
      "level": "level-2",
      "wrong": [
        {
          "t": "I want to ",
          "k": "same"
        },
        {
          "t": "mimic all th",
          "k": "del"
        },
        {
          "t": "e changes in the other app.",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "I want to ",
          "k": "same"
        },
        {
          "t": "replicate the sam",
          "k": "ins"
        },
        {
          "t": "e changes in the other app.",
          "k": "same"
        }
      ],
      "raw": "I want to mimic all the changes in the other app.",
      "refined": "I want to replicate the same changes in the other app.",
      "patterns": [
        "lexical",
        "concision"
      ],
      "why": "The revised wording uses the word people expect in this context, not just a literal translation.",
      "cue": "Ask whether this is the word a teammate would choose in the same context.",
      "reuse": "I’ll apply the same changes in the other app.",
      "memory": 29,
      "seen": 5,
      "hot": true
    },
    {
      "id": "work-dev-build",
      "caughtAt": "Yesterday · 17:48",
      "source": "Release note · testing",
      "level": "level-2",
      "wrong": [
        {
          "t": "The developer ",
          "k": "same"
        },
        {
          "t": "build is public for test",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "The developer ",
          "k": "same"
        },
        {
          "t": "test build is available for review",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "The developer build is public for test.",
      "refined": "The developer test build is available for review.",
      "patterns": [
        "lexical",
        "privacy",
        "register"
      ],
      "why": "The revised wording uses the word people expect in this context, not just a literal translation.",
      "cue": "Ask whether this is the word a teammate would choose in the same context.",
      "reuse": "The developer test build is available for review.",
      "memory": 44,
      "seen": 3
    },
    {
      "id": "work-examples-urls",
      "caughtAt": "Yesterday · 16:31",
      "source": "Data hygiene · examples",
      "level": "level-1",
      "wrong": [
        {
          "t": "Th",
          "k": "same"
        },
        {
          "t": "is examples contains",
          "k": "del"
        },
        {
          "t": " specific URLs.",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Th",
          "k": "same"
        },
        {
          "t": "ese examples contain",
          "k": "ins"
        },
        {
          "t": " specific URLs.",
          "k": "same"
        }
      ],
      "raw": "This examples contains specific URLs.",
      "refined": "These examples contain specific URLs.",
      "patterns": [
        "count",
        "tense",
        "privacy"
      ],
      "why": "The issue is countability: some English nouns or examples need plural agreement, while some nouns stay uncountable.",
      "cue": "Check plural nouns and uncountable nouns before adding -s.",
      "reuse": "These examples contain specific URLs, so we should replace them.",
      "memory": 22,
      "seen": 6,
      "hot": true
    },
    {
      "id": "work-avoid-sensitive",
      "caughtAt": "Yesterday · 15:55",
      "source": "Data hygiene · privacy",
      "level": "level-2",
      "wrong": [
        {
          "t": "Make it generic to ",
          "k": "same"
        },
        {
          "t": "dont provide",
          "k": "del"
        },
        {
          "t": " sensitive information.",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Make it generic to ",
          "k": "same"
        },
        {
          "t": "avoid exposing",
          "k": "ins"
        },
        {
          "t": " sensitive information.",
          "k": "same"
        }
      ],
      "raw": "Make it generic to dont provide sensitive information.",
      "refined": "Make it generic to avoid exposing sensitive information.",
      "patterns": [
        "privacy",
        "clause",
        "lexical"
      ],
      "why": "The learning example should teach the English pattern without exposing domains, customer names, or internal details.",
      "cue": "Replace specific domains, names, and codenames with generic placeholders.",
      "reuse": "Please make the examples generic to avoid exposing sensitive information.",
      "memory": 21,
      "seen": 5,
      "hot": true
    },
    {
      "id": "work-localstorage",
      "caughtAt": "Yesterday · 14:18",
      "source": "React note · persistence",
      "level": "level-2",
      "wrong": [
        {
          "t": "Use local",
          "k": "same"
        },
        {
          "t": " storage to keep the changes made",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Use local",
          "k": "same"
        },
        {
          "t": "Storage to persist user changes",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "Use local storage to keep the changes made.",
      "refined": "Use localStorage to persist user changes.",
      "patterns": [
        "naming",
        "lexical",
        "concision"
      ],
      "why": "Technical names and file/API names need exact casing because small casing drift looks like a technical error.",
      "cue": "Scan file names, APIs, libraries, React terms, and casing before grammar.",
      "reuse": "Persist the selected name and mastery state in localStorage.",
      "memory": 39,
      "seen": 3
    },
    {
      "id": "work-zip-scope",
      "caughtAt": "Yesterday · 13:47",
      "source": "Delivery note · files",
      "level": "level-2",
      "wrong": [
        {
          "t": "Don",
          "k": "same"
        },
        {
          "t": "t include unchanged files in the zip as package.json if it does not change anything",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Don",
          "k": "same"
        },
        {
          "t": "’t include unchanged files, such as package.json, in the ZIP if they didn’t change",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "Dont include unchanged files in the zip as package.json if it does not change anything.",
      "refined": "Don’t include unchanged files, such as package.json, in the ZIP if they didn’t change.",
      "patterns": [
        "bridge",
        "register",
        "naming"
      ],
      "why": "The idea is clear, but the sentence needs a stronger bridge so the reader does not have to repair it mentally.",
      "cue": "If both sides of a comma can stand alone, upgrade the bridge.",
      "reuse": "Please include only the files that changed.",
      "memory": 37,
      "seen": 4
    },
    {
      "id": "work-sass",
      "caughtAt": "Yesterday · 12:20",
      "source": "React note · styling",
      "level": "level-2",
      "wrong": [
        {
          "t": "App.css is now App.scss, ",
          "k": "same"
        },
        {
          "t": "use sass stuff and organise",
          "k": "del"
        },
        {
          "t": " better.",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "App.css is now App.scss, ",
          "k": "same"
        },
        {
          "t": "so use Sass features and organize the styles",
          "k": "ins"
        },
        {
          "t": " better.",
          "k": "same"
        }
      ],
      "raw": "App.css is now App.scss, use sass stuff and organise better.",
      "refined": "App.css is now App.scss, so use Sass features and organize the styles better.",
      "patterns": [
        "naming",
        "lexical",
        "bridge"
      ],
      "why": "Technical names and file/API names need exact casing because small casing drift looks like a technical error.",
      "cue": "Scan file names, APIs, libraries, React terms, and casing before grammar.",
      "reuse": "Since App.css is now App.scss, please use Sass features and organize the styles better.",
      "memory": 45,
      "seen": 3
    },
    {
      "id": "work-all-good",
      "caughtAt": "Yesterday · 11:52",
      "source": "Planning note · scope",
      "level": "level-2",
      "wrong": [
        {
          "t": "All good",
          "k": "del"
        },
        {
          "t": " what we need to do.",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Everything looks good; here’s",
          "k": "ins"
        },
        {
          "t": " what we need to do.",
          "k": "same"
        }
      ],
      "raw": "All good what we need to do.",
      "refined": "Everything looks good; here’s what we need to do.",
      "patterns": [
        "bridge",
        "register"
      ],
      "why": "The idea is clear, but the sentence needs a stronger bridge so the reader does not have to repair it mentally.",
      "cue": "If both sides of a comma can stand alone, upgrade the bridge.",
      "reuse": "Everything looks good; here’s what we need to do next.",
      "memory": 33,
      "seen": 4
    },
    {
      "id": "work-what-matters",
      "caughtAt": "Yesterday · 10:36",
      "source": "Planning note · priority",
      "level": "level-1",
      "wrong": [
        {
          "t": "What ",
          "k": "same"
        },
        {
          "t": "is matter",
          "k": "del"
        },
        {
          "t": " is the content.",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "What ",
          "k": "same"
        },
        {
          "t": "matters",
          "k": "ins"
        },
        {
          "t": " is the content.",
          "k": "same"
        }
      ],
      "raw": "What is matter is the content.",
      "refined": "What matters is the content.",
      "patterns": [
        "tense",
        "concision"
      ],
      "why": "The sentence has the right idea, but the verb form needs to match the helper verb or question structure.",
      "cue": "Before sending, check the verb after have/has, does/do, did, and will.",
      "reuse": "What matters is the content, not the wrapper.",
      "memory": 25,
      "seen": 5,
      "hot": true
    },
    {
      "id": "work-common-talks",
      "caughtAt": "This week · Tue",
      "source": "Learning plan · small talk",
      "level": "level-2",
      "wrong": [
        {
          "t": "Create cards for ",
          "k": "same"
        },
        {
          "t": "commons talks",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Create cards for ",
          "k": "same"
        },
        {
          "t": "everyday small talk",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "Create cards for commons talks.",
      "refined": "Create cards for everyday small talk.",
      "patterns": [
        "lexical",
        "count",
        "small_openers"
      ],
      "why": "The revised wording uses the word people expect in this context, not just a literal translation.",
      "cue": "Ask whether this is the word a teammate would choose in the same context.",
      "reuse": "Create cards for everyday small talk and common workplace conversations.",
      "memory": 47,
      "seen": 2
    },
    {
      "id": "work-not-good-area",
      "caughtAt": "This week · Tue",
      "source": "Learning plan · confidence",
      "level": "level-1",
      "wrong": [
        {
          "t": "This is a",
          "k": "same"
        },
        {
          "t": " area where Im not good",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "This is a",
          "k": "same"
        },
        {
          "t": "n area where I’m not very confident",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "This is a area where Im not good.",
      "refined": "This is an area where I’m not very confident.",
      "patterns": [
        "article",
        "register"
      ],
      "why": "The noun needs the right article so the sentence sounds complete and natural.",
      "cue": "Ask whether the noun needs a/an/the before it.",
      "reuse": "This is an area where I’m not very confident yet.",
      "memory": 36,
      "seen": 4
    },
    {
      "id": "work-search-internet",
      "caughtAt": "This week · Tue",
      "source": "Research note · learning data",
      "level": "level-1",
      "wrong": [
        {
          "t": "Search ",
          "k": "same"
        },
        {
          "t": "on Internet content for help",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Search ",
          "k": "same"
        },
        {
          "t": "the internet for helpful content",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "Search on Internet content for help.",
      "refined": "Search the internet for helpful content.",
      "patterns": [
        "prep",
        "article",
        "lexical"
      ],
      "why": "The grammar is close, but English often stores meaning in fixed preposition chunks rather than translated prepositions.",
      "cue": "Do not translate the preposition; recall the chunk: points to, depends on, in the ticket, on the PR.",
      "reuse": "Search the internet for helpful examples and patterns.",
      "memory": 50,
      "seen": 2
    },
    {
      "id": "work-nonviolent-term",
      "caughtAt": "This week · Tue",
      "source": "Learning plan · communication",
      "level": "level-1",
      "wrong": [
        {
          "t": "Create some cards for no",
          "k": "same"
        },
        {
          "t": " ",
          "k": "del"
        },
        {
          "t": "violent communication.",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Create some cards for no",
          "k": "same"
        },
        {
          "t": "n",
          "k": "ins"
        },
        {
          "t": "violent communication.",
          "k": "same"
        }
      ],
      "raw": "Create some cards for no violent communication.",
      "refined": "Create some cards for nonviolent communication.",
      "patterns": [
        "lexical",
        "nvc_observation"
      ],
      "why": "The revised wording uses the word people expect in this context, not just a literal translation.",
      "cue": "Ask whether this is the word a teammate would choose in the same context.",
      "reuse": "Create cards for nonviolent communication and conflict repair.",
      "memory": 43,
      "seen": 2
    },
    {
      "id": "work-patterns",
      "caughtAt": "This week · Mon",
      "source": "Learning plan · analysis",
      "level": "level-2",
      "wrong": [
        {
          "t": "Analyze my mistakes",
          "k": "same"
        },
        {
          "t": " and find a pattern so",
          "k": "del"
        },
        {
          "t": " suggest new cards.",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Analyze my mistakes",
          "k": "same"
        },
        {
          "t": ", find recurring patterns, and",
          "k": "ins"
        },
        {
          "t": " suggest new cards.",
          "k": "same"
        }
      ],
      "raw": "Analyze my mistakes and find a pattern so suggest new cards.",
      "refined": "Analyze my mistakes, find recurring patterns, and suggest new cards.",
      "patterns": [
        "bridge",
        "concision"
      ],
      "why": "The idea is clear, but the sentence needs a stronger bridge so the reader does not have to repair it mentally.",
      "cue": "If both sides of a comma can stand alone, upgrade the bridge.",
      "reuse": "Analyze the recurring patterns and suggest new cards.",
      "memory": 40,
      "seen": 3
    },
    {
      "id": "work-design-style",
      "caughtAt": "This week · Mon",
      "source": "Design note · direction",
      "level": "level-2",
      "wrong": [
        {
          "t": "The first ",
          "k": "same"
        },
        {
          "t": "site was good, but the style of design would be better in these molds",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "The first ",
          "k": "same"
        },
        {
          "t": "version was good, but this design style fits the project better",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "The first site was good, but the style of design would be better in these molds.",
      "refined": "The first version was good, but this design style fits the project better.",
      "patterns": [
        "concision",
        "lexical",
        "register"
      ],
      "why": "The shorter version keeps the useful content and removes the noise around it.",
      "cue": "Keep the decision, action, and next step. Remove the surrounding explanation unless needed.",
      "reuse": "The first version was good, but this design style fits the project better.",
      "memory": 49,
      "seen": 2
    },
    {
      "id": "small-opener-day",
      "caughtAt": "Small talk lab · 01",
      "source": "Small talk · opener",
      "level": "level-3",
      "wrong": [
        {
          "t": "H",
          "k": "same"
        },
        {
          "t": "i, how are you",
          "k": "del"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "H",
          "k": "same"
        },
        {
          "t": "ey, how’s your day going",
          "k": "ins"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "raw": "Hi, how are you?",
      "refined": "Hey, how’s your day going?",
      "patterns": [
        "small_openers"
      ],
      "why": "Use when you want the other person to answer with more than fine.",
      "cue": "Use a question that invites a short story, not a yes/no answer.",
      "reuse": "Hey, how’s your day going?",
      "memory": 20,
      "seen": 1,
      "hot": true
    },
    {
      "id": "small-weekend-good",
      "caughtAt": "Small talk lab · 02",
      "source": "Small talk · opener",
      "level": "level-3",
      "wrong": [
        {
          "t": "How was your weekend?",
          "k": "same"
        },
        {
          "t": " Good?",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "How was your weekend?",
          "k": "same"
        }
      ],
      "raw": "How was your weekend? Good?",
      "refined": "How was your weekend?",
      "patterns": [
        "small_openers",
        "concision"
      ],
      "why": "A clean question is often warmer than stacking yes/no prompts.",
      "cue": "Use a question that invites a short story, not a yes/no answer.",
      "reuse": "How was your weekend?",
      "memory": 27,
      "seen": 2
    },
    {
      "id": "small-weekend-fun",
      "caughtAt": "Small talk lab · 03",
      "source": "Small talk · opener",
      "level": "level-3",
      "wrong": [
        {
          "t": "Did you ",
          "k": "same"
        },
        {
          "t": "do something on",
          "k": "del"
        },
        {
          "t": " the weekend?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Did you ",
          "k": "same"
        },
        {
          "t": "get up to anything fun over",
          "k": "ins"
        },
        {
          "t": " the weekend?",
          "k": "same"
        }
      ],
      "raw": "Did you do something on the weekend?",
      "refined": "Did you get up to anything fun over the weekend?",
      "patterns": [
        "small_openers",
        "collocation"
      ],
      "why": "This chunk sounds natural and invites a small story.",
      "cue": "Use a question that invites a short story, not a yes/no answer.",
      "reuse": "Did you get up to anything fun over the weekend?",
      "memory": 34,
      "seen": 3
    },
    {
      "id": "small-yesterday",
      "caughtAt": "Small talk lab · 04",
      "source": "Small talk · opener",
      "level": "level-3",
      "wrong": [
        {
          "t": "What ",
          "k": "same"
        },
        {
          "t": "you did",
          "k": "del"
        },
        {
          "t": " yesterday?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "What ",
          "k": "same"
        },
        {
          "t": "did you get up to",
          "k": "ins"
        },
        {
          "t": " yesterday?",
          "k": "same"
        }
      ],
      "raw": "What you did yesterday?",
      "refined": "What did you get up to yesterday?",
      "patterns": [
        "small_openers",
        "tense"
      ],
      "why": "Question word order matters: what did you...",
      "cue": "Use a question that invites a short story, not a yes/no answer.",
      "reuse": "What did you get up to yesterday?",
      "memory": 41,
      "seen": 4
    },
    {
      "id": "small-after-work",
      "caughtAt": "Small talk lab · 05",
      "source": "Small talk · opener",
      "level": "level-3",
      "wrong": [
        {
          "t": "Do you have",
          "k": "del"
        },
        {
          "t": " plans after work?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Any",
          "k": "ins"
        },
        {
          "t": " plans after work?",
          "k": "same"
        }
      ],
      "raw": "Do you have plans after work?",
      "refined": "Any plans after work?",
      "patterns": [
        "small_openers",
        "concision"
      ],
      "why": "Short casual openers sound more natural in light chat.",
      "cue": "Use a question that invites a short story, not a yes/no answer.",
      "reuse": "Any plans after work?",
      "memory": 48,
      "seen": 1
    },
    {
      "id": "small-weather",
      "caughtAt": "Small talk lab · 06",
      "source": "Small talk · opener",
      "level": "level-3",
      "wrong": [
        {
          "t": "The weather",
          "k": "same"
        },
        {
          "t": " is good",
          "k": "del"
        },
        {
          "t": " today.",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "The weather",
          "k": "same"
        },
        {
          "t": "’s actually nice",
          "k": "ins"
        },
        {
          "t": " today.",
          "k": "same"
        }
      ],
      "raw": "The weather is good today.",
      "refined": "The weather’s actually nice today.",
      "patterns": [
        "small_openers",
        "small_share"
      ],
      "why": "A small personal reaction makes weather talk less robotic.",
      "cue": "Use a question that invites a short story, not a yes/no answer.",
      "reuse": "The weather’s actually nice today.",
      "memory": 55,
      "seen": 2
    },
    {
      "id": "small-background",
      "caughtAt": "Small talk lab · 07",
      "source": "Small talk · remote",
      "level": "level-3",
      "wrong": [
        {
          "t": "I ",
          "k": "same"
        },
        {
          "t": "see your background is new.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "I ",
          "k": "same"
        },
        {
          "t": "noticed your background changed — is that a new setup?",
          "k": "ins"
        }
      ],
      "raw": "I see your background is new.",
      "refined": "I noticed your background changed — is that a new setup?",
      "patterns": [
        "small_openers",
        "small_remote"
      ],
      "why": "Notice + question is stronger than observation only.",
      "cue": "Use a question that invites a short story, not a yes/no answer.",
      "reuse": "I noticed your background changed — is that a new setup?",
      "memory": 62,
      "seen": 3
    },
    {
      "id": "small-busy",
      "caughtAt": "Small talk lab · 08",
      "source": "Small talk · opener",
      "level": "level-3",
      "wrong": [
        {
          "t": "Are you busy",
          "k": "del"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "How’s your week looking",
          "k": "ins"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "raw": "Are you busy?",
      "refined": "How’s your week looking?",
      "patterns": [
        "small_openers",
        "register"
      ],
      "why": "This asks about capacity without sounding intrusive.",
      "cue": "Use a question that invites a short story, not a yes/no answer.",
      "reuse": "How’s your week looking?",
      "memory": 69,
      "seen": 4
    },
    {
      "id": "small-project",
      "caughtAt": "Small talk lab · 09",
      "source": "Small talk · work",
      "level": "level-3",
      "wrong": [
        {
          "t": "You like this project",
          "k": "del"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "How are you finding the project so far",
          "k": "ins"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "raw": "You like this project?",
      "refined": "How are you finding the project so far?",
      "patterns": [
        "small_openers",
        "small_work"
      ],
      "why": "Finding works well for asking about experience.",
      "cue": "Use a question that invites a short story, not a yes/no answer.",
      "reuse": "How are you finding the project so far?",
      "memory": 76,
      "seen": 1
    },
    {
      "id": "small-lived",
      "caughtAt": "Small talk lab · 10",
      "source": "Small talk · opener",
      "level": "level-3",
      "wrong": [
        {
          "t": "You live here long time",
          "k": "del"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Have you lived here long",
          "k": "ins"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "raw": "You live here long time?",
      "refined": "Have you lived here long?",
      "patterns": [
        "small_openers",
        "tense"
      ],
      "why": "Present perfect fits a life situation that continues to now.",
      "cue": "Use a question that invites a short story, not a yes/no answer.",
      "reuse": "Have you lived here long?",
      "memory": 83,
      "seen": 2
    },
    {
      "id": "small-best-part",
      "caughtAt": "Small talk lab · 11",
      "source": "Small talk · follow-up",
      "level": "level-3",
      "wrong": [
        {
          "t": "Oh nice",
          "k": "same"
        },
        {
          "t": ".",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "Oh nice",
          "k": "same"
        },
        {
          "t": " — what was the best part?",
          "k": "ins"
        }
      ],
      "raw": "Oh nice.",
      "refined": "Oh nice — what was the best part?",
      "patterns": [
        "small_followup"
      ],
      "why": "A follow-up keeps the conversation alive after the first answer.",
      "cue": "After the first answer, ask one curious follow-up before changing topics.",
      "reuse": "Oh nice — what was the best part?",
      "memory": 20,
      "seen": 3,
      "hot": true
    },
    {
      "id": "small-get-into",
      "caughtAt": "Small talk lab · 12",
      "source": "Small talk · follow-up",
      "level": "level-3",
      "wrong": [
        {
          "t": "Interesting",
          "k": "same"
        },
        {
          "t": ".",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "Interesting",
          "k": "same"
        },
        {
          "t": " — how did you get into that?",
          "k": "ins"
        }
      ],
      "raw": "Interesting.",
      "refined": "Interesting — how did you get into that?",
      "patterns": [
        "small_followup"
      ],
      "why": "This turns a dead-end reaction into curiosity.",
      "cue": "After the first answer, ask one curious follow-up before changing topics.",
      "reuse": "Interesting — how did you get into that?",
      "memory": 27,
      "seen": 4
    },
    {
      "id": "small-choose",
      "caughtAt": "Small talk lab · 13",
      "source": "Small talk · follow-up",
      "level": "level-3",
      "wrong": [
        {
          "t": "Wh",
          "k": "same"
        },
        {
          "t": "y",
          "k": "del"
        },
        {
          "t": " you choose that?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Wh",
          "k": "same"
        },
        {
          "t": "at made",
          "k": "ins"
        },
        {
          "t": " you choose that?",
          "k": "same"
        }
      ],
      "raw": "Why you choose that?",
      "refined": "What made you choose that?",
      "patterns": [
        "small_followup",
        "tense"
      ],
      "why": "What made you choose... is softer than why did you...",
      "cue": "After the first answer, ask one curious follow-up before changing topics.",
      "reuse": "What made you choose that?",
      "memory": 34,
      "seen": 1
    },
    {
      "id": "small-next",
      "caughtAt": "Small talk lab · 14",
      "source": "Small talk · follow-up",
      "level": "level-3",
      "wrong": [
        {
          "t": "And",
          "k": "del"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "What happened next",
          "k": "ins"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "raw": "And?",
      "refined": "What happened next?",
      "patterns": [
        "small_followup"
      ],
      "why": "A full question sounds warmer than a bare prompt.",
      "cue": "After the first answer, ask one curious follow-up before changing topics.",
      "reuse": "What happened next?",
      "memory": 41,
      "seen": 2
    },
    {
      "id": "small-havent-tried",
      "caughtAt": "Small talk lab · 15",
      "source": "Small talk · follow-up",
      "level": "level-3",
      "wrong": [
        {
          "t": "I ",
          "k": "same"
        },
        {
          "t": "don’t know this.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "I ",
          "k": "same"
        },
        {
          "t": "haven’t tried that before — what do you like about it?",
          "k": "ins"
        }
      ],
      "raw": "I don’t know this.",
      "refined": "I haven’t tried that before — what do you like about it?",
      "patterns": [
        "small_followup",
        "small_share"
      ],
      "why": "Share your context briefly, then invite their view.",
      "cue": "After the first answer, ask one curious follow-up before changing topics.",
      "reuse": "I haven’t tried that before — what do you like about it?",
      "memory": 48,
      "seen": 3
    },
    {
      "id": "small-enjoy",
      "caughtAt": "Small talk lab · 16",
      "source": "Small talk · follow-up",
      "level": "level-3",
      "wrong": [
        {
          "t": "So you like",
          "k": "del"
        },
        {
          "t": " it?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "What do you enjoy most about",
          "k": "ins"
        },
        {
          "t": " it?",
          "k": "same"
        }
      ],
      "raw": "So you like it?",
      "refined": "What do you enjoy most about it?",
      "patterns": [
        "small_followup"
      ],
      "why": "Open-ended questions avoid yes/no corners.",
      "cue": "After the first answer, ask one curious follow-up before changing topics.",
      "reuse": "What do you enjoy most about it?",
      "memory": 55,
      "seen": 4
    },
    {
      "id": "small-good",
      "caughtAt": "Small talk lab · 17",
      "source": "Small talk · follow-up",
      "level": "level-3",
      "wrong": [
        {
          "t": "It was",
          "k": "del"
        },
        {
          "t": " good?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "What made it",
          "k": "ins"
        },
        {
          "t": " good?",
          "k": "same"
        }
      ],
      "raw": "It was good?",
      "refined": "What made it good?",
      "patterns": [
        "small_followup"
      ],
      "why": "This asks for the reason, not just confirmation.",
      "cue": "After the first answer, ask one curious follow-up before changing topics.",
      "reuse": "What made it good?",
      "memory": 62,
      "seen": 1
    },
    {
      "id": "small-where",
      "caughtAt": "Small talk lab · 18",
      "source": "Small talk · follow-up",
      "level": "level-3",
      "wrong": [
        {
          "t": "Where ",
          "k": "same"
        },
        {
          "t": "this is",
          "k": "del"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Where ",
          "k": "same"
        },
        {
          "t": "is that",
          "k": "ins"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "raw": "Where this is?",
      "refined": "Where is that?",
      "patterns": [
        "small_followup",
        "tense"
      ],
      "why": "Question order needs the verb before the subject.",
      "cue": "After the first answer, ask one curious follow-up before changing topics.",
      "reuse": "Where is that?",
      "memory": 69,
      "seen": 2
    },
    {
      "id": "small-recommend",
      "caughtAt": "Small talk lab · 19",
      "source": "Small talk · follow-up",
      "level": "level-3",
      "wrong": [
        {
          "t": "Do you recommend",
          "k": "del"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Would you recommend it",
          "k": "ins"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "raw": "Do you recommend?",
      "refined": "Would you recommend it?",
      "patterns": [
        "small_followup",
        "article"
      ],
      "why": "Recommend usually needs the thing being recommended.",
      "cue": "After the first answer, ask one curious follow-up before changing topics.",
      "reuse": "Would you recommend it?",
      "memory": 76,
      "seen": 3
    },
    {
      "id": "small-common",
      "caughtAt": "Small talk lab · 20",
      "source": "Small talk · follow-up",
      "level": "level-3",
      "wrong": [
        {
          "t": "This is common there",
          "k": "del"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Is that common where you’re from",
          "k": "ins"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "raw": "This is common there?",
      "refined": "Is that common where you’re from?",
      "patterns": [
        "small_followup",
        "tense"
      ],
      "why": "This version gives the question a clear place and natural order.",
      "cue": "After the first answer, ask one curious follow-up before changing topics.",
      "reuse": "Is that common where you’re from?",
      "memory": 83,
      "seen": 4
    },
    {
      "id": "small-working-on",
      "caughtAt": "Small talk lab · 21",
      "source": "Small talk · work",
      "level": "level-3",
      "wrong": [
        {
          "t": "What are you working",
          "k": "same"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "What are you working",
          "k": "same"
        },
        {
          "t": " on these days",
          "k": "ins"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "raw": "What are you working?",
      "refined": "What are you working on these days?",
      "patterns": [
        "small_work",
        "prep"
      ],
      "why": "Work on is the chunk for current tasks.",
      "cue": "Keep it safe: project, weekend, food, light plans, tools, and shared context.",
      "reuse": "What are you working on these days?",
      "memory": 20,
      "seen": 1,
      "hot": true
    },
    {
      "id": "small-team",
      "caughtAt": "Small talk lab · 22",
      "source": "Small talk · work",
      "level": "level-3",
      "wrong": [
        {
          "t": "You are in which team",
          "k": "del"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Which team are you on",
          "k": "ins"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "raw": "You are in which team?",
      "refined": "Which team are you on?",
      "patterns": [
        "small_work",
        "prep"
      ],
      "why": "Which team are you on? is the workplace chunk.",
      "cue": "Keep it safe: project, weekend, food, light plans, tools, and shared context.",
      "reuse": "Which team are you on?",
      "memory": 27,
      "seen": 2
    },
    {
      "id": "small-long-meeting",
      "caughtAt": "Small talk lab · 23",
      "source": "Small talk · work",
      "level": "level-3",
      "wrong": [
        {
          "t": "Th",
          "k": "same"
        },
        {
          "t": "e meeting was long, right",
          "k": "del"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Th",
          "k": "same"
        },
        {
          "t": "at was a long meeting — what did you think",
          "k": "ins"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "raw": "The meeting was long, right?",
      "refined": "That was a long meeting — what did you think?",
      "patterns": [
        "small_work",
        "small_followup"
      ],
      "why": "Add an opinion question to avoid only complaining.",
      "cue": "Keep it safe: project, weekend, food, light plans, tools, and shared context.",
      "reuse": "That was a long meeting — what did you think?",
      "memory": 34,
      "seen": 3
    },
    {
      "id": "small-busy-day",
      "caughtAt": "Small talk lab · 24",
      "source": "Small talk · work",
      "level": "level-3",
      "wrong": [
        {
          "t": "Do you have ",
          "k": "same"
        },
        {
          "t": "much job",
          "k": "del"
        },
        {
          "t": " today?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Do you have ",
          "k": "same"
        },
        {
          "t": "a busy day",
          "k": "ins"
        },
        {
          "t": " today?",
          "k": "same"
        }
      ],
      "raw": "Do you have much job today?",
      "refined": "Do you have a busy day today?",
      "patterns": [
        "small_work",
        "lexical"
      ],
      "why": "Job is a role; day/workload is the context here.",
      "cue": "Keep it safe: project, weekend, food, light plans, tools, and shared context.",
      "reuse": "Do you have a busy day today?",
      "memory": 41,
      "seen": 4
    },
    {
      "id": "small-task-going",
      "caughtAt": "Small talk lab · 25",
      "source": "Small talk · work",
      "level": "level-3",
      "wrong": [
        {
          "t": "This task is hard",
          "k": "del"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "How’s that task going",
          "k": "ins"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "raw": "This task is hard?",
      "refined": "How’s that task going?",
      "patterns": [
        "small_work",
        "register"
      ],
      "why": "Ask about progress rather than labeling the task.",
      "cue": "Keep it safe: project, weekend, food, light plans, tools, and shared context.",
      "reuse": "How’s that task going?",
      "memory": 48,
      "seen": 1
    },
    {
      "id": "small-sprint",
      "caughtAt": "Small talk lab · 26",
      "source": "Small talk · work",
      "level": "level-3",
      "wrong": [
        {
          "t": "What ",
          "k": "same"
        },
        {
          "t": "is your plan for the",
          "k": "del"
        },
        {
          "t": " sprint?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "What ",
          "k": "same"
        },
        {
          "t": "are you focusing on this",
          "k": "ins"
        },
        {
          "t": " sprint?",
          "k": "same"
        }
      ],
      "raw": "What is your plan for the sprint?",
      "refined": "What are you focusing on this sprint?",
      "patterns": [
        "small_work",
        "lexical"
      ],
      "why": "Focusing on sounds natural for sprint priorities.",
      "cue": "Keep it safe: project, weekend, food, light plans, tools, and shared context.",
      "reuse": "What are you focusing on this sprint?",
      "memory": 55,
      "seen": 2
    },
    {
      "id": "small-time-off",
      "caughtAt": "Small talk lab · 27",
      "source": "Small talk · work",
      "level": "level-3",
      "wrong": [
        {
          "t": "You have holiday soon",
          "k": "del"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Do you have any time off coming up",
          "k": "ins"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "raw": "You have holiday soon?",
      "refined": "Do you have any time off coming up?",
      "patterns": [
        "small_work",
        "collocation"
      ],
      "why": "Time off is a safer general term than holiday.",
      "cue": "Keep it safe: project, weekend, food, light plans, tools, and shared context.",
      "reuse": "Do you have any time off coming up?",
      "memory": 62,
      "seen": 3
    },
    {
      "id": "small-lunch",
      "caughtAt": "Small talk lab · 28",
      "source": "Small talk · work",
      "level": "level-3",
      "wrong": [
        {
          "t": "Did you eat lunch",
          "k": "del"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Have you had lunch yet",
          "k": "ins"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "raw": "Did you eat lunch?",
      "refined": "Have you had lunch yet?",
      "patterns": [
        "small_work",
        "tense"
      ],
      "why": "Had lunch yet is the natural daily check-in chunk.",
      "cue": "Keep it safe: project, weekend, food, light plans, tools, and shared context.",
      "reuse": "Have you had lunch yet?",
      "memory": 69,
      "seen": 4
    },
    {
      "id": "small-remote-work",
      "caughtAt": "Small talk lab · 29",
      "source": "Small talk · work",
      "level": "level-3",
      "wrong": [
        {
          "t": "You like remote work",
          "k": "del"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "How do you find working remotely",
          "k": "ins"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "raw": "You like remote work?",
      "refined": "How do you find working remotely?",
      "patterns": [
        "small_work",
        "small_openers"
      ],
      "why": "How do you find...? asks about experience.",
      "cue": "Keep it safe: project, weekend, food, light plans, tools, and shared context.",
      "reuse": "How do you find working remotely?",
      "memory": 76,
      "seen": 1
    },
    {
      "id": "small-tools",
      "caughtAt": "Small talk lab · 30",
      "source": "Small talk · work",
      "level": "level-3",
      "wrong": [
        {
          "t": "What t",
          "k": "same"
        },
        {
          "t": "echnology you use",
          "k": "del"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "What t",
          "k": "same"
        },
        {
          "t": "ools are you using for that",
          "k": "ins"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "raw": "What technology you use?",
      "refined": "What tools are you using for that?",
      "patterns": [
        "small_work",
        "tense"
      ],
      "why": "Tools is more conversational than technology here.",
      "cue": "Keep it safe: project, weekend, food, light plans, tools, and shared context.",
      "reuse": "What tools are you using for that?",
      "memory": 83,
      "seen": 2
    },
    {
      "id": "small-hear-me",
      "caughtAt": "Small talk lab · 31",
      "source": "Small talk · remote",
      "level": "level-3",
      "wrong": [
        {
          "t": "Can you hear me ",
          "k": "same"
        },
        {
          "t": "good",
          "k": "del"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Can you hear me ",
          "k": "same"
        },
        {
          "t": "okay",
          "k": "ins"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "raw": "Can you hear me good?",
      "refined": "Can you hear me okay?",
      "patterns": [
        "small_remote",
        "lexical"
      ],
      "why": "Okay is the natural adverb-like word in call checks.",
      "cue": "Make the call smoother with soft, practical language.",
      "reuse": "Can you hear me okay?",
      "memory": 20,
      "seen": 3
    },
    {
      "id": "small-muted",
      "caughtAt": "Small talk lab · 32",
      "source": "Small talk · remote",
      "level": "level-3",
      "wrong": [
        {
          "t": "You ar",
          "k": "del"
        },
        {
          "t": "e muted.",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "I think you might b",
          "k": "ins"
        },
        {
          "t": "e muted.",
          "k": "same"
        }
      ],
      "raw": "You are muted.",
      "refined": "I think you might be muted.",
      "patterns": [
        "small_remote",
        "register"
      ],
      "why": "Softening avoids embarrassing someone on a call.",
      "cue": "Make the call smoother with soft, practical language.",
      "reuse": "I think you might be muted.",
      "memory": 27,
      "seen": 4,
      "hot": true
    },
    {
      "id": "small-connection",
      "caughtAt": "Small talk lab · 33",
      "source": "Small talk · remote",
      "level": "level-3",
      "wrong": [
        {
          "t": "Your ",
          "k": "same"
        },
        {
          "t": "internet is bad",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Your ",
          "k": "same"
        },
        {
          "t": "connection seems a bit unstable",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "Your internet is bad.",
      "refined": "Your connection seems a bit unstable.",
      "patterns": [
        "small_remote",
        "register"
      ],
      "why": "This describes the issue without blaming the person.",
      "cue": "Make the call smoother with soft, practical language.",
      "reuse": "Your connection seems a bit unstable.",
      "memory": 34,
      "seen": 1
    },
    {
      "id": "small-share-screen",
      "caughtAt": "Small talk lab · 34",
      "source": "Small talk · remote",
      "level": "level-3",
      "wrong": [
        {
          "t": "I",
          "k": "same"
        },
        {
          "t": " will share",
          "k": "del"
        },
        {
          "t": " screen.",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "I",
          "k": "same"
        },
        {
          "t": "’ll share my",
          "k": "ins"
        },
        {
          "t": " screen.",
          "k": "same"
        }
      ],
      "raw": "I will share screen.",
      "refined": "I’ll share my screen.",
      "patterns": [
        "small_remote",
        "article"
      ],
      "why": "Screen needs my/the in this context.",
      "cue": "Make the call smoother with soft, practical language.",
      "reuse": "I’ll share my screen.",
      "memory": 41,
      "seen": 2
    },
    {
      "id": "small-noise",
      "caughtAt": "Small talk lab · 35",
      "source": "Small talk · remote",
      "level": "level-3",
      "wrong": [
        {
          "t": "Sorry ",
          "k": "same"
        },
        {
          "t": "for the noise, my house is loud",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Sorry ",
          "k": "same"
        },
        {
          "t": "about the background noise",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "Sorry for the noise, my house is loud.",
      "refined": "Sorry about the background noise.",
      "patterns": [
        "small_remote",
        "concision"
      ],
      "why": "The shorter line is enough and sounds more professional.",
      "cue": "Make the call smoother with soft, practical language.",
      "reuse": "Sorry about the background noise.",
      "memory": 48,
      "seen": 3
    },
    {
      "id": "small-wait-join",
      "caughtAt": "Small talk lab · 36",
      "source": "Small talk · remote",
      "level": "level-3",
      "wrong": [
        {
          "t": "Let’s ",
          "k": "same"
        },
        {
          "t": "wait people",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Let’s ",
          "k": "same"
        },
        {
          "t": "give everyone a minute to join",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "Let’s wait people.",
      "refined": "Let’s give everyone a minute to join.",
      "patterns": [
        "small_remote",
        "register"
      ],
      "why": "This is the standard meeting-host phrase.",
      "cue": "Make the call smoother with soft, practical language.",
      "reuse": "Let’s give everyone a minute to join.",
      "memory": 55,
      "seen": 4
    },
    {
      "id": "small-thread",
      "caughtAt": "Small talk lab · 37",
      "source": "Small talk · remote",
      "level": "level-3",
      "wrong": [
        {
          "t": "I lost the ",
          "k": "same"
        },
        {
          "t": "context.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "I lost the ",
          "k": "same"
        },
        {
          "t": "thread for a second — could you repeat that?",
          "k": "ins"
        }
      ],
      "raw": "I lost the context.",
      "refined": "I lost the thread for a second — could you repeat that?",
      "patterns": [
        "small_remote",
        "collocation"
      ],
      "why": "Lost the thread is natural when you lose the flow.",
      "cue": "Make the call smoother with soft, practical language.",
      "reuse": "I lost the thread for a second — could you repeat that?",
      "memory": 62,
      "seen": 1
    },
    {
      "id": "small-interrupt",
      "caughtAt": "Small talk lab · 38",
      "source": "Small talk · remote",
      "level": "level-3",
      "wrong": [
        {
          "t": "I don’t want ",
          "k": "same"
        },
        {
          "t": "interrupt.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "I don’t want ",
          "k": "same"
        },
        {
          "t": "to interrupt, but can I add one thing?",
          "k": "ins"
        }
      ],
      "raw": "I don’t want interrupt.",
      "refined": "I don’t want to interrupt, but can I add one thing?",
      "patterns": [
        "small_remote",
        "register"
      ],
      "why": "The to-infinitive and soft question make the interruption polite.",
      "cue": "Make the call smoother with soft, practical language.",
      "reuse": "I don’t want to interrupt, but can I add one thing?",
      "memory": 69,
      "seen": 2
    },
    {
      "id": "small-presentation",
      "caughtAt": "Small talk lab · 39",
      "source": "Small talk · appreciation",
      "level": "level-3",
      "wrong": [
        {
          "t": "Your presentation was good",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "I really liked how clear your presentation was",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "Your presentation was good.",
      "refined": "I really liked how clear your presentation was.",
      "patterns": [
        "small_compliment"
      ],
      "why": "Specific appreciation lands better than good.",
      "cue": "Compliment the specific action, not the person’s identity or appearance.",
      "reuse": "I really liked how clear your presentation was.",
      "memory": 76,
      "seen": 3
    },
    {
      "id": "small-help",
      "caughtAt": "Small talk lab · 40",
      "source": "Small talk · appreciation",
      "level": "level-3",
      "wrong": [
        {
          "t": "Thanks for your help",
          "k": "same"
        },
        {
          "t": ", it was useful",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Thanks for your help",
          "k": "same"
        },
        {
          "t": " — that made things much clearer",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "Thanks for your help, it was useful.",
      "refined": "Thanks for your help — that made things much clearer.",
      "patterns": [
        "small_compliment"
      ],
      "why": "Name the positive effect of the help.",
      "cue": "Compliment the specific action, not the person’s identity or appearance.",
      "reuse": "Thanks for your help — that made things much clearer.",
      "memory": 83,
      "seen": 4
    },
    {
      "id": "small-fast",
      "caughtAt": "Small talk lab · 41",
      "source": "Small talk · appreciation",
      "level": "level-3",
      "wrong": [
        {
          "t": "You ",
          "k": "same"
        },
        {
          "t": "did fast",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "You ",
          "k": "same"
        },
        {
          "t": "turned that around really quickly",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "You did fast.",
      "refined": "You turned that around really quickly.",
      "patterns": [
        "small_compliment",
        "lexical"
      ],
      "why": "Turned that around is a natural workplace chunk.",
      "cue": "Compliment the specific action, not the person’s identity or appearance.",
      "reuse": "You turned that around really quickly.",
      "memory": 20,
      "seen": 1
    },
    {
      "id": "small-nice-work",
      "caughtAt": "Small talk lab · 42",
      "source": "Small talk · appreciation",
      "level": "level-3",
      "wrong": [
        {
          "t": "Good job on this",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Nice work on this — the flow is much easier to follow now",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "Good job on this.",
      "refined": "Nice work on this — the flow is much easier to follow now.",
      "patterns": [
        "small_compliment",
        "small_work"
      ],
      "why": "Add what improved so the compliment feels real.",
      "cue": "Compliment the specific action, not the person’s identity or appearance.",
      "reuse": "Nice work on this — the flow is much easier to follow now.",
      "memory": 27,
      "seen": 2
    },
    {
      "id": "small-idea",
      "caughtAt": "Small talk lab · 43",
      "source": "Small talk · appreciation",
      "level": "level-3",
      "wrong": [
        {
          "t": "I like ",
          "k": "same"
        },
        {
          "t": "your idea",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "I like ",
          "k": "same"
        },
        {
          "t": "that idea; it makes the next step clearer",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "I like your idea.",
      "refined": "I like that idea; it makes the next step clearer.",
      "patterns": [
        "small_compliment",
        "bridge"
      ],
      "why": "A reason makes agreement more useful.",
      "cue": "Compliment the specific action, not the person’s identity or appearance.",
      "reuse": "I like that idea; it makes the next step clearer.",
      "memory": 34,
      "seen": 3
    },
    {
      "id": "small-jump",
      "caughtAt": "Small talk lab · 44",
      "source": "Small talk · exit",
      "level": "level-3",
      "wrong": [
        {
          "t": "I need ",
          "k": "same"
        },
        {
          "t": "go",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "I need ",
          "k": "same"
        },
        {
          "t": "to jump to another call",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "I need go.",
      "refined": "I need to jump to another call.",
      "patterns": [
        "small_exit",
        "collocation"
      ],
      "why": "Jump to another call is a common work exit phrase.",
      "cue": "End with warmth plus a reason or handoff.",
      "reuse": "I need to jump to another call.",
      "memory": 41,
      "seen": 4,
      "hot": true
    },
    {
      "id": "small-catch-up",
      "caughtAt": "Small talk lab · 45",
      "source": "Small talk · exit",
      "level": "level-3",
      "wrong": [
        {
          "t": "Talk",
          "k": "del"
        },
        {
          "t": " later.",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Great talking with you — let’s catch up",
          "k": "ins"
        },
        {
          "t": " later.",
          "k": "same"
        }
      ],
      "raw": "Talk later.",
      "refined": "Great talking with you — let’s catch up later.",
      "patterns": [
        "small_exit"
      ],
      "why": "Warmth before the exit keeps the relationship open.",
      "cue": "End with warmth plus a reason or handoff.",
      "reuse": "Great talking with you — let’s catch up later.",
      "memory": 48,
      "seen": 1
    },
    {
      "id": "small-get-back",
      "caughtAt": "Small talk lab · 46",
      "source": "Small talk · exit",
      "level": "level-3",
      "wrong": [
        {
          "t": "I",
          "k": "same"
        },
        {
          "t": " will stop here",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "I",
          "k": "same"
        },
        {
          "t": "’ll let you get back to it",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "I will stop here.",
      "refined": "I’ll let you get back to it.",
      "patterns": [
        "small_exit",
        "register"
      ],
      "why": "This exit respects the other person’s time.",
      "cue": "End with warmth plus a reason or handoff.",
      "reuse": "I’ll let you get back to it.",
      "memory": 55,
      "seen": 2
    },
    {
      "id": "small-all-from-me",
      "caughtAt": "Small talk lab · 47",
      "source": "Small talk · exit",
      "level": "level-3",
      "wrong": [
        {
          "t": "That’s ",
          "k": "same"
        },
        {
          "t": "it",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "That’s ",
          "k": "same"
        },
        {
          "t": "all from me for now",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "That’s it.",
      "refined": "That’s all from me for now.",
      "patterns": [
        "small_exit"
      ],
      "why": "A little framing makes the ending less abrupt.",
      "cue": "End with warmth plus a reason or handoff.",
      "reuse": "That’s all from me for now.",
      "memory": 62,
      "seen": 3
    },
    {
      "id": "small-no-more",
      "caughtAt": "Small talk lab · 48",
      "source": "Small talk · exit",
      "level": "level-3",
      "wrong": [
        {
          "t": "I ",
          "k": "same"
        },
        {
          "t": "have nothing more",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "I ",
          "k": "same"
        },
        {
          "t": "don’t have anything else to add",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "I have nothing more.",
      "refined": "I don’t have anything else to add.",
      "patterns": [
        "small_exit",
        "register"
      ],
      "why": "This sounds more natural in meetings.",
      "cue": "End with warmth plus a reason or handoff.",
      "reuse": "I don’t have anything else to add.",
      "memory": 69,
      "seen": 4
    },
    {
      "id": "small-wrap",
      "caughtAt": "Small talk lab · 49",
      "source": "Small talk · exit",
      "level": "level-3",
      "wrong": [
        {
          "t": "Let’s finish.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "Shall we wrap here?",
          "k": "ins"
        }
      ],
      "raw": "Let’s finish.",
      "refined": "Shall we wrap here?",
      "patterns": [
        "small_exit",
        "register"
      ],
      "why": "Wrap here is a friendly meeting close.",
      "cue": "End with warmth plus a reason or handoff.",
      "reuse": "Shall we wrap here?",
      "memory": 76,
      "seen": 1
    },
    {
      "id": "small-low-key",
      "caughtAt": "Small talk lab · 50",
      "source": "Small talk · self-share",
      "level": "level-3",
      "wrong": [
        {
          "t": "My weekend was normal",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "It was pretty low-key, which was exactly what I needed",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "My weekend was normal.",
      "refined": "It was pretty low-key, which was exactly what I needed.",
      "patterns": [
        "small_share",
        "small_openers"
      ],
      "why": "Give one small detail so the other person has something to respond to.",
      "cue": "Share one sentence about yourself, then invite them back in.",
      "reuse": "It was pretty low-key, which was exactly what I needed.",
      "memory": 83,
      "seen": 2
    },
    {
      "id": "nvc-ignore",
      "caughtAt": "NVC lab · 01",
      "source": "NVC · reply delay",
      "level": "level-4",
      "wrong": [
        {
          "t": "You always ignore my messages.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "When I don’t get a reply by the end of the day, I feel blocked because I need visibility. Could you let me know when you expect to respond?",
          "k": "ins"
        }
      ],
      "raw": "You always ignore my messages.",
      "refined": "When I don’t get a reply by the end of the day, I feel blocked because I need visibility. Could you let me know when you expect to respond?",
      "patterns": [
        "nvc_observation",
        "nvc_feelings",
        "nvc_needs",
        "nvc_request"
      ],
      "why": "The revised version separates what happened from judgment, which lowers defensiveness.",
      "cue": "Start with what a camera could record.",
      "reuse": "When I don’t get a reply by the end of the day, I feel blocked because I need visibility. Could you let me know when you expect to respond?",
      "memory": 18,
      "seen": 2,
      "hot": true
    },
    {
      "id": "nvc-implementation-wrong",
      "caughtAt": "NVC lab · 02",
      "source": "NVC · code review",
      "level": "level-4",
      "wrong": [
        {
          "t": "This implementation is wrong.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "I’m seeing behavior that doesn’t match the acceptance criteria. Could we compare it with the expected flow?",
          "k": "ins"
        }
      ],
      "raw": "This implementation is wrong.",
      "refined": "I’m seeing behavior that doesn’t match the acceptance criteria. Could we compare it with the expected flow?",
      "patterns": [
        "nvc_observation",
        "nvc_request"
      ],
      "why": "The revised version separates what happened from judgment, which lowers defensiveness.",
      "cue": "Start with what a camera could record.",
      "reuse": "I’m seeing behavior that doesn’t match the acceptance criteria. Could we compare it with the expected flow?",
      "memory": 23,
      "seen": 3
    },
    {
      "id": "nvc-no-tests",
      "caughtAt": "NVC lab · 03",
      "source": "NVC · PR review",
      "level": "level-4",
      "wrong": [
        {
          "t": "You didn’t test this.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "I’m not seeing test evidence in the PR. Could you add the test notes or point me to where they are?",
          "k": "ins"
        }
      ],
      "raw": "You didn’t test this.",
      "refined": "I’m not seeing test evidence in the PR. Could you add the test notes or point me to where they are?",
      "patterns": [
        "nvc_observation",
        "nvc_request"
      ],
      "why": "The revised version separates what happened from judgment, which lowers defensiveness.",
      "cue": "Start with what a camera could record.",
      "reuse": "I’m not seeing test evidence in the PR. Could you add the test notes or point me to where they are?",
      "memory": 28,
      "seen": 4
    },
    {
      "id": "nvc-last-minute",
      "caughtAt": "NVC lab · 04",
      "source": "NVC · scope change",
      "level": "level-4",
      "wrong": [
        {
          "t": "Stop changing things at the last minute.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "When requirements change after implementation starts, I feel concerned about rework because I need predictability. Could we confirm the scope before I continue?",
          "k": "ins"
        }
      ],
      "raw": "Stop changing things at the last minute.",
      "refined": "When requirements change after implementation starts, I feel concerned about rework because I need predictability. Could we confirm the scope before I continue?",
      "patterns": [
        "nvc_observation",
        "nvc_feelings",
        "nvc_needs",
        "nvc_request"
      ],
      "why": "The revised version separates what happened from judgment, which lowers defensiveness.",
      "cue": "Start with what a camera could record.",
      "reuse": "When requirements change after implementation starts, I feel concerned about rework because I need predictability. Could we confirm the scope before I continue?",
      "memory": 33,
      "seen": 5,
      "hot": true
    },
    {
      "id": "nvc-not-clear",
      "caughtAt": "NVC lab · 05",
      "source": "NVC · clarification",
      "level": "level-4",
      "wrong": [
        {
          "t": "You are not clear.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "I’m having trouble understanding the expected outcome. Could you share one example of the final behavior?",
          "k": "ins"
        }
      ],
      "raw": "You are not clear.",
      "refined": "I’m having trouble understanding the expected outcome. Could you share one example of the final behavior?",
      "patterns": [
        "nvc_observation",
        "nvc_request"
      ],
      "why": "The revised version separates what happened from judgment, which lowers defensiveness.",
      "cue": "Start with what a camera could record.",
      "reuse": "I’m having trouble understanding the expected outcome. Could you share one example of the final behavior?",
      "memory": 38,
      "seen": 6
    },
    {
      "id": "nvc-make-wait",
      "caughtAt": "NVC lab · 06",
      "source": "NVC · review delay",
      "level": "level-4",
      "wrong": [
        {
          "t": "You make me wait.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "When the review is delayed, I feel blocked because I need momentum. Could you let me know a realistic review time?",
          "k": "ins"
        }
      ],
      "raw": "You make me wait.",
      "refined": "When the review is delayed, I feel blocked because I need momentum. Could you let me know a realistic review time?",
      "patterns": [
        "nvc_observation",
        "nvc_feelings",
        "nvc_needs",
        "nvc_request"
      ],
      "why": "The revised version separates what happened from judgment, which lowers defensiveness.",
      "cue": "Start with what a camera could record.",
      "reuse": "When the review is delayed, I feel blocked because I need momentum. Could you let me know a realistic review time?",
      "memory": 43,
      "seen": 2
    },
    {
      "id": "nvc-not-my-problem",
      "caughtAt": "NVC lab · 07",
      "source": "NVC · ownership",
      "level": "level-4",
      "wrong": [
        {
          "t": "This is not my problem.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "I want to help, and I need clarity on ownership. Could we confirm who should take the next step?",
          "k": "ins"
        }
      ],
      "raw": "This is not my problem.",
      "refined": "I want to help, and I need clarity on ownership. Could we confirm who should take the next step?",
      "patterns": [
        "nvc_boundary",
        "nvc_needs",
        "nvc_request"
      ],
      "why": "The revised version sets a clear boundary without attacking the other person.",
      "cue": "State what you can do and what you cannot take on right now.",
      "reuse": "I want to help, and I need clarity on ownership. Could we confirm who should take the next step?",
      "memory": 48,
      "seen": 3
    },
    {
      "id": "nvc-why-did",
      "caughtAt": "NVC lab · 08",
      "source": "NVC · curiosity",
      "level": "level-4",
      "wrong": [
        {
          "t": "Why did you do this",
          "k": "del"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "Can you walk me through the reasoning behind this change",
          "k": "ins"
        },
        {
          "t": "?",
          "k": "same"
        }
      ],
      "raw": "Why did you do this?",
      "refined": "Can you walk me through the reasoning behind this change?",
      "patterns": [
        "nvc_request",
        "register"
      ],
      "why": "The revised version turns pressure into a concrete, doable request.",
      "cue": "Ask for a concrete next action with room for a no or alternative.",
      "reuse": "Can you walk me through the reasoning behind this change?",
      "memory": 53,
      "seen": 4
    },
    {
      "id": "nvc-bad-idea",
      "caughtAt": "NVC lab · 09",
      "source": "NVC · disagreement",
      "level": "level-4",
      "wrong": [
        {
          "t": "That’s a bad idea.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "I’m concerned this option may increase complexity. Could we compare it with a simpler approach?",
          "k": "ins"
        }
      ],
      "raw": "That’s a bad idea.",
      "refined": "I’m concerned this option may increase complexity. Could we compare it with a simpler approach?",
      "patterns": [
        "nvc_feelings",
        "nvc_request"
      ],
      "why": "The revised version owns the feeling instead of blaming the other person for it.",
      "cue": "Use I feel + emotion, not I feel like + judgment.",
      "reuse": "I’m concerned this option may increase complexity. Could we compare it with a simpler approach?",
      "memory": 58,
      "seen": 5
    },
    {
      "id": "nvc-told-earlier",
      "caughtAt": "NVC lab · 10",
      "source": "NVC · timing",
      "level": "level-4",
      "wrong": [
        {
          "t": "You should have told me earlier.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "I would have liked to know earlier because I need time to adjust the plan. Could we flag changes sooner next time?",
          "k": "ins"
        }
      ],
      "raw": "You should have told me earlier.",
      "refined": "I would have liked to know earlier because I need time to adjust the plan. Could we flag changes sooner next time?",
      "patterns": [
        "nvc_feelings",
        "nvc_needs",
        "nvc_request"
      ],
      "why": "The revised version owns the feeling instead of blaming the other person for it.",
      "cue": "Use I feel + emotion, not I feel like + judgment.",
      "reuse": "I would have liked to know earlier because I need time to adjust the plan. Could we flag changes sooner next time?",
      "memory": 63,
      "seen": 6
    },
    {
      "id": "nvc-disagree",
      "caughtAt": "NVC lab · 11",
      "source": "NVC · disagreement",
      "level": "level-4",
      "wrong": [
        {
          "t": "I ",
          "k": "same"
        },
        {
          "t": "don’t agree with this",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "I ",
          "k": "same"
        },
        {
          "t": "see the trade-off differently. My concern is maintainability, so I’d like to discuss one alternative",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "I don’t agree with this.",
      "refined": "I see the trade-off differently. My concern is maintainability, so I’d like to discuss one alternative.",
      "patterns": [
        "nvc_observation",
        "nvc_needs",
        "register"
      ],
      "why": "The revised version separates what happened from judgment, which lowers defensiveness.",
      "cue": "Start with what a camera could record.",
      "reuse": "I see the trade-off differently. My concern is maintainability, so I’d like to discuss one alternative.",
      "memory": 68,
      "seen": 2
    },
    {
      "id": "nvc-need-now",
      "caughtAt": "NVC lab · 12",
      "source": "NVC · urgency",
      "level": "level-4",
      "wrong": [
        {
          "t": "I need this now.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "This is time-sensitive because it blocks the release. Could you prioritize it today, or tell me what timeline is realistic?",
          "k": "ins"
        }
      ],
      "raw": "I need this now.",
      "refined": "This is time-sensitive because it blocks the release. Could you prioritize it today, or tell me what timeline is realistic?",
      "patterns": [
        "nvc_request",
        "nvc_needs"
      ],
      "why": "The revised version turns pressure into a concrete, doable request.",
      "cue": "Ask for a concrete next action with room for a no or alternative.",
      "reuse": "This is time-sensitive because it blocks the release. Could you prioritize it today, or tell me what timeline is realistic?",
      "memory": 73,
      "seen": 3,
      "hot": true
    },
    {
      "id": "nvc-breaking-work",
      "caughtAt": "NVC lab · 13",
      "source": "NVC · coordination",
      "level": "level-4",
      "wrong": [
        {
          "t": "You keep breaking my work.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "The latest change affects the flow I’m testing. Could we coordinate before changing that path again?",
          "k": "ins"
        }
      ],
      "raw": "You keep breaking my work.",
      "refined": "The latest change affects the flow I’m testing. Could we coordinate before changing that path again?",
      "patterns": [
        "nvc_observation",
        "nvc_request"
      ],
      "why": "The revised version separates what happened from judgment, which lowers defensiveness.",
      "cue": "Start with what a camera could record.",
      "reuse": "The latest change affects the flow I’m testing. Could we coordinate before changing that path again?",
      "memory": 78,
      "seen": 4
    },
    {
      "id": "nvc-assigning",
      "caughtAt": "NVC lab · 14",
      "source": "NVC · capacity",
      "level": "level-4",
      "wrong": [
        {
          "t": "Don’t assign me things without asking.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "Before assigning new work, could you check my capacity so I can protect the current priorities?",
          "k": "ins"
        }
      ],
      "raw": "Don’t assign me things without asking.",
      "refined": "Before assigning new work, could you check my capacity so I can protect the current priorities?",
      "patterns": [
        "nvc_boundary",
        "nvc_request",
        "nvc_needs"
      ],
      "why": "The revised version sets a clear boundary without attacking the other person.",
      "cue": "State what you can do and what you cannot take on right now.",
      "reuse": "Before assigning new work, could you check my capacity so I can protect the current priorities?",
      "memory": 83,
      "seen": 5
    },
    {
      "id": "nvc-frustrated",
      "caughtAt": "NVC lab · 15",
      "source": "NVC · handoff",
      "level": "level-4",
      "wrong": [
        {
          "t": "I’m f",
          "k": "same"
        },
        {
          "t": "rustrated with you.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "I’m f",
          "k": "same"
        },
        {
          "t": "eeling frustrated because I need more predictability in the handoff. Could we agree on the next checkpoint?",
          "k": "ins"
        }
      ],
      "raw": "I’m frustrated with you.",
      "refined": "I’m feeling frustrated because I need more predictability in the handoff. Could we agree on the next checkpoint?",
      "patterns": [
        "nvc_feelings",
        "nvc_needs",
        "nvc_request"
      ],
      "why": "The revised version owns the feeling instead of blaming the other person for it.",
      "cue": "Use I feel + emotion, not I feel like + judgment.",
      "reuse": "I’m feeling frustrated because I need more predictability in the handoff. Could we agree on the next checkpoint?",
      "memory": 88,
      "seen": 6
    },
    {
      "id": "nvc-useless-meeting",
      "caughtAt": "NVC lab · 16",
      "source": "NVC · meeting",
      "level": "level-4",
      "wrong": [
        {
          "t": "This meeting was useless.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "I’m not sure we reached a clear decision. Could we capture the owner and next step before we close?",
          "k": "ins"
        }
      ],
      "raw": "This meeting was useless.",
      "refined": "I’m not sure we reached a clear decision. Could we capture the owner and next step before we close?",
      "patterns": [
        "nvc_observation",
        "nvc_request"
      ],
      "why": "The revised version separates what happened from judgment, which lowers defensiveness.",
      "cue": "Start with what a camera could record.",
      "reuse": "I’m not sure we reached a clear decision. Could we capture the owner and next step before we close?",
      "memory": 93,
      "seen": 2
    },
    {
      "id": "nvc-nobody-told",
      "caughtAt": "NVC lab · 17",
      "source": "NVC · visibility",
      "level": "level-4",
      "wrong": [
        {
          "t": "Nobody told me.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "I didn’t see that update. Where should I look next time so I don’t miss it?",
          "k": "ins"
        }
      ],
      "raw": "Nobody told me.",
      "refined": "I didn’t see that update. Where should I look next time so I don’t miss it?",
      "patterns": [
        "nvc_observation",
        "nvc_request"
      ],
      "why": "The revised version separates what happened from judgment, which lowers defensiveness.",
      "cue": "Start with what a camera could record.",
      "reuse": "I didn’t see that update. Where should I look next time so I don’t miss it?",
      "memory": 22,
      "seen": 3
    },
    {
      "id": "nvc-overcomplicate",
      "caughtAt": "NVC lab · 18",
      "source": "NVC · simplification",
      "level": "level-4",
      "wrong": [
        {
          "t": "You are overcomplicating it.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "I’m worried this adds complexity. Could we compare it with a simpler option before deciding?",
          "k": "ins"
        }
      ],
      "raw": "You are overcomplicating it.",
      "refined": "I’m worried this adds complexity. Could we compare it with a simpler option before deciding?",
      "patterns": [
        "nvc_feelings",
        "nvc_request"
      ],
      "why": "The revised version owns the feeling instead of blaming the other person for it.",
      "cue": "Use I feel + emotion, not I feel like + judgment.",
      "reuse": "I’m worried this adds complexity. Could we compare it with a simpler option before deciding?",
      "memory": 27,
      "seen": 4
    },
    {
      "id": "nvc-cant-work",
      "caughtAt": "NVC lab · 19",
      "source": "NVC · ambiguity",
      "level": "level-4",
      "wrong": [
        {
          "t": "I",
          "k": "same"
        },
        {
          "t": " can’t work like this.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "I",
          "k": "same"
        },
        {
          "t": "’m having trouble moving forward with the current ambiguity. Could we clarify the acceptance criteria first?",
          "k": "ins"
        }
      ],
      "raw": "I can’t work like this.",
      "refined": "I’m having trouble moving forward with the current ambiguity. Could we clarify the acceptance criteria first?",
      "patterns": [
        "nvc_feelings",
        "nvc_needs",
        "nvc_request"
      ],
      "why": "The revised version owns the feeling instead of blaming the other person for it.",
      "cue": "Use I feel + emotion, not I feel like + judgment.",
      "reuse": "I’m having trouble moving forward with the current ambiguity. Could we clarify the acceptance criteria first?",
      "memory": 32,
      "seen": 5
    },
    {
      "id": "nvc-missed-point",
      "caughtAt": "NVC lab · 20",
      "source": "NVC · repair",
      "level": "level-4",
      "wrong": [
        {
          "t": "You missed the point",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "I think I may not have explained the goal clearly. What I meant was that the issue is the user flow, not the styling",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "You missed the point.",
      "refined": "I think I may not have explained the goal clearly. What I meant was that the issue is the user flow, not the styling.",
      "patterns": [
        "nvc_repair",
        "nvc_observation"
      ],
      "why": "The revised version protects the relationship while clarifying the meaning.",
      "cue": "Assume misunderstanding before assuming bad intent.",
      "reuse": "I think I may not have explained the goal clearly. What I meant was that the issue is the user flow, not the styling.",
      "memory": 37,
      "seen": 6,
      "hot": true
    },
    {
      "id": "nvc-defensive",
      "caughtAt": "NVC lab · 21",
      "source": "NVC · tension",
      "level": "level-4",
      "wrong": [
        {
          "t": "You’re defensive.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "I’m noticing we’re both explaining our side. Could we pause and align on what each of us needs?",
          "k": "ins"
        }
      ],
      "raw": "You’re defensive.",
      "refined": "I’m noticing we’re both explaining our side. Could we pause and align on what each of us needs?",
      "patterns": [
        "nvc_observation",
        "nvc_needs",
        "nvc_request"
      ],
      "why": "The revised version separates what happened from judgment, which lowers defensiveness.",
      "cue": "Start with what a camera could record.",
      "reuse": "I’m noticing we’re both explaining our side. Could we pause and align on what each of us needs?",
      "memory": 42,
      "seen": 2
    },
    {
      "id": "nvc-do-now",
      "caughtAt": "NVC lab · 22",
      "source": "NVC · urgency",
      "level": "level-4",
      "wrong": [
        {
          "t": "This is ",
          "k": "same"
        },
        {
          "t": "urgent, do it now.",
          "k": "del"
        }
      ],
      "right": [
        {
          "t": "This is ",
          "k": "same"
        },
        {
          "t": "time-sensitive because it affects today’s release. Would you be willing to take it today, or suggest another owner?",
          "k": "ins"
        }
      ],
      "raw": "This is urgent, do it now.",
      "refined": "This is time-sensitive because it affects today’s release. Would you be willing to take it today, or suggest another owner?",
      "patterns": [
        "nvc_request",
        "nvc_needs"
      ],
      "why": "The revised version turns pressure into a concrete, doable request.",
      "cue": "Ask for a concrete next action with room for a no or alternative.",
      "reuse": "This is time-sensitive because it affects today’s release. Would you be willing to take it today, or suggest another owner?",
      "memory": 47,
      "seen": 3
    },
    {
      "id": "nvc-already-said",
      "caughtAt": "NVC lab · 23",
      "source": "NVC · repair",
      "level": "level-4",
      "wrong": [
        {
          "t": "I ",
          "k": "same"
        },
        {
          "t": "already said that",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "I ",
          "k": "same"
        },
        {
          "t": "may not have been clear earlier. Let me restate the key point in one sentence",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "I already said that.",
      "refined": "I may not have been clear earlier. Let me restate the key point in one sentence.",
      "patterns": [
        "nvc_repair",
        "register"
      ],
      "why": "The revised version protects the relationship while clarifying the meaning.",
      "cue": "Assume misunderstanding before assuming bad intent.",
      "reuse": "I may not have been clear earlier. Let me restate the key point in one sentence.",
      "memory": 52,
      "seen": 4
    },
    {
      "id": "nvc-too-fast",
      "caughtAt": "NVC lab · 24",
      "source": "NVC · public clarification",
      "level": "level-4",
      "wrong": [
        {
          "t": "You read too fast",
          "k": "del"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "right": [
        {
          "t": "I may not have explained it clearly. What I meant was that I’m referencing the pattern, not suggesting we use that solution",
          "k": "ins"
        },
        {
          "t": ".",
          "k": "same"
        }
      ],
      "raw": "You read too fast.",
      "refined": "I may not have explained it clearly. What I meant was that I’m referencing the pattern, not suggesting we use that solution.",
      "patterns": [
        "nvc_repair",
        "register"
      ],
      "why": "The revised version protects the relationship while clarifying the meaning.",
      "cue": "Assume misunderstanding before assuming bad intent.",
      "reuse": "I may not have explained it clearly. What I meant was that I’m referencing the pattern, not suggesting we use that solution.",
      "memory": 57,
      "seen": 5,
      "hot": true
    }
  ],
  "drills": [
    {
      "id": "drill-have-applied",
      "phraseId": "work-apply",
      "patternId": "tense",
      "prompt": "Choose the version that fits present perfect:",
      "sentence": [
        "I’ve ",
        "____",
        " the changes."
      ],
      "options": [
        "apply",
        "applied",
        "applying",
        "applies"
      ],
      "answer": 1,
      "why": "After I’ve, use the past participle: applied."
    },
    {
      "id": "drill-pr-tests",
      "phraseId": "work-tests-pr",
      "patternId": "concision",
      "prompt": "Make the standup update concise:",
      "sentence": [
        "Almost done — I’m ",
        "____",
        " a few tests, then I’ll open the PR."
      ],
      "options": [
        "doing some tests",
        "running",
        "making sure with",
        "testing around"
      ],
      "answer": 1,
      "why": "Running tests is the concise work-status chunk."
    },
    {
      "id": "drill-does-work",
      "phraseId": "work-task-works",
      "patternId": "tense",
      "prompt": "After does, choose the base verb:",
      "sentence": [
        "How does the task ",
        "____",
        "?"
      ],
      "options": [
        "works",
        "worked",
        "work",
        "working"
      ],
      "answer": 2,
      "why": "Does already carries the tense, so the main verb is work."
    },
    {
      "id": "drill-example",
      "phraseId": "work-example",
      "patternId": "article",
      "prompt": "Pick the natural article:",
      "sentence": [
        "Give me ",
        "____",
        " example."
      ],
      "options": [
        "a",
        "an",
        "the one",
        "no article"
      ],
      "answer": 1,
      "why": "Example starts with a vowel sound, so use an."
    },
    {
      "id": "drill-url",
      "phraseId": "work-url",
      "patternId": "prep",
      "prompt": "Choose the technical chunk:",
      "sentence": [
        "The URL in the ticket ",
        "____",
        " the staging preview."
      ],
      "options": [
        "points for",
        "points to",
        "is points",
        "points on"
      ],
      "answer": 1,
      "why": "A link or URL points to something."
    },
    {
      "id": "drill-avoid",
      "phraseId": "work-avoid-loading",
      "patternId": "clause",
      "prompt": "After avoid, reshape the action:",
      "sentence": [
        "Avoid the button ",
        "____",
        " in the loading state."
      ],
      "options": [
        "stays",
        "to stay",
        "staying",
        "is staying"
      ],
      "answer": 2,
      "why": "Avoid takes the noun-like -ing form: staying."
    },
    {
      "id": "drill-semicolon",
      "phraseId": "work-meta-tag",
      "patternId": "bridge",
      "prompt": "Bridge two complete thoughts:",
      "sentence": [
        "The version number is just metadata",
        "____",
        " nothing changed in the UI."
      ],
      "options": [
        ",",
        ";",
        " and,",
        " because"
      ],
      "answer": 1,
      "why": "A semicolon can connect two complete, related thoughts."
    },
    {
      "id": "drill-could",
      "phraseId": "work-review-request",
      "patternId": "register",
      "prompt": "Tune the review request:",
      "sentence": [
        "I was wondering if you ",
        "____",
        " take a quick look."
      ],
      "options": [
        "can",
        "could",
        "will can",
        "should to"
      ],
      "answer": 1,
      "why": "Could is softer and more natural in this request."
    },
    {
      "id": "drill-look-at",
      "phraseId": "work-second-look",
      "patternId": "collocation",
      "prompt": "Choose the natural chunk:",
      "sentence": [
        "Could you take a second look ",
        "____",
        " this message?"
      ],
      "options": [
        "of",
        "in",
        "at",
        "for"
      ],
      "answer": 2,
      "why": "The chunk is take a look at."
    },
    {
      "id": "drill-replicate",
      "phraseId": "work-replicate",
      "patternId": "lexical",
      "prompt": "Pick the expected implementation verb:",
      "sentence": [
        "I’ll ",
        "____",
        " the same changes in the other app."
      ],
      "options": [
        "mimic",
        "replicate",
        "copycat",
        "simulate"
      ],
      "answer": 1,
      "why": "Replicate sounds like reproducing implementation, not imitation."
    },
    {
      "id": "drill-localstorage",
      "phraseId": "work-localstorage",
      "patternId": "naming",
      "prompt": "Use the exact browser API name:",
      "sentence": [
        "Use ",
        "____",
        " to persist user changes."
      ],
      "options": [
        "local storage",
        "Local Storage",
        "localStorage",
        "localstorage"
      ],
      "answer": 2,
      "why": "The Web Storage API property is written localStorage."
    },
    {
      "id": "drill-what-matters",
      "phraseId": "work-what-matters",
      "patternId": "concision",
      "prompt": "Compress the idea:",
      "sentence": [
        "What ",
        "____",
        " is the content."
      ],
      "options": [
        "is matter",
        "matters",
        "is matters",
        "matter"
      ],
      "answer": 1,
      "why": "What matters is the natural compressed form."
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
      "phraseId": "small-weekend-fun",
      "patternId": "small_openers",
      "prompt": "Choose the natural weekend chunk:",
      "sentence": [
        "Did you get up to anything fun ",
        "____",
        "?"
      ],
      "options": [
        "on the weekend",
        "over the weekend",
        "in weekend",
        "at weekend"
      ],
      "answer": 1,
      "why": "Over the weekend is the natural chunk here."
    },
    {
      "id": "drill-follow-best",
      "phraseId": "small-best-part",
      "patternId": "small_followup",
      "prompt": "Keep the conversation alive:",
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
      "why": "What was the best part? gives the other person an easy next answer."
    },
    {
      "id": "drill-get-into",
      "phraseId": "small-get-into",
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
      "phraseId": "small-working-on",
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
      "why": "You work on tasks, tickets, PRs, and projects."
    },
    {
      "id": "drill-team",
      "phraseId": "small-team",
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
      "phraseId": "small-muted",
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
      "phraseId": "small-hear-me",
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
      "id": "drill-compliment",
      "phraseId": "small-presentation",
      "patternId": "small_compliment",
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
      "phraseId": "small-jump",
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
      "phraseId": "small-low-key",
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
      "phraseId": "nvc-implementation-wrong",
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
      "patternId": "nvc_needs",
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
      "prompt": "Ask for capacity check:",
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
      "id": "drill-nvc-fast",
      "phraseId": "nvc-too-fast",
      "patternId": "nvc_repair",
      "prompt": "Clarify without public blame:",
      "sentence": [
        "I may not have explained it ",
        "____",
        "."
      ],
      "options": [
        "clear",
        "clearly",
        "wrong",
        "fast"
      ],
      "answer": 1,
      "why": "Clearly is the adverb, and the line avoids blaming the reader."
    },
    {
      "id": "drill-nvc-no-tests",
      "phraseId": "nvc-no-tests",
      "patternId": "nvc_observation",
      "prompt": "Make PR feedback observable:",
      "sentence": [
        "I’m not seeing test evidence ",
        "____",
        " the PR."
      ],
      "options": [
        "on",
        "in",
        "from",
        "for blame in"
      ],
      "answer": 1,
      "why": "In the PR keeps the feedback tied to visible evidence."
    },
    {
      "id": "drill-small-wrap",
      "phraseId": "small-wrap",
      "patternId": "small_exit",
      "prompt": "Close a meeting politely:",
      "sentence": [
        "Shall we ",
        "____",
        " here?"
      ],
      "options": [
        "finish",
        "wrap",
        "stop",
        "end all"
      ],
      "answer": 1,
      "why": "Wrap here is a friendly meeting-close phrase."
    },
    {
      "id": "drill-small-thread",
      "phraseId": "small-thread",
      "patternId": "small_remote",
      "prompt": "Recover a remote-call moment:",
      "sentence": [
        "I lost the ",
        "____",
        " for a second — could you repeat that?"
      ],
      "options": [
        "context",
        "thread",
        "problem",
        "meeting"
      ],
      "answer": 1,
      "why": "Lost the thread sounds natural when you lose the flow."
    }
  ]
};

export const NOTE_PACKS = {
  "tense": {
    "title": "Verb-form checkpoint",
    "mistakes": [
      [
        "I've apply",
        "I've applied"
      ],
      [
        "How does it works?",
        "How does it work?"
      ],
      [
        "How will it reminds me?",
        "How will it remind me?"
      ],
      [
        "Yesterday I have seen",
        "Yesterday I saw"
      ]
    ],
    "examples": [
      [
        "I've make the update.",
        "I've made the update."
      ],
      [
        "Does this works?",
        "Does this work?"
      ],
      [
        "Will it breaks?",
        "Will it break?"
      ]
    ],
    "tips": [
      "After have/has, use the participle.",
      "After does/did/will, use the base verb.",
      "Question word order is often the hidden issue."
    ]
  },
  "prep": {
    "title": "Prepositions as chunks",
    "mistakes": [
      [
        "depends of",
        "depends on"
      ],
      [
        "URL of the ticket",
        "URL in the ticket"
      ],
      [
        "working in the PR",
        "working on the PR"
      ],
      [
        "take a look of",
        "take a look at"
      ]
    ],
    "examples": [
      [
        "The link points for the preview.",
        "The link points to the preview."
      ],
      [
        "I’m working in the ticket.",
        "I’m working on the ticket."
      ],
      [
        "The context is on the document.",
        "The context is in the document."
      ]
    ],
    "tips": [
      "Learn technical phrases as whole chunks.",
      "When a sentence feels translated, check the preposition first.",
      "In workplace English, on often attaches to tasks and PRs."
    ]
  },
  "article": {
    "title": "A/an/the naturalness pass",
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
        "loading state",
        "the loading state"
      ],
      [
        "a area",
        "an area"
      ]
    ],
    "examples": [
      [
        "Give me a example.",
        "Give me an example."
      ],
      [
        "I’ll share screen.",
        "I’ll share my screen."
      ],
      [
        "This is a area I’m learning.",
        "This is an area I’m learning."
      ]
    ],
    "tips": [
      "Use an before a vowel sound.",
      "Use my/the when the noun belongs to the current context.",
      "Articles are small, but they change how natural the sentence feels."
    ]
  },
  "clause": {
    "title": "Turn clauses into actions",
    "mistakes": [
      [
        "avoid it breaks",
        "avoid it breaking"
      ],
      [
        "avoid the button stays",
        "avoid the button staying"
      ],
      [
        "prevent the request fails",
        "prevent the request failing"
      ],
      [
        "keep it doesn't happen",
        "keep it from happening"
      ]
    ],
    "examples": [
      [
        "Avoid the build breaks.",
        "Avoid the build breaking."
      ],
      [
        "Prevent the user sees it.",
        "Prevent the user from seeing it."
      ],
      [
        "Avoid the request fails silently.",
        "Avoid the request failing silently."
      ]
    ],
    "tips": [
      "Avoid usually takes a noun-like object.",
      "The -ing form often turns an action into an object.",
      "If you can hear a second sentence after avoid, reshape it."
    ]
  },
  "bridge": {
    "title": "Bridge complete thoughts",
    "mistakes": [
      [
        "It’s ready, I’ll push it",
        "It’s ready; I’ll push it"
      ],
      [
        "All good what we need",
        "Everything looks good; here’s what we need"
      ],
      [
        "I like it, it helps",
        "I like it; it helps"
      ],
      [
        "That’s it",
        "That’s all from me for now"
      ]
    ],
    "examples": [
      [
        "The build is ready, I’ll share it.",
        "The build is ready; I’ll share it."
      ],
      [
        "The plan changed, we need to confirm scope.",
        "The plan changed, so we need to confirm scope."
      ],
      [
        "I agree, it makes sense.",
        "I agree; it makes sense."
      ]
    ],
    "tips": [
      "A comma is too weak between two full sentences.",
      "Use a semicolon when the ideas are tightly connected.",
      "Use so/because/then when the relationship matters."
    ]
  },
  "filler": {
    "title": "Trim the scaffolding",
    "mistakes": [
      [
        "I’m just basically checking",
        "I’m checking"
      ],
      [
        "kind of like",
        "like"
      ],
      [
        "you know, everything",
        "everything"
      ],
      [
        "making sure that it works",
        "checking that it works"
      ]
    ],
    "examples": [
      [
        "I’m just doing some tests.",
        "I’m running a few tests."
      ],
      [
        "Basically, I think it is done.",
        "I think it’s done."
      ],
      [
        "I’m making sure that it works.",
        "I’m checking that it works."
      ]
    ],
    "tips": [
      "One softener is fine; three make the message heavy.",
      "In status updates, favor verbs over explanations.",
      "Remove filler last, after the message is structurally clear."
    ]
  },
  "register": {
    "title": "Calm professional tone",
    "mistakes": [
      [
        "Can you look?",
        "Could you take a look?"
      ],
      [
        "You are muted",
        "I think you might be muted"
      ],
      [
        "This is wrong",
        "I’m seeing a mismatch"
      ],
      [
        "I have nothing more",
        "I don’t have anything else to add"
      ]
    ],
    "examples": [
      [
        "Take a look now.",
        "Could you take a quick look when you have a moment?"
      ],
      [
        "The connection is bad.",
        "The connection seems a bit unstable."
      ],
      [
        "I don’t agree.",
        "I see the trade-off differently."
      ]
    ],
    "tips": [
      "Use could/would for requests.",
      "Use I’m seeing or it looks like when you are reporting evidence.",
      "Soft tone should clarify, not hide the ask."
    ]
  },
  "lexical": {
    "title": "Expected workplace words",
    "mistakes": [
      [
        "mimic the changes",
        "replicate the changes"
      ],
      [
        "public for test",
        "available for review"
      ],
      [
        "common talks",
        "small talk"
      ],
      [
        "no violent communication",
        "nonviolent communication"
      ]
    ],
    "examples": [
      [
        "I’ll mimic the implementation.",
        "I’ll replicate the implementation."
      ],
      [
        "This is public for test.",
        "This is available for testing."
      ],
      [
        "Search helpful content.",
        "Search for helpful content."
      ]
    ],
    "tips": [
      "Use the term your audience expects, not the literal equivalent.",
      "Technical English often prefers precise verbs: persist, replicate, deploy, review.",
      "For learning topics, use the standard term first: small talk, nonviolent communication."
    ]
  },
  "count": {
    "title": "Agreement and countability",
    "mistakes": [
      [
        "this examples",
        "these examples"
      ],
      [
        "examples contains",
        "examples contain"
      ],
      [
        "feedbacks",
        "feedback"
      ],
      [
        "informations",
        "information"
      ]
    ],
    "examples": [
      [
        "This examples are useful.",
        "These examples are useful."
      ],
      [
        "The feedbacks were helpful.",
        "The feedback was helpful."
      ],
      [
        "I need more informations.",
        "I need more information."
      ]
    ],
    "tips": [
      "Examples is plural: these examples contain.",
      "Feedback and information are usually mass nouns.",
      "When in doubt, say some feedback or more information."
    ]
  },
  "naming": {
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
        "zip",
        "ZIP"
      ],
      [
        "app scss",
        "App.scss"
      ]
    ],
    "examples": [
      [
        "Use local storage.",
        "Use localStorage."
      ],
      [
        "The app css file changed.",
        "The App.css file changed."
      ],
      [
        "Create a zip.",
        "Create a ZIP."
      ]
    ],
    "tips": [
      "Use exact API and file casing.",
      "Casing errors look like technical errors even when grammar is correct.",
      "Scan names before punctuation."
    ]
  },
  "privacy": {
    "title": "Sanitize before turning messages into cards",
    "mistakes": [
      [
        "real domain",
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
        "internal label",
        "developer test build"
      ]
    ],
    "examples": [
      [
        "The URL points to a real host.",
        "The URL points to the staging preview."
      ],
      [
        "Customer X saw the issue.",
        "A customer account saw the issue."
      ],
      [
        "The internal label is live.",
        "The developer test build is available for review."
      ]
    ],
    "tips": [
      "Teach the language pattern without exposing real project details.",
      "Use generic placeholders that still preserve the context.",
      "If a term only makes sense inside the team, explain it as a developer test build or internal label."
    ]
  },
  "concision": {
    "title": "Compress without losing meaning",
    "mistakes": [
      [
        "in a good structure way",
        "better-structured"
      ],
      [
        "english stuff",
        "the English"
      ],
      [
        "what we need to do",
        "next steps"
      ],
      [
        "doing some tests",
        "running tests"
      ]
    ],
    "examples": [
      [
        "I’m finishing the comments from the reviewer.",
        "I’m working through PR feedback."
      ],
      [
        "Make it more generic to avoid sensitive information.",
        "Make it generic to avoid exposing sensitive information."
      ],
      [
        "The first site was good.",
        "The first version was good."
      ]
    ],
    "tips": [
      "Keep the action, reason, and next step.",
      "Cut repeated context if the channel already has it.",
      "Concise does not mean cold; keep one warmth marker when needed."
    ]
  },
  "collocation": {
    "title": "Natural chunks",
    "mistakes": [
      [
        "make a second look",
        "take a second look"
      ],
      [
        "of this message",
        "at this message"
      ],
      [
        "lost the context",
        "lost the thread"
      ],
      [
        "jump in another call",
        "jump to another call"
      ]
    ],
    "examples": [
      [
        "Can you make a look?",
        "Could you take a look?"
      ],
      [
        "I lost the context.",
        "I lost the thread."
      ],
      [
        "I need to go in another meeting.",
        "I need to jump to another meeting."
      ]
    ],
    "tips": [
      "Learn useful workplace expressions as single units.",
      "If a phrase sounds understandable but odd, it is often a collocation issue.",
      "Collect chunks you can reuse under pressure."
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
        "How was your weekend? Good?",
        "How was your weekend?"
      ],
      [
        "Do you have plans?",
        "Any plans after work?"
      ]
    ],
    "examples": [
      [
        "Hi, how are you?",
        "Hey, how’s your day going?"
      ],
      [
        "Did you do something?",
        "Did you get up to anything fun?"
      ],
      [
        "The weather is good.",
        "The weather’s actually nice today."
      ]
    ],
    "tips": [
      "Open-ended questions create more room than yes/no questions.",
      "Tie the opener to the moment: day, weekend, meeting, environment.",
      "Keep it light; small talk is a bridge, not an interview."
    ]
  },
  "small_followup": {
    "title": "The second question is the connection",
    "mistakes": [
      [
        "Oh nice",
        "Oh nice — what was the best part?"
      ],
      [
        "Interesting",
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
        "That’s fun.",
        "That’s fun — what are you looking forward to most?"
      ],
      [
        "Cool.",
        "Cool — how did you find that place?"
      ],
      [
        "Good?",
        "What made it good?"
      ]
    ],
    "tips": [
      "Follow-up questions signal that you listened.",
      "Ask about one detail they already gave you.",
      "Avoid rapid-fire questions; one good follow-up is enough."
    ]
  },
  "small_work": {
    "title": "Work-safe everyday topics",
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
        "Do you have much job today?",
        "Do you have a busy day today?"
      ],
      [
        "What technology you use?",
        "What tools are you using?"
      ]
    ],
    "examples": [
      [
        "How is the task?",
        "How’s that task going?"
      ],
      [
        "You have holiday soon?",
        "Do you have any time off coming up?"
      ],
      [
        "You like remote work?",
        "How do you find working remotely?"
      ]
    ],
    "tips": [
      "Good workplace small talk is light, opt-in, and not too personal.",
      "Use shared context: sprint, tool, meeting, lunch, weekend.",
      "Avoid salary, politics, religion, age, and appearance."
    ]
  },
  "small_remote": {
    "title": "Remote-call microphrases",
    "mistakes": [
      [
        "You are muted",
        "I think you might be muted"
      ],
      [
        "Can you hear me good?",
        "Can you hear me okay?"
      ],
      [
        "Let’s wait people",
        "Let’s give everyone a minute to join"
      ],
      [
        "Your internet is bad",
        "Your connection seems unstable"
      ]
    ],
    "examples": [
      [
        "I will share screen.",
        "I’ll share my screen."
      ],
      [
        "I lost the context.",
        "I lost the thread for a second."
      ],
      [
        "I don't want interrupt.",
        "I don’t want to interrupt, but..."
      ]
    ],
    "tips": [
      "Remote language should reduce awkwardness, not create it.",
      "Use might/seems for issues that could embarrass someone.",
      "Keep meeting-host phrases short and predictable."
    ]
  },
  "small_compliment": {
    "title": "Specific appreciation",
    "mistakes": [
      [
        "Good job",
        "Nice work on the flow"
      ],
      [
        "It was useful",
        "That made things clearer"
      ],
      [
        "You did fast",
        "You turned that around quickly"
      ],
      [
        "Your presentation was good",
        "I liked how clear your presentation was"
      ]
    ],
    "examples": [
      [
        "I like your idea.",
        "I like that idea; it makes the next step clearer."
      ],
      [
        "Thanks, useful.",
        "Thanks — that really clarified the next step."
      ],
      [
        "Good meeting.",
        "Nice meeting — the exercise was useful."
      ]
    ],
    "tips": [
      "Specific praise sounds sincere.",
      "Praise the behavior or effect, not personal traits.",
      "Gratitude is a safe way to open warm small talk."
    ]
  },
  "small_exit": {
    "title": "Graceful exits",
    "mistakes": [
      [
        "I need go",
        "I need to jump to another call"
      ],
      [
        "Talk later",
        "Great talking with you — let’s catch up later"
      ],
      [
        "Let’s finish",
        "Shall we wrap here?"
      ],
      [
        "I will stop here",
        "I’ll let you get back to it"
      ]
    ],
    "examples": [
      [
        "That’s it.",
        "That’s all from me for now."
      ],
      [
        "I have nothing more.",
        "I don’t have anything else to add."
      ],
      [
        "Bye.",
        "I’ll let you get back to it — thanks again."
      ]
    ],
    "tips": [
      "A good exit has warmth plus a reason or handoff.",
      "In meetings, wrap is a friendly verb.",
      "Avoid disappearing from a chat after asking for help."
    ]
  },
  "small_share": {
    "title": "Small self-share",
    "mistakes": [
      [
        "My weekend was normal",
        "It was pretty low-key"
      ],
      [
        "I don't have interesting things",
        "Nothing too exciting, but..."
      ],
      [
        "I don't know this",
        "I haven’t tried that before"
      ],
      [
        "Weather is good",
        "I actually like this weather"
      ]
    ],
    "examples": [
      [
        "I did nothing.",
        "Nothing too exciting — I got some time to recharge."
      ],
      [
        "I don’t know that restaurant.",
        "I haven’t tried it yet — what do you like there?"
      ],
      [
        "Normal weekend.",
        "Pretty low-key, which was exactly what I needed."
      ]
    ],
    "tips": [
      "Small talk works best as a back-and-forth.",
      "Share one sentence, not a monologue.",
      "Then ask them a question connected to what you shared."
    ]
  },
  "nvc_observation": {
    "title": "Observation without judgment",
    "mistakes": [
      [
        "You’re unclear",
        "I’m having trouble understanding the expected outcome"
      ],
      [
        "This is wrong",
        "This doesn’t match the acceptance criteria"
      ],
      [
        "Nobody told me",
        "I didn’t see that update"
      ],
      [
        "You keep breaking it",
        "The latest change affects the flow"
      ]
    ],
    "examples": [
      [
        "You are defensive.",
        "I’m noticing we’re both explaining our side."
      ],
      [
        "This meeting was useless.",
        "I’m not sure we reached a clear decision."
      ],
      [
        "You missed the point.",
        "I think I may not have explained the goal clearly."
      ]
    ],
    "tips": [
      "Use what a camera could record.",
      "Avoid always/never unless you have literal data.",
      "Observation first reduces defensiveness."
    ]
  },
  "nvc_feelings": {
    "title": "Own the feeling",
    "mistakes": [
      [
        "You make me frustrated",
        "I feel frustrated"
      ],
      [
        "You make me wait",
        "I feel blocked"
      ],
      [
        "This is annoying",
        "I feel concerned"
      ],
      [
        "I feel like you ignored me",
        "I feel blocked when I don’t get a reply"
      ]
    ],
    "examples": [
      [
        "You made this hard.",
        "I’m feeling stuck with the current ambiguity."
      ],
      [
        "You are stressing me.",
        "I’m feeling pressure because the timeline is tight."
      ],
      [
        "I feel like this is wrong.",
        "I feel concerned about this option."
      ]
    ],
    "tips": [
      "I feel like often introduces a thought, not a feeling.",
      "Use simple feeling words: concerned, confused, blocked, frustrated.",
      "Feelings are useful when connected to needs."
    ]
  },
  "nvc_needs": {
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
        "I’m annoyed because you delayed it.",
        "I’m blocked because I need momentum."
      ],
      [
        "I can’t work like this.",
        "I need clearer acceptance criteria."
      ],
      [
        "This is urgent.",
        "I need release confidence today."
      ]
    ],
    "tips": [
      "Needs are not demands or strategies.",
      "Common work needs: clarity, ownership, support, predictability, focus, autonomy.",
      "When the need is visible, the request becomes easier to accept."
    ]
  },
  "nvc_request": {
    "title": "Concrete, doable requests",
    "mistakes": [
      [
        "Do it now",
        "Could you take it today?"
      ],
      [
        "Don’t be late",
        "Could you send an ETA by noon?"
      ],
      [
        "Tell me earlier",
        "Could we flag changes sooner next time?"
      ],
      [
        "Fix the communication",
        "Could we agree on the next checkpoint?"
      ]
    ],
    "examples": [
      [
        "Prioritize this.",
        "Could you prioritize this today, or suggest another owner?"
      ],
      [
        "Explain it better.",
        "Could you share one example of the final behavior?"
      ],
      [
        "Review this soon.",
        "Could you let me know a realistic review time?"
      ]
    ],
    "tips": [
      "Requests should be concrete, positive, and time-bounded when needed.",
      "Leave room for a no or alternative.",
      "A clear request is kinder than vague pressure."
    ]
  },
  "nvc_boundary": {
    "title": "Boundaries without blame",
    "mistakes": [
      [
        "This is not my problem",
        "I need clarity on ownership"
      ],
      [
        "Don’t assign me things",
        "Please check my capacity first"
      ],
      [
        "I can’t work like this",
        "I need clearer criteria before I continue"
      ],
      [
        "Stop adding tasks",
        "I can take this after the current priority is done"
      ]
    ],
    "examples": [
      [
        "I won’t do that.",
        "I can take this on after the current release work is complete."
      ],
      [
        "Ask someone else.",
        "I’m at capacity today; could we find another owner?"
      ],
      [
        "This is outside my scope.",
        "I can help clarify the issue, but I can’t own the implementation right now."
      ]
    ],
    "tips": [
      "A boundary protects capacity while keeping connection.",
      "State what you can do as well as what you cannot do.",
      "Boundaries are clearer when tied to priorities."
    ]
  },
  "nvc_repair": {
    "title": "Ego-safe repair lines",
    "mistakes": [
      [
        "You missed the point",
        "I may not have explained it clearly"
      ],
      [
        "I already said that",
        "Let me restate the key point"
      ],
      [
        "You read too fast",
        "What I meant was..."
      ],
      [
        "That’s not what I asked",
        "The current version solves a different problem"
      ]
    ],
    "examples": [
      [
        "You misunderstood me.",
        "I may not have been clear."
      ],
      [
        "You didn’t read it.",
        "Just to clarify, the main point is..."
      ],
      [
        "No, that’s wrong.",
        "I think we’re solving slightly different problems."
      ]
    ],
    "tips": [
      "Repair lines are especially useful in public channels.",
      "Assume misunderstanding before bad intent.",
      "Protecting someone’s ego often makes your correction easier to hear."
    ]
  }
};


export const scannerRules = [
  {
    id: "scan-have",
    label: "Possible have/has + base verb",
    test: /\b(i['’]?ve|we['’]?ve|you['’]?ve|they['’]?ve|have|has)\s+(apply|finish|make|do|change|start|push|deploy|check)\b/i,
    advice: "After have/has, test the past participle: applied, finished, made, done, pushed, deployed, checked.",
  },
  {
    id: "scan-does",
    label: "Possible does/will + wrong verb form",
    test: /\b(does|will)\b\s+\w+\s+\b(works|reminds|breaks|fails|changes)\b/i,
    advice: "After does or will, the main verb usually returns to the base form: work, remind, break, fail, change.",
  },
  {
    id: "scan-feedbacks",
    label: "Possible countability slip",
    test: /\b(feedbacks|informations|advices|this examples|commons talks)\b/i,
    advice: "Check countability and agreement: feedback, information, these examples, everyday small talk.",
  },
  {
    id: "scan-article",
    label: "Possible article gap",
    test: /\b(a\s+(example|area)|share screen|give me example)\b/i,
    advice: "Check a/an/the/my: an example, an area, share my screen, give me an example.",
  },
  {
    id: "scan-avoid",
    label: "Possible avoid + full clause",
    test: /\bavoid\b[^.!?]{0,70}\b(stays|fails|breaks|keeps|throws)\b/i,
    advice: "After avoid, try the -ing form: avoid the button staying, avoid the request failing, avoid the build breaking.",
  },
  {
    id: "scan-comma",
    label: "Possible comma bridge",
    test: /\b(is|are|was|were|ready|done|changed|applied|made)\b[^.!?]{0,90},\s+(i|it|we|they|nothing|the)\b/i,
    advice: "If both sides of the comma are complete sentences, use a period, semicolon, or connector.",
  },
  {
    id: "scan-filler",
    label: "Possible filler loop",
    test: /\b(kind of|you know|basically|just|making sure).{0,100}\b(kind of|you know|basically|just|making sure)\b/i,
    advice: "Remove repeated thinking words unless they intentionally change the tone.",
  },
  {
    id: "scan-tech-naming",
    label: "Possible tech naming/casing drift",
    test: /\b(local storage|sass|app\.scss|zip|react comp|succesfully|gramatically)\b/i,
    advice: "Scan exact technical names and spelling: localStorage, Sass, App.scss, ZIP, React components, successfully, grammatically.",
  },
  {
    id: "scan-collocation",
    label: "Possible natural-chunk slip",
    test: /\b(make a second look|second look of|take a look of|lost the context|jump in another call|apply it in)\b/i,
    advice: "Try the whole chunk: take a second look at, take a look at, lost the thread, jump to another call, apply it to.",
  },
  {
    id: "scan-sensitive-url",
    label: "Possible sensitive example data",
    test: /\b[a-z0-9.-]+\.(info|internal|corp|local|dev|staging)\b/i,
    advice: "Replace real domains or internal hosts with generic placeholders such as staging preview, review branch, customer account, or developer test build.",
  },
  {
    id: "scan-internal-label",
    label: "Possible internal label in a public example",
    test: /\b(internal codename|private channel|customer name|real domain|internal label)\b/i,
    advice: "If the example is public or reusable, replace internal labels with generic wording that preserves the learning context.",
  },
  {
    id: "scan-small-talk-closed",
    label: "Small talk may be too closed",
    test: /\b(are you busy\?|you like this|it was good\?|so you like it\?|do you recommend\?)\b/i,
    advice: "Use an open-ended small-talk question: How’s your week looking? What do you enjoy most about it? Would you recommend it?",
  },
  {
    id: "scan-small-talk-followup",
    label: "Possible missing follow-up",
    test: /^(oh nice|interesting|cool|good)\.?$/i,
    advice: "Add one curious follow-up: Oh nice — what was the best part? Interesting — how did you get into that?",
  },
  {
    id: "scan-remote-call",
    label: "Remote-call phrase can be softer",
    test: /\b(you are muted|your internet is bad|let'?s wait people|can you hear me good|i will share screen)\b/i,
    advice: "Use warmer remote-call chunks: I think you might be muted; your connection seems unstable; I’ll share my screen.",
  },
  {
    id: "scan-nvc-blame",
    label: "Possible blame/judgment wording",
    test: /\b(you always|you never|you are not clear|this is wrong|that'?s a bad idea|you missed the point|you are defensive)\b/i,
    advice: "Try NVC order: observation → feeling/concern → need → concrete request.",
  },
  {
    id: "scan-nvc-demand",
    label: "Possible demand instead of request",
    test: /\b(do it now|stop changing|don'?t assign|you should have told|fix the communication|review this soon)\b/i,
    advice: "Turn pressure into a specific request with room for an alternative: Could you take it today, or suggest another owner?",
  },
  {
    id: "scan-nvc-feeling",
    label: "Possible feeling mixed with judgment",
    test: /\bi feel (like|that)\b/i,
    advice: "After I feel, use an emotion word: concerned, confused, blocked, frustrated. Then name the need.",
  },
];
