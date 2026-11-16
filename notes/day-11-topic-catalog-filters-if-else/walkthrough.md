# Day 11: Topic Filters: Walkthrough

> **Open this only after you have tried the project yourself** (see `requirements.md`), or if you are stuck for more than 15 minutes.

## Today's project
Four chips filter the Angular Roadmap list by status. `@if` / `@else` changes the subtitle, and `@for` loops over a method that returns only the matching topics. See `ui.svg`.

## Build it, step by step

### Step 1: Check the banner
`today-build.ts` already has `topicNo: string = '07';` and `topicTitle: string = 'Angular Template Control Flow';`. Nothing to change.
**You should see:** the banner `TODAY'S BUILD · TOPIC 07` and `Angular Template Control Flow`, as on Day 10.

### Step 2: The filter property and methods
**Type this:** replace `src/app/topic-catalog/topic-catalog.ts`:
```ts
import { Component } from '@angular/core';

const ANGULAR_TOPICS = [
  { no: 1, title: 'Angular Application Setup & Architecture', status: 'Completed' },
  { no: 2, title: 'String Interpolation', status: 'Completed' },
  { no: 3, title: 'Components', status: 'In progress' },
  { no: 4, title: 'Property Binding', status: 'Not started' },
  { no: 5, title: 'Event Binding', status: 'Not started' },
  { no: 6, title: 'Two-Way Binding', status: 'Not started' },
  { no: 7, title: 'Angular Template Control Flow', status: 'Not started' },
  { no: 8, title: 'Parent → Child Communication with input()', status: 'Not started' }
];

@Component({
  selector: 'app-topic-catalog',
  imports: [],
  templateUrl: './topic-catalog.html',
  styleUrl: './topic-catalog.css'
})
export class TopicCatalog {
  topics = [...ANGULAR_TOPICS];
  filter: string = 'All';

  setFilter(value: string): void {
    this.filter = value;
  }

  visibleTopics() {
    if (this.filter === 'All') {
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
**You should see:** no change on the screen.
**Why:** `filter` remembers the chosen chip, `setFilter` changes it, and `visibleTopics()` gives back the whole list for `'All'` or only the matching topics for the other values. `clear()` and `restore()` are the Day 10 methods.

### Step 3: The template
**Type this:** replace `src/app/topic-catalog/topic-catalog.html`:
```html
<section class="card">
  <h3>Angular Roadmap</h3>
  @if (filter === 'All') {
    <p class="sub">{{ topics.length }} of 44 topics shown</p>
  } @else {
    <p class="sub">{{ visibleTopics().length }} topics: {{ filter }}</p>
  }
  <div class="chips">
    <button class="chip" [class.on]="filter === 'All'" (click)="setFilter('All')">All</button>
    <button class="chip" [class.on]="filter === 'Completed'" (click)="setFilter('Completed')">Completed</button>
    <button class="chip" [class.on]="filter === 'In progress'" (click)="setFilter('In progress')">In progress</button>
    <button class="chip" [class.on]="filter === 'Not started'" (click)="setFilter('Not started')">Not started</button>
  </div>
  <div class="actions">
    <button (click)="clear()">Clear list</button>
    <button (click)="restore()">Restore list</button>
  </div>
  <ul class="topic-list">
    @for (topic of visibleTopics(); track topic.no) {
      <li class="topic-row">
        <span class="num">{{ topic.no }}.</span>
        <span class="title">{{ topic.title }}</span>
        <span class="badge" [class.done]="topic.status === 'Completed'" [class.progress]="topic.status === 'In progress'">{{ topic.status }}</span>
      </li>
    } @empty {
      <li class="empty">No topics to show.</li>
    }
  </ul>
</section>
```
**You should see:** four chips with the default grey button look (no style yet), then the two buttons, then 8 rows. Click `Completed`: the subtitle reads `2 topics: Completed` and only rows 1 and 2 stay. Click `All`: 8 rows and `8 of 44 topics shown`.
**Why:** `@if` picks one of two subtitles. Each chip sets the filter with `(click)`. The loop now uses `visibleTopics()`, so it gets the filtered list.

### Step 4: The chip styles
**Type this:** add these rules at the END of `src/app/topic-catalog/topic-catalog.css` (keep all rules that are already there):
```css
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.chip {
  background: white;
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
}

.chip.on {
  background: var(--green);
  border-color: var(--green);
  color: white;
}
```
**You should see:** four round chips in a row, `All` green with white text, the others white with a light border. Clicking a chip moves the green to it.
**Why:** `.chip.on` is more specific than `.chip`, so the chosen chip gets green. `flex-wrap: wrap;` lets chips drop to a new line on a narrow card.

### Step 5: Try everything
Click each chip. Choose `Completed`, click `Clear list`, then `Restore list`. Make the window narrow (about 600px). Open the console with F12.
**You should see:**
- `Completed`: `2 topics: Completed`, rows 1 and 2. `In progress`: `1 topics: In progress`, row 3. `Not started`: `5 topics: Not started`, rows 4 to 8.
- `Completed` then `Clear list`: `0 topics: Completed` and `No topics to show.`. `Restore list` brings rows 1 and 2 back.
- On a narrow window the chips wrap to a second line.
- No red errors in the console or terminal.

## If something breaks
- **A chip does nothing:** the text inside `setFilter('...')` does not match the data exactly (`'In progress'`, `'Not started'`, capital first letter only).
- **No chip is green:** the CSS is `.chip .on` (with a space), or `.chip.on` is missing, or the `[class.on]` text differs from the `(click)` text.
- **Error about `@else`:** it must be written `} @else {` right after the `}` that closes `@if`.
- **Error that `visibleTopics` is not a function:** the template needs `visibleTopics()` with round brackets, and the method must be inside the class.
- **Rows ignore the filter:** the `@for` still says `of topics`. Change it to `of visibleTopics()`.
- **Chips are unstyled:** the three CSS rules were added to the wrong file, or the classes `chips` and `chip` are misspelled.
- **Older rules disappeared:** you replaced the CSS file instead of adding to the end. Add back the Day 10 rules from `day-10-topic-catalog-control-flow/walkthrough.md` Step 6.
