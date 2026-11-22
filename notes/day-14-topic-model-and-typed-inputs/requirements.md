# Day 14 Practical Requirements

**Time:** 30 minutes. **Core:** the project and Challenges 1-2 (about 20 minutes for the project, 5 minutes for each challenge). Challenges 3-4 are stretch: do them if you have time.

## Before you start
Open your `learnbuddy` project as you left it on Day 13, with `ng serve` running. It has:
- Components `App`, `Sidebar`, `Header`, `MyLearning`, `TodayBuild`, `TrackCards`, `TodayChoice`, `TopicCatalog`, `TopicCard`.
- `TodayBuild` with `topicNo` `'08'` and `topicTitle` `'Parent → Child Communication with input()'`.
- `topic-card.ts` with the three inputs `no = input.required<number>();`, `title = input('Untitled topic');`, `status = input('not-started');`; `topic-card.html` with `{{ no() }}`, `{{ title() }}` and the `@switch (status())`; `topic-card.css` with `.topic-card`, `.no`, `.body`, `.body strong`, `.badge`, `.badge.done`, `.badge.progress`.
- `topic-catalog.ts` with `import { TopicCard } from '../topic-card/topic-card';`, `imports: [TopicCard]`, `const ANGULAR_TOPICS` (8 objects with `no`, `title`, `status` using the codes), `topics = [...ANGULAR_TOPICS];`, `filter: string = 'all';` and the methods `setFilter`, `visibleTopics`, `clear`, `restore`.
- `topic-catalog.html` whose `.cards` div has `<app-topic-card [no]="topic.no" [title]="topic.title" [status]="topic.status" />` inside `@for`.
- `topic-catalog.css` with `.sub`, `.actions`, `.actions button`, `.empty`, `.chips`, `.chip`, `.chip.on`, `.cards` and its `@media` block.

## Today's project: Topic model and typed inputs

**What it does:** One `Topic` type describes a topic, the data lives in `data/angular-topics.ts`, and each card receives the whole topic as one input. Each card now shows `Subtopics: done / total` and a progress bar. The card also has a `compact` flag (not used by the catalog yet). All data and CSS values are in `ui-breakdown.md`; the picture is `ui.svg`.

**Requirements**
1. Create the folder `src/app/models/` and the file `topic.ts` with exactly: `export type TopicStatus = 'done' | 'in-progress' | 'not-started';` and `export interface Topic` with the five properties `no: number; title: string; status: TopicStatus; subtopicsDone: number; subtopicsTotal: number;`.
2. Create the folder `src/app/data/` and the file `angular-topics.ts`: `import { Topic } from '../models/topic';` then `export const ANGULAR_TOPICS: Topic[] = [ ... ];` with the 8 objects from the data table in `ui-breakdown.md`, copied exactly (all five properties each).
3. In `topic-card.ts`: import `Component`, `booleanAttribute` and `input` from `'@angular/core'`, and `Topic` from `'../models/topic'`. Replace the three inputs by `topic = input.required<Topic>();` and `compact = input(false, { transform: booleanAttribute });`. Add the method `percent(): number` as in `README.md` concept 5.
4. In `topic-card.html`: the opening tag is `<article class="topic-card" [class.compact]="compact()">`. Use `topic().no`, `topic().title` and `@switch (topic().status)` (the same three cases as before). After the `@switch`, add an `@if (!compact())` block with `<small>Subtopics: {{ topic().subtopicsDone }} / {{ topic().subtopicsTotal }}</small>` and the bar: `<div class="bar" [attr.aria-label]="'Progress ' + percent() + ' percent'">` holding `<div class="bar-fill" [style.width.%]="percent()"></div>`.
5. In `topic-card.css`: keep the seven Day 13 rules, then add `.body small`, `.bar`, `.bar-fill` and `.compact` (in this order, at the end of the file) with the values in `ui-breakdown.md`.
6. In `topic-catalog.ts`: delete the `const ANGULAR_TOPICS` block; import `Topic` from `'../models/topic'` and `ANGULAR_TOPICS` from `'../data/angular-topics'`; write `topics: Topic[] = [...ANGULAR_TOPICS];` and `visibleTopics(): Topic[]`. Everything else stays.
7. In `topic-catalog.html`, change the card line to `<app-topic-card [topic]="topic" />`.

**Expected screen** (compare with `ui.svg`)
- Same banner (topic 08), the same Angular Roadmap card, chips and buttons as Day 13, with 8 cards in 2 columns.
- Each card is taller: after the pill it has a grey line `Subtopics: 6 / 6` and a grey bar with a green fill. Cards 1 and 2 have a full green bar. Card 3 shows `Subtopics: 2 / 5` and a bar filled 40%. Cards 4 to 8 show `Subtopics: 0 / ...` and an empty (all grey) bar.
- Chips, `Clear list` and `Restore list` work as yesterday.

