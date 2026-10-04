import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import useTypingTest from '../hooks/useTypingTest'
import Keyboard from '../components/Keyboard'
import TypingPrompt from '../components/TypingPrompt'
import Stats from '../components/Stats'
import ProgressBar from '../components/ProgressBar'
import { setResult } from '../store/typingSlice'
import { formatTime } from '../utils/formatTime'

export default function Test() {
  const duration = useSelector((s) => s.typing.duration)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const t = useTypingTest({ duration })

  const inWarmup = t.phase === 'warmup'

  // When the timer ends: save the result and show the results page
  useEffect(() => {
    if (t.status === 'finished') {
      dispatch(
        setResult({
          wpm: t.wpm,
          accuracy: t.accuracy,
          errors: t.errors,
          correct: t.correct,
          keystrokes: t.keystrokes,
          duration,
        })
      )
      navigate('/results')
    }
  }, [t.status, t.wpm, t.accuracy, t.errors, t.correct, t.keystrokes, duration, dispatch, navigate])

  const expected = t.nextKey === ' ' ? 'SPACE' : (t.nextKey || '').toUpperCase()
  let hint
  if (t.wrong) hint = `Wrong key. Press ${expected} to continue.`
  else if (inWarmup) hint = 'Type both lines correctly to unlock the timed test.'
  else if (t.status === 'idle') hint = 'Warm-up complete! The timer starts with your first key.'
  else hint = 'Keep going. Press Esc to restart.'

  return (
    <section className="section">
      <div className="container container--narrow">
        <div className="test__head">
          <span className={`badge ${inWarmup ? '' : 'badge--live'}`}>
            {inWarmup ? 'Step 1 · Warm-up' : 'Step 2 · Word test'}
          </span>
          <h1>{inWarmup ? 'Warm up your fingers' : 'Type the words'}</h1>
        </div>

        <Stats
          dim={inWarmup}
          items={[
            { label: 'Time left', value: formatTime(t.timeLeft) },
            { label: 'WPM', value: t.wpm },
            { label: 'Accuracy', value: `${t.accuracy}%` },
            { label: 'Keys pressed', value: t.keystrokes },
            { label: 'Errors', value: t.errors },
          ]}
        />

        <ProgressBar
          label={inWarmup ? 'Warm-up progress' : 'Time elapsed'}
          percent={t.progress}
        />

        <TypingPrompt
          lines={t.lines}
          index={t.index}
          wrong={t.wrong}
          keyCount={t.keyCount}
          phase={t.phase}
        />

        <p className={`hint ${t.wrong ? 'hint--error' : ''}`} role="status">
          {hint}
        </p>

        <Keyboard
          nextKey={t.nextKey}
          lastKey={t.lastKey}
          wrong={t.wrong}
          keyCount={t.keyCount}
        />

        <div className="test__actions">
          <button
            className="btn btn-outline"
            onClick={(e) => {
              e.currentTarget.blur() // so the spacebar can't press this button
              t.reset()
            }}
          >
            Restart
          </button>
          <Link to="/practice" className="btn btn-outline">
            Change time
          </Link>
        </div>
      </div>
    </section>
  )
}