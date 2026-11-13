# Day 10 Practical Requirements

**Time:** 30 minutes. **Core:** the project and Challenges 1-2 (about 20 minutes for the project, 5 minutes for each challenge). Challenges 3-4 are stretch: do them if you have time.

## Before you start
Open your `learnbuddy` project as you left it on Day 9, with `ng serve` running. It has:
- Components `App`, `Sidebar`, `Header`, `MyLearning`, `TodayBuild`, `TrackCards`, `TodayChoice` (no `WelcomeCard`).
- `my-learning.html` with `<app-today-build />` and then `<div class="two-col">` holding `<app-track-cards />` and `<app-today-choice />`.
- `TodayBuild` with `topicNo` `'06'` and `topicTitle` `'Two-Way Binding'`.

## Today's project: Topic catalog

**What it does:** A new card, `Angular Roadmap`, under the two columns lists 8 Angular topics with a number, a title and a colored status badge. `Clear list` empties the list and shows a message. `Restore list` brings the 8 topics back. On a window 800px wide or narrower, the two columns above stack. All data and CSS values are in `ui-breakdown.md`; the picture is `ui.svg`.

**Requirements**
1. In `today-build.ts`, change `topicNo` to `'07'` and `topicTitle` to `'Angular Template Control Flow'`.
2. Generate the component `topic-catalog` with `--skip-tests` (class `TopicCatalog`, selector `app-topic-catalog`).
3. Change `MyLearning`: `my-learning.ts` has `imports: [TodayBuild, TrackCards, TodayChoice, TopicCatalog]` and the four import lines. `my-learning.html` has, in this order: `<app-today-build />`, the `.two-col` div (unchanged), then `<app-topic-catalog />`. `my-learning.css` has the three rules in the `my-learning.css` table of `ui-breakdown.md` (`app-today-build, app-topic-catalog`, `.two-col` with the extra `margin-bottom: 16px;`, and the `@media (max-width: 800px)` block).
4. In `topic-catalog.ts`: above the class, add `const ANGULAR_TOPICS` with the 8 objects (`no`, `title`, `status`) from the data table in `ui-breakdown.md`, copied exactly. In the class: `topics = [...ANGULAR_TOPICS];` (no type written), `clear(): void` that sets `this.topics = []`, and `restore(): void` that sets `this.topics = [...ANGULAR_TOPICS]`. `imports` stays `[]`.
5. In `topic-catalog.html`: one `<section class="card">` with `<h3>` `Angular Roadmap`; `<p class="sub">` with `{{ topics.length }} of 44 topics shown`; a `<div class="actions">` with two buttons, `Clear list` (calls `clear()`) and `Restore list` (calls `restore()`); then `<ul class="topic-list">`. Inside the `ul`, an `@for (topic of topics; track topic.no)` block that makes `<li class="topic-row">` holding `<span class="num">{{ topic.no }}.</span>`, `<span class="title">{{ topic.title }}</span>` and `<span class="badge">` showing `{{ topic.status }}`, with `[class.done]` true when the status is `'Completed'` and `[class.progress]` true when the status is `'In progress'`. Then an `@empty` block holding `<li class="empty">No topics to show.</li>`.
6. In `topic-catalog.css`: the rules in the `topic-catalog.css` table of `ui-breakdown.md`.

**Expected screen** (compare with `ui.svg`)
- Banner: `TODAY'S BUILD · TOPIC 07` and `Angular Template Control Flow`.
- Under the two columns, a white card `Angular Roadmap`, subtitle `8 of 44 topics shown`, two white buttons.
- Eight rows, no bullets. Each row: grey number with dot (`1.`), title, and a pill at the right edge. Rows 1 and 2 have a green `Completed` pill, row 3 a blue `In progress` pill, rows 4 to 8 a grey `Not started` pill. A thin line separates the rows.
- Click `Clear list`: all rows disappear, the subtitle reads `0 of 44 topics shown`, and `No topics to show.` appears. Click `Restore list`: the 8 rows return.
- Make the browser window narrower than 800px (or press F12 and use the device toolbar): the Today's choice card moves below the track card.

**Check yourself**
- [ ] The row for topic 8 shows the arrow: `Parent → Child Communication with input()`.
- [ ] The row for topic 1 shows `Angular Application Setup & Architecture` with the `&`.
- [ ] No bullets and no left indent on the list.
- [ ] Clear then Restore works more than once.
- [ ] The terminal and the browser console (F12, Console tab) show no errors.

**Build it yourself first.** Use today's `README.md` as your reference. If you are stuck for 15 minutes, open `walkthrough.md`.

