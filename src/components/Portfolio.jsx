import { useMemo, useState, useId, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'

const NICHES = [
  { key: 'gaming', label: 'Gaming' },
  { key: 'trading', label: 'Trading' },
  { key: 'crypto', label: 'Crypto' },
  { key: 'entertainment', label: 'Entertainment' },
  { key: 'blogs', label: 'Blogs' },
  { key: 'food', label: 'Food Review' },
]

const CATEGORIES = [{ key: 'all', label: 'All' }, ...NICHES]

// Real YouTube-thumbnail work — category and alt text match each thumbnail's actual content.
const BASE = import.meta.env.BASE_URL
const WORKS = [
  { n: 1, cat: 'trading', alt: "YouTube thumbnail: 'monetize' — a creator beside a whiteboard graph climbing from 0 to 50K" },
  { n: 2, cat: 'crypto', alt: "YouTube thumbnail: 'Real Winner' — an AI-app comparison with a young woman" },
  { n: 3, cat: 'food', alt: 'YouTube thumbnail: a giant purple burger held to camera with a McDonald’s logo' },
  { n: 4, cat: 'trading', alt: "YouTube thumbnail: 'DAY 14' — a young man holding cash in front of luxury sports cars and a mansion" },
  { n: 5, cat: 'entertainment', alt: 'YouTube thumbnail: a man in bed with a ghostly figure and a one-star Airbnb review' },
  { n: 6, cat: 'gaming', alt: 'YouTube thumbnail: a survivor holding a machete on a tropical beach beside a bamboo raft' },
  { n: 7, cat: 'blogs', alt: 'YouTube thumbnail: a man testing a Chinese survival ration pack at the Great Wall of China' },
  { n: 8, cat: 'trading', alt: "YouTube thumbnail: 'Every Thursday' — a trader in a suit beside a candlestick chart marked 'Order Block'" },
  { n: 9, cat: 'crypto', alt: "YouTube thumbnail: 'Master the AI World' — chatbots, automations and workflows with an Anonymous mask" },
  { n: 10, cat: 'trading', alt: "YouTube thumbnail: 'I stay silent, my results and students speak' — trading dashboards and win rates" },
  { n: 11, cat: 'trading', alt: 'YouTube thumbnail: income growth from $5K to $20K with a vintage car and a red Ferrari' },
  { n: 12, cat: 'trading', alt: "YouTube thumbnail: 'Sniper Entry every time' — a trader beside a candlestick chart with marked entries" },
].map((w) => ({
  id: `thumb-${w.n}`,
  cat: w.cat,
  src: `${BASE}works/thumbs/thumb-${w.n}.png`,
  alt: w.alt,
}))

const catLabel = (key) => CATEGORIES.find((c) => c.key === key)?.label ?? ''

export default function Portfolio() {
  const [active, setActive] = useState('all')
  const reduce = useReducedMotion()
  const headId = useId()

  const items = useMemo(
    () => (active === 'all' ? WORKS : WORKS.filter((w) => w.cat === active)),
    [active],
  )

  // Allow the mobile menu's "Categories" to drive the filter.
  useEffect(() => {
    const onFilter = (e) => { if (e.detail) setActive(e.detail) }
    window.addEventListener('yd:filter', onFilter)
    return () => window.removeEventListener('yd:filter', onFilter)
  }, [])

  return (
    <section id="work" className="section section--alt" aria-labelledby={headId}>
      <div className="container">
        <Reveal>
          <div className="work-head">
            <h2 id={headId} className="h2">Selected work</h2>
            <p className="intro">Real thumbnails, filtered by niche.</p>
          </div>
        </Reveal>

        <div className="chips" role="group" aria-label="Filter work by category">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              className="chip"
              aria-pressed={active === c.key}
              onClick={() => setActive(c.key)}
            >
              {active === c.key && (
                <svg className="chip-check" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M3 8.5l3 3 7-7" /></svg>
              )}
              {c.label}
            </button>
          ))}
        </div>

        <p className="sr-only" role="status">
          Showing: {catLabel(active)}. Total: {items.length}.
        </p>

        <div className="gallery">
          {items.map((w) => (
            <motion.figure
              key={w.id}
              className="work"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.28, 0.11, 0.32, 1] }}
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
        </div>
      </div>
    </section>
  )
}
