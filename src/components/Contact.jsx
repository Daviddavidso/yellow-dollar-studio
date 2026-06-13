import { useRef, useState, useId } from 'react'
import Reveal from './Reveal.jsx'

export default function Contact() {
  const headId = useId()
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const refs = { name: useRef(null), contact: useRef(null), brief: useRef(null) }

  const validate = (data) => {
    const e = {}
    if (!data.name.trim()) e.name = 'Укажите, как к вам обращаться.'
    if (!data.contact.trim()) e.contact = 'Оставьте Telegram или email для связи.'
    if (!data.brief.trim()) e.brief = 'Опишите, что нужно сделать.'
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
          <p className="eyebrow">Контакты</p>
          <h2 id={headId} className="h2">Сделаем канал заметным.</h2>
          <p className="intro">
            Расскажите про канал и задачу — отвечу в течение дня с идеей и сроком.
            Не понравится первый эскиз — переделаю.
          </p>
          <div className="link-row">
            <a className="chev big" href="https://t.me/+9MEj4JSWp8FkNDNh" target="_blank" rel="noopener noreferrer">
              Написать в Telegram <span className="c" aria-hidden="true">›</span>
              <span className="sr-only">(откроется в новой вкладке)</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form className="form" onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Как к вам обращаться <span className="req">*</span></label>
              <input
                ref={refs.name}
                id="name" name="name" type="text" autoComplete="name"
                required aria-required="true"
                aria-invalid={errors.name ? 'true' : undefined}
                aria-describedby={describedBy('name')}
                placeholder="Например, Алексей"
              />
              {errors.name && (
                <p id="name-error" className="field-error" role="alert">
                  <span aria-hidden="true">⚠</span>{errors.name}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="contact-field">Telegram или email <span className="req">*</span></label>
              <input
                ref={refs.contact}
                id="contact-field" name="contact" type="text" autoComplete="email"
                required aria-required="true"
                aria-invalid={errors.contact ? 'true' : undefined}
                aria-describedby={describedBy('contact')}
                placeholder="@username или mail@example.com"
              />
              {errors.contact && (
                <p id="contact-error" className="field-error" role="alert">
                  <span aria-hidden="true">⚠</span>{errors.contact}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="brief">Что нужно сделать <span className="req">*</span></label>
              <textarea
                ref={refs.brief}
                id="brief" name="brief"
                required aria-required="true"
                aria-invalid={errors.brief ? 'true' : undefined}
                aria-describedby={describedBy('brief')}
                placeholder="Шапка для YouTube-канала про геймдев, тёмный неон…"
              />
              {errors.brief && (
                <p id="brief-error" className="field-error" role="alert">
                  <span aria-hidden="true">⚠</span>{errors.brief}
                </p>
              )}
            </div>

            <p className="form-note"><span aria-hidden="true">*</span> — обязательные поля</p>
            <button type="submit" className="btn">Отправить заявку</button>

            <p className="form-status" role="status" aria-live="polite">
              {sent && (
                <>
                  <span aria-hidden="true">✓</span>
                  Спасибо! Заявка принята — отвечу в течение дня.
                </>
              )}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
