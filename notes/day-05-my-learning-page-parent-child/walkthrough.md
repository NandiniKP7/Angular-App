# Day 5: My Learning page: Walkthrough

> **Open this only after you have tried the project yourself** (see `requirements.md`), or if you are stuck for more than 15 minutes. It builds the project step by step.

## Today's project
Four new components (`MyLearning`, `TodayBuild`, `WelcomeCard`, `TrackCards`) replace the banner and welcome card that lived in `App`. The page shows the banner, the welcome card and three track cards in a grid. The screen is in `ui.svg`.

## Build it, step by step
We build the children first and the parent last. The screen does not change until Step 7, because nothing uses the new components before that.

### Step 1: Check the starting point
**Type this:** in the terminal, in the `learnbuddy` folder:
```
ng serve
```
**You should see:** the Day 4 page: sidebar, header, mint banner `TODAY'S BUILD · TOPIC 03` / `Components`, and the welcome card.
**Why:** Today starts from the Day 4 state. If the page is broken, fix it first.

### Step 2: Generate the four components
**Type this:** stop `ng serve` with Ctrl+C (or open a second terminal), then run:
```
ng generate component my-learning --skip-tests
ng generate component today-build --skip-tests
ng generate component welcome-card --skip-tests
ng generate component track-cards --skip-tests
ng serve
```
**You should see:** for each command, three lines `CREATE src/app/<name>/<name>.css`, `.ts`, `.html`. The screen is unchanged.
**Why:** each command creates the folder and three files with the class name (`MyLearning`, `TodayBuild`, `WelcomeCard`, `TrackCards`) and the selector (`app-my-learning`, ...).

### Step 3: TodayBuild
Replace the whole content of each file.

`src/app/today-build/today-build.ts`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-today-build',
  imports: [],
  templateUrl: './today-build.html',
  styleUrl: './today-build.css'
})
export class TodayBuild {
  topicNo: string = '03';
  topicTitle: string = 'Components';
}
```
`src/app/today-build/today-build.html`
```html
<div class="build">
  <small>TODAY'S BUILD · TOPIC {{ topicNo }}</small>
  <strong>{{ topicTitle }}</strong>
</div>
```
`src/app/today-build/today-build.css`
```css
.build {
  background: var(--mint);
  border-radius: 12px;
  padding: 12px 18px;
  margin-bottom: 16px;
}

.build small {
  display: block;
  color: var(--green);
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.06em;
}

.build strong {
  font-size: 18px;
}
```
**You should see:** no change yet.
**Why:** the HTML, the two properties and the CSS moved together. Scoped CSS only styles this component's own HTML, so the rules must live here.

### Step 4: WelcomeCard
`src/app/welcome-card/welcome-card.ts`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-card',
  imports: [],
  templateUrl: './welcome-card.html',
  styleUrl: './welcome-card.css'
})
export class WelcomeCard {
  appName: string = 'LearnBuddy';
}
```
`src/app/welcome-card/welcome-card.html`
```html
<section class="card">
  <h3>Welcome to {{ appName }}</h3>
  <p>Learn Angular and TypeScript by building real features.</p>
</section>
```
Leave `welcome-card.css` empty.
**You should see:** no change yet.
**Why:** `.card` is in the global `src/styles.css`, so no CSS is needed here.

### Step 5: TrackCards
`src/app/track-cards/track-cards.ts`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-track-cards',
  imports: [],
  templateUrl: './track-cards.html',
  styleUrl: './track-cards.css'
})
export class TrackCards {
}
```
`src/app/track-cards/track-cards.html`
```html
<div class="tracks">
  <section class="track angular">
    <h3>Angular</h3>
    <p>Concept-first lessons</p>
    <button>View topics</button>
  </section>
  <section class="track typescript">
    <h3>TypeScript</h3>
    <p>Follow existing roadmap</p>
    <button>View topics</button>
  </section>
  <section class="track csharp">
    <h3>C# / .NET</h3>
    <p>Future learning track</p>
    <button>View topics</button>
  </section>
