# Day 03: Welcome and String Interpolation: Walkthrough

> **Open this only after you have tried the project yourself** (see `requirements.md`), or if you are stuck for more than 15 minutes. Keep `ng serve` running; every save reloads the browser.

## Today's project
LearnBuddy shows its texts from the `App` class, has a sidebar footer (`2 of 44 Angular topics done (5%)`), a mint banner (`TODAY'S BUILD · TOPIC 02`, `String Interpolation`) and a welcome card. See `ui.svg` and `ui-breakdown.md`.

## Build it, step by step

### Step 1: Colors and the card in `src/styles.css`
Replace the whole file:
```css
:root {
  --side: #0e3441;
  --side-active: #235c5d;
  --mint: #e3f5ed;
  --green: #15965f;
  --blue: #3b6fd8;
  --ink: #10243a;
  --muted: #66788a;
  --line: #dfe6ea;
  --page: #f6f8f8;
}

body {
  margin: 0;
  font-family: 'Segoe UI', Arial, sans-serif;
  color: var(--ink);
}

.card {
  background: white;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 16px;
}
```
**You should see:** the page looks almost the same as Day 02. The text font may change slightly and the text color is now the dark `--ink`.
**Why:** the nine colors are defined once. Nothing reads them yet except `body` (`--ink`).

### Step 2: Data in `src/app/app.ts`
Replace the whole file:
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  appName: string = 'LearnBuddy';
  tagline: string = 'Learn · Practice · Improve';
  pageTitle: string = 'My Learning';
  weekday: string = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  topicNo: string = '02';
  topicTitle: string = 'String Interpolation';
  topicsDone: number = 2;
  topicsTotal: number = 44;

  percentDone(): number {
    return Math.round((this.topicsDone / this.topicsTotal) * 100);
  }
}
```
**You should see:** no change on screen and no error in the terminal.
**Why:** the properties exist but the template does not use them yet.

### Step 3: Use the data in `src/app/app.html`
Replace the whole file:
```html
<div class="shell">
  <aside class="sidebar">
    <div class="brand">❖ {{ appName }}</div>
    <div class="tagline">{{ tagline }}</div>
    <nav>
      <a class="active">My Learning</a>
      <a>Roadmap Calendar</a>
      <a>Topics</a>
      <a>Practice</a>
      <a>Mistakes</a>
      <a>Progress</a>
      <a>My Diary</a>
    </nav>
    <div class="side-footer">
      <strong>{{ topicsDone }} of {{ topicsTotal }}</strong> Angular topics done ({{ percentDone() }}%)
    </div>
  </aside>
  <div class="content">
    <header class="header">
      <h2>{{ pageTitle }}</h2>
      <span>{{ weekday }}</span>
    </header>
    <main class="page">
      <div class="build">
        <small>TODAY'S BUILD · TOPIC {{ topicNo }}</small>
        <strong>{{ topicTitle }}</strong>
      </div>
      <section class="card">
        <h3>Welcome to {{ appName }}</h3>
        <p>Learn Angular and TypeScript by building real features.</p>
      </section>
    </main>
  </div>
</div>
```
**You should see:** all texts are correct: `❖ LearnBuddy`, the tagline, today's weekday, the footer `2 of 44 Angular topics done (5%)` directly under the links (not yet at the bottom), `TODAY'S BUILD · TOPIC 02` and `String Interpolation` on one line without a background, and the white bordered card (the global `.card` rule works already).
**Why:** each `{{ }}` is replaced with the value of the property. `{{ percentDone() }}` shows `5`.

### Step 4: Style the new parts in `src/app/app.css`
Replace the whole file:
```css
.shell {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  display: flex;
  flex-direction: column;
  width: 230px;
  flex: none;
  box-sizing: border-box;
  background: var(--side);
  color: #cfe3e6;
  padding: 22px 14px;
}

.brand {
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 0 8px;
}

.tagline {
  color: #bcd6da;
  font-size: 12px;
  padding: 2px 8px 18px;
}

.sidebar a {
  display: block;
  padding: 11px 14px;
  margin-bottom: 6px;
  border-radius: 10px;
  font-size: 14px;
}

.sidebar a.active {
  background: var(--side-active);
  color: white;
  font-weight: bold;
}

.side-footer {
  margin-top: auto;
  padding: 8px;
  font-size: 12px;
  color: #bcd6da;
}

.side-footer strong {
  color: white;
}

.content {
  flex: 1;
  background: var(--page);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-bottom: 1px solid var(--line);
  padding: 16px 26px;
}

.header h2 {
  margin: 0;
  font-size: 20px;
}

.header span {
  color: var(--muted);
  font-size: 13px;
}

.page {
  padding: 24px 26px;
}

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
**You should see:** the footer moves to the bottom of the sidebar, with `2 of 44` bold and white. The banner is mint with rounded corners; the green label is on its own line and the title `String Interpolation` is below it. The screen matches `ui.svg`.
**Why:** `flex-direction: column` plus `margin-top: auto` pushes the footer down. `display: block` on `small` gives the label its own line.

### Step 5: Prove the data is live
In `app.ts` change `topicsDone` to `22`, save. **You should see:** `22 of 44 Angular topics done (50%)`. Change it back to `2`.
**Why:** the template re-reads the class every time; you edited data, not HTML.

## Check yourself
- [ ] Screen matches `ui.svg` (the weekday is today's).
- [ ] Footer at the bottom, also in a tall browser window.
- [ ] No hard-coded colors from requirement 6 left in `app.css`.
- [ ] No errors in the terminal or browser console.

## Recap
Properties hold data, `{{ }}` shows it, methods calculate, custom properties hold colors.

## If something breaks
- **Terminal: `Property 'xyz' does not exist on type 'App'`:** a name in `{{ }}` differs from `app.ts`. Fix the spelling.
- **The footer is not at the bottom:** `.sidebar` is missing `display: flex` or `flex-direction: column`, or `.side-footer` is missing `margin-top: auto`.
- **Banner has no color:** check `--mint` in `styles.css` and `background: var(--mint)` in `.build`; save both files.
- **`5%` shows as code or an error:** you wrote `percentDone` without `()`.
- **Card has no border:** the `.card` rule must be in `src/styles.css`, not misspelled.
