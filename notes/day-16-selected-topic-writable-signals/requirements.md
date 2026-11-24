# Day 16 Practical Requirements

**Time:** 30 minutes. **Core:** the project and Challenges 1-2 (about 20 minutes for the project, 5 minutes for each challenge). Challenges 3-4 are stretch: do them if you have time.

## Before you start
Open your `learnbuddy` project as you left it on Day 15, with `ng serve` running. It has:
- Components `App`, `Sidebar`, `Header`, `MyLearning`, `TodayBuild`, `TrackCards`, `TodayChoice`, `TopicCatalog`, `TopicCard`; plus `models/topic.ts` and `data/angular-topics.ts`.
- `TodayBuild` with `topicNo` `'09'` and `topicTitle` `'Child → Parent Communication with output()'`.
- `TopicCard` with the input `topic`, the input `compact`, the outputs `opened`, `completed`, `reviewRequested`, and the three buttons `Open`, `Complete`, `Review`.
- `TopicCatalog` with plain properties `topics: Topic[]`, `filter: string`, `lastAction: string`, the methods `setFilter`, `visibleTopics`, `onOpen`, `onComplete`, `onReview`, `clear`, `restore`, and `<p class="last-action">Last action: {{ lastAction }}</p>`. `onOpen` only sets `lastAction`.

## Today's project: Selected topic with writable signals

**What it does:** The catalog's data moves into signals. Clicking `Open` on a card remembers that topic's number and shows a mint panel `Selected topic: <title> (<status>)` under the cards. The rest of the page behaves as yesterday. All values are in `ui-breakdown.md`; the picture is `ui.svg`.

**Requirements**
1. In `today-build.ts`, change `topicNo` to `'10'` and `topicTitle` to `'Writable Signals'`.
2. In `topic-catalog.ts`: import `signal` (`import { Component, signal } from '@angular/core';`). Replace the three properties with four signals, in this order: `topics = signal<Topic[]>([...ANGULAR_TOPICS]);`, `filter = signal<string>('all');`, `selectedNo = signal<number | null>(null);`, `lastAction = signal<string>('Nothing yet');`.
3. In the same file, update every method as in the signal table of `ui-breakdown.md`: `setFilter` uses `this.filter.set(value)`; `visibleTopics()` reads `this.filter()` and `this.topics()`; `clear()` and `restore()` use `this.topics.set(...)`; `onComplete` uses `this.topics.set(this.topics().map(...))` with the same `.map` as Day 15; the three `on...` methods write with `this.lastAction.set(...)`; `onOpen` also calls `this.selectedNo.set(no)` first.
4. Add the method `selectedTopic(): Topic | undefined` that returns `this.topics().find(topic => topic.no === this.selectedNo())`.
5. In `topic-catalog.html`: every property read becomes a signal read with `()`: `filter()`, `topics().length`, `lastAction()`. After the `.cards` div and before the `last-action` line, add the `@if (selectedTopic(); as chosen) { ... } @else { ... }` block with the two `<div class="selected">` texts from `ui-breakdown.md`. In the first one the title is inside `<strong>` and the status follows in parentheses.
6. In `topic-catalog.css`: add the `.selected` rule at the end.

**Expected screen** (compare with `ui.svg`)
- Banner: `TODAY'S BUILD · TOPIC 10` and `Writable Signals`.
- Everything looks as on Day 15, plus a mint panel under the cards: `Selected topic: none. Click Open on a card.`, then `Last action: Nothing yet`.
- Click `Open` on topic 3: the panel reads `Selected topic: Components (in-progress)` and `Last action: Opened topic 3`.
- Click `Complete` on topic 3: the panel changes to `Selected topic: Components (done)`.
- Click `Clear list`: the panel says `none` and the subtitle reads `0 of 44 topics shown`. Click `Restore list`: topic 3 is selected again and shows `(in-progress)`.
- Chips filter the cards as before (`Completed` shows topics 1 and 2).

**Check yourself**
- [ ] The class has no plain `topics: Topic[]`, `filter: string` or `lastAction: string` properties any more.
- [ ] No template line reads `topics.length`, `filter` or `lastAction` without `()`.
- [ ] No code assigns a signal with `=` (search the file for `this.topics =`, `this.filter =`).
- [ ] `selectedNo` is typed `number | null` and `selectedTopic()` is typed `Topic | undefined`.
- [ ] The terminal and the browser console (F12, Console tab) show no errors.

