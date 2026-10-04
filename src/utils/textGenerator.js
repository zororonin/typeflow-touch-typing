import { HOME_KEYS, REAL_WORDS, LINE_LENGTH } from '../data/typingData'

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)]
}

// A random 2 to 4 letter "word" made only from the allowed keys
function randomWord(keys) {
  const length = 2 + Math.floor(Math.random() * 3)
  let word = ''
  for (let i = 0; i < length; i++) word += randomItem(keys)
  return word
}

// One line of words. Every word is followed by a space.
export function makeLine(keys = HOME_KEYS) {
  const realWords = REAL_WORDS.filter((w) => [...w].every((c) => keys.includes(c)))
  const pick = () =>
    realWords.length > 0 && Math.random() < 0.6 ? randomItem(realWords) : randomWord(keys)

  let line = ''
  let word = pick()
  while (line.length + word.length + 1 <= LINE_LENGTH) {
    line += word + ' '
    word = pick()
  }
  return line
}

export function makeLines(count, keys = HOME_KEYS) {
  return Array.from({ length: count }, () => makeLine(keys))
}