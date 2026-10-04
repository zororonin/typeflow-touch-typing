// The only keys the app asks the user to type.
export const HOME_KEYS = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']

// Step 1 of every session: the user types these two lines correctly (no timer).
// They are written for the 8 keys above.
export const WARMUP_LINES = [
  'asdf jkl; asdf jkl; asdf jkl; ',
  'fdsa ;lkj fdsa ;lkj fdsa ;lkj',
]

// Real words that can be built from the allowed keys.
export const REAL_WORDS = [
  'ask', 'asks', 'add', 'adds', 'all', 'alas', 'as', 'ad', 'sad', 'dad',
  'dads', 'fad', 'fads', 'lad', 'lads', 'lass', 'fall', 'falls', 'flask',
  'flasks', 'salad', 'salads', 'salsa', 'alfalfa',
]

// Maximum characters per line in the word test
export const LINE_LENGTH = 28