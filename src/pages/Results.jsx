import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Stats from '../components/Stats'
import { formatTime } from '../utils/formatTime'

function feedback(wpm, accuracy) {
  if (accuracy < 85) return 'Slow down a little. Accuracy first, and speed will follow.'
  if (wpm >= 40) return 'Excellent! Fast and accurate.'
  if (wpm >= 25) return 'Great progress. Keep building your rhythm.'
  return 'Good start. Short, regular sessions will boost your speed.'
}

export default function Results() {
  const result = useSelector((s) => s.typing.lastResult)
  const navigate = useNavigate()

  if (!result) {
    return (
      <section className="section">
        <div className="container container--narrow">
          <h1>No results yet</h1>
          <p className="muted" style={{ margin: '12px 0 24px' }}>
            Finish a test to see your stats here.
          </p>
          <Link to="/practice" className="btn btn-primary btn-lg">
            Start a test
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container container--narrow">
        <span className="badge badge--live">Test complete</span>
        <h1 className="big">{result.wpm} WPM</h1>
        <p className="muted">{feedback(result.wpm, result.accuracy)}</p>

        <Stats
          className="stats--results"
          items={[
            { label: 'Accuracy', value: `${result.accuracy}%` },
            { label: 'Keys pressed', value: result.keystrokes },
            { label: 'Correct', value: result.correct },
            { label: 'Errors', value: result.errors },
            { label: 'Duration', value: formatTime(result.duration) },
          ]}
        />

        <div className="test__actions">
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/test')}>
            Try again
          </button>
          <button className="btn btn-outline btn-lg" onClick={() => navigate('/practice')}>
            New test
          </button>
        </div>
      </div>
    </section>
  )
}