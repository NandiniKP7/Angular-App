# Day 10: Topic Catalog: Walkthrough

> **Open this only after you have tried the project yourself** (see `requirements.md`), or if you are stuck for more than 15 minutes.

## Today's project
An `Angular Roadmap` card lists 8 topics with `@for`. `Clear list` and `Restore list` change the list, and `@empty` shows a message when it is empty. See `ui.svg`.

## Build it, step by step

### Step 1: Change the banner
**Type this:** `src/app/today-build/today-build.ts`:
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-today-build',
  imports: [],
  templateUrl: './today-build.html',
  styleUrl: './today-build.css'
})
export class TodayBuild {
  topicNo: string = '07';
  topicTitle: string = 'Angular Template Control Flow';
}
```
**You should see:** the banner reads `TODAY'S BUILD · TOPIC 07` and `Angular Template Control Flow`.
**Why:** the banner texts come from these two properties.

### Step 2: Generate the component
**Type this:** in a second terminal inside `learnbuddy` (leave `ng serve` running):
```
ng generate component topic-catalog --skip-tests
```
**You should see:** `CREATE src/app/topic-catalog/topic-catalog.ts`, `.html` and `.css` in the terminal.
**Why:** this creates the class `TopicCatalog` with the selector `app-topic-catalog`.

### Step 3: Add it to MyLearning
**Type this:** `src/app/my-learning/my-learning.ts`:
```ts
import { Component } from '@angular/core';
import { TodayBuild } from '../today-build/today-build';
import { TrackCards } from '../track-cards/track-cards';
import { TodayChoice } from '../today-choice/today-choice';
import { TopicCatalog } from '../topic-catalog/topic-catalog';

@Component({
  selector: 'app-my-learning',
  imports: [TodayBuild, TrackCards, TodayChoice, TopicCatalog],
  templateUrl: './my-learning.html',
  styleUrl: './my-learning.css'
})
export class MyLearning {
}
```
`my-learning.html`:
```html
<app-today-build />
<div class="two-col">
  <app-track-cards />
  <app-today-choice />
</div>
<app-topic-catalog />
```
`my-learning.css`:
```css
app-today-build,
app-topic-catalog {
  display: block;
  margin-bottom: 16px;
}

.two-col {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  align-items: start;
  margin-bottom: 16px;
}

@media (max-width: 800px) {
  .two-col {
    grid-template-columns: 1fr;
  }
}
```
**You should see:** the text `topic-catalog works!` under the two columns. If you make the window narrower than 800px, the two cards stack.
**Why:** the new tag needs its class in `imports`. `app-topic-catalog` is a custom element, so it needs `display: block` to take a full line and respect the margin.

### Step 4: The data and methods
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

  clear(): void {
    this.topics = [];
  }

  restore(): void {
    this.topics = [...ANGULAR_TOPICS];
  }
}
```
**You should see:** no change yet.
**Why:** `ANGULAR_TOPICS` is the fixed full list. `topics` is a copy that the buttons replace. `topics` has no written type because TypeScript infers it from the value.

### Step 5: The template
**Type this:** replace `topic-catalog.html`:
```html
<section class="card">
  <h3>Angular Roadmap</h3>
  <p class="sub">{{ topics.length }} of 44 topics shown</p>
  <div class="actions">
    <button (click)="clear()">Clear list</button>
    <button (click)="restore()">Restore list</button>
  </div>
  <ul class="topic-list">
    @for (topic of topics; track topic.no) {
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
**You should see:** a white card with a title, the line `8 of 44 topics shown`, two buttons and an unstyled bulleted list of 8 lines like `1. Angular Application Setup & Architecture Completed`. `Clear list` empties it and shows `No topics to show.`; `Restore list` brings it back.
**Why:** `@for` makes one `<li>` per topic. `[class.done]` and `[class.progress]` are evaluated for each row. `@empty` shows when `topics` has no items.

### Step 6: The styles
**Type this:** replace `topic-catalog.css`:
```css
.sub {
  margin: 0 0 12px;
  color: var(--muted);
  font-size: 13px;
}

.actions {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.actions button {
  background: white;
  color: var(--ink);
  border: 1px solid var(--line);
  border-radius: 9px;
  padding: 7px 14px;
  font-weight: bold;
  cursor: pointer;
}

.topic-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.topic-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 4px;
  border-bottom: 1px solid #eef1f2;
}

.num {
  width: 26px;
  color: var(--muted);
}

.title {
  flex: 1;
}

.badge {
  background: #eeeeee;
  color: #777777;
  border-radius: 10px;
  padding: 2px 10px;
  font-size: 11px;
  font-weight: bold;
}

.badge.done {
  background: var(--mint);
  color: var(--green);
}

.badge.progress {
  background: #e6eefc;
  color: var(--blue);
}

.empty {
  padding: 12px 4px;
  color: var(--muted);
}
```
**You should see:** no bullets; each row has a grey number, the title, and a pill at the right edge (green `Completed` for rows 1-2, blue `In progress` for row 3, grey `Not started` for rows 4-8). Thin lines separate the rows.
**Why:** the list reset removes bullets and indent. `.title` with `flex: 1` pushes the badge to the right. `.badge.done` and `.badge.progress` override the grey colors only for those rows.

### Step 7: Try everything
Click `Clear list`, then `Restore list`, twice. Make the window narrower than 800px, then wider. Press F12 and open the Console tab.
**You should see:** `0 of 44 topics shown` and `No topics to show.` after Clear, `8 of 44 topics shown` after Restore. The Today's choice card moves under the track card on a narrow window. No red errors in the console or terminal.

## If something breaks
- **Error mentioning `track`:** the `@for` line must be exactly `@for (topic of topics; track topic.no) {`.
- **`@empty` error or text shown as plain text:** `@empty` must come right after the `}` that closes `@for`, as `} @empty {`.
- **Nothing appears under the columns:** `<app-topic-catalog />` is missing from `my-learning.html`, or `TopicCatalog` is missing from `imports`.
- **Bullets still show:** the `ul` has no `class="topic-list"`, or the CSS rule is missing `list-style: none;`.
- **Pills are all grey:** the class names in the HTML (`done`, `progress`) must match the CSS (`.badge.done`, `.badge.progress`), and the text in the data must be exactly `Completed` and `In progress`.
- **Title missing the `&` or arrow:** copy the title text exactly as in `ui-breakdown.md`.
