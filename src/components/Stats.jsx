// items = [{ label: 'WPM', value: 42 }, ...]
export default function Stats({ items, dim = false, className = '' }) {
  return (
    <div className={`stats ${dim ? 'stats--dim' : ''} ${className}`}>
      {items.map((item) => (
        <div key={item.label} className="stat">
          <span className="stat__label">{item.label}</span>
          <span className="stat__value">{item.value}</span>
        </div>
      ))}
    </div>
  )
}