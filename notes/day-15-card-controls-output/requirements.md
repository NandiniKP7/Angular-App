# Day 15 Practical Requirements

**Time:** 30 minutes. **Core:** the project and Challenges 1-2 (about 20 minutes for the project, 5 minutes for each challenge). Challenges 3-4 are stretch: do them if you have time.

## Before you start
Open your `learnbuddy` project as you left it on Day 14, with `ng serve` running. It has:
- Components `App`, `Sidebar`, `Header`, `MyLearning`, `TodayBuild`, `TrackCards`, `TodayChoice`, `TopicCatalog`, `TopicCard`.
- `src/app/models/topic.ts` (`TopicStatus`, `Topic`) and `src/app/data/angular-topics.ts` (`ANGULAR_TOPICS: Topic[]`, 8 topics).
- `TodayBuild` with `topicNo` `'08'` and `topicTitle` `'Parent → Child Communication with input()'`.
- `TopicCard` with `topic = input.required<Topic>()`, `compact = input(false, { transform: booleanAttribute })` and the method `percent()`. Its template shows the number, title, badge, `Subtopics: x / y` and the progress bar.
- `TopicCatalog` with `topics: Topic[]`, `filter: string = 'all'`, `setFilter()`, `visibleTopics(): Topic[]`, `clear()`, `restore()`, four filter chips, the `Clear list` / `Restore list` buttons, and `<app-topic-card [topic]="topic" />` inside `@for` in `<div class="cards">`.

## Today's project: Card controls with output()

**What it does:** Every topic card gets three small buttons: `Open`, `Complete`, `Review`. A button click sends an event to the catalog with the topic number. The catalog shows what happened in a line `Last action: ...`, and `Complete` changes the topic: status `done`, all subtopics done, progress bar full. All values are in `ui-breakdown.md`; the picture is `ui.svg`.

**Requirements**
1. In `today-build.ts`, change `topicNo` to `'09'` and `topicTitle` to `'Child → Parent Communication with output()'`.
2. In `topic-card.ts`: add `output` to the import (`import { Component, booleanAttribute, input, output } from '@angular/core';`). After the `compact` line add three outputs, each `output<number>()`: `opened`, `completed`, `reviewRequested`. `imports` stays `[]`; `percent()` is unchanged.
3. In `topic-card.html`: after the `@if (!compact()) { ... }` block and before the `</div>` that closes `.body`, add `<div class="actions">` with three buttons. `Open` has `(click)="opened.emit(topic().no)"`. `Complete` has `(click)="completed.emit(topic().no)"` and `[disabled]="topic().status === 'done'"`. `Review` has `(click)="reviewRequested.emit(topic().no)"`.
4. In `topic-card.css`: add at the end the three rules `.actions`, `.actions button`, `.actions button:disabled` from the `topic-card.css` table of `ui-breakdown.md`.
5. In `topic-catalog.ts`: add the property `lastAction: string = 'Nothing yet';` after `filter`. Before `clear()` add three methods: `onOpen(no: number): void` sets `this.lastAction = 'Opened topic ' + no;`. `onReview(no: number): void` sets `'Review requested for topic ' + no`. `onComplete(no: number): void` replaces `this.topics` with `this.topics.map(...)`: for the topic whose `no` equals the parameter, a copy `{ ...topic, status: 'done', subtopicsDone: topic.subtopicsTotal }`, for all others the topic itself; the arrow function has the return type `Topic`. Then it sets `this.lastAction = 'Completed topic ' + no;`.
6. In `topic-catalog.html`: the `<app-topic-card ... />` tag gets three listeners besides `[topic]="topic"`: `(opened)="onOpen($event)"`, `(completed)="onComplete($event)"`, `(reviewRequested)="onReview($event)"`. After the `</div>` that closes `.cards` and before `</section>`, add `<p class="last-action">Last action: {{ lastAction }}</p>`.
7. In `topic-catalog.css`: add at the end the `.last-action` rule from `ui-breakdown.md`.

**Expected screen** (compare with `ui.svg`)
- Banner: `TODAY'S BUILD · TOPIC 09` and `Child → Parent Communication with output()`.
- The Angular Roadmap card has 8 cards in two columns as yesterday. Under each progress bar are three small white buttons `Open`, `Complete`, `Review`.
- Under the cards: `Last action: Nothing yet`.
- On topics 1 and 2 the `Complete` button text is light grey and the pointer shows "not allowed" over it.
- Click `Open` on topic 5: `Last action: Opened topic 5`. Click `Review` on topic 2: `Last action: Review requested for topic 2`.
- Click `Complete` on topic 3: its badge turns green `Completed`, the line reads `Subtopics: 5 / 5`, the bar is full, its `Complete` button is disabled, and `Last action: Completed topic 3`.
- Click `Clear list`, then `Restore list`: topic 3 is `In progress` again with `2 / 5`.

**Check yourself**
- [ ] Every card shows three buttons, and the buttons stay inside the card.
- [ ] `Complete` on topic 4 shows `Subtopics: 5 / 5` (topic 4 has 5 subtopics); on topic 8 it shows `8 / 8`.
- [ ] After Complete, the other 7 cards do not change.
- [ ] The three listeners in `topic-catalog.html` use the same names as the outputs in `topic-card.ts`.
- [ ] The terminal and the browser console (F12, Console tab) show no errors.

