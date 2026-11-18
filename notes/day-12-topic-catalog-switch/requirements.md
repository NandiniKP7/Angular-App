# Day 12 Practical Requirements

**Time:** 30 minutes. **Core:** the project and Challenges 1-2 (about 20 minutes for the project, 5 minutes for each challenge). Challenges 3-4 are stretch: do them if you have time.

## Before you start
Open your `learnbuddy` project as you left it on Day 11, with `ng serve` running. It has:
- Components `App`, `Sidebar`, `Header`, `MyLearning`, `TodayBuild`, `TrackCards`, `TodayChoice`, `TopicCatalog`.
- `TodayBuild` with `topicNo` `'07'` and `topicTitle` `'Angular Template Control Flow'`.
- `topic-catalog.ts` with `ANGULAR_TOPICS` (statuses written as labels: `'Completed'`, `'In progress'`, `'Not started'`), `topics = [...ANGULAR_TOPICS];`, `filter: string = 'All';`, `setFilter()`, `visibleTopics()`, `clear()` and `restore()`.
- `topic-catalog.html` with the `@if (filter === 'All')` / `@else` subtitle, four chips, the two buttons, and the `@for (topic of visibleTopics(); track topic.no)` list with one `<span class="badge" [class.done]=... [class.progress]=...>`.
- `topic-catalog.css` with the Day 10 rules and the `.chips`, `.chip`, `.chip.on` rules.
- No challenge code from Day 11 (no `aria-pressed`, no `countOf`, no `@else if`, no hover rule).

## Today's project: Status badges with `@switch`

**What it does:** The data now stores status codes. Each row's badge is chosen with `@switch`. Rows get classes from loop variables, which give faint stripes on every second row and remove the line under the last row. Filters work as yesterday. All data and CSS values are in `ui-breakdown.md`; the picture is `ui.svg`.

**Requirements**
1. `today-build.ts` stays `topicNo` `'07'` and `topicTitle` `'Angular Template Control Flow'`. Do not change it.
2. In `topic-catalog.ts`: change the `status` of the 8 topics to codes: topics 1 and 2 `'done'`, topic 3 `'in-progress'`, topics 4 to 8 `'not-started'` (titles and numbers unchanged). Change the property to `filter: string = 'all';` and, in `visibleTopics()`, compare with `'all'` instead of `'All'`. Everything else in the file stays.
3. In `topic-catalog.html`:
   - The subtitle: `@if (filter === 'all')` shows `<p class="sub">{{ topics.length }} of 44 topics shown</p>`; the `@else` block shows `<p class="sub">{{ visibleTopics().length }} topics match this filter</p>`.
   - The four chips keep their texts (`All`, `Completed`, `In progress`, `Not started`) but use these codes in both `[class.on]="filter === 'X'"` and `(click)="setFilter('X')"`: `'all'`, `'done'`, `'in-progress'`, `'not-started'`.
   - The loop line is `@for (topic of visibleTopics(); track topic.no; let last = $last, odd = $odd) {`.
   - The `<li>` is `<li class="topic-row" [class.last]="last" [class.odd]="odd">`.
   - Inside the `<li>`, keep the `num` and `title` spans. Replace the old badge `<span>` by a `@switch (topic.status)` with `@case ('done')` -> `<span class="badge done">Completed</span>`, `@case ('in-progress')` -> `<span class="badge progress">In progress</span>`, and `@default` -> `<span class="badge">Not started</span>`.
   - The `@empty` block stays.
4. At the end of `topic-catalog.css` add `.topic-row.odd` (`background: #fafcfc;`) and `.topic-row.last` (`border-bottom: 0;`). All older rules stay.

**Expected screen** (compare with `ui.svg`)
- Banner unchanged. The card looks like yesterday: same subtitle, chips, buttons and pills. Rows 1 and 2 have a green `Completed` pill, row 3 a blue `In progress` pill, rows 4 to 8 a grey `Not started` pill.
- Rows 2, 4, 6 and 8 have a very faint grey-white background. Row 8 has no line under it.
- Click `Completed`: subtitle `2 topics match this filter`, rows 1 and 2; row 2 has the faint background and no line.
- Click `In progress`: `1 topics match this filter`, row 3 only, no line under it. Click `Not started`: `5 topics match this filter`, rows 4 to 8. Click `All`: `8 of 44 topics shown`.
- `Clear list` shows `No topics to show.`; `Restore list` brings the rows back.

**Check yourself**
- [ ] The chip `Completed` is green after you click it (its code is `'done'`, not `'Completed'`).
- [ ] Press F12, open Elements and select row 8: its `class` is `topic-row odd last`. Row 1 has only `topic-row`.
- [ ] With `Completed` chosen, row 2 has the classes `topic-row odd last`.
- [ ] The text of topic 8 still shows the arrow in `Parent → Child Communication with input()`.
- [ ] The terminal and the browser console (F12, Console tab) show no errors.

**Build it yourself first.** Use today's `README.md` as your reference. If you are stuck for 15 minutes, open `walkthrough.md`.

Open a hint only after 10 minutes of trying.