**Check yourself**
- [ ] `src/app/models/topic.ts` and `src/app/data/angular-topics.ts` exist and `topic-catalog.ts` no longer contains the topic objects.
- [ ] Card 3 shows `Subtopics: 2 / 5` and the fill is 40% wide.
- [ ] No red underline in the editor under `status` values in the data file.
- [ ] The parent card line has only `[topic]="topic"`.
- [ ] The terminal and the browser console (F12, Console tab) show no errors.

**Build it yourself first.** Use today's `README.md` as your reference. If you are stuck for 15 minutes, open `walkthrough.md`.

Open a hint only after 10 minutes of trying.

## Challenges: extend the typed card

Challenges are added to the same app and the same data.

## Challenge 1: Try the `compact` flag (Angular)
**Goal:** Use the flag you declared in the card.
**Requirements**
1. In `topic-catalog.html`, change the card line to `<app-topic-card [topic]="topic" compact />` and look at the browser.
2. Then change it to `<app-topic-card [topic]="topic" [compact]="topic.no > 3" />`.

**Expected:** After step 1 all 8 cards are small: no `Subtopics` line and no bar, less padding. After step 2 cards 1 to 3 are full and cards 4 to 8 are compact.

<details><summary>Hint 1</summary>Only `topic-catalog.html` changes.</details>
<details><summary>Hint 2</summary>The flag is written as a name alone (like `disabled`), or with brackets and an expression that is `true` or `false`.</details>
<details><summary>Hint 3</summary>`topic.no > 3` is `true` for topics 4 to 8 and `false` for topics 1 to 3. `booleanAttribute` is what makes the name-alone form work.</details>

Undo this before tomorrow.

## Challenge 2: Thicker bar and hover (CSS)
**Goal:** Restyle the bar and card with CSS only.
**Requirements**
1. In `topic-card.css`, in the `.bar` rule, change `height` to `12px`.
2. Add a rule `.topic-card:hover` with `border-color: var(--green);` before the `.compact` rule (keep `.compact` last).
3. In the `.body small` rule add `font-weight: bold;`.

**Expected:** The bars are 12px tall. Moving the mouse over a card turns its border green. The `Subtopics: ...` lines are bold.

<details><summary>Hint 1</summary>Only `topic-card.css` changes.</details>
<details><summary>Hint 2</summary>Two edits are changes inside existing rules; one is a new rule with `:hover`.</details>
<details><summary>Hint 3</summary>`.topic-card:hover { border-color: var(--green); }`. Put it above `.compact` so `.compact` is still the last rule.</details>

Undo this before tomorrow.

## Challenge 3 (stretch): A percent line (HTML)
**Goal:** Show the result of `percent()` as text.
**Requirements**
1. In `topic-card.html`, inside the `@if (!compact())` block, after the closing `</div>` of `.bar`, add `<small>{{ percent() }}% complete</small>`.

**Expected:** Under each bar a small grey line: `100% complete` for cards 1 and 2, `40% complete` for card 3, `0% complete` for cards 4 to 8.

<details><summary>Hint 1</summary>The text goes inside the `@if` block, so it hides in compact cards.</details>
<details><summary>Hint 2</summary>`percent()` is a method: call it with `()` inside `{{ }}`.</details>
<details><summary>Hint 3</summary>`<small>{{ percent() }}% complete</small>`. The `.body small` rule already styles it.</details>

Undo this before tomorrow.

## Challenge 4 (stretch): Let the type protect your data (TypeScript)
**Goal:** Add a ninth topic and see a type error.
**Requirements**
1. In `data/angular-topics.ts`, add a 9th object: `{ no: 9, title: 'Child → Parent Communication with output()', status: 'finished', subtopicsDone: 0, subtopicsTotal: 6 }`. Read the error.
2. Change `'finished'` to `'not-started'`.

**Expected:** After step 1, the terminal reports that `'finished'` is not assignable to type `TopicStatus`. After step 2 the error is gone, a 9th card shows, the subtitle reads `9 of 44 topics shown`, and the chip `Not started` shows 6 cards.

<details><summary>Hint 1</summary>The new object goes at the end of the array, after a comma following object 8.</details>
<details><summary>Hint 2</summary>The error message names the type `TopicStatus`. Open `models/topic.ts` to see the allowed texts.</details>
<details><summary>Hint 3</summary>The allowed texts are `'done'`, `'in-progress'` and `'not-started'`. Use `'not-started'` for the 9th topic.</details>

Undo this before tomorrow.

## When you finish
When you finish: paste your files here for review.
