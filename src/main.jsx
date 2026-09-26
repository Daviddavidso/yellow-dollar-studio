import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/*
  Input-modality switch. The client does not want a form field to change at all when
  it is clicked, but a keyboard user still needs to see where focus went (2.4.7), and
  a text input matches :focus-visible on pointer clicks too — so :focus-visible alone
  cannot tell the two apart. Starts as 'keyboard' so someone who tabs before touching
  a pointer is covered.
*/
const root = document.documentElement
const NAV_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown']
addEventListener('pointerdown', () => root.setAttribute('data-input', 'pointer'), true)
addEventListener('keydown', (e) => {
  // Inside a text control only Tab counts as navigating. Arrows and Home/End there are
  // just moving the caret — flipping on those would pop the focus edge back in for
  // someone who clicked into the field and is simply editing.
  const inText = e.target?.matches?.('textarea, input:not([type=range])')
  if (e.key === 'Tab' || (!inText && NAV_KEYS.includes(e.key))) {
    root.setAttribute('data-input', 'keyboard')
  }
}, true)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
