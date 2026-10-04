import { Link } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard'
import Steps from '../components/Steps'

const FEATURES = [
  { icon: '⚡', title: 'Speed', text: 'Track your words per minute in real time.' },
  { icon: '🎯', title: 'Accuracy', text: 'See every mistake and learn to reduce them.' },
  { icon: '⚙️', title: 'Custom tests', text: 'Choose 1, 2 or 3 minutes, or your own length.' },
  { icon: '⌨️', title: 'On-screen keyboard', text: 'The next key is highlighted so you can keep your eyes on the screen.' },
]

const STEPS = [
  { title: 'Choose your settings', text: 'Pick how long your word test should be.' },
  { title: 'Warm up', text: 'Type two lines of home-row keys correctly.' },
  { title: 'Take the test', text: 'Type words built from the same keys against the clock.' },
  { title: 'Review your results', text: 'Check your WPM, accuracy and errors, then go again.' },
]

const TECH = ['React', 'Vite', 'Redux Toolkit', 'React Router', 'CSS3']

export default function About() {
  return (
    <>
      <section className="section">
        <div className="container container--narrow">
          <span className="badge">About</span>
          <h1>About TypeFlow</h1>
          <p className="prose">
            TypeFlow is an interactive touch typing trainer. It focuses on the eight home-row
            keys (A S D F J K L ;), the foundation of fast and accurate typing. Every session
            starts with a short warm-up, then moves into a timed test made of real and practice
            words.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <h2 className="section__title">What you get</h2>
          <div className="features">
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <h2 className="section__title">How it works</h2>
          <Steps items={STEPS} />
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container--narrow">
          <h2 className="section__title">Built with</h2>
          <div className="tech">
            {TECH.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
          <div className="practice__footer">
            <Link to="/practice" className="btn btn-primary btn-lg">
              Start practicing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}