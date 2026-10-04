import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <nav className="footer__links">
          <Link to="/">Home</Link>
          <Link to="/practice">Practice</Link>
          <Link to="/about">About</Link>
        </nav>
        <p>© {new Date().getFullYear()} TypeFlow · Built with React</p>
      </div>
    </footer>
  )
}