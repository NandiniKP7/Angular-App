# Day 11 Practical Requirements

**Time:** 30 minutes. **Core:** the project and Challenges 1-2 (about 20 minutes for the project, 5 minutes for each challenge). Challenges 3-4 are stretch: do them if you have time.

## Before you start
Open your `learnbuddy` project as you left it on Day 10, with `ng serve` running. It has:
- Components `App`, `Sidebar`, `Header`, `MyLearning`, `TodayBuild`, `TrackCards`, `TodayChoice`, `TopicCatalog`.
- `my-learning.html` with `<app-today-build />`, the `.two-col` div (`<app-track-cards />` and `<app-today-choice />`), then `<app-topic-catalog />`.
- `TodayBuild` with `topicNo` `'07'` and `topicTitle` `'Angular Template Control Flow'`.
- `topic-catalog.ts` with `const ANGULAR_TOPICS` (8 objects), `topics = [...ANGULAR_TOPICS];`, `clear()` and `restore()`.
- `topic-catalog.html` with the card, `<p class="sub">{{ topics.length }} of 44 topics shown</p>`, the two buttons and the `@for (topic of topics; track topic.no)` list with `@empty`.
- No challenge code from Day 10 (no legend, no hover rule, no `idx` span, no `showFirstThree`).

## Today's project: Topic filters

**What it does:** Four chips (`All`, `Completed`, `In progress`, `Not started`) appear above the buttons. Clicking a chip shows only the topics with that status. The chosen chip is green. The subtitle changes with the filter. All data and CSS values are in `ui-breakdown.md`; the picture is `ui.svg`.

**Requirements**
1. `today-build.ts` stays `topicNo` `'07'` and `topicTitle` `'Angular Template Control Flow'`. Do not change it.
2. Replace `topic-catalog.ts`. Keep `ANGULAR_TOPICS` (8 objects, copied exactly), the `@Component` block and `imports: []`. In the class keep `topics = [...ANGULAR_TOPICS];`, `clear()` and `restore()` and add:
   - `filter: string = 'All';`
   - `setFilter(value: string): void` that sets `this.filter = value;`
   - `visibleTopics()` with no written return type: if `this.filter === 'All'` return `this.topics`; otherwise return `this.topics.filter(topic => topic.status === this.filter)`.
3. Replace `topic-catalog.html`. In the `<section class="card">`, after `<h3>Angular Roadmap</h3>`:
   - An `@if (filter === 'All')` block with `<p class="sub">{{ topics.length }} of 44 topics shown</p>` and a `@else` block with `<p class="sub">{{ visibleTopics().length }} topics: {{ filter }}</p>`.
   - `<div class="chips">` with four `<button class="chip">` elements, in this order and with these texts: `All`, `Completed`, `In progress`, `Not started`. Each has `[class.on]="filter === 'X'"` and `(click)="setFilter('X')"` where `X` is the same text as the button (`'All'`, `'Completed'`, `'In progress'`, `'Not started'`).
   - Then the existing `<div class="actions">` with `Clear list` and `Restore list`.
   - Then the existing `<ul class="topic-list">`, but the loop is `@for (topic of visibleTopics(); track topic.no)`. The `<li>` content and the `@empty` block stay the same.
4. At the end of `topic-catalog.css` add the three rules `.chips`, `.chip` and `.chip.on` from the CSS table in `ui-breakdown.md`. All older rules stay.

**Expected screen** (compare with `ui.svg`)
- Banner unchanged. The `Angular Roadmap` card shows the subtitle `8 of 44 topics shown`, then a row of four chips with `All` green and white text, the other three white with a light border, then the two white buttons, then 8 rows.
- Click `Completed`: that chip turns green and `All` turns white. Subtitle `2 topics: Completed`. Rows 1 and 2 only.
- Click `In progress`: subtitle `1 topics: In progress`, row 3 only.
- Click `Not started`: subtitle `5 topics: Not started`, rows 4 to 8.
- Click `All`: the 8 rows and `8 of 44 topics shown` return.
- Choose `Completed`, then click `Clear list`: subtitle `0 topics: Completed` and `No topics to show.`. Click `Restore list`: rows 1 and 2 come back (the filter is still `Completed`).

**Check yourself**
- [ ] Exactly one chip is green at any time.
- [ ] `Not started` shows 5 rows, and the last row still shows the arrow in `Parent → Child Communication with input()`.
- [ ] `Clear list` then `Restore list` still works with `All`.
- [ ] Narrow the card (make the window about 600px wide): the chips wrap to a second line instead of overflowing.
- [ ] The terminal and the browser console (F12, Console tab) show no errors.

**Build it yourself first.** Use today's `README.md` as your reference. If you are stuck for 15 minutes, open `walkthrough.md`.

Open a hint only after 10 minutes of trying.

## Challenges: extend Topic filters

Challenges are added to the same app and the same data. Each one changes only the files named in it, inside `src/app/topic-catalog/`.

