import { HOME_KEYS } from '../data/typingData'

export default function Keyboard({ nextKey, lastKey, wrong, keyCount }) {
  const half = Math.ceil(HOME_KEYS.length / 2)
  const leftHand = HOME_KEYS.slice(0, half)
  const rightHand = HOME_KEYS.slice(half)

  function keyClass(k) {
    let cls = 'key'
    if (k === nextKey) cls += ' key--next'
    if (k === lastKey && keyCount > 0) cls += wrong ? ' key--miss' : ' key--hit'
    if (k === 'f' || k === 'j') cls += ' key--bump'
    return cls
  }

  // The pressed key gets a new React key on every press, so its animation replays
  const keyId = (k) => (k === lastKey ? `${k}-${keyCount}` : k)

  return (
    <div className="keyboard" aria-hidden="true">
      <div className="keyboard__row">
        {leftHand.map((k) => (
          <div key={keyId(k)} className={keyClass(k)}>
            {k.toUpperCase()}
          </div>
        ))}
        <span className="keyboard__gap" />
        {rightHand.map((k) => (
          <div key={keyId(k)} className={keyClass(k)}>
            {k.toUpperCase()}
          </div>
        ))}
      </div>
      <div key={keyId(' ')} className={`${keyClass(' ')} key--space`}>
        SPACE
      </div>
    </div>
  )
}