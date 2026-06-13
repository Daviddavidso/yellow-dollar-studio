import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const LINKS = [
  { href: '#work', label: 'Работы' },
  { href: '#contact', label: 'Контакты' },
]

const NICHES = [
  ['gaming', 'Gaming'],
  ['trading', 'Trading'],
  ['crypto', 'Crypto'],
  ['entertainment', 'Entertainment'],
  ['blogs', 'Blogs'],
  ['food', 'Food Review'],
]

const TG = 'https://t.me/+9MEj4JSWp8FkNDNh'
const EASE = [0.32, 0.72, 0, 1]

function getTheme() {
  if (typeof document !== 'undefined') return document.documentElement.getAttribute('data-theme') || 'dark'
  return 'dark'
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState('main') // 'main' | 'sub'
  const [theme, setTheme] = useState(getTheme)
  const reduce = useReducedMotion()

  const toggleRef = useRef(null)
  const drillRef = useRef(null)
  const backRef = useRef(null)
  const pendingFocus = useRef(null)

  // Escape closes the whole menu
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Reset to main panel whenever the menu closes
  useEffect(() => { if (!open) setView('main') }, [open])

  // Body scroll lock (iOS-safe) + return focus to the toggle on close
  useEffect(() => {
    if (!open) return
    const y = window.scrollY
    const b = document.body.style
    b.position = 'fixed'; b.top = `-${y}px`; b.left = '0'; b.right = '0'; b.width = '100%'
    return () => {
      b.position = ''; b.top = ''; b.left = ''; b.right = ''; b.width = ''
      window.scrollTo(0, y)
      toggleRef.current?.focus()
    }
  }, [open])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem('theme', next) } catch (e) { /* ignore */ }
  }

  const openSub = () => { pendingFocus.current = 'back'; setView('sub') }
  const goBack = () => { pendingFocus.current = 'drill'; setView('main') }

  // After the slide settles, move focus to the right control
  const onSlideDone = () => {
    if (!open) return
    if (pendingFocus.current === 'back') backRef.current?.focus()
    else if (pendingFocus.current === 'drill') drillRef.current?.focus()
    pendingFocus.current = null
  }

  const pickCategory = (key) => {
    setOpen(false)
    window.dispatchEvent(new CustomEvent('yd:filter', { detail: key }))
    setTimeout(() => {
      const el = document.getElementById('work')
      el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
      const h = document.querySelector('#work h2')
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }) }
    }, 60)
  }

  const isLight = theme === 'light'
  const listV = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.05, delayChildren: reduce ? 0 : 0.09 } } }
  const itemV = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.62, ease: EASE } },
  }

  return (
    <header className="header">
      <div className="container">
        <a href="#top" className="brand" aria-label="Yellow Dollar Studio — на главную">
          <span className="dot" aria-hidden="true">$</span>
          Yellow Dollar
        </a>

        <nav className="nav-desktop" aria-label="Основная навигация">
          {LINKS.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>

        <div className="header-cta">
          <button type="button" className="icon-btn" aria-pressed={isLight} aria-label="Светлая тема" onClick={toggleTheme}>
            <span aria-hidden="true">{isLight ? '☾' : '☀'}</span>
          </button>
          <a className="btn" href="#contact">Заказать</a>
          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Меню"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="bar" aria-hidden="true" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="apple-menu"
            aria-label="Главное меню"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: EASE } }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <div className="am-viewport">
              <motion.div
                className="am-track"
                animate={{ x: view === 'sub' ? '-50%' : '0%' }}
                transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE }}
                onAnimationComplete={onSlideDone}
              >
                {/* Panel 1 — main */}
                <div className="am-panel" inert={view === 'sub' ? '' : undefined}>
                  <motion.ul className="am-list" variants={listV} initial="hidden" animate="visible">
                    <motion.li className="am-item" variants={itemV}>
                      <a href="#work" onClick={() => setOpen(false)}>Работы</a>
                    </motion.li>
                    <motion.li className="am-item" variants={itemV}>
                      <button ref={drillRef} type="button" className="am-drill" onClick={openSub}>
                        Категории
                        <span className="am-chev" aria-hidden="true">›</span>
                      </button>
                    </motion.li>
                    <motion.li className="am-item" variants={itemV}>
                      <a href="#contact" onClick={() => setOpen(false)}>Контакты</a>
                    </motion.li>
                    <motion.li className="am-cta" variants={itemV}>
                      <a className="btn" href="#contact" onClick={() => setOpen(false)}>Заказать дизайн</a>
                      <a className="am-tg chev" href={TG} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                        Написать в Telegram <span className="c" aria-hidden="true">›</span>
                        <span className="sr-only"> (откроется в новой вкладке)</span>
                      </a>
                    </motion.li>
                  </motion.ul>
                </div>

                {/* Panel 2 — categories */}
                <div className="am-panel" inert={view === 'main' ? '' : undefined}>
                  <ul className="am-list">
                    <li className="am-item am-back-row">
                      <button ref={backRef} type="button" className="am-back" aria-label="Назад" onClick={goBack}>
                        <span className="am-chev-l" aria-hidden="true">‹</span> Категории
                      </button>
                    </li>
                    {NICHES.map(([key, label]) => (
                      <li className="am-item am-sub-item" key={key}>
                        <button type="button" onClick={() => pickCategory(key)}>{label}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
