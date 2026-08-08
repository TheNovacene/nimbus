# Nimbus — the live weather of a digital school

Live at **[thenovacene.github.io/nimbus](https://thenovacene.github.io/nimbus/)**

Nimbus is the live instrument reading of one provision's architecture. It is an
instrumented overlay on the **Open Provision Drawings** — OAP-001 *The Digital
Premises* and OAP-002 *The Services Layer* — where the rooms and seals of the
drawings are the primitives, and the six field-states of *The Weather of Knowing*
describe the overall field.

If it is not drawn, it does not flow; if it flows anyway, Nimbus says so.

> **Nimbus monitors the institution, never the child.**
>
> Every tile describes a system, a connection, or an adult's accountability. A
> learner appears only as the subject of an institutional duty — *"one
> offboarding open at day 14"* — never as a scored interior. The purpose of an
> audit trail is not to watch the child more closely; it is to make the adults
> and systems around that child more accountable. Any tile that could be read as
> *"how is this child doing"* is the wrong tile.

## Continuous evidence · periodic judgement

A live dashboard yields **evidence**, not a certificate. Nimbus shows evidence
flowing continuously and a dated, periodic judgement given against it. The
interface never implies a live certified status, because there is no such thing.

## The three doors

| Door | Who it is for | What it shows |
| --- | --- | --- |
| **DSL** | the designated safeguarding lead | the plan, live — rooms, seals, this morning's duties, the write-only record, the estate |
| **Board** | trustees and governors | twelve weeks of field weather, seal integrity for the term, the standing judgement |
| **Inspector · S7** | external inspection, from beyond the boundary | evidence bundles and the chamber access log — a door that cannot be locked from inside |

A fourth view, **MAT**, sits at trust altitude: six schools of a fictional
multi-academy trust on real Greater Manchester geography. A dot there is a
provision's whole field, never an aggregate of children. It is a plain page under
`public/nimbus-mat.html`, because live tile maps need ordinary script loading.

## Field-states

Grounded (Shoreline) · Layered (Channels) · Emergent (Confluence) · Fractured
(Storm) · Liminal (Mist) · **Obscured (Depths)**.

Obscured is the novel alerting primitive: *something here is being structurally
hidden.* It is the state that precedes most safeguarding failures, and the reason
a silent audit tray raises an alert rather than passing unnoticed.

## Status: prototype — all telemetry is mocked

There is **no telemetry source wired**. Everything in `src/nimbusModel.js` is
invented to demonstrate the reading; the heartbeat is a four-second timer. Flare
is the plausible emitter for a real feed, but that wiring is deliberately not
invented here — treat the model module as the shape a real source would have to
fill. The two prototype scenarios (*Demo morning* and *All clear*) and the
telemetry pause are exposed at the foot of the page and labelled as such.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173/nimbus/
npm run build    # outputs to dist/, published by .github/workflows/pages.yml
```

Built with **Vite + React + Tailwind + Framer Motion**.

- `src/NimbusApp.jsx` — the interface, three doors
- `src/nimbusModel.js` — the mocked reading, and the only place data lives
- `public/nimbus-mat.html` — the MAT view (Leaflet + OpenStreetMap)

## Credits

Developed by **Kirstin Stevens** under *The Novacene Ltd*.
Conceptual framework: *Verse-ality — a Symbolic Operating System for Relational
Intelligence*.

> "Ethics as geometry • Coherence as currency • Consent as protocol."

## Licence and trade marks

Code: [AGPL-3.0-only](./LICENSE) · Content: [CC BY-NC-SA 4.0](./LICENSE-CONTENT) ·
Commercial licence available — contact The Novacene at legal@thenovacene.com
(see [COMMERCIAL-LICENCE.md](./COMMERCIAL-LICENCE.md)).

Nimbus reuses the **room and seal vocabulary** of OAP-001/002 with attribution.
CC BY 4.0 applies to those drawings only — no part of Nimbus is CC BY 4.0.

Verse-ality® is a registered UK trade mark of The Novacene Ltd
(UK00004381891, classes 9, 41 and 42). "Verse-ality Certified" takes ™.
CC licences grant no trade mark rights.

© 2025–2026 Kirstin Stevens · The Novacene Ltd
