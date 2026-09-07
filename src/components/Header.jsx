import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { BRAND, NAV, TELEGRAM } from '../site.js'

const NICHES = [
  ['gaming', 'Gaming'],
  ['trading', 'Trading'],
  ['crypto', 'Crypto'],
  ['entertainment', 'Entertainment'],
  ['blogs', 'Blogs'],
  ['food', 'Food Review'],
]

const LOGO = `${import.meta.env.BASE_URL}ydlogo.svg`
const EASE = [0.32, 0.72, 0, 1]

const ICONS = {
  '#cases': <svg className="am-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" focusable="false"><rect x="3" y="5" width="8" height="14" rx="1.5" /><rect x="13" y="5" width="8" height="14" rx="1.5" /></svg>,
  '#work': <svg className="am-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" focusable="false"><rect x="3" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" /></svg>,
  '#pricing': <svg className="am-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" /><circle cx="7.5" cy="7.5" r="1.4" /></svg>,
  '#faq': <svg className="am-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" /><path d="M9.6 9.6a2.4 2.4 0 1 1 3.4 2.2c-.7.3-1 .9-1 1.7" /><circle cx="12" cy="17" r="0.5" fill="currentColor" /></svg>,
  '#contact': <svg className="am-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M4 7.5l8 5.5 8-5.5" /></svg>,
}

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

  // Mobile-menu anchors: the body is scroll-locked while the menu is open, so a native
  // jump would be undone by the unlock. Close first, then scroll and move focus to the
  // section heading ourselves (WCAG 2.4.3).
  const goTo = (e, hash) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => {
      const el = document.querySelector(hash)
      if (!el) return
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
      const h = el.querySelector('h1, h2')
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }) }
      try { history.replaceState(null, '', hash) } catch (err) { /* ignore */ }
    }, 60)
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
        <a href="#top" className="brand" aria-label={`${BRAND} — home`}>
          <img className="brand-mark" src={LOGO} alt="" width="36" height="36" />
          <span className="brand-name">{BRAND}</span>
        </a>

        <nav className="nav-desktop" aria-label="Primary">
          <ul role="list">
            {NAV.map((n) => (
              <li key={n.href}><a href={n.href}>{n.label}</a></li>
            ))}
          </ul>
        </nav>

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
          <a className="btn" href="#contact">
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
          <motion.div
            id="mobile-menu"
            className="apple-menu"
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
                    <nav className="am-nav" aria-label="Main menu">
                      <ul className="am-list">
                        {NAV.map((n) => (
                          <motion.li className="am-item" variants={itemV} key={n.href}>
                            <a className="am-link" href={n.href} onClick={(e) => goTo(e, n.href)}>
                              {ICONS[n.href]}
                              <span>{n.label}</span>
                            </a>
                          </motion.li>
                        ))}
                        <motion.li className="am-item am-disclosure" variants={itemV}>
                          <button ref={drillRef} type="button" className="am-drill" onClick={openSub}>
                            <span className="am-label">
                              <svg className="am-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true" focusable="false"><path d="M12 3l8.5 4.5L12 12 3.5 7.5 12 3z" /><path d="M3.5 12L12 16.5 20.5 12" /></svg>
                              Categories
                            </span>
                            <span className="am-chev" aria-hidden="true">›</span>
                          </button>
                        </motion.li>
                      </ul>
                    </nav>

                    <motion.div className="am-foot" variants={itemV}>
                      <a className="btn" href="#contact" onClick={(e) => goTo(e, '#contact')}>
                        <svg className="btn-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                        Order a thumbnail
                      </a>
                      <a className="am-tg" href={TELEGRAM} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true" focusable="false"><path d="M21 4L3 11l6 2.5L21 4zM21 4l-4 16-7-6" /></svg>
                        Telegram
                        <span className="sr-only"> (opens in a new tab)</span>
                        <span className="am-ext" aria-hidden="true">↗</span>
                      </a>
                      <div className="am-brand">
                        <img src={LOGO} alt="" width="24" height="24" />
                        <span className="am-name">{BRAND}</span>
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
