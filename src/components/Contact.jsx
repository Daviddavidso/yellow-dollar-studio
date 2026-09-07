import { useRef, useState, useId } from 'react'
import Reveal from './Reveal.jsx'
import { FORM_ENDPOINT, TELEGRAM, X_URL, REPLY_TIME } from '../site.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const TgIcon = () => (
  <svg className="btn-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true" focusable="false"><path d="M21 4L3 11l6 2.5L21 4zM21 4l-4 16-7-6" /></svg>
)
const XIcon = () => (
  <svg className="btn-ico" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M18.9 2H22l-7.4 8.5L23 22h-6.8l-5.3-7-6.1 7H1.7l7.9-9L0 2h7l4.8 6.4L18.9 2zm-1.2 18h1.9L6.4 3.9H4.4L17.7 20z" /></svg>
)

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
          <h2 id={headId} className="h2">Let's make your next video click</h2>
          <p className="intro">
            Tell me about the video and what you need. I reply {REPLY_TIME} with a concept and a price.
            Don't like the first draft? I redo it.
          </p>
          <div className="contact-links">
            <a className="btn btn-ghost" href={TELEGRAM} target="_blank" rel="noopener noreferrer">
              <TgIcon />
              Message on Telegram<span className="sr-only"> (opens in a new tab)</span>
            </a>
            {X_URL && (
              <a className="btn btn-ghost" href={X_URL} target="_blank" rel="noopener noreferrer">
                <XIcon />
                DM on X<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form className="form" onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input
                ref={refs.name}
                id="name" name="name" type="text" autoComplete="name"
                required aria-required="true"
                aria-invalid={errors.name ? 'true' : undefined}
                aria-describedby={describedBy('name')}
                placeholder="e.g. Alex"
              />
              {errors.name && (
                <p id="name-error" className="field-error">
                  <span aria-hidden="true">⚠</span>{errors.name}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                ref={refs.email}
                id="email" name="email" type="email" autoComplete="email" inputMode="email"
                required aria-required="true"
                aria-invalid={errors.email ? 'true' : undefined}
                aria-describedby={describedBy('email')}
                placeholder="name@example.com"
              />
              {errors.email && (
                <p id="email-error" className="field-error">
                  <span aria-hidden="true">⚠</span>{errors.email}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="message">Message <span className="opt">(optional)</span></label>
              <textarea
                id="message" name="message"
                placeholder="Video title, a link, and what you're going for"
              />
            </div>

            <button type="submit" className="btn" aria-disabled={status === 'sending' ? 'true' : undefined}>
              Send request
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
