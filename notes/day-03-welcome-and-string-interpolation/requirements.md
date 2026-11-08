# Day 03 Practical Requirements: Welcome and String Interpolation

**Time:** 30 minutes. **Core:** the project and Challenges 1-2. Challenges 3-4 are stretch: do them only if you have time left.

## Before you start
Open your `learnbuddy` project as you left it on Day 02, with `ng serve` running.
- `src/app/app.html` has the `.shell` with `<aside class="sidebar">`, `.content`, `<header class="header">` and `<main class="page">` (with `<h1>Welcome to LearnBuddy</h1>`).
- `src/app/app.css` has the Day 02 rules with hard-coded colors (`#0e3441`, `#235c5d`, `#f6f8f8`, `#dfe6ea`, `#66788a`).
- `src/app/app.ts` has an empty class `export class App {` ... `}`.
- `src/styles.css` has only the `body` rule from Day 01.

## Today's project: LearnBuddy with real data
**What it does:** The shell shows all its texts from the `App` class. It adds a sidebar footer, a topic banner and a welcome card, and moves all colors into custom properties. The data and elements are listed in the tables in `ui-breakdown.md`.

**Requirements**
1. **`src/styles.css`** (replace the whole file). Define `:root` with these nine custom properties, exact values: `--side: #0e3441`, `--side-active: #235c5d`, `--mint: #e3f5ed`, `--green: #15965f`, `--blue: #3b6fd8`, `--ink: #10243a`, `--muted: #66788a`, `--line: #dfe6ea`, `--page: #f6f8f8`. Keep `body` with `margin: 0`, but change `font-family` to `'Segoe UI', Arial, sans-serif` and add `color: var(--ink)`. Add a global `.card` rule: `background: white`, `border: 1px solid var(--line)`, `border-radius: 14px`, `padding: 16px`.
2. **`src/app/app.ts`**: inside `export class App { }` add these 8 properties, in this order, with these exact types and values: `appName: string = 'LearnBuddy'`, `tagline: string = 'Learn · Practice · Improve'`, `pageTitle: string = 'My Learning'`, `weekday: string = new Date().toLocaleDateString('en-US', { weekday: 'long' })`, `topicNo: string = '02'`, `topicTitle: string = 'String Interpolation'`, `topicsDone: number = 2`, `topicsTotal: number = 44`. Add the method `percentDone(): number` that returns `Math.round((this.topicsDone / this.topicsTotal) * 100)`. Leave the decorator unchanged.
3. **`src/app/app.html`, sidebar:** the brand div text becomes `❖ {{ appName }}`; the tagline div text becomes `{{ tagline }}`; the seven links stay exactly as on Day 02. After `</nav>` add `<div class="side-footer">` containing `<strong>{{ topicsDone }} of {{ topicsTotal }}</strong>` followed by the text ` Angular topics done ({{ percentDone() }}%)`.
4. **`src/app/app.html`, header:** `<h2>` contains `{{ pageTitle }}`; the `<span>` contains `{{ weekday }}`.
5. **`src/app/app.html`, page:** inside `<main class="page">` remove the `<h1>` and the `<p>`. Add `<div class="build">` containing `<small>TODAY'S BUILD · TOPIC {{ topicNo }}</small>` and `<strong>{{ topicTitle }}</strong>`. After it add `<section class="card">` containing `<h3>Welcome to {{ appName }}</h3>` and `<p>Learn Angular and TypeScript by building real features.</p>`.
6. **`src/app/app.css`** (replace the whole file with the Day 02 rules, changed as follows). Replace every hard-coded color that has a custom property with `var(--...)`: `#0e3441` becomes `var(--side)`, `#235c5d` becomes `var(--side-active)`, `#f6f8f8` becomes `var(--page)`, `#dfe6ea` becomes `var(--line)`, `#66788a` becomes `var(--muted)`. Add `display: flex` and `flex-direction: column` to `.sidebar`. Add `.side-footer { margin-top: auto; padding: 8px; font-size: 12px; color: #bcd6da; }` and `.side-footer strong { color: white; }`. Add `.build { background: var(--mint); border-radius: 12px; padding: 12px 18px; margin-bottom: 16px; }`, `.build small { display: block; color: var(--green); font-size: 11px; font-weight: bold; letter-spacing: 0.06em; }` and `.build strong { font-size: 18px; }`.