## Challenge 1: Accessible chips (HTML)
**Goal:** Tell screen readers that the chips are a group of toggle buttons and which one is on.
**Requirements**
1. In `topic-catalog.html`, change `<div class="chips">` to `<div class="chips" role="group" aria-label="Filter topics">`.
2. On each of the four chip buttons add `type="button"` and an attribute binding `[attr.aria-pressed]="filter === 'X'"` with the same `X` as that chip's other bindings. (`aria-pressed` is an attribute that says a toggle button is on (`true`) or off (`false`). You used `[attr.aria-label]` on Day 7.)

**Expected:** Nothing changes visually. Press F12, open Elements and select the chosen chip: it shows `aria-pressed="true"`. The other chips show `aria-pressed="false"`, and the values change when you click another chip.

<details><summary>Hint 1</summary>Attributes that Angular does not know as properties are bound with <code>[attr.name]</code>.</details>
<details><summary>Hint 2</summary>The value is the same comparison you already use in <code>[class.on]</code>.</details>
<details><summary>Hint 3</summary><code>&lt;button class="chip" type="button" [attr.aria-pressed]="filter === 'All'" [class.on]="filter === 'All'" (click)="setFilter('All')"&gt;All&lt;/button&gt;</code>. Repeat for the other three chips.</details>

Undo this before tomorrow.

## Challenge 2: Hover and keyboard focus (CSS)
**Goal:** Give chips feedback for the mouse and the keyboard.
**Requirements**
1. At the end of `topic-catalog.css` add `.chip:hover` with `border-color: var(--green);`.
2. Add `.chip:focus-visible` with `outline: 3px solid var(--blue); outline-offset: 2px;` (`:focus-visible` applies when a control is reached with the keyboard, as on Day 8).
3. In the existing `.chip.on` rule add `font-weight: bold;`.

**Expected:** Moving the mouse over a white chip turns its border green. Pressing Tab until a chip is focused draws a blue outline around it. The green chip has bold text.

<details><summary>Hint 1</summary>Only <code>topic-catalog.css</code> changes.</details>
<details><summary>Hint 2</summary>Two new rules with a colon word after <code>.chip</code>, and one new line inside an existing rule.</details>
<details><summary>Hint 3</summary><code>.chip:hover { border-color: var(--green); }</code> and <code>.chip:focus-visible { outline: 3px solid var(--blue); outline-offset: 2px; }</code>. Add <code>font-weight: bold;</code> inside <code>.chip.on { ... }</code>.</details>

Undo this before tomorrow.

## Challenge 3 (stretch): Counts inside the chips
**Goal:** Show how many topics each status has, using a second method.
**Requirements**
1. In `topic-catalog.ts` add the method `countOf(status: string): number` that returns `this.topics.filter(topic => topic.status === status).length;`.
2. In `topic-catalog.html` change the chip texts to `All ({{ topics.length }})`, `Completed ({{ countOf('Completed') }})`, `In progress ({{ countOf('In progress') }})` and `Not started ({{ countOf('Not started') }})`. Bindings and `(click)` stay the same.

**Expected:** The chips read `All (8)`, `Completed (2)`, `In progress (1)`, `Not started (5)`. After `Clear list` all four show `(0)`; after `Restore list` the numbers return.

<details><summary>Hint 1</summary>You already wrote the same filter in <code>visibleTopics()</code>. Here the status comes in as a parameter, and you count instead of returning the array.</details>
<details><summary>Hint 2</summary>An array has <code>.length</code>. A filtered array also has <code>.length</code>.</details>
<details><summary>Hint 3</summary><code>countOf(status: string): number { return this.topics.filter(topic => topic.status === status).length; }</code>. In the template, <code>{{ countOf('Completed') }}</code> goes inside the button text.</details>

Undo this before tomorrow.

## Challenge 4 (stretch): A third subtitle with `@else if`
**Goal:** Choose between three pieces of template.
**Requirements**
1. In `topic-catalog.html`, between the `@if (filter === 'All') { ... }` block and `@else { ... }`, add `@else if (visibleTopics().length === 0)` with the block `<p class="sub">No topics match: {{ filter }}</p>`. Write it as `} @else if (...) {` on one line.

**Expected:** With `All`, the subtitle is unchanged (`8 of 44 topics shown`, or `0 of 44 topics shown` after Clear). Click `Completed`, then `Clear list`: the subtitle reads `No topics match: Completed`. Click `Restore list`: it returns to `2 topics: Completed`.

<details><summary>Hint 1</summary>An <code>@if</code> can have several checks in a row. Angular uses the first one that is true.</details>
<details><summary>Hint 2</summary>The extra check has the shape <code>} @else if (condition) { ... }</code> and goes before the final <code>} @else { ... }</code>.</details>
<details><summary>Hint 3</summary><code>} @else if (visibleTopics().length === 0) {</code> then <code>&lt;p class="sub"&gt;No topics match: {{ filter }}&lt;/p&gt;</code> then <code>} @else {</code>.</details>

Undo this before tomorrow.

## When you finish
When you finish: paste your files here for review.
