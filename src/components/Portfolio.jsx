import { useMemo, useState, useId, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'

const NICHES = [
  { key: 'gaming', label: 'Gaming' },
  { key: 'trading', label: 'Trading' },
  { key: 'crypto', label: 'Crypto' },
  { key: 'entertainment', label: 'Entertainment' },
  { key: 'blogs', label: 'Blogs' },
  { key: 'food', label: 'Food Review' },
]

const CATEGORIES = [{ key: 'all', label: 'Все' }, ...NICHES]

// Real YouTube-thumbnail work; niche assigned round-robin across the 6 categories.
const THUMB_COUNT = 12
const WORKS = Array.from({ length: THUMB_COUNT }, (_, i) => {
  const niche = NICHES[i % NICHES.length]
  return {
    id: `thumb-${i + 1}`,
    cat: niche.key,
    src: `${import.meta.env.BASE_URL}works/thumbs/thumb-${i + 1}.png`,
    alt: `YouTube-превью — пример работы №${i + 1} (${niche.label})`,
  }
})

const catLabel = (key) => CATEGORIES.find((c) => c.key === key)?.label ?? ''

export default function Portfolio() {
  const [active, setActive] = useState('all')
  const reduce = useReducedMotion()
  const headId = useId()

  const items = useMemo(
    () => (active === 'all' ? WORKS : WORKS.filter((w) => w.cat === active)),
    [active],
  )

  // Allow the mobile menu's "Категории" to drive the filter.
  useEffect(() => {
    const onFilter = (e) => { if (e.detail) setActive(e.detail) }
    window.addEventListener('yd:filter', onFilter)
    return () => window.removeEventListener('yd:filter', onFilter)
  }, [])

  return (
    <section id="work" className="section section--alt" aria-labelledby={headId}>
      <div className="container">
        <Reveal className="work-head">
          <p className="eyebrow">Работы</p>
          <h2 id={headId} className="h2">Избранные проекты.</h2>
        </Reveal>

        <div className="chips" role="group" aria-label="Фильтр работ по категории">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              className="chip"
              aria-pressed={active === c.key}
              onClick={() => setActive(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <p className="sr-only" role="status">
          Показаны работы: {catLabel(active)}. Всего: {items.length}.
        </p>

        <motion.div layout={!reduce} className="gallery">
          <AnimatePresence mode="popLayout">
            {items.map((w) => (
              <motion.figure
                key={w.id}
                className="work"
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.28, 0.11, 0.32, 1] }}
              >
                <img
                  className="work-img"
                  src={w.src}
                  alt={w.alt}
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
