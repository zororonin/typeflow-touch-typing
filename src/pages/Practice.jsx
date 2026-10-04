import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setDuration } from '../store/typingSlice'
import { HOME_KEYS } from '../data/typingData'
import { formatTime } from '../utils/formatTime'
import Steps from '../components/Steps'

const PRESETS = [
  { seconds: 60, title: '1 min', note: 'Quick sprint' },
  { seconds: 120, title: '2 min', note: 'Steady practice' },
  { seconds: 180, title: '3 min', note: 'Endurance run' },
]

const SESSION_STEPS = [
  { title: 'Warm-up', text: 'Type two lines of home-row keys correctly. No timer.' },
  { title: 'Word test', text: 'Type words made from the same keys. The timer starts on your first key.' },
  { title: 'Results', text: 'See your WPM, accuracy, keys pressed and errors.' },
]

export default function Practice() {
  const duration = useSelector((s) => s.typing.duration)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const startsAsPreset = PRESETS.some((p) => p.seconds === duration)
  const [useCustom, setUseCustom] = useState(!startsAsPreset)
  const [customMinutes, setCustomMinutes] = useState(
    startsAsPreset ? '' : String(duration / 60)
  )

  const customValue = Number(customMinutes)
  const customValid = customMinutes !== '' && customValue >= 0.5 && customValue <= 60
  const canStart = !useCustom || customValid

  function choosePreset(seconds) {
    setUseCustom(false)
    dispatch(setDuration(seconds))
  }

  function activateCustom() {
    setUseCustom(true)
    if (customValid) dispatch(setDuration(Math.round(customValue * 60)))
  }

  function handleCustomChange(e) {
    const value = e.target.value
    setCustomMinutes(value)
    const minutes = Number(value)
    if (value !== '' && minutes >= 0.5 && minutes <= 60) {
      dispatch(setDuration(Math.round(minutes * 60)))
    }
  }

  return (
    <section className="section">
      <div className="container container--narrow">
        <span className="badge">Practice setup</span>
        <h1>Choose your test length</h1>
        <p className="muted">Pick how long the timed word test should run.</p>

        <div className="durations">
          {PRESETS.map((p) => {
            const active = !useCustom && duration === p.seconds
            return (
              <button
                key={p.seconds}
                className={`dur-card ${active ? 'dur-card--active' : ''}`}
                onClick={() => choosePreset(p.seconds)}
                aria-pressed={active}
              >
                <span className="dur-card__title">{p.title}</span>
                <span className="dur-card__note">{p.note}</span>
              </button>
            )
          })}

          <label className={`dur-card ${useCustom ? 'dur-card--active' : ''}`}>
            <span className="dur-card__title">Custom</span>
            <input
              type="number"
              min="0.5"
              max="60"
              step="0.5"
              placeholder="minutes"
              value={customMinutes}
              onChange={handleCustomChange}
              onFocus={activateCustom}
              aria-label="Custom test length in minutes"
            />
            <span className="dur-card__note">0.5 to 60 minutes</span>
          </label>
        </div>

        <p className="practice__summary">
          {canStart ? (
            <>
              Test length: <b>{formatTime(duration)}</b>
            </>
          ) : (
            <span className="error-text">Enter a custom time between 0.5 and 60 minutes.</span>
          )}
        </p>

        <div className="card">
          <h2 className="card__title">How your session works</h2>
          <Steps items={SESSION_STEPS} />
        </div>

        <div className="card">
          <h2 className="card__title">Keys you will practise</h2>
          <div className="chips">
            {HOME_KEYS.map((k) => (
              <span key={k} className="key key--static">
                {k.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        <div className="practice__footer">
          <button
            className="btn btn-primary btn-lg"
            disabled={!canStart}
            onClick={() => navigate('/test')}
          >
            Start practice
          </button>
        </div>
      </div>
    </section>
  )
}