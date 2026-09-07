import { useId } from 'react'
import Reveal from './Reveal.jsx'
import { FAQ } from '../site.js'

export default function Faq() {
  const headId = useId()
  return (
    <section id="faq" className="section section--alt" aria-labelledby={headId}>
      <div className="container">
        <Reveal>
          <div className="section-head">
            <h2 id={headId} className="h2">FAQ</h2>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="faq">
            {FAQ.map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <svg className="chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M6 9l6 6 6-6" /></svg>
                </summary>
                <div className="answer">{item.a}</div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
