import { useReducer, useEffect, useCallback } from 'react'
import { HOME_KEYS, WARMUP_LINES } from '../data/typingData'
import { makeLines } from '../utils/textGenerator'

const LINES_AT_START = 8
const LINES_PER_EXTEND = 4

function createInitialState(duration, testLines, warmup) {
  const base = {
    pendingLines: [],   // word lines waiting for the warm-up to finish
    index: 0,           // position of the next character to type
    correct: 0,         // correct key presses (word test only)
    errors: 0,          // wrong key presses (word test only)
    keyCount: 0,        // total key presses (re-triggers key animations)
    lastKey: null,
    wrong: false,       // was the last key wrong? (the display turns red)
    status: 'idle',     // 'idle' | 'running' | 'finished'
    startedAt: null,    // timestamp of the first key in the word test
    timeLeft: duration,
  }

  if (warmup) {
    return {
      ...base,
      phase: 'warmup',
      lines: WARMUP_LINES,
      text: WARMUP_LINES.join(''),
      pendingLines: testLines,
    }
  }
  return { ...base, phase: 'test', lines: testLines, text: testLines.join('') }
}

function reducer(state, action) {
  switch (action.type) {
    case 'RESET':
      return createInitialState(action.duration, action.testLines, action.warmup)

    case 'KEY': {
      if (state.status === 'finished') return state

      const isCorrect = action.key === state.text[state.index]
      const index = isCorrect ? state.index + 1 : state.index // a wrong key never advances

      const next = {
        ...state,
        index,
        lastKey: action.key,
        keyCount: state.keyCount + 1,
        wrong: !isCorrect,
      }

      // Word test: count stats, and start the timer on the first key
      if (state.phase === 'test') {
        next.status = 'running'
        next.startedAt = state.startedAt ?? action.now
        next.correct = state.correct + (isCorrect ? 1 : 0)
        next.errors = state.errors + (isCorrect ? 0 : 1)
        return next
      }

      // Warm-up finished: switch to the timed word test
      if (isCorrect && index >= state.text.length) {
        return {
          ...next,
          phase: 'test',
          lines: state.pendingLines,
          text: state.pendingLines.join(''),
          pendingLines: [],
          index: 0,
          wrong: false,
        }
      }

      return next
    }

    case 'TICK':
      if (state.status !== 'running') return state
      return {
        ...state,
        timeLeft: action.timeLeft,
        status: action.timeLeft <= 0 ? 'finished' : 'running',
      }

    case 'EXTEND':
      return {
        ...state,
        lines: [...state.lines, ...action.lines],
        text: state.text + action.lines.join(''),
      }

    default:
      return state
  }
}

/**
 * useTypingTest({ duration, keys, warmup, enabled })
 *   duration: word-test length in seconds
 *   keys:     allowed characters
 *   warmup:   true = 2 warm-up lines first, false = straight into words (Home demo)
 *   enabled:  false = ignore the keyboard (Home demo until it is clicked)
 */
export default function useTypingTest({
  duration = 60,
  keys = HOME_KEYS,
  warmup = true,
  enabled = true,
} = {}) {
  const [state, dispatch] = useReducer(reducer, null, () =>
    createInitialState(duration, makeLines(LINES_AT_START, keys), warmup)
  )

  const reset = useCallback(() => {
    dispatch({
      type: 'RESET',
      duration,
      testLines: makeLines(LINES_AT_START, keys),
      warmup,
    })
  }, [duration, keys, warmup])

  // Start fresh whenever the settings change
  useEffect(() => {
    reset()
  }, [reset])

  // Keyboard listener
  useEffect(() => {
    if (!enabled) return

    function onKeyDown(event) {
      if (event.ctrlKey || event.metaKey || event.altKey) return
      if (event.key === 'Escape') {
        reset()
        return
      }
      if (event.key.length !== 1) return // ignore Shift, Tab, Enter, arrows...
      event.preventDefault() // stops the spacebar from scrolling the page
      dispatch({ type: 'KEY', key: event.key.toLowerCase(), now: Date.now() })
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [enabled, reset])

  // Timer: runs only during the word test, starting at the first key
  useEffect(() => {
    if (state.status !== 'running') return
    const id = setInterval(() => {
      const elapsed = (Date.now() - state.startedAt) / 1000
      dispatch({ type: 'TICK', timeLeft: Math.max(0, Math.ceil(duration - elapsed)) })
    }, 200)
    return () => clearInterval(id)
  }, [state.status, state.startedAt, duration])

  // Keep the word test supplied with text
  useEffect(() => {
    if (state.phase !== 'test') return
    if (state.text.length - state.index < 120) {
      dispatch({ type: 'EXTEND', lines: makeLines(LINES_PER_EXTEND, keys) })
    }
  }, [state.phase, state.index, state.text.length, keys])

  // Derived stats
  const keystrokes = state.correct + state.errors
  const elapsed =
    state.phase === 'warmup'
      ? 0
      : state.status === 'finished'
        ? duration
        : duration - state.timeLeft
  const minutes = Math.max(elapsed, 1) / 60
  const wpm = Math.round(state.correct / 5 / minutes) // standard: 5 characters = 1 word
  const accuracy = keystrokes === 0 ? 100 : Math.round((state.correct / keystrokes) * 100)
  const progress =
    state.phase === 'warmup'
      ? Math.round((state.index / state.text.length) * 100)
      : Math.min(100, Math.round((elapsed / duration) * 100))

  return {
    phase: state.phase,
    lines: state.lines,
    index: state.index,
    nextKey: state.text[state.index],
    lastKey: state.lastKey,
    keyCount: state.keyCount,
    wrong: state.wrong,
    status: state.status,
    timeLeft: state.timeLeft,
    correct: state.correct,
    errors: state.errors,
    keystrokes,
    wpm,
    accuracy,
    progress,
    reset,
  }
}