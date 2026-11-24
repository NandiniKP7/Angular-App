# Day 16: Selected Topic and Writable Signals: Walkthrough

> **Open this only after you have tried the project yourself** (see `requirements.md`), or if you are stuck for more than 15 minutes.

## Today's project
`TopicCatalog` keeps its data in signals. `Open` on a card stores the topic number in `selectedNo`, and a mint panel shows the selected topic. See `ui.svg`. No new component is generated today, and `TopicCard` does not change.

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
  topicNo: string = '10';
  topicTitle: string = 'Writable Signals';
}
```
**You should see:** the banner reads `TODAY'S BUILD · TOPIC 10` and `Writable Signals`.
**Why:** the banner texts come from these two properties.

### Step 2: Move the catalog data into signals
**Type this:** replace `src/app/topic-catalog/topic-catalog.ts`:
```ts
import { Component, signal } from '@angular/core';
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
  topics = signal<Topic[]>([...ANGULAR_TOPICS]);
  filter = signal<string>('all');
  selectedNo = signal<number | null>(null);
  lastAction = signal<string>('Nothing yet');

  setFilter(value: string): void {
    this.filter.set(value);
  }

  visibleTopics(): Topic[] {
    if (this.filter() === 'all') {
      return this.topics();
    }
    return this.topics().filter(topic => topic.status === this.filter());
  }

  selectedTopic(): Topic | undefined {
    return this.topics().find(topic => topic.no === this.selectedNo());
  }

  onOpen(no: number): void {
    this.selectedNo.set(no);
    this.lastAction.set('Opened topic ' + no);
  }

  onComplete(no: number): void {
    this.topics.set(
      this.topics().map((topic): Topic =>
        topic.no === no
          ? { ...topic, status: 'done', subtopicsDone: topic.subtopicsTotal }
          : topic
      )
    );
    this.lastAction.set('Completed topic ' + no);
  }

  onReview(no: number): void {
    this.lastAction.set('Review requested for topic ' + no);
  }

  clear(): void {
    this.topics.set([]);
  }

  restore(): void {
    this.topics.set([...ANGULAR_TOPICS]);
  }
}
```
**You should see:** the browser or terminal shows errors in `topic-catalog.html` (it still reads `topics.length`, `filter` and `lastAction` without `()`). This is expected; Step 3 fixes it.
**Why:** `topics`, `filter`, `selectedNo` and `lastAction` are now signals. Reads use `()` and writes use `.set(...)`. `selectedTopic()` uses `.find()`, which returns a `Topic` or `undefined`.

### Step 3: Read the signals in the template and add the panel
**Type this:** replace `src/app/topic-catalog/topic-catalog.html`:
```html
<section class="card">
  <h3>Angular Roadmap</h3>
  @if (filter() === 'all') {
    <p class="sub">{{ topics().length }} of 44 topics shown</p>
  } @else {
    <p class="sub">{{ visibleTopics().length }} topics match this filter</p>
  }
  <div class="chips">
    <button class="chip" [class.on]="filter() === 'all'" (click)="setFilter('all')">All</button>
    <button class="chip" [class.on]="filter() === 'done'" (click)="setFilter('done')">Completed</button>
    <button class="chip" [class.on]="filter() === 'in-progress'" (click)="setFilter('in-progress')">In progress</button>
    <button class="chip" [class.on]="filter() === 'not-started'" (click)="setFilter('not-started')">Not started</button>
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
  @if (selectedTopic(); as chosen) {
    <div class="selected">Selected topic: <strong>{{ chosen.title }}</strong> ({{ chosen.status }})</div>
  } @else {
    <div class="selected">Selected topic: none. Click Open on a card.</div>
  }
  <p class="last-action">Last action: {{ lastAction() }}</p>
</section>
```
**You should see:** the page works again like Day 15. Under the cards there is the plain text `Selected topic: none. Click Open on a card.` and `Last action: Nothing yet`. Click `Open` on topic 3: `Selected topic: Components (in-progress)` with `Components` bold, and `Last action: Opened topic 3`.
**Why:** `@if (selectedTopic(); as chosen)` shows the first block when a topic was found and names it `chosen`; otherwise `@else` shows the `none` text. The filter chips read `filter()`, so they still highlight the active chip.

### Step 4: Style the panel
**Type this:** add at the end of `src/app/topic-catalog/topic-catalog.css` (keep everything above it):
```css
.selected {
  margin-top: 12px;
  padding: 10px 14px;
  background: var(--mint);
  border-radius: 10px;
  font-size: 14px;
}
```
**You should see:** the selected text sits in a light green rounded panel, 12px below the cards.
**Why:** `margin-top` separates it from the cards, `padding` gives the text room inside, `background: var(--mint)` and `border-radius` give the panel look.

### Step 5: Try everything
Click `Open` on topic 3, then `Complete` on topic 3. Click `Open` on topic 6. Click `Clear list`, then `Restore list`. Click the `Completed` chip. Press F12 and open the Console tab.
**You should see:** after `Complete` on 3 the panel reads `Selected topic: Components (done)`. After `Open` on topic 6: `Selected topic: Two-Way Binding (not-started)`. After `Clear list`: `none`, and `0 of 44 topics shown`. After `Restore list`: `Selected topic: Two-Way Binding (not-started)` again, because `selectedNo` is still 6. The `Completed` chip shows topics 1 and 2 (`2 topics match this filter`). No red errors in the console or terminal.

## If something breaks
- **`Property 'length' does not exist on type 'WritableSignal<Topic[]>'`:** write `topics().length`, with `()`.
- **`[Signal: ...]` shown on screen:** a template line has `{{ filter }}` or `{{ lastAction }}`; use `{{ filter() }}` and `{{ lastAction() }}`.
- **`Type 'string' is not assignable to type 'WritableSignal<string>'`:** you wrote `this.filter = value;`. Use `this.filter.set(value);`.
- **The panel always says `none`:** `onOpen` must start with `this.selectedNo.set(no);`, and the card tag needs `(opened)="onOpen($event)"`.
- **Error about `chosen` possibly `undefined`:** the `@if` must read `@if (selectedTopic(); as chosen) {`, with `; as chosen`.
- **Panel has no color:** the `.selected` rule is missing or in the wrong file; it belongs in `topic-catalog.css`.
