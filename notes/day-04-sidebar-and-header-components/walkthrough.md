# Day 04: Sidebar and Header Components: Walkthrough

> **Open this only after you have tried the project yourself** (see `requirements.md`), or if you are stuck for more than 15 minutes. The steps keep the page working after every step.

## Today's project
The page looks as on Day 03 (banner now `TOPIC 03`, `Components`), but `Sidebar` and `Header` are components, and links highlight on hover. See `ui.svg` and `ui-breakdown.md`.

## Build it, step by step

### Step 1: Generate the sidebar
Keep `ng serve` running. Open a second terminal in the `learnbuddy` folder and run:
```bash
ng generate component sidebar --skip-tests
```
**You should see:** lines starting with `CREATE` for `src/app/sidebar/sidebar.css`, `sidebar.ts` and `sidebar.html`. The page does not change.
**Why:** the files exist, but nothing uses them yet. (Older Angular names the files `sidebar.component.*` and the class `SidebarComponent`.)

### Step 2: The sidebar class, `src/app/sidebar/sidebar.ts`
Replace the whole file:
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  appName: string = 'LearnBuddy';
  tagline: string = 'Learn · Practice · Improve';
  topicsDone: number = 2;
  topicsTotal: number = 44;

  percentDone(): number {
    return Math.round((this.topicsDone / this.topicsTotal) * 100);
  }
}
```
**You should see:** no change on screen.
**Why:** the data the sidebar needs now lives in its own class.

### Step 3: The sidebar template, `src/app/sidebar/sidebar.html`
Replace the whole file (this is the `<aside>` block from `app.html`):
```html
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
```
**You should see:** no change on screen yet (`app.html` still has its own copy).

### Step 4: The sidebar styles, `src/app/sidebar/sidebar.css`
Replace the whole file:
```css
.sidebar {
  display: flex;
  flex-direction: column;
  width: 230px;
  flex: none;
  box-sizing: border-box;
  min-height: 100vh;
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
  transition: background 0.15s;
}

.sidebar a.active {
  background: var(--side-active);
  color: white;
  font-weight: bold;
}

.sidebar a:hover {
  background: var(--side-active);
  color: white;
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
```
**You should see:** no change on screen yet.
**Why:** `min-height: 100vh` is new (concept 11 of the README); `transition` and the `:hover` rule are new (concepts 8 and 9).

### Step 5: Place the sidebar in `app.ts` and `app.html`
In `src/app/app.ts` add the import line below the first import, and add `Sidebar` to `imports`:
```ts
import { Component } from '@angular/core';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
```
(Leave the class body as it is for now.) In `src/app/app.html` delete the whole `<aside class="sidebar"> ... </aside>` block and write `<app-sidebar />` in its place, as the first child of `.shell`:
```html
<div class="shell">
  <app-sidebar />
  <div class="content">
```
**You should see:** the page looks the same as before. Hover over `Topics`: the link turns teal and white. The footer is at the bottom.
**Why:** `Sidebar` is used. The sidebar rules left in `app.css` no longer matter, because they do not reach into `Sidebar`.

### Step 6: Generate the header
```bash
ng generate component header --skip-tests
```
**You should see:** `CREATE` lines for `src/app/header/header.css`, `header.ts`, `header.html`.

### Step 7: Header files
`src/app/header/header.ts` (replace the whole file):
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  pageTitle: string = 'My Learning';
  weekday: string = new Date().toLocaleDateString('en-US', { weekday: 'long' });
}
```
`src/app/header/header.html` (replace the whole file):
```html
<header class="header">
  <h2>{{ pageTitle }}</h2>
  <span>{{ weekday }}</span>
</header>
```
`src/app/header/header.css` (replace the whole file):
```css
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
```
**You should see:** no change on screen.

### Step 8: Place the header
In `src/app/app.ts` add the import and extend `imports`:
```ts
import { Component } from '@angular/core';
import { Sidebar } from './sidebar/sidebar';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [Sidebar, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
```
In `src/app/app.html` replace the whole `<header class="header"> ... </header>` block with `<app-header />`.
**You should see:** the page still looks the same, with the title `My Learning` and today's weekday.

### Step 9: Clean up `app.ts`, `app.html` and `app.css`
`src/app/app.ts` (replace the whole file):
```ts
import { Component } from '@angular/core';
import { Sidebar } from './sidebar/sidebar';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [Sidebar, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  appName: string = 'LearnBuddy';
  topicNo: string = '03';
  topicTitle: string = 'Components';
}
```
`src/app/app.html` (replace the whole file):
```html
<div class="shell">
  <app-sidebar />
  <div class="content">
    <app-header />
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
`src/app/app.css` (replace the whole file):
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
**You should see:** the screen matches `ui.svg`: banner `TODAY'S BUILD · TOPIC 03` / `Components`, welcome card, full-height sidebar, footer at the bottom, hover effect on links.
**Why:** `App` keeps only the data its own template uses.

## Check yourself
- [ ] The screen matches `ui.svg` (the weekday is today's).
- [ ] Hover highlights every link except that `My Learning` already looks highlighted.
- [ ] `app.css` has six rules; `sidebar.css` has eight; `header.css` has three.
- [ ] No errors in the terminal or browser console.

## Recap
Two components, each with `.ts`, `.html`, `.css`; registered in `imports` and placed with a tag; CSS scoped per component.

## If something breaks
- **`'app-sidebar' is not a known element`:** add `Sidebar` to `imports` in `app.ts` and check the import line.
- **`Property 'x' does not exist on type 'Sidebar'` (or `'Header'`):** the template uses a property that is not in that class. Add it to the right `.ts` file.
- **Sidebar is not dark or not full height:** the rules are still in `app.css`; they must be in `sidebar.css` (with `min-height: 100vh`).
- **No hover effect:** check `.sidebar a:hover` is in `sidebar.css` and has no typo in `var(--side-active)`.
- **Warning that an import is not used:** you imported `Header` or `Sidebar` but did not write its tag in `app.html`.
