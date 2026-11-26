# Day 17: Favorites and Signal Updates: Walkthrough

> **Open this only after you have tried the project yourself** (see `requirements.md`), or if you are stuck for more than 15 minutes.

## Today's project
Every topic card gets a star. The roadmap card keeps the list of favorite topic numbers and two counters in signals. See `ui.svg`.

## Build it, step by step

### Step 1: The card gets an input and an output
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
  favorite = input(false);
  favoriteToggled = output<number>();

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
**Why:** `favorite` receives true or false from the parent. `favoriteToggled` sends the topic number back.

### Step 2: The star button in the card template
**Type this:** replace `src/app/topic-card/topic-card.html`:
```html
<article class="topic-card" [class.compact]="compact()">
  <span class="no">{{ topic().no }}</span>
  <div class="body">
    <strong>{{ topic().title }}</strong>
    <button class="star" (click)="favoriteToggled.emit(topic().no)" [attr.aria-label]="favorite() ? 'Remove from favorites' : 'Add to favorites'">{{ favorite() ? '★' : '☆' }}</button>
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
**You should see:** every card now has a small grey button with `☆` (browser default look). Clicking it does nothing yet.
**Why:** `favorite()` is `false` by default, so the ternary shows `☆`. The button is placed right after the title.

### Step 3: Style the star
**Type this:** add at the end of `src/app/topic-card/topic-card.css`:
```css
.star {
  float: right;
  background: none;
  border: 0;
  font-size: 18px;
  color: #f0a500;
  cursor: pointer;
}
```
**You should see:** each card shows an amber `☆` at its right side, with no grey box.
**Why:** `background: none; border: 0;` removes the button box; `float: right` moves it to the right edge.

### Step 4: The catalog class
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
  favorites = signal<number[]>([]);
  stats = signal({ opened: 0, completed: 0 });

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
    this.stats.update(current => ({ ...current, opened: current.opened + 1 }));
    this.lastAction.set('Opened topic ' + no);
  }

  onComplete(no: number): void {
    this.topics.update(list =>
      list.map((topic): Topic =>
        topic.no === no
          ? { ...topic, status: 'done', subtopicsDone: topic.subtopicsTotal }
          : topic
      )
    );
    this.stats.update(current => ({ ...current, completed: current.completed + 1 }));
    this.lastAction.set('Completed topic ' + no);
  }

  onReview(no: number): void {
    this.lastAction.set('Review requested for topic ' + no);
  }

  toggleFavorite(no: number): void {
    this.favorites.update(list =>
      list.includes(no) ? list.filter(item => item !== no) : [...list, no]
    );
  }

  isFavorite(no: number): boolean {
    return this.favorites().includes(no);
  }

  clear(): void {
    this.topics.set([]);
  }

  restore(): void {
    this.topics.set([...ANGULAR_TOPICS]);
  }
}
```
**You should see:** no change on screen.
**Why:** `favorites` and `stats` are new signals. `onOpen` and `onComplete` now use `.update()` to build new values from the old ones. `toggleFavorite` adds or removes a number by building a new array.

### Step 5: Connect the template
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
        [favorite]="isFavorite(topic.no)"
        (opened)="onOpen($event)"
        (completed)="onComplete($event)"
        (reviewRequested)="onReview($event)"
        (favoriteToggled)="toggleFavorite($event)" />
    } @empty {
      <p class="empty">No topics to show.</p>
    }
  </div>
  @if (selectedTopic(); as chosen) {
    <div class="selected">Selected topic: <strong>{{ chosen.title }}</strong> ({{ chosen.status }})</div>
  } @else {
    <div class="selected">Selected topic: none. Click Open on a card.</div>
  }
  <p class="last-action">Favorites: {{ favorites().length }} · Opened {{ stats().opened }} times · Completed {{ stats().completed }}</p>
  <p class="last-action">Last action: {{ lastAction() }}</p>
</section>
```
**You should see:** the line `Favorites: 0 · Opened 0 times · Completed 0` above `Last action: Nothing yet`. Click a star: it becomes `★` and `Favorites` counts it. Click it again: back to `☆`.
**Why:** `[favorite]` sends true or false to each card. `(favoriteToggled)` runs `toggleFavorite` with the topic number. Because `favorites` changes, Angular re-runs `isFavorite(...)` and updates the stars and the count.

### Step 6: Try everything
Star topics 1 and 3. Click `Completed` chip, then `All`. Click `Open` on topic 3 twice, then `Complete` on topic 3. Press F12 and open the Console tab.
**You should see:** stars stay filled after changing filters; `Favorites: 2 · Opened 2 times · Completed 1`; `Last action: Completed topic 3`; no red errors in the console or terminal.

## If something breaks
- **Star does nothing:** `(favoriteToggled)="toggleFavorite($event)"` is missing on the `<app-topic-card>` tag, or `favoriteToggled` is spelled differently in `topic-card.ts`.
- **Star never fills:** `[favorite]="isFavorite(topic.no)"` is missing, or `isFavorite` is missing from the class.
- **Error `Property 'favorite' ...`:** `favorite = input(false);` is missing in `topic-card.ts`.
- **Counters show 0 forever:** `onOpen` and `onComplete` still use the Day 16 version; copy Step 4 exactly.
- **Star has a grey box:** the `.star` rule is in the wrong CSS file. It belongs in `topic-card.css`.
- **A symbol shows as `?` or `â˜…`:** the file is not saved as UTF-8; re-type the characters `★` and `☆`.
