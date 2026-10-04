import { Link } from 'react-router-dom'
import { HOME_KEYS } from '../data/typingData'

export default function Hero() {
  return (
    <section className="section hero">
      <div className="container">
        <span className="badge">Touch typing trainer</span>
        <h1 className="hero__title">
          Type faster.
          <br />
          <span>Think faster.</span>
        </h1>
        <p className="hero__text muted">
          Warm up your fingers on the home row, then test your speed and accuracy with real
          words. Choose your own test length.
        </p>

        <div className="hero__actions">
          <Link to="/practice" className="btn btn-primary btn-lg">
            Start practicing
          </Link>
          <a href="#demo" className="btn btn-outline btn-lg">
            Try the demo
          </a>
        </div>

        <div className="hero__keys" aria-hidden="true">
          {HOME_KEYS.map((k) => (
            <span key={k} className="key key--static">
              {k.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}