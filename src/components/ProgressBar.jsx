export default function ProgressBar({ label, percent }) {
  return (
    <div className="progress-wrap">
      <div className="progress-label">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div
        className="progress"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress__bar" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}