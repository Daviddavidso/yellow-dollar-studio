import { useId } from 'react'
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

export default function Cases() {
  const headId = useId()
  return (
    <section id="cases" className="section" aria-labelledby={headId}>
      <div className="container">
        <Reveal>
          <div className="section-head">
            <h2 id={headId} className="h2">Before / after</h2>
            <p className="intro">
              The creator's original frame next to the thumbnail we made for it, and what happened after the swap.
            </p>
          </div>
        </Reveal>

        <ul className="cases" role="list">
          {CASES.map((c, i) => (
            <Reveal as="li" className="case" key={c.id} delay={i * 0.05}>
              <div className="case-head">
                <h3>{c.title}</h3>
                <p className="case-niche">{c.niche}</p>
              </div>
              <div className="pair">
                <figure className="before">
                  <img src={BASE + c.before} alt={c.beforeAlt} width="1280" height="720" loading="lazy" decoding="async" />
                  <figcaption>Before</figcaption>
                </figure>
                <div className="pair-arrow" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </div>
                <figure className="after">
                  <img src={BASE + c.after} alt={c.afterAlt} width="1280" height="720" loading="lazy" decoding="async" />
                  <figcaption>After</figcaption>
                </figure>
              </div>
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
