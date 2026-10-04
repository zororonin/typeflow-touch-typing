import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" onClick={close}>
          Type<span>Flow</span>
        </Link>

        <button
          className="navbar__toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? '✕' : '☰'}
        </button>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/practice" onClick={close}>Practice</NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
          <Link to="/practice" className="btn btn-primary" onClick={close}>
            Start Test
          </Link>
        </nav>
      </div>
    </header>
  )
}