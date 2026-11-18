# Day 13: Reusable Topic Card: Walkthrough

> **Open this only after you have tried the project yourself** (see `requirements.md`), or if you are stuck for more than 15 minutes.

## Today's project
A new component, `TopicCard`, shows one topic and receives its number, title and status as inputs. `TopicCatalog` shows 8 cards in a 2-column grid. See `ui.svg`.

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
  topicNo: string = '08';
  topicTitle: string = 'Parent → Child Communication with input()';
}
```
**You should see:** the banner reads `TODAY'S BUILD · TOPIC 08` and `Parent → Child Communication with input()`.
**Why:** the banner texts come from these two properties.

### Step 2: Generate the component
**Type this:** in a second terminal inside `learnbuddy` (leave `ng serve` running):
```
ng generate component topic-card --skip-tests
```
**You should see:** `CREATE src/app/topic-card/topic-card.ts`, `.html` and `.css` in the terminal.
**Why:** this creates the class `TopicCard` with the selector `app-topic-card`.

### Step 3: Declare the inputs
**Type this:** `src/app/topic-card/topic-card.ts`:
```ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-topic-card',
  imports: [],
  templateUrl: './topic-card.html',
  styleUrl: './topic-card.css'
})
export class TopicCard {
  no = input.required<number>();
  title = input('Untitled topic');
  status = input('not-started');
}
```
**You should see:** nothing changes in the browser yet; the terminal shows no errors.
**Why:** `no` is required and has no default, so its type is written in `<number>`. `title` and `status` have defaults, so TypeScript infers `string` for both.

### Step 4: The card's HTML
**Type this:** `src/app/topic-card/topic-card.html`:
```html
<article class="topic-card">
  <span class="no">{{ no() }}</span>
  <div class="body">
    <strong>{{ title() }}</strong>
    @switch (status()) {
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
  </div>
</article>
```
**You should see:** still nothing in the browser (the card is not used yet).
**Why:** each input is read with `()`. The `@switch` is the one from Day 12, now reading `status()`.

### Step 5: The card's CSS
**Type this:** `src/app/topic-card/topic-card.css`:
```css
.topic-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: white;
  border: 1px solid var(--line);
  border-radius: 12px;
}

.no {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 50%;
  background: var(--mint);
  color: var(--green);
  font-weight: bold;
}

.body {
  flex: 1;
}

.body strong {
  display: block;
  margin-bottom: 6px;
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
```
**You should see:** nothing yet.
**Why:** `.no` is a 36px square with `border-radius: 50%`, so it is a circle, and flex centers the number inside it.

### Step 6: Import the card in the catalog
**Type this:** `src/app/topic-catalog/topic-catalog.ts`:
```ts
import { Component } from '@angular/core';
import { TopicCard } from '../topic-card/topic-card';

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
  imports: [TopicCard],
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
**You should see:** no change in the browser; no errors in the terminal.
**Why:** a component can only use tags of components in its `imports`. Only the import line and `imports: [TopicCard]` are new.

### Step 7: Use the card in the catalog HTML
**Type this:** `src/app/topic-catalog/topic-catalog.html`:
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
  <div class="cards">
    @for (topic of visibleTopics(); track topic.no) {
      <app-topic-card [no]="topic.no" [title]="topic.title" [status]="topic.status" />
    } @empty {
      <p class="empty">No topics to show.</p>
    }
  </div>
</section>
```
**You should see:** 8 cards, one per line at first (the grid CSS comes next). Each has its circle, title and pill; the badges are styled.
**Why:** `[no]="topic.no"` sends the number of the current loop item into the child's input. Each loop round sends different values.

### Step 8: Grid CSS and cleanup
**Type this:** `src/app/topic-catalog/topic-catalog.css` (the whole file):
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

.empty {
  padding: 12px 4px;
  color: var(--muted);
}

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

.cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

@media (max-width: 800px) {
  .cards {
    grid-template-columns: 1fr;
  }
}
```
**You should see:** 8 cards in 2 columns and 4 rows, matching `ui.svg`.
**Why:** the list rules (`.topic-list`, `.topic-row`, `.num`, `.title`, `.badge*`) were removed because the HTML that used them is gone from this component. `.cards` makes the grid.

### Step 9: Try everything
Click each chip, then `Clear list`, then `Restore list` and `All`. Make the window narrower than 800px. Press F12 and open the Console tab.
**You should see:** chip `Completed` shows cards 1 and 2 with subtitle `2 topics match this filter`; `In progress` shows card 3; `Not started` shows cards 4 to 8 (`5 topics match this filter`). After `Clear list` you see `No topics to show.`. After `Restore list` and `All` there are 8 cards. One column on a narrow window. No red errors.

## If something breaks
- **`'app-topic-card' is not a known element`:** `imports: [TopicCard]` or the import line is missing in `topic-catalog.ts`.
- **Error about required input `no`:** every `<app-topic-card />` needs `[no]="..."`.
- **Cards show `[Signal: ...]`:** use `{{ no() }}`, `{{ title() }}`, `status()` with `()`.
- **All titles say `Untitled topic`:** the `[title]="topic.title"` binding is missing or has no brackets.
- **All pills grey:** `[status]="topic.status"` is missing, or the case texts are not `'done'` and `'in-progress'`.
- **Pills have no color:** the `.badge` rules are not in `topic-card.css`.
- **One column on a wide window:** `grid-template-columns: repeat(2, 1fr);` is missing from `.cards`.
- **The number is an oval:** `.no` needs both `width: 36px;` and `height: 36px;` and `flex: none;`.
