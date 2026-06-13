import { useState } from 'react'
import Header from './components/Header.jsx'
import Portfolio from './components/Portfolio.jsx'
import Contact from './components/Contact.jsx'
import Reveal from './components/Reveal.jsx'

const TG = 'https://t.me/+9MEj4JSWp8FkNDNh'

const BASE = import.meta.env.BASE_URL
const THUMBS = Array.from({ length: 12 }, (_, i) => `${BASE}works/thumbs/thumb-${i + 1}.png`)
const ROWS = [
  THUMBS,
  [...THUMBS].reverse(),
  [...THUMBS.slice(5), ...THUMBS.slice(0, 5)],
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
        <ReelRow srcs={ROWS[0]} cls="r1" />
        <ReelRow srcs={ROWS[1]} cls="r2" />
        <ReelRow srcs={ROWS[2]} cls="r3" />
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-content">
        <Reveal>
          <p className="hero-kicker">Yellow Dollar Studio</p>
          <h1>Превью, которые<br /><span className="y">невозможно пролистать</span></h1>
          <p className="hero-role">
            Делаю превью, шапки и оформление для YouTube-каналов, стримеров и
            игровых проектов — чтобы на вас кликали.
          </p>
          <ul className="hero-stats">
            <li><b>5 лет</b> опыта</li>
            <li><b>≈200</b> отзывов</li>
            <li>
              <span className="star" aria-hidden="true">★</span> <b>5.0</b>
              <span className="sr-only">рейтинг 5.0 из 5</span>
            </li>
          </ul>
          <div className="hero-cta">
            <a className="btn" href="#contact">Заказать дизайн</a>
            <a className="chev big" href={TG} target="_blank" rel="noopener noreferrer">
              Написать в Telegram <span className="c" aria-hidden="true">›</span>
              <span className="sr-only"> (откроется в новой вкладке)</span>
            </a>
          </div>
        </Reveal>
      </div>

      <button
        type="button"
        className="reel-pause"
        aria-pressed={paused}
        aria-label={paused ? 'Включить анимацию фона' : 'Остановить анимацию фона'}
        onClick={() => setPaused((p) => !p)}
      >
        <span aria-hidden="true">{paused ? '▶' : '❚❚'}</span>
      </button>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cols">
          <div className="footer-col">
            <a href="#top" className="brand">
              <span className="dot" aria-hidden="true">$</span>
              Yellow Dollar
            </a>
            <p style={{ color: 'var(--text-2)', maxWidth: '34ch', marginTop: 4 }}>
              Визуал для YouTube, стримеров и игровых проектов.
            </p>
          </div>
          <nav className="footer-col" aria-label="Разделы">
            <span className="h">Навигация</span>
            <a href="#work">Работы</a>
            <a href="#contact">Заказать</a>
            <a href={TG} target="_blank" rel="noopener noreferrer">
              Telegram<span className="sr-only"> (откроется в новой вкладке)</span>
            </a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Yellow Dollar Studio</span>
          <span>Дизайн на заказ · отвечаю в течение дня</span>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Перейти к содержимому</a>
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
