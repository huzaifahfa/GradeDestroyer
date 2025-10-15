# 💀 GradeDestroyer™  
**Canvas Submission Sabotage System**  
*“how to make your college life worse on purpose.”*

---

## ✨ TL;DR

> **GradeDestroyer** — because sometimes failure just needs better UI.
---

## 🤔 what is this

you ever looked at your 11:58 pm Canvas submission and thought:  
> “yeah nah, life’s too easy right now.”

**GradeDestroyer** is a Chrome extension that turns your *Submit Assignment* button into a psychological thriller.  
you click it once — it moves.  
you click it again — it moves *again.*  
then, when you think you’ve got it cornered… boom.  
now you gotta play **Snake** to earn your submission rights.

and if you fail?  
the timer hits zero. the screen explodes in **67s.** your grades? gone. *destroyed.*

---

## 🧠 the concept

> “Canvas, but make it unusable.”

this masterpiece of chaos runs in *phases*, because disorder deserves structure.

### 🌀 Phase 1: Button Hunt
- chase the “Submit Assignment” button around your screen.  
- it teleports after every click like it’s got commitment issues.  
- catch it **5 times** to unlock the next phase (as if that’s a good thing).

### 🐍 Phase 2: Snake Challenge
- welcome to *snake hell.*  
- eat the blue `S` **7 times** without dying.  
- hit a wall or your tail? start over.  
- make it to 6 eats → chaos visuals (67s everywhere).  
- make it to 7 → you can *finally* submit your assignment.

---

## 🕹️ Tech Rundown

this whole thing runs inside **Canvas** using a **Chrome Extension** that intercepts submission events.

| File | What it does |
|------|---------------|
| `manifest.json` | tells Chrome “hey, I’m not malware (but kinda am).” |
| `content.js` | hijacks your Canvas submission flow and slaps the game on top. |
| `destroyer.html` | where the nightmare UI lives — fake timer, doom vibes, red gradients. |
| `game.js` | the full mental breakdown script: button hunt, snake logic, 67 spam, all of it. |

---

## 🧩 Core Functions (Vibe Check)

### 🪄 `renderButtonHunt()`
starts phase one. puts a “Submit Assignment” button somewhere random. every click teleports it to a new location.

### 🐍 `renderSnakeGame()` / `moveSnake()`
controls the snake minigame. arrow keys move the snake. die once and you get roasted by memes.

### ⏱️ Timer (`setInterval`)
counts down from 120 seconds. take too long and your screen gets nuked by 67s before refreshing.

### 💥 `spam67()`
creates a chaotic explosion of floating “67”s on your screen, then reloads the page like nothing happened.

### 😭 `showGameOver()`
displays random “you suck” memes — DiCaprio laughing, Risitas, Tom Cruise, etc.

### 🎉 `renderSuccess()`
rare moment of peace. you beat the game, timer still ticking, and it lets you actually submit.  
go ahead, champ. turn in that half-finished PDF.

---

## ⚙️ Installation Guide

1. Clone the repo  
   ```bash
   git clone https://github.com/huzaifahfa/GradeDestroyer.git
2. Open Chrome and go to: chrome://extensions/
3. Enable **Developer Mode**  
4. Click **Load unpacked**  
5. Choose the `GradeDestroyer` folder  
6. Go to your Canvas assignment page  
7. Click **“Submit Assignment”** and watch your sanity dissolve

---

## 💀 Pro Tips

- Timer stressing you out? **good.**  
- Snake too hard? **skill issue.**  
- Lag? that’s a *feature.*  
- Accidentally close the tab? **GG.**

---

## 🧢 Disclaimer

This project is a **joke.**  
Please don’t use it before real submissions (unless you have beef with your GPA).  
The goal was to make the world’s most *anti-productive productivity tool.*

---

## 🫡 Credits

Built by a tired student who wanted to see how far one could go before Chrome calls it malware.
