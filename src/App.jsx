import { useState } from 'react'
import Header from './components/Header.jsx'
import Cases from './components/Cases.jsx'
import Portfolio from './components/Portfolio.jsx'
import Pricing from './components/Pricing.jsx'
import Process from './components/Process.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Reveal from './components/Reveal.jsx'
import { BRAND, NAV, TELEGRAM, X_URL, TURNAROUND, REVISIONS, PRICING } from './site.js'

const BASE = import.meta.env.BASE_URL
const THUMBS = Array.from({ length: 12 }, (_, i) => `${BASE}works/thumbs/thumb-${i + 1}.png`)
const shift = (n) => [...THUMBS.slice(n), ...THUMBS.slice(0, n)]
// enough rows to fully cover the hero — no empty bands
const ROWS = [
  THUMBS,
  [...THUMBS].reverse(),
  shift(5),
  shift(2),
  [...shift(8)].reverse(),
  shift(10),
]

function ReelRow({ srcs, cls }) {
  const loop = [...srcs, ...srcs]
  return (
    <div className={`reel-row ${cls}`}>
      {loop.map((src, i) => (
        <img key={i} src={src} alt="" loading="lazy" decoding="async" width="320" height="180" />
      ))}
    </div>
  )
}

function Hero() {
  const [paused, setPaused] = useState(false)
  const fromPrice = PRICING[0].price[0]
  return (
    <section id="top" className="showreel" aria-labelledby="hero-title">
      <div className={`reel${paused ? ' paused' : ''}`} aria-hidden="true">
        {ROWS.map((srcs, i) => (
          <ReelRow key={i} srcs={srcs} cls={`r${(i % 3) + 1}`} />
        ))}
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-content">
        <Reveal>
          <p className="hero-badge">For finance, crypto &amp; real estate creators</p>
          <h1 id="hero-title">Stop posting<br />dogshit thumbnails</h1>
          <p className="hero-role">
            YouTube thumbnails built to get clicked. Concept first, first draft in 24 hours,
            final files within 48.
          </p>
          <div className="hero-cta">
            <a className="btn" href="#contact">
              <svg className="btn-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
              Order a thumbnail
            </a>
            <a className="btn btn-ghost" href="#cases">See before / after</a>
          </div>
          <ul className="hero-facts" role="list">
            <li>Delivered in {TURNAROUND}</li>
            <li>{REVISIONS} rounds of edits included</li>
            <li>From {fromPrice} per thumbnail</li>
          </ul>
        </Reveal>
      </div>

      <button
        type="button"
        className="reel-pause"
        aria-pressed={paused}
        aria-label={paused ? 'Play background animation' : 'Pause background animation'}
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? (
          <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.6l9.5 5.4L4 13.4z" fill="currentColor" /></svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="2.5" width="3" height="11" rx="1.2" fill="currentColor" /><rect x="9.5" y="2.5" width="3" height="11" rx="1.2" fill="currentColor" /></svg>
        )}
      </button>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-center">
        <a href="#top" className="footer-brand" aria-label={`${BRAND} — back to top`}>
          <img className="brand-mark" src={`${BASE}ydlogo.svg`} alt="" width="44" height="44" />
        </a>
        <p className="footer-tagline">
          YouTube thumbnails for finance, crypto and real estate creators. Delivered in {TURNAROUND}.
        </p>
        <nav className="footer-nav" aria-label="Footer">
          <ul role="list">
            {NAV.map((n) => (
              <li key={n.href}><a href={n.href}>{n.label}</a></li>
            ))}
            <li>
              <a href={TELEGRAM} target="_blank" rel="noopener noreferrer">
                Telegram<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            {X_URL && (
              <li>
                <a href={X_URL} target="_blank" rel="noopener noreferrer">
                  X<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            )}
          </ul>
        </nav>
        <p className="footer-copy">© 2026 {BRAND}</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Cases />
        <Portfolio />
        <Pricing />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
