# Day 5 Practical Requirements

**Time:** 30 minutes. **Core:** the project and Challenges 1-2. Challenges 3-4 are stretch: do them if you have time left.

## Before you start
Open your `learnbuddy` project as you left it on Day 4 and run `ng serve`. It must have:
- `src/app/sidebar/` and `src/app/header/` (components `Sidebar`, `Header`);
- `app.ts` with `imports: [Sidebar, Header]` and the properties `appName`, `topicNo = '03'`, `topicTitle = 'Components'`;
- `app.html` with `<app-sidebar />`, `<app-header />` and a `<main class="page">` that contains the banner and the welcome card;
- `app.css` with `.shell`, `.content`, `.page`, `.build`, `.build small`, `.build strong`.

## Today's project: My Learning page
**What it does:** Moves the banner and the welcome card into their own components, adds a new track-cards component, and puts all three inside one parent, `MyLearning`. The screen is described in `ui-breakdown.md`.

**Requirements**
1. Generate four components with `--skip-tests`, one command each: `my-learning`, `today-build`, `welcome-card`, `track-cards`. You get four folders in `src/app/`.
2. `TodayBuild` (`today-build/`): `today-build.ts` has `topicNo: string = '03';` and `topicTitle: string = 'Components';`. `today-build.html` is the `<div class="build">` block (a `<small>` with `TODAY'S BUILD · TOPIC {{ topicNo }}` and a `<strong>` with `{{ topicTitle }}`). `today-build.css` has the rules `.build`, `.build small`, `.build strong` (copy them from `app.css`).
3. `WelcomeCard` (`welcome-card/`): `welcome-card.ts` has `appName: string = 'LearnBuddy';`. `welcome-card.html` is the `<section class="card">` with `<h3>Welcome to {{ appName }}</h3>` and `<p>Learn Angular and TypeScript by building real features.</p>`. `welcome-card.css` stays empty (the global `.card` rule is enough).
4. `TrackCards` (`track-cards/`): `track-cards.html` has `<div class="tracks">` with three `<section class="track ...">` cards. Texts: `Angular` / `Concept-first lessons`, `TypeScript` / `Follow existing roadmap`, `C# / .NET` / `Future learning track`. Each card has `<h3>`, `<p>` and `<button>View topics</button>`. The three sections have the extra classes `angular`, `typescript`, `csharp`. `track-cards.css` has the rules listed under "CSS used" in `ui-breakdown.md` (values exactly as written there; the walkthrough shows the full file). `track-cards.ts` has no properties.
5. `MyLearning` (`my-learning/`): `my-learning.html` has exactly three lines, in this order: `<app-today-build />`, `<app-welcome-card />`, `<app-track-cards />`. `my-learning.ts` has `imports: [TodayBuild, WelcomeCard, TrackCards]` and the three `import` lines. `my-learning.css` has one selector list rule with the three tag names, `display: block;` and `margin-bottom: 16px;`.
6. `App`: `app.ts` has `imports: [Sidebar, Header, MyLearning]`, the import line for `MyLearning`, and an empty class (`export class App {` and `}` on the next line; delete `appName`, `topicNo`, `topicTitle`). `app.html` has inside `<main class="page">` only `<app-my-learning />`. `app.css` has only `.shell`, `.content`, `.page`.

**Expected screen** (see `ui.svg`)
- Sidebar and header look the same as on Day 4.
- Under the header: the mint banner `TODAY'S BUILD · TOPIC 03` / `Components`, then the white `Welcome to LearnBuddy` card, then one row of three cards with 16px between them, all the same width.
- The cards: Angular (pink background), TypeScript (light blue), C# / .NET (light purple). Each has a bold heading, a grey sentence and a green `View topics` button.
- Hover on a button: it gets darker and the cursor is a hand. Clicking does nothing.
- Each of the three blocks has 16px of space below it.

**Check yourself**
- [ ] There are four new folders in `src/app/` and each has `.ts`, `.html`, `.css`.
- [ ] `my-learning.ts` lists `TodayBuild`, `WelcomeCard`, `TrackCards` in `imports`.
- [ ] The three track cards sit side by side with equal width.
- [ ] The banner is still mint (its CSS is in `today-build.css`, not `app.css`).
- [ ] No errors in the terminal and none in the browser console (F12).

**Build it yourself first.** Use today's `README.md` as your reference. If you are stuck for 15 minutes, open `walkthrough.md`.

