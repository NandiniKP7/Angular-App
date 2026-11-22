# Day 14: Topic Model and Typed Inputs: Walkthrough

> **Open this only after you have tried the project yourself** (see `requirements.md`), or if you are stuck for more than 15 minutes.

## Today's project
A `Topic` type and a data file describe the topics. `TopicCard` takes one `Topic` object, shows the subtopic count and a progress bar, and has a `compact` flag. See `ui.svg`.

## Build it, step by step

### Step 1: The types
**Type this:** create the folder `src/app/models/` and the file `src/app/models/topic.ts`:
```ts
export type TopicStatus = 'done' | 'in-progress' | 'not-started';

export interface Topic {
  no: number;
  title: string;
  status: TopicStatus;
  subtopicsDone: number;
  subtopicsTotal: number;
}
```
**You should see:** nothing in the browser; the terminal shows no errors.
**Why:** `TopicStatus` allows only three texts; `Topic` lists the five properties of a topic. Both are `export`ed so other files can import them.

### Step 2: The data file
**Type this:** create the folder `src/app/data/` and the file `src/app/data/angular-topics.ts`:
```ts
import { Topic } from '../models/topic';

export const ANGULAR_TOPICS: Topic[] = [
  { no: 1, title: 'Angular Application Setup & Architecture', status: 'done', subtopicsDone: 6, subtopicsTotal: 6 },
  { no: 2, title: 'String Interpolation', status: 'done', subtopicsDone: 4, subtopicsTotal: 4 },
  { no: 3, title: 'Components', status: 'in-progress', subtopicsDone: 2, subtopicsTotal: 5 },
  { no: 4, title: 'Property Binding', status: 'not-started', subtopicsDone: 0, subtopicsTotal: 5 },
  { no: 5, title: 'Event Binding', status: 'not-started', subtopicsDone: 0, subtopicsTotal: 4 },
  { no: 6, title: 'Two-Way Binding', status: 'not-started', subtopicsDone: 0, subtopicsTotal: 4 },
  { no: 7, title: 'Angular Template Control Flow', status: 'not-started', subtopicsDone: 0, subtopicsTotal: 6 },
  { no: 8, title: 'Parent → Child Communication with input()', status: 'not-started', subtopicsDone: 0, subtopicsTotal: 8 }
];
```
**You should see:** nothing yet; no red underlines in the file.
**Why:** `: Topic[]` makes TypeScript check every object against the interface.

### Step 3: The card class
**Type this:** `src/app/topic-card/topic-card.ts`:
```ts
import { Component, booleanAttribute, input } from '@angular/core';
import { Topic } from '../models/topic';

@Component({
  selector: 'app-topic-card',
  imports: [],
  templateUrl: './topic-card.html',
  styleUrl: './topic-card.css'
})
export class TopicCard {
  topic = input.required<Topic>();
  compact = input(false, { transform: booleanAttribute });

  percent(): number {
    const topic = this.topic();
    if (topic.subtopicsTotal === 0) {
      return 0;
    }
    return Math.round((topic.subtopicsDone / topic.subtopicsTotal) * 100);
  }
}
```
**You should see:** the browser may show an error until Step 7 is done, because the parent still sends `[no]`. That is expected.
**Why:** one object input replaces three. `percent()` reads the input once and returns a whole number.

### Step 4: The card HTML
**Type this:** `src/app/topic-card/topic-card.html`:
```html
<article class="topic-card" [class.compact]="compact()">
  <span class="no">{{ topic().no }}</span>
  <div class="body">
    <strong>{{ topic().title }}</strong>
    @switch (topic().status) {
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
    @if (!compact()) {
      <small>Subtopics: {{ topic().subtopicsDone }} / {{ topic().subtopicsTotal }}</small>
      <div class="bar" [attr.aria-label]="'Progress ' + percent() + ' percent'">
        <div class="bar-fill" [style.width.%]="percent()"></div>
      </div>
    }
  </div>
</article>
```
**You should see:** still waiting for Step 7.
**Why:** `topic().title` reads a property of the input object. `@if (!compact())` hides the details when the flag is on.

### Step 5: The card CSS
**Type this:** `src/app/topic-card/topic-card.css` (the whole file):
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

.body small {
  display: block;
  margin-top: 8px;
  color: var(--muted);
  font-size: 12px;
}

.bar {
  height: 8px;
  margin-top: 6px;
  background: #dde7e5;
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--green);
}

.compact {
  padding: 8px 12px;
}
```
**You should see:** nothing yet.
**Why:** the last four rules are new. `.compact` is last so it overrides the `padding` of `.topic-card`.

### Step 6: The catalog class
**Type this:** `src/app/topic-catalog/topic-catalog.ts`:
```ts
import { Component } from '@angular/core';
import { TopicCard } from '../topic-card/topic-card';
import { Topic } from '../models/topic';
import { ANGULAR_TOPICS } from '../data/angular-topics';

@Component({
  selector: 'app-topic-catalog',
  imports: [TopicCard],
  templateUrl: './topic-catalog.html',
  styleUrl: './topic-catalog.css'
})
export class TopicCatalog {
  topics: Topic[] = [...ANGULAR_TOPICS];
  filter: string = 'all';

  setFilter(value: string): void {
    this.filter = value;
  }

  visibleTopics(): Topic[] {
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
**You should see:** still waiting for Step 7.
**Why:** the data now comes from the data file, and the types are written: `topics: Topic[]`, `visibleTopics(): Topic[]`.

### Step 7: Send one object
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
      <app-topic-card [topic]="topic" />
    } @empty {
      <p class="empty">No topics to show.</p>
    }
  </div>
</section>
```
**You should see:** 8 cards in 2 columns, each with a pill, a `Subtopics: ... / ...` line and a bar. Card 3 shows `Subtopics: 2 / 5` with a 40% green fill; cards 1 and 2 have a full green bar; cards 4 to 8 have an empty grey bar.
**Why:** one binding `[topic]="topic"` sends the whole object. `topic-catalog.css` does not change today.

### Step 8: Try everything
Click each chip, then `Clear list`, then `Restore list` and `All`. Press F12 and open the Console tab.
**You should see:** `Completed` shows cards 1 and 2 (`2 topics match this filter`), `In progress` shows card 3, `Not started` shows cards 4 to 8 (`5 topics match this filter`), `Clear list` shows `No topics to show.`. No red errors.

## If something breaks
- **`Cannot find module '../models/topic'`:** the file must be `src/app/models/topic.ts`; check the folder name and the `../`.
- **`... has no exported member 'Topic'`:** `export` is missing in `topic.ts`.
- **`Type '"..."' is not assignable to type 'TopicStatus'`:** a status in the data is not `'done'`, `'in-progress'` or `'not-started'`.
- **Error that `no`, `title` or `status` is not an input:** the card line in `topic-catalog.html` must be only `<app-topic-card [topic]="topic" />`.
- **Error about a missing required input `topic`:** the `[topic]="topic"` binding is missing.
- **Bar never fills:** `[style.width.%]="percent()"` needs the `()`; check the data numbers.
- **`compact` flag does nothing:** `booleanAttribute` must be imported from `'@angular/core'` and used as `{ transform: booleanAttribute }`.
- **Compact cards keep the large padding:** `.compact` must come after `.topic-card` in `topic-card.css`.
