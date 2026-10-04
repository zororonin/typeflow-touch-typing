// Shows the lines the user has to type. Handles the green / highlighted / red states.
export default function TypingPrompt({
  lines,
  index,
  wrong,
  keyCount,
  phase = 'test',
  inactive = false,
  compact = false,
  maxLines = 4,
}) {
  // Work out where each line starts in the full text
  const lineData = []
  let start = 0
  for (const line of lines) {
    lineData.push({ line, start })
    start += line.length
  }

  // Show the previous line, the current line and the next ones
  const found = lineData.findIndex((l) => index < l.start + l.line.length)
  const currentLine = found === -1 ? lineData.length - 1 : found
  const firstShown = Math.max(0, currentLine - 1)
  const shown = lineData.slice(firstShown, firstShown + maxLines)

  // Alternating shake animations so every wrong key shakes again
  const shake = wrong ? (keyCount % 2 === 0 ? ' shake-a' : ' shake-b') : ''
  const className =
    [
      'prompt',
      compact && 'prompt--compact',
      inactive && 'prompt--inactive',
      wrong && 'prompt--wrong',
    ]
      .filter(Boolean)
      .join(' ') + shake

  return (
    <div key={phase} className="prompt-wrap">
      <div className={className}>
        {shown.map(({ line, start: lineStart }, li) => {
          const lineNumber = firstShown + li
          const lineClass =
            lineNumber < currentLine ? 'prompt__line prompt__line--past' : 'prompt__line'
          return (
            <div key={lineNumber} className={lineClass}>
              {line.split('').map((ch, i) => {
                const pos = lineStart + i
                let cls = 'ch'
                if (pos < index) cls += ' ch--done'
                else if (pos === index) cls += wrong ? ' ch--wrong' : ' ch--current'
                return (
                  <span key={pos} className={cls}>
                    {ch === ' ' ? '\u00a0' : ch}
                  </span>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}