Open a hint only after 10 minutes of trying.

## Challenges: extend the My Learning page
Challenges change the same files you built today, with the same data. The result appears on the My Learning page in the browser. Do each challenge from the finished project, and undo it before the next one.

## Challenge 1: A fourth track (HTML)
**Goal:** See how a grid adds a new row.
**Requirements:**
1. In `track-cards.html`, inside `<div class="tracks">`, after the C# card, add `<section class="track">` containing `<h3>Java</h3>`, `<p>Optional track</p>` and `<button>View topics</button>`.
**Expected screen:** The three cards stay in row 1. A card `Java` with no colour (the light grey page shows through) appears in row 2, in the first column, with the same width as the others.
<details><summary>Hint 1</summary>A new card is a new `<section>` inside the element that has the grid.</details>
<details><summary>Hint 2</summary>Copy one existing card, remove the colour class (`angular`, `typescript` or `csharp`), change the texts.</details>
<details><summary>Hint 3</summary>The class attribute is only `class="track"`. Place the block just before the closing `</div>` of `.tracks`.</details>

Undo this before tomorrow.

## Challenge 2: Hover on the whole card (CSS)
**Goal:** Change the look of a card while the mouse is on it.
**Requirements:**
1. In `track-cards.css`, add a rule `.track:hover` that sets `border-color: var(--green);`.
2. In the `.tracks` rule, change `gap: 16px;` to `gap: 32px;`.
**Expected screen:** The space between the three cards doubles. While the mouse is anywhere on a card, its border turns green; moving away restores the grey border.
<details><summary>Hint 1</summary>A pseudo-class is added to a selector after a colon, with no space.</details>
<details><summary>Hint 2</summary>`.track:hover { ... }` is a new rule, written after `.track { ... }`.</details>
<details><summary>Hint 3</summary>`.track:hover { border-color: var(--green); }`</details>

Undo this before tomorrow.

## Challenge 3 (stretch): Cards as tall as their content (CSS)
**Goal:** Learn how grid stretches items.
**Requirements:**
1. In the `.tracks` rule, change `grid-template-columns` to `2fr 1fr 1fr`.
2. In the `.tracks` rule, add `align-items: start;`.
3. In `track-cards.html`, temporarily change the C# text `Future learning track` to `Future learning track, planned for later in the course`.
**Expected screen:** The Angular card is twice as wide as the other two. The C# card is taller than the other two, and the other two stop at their own content (they are not stretched to the C# height). Without `align-items: start;` all three would be equally tall.
<details><summary>Hint 1</summary>`fr` units are shares: `2fr 1fr 1fr` is 4 shares in total, the first column gets 2.</details>
<details><summary>Hint 2</summary>`align-items` is a property of the grid container (`.tracks`), not of the cards.</details>
<details><summary>Hint 3</summary>`align-items: start;` goes inside `.tracks { ... }`.</details>

Undo this before tomorrow.

## Challenge 4 (stretch): A fifth component (Angular)
**Goal:** Repeat the full parent-child workflow alone.
**Requirements:**
1. Generate a component `tip-card` with `--skip-tests`.
2. `tip-card.html`: `<section class="card"><h3>Tip</h3><p>Open a hint only after 10 minutes of trying.</p></section>` (on several lines).
3. Show it in `MyLearning` between the welcome card and the track cards: in `my-learning.html` the third line is `<app-tip-card />` (so the file has four lines: today-build, welcome-card, tip-card, track-cards). Import it in `my-learning.ts` (import line and `imports` entry).
4. First do not touch `my-learning.css`. Look at the space between the tip card and the track cards. Then add `app-tip-card` to the selector list in `my-learning.css`.
**Expected screen:** Order on screen: banner, welcome card, tip card, track row. Step 4a: the tip card touches the track row (no space between them). Step 4b: 16px of space appears between them.
<details><summary>Hint 1</summary>Follow the same five actions as for `WelcomeCard`: generate, write HTML, import line, `imports` entry, tag.</details>
<details><summary>Hint 2</summary>The tag `<app-tip-card />` is written in the HTML of `MyLearning`, so `MyLearning` must import it.</details>
<details><summary>Hint 3</summary>The selector list gets a fourth name: `app-tip-card`, separated by a comma from the one before it.</details>

Undo this before tomorrow: delete the folder `src/app/tip-card`, remove its import line, its `imports` entry, its tag, and its name in `my-learning.css`.

When you finish: paste your files here for review.
