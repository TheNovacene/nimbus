// nimbusModel.js
// Nimbus v2 — the mocked reading of one provision's architecture.
//
// Everything in this file is MOCKED. There is no telemetry source wired yet;
// Flare is the plausible emitter, but that wiring is deliberately not invented
// here. Treat this module as the shape a real feed would have to fill.
//
// The design rule, non-negotiable: Nimbus monitors the institution, never the
// child. Every entry below describes a system, a connection, or an adult's
// accountability. A learner appears only as the subject of an institutional
// duty — never as a scored interior.

/** State colours. */
export const C = {
  ok: "oklch(0.55 0.09 170)",
  warn: "oklch(0.62 0.11 80)",
  alert: "oklch(0.5 0.14 30)",
  obscured: "oklch(0.28 0.05 300)",
};

/** The six field-states of The Weather of Knowing. */
export const W = {
  grounded: { name: "Grounded", lake: "Shoreline", color: "oklch(0.55 0.09 170)" },
  layered: { name: "Layered", lake: "Channels", color: "oklch(0.55 0.09 250)" },
  emergent: { name: "Emergent", lake: "Confluence", color: "oklch(0.55 0.11 310)" },
  fractured: { name: "Fractured", lake: "Storm", color: "oklch(0.55 0.14 30)" },
  liminal: { name: "Liminal", lake: "Mist", color: "oklch(0.75 0.04 90)" },
  obscured: { name: "Obscured", lake: "Depths", color: "oklch(0.28 0.05 300)" },
};

/** Event tones, as they read on the ink panel. */
export const TONE = {
  ok: "oklch(0.75 0.09 170)",
  warn: "oklch(0.8 0.11 85)",
  alert: "oklch(0.72 0.14 30)",
};

const STATES = {
  holding: { stateLabel: "Holding", color: C.ok },
  ageing: { stateLabel: "Duty ageing", color: C.warn },
  attention: { stateLabel: "Attention", color: C.alert },
  drifting: { stateLabel: "Drifting", color: C.alert },
};

/** The heartbeat. Rotates; prepends one event every four seconds. */
export const BEATS = [
  ["flare.seal.check", "X1 · no route around the gate — holding", "ok"],
  [
    "record.append",
    "classroom → the record via the non-return valve — data in, nothing back",
    "ok",
  ],
  ["flare.valve.audit", "S2 · role-based condition verified at the corridor", "ok"],
  ["consent.ledger.append", "a consent review logged at the site office", "ok"],
  ["flare.seal.check", "X2 · partners never reach the record — holding", "ok"],
];

export const STARTING_EVIDENCE = 41203;

/**
 * Build the whole reading for a scenario.
 * @param {boolean} demo true for "Demo morning", false for "All clear".
 */
