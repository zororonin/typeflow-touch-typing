export default function FeatureCard({ icon, title, text }) {
  return (
    <div className="feature">
      <span className="feature__icon">{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}