import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const NICHES = [
  ['gaming', 'Gaming'],
  ['trading', 'Trading'],
  ['crypto', 'Crypto'],
  ['entertainment', 'Entertainment'],
  ['blogs', 'Blogs'],
  ['food', 'Food Review'],
]

const TG = 'https://t.me/+9MEj4JSWp8FkNDNh'
const LOGO = `${import.meta.env.BASE_URL}ydlogo.svg`
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
        <a href="#top" className="brand" aria-label="Yellow Dollar Studio — home">
          <img className="brand-mark" src={LOGO} alt="" width="36" height="36" />
          <span className="brand-name">Yellow Dollar Studio</span>
        </a>

        <div className="header-cta">
          <button type="button" className="icon-btn" aria-pressed={isLight} aria-label="Light theme" onClick={toggleTheme}>
            {isLight ? (
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4.2" fill="currentColor" stroke="none" />
                <path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
              </svg>
            )}
          </button>
          <a className="btn btn-ghost" href="#contact">
            <svg className="btn-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
            Order
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Menu"
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
            aria-label="Main menu"
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
                  <motion.div className="am-panel-in" variants={listV} initial="hidden" animate="visible">
                    <nav className="am-nav" aria-label="Menu">
                      <ul className="am-list">
                        <motion.li className="am-item" variants={itemV}>
                          <a className="am-link" href="#work" onClick={() => setOpen(false)}>
                            <svg className="am-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" focusable="false"><rect x="3" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" /></svg>
                            <span>Work</span>
                          </a>
                        </motion.li>
                        <motion.li className="am-item am-disclosure" variants={itemV}>
                          <button ref={drillRef} type="button" className="am-drill" onClick={openSub}>
                            <span className="am-label">
                              <svg className="am-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true" focusable="false"><path d="M12 3l8.5 4.5L12 12 3.5 7.5 12 3z" /><path d="M3.5 12L12 16.5 20.5 12" /></svg>
                              Categories
                            </span>
                            <span className="am-chev" aria-hidden="true">›</span>
                          </button>
                        </motion.li>
                        <motion.li className="am-item" variants={itemV}>
                          <a className="am-link" href="#contact" onClick={() => setOpen(false)}>
                            <svg className="am-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M4 7.5l8 5.5 8-5.5" /></svg>
                            <span>Contact</span>
                          </a>
                        </motion.li>
                      </ul>
                    </nav>

                    <motion.div className="am-foot" variants={itemV}>
                      <a className="btn" href="#contact" onClick={() => setOpen(false)}>
                        <svg className="btn-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                        Order design
                      </a>
                      <a className="am-tg" href={TG} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true" focusable="false"><path d="M21 4L3 11l6 2.5L21 4zM21 4l-4 16-7-6" /></svg>
                        Telegram
                        <span className="sr-only"> (opens in a new tab)</span>
                        <span className="am-ext" aria-hidden="true">↗</span>
                      </a>
                      <div className="am-brand">
                        <img src={LOGO} alt="" width="24" height="24" />
                        <span>Yellow Dollar Studio</span>
                        <span className="am-copy">© 2026</span>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Panel 2 — categories */}
                <div className="am-panel" inert={view === 'main' ? '' : undefined}>
                  <ul className="am-list">
                    <li className="am-item am-back-row">
                      <button ref={backRef} type="button" className="am-back" aria-label="Back" onClick={goBack}>
                        <span className="am-chev-l" aria-hidden="true">‹</span> Categories
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