## Challenges: extend Status badges

Challenges are added to the same app and the same data. Each one changes only the files named in it, inside `src/app/topic-catalog/`.

## Challenge 1: Name the list and the badges (HTML)
**Goal:** Add attributes that help screen readers and mouse users.
**Requirements**
1. In `topic-catalog.html`, change `<ul class="topic-list">` to `<ul class="topic-list" aria-label="Angular topics">`.
2. Add a `title` attribute (a tooltip that shows when you rest the mouse on the element) to each badge: `title="Topic finished"` on the `Completed` span, `title="Topic being studied"` on the `In progress` span, `title="Topic not opened yet"` on the `Not started` span. Write them as plain attributes, with no square brackets.

**Expected:** Nothing changes visually. Resting the mouse on a green pill shows `Topic finished`; blue shows `Topic being studied`; grey shows `Topic not opened yet`. In Elements, the `ul` has `aria-label="Angular topics"`.

<details><summary>Hint 1</summary>Plain HTML attributes are written inside the opening tag, like <code>class</code>.</details>
<details><summary>Hint 2</summary>The text is fixed, so no <code>[ ]</code> and no <code>{{ }}</code> are needed.</details>
<details><summary>Hint 3</summary><code>&lt;span class="badge done" title="Topic finished"&gt;Completed&lt;/span&gt;</code>. Do the same for the other two spans, each with its own text.</details>

Undo this before tomorrow.

## Challenge 2: Visible stripes and hover (CSS)
**Goal:** Make the stripes easier to see and add a hover color, and see why rule order matters.
**Requirements**
1. In `topic-catalog.css` change the color in the existing `.topic-row.odd` rule from `#fafcfc` to `#f1f6f6`.
2. At the very end of the file add `.topic-row:hover` with `background: var(--mint);`.
3. Test it, then move the `.topic-row:hover` rule ABOVE `.topic-row.odd` and test again.

**Expected:** With the rule at the end, every row (odd and even) turns mint green under the mouse. After you move it above `.topic-row.odd`, odd rows no longer change on hover (their stripe color wins), but even rows still do. Put the rule back at the end when you finish.

<details><summary>Hint 1</summary>Both selectors have the same specificity: two parts each (<code>.topic-row.odd</code> has two classes, <code>.topic-row:hover</code> has a class and a pseudo-class).</details>
<details><summary>Hint 2</summary>With equal specificity, the rule written later in the file wins.</details>
<details><summary>Hint 3</summary><code>.topic-row:hover { background: var(--mint); }</code> as the last rule in the file.</details>

Undo this before tomorrow.

## Challenge 3 (stretch): Position text from more loop variables
**Goal:** Save two more loop variables and show them.
**Requirements**
1. In `topic-catalog.html` change the `@for` line to `@for (topic of visibleTopics(); track topic.no; let last = $last, odd = $odd, n = $index, count = $count) {`.
2. Between the `title` span and the `@switch`, add `<span class="pos">{{ n + 1 }} of {{ count }}</span>`.
3. In `topic-catalog.css` add `.pos` with `color: var(--muted); font-size: 11px;`.

**Expected:** With `All`, each row shows `1 of 8`, `2 of 8`, ... `8 of 8` before its pill. With `Not started`: `1 of 5` to `5 of 5`. With `In progress`: `1 of 1`.

<details><summary>Hint 1</summary>You already have a comma list after <code>let</code>. Add more pairs to it.</details>
<details><summary>Hint 2</summary><code>$index</code> starts at 0, so show <code>n + 1</code>. <code>$count</code> is the number of items in the loop.</details>
<details><summary>Hint 3</summary><code>let last = $last, odd = $odd, n = $index, count = $count</code> and <code>{{ n + 1 }} of {{ count }}</code> inside a span.</details>

Undo this before tomorrow.

## Challenge 4 (stretch): A fourth status
**Goal:** Add a new `@case` for a new code.
**Requirements**
1. In `topic-catalog.ts` change the `status` of topic 8 from `'not-started'` to `'review'`.
2. In `topic-catalog.html`, between the `in-progress` case and `@default`, add `@case ('review') { <span class="badge review">In review</span> }` (written on several lines like the others).
3. In `topic-catalog.css` add `.badge.review` with `background: #f3eeff; color: #7a3fd0;`.

**Expected:** Row 8 shows a purple `In review` pill. Chip `Not started` now shows 4 rows (4 to 7) and `4 topics match this filter`. Chip `All` still shows 8 rows. No chip selects `review`, because you did not add one.

<details><summary>Hint 1</summary>A new code needs three things: data, a case, and a style.</details>
<details><summary>Hint 2</summary>The case has the same shape as the other three. Its text in the round brackets must equal the data exactly.</details>
<details><summary>Hint 3</summary><code>@case ('review') {</code> then <code>&lt;span class="badge review"&gt;In review&lt;/span&gt;</code> then <code>}</code>. Put it before <code>@default</code>.</details>

Undo this before tomorrow: set topic 8 back to `'not-started'` and remove the case and the `.badge.review` rule.

## When you finish
When you finish: paste your files here for review.
