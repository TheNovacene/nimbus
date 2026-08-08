// NimbusApp.jsx
// Nimbus v2 — the live weather of a digital school.
//
// Nimbus is an instrumented overlay on the Open Provision Drawings
// (OAP-001 The Digital Premises, OAP-002 The Services Layer). Rooms and seals
// from the drawings are the primitives; the six Weather of Knowing field-states
// describe the overall field.
//
// The design rule, non-negotiable: Nimbus monitors the institution, never the
// child. Every tile describes a system, a connection, or an adult's
// accountability. If a tile could be read as "how is this child doing", it is
// the wrong tile.
//
// All telemetry here is mocked — see nimbusModel.js.

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ACCESS_LOG,
  BEATS,
  BOARD_WEEKS,
  BUNDLES,
  STARTING_EVIDENCE,
  TONE,
  W,
  buildModel,
} from "./nimbusModel.js";

/* ------------------------------------------------------------------ *
 * Small shared pieces
 * ------------------------------------------------------------------ */

function Dot({ color, size = 7, className = "" }) {
  return (
    <span
      className={`inline-block shrink-0 rounded-full ${className}`}
      style={{ width: size, height: size, background: color }}
    />
  );
}

function StateRow({ color, label, size = 7, text = "text-[10.5px]" }) {
  return (
    <div className="mt-2 flex items-center gap-[5px]">
      <Dot color={color} size={size} />
      <span className={`${text} font-semibold`}>{label}</span>
    </div>
  );
}

function Kicker({ children, className = "" }) {
  return (
    <span
      className={`text-[10.5px] font-bold tracking-[2px] text-violet ${className}`}
    >
      {children}
    </span>
  );
}

