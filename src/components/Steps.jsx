// items = [{ title: '...', text: '...' }, ...]
export default function Steps({ items }) {
  return (
    <div className="steps">
      {items.map((s, i) => (
        <div key={s.title} className="step">
          <span className="step__num">{i + 1}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </div>
      ))}
    </div>
  )
}