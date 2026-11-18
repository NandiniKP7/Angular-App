# Day 13 Practical Requirements

**Time:** 30 minutes. **Core:** the project and Challenges 1-2 (about 20 minutes for the project, 5 minutes for each challenge). Challenges 3-4 are stretch: do them if you have time.

## Before you start
Open your `learnbuddy` project as you left it on Day 12, with `ng serve` running. It has:
- Components `App`, `Sidebar`, `Header`, `MyLearning`, `TodayBuild`, `TrackCards`, `TodayChoice`, `TopicCatalog` (no `WelcomeCard`).
- `TodayBuild` with `topicNo` `'07'` and `topicTitle` `'Angular Template Control Flow'`.
- `my-learning.html` with `<app-today-build />`, the `.two-col` div (`<app-track-cards />` and `<app-today-choice />`), then `<app-topic-catalog />`.
- `topic-catalog.ts` with `const ANGULAR_TOPICS` (8 objects with `no`, `title` and `status` as the codes `'done'`, `'in-progress'`, `'not-started'`), `topics = [...ANGULAR_TOPICS];`, `filter: string = 'all';`, and the methods `setFilter`, `visibleTopics`, `clear`, `restore`. `imports` is `[]`.
- `topic-catalog.html` with the card `Angular Roadmap`, the `@if (filter === 'all') ... @else` sub line, four filter chips (`All`, `Completed`, `In progress`, `Not started`), `Clear list` and `Restore list`, and a `<ul class="topic-list">` whose `@for` uses `let last = $last, odd = $odd` and an `@switch (topic.status)` for the badge.
- `topic-catalog.css` with the rules for `.sub`, `.actions`, `.topic-list`, `.topic-row` (with `.odd` and `.last`), `.num`, `.title`, `.badge*`, `.empty`, `.chips`, `.chip`, `.chip.on`.

## Today's project: Reusable topic card

**What it does:** A new component, `TopicCard`, shows one topic: a round number, the title and a status badge. The catalog shows 8 of them in a 2-column grid. The filter chips, `Clear list` and `Restore list` still work. All data and CSS values are in `ui-breakdown.md`; the picture is `ui.svg`.

**Requirements**
1. In `today-build.ts`, change `topicNo` to `'08'` and `topicTitle` to `'Parent → Child Communication with input()'`.
2. Generate the component `topic-card` with `--skip-tests` (class `TopicCard`, selector `app-topic-card`).
3. In `topic-card.ts`: import `Component` and `input` from `'@angular/core'`. The class has exactly three inputs: `no = input.required<number>();`, `title = input('Untitled topic');`, `status = input('not-started');`. `imports` stays `[]`.
4. In `topic-card.html`: one `<article class="topic-card">` holding `<span class="no">{{ no() }}</span>` and `<div class="body">`. The body holds `<strong>{{ title() }}</strong>` and an `@switch (status())` with `@case ('done')` showing `<span class="badge done">Completed</span>`, `@case ('in-progress')` showing `<span class="badge progress">In progress</span>`, and `@default` showing `<span class="badge">Not started</span>`.
5. In `topic-card.css`: the seven rules in the `topic-card.css` table of `ui-breakdown.md`.
6. In `topic-catalog.ts`: add the line `import { TopicCard } from '../topic-card/topic-card';` and set `imports: [TopicCard]`. Everything else stays as it was.
7. In `topic-catalog.html`: replace the whole `<ul class="topic-list">...</ul>` by `<div class="cards">` containing `@for (topic of visibleTopics(); track topic.no)` with the line `<app-topic-card [no]="topic.no" [title]="topic.title" [status]="topic.status" />`, and an `@empty` block with `<p class="empty">No topics to show.</p>`. The sub line, chips and action buttons stay.
8. In `topic-catalog.css`: delete the rules listed as removed in `ui-breakdown.md`, and add `.cards` and the `@media (max-width: 800px)` block exactly as in the table.

**Expected screen** (compare with `ui.svg`)
- Banner: `TODAY'S BUILD · TOPIC 08` and `Parent → Child Communication with input()`.
- The card `Angular Roadmap` with subtitle `8 of 44 topics shown`, four chips (`All` is green), and two white buttons.
- Under them, 8 white cards in 2 columns and 4 rows, no list rows. Each card: a mint circle with a green number, a bold title, and a pill below the title. Cards 1 and 2 have a green `Completed` pill, card 3 a blue `In progress` pill, cards 4 to 8 a grey `Not started` pill.
- Click the chip `Not started`: cards 4 to 8 remain, the subtitle reads `5 topics match this filter`. Click `Clear list`: `No topics to show.` appears. Click `Restore list` and `All`: 8 cards return.
- On a window narrower than 800px (F12, device toolbar): one column of cards.