function Panel({ children, className = "" }) {
  return (
    <div className={`border-[1.5px] border-ink bg-white p-4 ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * The plan — rooms, flanks and seals
 * ------------------------------------------------------------------ */

function FlankCard({ item, dashed = false, label, sub, onSelect, labelInk = false }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`w-full cursor-pointer border-[1.5px] ${
        dashed ? "border-dashed" : "border-solid"
      } border-ink bg-paper p-[10px] text-left`}
    >
      <div
        className={`text-[9.5px] font-bold tracking-[1.2px] ${
          labelInk ? "text-ink" : "text-violet"
        }`}
      >
        {label}
      </div>
      <div className="mt-[2px] text-[10px] italic text-muted">{sub}</div>
      <div className="mt-[6px] flex items-center gap-[5px]">
        <Dot color={item.color} />
        <span className="text-[10px] font-semibold">{item.stateLabel}</span>
      </div>
    </button>
  );
}

function RoomCard({ room, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(room)}
      className="cursor-pointer border-[1.5px] border-ink bg-white p-3 text-left"
    >
      <div className="text-[9px] font-bold tracking-[1.2px] text-violet">
        {room.sub}
      </div>
      <div className="mt-[3px] font-display text-[16px] font-semibold">
        {room.name}
      </div>
      <div className="mt-[3px] text-[10.5px] italic text-muted">{room.caption}</div>
      <StateRow color={room.color} label={room.stateLabel} />
    </button>
  );
}

function SealCard({ seal, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(seal)}
      className="flex cursor-pointer items-start gap-[10px] border-[1.5px] border-ink bg-white px-3 py-[10px] text-left"
    >
      <span className="nimbus-hatch mt-[2px] h-4 w-[18px] shrink-0 border-[1.5px] border-ink" />
      <div>
        <div className="text-[11px] font-bold">
          {seal.id}{" "}
          <span className="font-normal italic text-muted">— {seal.reads}</span>
        </div>
        <div className="mt-[5px] flex items-center gap-[5px]">
          <Dot color={seal.color} />
          <span className="text-[10.5px] font-semibold">{seal.stateLabel}</span>
        </div>
      </div>
    </button>
  );
}

function DetailPanel({ sel, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
      className="mt-4 border-2 border-violet bg-white p-4"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[9.5px] font-bold tracking-[2px] text-violet">
          {sel.kind}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer border-none bg-transparent text-[11px] font-semibold text-muted"
        >
          close ✕
        </button>
      </div>
      <div className="mt-1 font-display text-[20px] font-semibold">{sel.name}</div>
      <div className="mt-[2px] text-[12px] italic text-muted">{sel.caption}</div>
      <div className="mt-[10px] flex items-center gap-[6px]">
        <Dot color={sel.color} size={8} />
        <span className="text-[12px] font-bold">{sel.stateLabel}</span>
      </div>
      <p className="mt-[10px] text-[13px] leading-[1.55]">{sel.detail}</p>
      <div className="mt-2 text-[11px] font-semibold text-violet">
        Who acts: {sel.who}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Door 1 — DSL
 * ------------------------------------------------------------------ */

function DslDoor({ model, sel, onSelect, onClose, events }) {
  const { field, fieldDesc, floor1, floor0, gate, s7, leavers, seals, duties, estate } =
    model;

  return (
    <>
      <section className="mt-[22px] flex flex-wrap items-center justify-between gap-5">
        <div className="flex flex-wrap items-baseline gap-[14px]">
          <Dot color={field.color} size={14} className="translate-y-px" />
          <h2 className="m-0 font-display text-[26px] font-semibold">
            {field.name}{" "}
            <span className="text-[20px] font-normal italic text-muted">
              ({field.lake})
            </span>
          </h2>
          <span className="text-[13px] text-muted">{fieldDesc}</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {Object.values(W).map((w) => (
            <span
              key={w.name}
              className="flex items-center gap-[5px] text-[10.5px] font-semibold tracking-[.5px] text-muted"
            >
              <Dot color={w.color} size={9} />
              {w.name}
            </span>
          ))}
        </div>
      </section>

      <div className="mt-[18px] grid grid-cols-1 items-start gap-[22px] lg:grid-cols-[1.5fr_1fr]">
        {/* Left — the plan */}
        <div className="border-2 border-ink bg-plan p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <Kicker>OAP-002 · THE SAME PREMISES — SERVICES EXPOSED · LIVE</Kicker>
            <span className="text-[10.5px] italic text-muted">
              click a room or a seal
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-[14px] md:grid-cols-[120px_1fr_120px]">
            <div className="flex flex-col justify-end gap-[10px]">
              <FlankCard
                item={gate}
                label="FRONT GATE"
                sub="one boundary"
                onSelect={onSelect}
              />
              <FlankCard
                item={s7}
                dashed
                labelInk
                label="S7 · CHAMBER"
                sub="outside the boundary"
                onSelect={onSelect}
              />
            </div>

            {/* The perimeter */}
            <div className="flex flex-col gap-3 border-2 border-dashed border-violet p-3">
              <div>
                <div className="mb-[6px] text-[9px] font-bold tracking-[2px] text-muted">
                  FIRST FLOOR
                </div>
                <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-3">
                  {floor1.map((r) => (
                    <RoomCard key={r.name} room={r} onSelect={onSelect} />
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-[6px] text-[9px] font-bold tracking-[2px] text-muted">
                  GROUND FLOOR
                </div>
                <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-3">
                  {floor0.map((r) => (
                    <RoomCard key={r.name} room={r} onSelect={onSelect} />
                  ))}
                </div>
              </div>
              <div className="text-center text-[10px] italic text-violet">
                the perimeter — the boundary you cannot physically see
              </div>
            </div>

            <div className="flex flex-col justify-end gap-[10px]">
              <FlankCard
                item={leavers}
                label="LEAVERS’ DOOR"
                sub="offboarding"
                onSelect={onSelect}
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-2 text-[10.5px] font-bold tracking-[2px] text-ink">
              SEALS SCHEDULE — DESIGNED NOT TO CONNECT
            </div>
            <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-3">
              {seals.map((x) => (
                <SealCard key={x.id} seal={x} onSelect={onSelect} />
              ))}
            </div>
          </div>

          <AnimatePresence>
            {sel ? <DetailPanel sel={sel} onClose={onClose} /> : null}
          </AnimatePresence>
        </div>

        {/* Right — duties and the record */}
        <div className="flex flex-col gap-[18px]">
          <div>
            <h3 className="m-0 mb-1 font-display text-[19px] font-semibold">
              This morning
            </h3>
            <p className="m-0 mb-3 text-[12px] italic text-muted">
              Before it becomes an incident. Every line is a system, a connection, or
              an adult’s accountability — never a child.
            </p>
            {duties.length > 0 ? (
              <div className="flex flex-col gap-[10px]">
                {duties.map((d) => (
                  <div
                    key={d.tag}
                    className="border-[1.5px] border-ink bg-white px-[14px] py-3"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="px-2 py-[3px] text-[9px] font-bold tracking-[1.5px] text-paper"
                        style={{ background: d.color }}
                      >
                        {d.tag}
                      </span>
                      <span className="text-[13px] font-semibold">{d.title}</span>
                    </div>
                    <p className="m-0 mt-[7px] text-[12px] leading-[1.5] text-ink">
                      {d.body}
                    </p>
                    <div className="mt-[6px] text-[10.5px] font-semibold text-violet">
                      Who acts: {d.who}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-[1.5px] border-ink bg-white p-4 text-[13px] italic text-muted">
                Nothing before it becomes an incident. The field is Grounded; all
                seals holding.
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="m-0 font-display text-[19px] font-semibold">
                The record
              </h3>
              <span className="text-[10px] italic text-muted">
                write-only · a record of care, not surveillance
              </span>
            </div>
            <div className="mt-[10px] flex max-h-[280px] flex-col gap-2 overflow-y-auto border-[1.5px] border-ink bg-ink px-[14px] py-3">
              {events.map((e, i) => (
                <div
                  key={`${e.t}-${e.k}-${i}`}
                  className="grid grid-cols-[44px_1fr] gap-[10px] text-[11.5px] leading-[1.45]"
                >
                  <span className="tabular-nums text-record-time">{e.t}</span>
                  <span className="text-record-text">
                    <span
                      className="font-semibold"
                      style={{ color: TONE[e.tone] }}
                    >
                      {e.k}
                    </span>{" "}
                    — {e.txt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-6">
        <div className="flex flex-wrap items-baseline gap-3">
          <h3 className="m-0 font-display text-[19px] font-semibold">The estate</h3>
          <span className="text-[11px] italic text-muted">
            the outer map — one plan instrumented, the rest awaiting their drawings
          </span>
        </div>
        <div className="mt-[10px] grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {estate.map((o) => (
            <div
              key={o.name}
              className="border-[1.5px] border-ink bg-white px-[14px] py-3"
              style={{ opacity: o.opacity }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] font-semibold">{o.name}</span>
                <Dot color={o.color} size={9} />
              </div>
              <div className="mt-1 text-[10.5px] italic text-muted">{o.note}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Door 2 — Board
 * ------------------------------------------------------------------ */

function BoardDoor({ sealStats }) {
  return (
    <section className="mt-[26px] max-w-[900px]">
      <h2 className="m-0 font-display text-[24px] font-semibold">
        The board’s door
      </h2>
      <p className="m-0 mt-[6px] text-[13px] italic text-muted">
        Periodic assurance. The board does not watch the weather hourly; it reads the
        season.
      </p>

      <div className="mt-5">
        <Kicker>FIELD WEATHER — LAST TWELVE WEEKS</Kicker>
        <div className="mt-[10px] flex gap-[6px]">
          {BOARD_WEEKS.map((w) => (
            <div key={w.label} className="flex-1 text-center">
              <div
                className="h-[44px]"
                style={{ background: w.color }}
                title={w.name}
              />
              <div className="mt-1 text-[9px] text-muted">{w.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-[6px] text-[11px] italic text-muted">
          One Fractured week in June — a permissions review backlog, cleared. Obscured
          pocket this week under investigation.
        </div>
      </div>

      <div className="mt-[22px] grid grid-cols-1 gap-4 md:grid-cols-2">
        <Panel>
          <Kicker>SEAL INTEGRITY — THIS TERM</Kicker>
          <div className="mt-3 flex flex-col gap-2">
            {sealStats.map((s) => (
              <div key={s.id} className="flex justify-between gap-3 text-[13px]">
                <span className="font-semibold">
                  {s.id}{" "}
                  <span className="font-normal italic text-muted">{s.reads}</span>
                </span>
                <span className="shrink-0 font-semibold" style={{ color: s.color }}>
                  {s.stat}
                </span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <Kicker>JUDGEMENT</Kicker>
          <p className="m-0 mt-3 text-[13px] leading-[1.6]">
            Verse-ality Certified™ — judgement given <strong>14 July 2026</strong> by
            periodic review. Evidence has flowed continuously since; the judgement
            itself is not live. Next review <strong>12 October 2026</strong>.
          </p>
          <p className="m-0 mt-[10px] text-[12px] leading-[1.5] text-muted">
            Open findings: 1 — seal X3 drift event, under investigation by the site
            office.
          </p>
        </Panel>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Door 3 — Inspector · S7
 * ------------------------------------------------------------------ */

function InspectorDoor() {
  return (
    <section className="mt-[26px] max-w-[900px]">
      <h2 className="m-0 font-display text-[24px] font-semibold">
        S7 · The inspection chamber
      </h2>
      <p className="m-0 mt-[6px] text-[13px] italic text-muted">
        Enters from beyond the boundary. This door cannot be locked from inside the
        site office — and Nimbus tests that it stays so.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Panel>
          <Kicker>EVIDENCE BUNDLES</Kicker>
          <div className="mt-3 flex flex-col gap-[9px]">
            {BUNDLES.map((b) => (
              <div
                key={b.name}
                className="flex justify-between gap-[10px] border-b border-[rgba(29,26,46,.12)] pb-2 text-[12.5px]"
              >
                <span>{b.name}</span>
                <span className="shrink-0 italic text-muted">{b.meta}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <Kicker>CHAMBER ACCESS LOG</Kicker>
          <div className="mt-3 flex flex-col gap-[9px]">
            {ACCESS_LOG.map((l) => (
              <div key={l.when} className="text-[12.5px] leading-[1.5]">
                <span className="font-semibold">{l.when}</span> — {l.what}
              </div>
            ))}
          </div>
          <p className="m-0 mt-[14px] text-[11.5px] italic text-muted">
            This log is itself write-only and visible to the DSL and the board.
            Watching the watchers is drawn, not implied.
          </p>
        </Panel>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * The app
 * ------------------------------------------------------------------ */

const DOORS = [
  { key: "dsl", label: "DSL" },
  { key: "board", label: "Board" },
  { key: "inspector", label: "Inspector · S7" },
];

export default function NimbusApp() {
  const [door, setDoor] = useState("dsl");
  const [sel, setSel] = useState(null);
  const [scenario, setScenario] = useState("Demo morning");
  const [telemetry, setTelemetry] = useState(true);
  const [ticks, setTicks] = useState([]);
  const [evidence, setEvidence] = useState(STARTING_EVIDENCE);

  const demo = scenario !== "All clear";
  const model = useMemo(() => buildModel(demo), [demo]);

  // Changing scenario invalidates whatever was selected.
  useEffect(() => {
    setSel(null);
  }, [scenario]);

  // The heartbeat. Mocked: one event every four seconds, six kept live.
  useEffect(() => {
    if (!telemetry) return undefined;
    let i = 0;
    const timer = setInterval(() => {
      const now = new Date();
      const t =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0");
      const [k, txt, tone] = BEATS[i++ % BEATS.length];
      setTicks((prev) => [{ t, k, txt, tone }, ...prev].slice(0, 6));
      setEvidence((n) => n + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, [telemetry]);

  const events = useMemo(
    () => [...ticks, ...model.baseEvents],
    [ticks, model.baseEvents],
  );

  const tabClass = (on) =>
    `cursor-pointer border-[1.5px] border-ink px-[14px] py-[7px] text-[12px] font-semibold ${
      on ? "bg-ink text-paper" : "bg-transparent text-ink"
    }`;

  return (
    <div className="mx-auto max-w-[1400px] px-8 pb-10 pt-7">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-[18px]">
        <div>
          <div className="flex flex-wrap items-baseline gap-[14px]">
            <h1 className="m-0 font-display text-[34px] font-semibold">Nimbus</h1>
            <span className="text-[12px] font-bold tracking-[2px] text-violet">
              THE LIVE{" "}
              <a
                href="https://glyphonics.com/weather-of-knowing.html"
                target="_blank"
                rel="noopener"
                className="text-violet underline underline-offset-[3px]"
              >
                WEATHER
              </a>{" "}
              OF A DIGITAL SCHOOL
            </span>
          </div>
          <p className="m-0 mt-[6px] text-[13px] italic text-muted">
            The same premises as{" "}
            <a
              href="https://github.com/TheNovacene/open-provision-drawings/blob/main/drawings/oap-001-the-digital-premises.png"
              target="_blank"
              rel="noopener"
              className="text-violet underline underline-offset-2"
            >
              OAP-001
            </a>{" "}
            /{" "}
            <a
              href="https://github.com/TheNovacene/open-provision-drawings/blob/main/drawings/oap-002-the-services-layer.png"
              target="_blank"
              rel="noopener"
              className="text-violet underline underline-offset-2"
            >
              OAP-002
            </a>{" "}
            — instrumented. If it is not drawn, it does not flow; if it flows
            anyway, Nimbus says so.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-[10px]">
          <Dot
            color={telemetry ? "oklch(0.55 0.09 170)" : "#5a5468"}
            size={8}
            className={telemetry ? "nimbus-pulse" : ""}
          />
          <span className="text-[11px] font-bold tracking-[1.5px] text-muted">
            {telemetry ? "EVIDENCE FLOWING" : "TELEMETRY PAUSED"}
          </span>
          <nav className="ml-[14px] flex flex-wrap gap-[6px]">
            {DOORS.map((d) => (
              <button
                key={d.key}
                type="button"
                onClick={() => setDoor(d.key)}
                className={tabClass(door === d.key)}
                aria-current={door === d.key ? "page" : undefined}
              >
                {d.label}
              </button>
            ))}
            <a
              href="nimbus-mat.html"
              className="border-[1.5px] border-ink px-[14px] py-[7px] text-[12px] font-semibold text-ink no-underline hover:text-ink"
            >
              MAT ↗
            </a>
          </nav>
        </div>
      </header>

      {/* The honest claim: continuous evidence, periodic judgement. */}
      <div className="mt-[14px] flex flex-wrap items-center justify-between gap-4 bg-ink px-[14px] py-[10px] text-paper">
        <span className="text-[11px] font-bold tracking-[2px]">
          CONTINUOUS EVIDENCE · PERIODIC JUDGEMENT
        </span>
        <span className="text-[12px] text-faded">
          Verse-ality Certified™ judgement given 14 July 2026 · next review 12
          October 2026 ·{" "}
          <span className="font-semibold text-paper">
            {evidence.toLocaleString("en-GB")}
          </span>{" "}
          evidence entries since. The judgement is periodic; only the evidence is
          live.
        </span>
      </div>

      {door === "dsl" ? (
        <DslDoor
          model={model}
          sel={sel}
          onSelect={setSel}
          onClose={() => setSel(null)}
          events={events}
        />
      ) : null}
      {door === "board" ? <BoardDoor sealStats={model.sealStats} /> : null}
      {door === "inspector" ? <InspectorDoor /> : null}

      {/* Prototype controls. Not part of the instrument — these stand in for a
          telemetry source that does not exist yet. */}
      <section className="mt-9 flex flex-wrap items-center gap-4 border-t border-[rgba(29,26,46,.2)] pt-[14px]">
        <span className="text-[9px] font-bold tracking-[2px] text-muted">
          PROTOTYPE CONTROLS · TELEMETRY IS MOCKED
        </span>
        <div className="flex gap-[6px]">
          {["Demo morning", "All clear"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setScenario(s)}
              className={`cursor-pointer border-[1.5px] border-ink px-[10px] py-[5px] text-[10.5px] font-semibold ${
                scenario === s ? "bg-ink text-paper" : "bg-transparent text-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setTelemetry((v) => !v)}
          className="cursor-pointer border-[1.5px] border-ink bg-transparent px-[10px] py-[5px] text-[10.5px] font-semibold text-ink"
        >
          {telemetry ? "Pause telemetry" : "Resume telemetry"}
        </button>
      </section>

      <footer className="mt-4 flex flex-wrap justify-between gap-4 pt-[14px] text-[11px] text-muted">
        <span>Ethics as geometry · Coherence as currency · Consent as protocol</span>
        <span className="text-right italic">
          Prototype · telemetry mocked · Nimbus monitors the institution, never the
          child.
          <br />
          Nimbus © 2026 Kirstin Stevens · The Novacene Ltd · code AGPL-3.0-only ·
          content CC BY-NC-SA 4.0 · commercial licence available. Room &amp; seal
          vocabulary after OAP-001/002 (CC BY 4.0 applies to the drawings only).
          Verse-ality® is a registered UK trade mark of The Novacene Ltd.
        </span>
      </footer>
    </div>
  );
}
