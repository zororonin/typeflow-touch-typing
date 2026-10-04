# TypeFlow – Touch Typing Trainer

An interactive touch typing practice app built with React. It trains the eight home-row keys
**A S D F J K L ;** with a short warm-up, then a timed word test.

**Live demo:** _add your deployed link here_

## Features

- **Custom test length:** 1, 2 or 3 minutes, or any custom time from 0.5 to 60 minutes
- **Two-step session:** type two warm-up lines correctly, then the timed word test starts
- **Word test:** real words (`ask`, `salad`, `flask`) mixed with practice combinations, built only from the allowed keys
- **Instant error feedback:** the typing display turns red and shakes on a wrong key, and stays red until the correct key is pressed
- **Next-key indicator:** an on-screen keyboard highlights the next key and flashes each key you press
- **Live stats:** time left, WPM, accuracy, keys pressed and errors, plus a progress bar
- **Results page:** final WPM, accuracy, keys pressed, correct keys, errors and duration
- **Home page demo:** a 30 second typing demo, features and how-it-works sections
- **Responsive design:** works on desktop and mobile, with a collapsible navbar

## How it works

| Metric | Calculation |
|---|---|
| WPM | correct keys ÷ 5 ÷ minutes elapsed (standard: 5 characters = 1 word) |
| Accuracy | correct key presses ÷ total key presses × 100 |
| Keys pressed | correct + wrong key presses in the timed word test |

- A wrong key never moves the cursor forward, so the user must correct it.
- The timer starts on the first key of the word test, not when the page loads.
- The warm-up is not timed and is not counted in the stats.

## Tech stack

- React + Vite
- Redux Toolkit (test settings and results)
- React Router (pages)
- `useReducer` custom hook for the typing engine
- CSS3 (custom properties, grid, flexbox, animations)

## Getting started

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
npm install
npm run dev
```

Then open the local URL shown in the terminal (usually http://localhost:5173).

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── components/   Navbar, Footer, Hero, TypingDemo, TypingPrompt,
│                 Stats, ProgressBar, Keyboard, FeatureCard, Steps
├── data/         allowed keys, warm-up lines, word list
├── hooks/        useTypingTest (typing engine)
├── pages/        Home, Practice, Test, Results, About
├── store/        Redux Toolkit store and typing slice
└── utils/        text generator, time formatting
```

## Changing the key set

All allowed keys live in one constant in `src/data/typingData.js`:

```js
export const HOME_KEYS = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']
```

## Possible improvements

- Save best scores and session history in localStorage
- Difficulty levels and text categories
- Performance graph on the results page