export function buildModel(demo) {
  const mk = (o, stateKey) => ({ ...o, ...STATES[demo ? stateKey : "holding"] });

  const floor1 = [
    mk(
      {
        kind: "ROOM · FIRST FLOOR",
        name: "Safeguarding office",
        sub: "THE AUDIT TRAIL",
        caption: "A record of care, not surveillance.",
        who: "the DSL",
        detail: demo
          ? "The audit tray fell silent between 02:10 and 02:44 while the learning platform stayed active. Silence in a write-only record is itself a signal — this is the Obscured state: knowing that is being structurally hidden."
          : "Write-only telemetry arriving continuously; the one-way valve confirmed on every append.",
      },
      "attention",
    ),
    mk(
      {
        kind: "ROOM · FIRST FLOOR",
        name: "The key cabinet",
        sub: "STAFF PERMISSIONS",
        caption: "Granted, reviewed, removed.",
        who: "the site office",
        detail: demo
          ? "One commissioner data-sharing agreement is 97 days since review against a 90-day duty. Nothing is broken yet — that is the point of saying so now."
          : "All permissions inside their review windows.",
      },
      "ageing",
    ),
    mk(
      {
        kind: "ROOM · FIRST FLOOR",
        name: "Site office",
        sub: "GOVERNANCE",
        caption: "The certificate is not the vision.",
        who: "the site office",
        detail:
          "Governance registers current: ISO/IEC 27001 · 42001, Cyber Essentials, KCSIE 2026, UK GDPR. Evidence flows from here to the periodic judgement.",
      },
      "holding",
    ),
  ];

  const floor0 = [
    mk(
      {
        kind: "ROOM · GROUND FLOOR",
        name: "Reception",
        sub: "SINGLE SIGN-ON",
        caption: "Every visitor signs the book.",
        who: "the site office",
        detail:
          "S1 identity run holding — authenticated, every time. Third parties admitted through the book only.",
      },
      "holding",
    ),
    mk(
      {
        kind: "ROOM · GROUND FLOOR",
        name: "Classroom",
        sub: "THE LEARNING PLATFORM",
        caption: "Qualified teachers. Real lessons.",
        who: "the DSL",
        detail: demo
          ? "The AI touchpoint at the classroom door is identified, signed in like any visitor, and audited. This morning a route was observed from that touchpoint towards the record — see seal X3."
          : "AI touchpoint admitted, identified and audited; reads the lesson, never the file.",
      },
      demo ? "attention" : "holding",
    ),
    mk(
      {
        kind: "ROOM · GROUND FLOOR",
        name: "Device store",
        sub: "MANAGED & PERSONAL DEVICES",
        caption: "Every door into the room, known.",
        who: "the site office",
        detail: "All enrolled devices reporting; no unknown door into the room.",
      },
      "holding",
    ),
  ];

  const gate = mk(
    {
      kind: "THE APPROACH",
      name: "Front gate",
      sub: "AUTHENTICATION",
      caption: "Many entrances, one auditable boundary.",
      who: "the site office",
      detail:
        "Learners & staff, families, commissioners and AP partners all arrive here. 4,112 probes since midnight; no route observed around the gate.",
    },
    "holding",
  );

  const s7 = mk(
    {
      kind: "S7 · EXTERNAL INSPECTION",
      name: "Inspection chamber",
      sub: "OUTSIDE THE BOUNDARY",
      caption: "Cannot be locked from inside the site office.",
      who: "the site office — today",
      detail: demo
        ? "The chamber refused a scheduled external test at 06:00. A door that can be locked from inside is a drawing violation, whatever the intention. Nimbus raises it before an inspector finds it."
        : "External test passed; the chamber opens from beyond the boundary.",
    },
    "attention",
  );

  const leavers = mk(
    {
      kind: "THE LEAVERS’ DOOR",
      name: "Leavers’ door",
      sub: "OFFBOARDING",
      caption: "What happens when the learner leaves.",
      who: "the key-cabinet holder",
      detail: demo
        ? "One offboarding open at day 14: scheduled retention has begun but two permissions are still live. The learner appears here only as the subject of an institutional duty — no more."
        : "No offboarding open; scheduled retention and deletion on time.",
    },
    "ageing",
  );

  const seals = [
    mk(
      {
        kind: "SEAL",
        id: "X1",
        name: "Seal X1",
        reads: "no route around the gate",
        caption: "The perimeter has no side door.",
        who: "the site office",
        detail:
          "Probed continuously by Flare boundary checks. Holding — no route observed around the gate this term.",
      },
      "holding",
    ),
    mk(
      {
        kind: "SEAL",
        id: "X2",
        name: "Seal X2",
        reads: "partners never reach the record",
        caption: "Partners share the learner, not the safeguarding file.",
        who: "the DSL",
        detail:
          "Holding. Every partner session is admitted at reception and never routes past the record’s non-return valve.",
      },
      "holding",
    ),
    mk(
      {
        kind: "SEAL",
        id: "X3",
        name: "Seal X3",
        reads: "AI reads the lesson, never the file",
        caption:
          "KCSIE 2026 places harmful generative AI in the contact-risk category; this seal is the architectural response.",
        who: "the DSL, with the site office",
        detail: demo
          ? "Drifting: at 09:12 a route was observed from the classroom AI touchpoint towards the record. The drawing says this connection does not exist. A seal that quietly acquires a route around it is the pre-incident signal — confirm, re-seal, and record the decision."
          : "Holding. The AI touchpoint reads the lesson, never the file.",
      },
      demo ? "drifting" : "holding",
    ),
  ];

  const duties = demo
    ? [
        {
          tag: "SEAL DRIFT",
          color: C.alert,
          title: "X3 is drifting",
          body: "A route was observed from the classroom AI touchpoint towards the record. The drawing says this connection does not exist. Confirm, re-seal, record the decision.",
          who: "the DSL, with the site office",
        },
        {
          tag: "OBSCURED",
          color: C.obscured,
          title: "The audit tray went quiet",
          body: "Silent 02:10–02:44 while the platform stayed active. Silence in a write-only record is itself a signal — something is being structurally hidden, or a valve has failed.",
          who: "the DSL",
        },
        {
          tag: "S7",
          color: C.alert,
          title: "The inspection chamber refused a test",
          body: "The 06:00 external probe failed. The chamber must never be lockable from inside the site office. Fix before an inspector finds it locked.",
          who: "the site office — today",
        },
        {
          tag: "CONSENT",
          color: C.warn,
          title: "A consent is ageing",
          body: "The commissioner data-sharing agreement is 97 days since review; the duty is 90. Review it or record why not.",
          who: "the site office",
        },
        {
          tag: "OFFBOARDING",
          color: C.warn,
          title: "The leavers’ door is ajar",
          body: "One offboarding open at day 14; two permissions still live in the key cabinet. Close the door properly.",
          who: "the key-cabinet holder",
        },
      ]
    : [];

  const baseEvents = demo
    ? [
        {
          t: "09:14",
          k: "flare.seal.check",
          txt: "X1 · no route around the gate — holding · 4,112 probes since midnight",
          tone: "ok",
        },
        {
          t: "09:12",
          k: "route.observed",
          txt: "classroom AI touchpoint → the record — not in the drawing · seal X3 raised",
          tone: "alert",
        },
        {
          t: "09:09",
          k: "telemetry.silence",
          txt: "audit tray silent 02:10–02:44 while the platform stayed active — raised as Obscured",
          tone: "alert",
        },
        {
          t: "08:57",
          k: "consent.review.elapsed",
          txt: "commissioner data-sharing agreement · 97 days since review · duty is 90",
          tone: "warn",
        },
        {
          t: "08:31",
          k: "offboarding.incomplete",
          txt: "leavers’ door · one offboarding open at day 14 · two permissions still live",
          tone: "warn",
        },
        {
          t: "06:00",
          k: "s7.access.probe",
          txt: "inspection chamber refused an external test — must never lock from inside",
          tone: "alert",
        },
      ]
    : [
        { t: "09:14", k: "flare.seal.check", txt: "X1, X2, X3 — all holding", tone: "ok" },
        {
          t: "08:40",
          k: "consent.ledger.append",
          txt: "all consents inside their review windows",
          tone: "ok",
        },
      ];

  const field = demo ? W.layered : W.grounded;
  const fieldDesc = demo
    ? "Structured complexity, still tractable — with an Obscured pocket at the audit tray."
    : "Stable, repeatable, shareable — low symbolic charge.";

  const estate = [
    {
      name: "This provision",
      note: "OAP-001/002 stood up · instrumented",
      color: field.color,
      opacity: 1,
    },
    {
      name: "AP partner — north",
      note: "shares the learner, never the record (X2)",
      color: "#c9c2d8",
      opacity: 0.65,
    },
    {
      name: "AP partner — riverside",
      note: "awaiting its drawings",
      color: "#c9c2d8",
      opacity: 0.65,
    },
    {
      name: "Platform supplier",
      note: "perimeter contact only · S1 identity",
      color: "#c9c2d8",
      opacity: 0.65,
    },
  ];

  const sealStats = [
    { id: "X1", reads: "no route around the gate", stat: "100% holding", color: C.ok },
    {
      id: "X2",
      reads: "partners never reach the record",
      stat: "100% holding",
      color: C.ok,
    },
    {
      id: "X3",
      reads: "AI reads the lesson, never the file",
      stat: demo ? "1 drift event · open" : "100% holding",
      color: demo ? C.alert : C.ok,
    },
    {
      id: "S7",
      reads: "chamber opens from outside",
      stat: demo ? "1 failed probe · open" : "all probes passed",
      color: demo ? C.alert : C.ok,
    },
  ];

  return {
    floor1,
    floor0,
    gate,
    s7,
    leavers,
    seals,
    duties,
    baseEvents,
    field,
    fieldDesc,
    estate,
    sealStats,
  };
}

/** Twelve-week field weather, as the board reads the season. */
export const BOARD_WEEKS = [
  "grounded",
  "grounded",
  "layered",
  "fractured",
  "layered",
  "grounded",
  "grounded",
  "layered",
  "grounded",
  "grounded",
  "layered",
  "obscured",
].map((k, i) => ({ label: "W" + (i + 1), color: W[k].color, name: W[k].name }));

export const BUNDLES = [
  { name: "OAP-002 Rev B — as-built attestation", meta: "signed 08.26" },
  { name: "Seals schedule — 90-day attestations X1–X3", meta: "current" },
  { name: "S7 chamber access log", meta: "write-only" },
  { name: "Judgement history & evidence index", meta: "41,203 entries" },
  { name: "Consent review ledger", meta: "1 ageing" },
];

export const ACCESS_LOG = [
  {
    when: "08 Aug 2026 · 06:00",
    what: "scheduled external probe — refused · raised to the site office",
  },
  { when: "14 Jul 2026", what: "periodic review access — 3h 12m · judgement given" },
  { when: "02 Jun 2026", what: "commissioner spot check — read-only" },
];
