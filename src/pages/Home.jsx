import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import TypingDemo from '../components/TypingDemo'
import FeatureCard from '../components/FeatureCard'
import Steps from '../components/Steps'

const FEATURES = [
  {
    icon: '⌨️',
    title: 'Home-row focus',
    text: 'Train the eight keys your fingers rest on: A S D F J K L ;',
  },
  {
    icon: '⏱️',
    title: 'Your own pace',
    text: 'Pick a 1, 2 or 3 minute test, or set any custom length.',
  },
  {
    icon: '🎯',
    title: 'Live feedback',
    text: 'Watch WPM, accuracy and errors update as you type.',
  },
  {
    icon: '🔴',
    title: 'Instant error signal',
    text: 'The display turns red on a wrong key until you correct it.',
  },
]

const STEPS = [
  { title: 'Choose your time', text: 'Select 1, 2 or 3 minutes, or enter a custom length.' },
  { title: 'Warm up', text: 'Type two lines of home-row keys correctly to get started.' },
  { title: 'Type the words', text: 'The timer starts on your first key in the word test.' },
]

export default function Home() {
  return (
    <>
      <Hero />

      <section id="demo" className="section section--alt">
        <div className="container container--narrow">
          <h2 className="section__title">Try it yourself</h2>
          <p className="section__sub muted">
            A 30 second taste of the word test. No setup needed.
          </p>
          <TypingDemo />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">Why TypeFlow?</h2>
          <p className="section__sub muted">Simple, focused and built for real practice.</p>
          <div className="features">
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container--narrow">
          <h2 className="section__title">How it works</h2>
          <Steps items={STEPS} />
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <div className="cta">
            <h2>Ready to improve your typing?</h2>
            <p>Your first session takes less than two minutes.</p>
            <Link to="/practice" className="btn btn-light btn-lg">
              Start practicing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}