Open a hint only after 10 minutes of trying.

## Challenges: extend Topic catalog

Challenges are added to the same app and the same data. Each one changes only the files named in it, inside `src/app/topic-catalog/`.

## Challenge 1: A status legend (HTML)
**Goal:** Add a second list written by hand, and name the first list for screen readers.
**Requirements**
1. In `topic-catalog.html`, add `aria-label="Angular topics"` to the existing `<ul class="topic-list">`.
2. After that `</ul>` and before `</section>`, add: `<ul class="topic-list legend" aria-label="Status legend">` with three `<li>` elements: `<strong>Completed</strong>: topic finished`, `<strong>In progress</strong>: topic being studied`, `<strong>Not started</strong>: topic not opened yet`, then `</ul>`.
3. At the end of `topic-catalog.css` add `.legend` with `margin-top: 12px; font-size: 12px; color: var(--muted);`.

**Expected:** Under the 8 rows, three small grey lines with no bullets, each starting with a bold status word, separated from the rows by 12px.

<details><summary>Hint 1</summary>A list written by hand uses `<ul>` and `<li>` only. No `@for` is needed.</details>
<details><summary>Hint 2</summary>An element can have two classes: `class="topic-list legend"`. The first removes the bullets, the second adds the spacing.</details>
<details><summary>Hint 3</summary>The `.legend` rule must come after `.topic-list` in the CSS file, because both set `margin` and the later rule wins when specificity is equal.</details>

Undo this before tomorrow.

## Challenge 2: Hover and last row (CSS)
**Goal:** Polish the rows with two new selectors.
**Requirements**
1. Add `.topic-row:hover` with `background: var(--page);`.
2. Add `.topic-row:last-child` with `border-bottom: 0;` (`:last-child` selects an element that is the last child of its parent).
3. In the `.badge` rule add `text-transform: uppercase;` (it shows the letters as capitals without changing the stored text).

**Expected:** Moving the mouse over a row turns it light grey. The last row (topic 8) has no line under it. The pills read `COMPLETED`, `IN PROGRESS`, `NOT STARTED`.

<details><summary>Hint 1</summary>Only `topic-catalog.css` changes. `:hover` was used on Day 4.</details>
<details><summary>Hint 2</summary>Each new rule is a selector with a colon word, then braces. The third change is one extra line inside an existing rule.</details>
<details><summary>Hint 3</summary>`.topic-row:last-child { border-bottom: 0; }`. The data in the `.ts` file does not change; `text-transform` only changes how the letters are shown.</details>

Undo this before tomorrow.

## Challenge 3 (stretch): Show the index
**Goal:** Use `$index` inside `@for`.
**Requirements**
1. In `topic-catalog.html`, as the first child of `<li class="topic-row">` (before the `num` span), add `<span class="idx">index {{ $index }}</span>`.
2. In `topic-catalog.css` add `.idx` with `color: var(--muted); font-size: 11px;`.

**Expected:** Each row starts with a small grey `index 0`, `index 1`, up to `index 7`, then the number and title as before. After `Clear list` and `Restore list` the indexes start at 0 again.

<details><summary>Hint 1</summary>`$index` only exists inside the braces of `@for`.</details>
<details><summary>Hint 2</summary>Put it in `{{ }}`, like a property.</details>
<details><summary>Hint 3</summary>`{{ $index }}` inside a `<span>` that is inside the `<li>`.</details>

Undo this before tomorrow.

## Challenge 4 (stretch): Show first 3
**Goal:** Add a third button that shows only part of the list.
**Requirements**
1. In `topic-catalog.ts` add the method `showFirstThree(): void` that sets `this.topics = ANGULAR_TOPICS.slice(0, 3);` (`slice(0, 3)` makes a new array with the items at positions 0, 1 and 2).
2. In `topic-catalog.html`, after the `Restore list` button, add `<button (click)="showFirstThree()">Show first 3</button>`.

**Expected:** Click `Show first 3`: only rows 1, 2 and 3 show, and the subtitle reads `3 of 44 topics shown`. Click `Restore list`: 8 rows and `8 of 44 topics shown`.

<details><summary>Hint 1</summary>It works like `restore()`, but with fewer items.</details>
<details><summary>Hint 2</summary>An array has a method `slice(start, end)` that does not change the original array.</details>
<details><summary>Hint 3</summary>`this.topics = ANGULAR_TOPICS.slice(0, 3);`. The new button is inside the existing `<div class="actions">`, so the CSS already styles it.</details>

Undo this before tomorrow.

## When you finish
When you finish: paste your files here for review.