**Check yourself**
- [ ] The numbers 1 to 8 are inside round circles, not squashed ovals.
- [ ] Card 8 shows `Parent → Child Communication with input()` and card 1 shows the `&`.
- [ ] The pills have the right colors; none are unstyled.
- [ ] The filter chips still change the cards.
- [ ] `topic-catalog.css` no longer contains `.badge`.
- [ ] The terminal and the browser console (F12, Console tab) show no errors.

**Build it yourself first.** Use today's `README.md` as your reference. If you are stuck for 15 minutes, open `walkthrough.md`.

Open a hint only after 10 minutes of trying.

## Challenges: extend the reusable card

Challenges are added to the same app and the same data.

## Challenge 1: Default values and plain text inputs (Angular)
**Goal:** See the defaults of `title` and `status`, and set an input without brackets.
**Requirements**
1. In `topic-catalog.html`, inside `<div class="cards">`, after the closing `}` of the `@empty` block, add two lines: `<app-topic-card [no]="9" />` and `<app-topic-card [no]="10" status="done" />`.

**Expected:** Two extra cards at the end (10 cards in total). Card 9 shows `Untitled topic` with a grey `Not started` pill. Card 10 shows `Untitled topic` with a green `Completed` pill.

<details><summary>Hint 1</summary>The new tags go in the parent file, not in `topic-card.ts`.</details>
<details><summary>Hint 2</summary>The required input `no` must be on both tags, written with brackets so that `9` is a number. `title` is missing on purpose, so its default is used.</details>
<details><summary>Hint 3</summary>`status="done"` has no brackets, so Angular passes the text `done`. Place both lines after `}` of `@empty` and before `</div>`.</details>

Undo this before tomorrow.

## Challenge 2: Restyle the number circle (CSS)
**Goal:** Change the card look using only CSS.
**Requirements**
1. In `topic-card.css`, in the `.no` rule, change `background` to `var(--green)` and `color` to `white`.
2. Add a rule `.topic-card:hover` with `border-color: var(--green);`.
3. In the `.badge` rule add `text-transform: uppercase;`.

**Expected:** The circles are solid green with white numbers. Moving the mouse over a card turns its border green. The pills read `COMPLETED`, `IN PROGRESS`, `NOT STARTED`.

<details><summary>Hint 1</summary>Only `topic-card.css` changes.</details>
<details><summary>Hint 2</summary>Two changes are edits of values inside an existing rule; one is a new rule with the `:hover` word after the class name.</details>
<details><summary>Hint 3</summary>`.topic-card:hover { border-color: var(--green); }` goes at the end of the file. `text-transform` only changes how letters are shown; the text in the HTML stays `Completed`.</details>

Undo this before tomorrow.

## Challenge 3 (stretch): A small note line (HTML)
**Goal:** Use `<small>` and an input value inside a card.
**Requirements**
1. In `topic-card.html`, inside `<div class="body">`, after the closing `}` of the `@switch` block, add `<small>Topic {{ no() }} of 8</small>`.
2. In `topic-card.css` add `.body small` with `display: block; margin-top: 6px; color: var(--muted); font-size: 12px;`.

**Expected:** Each card has a small grey line under the pill: `Topic 1 of 8`, `Topic 2 of 8`, up to `Topic 8 of 8`.

<details><summary>Hint 1</summary>`<small>` is an HTML element like `<strong>`; it goes inside the body div.</details>
<details><summary>Hint 2</summary>The number comes from the input `no`, read with `()` inside `{{ }}`.</details>
<details><summary>Hint 3</summary>`<small>Topic {{ no() }} of 8</small>`. Without `display: block` the note would sit on the same line as the pill.</details>

Undo this before tomorrow.

## Challenge 4 (stretch): A third input, `highlight` (Angular)
**Goal:** Add your own input to the card and bind it from the parent.
**Requirements**
1. In `topic-card.ts` add the line `highlight = input(false);` (a boolean input, default `false`).
2. In `topic-card.html` change the opening tag to `<article class="topic-card" [class.highlight]="highlight()">`.
3. In `topic-card.css` add `.topic-card.highlight` with `border-color: var(--green);`.
4. In `topic-catalog.html`, add to the `<app-topic-card ... />` line inside `@for` the binding `[highlight]="topic.status === 'in-progress'"`.

**Expected:** Only card 3 (Components) has a green border. Choosing the chip `Not started` shows 5 cards with no green border.

<details><summary>Hint 1</summary>Three files change in the card and one in the parent: declare, use, style, bind.</details>
<details><summary>Hint 2</summary>`[class.highlight]="highlight()"` is the Day 7 class binding with the input read by `()`. The binding in the parent has the same shape as the three bindings that are already there.</details>
<details><summary>Hint 3</summary>The parent line ends with `[status]="topic.status" [highlight]="topic.status === 'in-progress'" />`. The `.topic-card.highlight` rule has no space between the names, so it needs both classes.</details>

Undo this before tomorrow.

## When you finish
When you finish: paste your files here for review.
