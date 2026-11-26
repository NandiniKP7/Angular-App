# Day 17 Practical Requirements

**Time:** 30 minutes. **Core:** the project and Challenges 1-2 (about 20 minutes for the project, 5 minutes for each challenge). Challenges 3-4 are stretch: do them if you have time.

## Before you start
Open your `learnbuddy` project as you left it on Day 16, with `ng serve` running. It has:
- Components `App`, `Sidebar`, `Header`, `MyLearning`, `TodayBuild`, `TrackCards`, `TodayChoice`, `TopicCatalog`, `TopicCard`; the files `src/app/models/topic.ts` and `src/app/data/angular-topics.ts`.
- `TodayBuild` with `topicNo` `'10'` and `topicTitle` `'Writable Signals'`.
- `topic-catalog.ts` with the signals `topics`, `filter`, `selectedNo` and `lastAction`, the methods `setFilter`, `visibleTopics`, `selectedTopic`, `onOpen`, `onComplete`, `onReview`, `clear`, `restore`, and `imports: [TopicCard]`.
- `topic-card.ts` with inputs `topic` and `compact`, outputs `opened`, `completed`, `reviewRequested`, and the method `percent()`.
- Each card shows number, title, badge, subtopics, progress bar and the buttons Open, Complete, Review. Below the cards: the box `Selected topic: ...` and the line `Last action: ...`.

## Today's project: Favorites and counters

**What it does:** Each topic card gets a star. Click it to add the topic to your favorites (☆ becomes ★); click again to remove it. A new line under the cards counts favorites, how many times you opened a topic and how many times you completed one. All data and CSS values are in `ui-breakdown.md`; the picture is `ui.svg`.

**Requirements**
1. `src/app/topic-card/topic-card.ts`: add `favorite = input(false);` and `favoriteToggled = output<number>();` after the existing outputs. No new import is needed (`input` and `output` are already imported).
2. `topic-card.html`: inside `<div class="body">`, right after the `<strong>{{ topic().title }}</strong>` line, add one `<button class="star">`. It has `(click)="favoriteToggled.emit(topic().no)"`, `[attr.aria-label]` that is `'Remove from favorites'` when `favorite()` is true and `'Add to favorites'` otherwise, and the text `{{ favorite() ? '★' : '☆' }}`.
3. `topic-card.css`: add the `.star` rule from the table in `ui-breakdown.md` at the end of the file.
4. `src/app/topic-catalog/topic-catalog.ts`: add the signals `favorites = signal<number[]>([]);` and `stats = signal({ opened: 0, completed: 0 });` after `lastAction`. Replace `onOpen` and `onComplete` with the versions that use `.update()` (they increase `stats().opened` and `stats().completed` by 1; the walkthrough shows the full file). Add `toggleFavorite(no: number): void` and `isFavorite(no: number): boolean` after `onReview`.
5. `topic-catalog.html`: the `<app-topic-card ... />` tag gets `[favorite]="isFavorite(topic.no)"` and `(favoriteToggled)="toggleFavorite($event)"`. Before the line `<p class="last-action">Last action: {{ lastAction() }}</p>` add `<p class="last-action">Favorites: {{ favorites().length }} · Opened {{ stats().opened }} times · Completed {{ stats().completed }}</p>`.

**Expected screen** (compare with `ui.svg`)
- Banner unchanged: `TODAY'S BUILD · TOPIC 10` and `Writable Signals`.
- Each card has an amber outline star `☆` at its right side, with no button box.
- Click the star on topic 3: it becomes `★` and the line reads `Favorites: 1 · Opened 0 times · Completed 0`. Click it again: back to `☆` and `Favorites: 0`.
- Click `Open` on topic 3: the selected box shows topic 3, `Opened 1 times`, `Last action: Opened topic 3`. Click `Open` again: `Opened 2 times`.
- Click `Complete` on topic 3: badge `Completed`, `Completed 1`. The button is now disabled, so the counter cannot go above 1 for that topic.
- Star topic 4, click the `Completed` chip, then `All`: the star of topic 4 is still ★ (the parent keeps the data).

**Check yourself**
- [ ] Stars of topics 1 to 8 work independently.
- [ ] A starred topic keeps its ★ after you change the filter chips.
- [ ] The `Favorites:` line is above the `Last action:` line.
- [ ] Hover the star: the cursor is a hand.
- [ ] In the browser, right-click a star, choose Inspect: the button has `aria-label="Add to favorites"` (or `Remove from favorites` when filled).
- [ ] The terminal and the browser console (F12, Console tab) show no errors.