**Build it yourself first.** Use today's `README.md` as your reference. If you are stuck for 15 minutes, open `walkthrough.md`.

Open a hint only after 10 minutes of trying.

## Challenges: extend the selected topic

Challenges are added to the same app and the same data. Each one changes only the files named in it, inside `src/app/topic-catalog/`.

## Challenge 1: Announce the panel (HTML)
**Goal:** Make screen readers announce the panel and the last action when they change. A screen reader is software that reads the page aloud for people who cannot see it. The HTML attribute `aria-live="polite"` tells it to read an element's new text when the text changes, and `role="status"` tells it the element shows a status message.
**Requirements**
1. In `topic-catalog.html`, add `aria-live="polite"` to both `<div class="selected">` tags.
2. Add `role="status"` to `<p class="last-action">`.

**Expected:** No visible change. The two attributes are in the page (F12, Elements tab) on the panel and on the last-action line.

<details><summary>Hint 1</summary>Both changes are attributes on elements that already exist.</details>
<details><summary>Hint 2</summary>An attribute is written inside the opening tag, after the class: `<div class="selected" aria-live="polite">`.</details>
<details><summary>Hint 3</summary>`<p class="last-action" role="status">Last action: {{ lastAction() }}</p>`. Both `.selected` divs (the one in `@if` and the one in `@else`) need the attribute.</details>

Undo this before tomorrow.

## Challenge 2: Stronger highlight (CSS)
**Goal:** Make the panel stand out more, and mark the bold title in green.
**Requirements**
1. In the `.selected` rule add `border-left: 4px solid var(--green);`.
2. Add a new rule `.selected strong` with `color: var(--green);`.
3. Add `font-style: italic;` to the `.last-action` rule.

**Expected:** The panel has a thick green line on its left edge. The topic title inside it is green. The `Last action` text is in italics.

<details><summary>Hint 1</summary>Only `topic-catalog.css` changes. Two existing rules get one new line each, and one rule is new.</details>
<details><summary>Hint 2</summary>`border-left` takes width, style and color, like `border` (Day 2). The new rule selects `strong` inside `.selected`.</details>
<details><summary>Hint 3</summary>`.selected strong { color: var(--green); }`. If the title stays black, check the spelling of `.selected strong` and that the panel from `@if` has the `<strong>` tag.</details>

Undo this before tomorrow.

## Challenge 3 (stretch): Clear the selection
**Goal:** Set a signal back to `null`.
**Requirements**
1. In `topic-catalog.ts` add `clearSelection(): void` that calls `this.selectedNo.set(null);` and then `this.lastAction.set('Selection cleared');`.
2. In `topic-catalog.html`, inside `<div class="actions">` after `Restore list`, add `<button (click)="clearSelection()">Clear selection</button>`.

**Expected:** After `Open` on topic 5, `Clear selection` changes the panel to `none` and the last action to `Selection cleared`. The cards stay.

<details><summary>Hint 1</summary>`selectedNo` can hold `null`, and `null` already means "nothing selected".</details>
<details><summary>Hint 2</summary>It works like `clear()`: one method, one button, and `.set(...)` on signals.</details>
<details><summary>Hint 3</summary>`clearSelection(): void { this.selectedNo.set(null); this.lastAction.set('Selection cleared'); }` (written on separate lines as the other methods). The button goes inside the existing `.actions` div, so its style already exists.</details>

Undo this before tomorrow.

## Challenge 4 (stretch): Count how often Open is used
**Goal:** Use a number signal that changes from its own old value.
**Requirements**
1. In `topic-catalog.ts` add `openCount = signal<number>(0);` after `lastAction`.
2. In `onOpen`, add `this.openCount.set(this.openCount() + 1);`.
3. In `topic-catalog.html`, after the `last-action` line, add `<p class="last-action">Opened {{ openCount() }} times</p>`.

**Expected:** It starts at `Opened 0 times`. Every click on any `Open` button adds 1, including repeated clicks on the same card.

<details><summary>Hint 1</summary>You need a new signal and one change inside `onOpen`.</details>
<details><summary>Hint 2</summary>To add 1, read the old value with `()`, add 1, and give the result to `.set()`.</details>
<details><summary>Hint 3</summary>`this.openCount.set(this.openCount() + 1);`. In the template you must write `openCount()`, with the brackets.</details>

Undo this before tomorrow.

## When you finish
When you finish: paste your files here for review.
