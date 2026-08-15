import { useRef, useState, useId } from 'react'
import Reveal from './Reveal.jsx'

export default function Contact() {
  const headId = useId()
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const refs = { name: useRef(null), contact: useRef(null), brief: useRef(null) }

  const validate = (data) => {
    const e = {}
    if (!data.name.trim()) e.name = 'Tell me your name.'
    if (!data.contact.trim()) e.contact = 'Leave a Telegram or email to reach you.'
    if (!data.brief.trim()) e.brief = 'Describe what you need.'
    return e
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    const fd = new FormData(ev.currentTarget)
    const data = {
      name: fd.get('name') || '',
      contact: fd.get('contact') || '',
      brief: fd.get('brief') || '',
    }
    const e = validate(data)
    setErrors(e)
    if (Object.keys(e).length) {
      const firstKey = ['name', 'contact', 'brief'].find((k) => e[k])
      refs[firstKey]?.current?.focus()
      setSent(false)
      return
    }
    setSent(true)
  }

  const describedBy = (key) => (errors[key] ? `${key}-error` : undefined)

  return (
    <section id="contact" className="section section--alt" aria-labelledby={headId}>
      <div className="container cta">
        <Reveal>
          <h2 id={headId} className="sr-only">Contact</h2>
          <p className="intro">
            Tell me about your channel and what you need, and I'll reply within a day
            with an idea and a price. Don't like the first draft? I'll redo it
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <form className="form" onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Your name <span className="req">*</span></label>
              <input
                ref={refs.name}
                id="name" name="name" type="text" autoComplete="name"
                required aria-required="true"
                aria-invalid={errors.name ? 'true' : undefined}
                aria-describedby={describedBy('name')}
                placeholder="e.g. Alex"
              />
              {errors.name && (
                <p id="name-error" className="field-error" role="alert">
                  <span aria-hidden="true">⚠</span>{errors.name}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="contact-field">Telegram or email <span className="req">*</span></label>
              <input
                ref={refs.contact}
                id="contact-field" name="contact" type="text" autoComplete="email"
                required aria-required="true"
                aria-invalid={errors.contact ? 'true' : undefined}
                aria-describedby={describedBy('contact')}
                placeholder="@username or mail@example.com"
              />
              {errors.contact && (
                <p id="contact-error" className="field-error" role="alert">
                  <span aria-hidden="true">⚠</span>{errors.contact}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="brief">What do you need <span className="req">*</span></label>
              <textarea
                ref={refs.brief}
                id="brief" name="brief"
                required aria-required="true"
                aria-invalid={errors.brief ? 'true' : undefined}
                aria-describedby={describedBy('brief')}
                placeholder="A thumbnail for a gaming channel, dark neon vibe…"
              />
              {errors.brief && (
                <p id="brief-error" className="field-error" role="alert">
                  <span aria-hidden="true">⚠</span>{errors.brief}
                </p>
              )}
            </div>

            <p className="form-note"><span aria-hidden="true">*</span> required fields</p>
            <button type="submit" className="btn">Send request</button>

            <p className="form-status" role="status" aria-live="polite">
              {sent && (
                <>
                  <span aria-hidden="true">✓</span>
                  Thanks! Got your request — I'll reply within a day.
                </>
              )}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
