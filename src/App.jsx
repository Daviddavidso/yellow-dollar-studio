import { useState } from 'react'
import Header from './components/Header.jsx'
import Portfolio from './components/Portfolio.jsx'
import Contact from './components/Contact.jsx'
import Reveal from './components/Reveal.jsx'

const TG = 'https://t.me/+9MEj4JSWp8FkNDNh'

const BASE = import.meta.env.BASE_URL
const THUMBS = Array.from({ length: 12 }, (_, i) => `${BASE}works/thumbs/thumb-${i + 1}.png`)
const shift = (n) => [...THUMBS.slice(n), ...THUMBS.slice(0, n)]
// enough rows to fully cover the hero — no empty black bands
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
  return (
    <section id="top" className="showreel">
      <div className={`reel${paused ? ' paused' : ''}`} aria-hidden="true">
        {ROWS.map((srcs, i) => (
          <ReelRow key={i} srcs={srcs} cls={`r${(i % 3) + 1}`} />
        ))}
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-content">
        <Reveal>
          <h1>Stop posting<br />dogshit thumbnails</h1>
          <p className="hero-role">
            Thumbnails, banners and channel art for YouTubers, streamers
            and gaming, built to get clicked
          </p>
          <div className="hero-cta">
            <a className="btn" href="#contact">
              <svg className="btn-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
              Order design
            </a>
          </div>
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
        <a href="#top" className="footer-brand" aria-label="Yellow Dollar Studio — back to top">
          <img className="brand-mark" src={`${BASE}ydlogo.svg`} alt="" width="44" height="44" />
        </a>
        <p className="footer-tagline">
          Visuals for YouTube, streamers and gaming.
        </p>
        <nav className="footer-nav" aria-label="Footer">
          <a href="#work">Work</a>
          <a href="#contact">Order</a>
          <a href={TG} target="_blank" rel="noopener noreferrer">
            Telegram<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
        <span className="footer-copy">© 2026 Yellow Dollar Studio</span>
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
        <Contact />
      </main>
      <Footer />
    </>
  )
}
