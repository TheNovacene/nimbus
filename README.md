# Nimbus

![Version](https://img.shields.io/badge/version-v2-8A4FBE)
![Status](https://img.shields.io/badge/status-prototype%20%C2%B7%20telemetry%20mocked-1D1A2E)
![Doors](https://img.shields.io/badge/doors-DSL%20%C2%B7%20Board%20%C2%B7%20Inspector%20S7%20%C2%B7%20MAT-1D1A2E)
![Design rule](https://img.shields.io/badge/design%20rule-monitors%20the%20institution%2C%20never%20the%20child-8A4FBE)
![GitHub last commit](https://img.shields.io/github/last-commit/TheNovacene/nimbus)

[![Live](https://img.shields.io/badge/live-thenovacene.github.io%2Fnimbus-8A4FBE)](https://thenovacene.github.io/nimbus/)
[![Drawn on](https://img.shields.io/badge/drawn%20on-Open%20Provision%20Drawings%20OAP--001%20%C2%B7%20OAP--002-1D1A2E)](https://github.com/TheNovacene/open-provision-drawings)
[![Licence: code AGPL-3.0-only](https://img.shields.io/badge/code-AGPL--3.0--only-1D1A2E)](LICENSE)
[![Licence: content CC BY-NC-SA 4.0](https://img.shields.io/badge/content-CC%20BY--NC--SA%204.0-1D1A2E)](LICENSE-CONTENT)
[![Commercial licence](https://img.shields.io/badge/commercial%20licence-available-8A4FBE)](COMMERCIAL-LICENCE.md)

[![KCSIE 2026: contact risk](https://img.shields.io/badge/KCSIE%202026-generative%20AI%20as%20contact%20risk-8A4FBE)](#the-seals-are-live-propositions)
[![Field-states](https://img.shields.io/badge/field--states-The%20Weather%20of%20Knowing-1D1A2E)](https://glyphonics.com/weather-of-knowing.html)
[![Trade mark](https://img.shields.io/badge/Verse--ality%C2%AE-UK00004381891-1D1A2E)](https://trademarks.ipo.gov.uk/ipo-tmcase/page/Results/1/UK00004381891)

> **The live weather of a digital school.**
> An instrumented overlay on the [Open Provision Drawings](https://github.com/TheNovacene/open-provision-drawings):
> the same premises, read in the present tense. If it is not drawn, it does not flow —
> and if it flows anyway, Nimbus says so.

🌤️ **[Open the instrument](https://thenovacene.github.io/nimbus/)** ·
🏫 **[MAT view](https://thenovacene.github.io/nimbus/nimbus-mat.html)** ·
📐 **[The drawings it reads](https://github.com/TheNovacene/open-provision-drawings)** ·
🔒 **[The design rule](#the-design-rule)**

By **Kirstin Stevens** · [The Novacene Ltd](https://thenovacene.com)

---

## Contents

- [The design rule](#the-design-rule)
- [What Nimbus is](#what-nimbus-is)
- [The three doors](#the-three-doors)
- [The seals are live propositions](#the-seals-are-live-propositions)
- [The six field-states](#the-six-field-states)
- [Continuous evidence, periodic judgement](#continuous-evidence-periodic-judgement)
- [Status: prototype, telemetry mocked](#status-prototype-telemetry-mocked)
- [Running it](#running-it)
- [What is in this repository](#what-is-in-this-repository)
- [Citing this work](#citing-this-work)
- [Related work](#related-work)
- [Licence and trade marks](#licence-and-trade-marks)

---

## The design rule

> **Nimbus monitors the institution, never the child.**

Every tile describes a system, a connection, or an adult's accountability. A learner
appears only as the subject of an institutional duty — *"one offboarding open at day
14"* — never as a scored interior. The purpose of an audit trail is not to watch the
child more closely; it is to make the adults and systems around that child more
accountable.

If a proposed tile could be read as *"how is this child doing"*, it is the wrong tile.
This is not a preference. A product that renders children's inner states as a live
field would invert the framework it serves, and would be indefensible under the ICO
Children's Code.

## What Nimbus is

The programme has an argument, an auditable control set, runtime enforcement, a
lawful inference architecture, and a set of drawings that make all of it legible.
What it did not have was anything **observable**. Auditability is retrospective by
construction. Nimbus is present-tense.

It takes the rooms and seals of OAP-001/002 as its primitives and asks, continuously,
whether the building is still behaving like its drawing:

- **Rooms** are the parts of the provision — reception as single sign-on, the key
  cabinet as permissions, the safeguarding office as the audit trail.
- **Flows** are the drawn connections between them.
- **Seals** mark what is designed *not* to connect — and in Nimbus a seal becomes a
  live proposition. *Is X3 still holding?*

A seal that has quietly acquired a route around it is the signal that precedes the
incident. That is the whole thesis of the instrument.

## The three doors

| Door | Who it is for | What it shows |
|---|---|---|
| **DSL** | the designated safeguarding lead | the plan read live — rooms, seals, the duties falling due this morning, and the write-only record |
| **Board** | trustees and governors | twelve weeks of field weather, seal integrity for the term, and the standing judgement |
| **Inspector · S7** | external inspection, from beyond the boundary | evidence bundles and the chamber access log — a door that cannot be locked from inside |

A fourth view sits at trust altitude. **[MAT](https://thenovacene.github.io/nimbus/nimbus-mat.html)**
shows six schools of a multi-academy trust as one estate; a dot is a provision's whole
field, never an aggregate of children. The rule does not relax because the altitude
changed.

## The seals are live propositions

| Seal | Reads | What Nimbus watches for |
|---|---|---|
| **X1** | No route around the gate | a side door appearing in a perimeter that is supposed not to have one |
| **X2** | Partners never reach the record | an alternative-provision session routing past the record's non-return valve |
| **X3** | AI reads the lesson, never the file | a route from the classroom AI touchpoint towards the child's record |

X3 is the architectural response to **KCSIE 2026** placing harmful generative AI within
the **contact risk** category. The AI touchpoint is admitted like any visitor —
identified, signed in, audited — and structurally cannot reach the record. Nimbus
raises the drift before an inspector finds it.

**S7**, the external inspection chamber, is probed on a schedule: a door that can be
locked from the inside is a drawing violation whatever the intention.

## The six field-states

Nimbus reads the overall field using the six weathers of
**[The Weather of Knowing](https://glyphonics.com/weather-of-knowing.html)** —
Grounded (Shoreline), Layered (Channels), Emergent (Confluence), Fractured (Storm),
Liminal (Mist) and **Obscured (Depths)**.

Obscured is the alerting primitive the others cannot supply: *something here is being
structurally hidden.* A write-only audit tray that falls silent while the platform
stays active is not quiet — it is the state that precedes most safeguarding failures.

## Continuous evidence, periodic judgement

A live dashboard yields **evidence**, not a certificate. The interface says so on
every screen: evidence flows continuously; the judgement against it is dated and
periodic. Nimbus never implies a live certified status, because there is no such
thing.

"Verse-ality Certified" takes ™.

## Status: prototype, telemetry mocked

**No telemetry source is wired.** Everything in
[`src/nimbusModel.js`](src/nimbusModel.js) is invented to demonstrate the reading, and
the heartbeat is a four-second timer. Treat that module as the shape a real feed would
have to fill; [Flare](https://github.com/TheNovacene/flare-boundary-engine) is the
plausible emitter, but that wiring is deliberately not invented here.

Two scenarios (*Demo morning* and *All clear*) and a telemetry pause are exposed at
the foot of the page, labelled as prototype controls.

School names in the MAT view are fictional.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173/nimbus/
npm run build    # writes docs/, which is what GitHub Pages serves for this repo
```

Vite + React + Tailwind + Framer Motion. Fraunces and Inter, the same pairing as the
OAP plates.

## What is in this repository

```
src/NimbusApp.jsx     the interface — three doors, rooms, seals, record, estate
src/nimbusModel.js    the mocked reading; the only place data lives
public/nimbus-mat.html  the MAT view (Leaflet + OpenStreetMap)
docs/                 the built site — GitHub Pages serves this folder
```

## Citing this work

> Stevens, K. & The Novacene Ltd (2026). *Nimbus: The Live Weather of a Digital
> School — An Instrumented Overlay on the Open Provision Drawings.*
> https://github.com/TheNovacene/nimbus

GitHub's **Cite this repository** button reads [CITATION.cff](CITATION.cff) and will
give you BibTeX or APA.

## Related work

Nimbus is the observable layer of the Verse-ality research programme on school-grade
safety for AI systems. It is meaningless without the drawings it reads:

- **[Open Provision Drawings](https://github.com/TheNovacene/open-provision-drawings)** —
  OAP-001 *The Digital Premises* and OAP-002 *The Services Layer*, the CC BY 4.0
  convention whose rooms and seals Nimbus instruments. Companion paper: Stevens, K. &
  The Novacene Ltd (2026). *Relational Zero-Trust: Re-erecting the Premises at the
  Accountability Layer.* Zenodo. https://doi.org/10.5281/zenodo.21846221
- **[Flare](https://github.com/TheNovacene/flare-boundary-engine)** — the boundary
  engine that would enforce at runtime what Nimbus observes. Stevens, K., Eve, ¹¹. &
  The Novacene (2025). *Flare: A Boundary Engine for Relational AI.* Zenodo.
  https://doi.org/10.5281/zenodo.17855976
- Stevens, K., Phillips, M. & The Novacene Ltd (2026). *Schools are becoming critical
  infrastructure: A school-grade safety model for autonomous AI agents.* Zenodo.
  https://doi.org/10.5281/zenodo.21481347
- Stevens, K. & The Novacene Ltd (2026). *GRC Engineering for the Relational Layer: A
  Verified Control Set and Evidence Engine for Child-Facing AI.* Zenodo.
  https://doi.org/10.5281/zenodo.21481520
- Stevens, K. & The Novacene Ltd (2026). *Bounded Inference at the Edge: A Compliance
  Architecture for Distributed AI Inference under the EU AI Act, the UK Online Safety
  Act 2023, and the NIST AI Risk Management Framework.* Zenodo.
  https://doi.org/10.5281/zenodo.21481256
- Stevens, K., Eve, ¹¹. & The Novacene (2025). *The Realms of Knowing: A Field-Based
  Framework for Epistemic Weather in Human and Hybrid Systems.* Zenodo.
  https://doi.org/10.5281/zenodo.17685811 — the source of the six field-states.

Read together: the programme argues that schools are critical infrastructure; the
control set makes the argument auditable; Flare makes it enforceable at runtime; the
bounded-inference architecture makes it lawful; the drawings make it legible — and
Nimbus makes it visible while there is still time to act.

> "Ethics as geometry • Coherence as currency • Consent as protocol."

## Licence and trade marks

Code: **AGPL-3.0-only** — see [LICENSE](LICENSE).
Content: **CC BY-NC-SA 4.0** — see [LICENSE-CONTENT](LICENSE-CONTENT).
Commercial licence available — see [COMMERCIAL-LICENCE.md](COMMERCIAL-LICENCE.md) or
contact The Novacene at legal@thenovacene.com.

Nimbus reuses the **room and seal vocabulary** of OAP-001/002 with attribution. CC BY
4.0 applies to those drawings only; no part of Nimbus is CC BY 4.0.

**Verse-ality®** is a registered trade mark in the United Kingdom
([UK00004381891](https://trademarks.ipo.gov.uk/ipo-tmcase/page/Results/1/UK00004381891)),
classes 9, 41 and 42, in the name of The Novacene Ltd. "Verse-ality Certified™" and
"Eve¹¹™" are further marks of The Novacene Ltd. CC licences license copyright only;
they grant no rights in trade marks.

© 2025–2026 Kirstin Stevens · The Novacene Ltd
