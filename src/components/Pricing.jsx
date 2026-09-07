import { useId } from 'react'
import Reveal from './Reveal.jsx'
import { PRICING, REVISIONS, TURNAROUND } from '../site.js'

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M3 8.5l3 3 7-7" /></svg>
)

function Tier({ t, i }) {
  const id = useId()
  const [lo, hi] = t.price
  return (
    <Reveal as="li" className={`tier${t.popular ? ' popular' : ''}`} delay={i * 0.06}>
      <h3 id={id}>{t.name}</h3>
      {t.popular && <p className="badge">Most popular</p>}
      <p className="price">
        {lo}<span aria-hidden="true">–</span><span className="sr-only"> to </span>{hi}
      </p>
      <p className="price-unit">{t.unit}</p>
      <p className="tier-tagline">{t.tagline}</p>
      <ul className="features" role="list">
        {t.features.map((f) => (
          <li key={f}><Check />{f}</li>
        ))}
      </ul>
      <a className="btn" href="#contact" aria-describedby={id}>Order</a>
    </Reveal>
  )
}

export default function Pricing() {
  const headId = useId()
  return (
    <section id="pricing" className="section section--alt" aria-labelledby={headId}>
      <div className="container">
        <Reveal>
          <div className="section-head">
            <h2 id={headId} className="h2">Pricing</h2>
            <p className="intro">
              Open prices, no "get a quote". Every price includes a concept, {REVISIONS} rounds of edits and delivery in {TURNAROUND}.
            </p>
          </div>
        </Reveal>
        <ul className="tiers" role="list">
          {PRICING.map((t, i) => <Tier key={t.id} t={t} i={i} />)}
        </ul>
      </div>
    </section>
  )
}
