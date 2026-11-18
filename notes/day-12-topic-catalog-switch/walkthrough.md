# Day 12: Topic Catalog with `@switch`: Walkthrough

> **Open this only after you have tried the project yourself** (see `requirements.md`), or if you are stuck for more than 15 minutes.

## Today's project
Status codes replace labels in the data. `@switch` shows the right badge for each row, and the loop variables `$odd` and `$last` give faint stripes and a clean last row. See `ui.svg`.

## Build it, step by step

### Step 1: Check the banner
`today-build.ts` already has `topicNo: string = '07';` and `topicTitle: string = 'Angular Template Control Flow';`. Nothing to change.
**You should see:** the banner `TODAY'S BUILD · TOPIC 07` and `Angular Template Control Flow`.

### Step 2: Codes in the data
**Type this:** replace `src/app/topic-catalog/topic-catalog.ts`:
```ts
import { Component } from '@angular/core';

const ANGULAR_TOPICS = [
  { no: 1, title: 'Angular Application Setup & Architecture', status: 'done' },
  { no: 2, title: 'String Interpolation', status: 'done' },
  { no: 3, title: 'Components', status: 'in-progress' },
  { no: 4, title: 'Property Binding', status: 'not-started' },
  { no: 5, title: 'Event Binding', status: 'not-started' },
  { no: 6, title: 'Two-Way Binding', status: 'not-started' },
  { no: 7, title: 'Angular Template Control Flow', status: 'not-started' },
  { no: 8, title: 'Parent → Child Communication with input()', status: 'not-started' }
];

@Component({
  selector: 'app-topic-catalog',
  imports: [],
  templateUrl: './topic-catalog.html',
  styleUrl: './topic-catalog.css'
})
export class TopicCatalog {
  topics = [...ANGULAR_TOPICS];
  filter: string = 'all';

  setFilter(value: string): void {
    this.filter = value;
  }

  visibleTopics() {
    if (this.filter === 'all') {
      return this.topics;
    }
    return this.topics.filter(topic => topic.status === this.filter);
  }

  clear(): void {
    this.topics = [];
  }

  restore(): void {
    this.topics = [...ANGULAR_TOPICS];
  }
}
```
**You should see:** the screen may look wrong for a moment (the template still uses the old labels): every pill is grey and the chips do nothing useful. Step 3 fixes this.
**Why:** the data and the filter use codes now. The template must use the same codes.

### Step 3: The template
**Type this:** replace `src/app/topic-catalog/topic-catalog.html`:
```html
<section class="card">
  <h3>Angular Roadmap</h3>
  @if (filter === 'all') {
    <p class="sub">{{ topics.length }} of 44 topics shown</p>
  } @else {
    <p class="sub">{{ visibleTopics().length }} topics match this filter</p>
  }
  <div class="chips">
    <button class="chip" [class.on]="filter === 'all'" (click)="setFilter('all')">All</button>
    <button class="chip" [class.on]="filter === 'done'" (click)="setFilter('done')">Completed</button>
    <button class="chip" [class.on]="filter === 'in-progress'" (click)="setFilter('in-progress')">In progress</button>
    <button class="chip" [class.on]="filter === 'not-started'" (click)="setFilter('not-started')">Not started</button>
  </div>
  <div class="actions">
    <button (click)="clear()">Clear list</button>
    <button (click)="restore()">Restore list</button>
  </div>
  <ul class="topic-list">
    @for (topic of visibleTopics(); track topic.no; let last = $last, odd = $odd) {
      <li class="topic-row" [class.last]="last" [class.odd]="odd">
        <span class="num">{{ topic.no }}.</span>
        <span class="title">{{ topic.title }}</span>
        @switch (topic.status) {
          @case ('done') {
            <span class="badge done">Completed</span>
          }
          @case ('in-progress') {
            <span class="badge progress">In progress</span>
          }
          @default {
            <span class="badge">Not started</span>
          }
        }
      </li>
    } @empty {
      <li class="empty">No topics to show.</li>
    }
  </ul>
</section>
```
**You should see:** the same screen as yesterday: green `Completed` pills on rows 1 and 2, a blue `In progress` pill on row 3, grey `Not started` pills on rows 4 to 8, and `All` green. The filters work again. Clicking `Completed` shows `2 topics match this filter`.
**Why:** `@switch` compares `topic.status` with each `@case` and shows one badge. `let last = $last, odd = $odd` saves two loop values, and `[class.last]` and `[class.odd]` turn them into classes. Press F12 and look at the `<li>` elements in Elements: row 8 has `topic-row odd last`.

### Step 4: The styles
**Type this:** add these two rules at the END of `src/app/topic-catalog/topic-catalog.css` (after `.chip.on`; keep all rules that are already there):
```css
.topic-row.odd {
  background: #fafcfc;
}

.topic-row.last {
  border-bottom: 0;
}
```
**You should see:** rows 2, 4, 6 and 8 have a very faint stripe (it is subtle on purpose), and there is no line under row 8. Click `Completed`: row 2 has the stripe and no line under it.
**Why:** `.topic-row.odd` and `.topic-row.last` name two classes, so they are more specific than `.topic-row` and win over its `border-bottom`.

### Step 5: Try everything
Click each chip. Select row 8 in F12 -> Elements, then click `Completed` and select row 2. Click `Clear list`, then `Restore list`.
**You should see:**
- `Completed`: rows 1, 2. `In progress`: row 3. `Not started`: rows 4 to 8. Subtitles `2`, `1` and `5 topics match this filter`. `All`: `8 of 44 topics shown`.
- Row 8 with `All`: classes `topic-row odd last`. Row 2 with `Completed`: `topic-row odd last`. Row 3 with `In progress`: `topic-row last`.
- `Clear list` shows `No topics to show.`. `Restore list` brings the rows back.
- No red errors in the console or terminal.

## If something breaks
- **All pills are grey:** the `@case` text and the data codes differ (`'in-progress'` has a dash and is lowercase). Check both files.
- **A chip turns green but shows 0 rows:** the code in `setFilter('...')` is not one of `'all'`, `'done'`, `'in-progress'`, `'not-started'`.
- **No chip is green at the start:** the property still says `'All'`. It must be `filter: string = 'all';`.
- **Error at the `@for` line:** write `track topic.no; let last = $last, odd = $odd` with a semicolon after `track topic.no` and a comma between the two pairs.
- **Error at `@default`:** `@default` has no round brackets.
- **No stripes:** in Elements, check whether the `<li>` has the class `odd`. If not, the binding is missing. If it has, the CSS rule is missing or misspelled. The color is very faint: try `#f1f6f6` to see it.
- **Last row still has a line:** `.topic-row.last` is missing, or `[class.last]="last"` is missing.
- **Older rules disappeared:** you replaced the CSS file. Add back the Day 10 and Day 11 rules (see the earlier walkthroughs).
