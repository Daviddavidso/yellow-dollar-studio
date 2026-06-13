import { motion, useReducedMotion } from 'framer-motion'

/**
 * Scroll-reveal wrapper. Critically: when the user prefers reduced motion,
 * we render content in its final, fully-visible state (no opacity:0 trap).
 */
export default function Reveal({ children, delay = 0, y = 24, as = 'div', ...rest }) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reduce) {
    const Tag = as
    return <Tag {...rest}>{children}</Tag>
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
