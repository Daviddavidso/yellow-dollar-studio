// ---------------------------------------------------------------------------
// Site content & config. Everything the client is likely to change lives here.
// PLACEHOLDER = demo data that must be replaced with the client's real numbers.
// ---------------------------------------------------------------------------

export const BRAND = 'Yellow Dollar Studio'

// Direct contact links. X is hidden until a handle is set (e.g. 'https://x.com/handle').
export const TELEGRAM = 'https://t.me/+9MEj4JSWp8FkNDNh'
export const X_URL = ''

// Form endpoint. Leave empty to run the form in demo mode (validates, shows the
// success message, sends nothing). To go live use e.g. Formspree:
//   'https://formspree.io/f/XXXXXXXX'   or FormSubmit: 'https://formsubmit.co/ajax/you@mail.com'
export const FORM_ENDPOINT = ''

export const TURNAROUND = '24–48 hours'
export const REPLY_TIME = 'within 24 hours'
export const REVISIONS = 2

export const NAV = [
  { href: '#cases', label: 'Before / After' },
  { href: '#work', label: 'Work' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

// Before / After cases. PLACEHOLDER: "before" frames are cut from the same
// thumbnails for the demo; metrics are example figures (the first pair is from the brief).
export const CASES = [
  {
    id: 'sniper',
    niche: 'Trading',
    title: 'Sniper entry strategy',
    before: 'works/before/case-1.jpg',
    after: 'works/thumbs/thumb-12.png',
    beforeAlt: 'A plain vertical webcam frame of a smiling trader on a blurred background, no text or graphics',
    afterAlt: "'Sniper Entry — Every Time' in bold yellow over a candlestick chart with marked entries, the trader on the right",
    metrics: [
      { label: 'CTR', from: '3.2%', to: '8.7%' },
      { label: 'Views in a week', value: '+140K' },
    ],
  },
  {
    id: 'day14',
    niche: 'Finance',
    title: '14-day money challenge',
    before: 'works/before/case-2.jpg',
    after: 'works/thumbs/thumb-4.png',
    beforeAlt: 'A plain vertical frame of a young man looking at the camera on a blurred background, no text',
    afterAlt: "'DAY 14' — the same man holding a stack of cash in front of a sports car and a mansion",
    metrics: [
      { label: 'CTR', from: '2.9%', to: '7.1%' },
      { label: 'Views in a week', value: '+96K' },
    ],
  },
  {
    id: 'income',
    niche: 'Finance',
    title: 'Income growth story',
    before: 'works/before/case-3.jpg',
    after: 'works/thumbs/thumb-11.png',
    beforeAlt: 'A plain vertical frame of a man in a red jacket on a blurred background, no text',
    afterAlt: "'Last month $5K → Last 30 days $20K' — the man between a vintage car and a red Ferrari",
    metrics: [
      { label: 'CTR', from: '4.1%', to: '9.3%' },
      { label: 'Views in a week', value: '+210K' },
    ],
  },
]

// Pricing. PLACEHOLDER ranges — confirm with the client. price = [low, high] in USD.
export const PRICING = [
  {
    id: 'single',
    name: 'Single thumbnail',
    price: ['$35', '$50'],
    unit: 'per thumbnail',
    tagline: 'One video, one strong concept.',
    features: [
      'Concept before design',
      `${REVISIONS} rounds of edits included`,
      'Delivered in 24–48 hours',
      '1280×720 JPG/PNG, YouTube-ready',
    ],
  },
  {
    id: 'pack',
    name: 'Pack of 5',
    price: ['$150', '$200'],
    unit: 'per pack, $30 to $40 each',
    tagline: 'A consistent look across a series.',
    popular: true,
    features: [
      'Everything in Single',
      'Consistent channel style',
      'Priority in the queue',
      'A/B variant for one video',
    ],
  },
  {
    id: 'monthly',
    name: 'Monthly',
    price: ['$450', '$700'],
    unit: 'per month, 12 to 16 thumbnails',
    tagline: 'A designer on call for your channel.',
    features: [
      'Everything in Pack',
      '24-hour turnaround',
      'A/B variants for every video',
      'Channel banner refresh included',
    ],
  },
]

export const STEPS = [
  {
    title: 'Request',
    text: `Send the video title, a link or a few frames, and what you're going for. You get a reply ${REPLY_TIME} with a concept and a price.`,
  },
  {
    title: 'Brief & edits',
    text: `We lock the concept in a short brief, the first draft lands in 24 hours, and you get ${REVISIONS} rounds of edits.`,
  },
  {
    title: 'Delivery',
    text: 'Final files in 1280×720, plus A/B variants if ordered, within 48 hours of the brief.',
  },
]

export const FAQ = [
  {
    q: 'What do you need from me?',
    a: 'The video title, a short description or a link, two or three frames or photos of you (or your logo), and any thumbnail style you like. That is enough to start.',
  },
  {
    q: 'How long does it take?',
    a: 'The first draft lands in 24 hours, the final files within 48. If it is urgent, say so in the request and we will find a way.',
  },
  {
    q: 'How many revisions do I get?',
    a: `${REVISIONS} rounds of edits are included in every price. Extra rounds are $10 each.`,
  },
  {
    q: "What if I don't like it?",
    a: 'We agree on a concept before any design starts, so surprises are rare. If the first draft still misses, we redo it from scratch at no extra cost.',
  },
  {
    q: 'What do I get in the end?',
    a: '1280×720 JPG or PNG under 2 MB, ready to upload. Layered source files are available on request.',
  },
]
