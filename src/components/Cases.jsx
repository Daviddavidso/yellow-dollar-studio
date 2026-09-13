import { useId, useState } from 'react'
import Reveal from './Reveal.jsx'
import { CASES } from '../site.js'

const BASE = import.meta.env.BASE_URL

function Metric({ m }) {
  return (
    <div>
      <dt>{m.label}</dt>
      <dd>
        {m.value ? m.value : (
          <>
            {m.from} <span aria-hidden="true">→</span><span className="sr-only">to</span> {m.to}
          </>
        )}
      </dd>
    </div>
  )
}

/*
  Before/after comparison slider.
  The control is a real <input type="range"> stretched over the frame: it gives us
  keyboard (arrows/Home/End), touch, and click-to-jump — the last one is the
  non-dragging alternative required by WCAG 2.5.7, so the input must never get
  pointer-events: none. clip-path is visual only, so BOTH images stay in the
  accessibility tree with their own alt text.
*/
function Compare({ c }) {
  const [pos, setPos] = useState(50)
  const id = useId()

  return (
    <div className="compare" style={{ '--pos': `${pos}%` }}>
      <figure className="cmp-layer">
        <img
          src={BASE + c.after}
          alt={`After — ${c.afterAlt}`}
          width="1280" height="720" loading="lazy" decoding="async"
        />
        <figcaption className="cmp-tag cmp-tag-after">After</figcaption>
      </figure>

      <figure className="cmp-layer cmp-clip">
        <img
          src={BASE + c.before}
          alt={`Before — ${c.beforeAlt}`}
          width="1280" height="720" loading="lazy" decoding="async"
        />
        <figcaption className="cmp-tag cmp-tag-before">Before</figcaption>
      </figure>

      <span className="cmp-divider" aria-hidden="true" />
      <span className="cmp-knob" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" focusable="false">
          <path d="M9.6 5.8 3.2 12l6.4 6.2z" />
          <path d="M14.4 5.8 20.8 12l-6.4 6.2z" />
        </svg>
      </span>

      <label className="sr-only" htmlFor={id}>
        Reveal the new thumbnail — {c.title}
      </label>
      <input
        id={id}
        className="cmp-range"
        type="range"
        min="0"
        max="100"
        step="1"
        value={pos}
        aria-valuetext={`${pos}% after, ${100 - pos}% before`}
        onChange={(e) => setPos(Number(e.target.value))}
      />
    </div>
  )
}

export default function Cases() {
  const headId = useId()
  return (
    <section id="cases" className="section" aria-labelledby={headId}>
      <div className="container">
        <Reveal>
          <div className="section-head">
            <h2 id={headId} className="h2">Before / after</h2>
            <p className="intro">
              Drag the handle to swap the creator's original frame for the thumbnail we made,
              and see what happened after the swap.
            </p>
          </div>
        </Reveal>

        <ul className="cases" role="list">
          {CASES.map((c, i) => (
            <Reveal as="li" className="case" key={c.id} delay={i * 0.05}>
              {/* heading stays above the slider it names, in DOM and on screen */}
              <div className="case-head">
                <p className="case-niche">{c.niche}</p>
                <h3>{c.title}</h3>
              </div>
              <Compare c={c} />
              <dl className="metrics">
                {c.metrics.map((m) => <Metric key={m.label} m={m} />)}
              </dl>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