**Build it yourself first.** Use today's `README.md` as your reference. If you are stuck for 15 minutes, open `walkthrough.md`.

Open a hint only after 10 minutes of trying.

## Challenges: extend card controls

Challenges are added to the same app and the same data. Each one changes only the files named in it.

## Challenge 1: Name the button group (HTML)
**Goal:** Make the three buttons understandable for screen readers and mouse users.
**Requirements**
1. In `topic-card.html`, change the opening tag to `<div class="actions" role="group" aria-label="Topic actions">`.
2. Add `title="Open this topic"` to the `Open` button, `title="Mark this topic as done"` to `Complete`, and `title="Ask for a review"` to `Review`.

**Expected:** No visible change. Holding the mouse over a button shows its tooltip text after a moment.

<details><summary>Hint 1</summary>Both changes are attributes inside tags that already exist. No new elements.</details>
<details><summary>Hint 2</summary>`role` and `aria-label` go on the `<div>`. `title` goes on each `<button>`. You used `aria-label` on Day 7 and `title` on Day 6.</details>
<details><summary>Hint 3</summary>`<div class="actions" role="group" aria-label="Topic actions">` and, for example, `<button (click)="opened.emit(topic().no)" title="Open this topic">Open</button>`.</details>

Undo this before tomorrow.

## Challenge 2: Button hover and focus (CSS)
**Goal:** Give the buttons visible hover and keyboard-focus states.
**Requirements**
1. At the end of `topic-card.css` add `.actions button:hover` with `background: var(--mint);`.
2. Add `.actions button:focus-visible` with `outline: 3px solid var(--blue); outline-offset: 2px;`.
3. Add `.actions button:disabled:hover` with `background: white;` (so a disabled button does not turn mint).

**Expected:** Moving the mouse over `Open` turns it light green. Pressing Tab until a button is selected shows a blue outline. Hovering a disabled `Complete` leaves it white.

<details><summary>Hint 1</summary>Only `topic-card.css` changes. `:hover` and `:focus-visible` were used on Days 4 and 8.</details>
<details><summary>Hint 2</summary>Three new rules, each starting with `.actions button` plus a colon word. The third has two colon words in a row.</details>
<details><summary>Hint 3</summary>The `:disabled:hover` rule has more parts in its selector than `:hover`, so it is more specific and wins (Day 7). Write it after the `:hover` rule so the file reads in order.</details>

Undo this before tomorrow.

## Challenge 3 (stretch): Count review requests
**Goal:** Keep a number in the parent that changes when an event arrives.
**Requirements**
1. In `topic-catalog.ts` add the property `reviews: number = 0;` after `lastAction`.
2. In `onReview`, add the line `this.reviews = this.reviews + 1;`.
3. In `topic-catalog.html`, after the `Last action` line, add `<p class="last-action">Reviews requested: {{ reviews }}</p>`.

**Expected:** It starts at `Reviews requested: 0`. Each click on any `Review` button adds 1. `Open` and `Complete` do not change it.

<details><summary>Hint 1</summary>The number belongs to the parent, because the parent handles the event.</details>
<details><summary>Hint 2</summary>Read the old value, add 1, and store it back into the same property.</details>
<details><summary>Hint 3</summary>`this.reviews = this.reviews + 1;` inside `onReview`, as the first line. The new `<p>` can reuse the class `last-action`.</details>

Undo this before tomorrow.

## Challenge 4 (stretch): A Reset button
**Goal:** Add a fourth output and a handler that puts one topic back to its original data.
**Requirements**
1. In `topic-card.ts` add `reset = output<number>();` after `reviewRequested`.
2. In `topic-card.html`, after the `Review` button inside `.actions`, add `<button (click)="reset.emit(topic().no)">Reset</button>`.
3. In `topic-catalog.html`, add `(reset)="onReset($event)"` to the `<app-topic-card>` tag.
4. In `topic-catalog.ts` add `onReset(no: number): void`. It finds the original with `const original = ANGULAR_TOPICS.find(item => item.no === no);` and, only if `original` exists (`if (original) { ... }`), sets `this.topics` to `this.topics.map((topic): Topic => topic.no === no ? original : topic);`. After the `if` block, set `this.lastAction = 'Reset topic ' + no;`.

**Expected:** Complete topic 3, then click `Reset` on topic 3: it is `In progress`, `2 / 5`, `Complete` is enabled again, and `Last action: Reset topic 3`.

<details><summary>Hint 1</summary>It has the same four parts as the other buttons: output, button, listener, handler.</details>
<details><summary>Hint 2</summary>`.find(item => item.no === no)` returns the first matching item, or `undefined` when nothing matches. TypeScript makes you check for `undefined` with `if (original)` before using it.</details>
<details><summary>Hint 3</summary>`ANGULAR_TOPICS` is already imported in `topic-catalog.ts`, and it was never changed by `Complete`, so it still holds the original topic.</details>

Undo this before tomorrow.

## When you finish
When you finish: paste your files here for review.