</div>
```
`src/app/track-cards/track-cards.css`
```css
.tracks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.track {
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 16px;
}

.track h3 {
  margin: 0 0 8px;
}

.track p {
  margin: 0 0 24px;
  color: var(--muted);
}

.angular {
  background: #fff0f0;
}

.typescript {
  background: #eaf2ff;
}

.csharp {
  background: #f3eeff;
}

.track button {
  background: var(--green);
  color: white;
  border: 0;
  border-radius: 9px;
  padding: 9px 16px;
  font-weight: bold;
  cursor: pointer;
}

.track button:hover {
  filter: brightness(0.9);
}
```
**You should see:** no change yet.
**Why:** `.tracks` is the grid; each `.track` is one cell. The class `angular`, `typescript` or `csharp` only sets the background.

### Step 6: MyLearning (the parent)
`src/app/my-learning/my-learning.ts`
```ts
import { Component } from '@angular/core';
import { TodayBuild } from '../today-build/today-build';
import { WelcomeCard } from '../welcome-card/welcome-card';
import { TrackCards } from '../track-cards/track-cards';

@Component({
  selector: 'app-my-learning',
  imports: [TodayBuild, WelcomeCard, TrackCards],
  templateUrl: './my-learning.html',
  styleUrl: './my-learning.css'
})
export class MyLearning {
}
```
`src/app/my-learning/my-learning.html`
```html
<app-today-build />
<app-welcome-card />
<app-track-cards />
```
`src/app/my-learning/my-learning.css`
```css
app-today-build,
app-welcome-card,
app-track-cards {
  display: block;
  margin-bottom: 16px;
}
```
**You should see:** no change yet.
**Why:** the three tags need the three classes in `imports`. The CSS makes the tags blocks so `margin-bottom` works.

### Step 7: Update App
`src/app/app.ts`
```ts
import { Component } from '@angular/core';
import { Sidebar } from './sidebar/sidebar';
import { Header } from './header/header';
import { MyLearning } from './my-learning/my-learning';

@Component({
  selector: 'app-root',
  imports: [Sidebar, Header, MyLearning],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
```
`src/app/app.html`
```html
<div class="shell">
  <app-sidebar />
  <div class="content">
    <app-header />
    <main class="page">
      <app-my-learning />
    </main>
  </div>
</div>
```
`src/app/app.css`
```css
.shell {
  display: flex;
  min-height: 100vh;
}

.content {
  flex: 1;
  background: var(--page);
}

.page {
  padding: 24px 26px;
}
```
**You should see:** the banner, the welcome card and, under them, a row of three cards (pink Angular, light blue TypeScript, light purple C# / .NET), each with a green `View topics` button. The page looks like `ui.svg`.
**Why:** `App` now shows `MyLearning`, and `MyLearning` shows its three children. `App` no longer needs the banner properties or the `.build` CSS.

### Step 8: Try the hover
**Type this:** nothing. Move the mouse over a `View topics` button.
**You should see:** a hand cursor and a darker button. Clicking does nothing.

## Check yourself
- Banner is mint; three cards are side by side with equal width.
- 16px between the banner, the welcome card and the card row.
- No errors in the terminal or the console (F12).

## Recap
- Parent shows child by its tag; each component lists its children in `imports`.
- Moving a piece of the screen moves its HTML, properties and CSS.
- Component tags are inline, so `my-learning.css` gives them `display: block`.
- The grid makes three equal columns.

## If something breaks
- **`NG8001: 'app-track-cards' is not a known element`:** the class is missing from `imports` in `my-learning.ts`, or the import line is missing.
- **`Cannot find module '../today-build/today-build'`:** check the folder name and that the path starts with `../`.
- **Banner has no colour or spacing:** the `.build` rules are not in `today-build.css`.
- **Cards stacked in one column:** `display: grid;` or `grid-template-columns` is missing from `.tracks` (check spelling).
- **No spacing between the blocks:** `display: block;` is missing in `my-learning.css`.
- **The page does not update:** the terminal shows an error; fix it and save again, or restart `ng serve`.
