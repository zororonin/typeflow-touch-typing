# TypeFlow – Touch Typing Trainer

An interactive touch typing practice app built with React. It trains the eight home-row keys:

**A S D F J K L ;**

The app starts with a short warm-up and then provides a customizable timed typing test.

**Live Demo:** *Add your deployed link here*

## Features

* **Custom test length:** Choose 1, 2, or 3 minutes, or set any custom duration from 0.5 to 60 minutes.
* **Two-step session:** Type two warm-up lines correctly before the timed word test begins.
* **Word test:** Practice with real words such as `ask`, `salad`, and `flask`, mixed with typing combinations generated only from the allowed keys.
* **Instant error feedback:** The typing display turns red and shakes when an incorrect key is pressed and remains red until the correct key is entered.
* **Next-key indicator:** An on-screen keyboard highlights the next key to press and flashes each key as it is typed.
* **Live statistics:** View time remaining, WPM, accuracy, keys pressed, errors, and test progress in real time.
* **Results page:** Displays final WPM, accuracy, keys pressed, correct keys, errors, and test duration.
* **Home page demo:** Includes a 30-second interactive typing demonstration, features, and a how-it-works section.
* **Responsive design:** Works across desktop and mobile devices with a responsive, collapsible navigation bar.

## How It Works

| Metric           | Calculation                                            |
| ---------------- | ------------------------------------------------------ |
| **WPM**          | Correct keys ÷ 5 ÷ minutes elapsed                     |
| **Accuracy**     | Correct key presses ÷ total key presses × 100          |
| **Keys Pressed** | Correct + wrong key presses during the timed word test |

The typing engine follows these rules:

* A wrong key never moves the cursor forward. The user must press the correct key.
* The timer starts when the first key of the timed word test is pressed.
* The warm-up phase is not timed and is not included in the final statistics.
* The test uses only the configured home-row keys.

## Tech Stack

* **React**
* **Vite**
* **Redux Toolkit** – Test settings and results
* **React Router** – Application pages and navigation
* **useReducer** – Typing engine state management
* **CSS3** – Custom properties, Grid, Flexbox, animations, and responsive design

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/zororonin/typeflow-touch-typing.git
```

### 2. Open the project directory

```bash
cd typeflow-touch-typing
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Then open the local URL shown in the terminal.

Usually:

```text
http://localhost:5173
```

## Build for Production

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
src/
├── components/
│   ├── Navbar
│   ├── Footer
│   ├── Hero
│   ├── TypingDemo
│   ├── TypingPrompt
│   ├── Stats
│   ├── ProgressBar
│   ├── Keyboard
│   ├── FeatureCard
│   └── Steps
│
├── data/
│   ├── Allowed keys
│   ├── Warm-up lines
│   └── Word list
│
├── hooks/
│   └── useTypingTest
│
├── pages/
│   ├── Home
│   ├── Practice
│   ├── Test
│   ├── Results
│   └── About
│
├── store/
│   ├── Redux Toolkit store
│   └── Typing slice
│
└── utils/
    ├── Text generator
    └── Time formatting
```

## Allowed Key Set

TypeFlow currently focuses on the eight home-row keys:

```text
A S D F J K L ;
```

The allowed keys are defined in:

```text
src/data/typingData.js
```

For example:

```js
export const HOME_KEYS = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];
```

This centralized configuration makes it easier to expand the trainer with additional key sets in the future.

## Future Improvements

Potential improvements include:

* Save best scores and session history using `localStorage`
* Add difficulty levels
* Add different typing text categories
* Add a performance graph to the results page
* Add personal typing history and progress tracking
* Add additional keyboard rows and key combinations
* Add user accounts and cloud-based score tracking

## License

This project was created as a React learning and portfolio project.