**Expected screen** (compare with `ui.svg`)
- Left: dark sidebar with `❖ LearnBuddy`, `Learn · Practice · Improve`, seven links (`My Learning` highlighted), and at the very bottom `2 of 44` (bold, white) followed by `Angular topics done (5%)`.
- Top right: white header with `My Learning` on the left and today's weekday on the right.
- Below: a mint banner with the green label `TODAY'S BUILD · TOPIC 02` and under it, bold, `String Interpolation`; then a white rounded card with the heading `Welcome to LearnBuddy` and the sentence `Learn Angular and TypeScript by building real features.`

**Check yourself**
- [ ] The footer reads `2 of 44 Angular topics done (5%)` and sits at the bottom of the sidebar, even if you make the browser window taller.
- [ ] Change `topicsDone` to `22` in `app.ts`: the footer shows `22 of 44 ... (50%)`. Change it back to `2`.
- [ ] The weekday matches today.
- [ ] No hard-coded color from the list in requirement 6 is left in `app.css`.
- [ ] No errors in the terminal or in the browser console (press F12, tab Console).

**Build it yourself first.** Use today's `README.md` as your reference. If you are stuck for 15 minutes, open `walkthrough.md`. Open a hint only after 10 minutes of trying.

## Challenges: extend LearnBuddy
Challenges are added to the same files, using the same data. Check the result in the browser.

## Challenge 1: A progress sentence (HTML)
**Goal:** Practice `<strong>`, `<p>` and interpolation inside the card.
**Requirements:**
1. In `app.html`, inside `<section class="card">`, after the existing `<p>`, add a second `<p>`.
2. Its text is `You have finished 2 of 44 topics.`, but the number `2` comes from `topicsDone`, `44` from `topicsTotal`, and `2` is wrapped in `<strong>`.

**Expected screen:** the card shows a second line `You have finished 2 of 44 topics.` with only the first `2` in bold.

<details><summary>Hint 1</summary>You need one `<p>`, one `<strong>` and two `{{ }}`. The `<strong>` goes around only one of them.</details>
<details><summary>Hint 2</summary>Shape: `<p>You have finished <strong>{{ ... }}</strong> of {{ ... }} topics.</p>`</details>
<details><summary>Hint 3</summary>`<p>You have finished <strong>{{ topicsDone }}</strong> of {{ topicsTotal }} topics.</p>`</details>

Undo this before tomorrow.

## Challenge 2: Re-theme with one file (CSS)
**Goal:** See why custom properties exist.
**Requirements:**
1. Only edit `src/styles.css`. Change `--mint` to `#fff3cd` and `--green` to `#b45309`.
2. Do not edit `app.css`.

**Expected screen:** the banner background is light yellow and its label `TODAY'S BUILD · TOPIC 02` is dark orange. Nothing else changes except that anything else using `--green` would follow too.

<details><summary>Hint 1</summary>The banner rules in `app.css` read the colors with `var()`, so you only change the value where it is defined.</details>
<details><summary>Hint 2</summary>The two lines are inside the `:root { }` rule in `styles.css`.</details>
<details><summary>Hint 3</summary>`--mint: #fff3cd;` and `--green: #b45309;`</details>

Undo this before tomorrow (restore `#e3f5ed` and `#15965f`).

## Challenge 3 (stretch): A second method
**Goal:** Write and call a method of your own.
**Requirements:**
1. In `app.ts` add the method `topicsLeft(): number` that returns the total minus the done topics.
2. In `app.html`, inside the card, add `<p>Topics left: {{ topicsLeft() }}</p>` as the last element.

**Expected screen:** the card shows the line `Topics left: 42`.

<details><summary>Hint 1</summary>A method reads properties with `this.` and gives a value back with `return`.</details>
<details><summary>Hint 2</summary>`topicsLeft(): number { return ...; }` with a subtraction inside.</details>
<details><summary>Hint 3</summary>`return this.topicsTotal - this.topicsDone;`</details>

Undo this before tomorrow.

## Challenge 4 (stretch): Style the card heading (CSS)
**Goal:** Use typography and a custom property in `app.css`.
**Requirements:** add this rule at the end of `app.css`: selector `.card h3`; `margin: 0 0 8px`; `color: var(--side)`; `font-size: 22px`; `letter-spacing: 0.02em`.
**Expected screen:** `Welcome to LearnBuddy` is larger, dark teal, with less space above it than before.

<details><summary>Hint 1</summary>`.card h3` means: every `h3` inside an element with class `card`.</details>
<details><summary>Hint 2</summary>Four declarations, each ends with `;`, all inside `{ }`.</details>
<details><summary>Hint 3</summary>`.card h3 { margin: 0 0 8px; color: var(--side); font-size: 22px; letter-spacing: 0.02em; }`</details>

Undo this before tomorrow.

## When you finish
When you finish: paste your files here for review.
