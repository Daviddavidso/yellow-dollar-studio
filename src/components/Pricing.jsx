import { useId } from 'react'
import Reveal from './Reveal.jsx'
import { PRICING } from '../site.js'

// every row is an included feature, so the tick is decorative
const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M3 8.5l3 3 7-7" /></svg>
)

function Tier({ t, i }) {
  const [lo, hi] = t.price
  return (
    <Reveal as="li" className={`tier${t.popular ? ' popular' : ''}`} delay={i * 0.06}>
      <h3>
        {t.name}
        {t.popular && <span className="tier-badge">Most popular</span>}
      </h3>
      <p className="price">
        {lo}<span aria-hidden="true">–</span><span className="sr-only"> to </span>{hi}
      </p>
      <p className="price-unit">{t.unit}</p>
      <ul className="features" role="list">
        {t.features.map((f) => (
          <li key={f}><Check />{f}</li>
        ))}
      </ul>
      {/* only the popular tier keeps a filled yellow CTA */}
      <a className={`btn ${t.popular ? '' : 'btn-ghost'}`} href="#contact">
        Order<span className="sr-only"> the {t.name} plan</span>
      </a>
    </Reveal>
  )
}

export default function Pricing() {
  const headId = useId()
  return (
    <section id="pricing" className="section" aria-labelledby={headId}>
      <div className="container">
        <Reveal>
          <div className="section-head">
            <h2 id={headId} className="h2">Pricing</h2>
          </div>
        </Reveal>
        <ul className="tiers" role="list">
          {PRICING.map((t, i) => <Tier key={t.id} t={t} i={i} />)}
        </ul>
      </div>
    </section>
  )
}
