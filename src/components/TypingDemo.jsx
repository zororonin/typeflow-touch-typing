import { useState } from 'react'
import { Link } from 'react-router-dom'
import useTypingTest from '../hooks/useTypingTest'
import TypingPrompt from './TypingPrompt'
import Stats from './Stats'
import { formatTime } from '../utils/formatTime'

export default function TypingDemo() {
  const [active, setActive] = useState(false)
  const t = useTypingTest({ duration: 30, warmup: false, enabled: active })
  const finished = t.status === 'finished'

  return (
    <div className="card demo">
      <div
        className={`demo__area ${active ? 'demo__area--active' : ''}`}
        tabIndex={0}
        role="group"
        aria-label="Typing demo. Click here and start typing."
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      >
        <TypingPrompt
          lines={t.lines}
          index={t.index}
          wrong={t.wrong}
          keyCount={t.keyCount}
          phase={t.phase}
          inactive={!active}
          compact
          maxLines={3}
        />
        {!active && !finished && (
          <div className="demo__overlay">
            <span className="demo__pill">Click here and start typing</span>
          </div>
        )}
      </div>

      <Stats
        className="stats--demo"
        items={[
          { label: 'Time left', value: formatTime(t.timeLeft) },
          { label: 'WPM', value: t.wpm },
          { label: 'Accuracy', value: `${t.accuracy}%` },
        ]}
      />

      <p className="demo__note muted">
        {finished ? (
          <>
            Time is up: <b>{t.wpm} WPM</b> at <b>{t.accuracy}%</b> accuracy. Press Esc to try
            again, or{' '}
            <Link to="/practice" className="text-link">
              start a full session
            </Link>
            .
          </>
        ) : (
          'Best on a physical keyboard. A wrong key turns the box red until you fix it.'
        )}
      </p>
    </div>
  )
}