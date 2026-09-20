import { useState } from 'react'
import Header from './components/Header.jsx'
import Cases from './components/Cases.jsx'
import Portfolio from './components/Portfolio.jsx'
import Pricing from './components/Pricing.jsx'
import Process from './components/Process.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Reveal from './components/Reveal.jsx'
import { BRAND_FULL, TELEGRAM, X_URL } from './site.js'

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
  // The CSS reduced-motion block already freezes the wall, so start in the paused
  // state there — otherwise the control would advertise motion that is not running.
  const [paused, setPaused] = useState(
    () => typeof window !== 'undefined'
      && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  )
  return (
    <section id="top" className="showreel" aria-labelledby="hero-title">
      <button
        type="button"
        className="reel-pause"
        aria-pressed={paused}
        aria-label="Pause background animation"
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? (
          <svg width="20" height="20" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.6l9.5 5.4L4 13.4z" fill="currentColor" /></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="2.5" width="3" height="11" rx="1.2" fill="currentColor" /><rect x="9.5" y="2.5" width="3" height="11" rx="1.2" fill="currentColor" /></svg>
        )}
      </button>
      <div className={`reel${paused ? ' paused' : ''}`} aria-hidden="true">
        {ROWS.map((srcs, i) => (
          <ReelRow key={i} srcs={srcs} cls={`r${(i % 3) + 1}`} />
        ))}
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-content">
        <Reveal>
          <h1 id="hero-title">Stop posting<br />dogshit thumbnails</h1>
          <p className="hero-role">
            Thumbnails for finance, crypto and real estate creators. Concept first,
            first draft in 24 hours, final files within 48.
          </p>
          <div className="hero-cta">
            <a className="btn" href="#contact">
              <svg className="btn-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
              Order a thumbnail
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const TgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true" focusable="false"><path d="M21 4L3 11l6 2.5L21 4zM21 4l-4 16-7-6" /></svg>
)
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M18.9 2H22l-7.4 8.5L23 22h-6.8l-5.3-7-6.1 7H1.7l7.9-9L0 2h7l4.8 6.4L18.9 2zm-1.2 18h1.9L6.4 3.9H4.4L17.7 20z" /></svg>
)

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <a className="footer-pill" href={TELEGRAM} target="_blank" rel="noopener noreferrer">
            <TgIcon />
            <span>Message on Telegram</span>
            <span className="sr-only"> (opens in a new tab)</span>
            <span className="footer-pill-arrow" aria-hidden="true">›</span>
          </a>
          {X_URL && (
            <a className="footer-pill" href={X_URL} target="_blank" rel="noopener noreferrer">
              <XIcon />
              <span>DM on X</span>
              <span className="sr-only"> (opens in a new tab)</span>
              <span className="footer-pill-arrow" aria-hidden="true">›</span>
            </a>
          )}
        </div>
        <p className="footer-copy">© 2026 {BRAND_FULL}. All rights reserved.</p>
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
        <Portfolio />
        <Cases />
        <Pricing />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
