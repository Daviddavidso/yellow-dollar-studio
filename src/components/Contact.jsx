import { useRef, useState, useId } from 'react'
import Reveal from './Reveal.jsx'
import { FORM_ENDPOINT, REPLY_TIME } from '../site.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function Contact() {
  const headId = useId()
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const refs = { name: useRef(null), email: useRef(null) }
  const statusRef = useRef(null)

  const validate = (d) => {
    const e = {}
    if (!d.name.trim()) e.name = 'Tell me your name.'
    if (!d.email.trim()) e.email = 'Leave an email so I can reply.'
    else if (!EMAIL_RE.test(d.email.trim())) e.email = 'Enter an email like name@example.com.'
    return e
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    if (status === 'sending') return
    const form = ev.currentTarget
    const fd = new FormData(form)
    const data = {
      name: fd.get('name') || '',
      email: fd.get('email') || '',
      message: fd.get('message') || '',
    }
    const e = validate(data)
    setErrors(e)
    if (Object.keys(e).length) {
      const firstKey = ['name', 'email'].find((k) => e[k])
      refs[firstKey]?.current?.focus()
      setStatus('idle')
      return
    }
    setStatus('sending')
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
      } else {
        // Demo mode: no endpoint configured (see src/site.js) — nothing is sent anywhere.
        console.warn('[contact] FORM_ENDPOINT is empty: the request was not sent.')
        await new Promise((r) => setTimeout(r, 500))
      }
      setStatus('sent')
      form.reset()
    } catch (err) {
      setStatus('error')
    }
    // Move focus to the outcome so it is announced and never hidden by the fixed header.
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  const describedBy = (key) => (errors[key] ? `${key}-error` : undefined)

  return (
    <section id="contact" className="section" aria-labelledby={headId}>
      <div className="container cta">
        <Reveal>
          <div className="section-head">
            <h2 id={headId} className="h2">Contact</h2>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <form className="form" onSubmit={onSubmit} noValidate aria-labelledby={headId}>
            {/* Labels are visually hidden to match the reference design; the placeholder
                is the visible cue, the label is the accessible name (a placeholder alone
                disappears the moment you type). */}
            <div className="form-row">
              <div className="field">
                <label className="sr-only" htmlFor="name">Your Name</label>
                <input
                  ref={refs.name}
                  id="name" name="name" type="text" autoComplete="name"
                  required aria-required="true"
                  aria-invalid={errors.name ? 'true' : undefined}
                  aria-describedby={describedBy('name')}
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p id="name-error" className="field-error">
                    <span aria-hidden="true">⚠</span>{errors.name}
                  </p>
                )}
              </div>

              <div className="field">
                <label className="sr-only" htmlFor="email">Your Email</label>
                <input
                  ref={refs.email}
                  id="email" name="email" type="email" autoComplete="email" inputMode="email"
                  required aria-required="true"
                  aria-invalid={errors.email ? 'true' : undefined}
                  aria-describedby={describedBy('email')}
                  placeholder="Your Email"
                />
                {errors.email && (
                  <p id="email-error" className="field-error">
                    <span aria-hidden="true">⚠</span>{errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="field">
              <label className="sr-only" htmlFor="message">Your Message (optional)</label>
              <textarea
                id="message" name="message"
                placeholder="Your Message (optional)"
              />
            </div>

            <button type="submit" className="btn" aria-disabled={status === 'sending' ? 'true' : undefined}>
              Send
            </button>

            <p
              ref={statusRef}
              tabIndex={-1}
              className={`form-status${status === 'error' ? ' is-error' : ''}`}
              role="status"
              aria-live="polite"
            >
              {status === 'sending' && 'Sending…'}
              {status === 'sent' && (
                <>
                  <span aria-hidden="true">✓</span>
                  Thanks! Got your request. I'll reply {REPLY_TIME}.
                </>
              )}
              {status === 'error' && "Couldn't send the form. Message me on Telegram instead."}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
