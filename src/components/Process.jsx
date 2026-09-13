import { useId } from 'react'
import Reveal from './Reveal.jsx'
import { STEPS } from '../site.js'

export default function Process() {
  const headId = useId()
  return (
    <section id="process" className="section section--alt" aria-labelledby={headId}>
      <div className="container">
        <Reveal>
          <div className="section-head">
            <h2 id={headId} className="h2">How it works</h2>
            <p className="intro">Three steps, no calls, no surprises.</p>
          </div>
        </Reveal>
        {/* role="list" is required: list-style:none drops list semantics in Safari/VoiceOver */}
        <ol className="steps" role="list">
          {STEPS.map((s, i) => (
            <Reveal as="li" className="step" key={s.title} delay={i * 0.06}>
              <div className="step-top">
                <span className="nbox">{i + 1}</span>
                <h3>{s.title}</h3>
              </div>
              <p>{s.text}</p>
              {i < STEPS.length - 1 && <span className="step-line" aria-hidden="true" />}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