**Build it yourself first.** Use today's `README.md` as your reference. If you are stuck for 15 minutes, open `walkthrough.md`.

Open a hint only after 10 minutes of trying.

## Challenges: extend Favorites

Challenges are added to the same app. Each one changes only the files named in it.

## Challenge 1: A pressed state for the star (HTML)
**Goal:** Tell assistive technology that the star is a toggle, and give it a tooltip and a button type.
**Requirements**
1. In `topic-card.html`, on the `<button class="star">` add `type="button"` (it states the button never submits a form).
2. On the same button add `title="Favorite"` (a tooltip on hover).
3. On the same button add `[attr.aria-pressed]="favorite()"` (it tells a screen reader whether a toggle is on).

**Expected:** Hovering a star shows the tooltip `Favorite`. In the browser Elements panel (F12), a starred button has `aria-pressed="true"`, and an unstarred one has `aria-pressed="false"`.

<details><summary>Hint 1</summary>All three changes are attributes on the same `<button>`; no other file changes.</details>
<details><summary>Hint 2</summary>Two are plain attributes (`type`, `title`). The third is bound, like `[attr.aria-label]`.</details>
<details><summary>Hint 3</summary>`<button class="star" type="button" title="Favorite" [attr.aria-pressed]="favorite()" ...>`. Keep the existing `(click)` and `[attr.aria-label]` on it.</details>

Undo this before tomorrow.

## Challenge 2: Star hover and focus (CSS)
**Goal:** Give the star a visible reaction for mouse and keyboard.
**Requirements**
1. In `topic-card.css` add `.star:hover` with `transform: scale(1.25);` (`transform: scale(1.25)` draws the element 25% larger without moving other content).
2. Add `.star:focus-visible` with `outline: 3px solid var(--blue); outline-offset: 2px;` (`:focus-visible` applies when you reach the button with the Tab key).
3. In the `.star` rule add `transition: transform 0.15s;` so the size change is smooth.

**Expected:** The star grows when the mouse is over it. Pressing Tab until a star is focused shows a blue outline around it.

<details><summary>Hint 1</summary>Only `topic-card.css` changes. `:hover` was used on Day 4, `:focus-visible` on Day 8.</details>
<details><summary>Hint 2</summary>Two new rules with a colon word after `.star`, and one extra line inside the existing `.star` rule.</details>
<details><summary>Hint 3</summary>`.star:hover { transform: scale(1.25); }` and `.star:focus-visible { outline: 3px solid var(--blue); outline-offset: 2px; }`. The `transition` line goes inside `.star`.</details>

Undo this before tomorrow.

## Challenge 3 (stretch): Clear favorites
**Goal:** Reset a signal with `.set()`.
**Requirements**
1. In `topic-catalog.ts` add `clearFavorites(): void` that runs `this.favorites.set([]);`.
2. In `topic-catalog.html`, inside `<div class="actions">`, after `Restore list`, add `<button (click)="clearFavorites()">Clear favorites</button>`.

**Expected:** Star topics 1, 3 and 5, click `Clear favorites`: all stars become ☆ and the line reads `Favorites: 0`. The `Opened` and `Completed` counters do not change.

<details><summary>Hint 1</summary>It works like `clear()`, which also uses `.set()`, but on a different signal.</details>
<details><summary>Hint 2</summary>The new value of the signal is an empty array.</details>
<details><summary>Hint 3</summary>`clearFavorites(): void { this.favorites.set([]); }`. The button goes inside the existing `actions` div, so the CSS already styles it.</details>

Undo this before tomorrow.

## Challenge 4 (stretch): List the favorite numbers
**Goal:** Show a signal's array as text and show it only when it has items.
**Requirements**
1. In `topic-catalog.html`, after the `Favorites:` line, add:
   `@if (favorites().length > 0) {` then `<p class="last-action">Favorite topics: {{ favorites().join(', ') }}</p>` then `}`.

**Expected:** With no favorites the new line is not shown. After starring topic 3 and then topic 1 the line reads `Favorite topics: 3, 1` (the order in which you starred them). After unstarring both it disappears.

<details><summary>Hint 1</summary>`@if` shows a block only when its condition is true (Day 11). `.length` is the number of items.</details>
<details><summary>Hint 2</summary>An array has a method `join(separator)` that makes one text from all items.</details>
<details><summary>Hint 3</summary>`{{ favorites().join(', ') }}` inside a `<p class="last-action">`, wrapped in `@if (favorites().length > 0) { ... }`.</details>

Undo this before tomorrow.

## When you finish
When you finish: paste your files here for review.
