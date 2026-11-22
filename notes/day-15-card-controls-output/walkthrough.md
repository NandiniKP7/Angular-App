# Day 15: Card Controls and output(): Walkthrough

> **Open this only after you have tried the project yourself** (see `requirements.md`), or if you are stuck for more than 15 minutes.

## Today's project
Each topic card gets `Open`, `Complete` and `Review` buttons. They send events (`output`) to `TopicCatalog`, which shows `Last action: ...` and, for `Complete`, builds a new topic list. See `ui.svg`. No new component is generated today.

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
  topicNo: string = '09';
  topicTitle: string = 'Child → Parent Communication with output()';
}
```
**You should see:** the banner reads `TODAY'S BUILD · TOPIC 09` and `Child → Parent Communication with output()`.
**Why:** the banner texts come from these two properties.

### Step 2: Declare the outputs in the card
**Type this:** replace `src/app/topic-card/topic-card.ts`:
```ts
import { Component, booleanAttribute, input, output } from '@angular/core';
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
  opened = output<number>();
  completed = output<number>();
  reviewRequested = output<number>();

  percent(): number {
    const topic = this.topic();
    if (topic.subtopicsTotal === 0) {
      return 0;
    }
    return Math.round((topic.subtopicsDone / topic.subtopicsTotal) * 100);
  }
}
```
**You should see:** no change on screen.
**Why:** each `output<number>()` is an event the card can send, carrying one number. `output` must be in the import line.

### Step 3: Add the buttons to the card template
**Type this:** replace `src/app/topic-card/topic-card.html`:
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
    <div class="actions">
      <button (click)="opened.emit(topic().no)">Open</button>
      <button (click)="completed.emit(topic().no)" [disabled]="topic().status === 'done'">Complete</button>
      <button (click)="reviewRequested.emit(topic().no)">Review</button>
    </div>
  </div>
</article>
```
**You should see:** every card has three default grey browser buttons in a plain row under the bar. `Complete` is already grey and unclickable on topics 1 and 2. Clicking does nothing visible yet.
**Why:** `.emit(topic().no)` sends the event with the topic number. `[disabled]` is true for topics whose status is `'done'`.

### Step 4: Style the buttons
**Type this:** add at the end of `src/app/topic-card/topic-card.css` (keep everything above it):
```css
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

.actions button {
  background: white;
  color: var(--ink);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}

.actions button:disabled {
  color: #aab7bd;
  cursor: not-allowed;
}
```
**You should see:** three small white outlined buttons in a row under each bar. On topics 1 and 2 the `Complete` text is light grey.
**Why:** `display: flex` lines the buttons up, `flex-wrap: wrap` lets them use a second line in a narrow card, and `:disabled` styles the switched-off button.

### Step 5: Handle the events in the catalog class
**Type this:** replace `src/app/topic-catalog/topic-catalog.ts`:
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
  lastAction: string = 'Nothing yet';

  setFilter(value: string): void {
    this.filter = value;
  }

  visibleTopics(): Topic[] {
    if (this.filter === 'all') {
      return this.topics;
    }
    return this.topics.filter(topic => topic.status === this.filter);
  }

  onOpen(no: number): void {
    this.lastAction = 'Opened topic ' + no;
  }

  onComplete(no: number): void {
    this.topics = this.topics.map((topic): Topic =>
      topic.no === no
        ? { ...topic, status: 'done', subtopicsDone: topic.subtopicsTotal }
        : topic
    );
    this.lastAction = 'Completed topic ' + no;
  }

  onReview(no: number): void {
    this.lastAction = 'Review requested for topic ' + no;
  }

  clear(): void {
    this.topics = [];
  }

  restore(): void {
    this.topics = [...ANGULAR_TOPICS];
  }
}
```
**You should see:** no change yet.
**Why:** each `on...` method receives the number that the card sent. `onComplete` builds a new array in which only the clicked topic is a changed copy; `ANGULAR_TOPICS` is never edited, so `Restore list` still works.

### Step 6: Listen to the events in the catalog template
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
  <div class="cards">
    @for (topic of visibleTopics(); track topic.no) {
      <app-topic-card
        [topic]="topic"
        (opened)="onOpen($event)"
        (completed)="onComplete($event)"
        (reviewRequested)="onReview($event)" />
    } @empty {
      <p class="empty">No topics to show.</p>
    }
  </div>
  <p class="last-action">Last action: {{ lastAction }}</p>
</section>
```
**You should see:** under the cards, the line `Last action: Nothing yet` (unstyled until Step 7). Clicking `Open` on topic 5 changes it to `Last action: Opened topic 5`; `Review` on topic 2 gives `Last action: Review requested for topic 2`. `Complete` on topic 3 turns its badge green `Completed`, shows `Subtopics: 5 / 5`, fills the bar, disables its `Complete` button, and gives `Last action: Completed topic 3`.
**Why:** `(opened)="onOpen($event)"` runs `onOpen` with the emitted number. After `onComplete` the topic is a new object, so `[topic]="topic"` gives the card new data.

### Step 7: Style the last-action line
**Type this:** add at the end of `src/app/topic-catalog/topic-catalog.css`:
```css
.last-action {
  margin: 12px 0 0;
  color: var(--muted);
  font-size: 14px;
}
```
**You should see:** the line is grey, 14px, 12px below the cards.
**Why:** the margin separates it from the cards; `var(--muted)` is the grey from `styles.css`.

### Step 8: Try everything
Click `Open`, `Complete` and `Review` on different topics. Click the `In progress` chip, then `Complete` on topic 3. Click `Clear list`, then `Restore list`. Press F12 and open the Console tab.
**You should see:** with the `In progress` chip on, topic 3 disappears after Complete (it is now `done`, so it no longer matches), and the subtitle reads `0 topics match this filter` with `No topics to show.`. The `Completed` chip now shows topics 1, 2 and 3. After `Clear list` and `Restore list`, topic 3 is `In progress` with `2 / 5` again. No red errors in the console or terminal.

## If something breaks
- **Buttons do nothing:** the listener name must match the output name exactly: `(opened)`, `(completed)`, `(reviewRequested)`.
- **`Property 'opened' does not exist on type 'TopicCard'`:** the three `output` lines are missing in `topic-card.ts`, or `output` is missing from the import line.
- **Error on `status: 'done'`:** the arrow function needs the return type: `(topic): Topic =>`. Also check that `Topic` is imported in `topic-catalog.ts`.
- **Complete changes nothing on screen:** `this.topics = this.topics.map(...)` needs the `this.topics =` at the start.
- **Buttons in one squeezed line or unstyled:** the `.actions` rules went into the wrong CSS file. The card's go in `topic-card.css`; `.last-action` goes in `topic-catalog.css`.
- **All `Complete` buttons disabled:** check `[disabled]="topic().status === 'done'"`, with `===` and the exact text `'done'`.
