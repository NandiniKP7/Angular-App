# Day 9: Today's Choice: Walkthrough

> **Open this only after you have tried the project yourself** (see `requirements.md`), or if you are stuck for more than 15 minutes.

## If your app is the older Dashboard version
This walkthrough continues the LearnBuddy app with `MyLearning`, `TodayBuild`, `WelcomeCard` and `TrackCards`. If your project instead has a Dashboard, `ProgressPanel`, `TodayPanel` and similar names (from an earlier version of the course), open `START_HERE.md` in the course folder first and follow it to rebuild the Day 8 state. Then come back to Step 1 here.

## Today's project
A "Today's choice" card with four radio chips sits to the right of the track list. Choosing a chip and clicking Save shows `Saved: <choice>`. See `ui.svg`.

## Build it, step by step

### Step 1: Change the banner
**Type this:** open `src/app/today-build/today-build.ts` and make it exactly:
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-today-build',
  imports: [],
  templateUrl: './today-build.html',
  styleUrl: './today-build.css'
})
export class TodayBuild {
  topicNo: string = '06';
  topicTitle: string = 'Two-Way Binding';
}
```
**You should see:** the banner reads `TODAY'S BUILD · TOPIC 06` and `Two-Way Binding`.
**Why:** the banner texts come from these two properties.

### Step 2: Generate the component
**Type this:** open a second terminal in the `learnbuddy` folder (leave `ng serve` running):
```
ng generate component today-choice --skip-tests
```
**You should see:** the terminal lists `CREATE src/app/today-choice/today-choice.ts`, `today-choice.html`, `today-choice.css`.
**Why:** this creates the class `TodayChoice` with the selector `app-today-choice`.

### Step 3: Update MyLearning and delete WelcomeCard
**Type this:** `src/app/my-learning/my-learning.ts`:
```ts
import { Component } from '@angular/core';
import { TodayBuild } from '../today-build/today-build';
import { TrackCards } from '../track-cards/track-cards';
import { TodayChoice } from '../today-choice/today-choice';

@Component({
  selector: 'app-my-learning',
  imports: [TodayBuild, TrackCards, TodayChoice],
  templateUrl: './my-learning.html',
  styleUrl: './my-learning.css'
})
export class MyLearning {
}
```
`src/app/my-learning/my-learning.html`:
```html
<app-today-build />
<div class="two-col">
  <app-track-cards />
  <app-today-choice />
</div>
```
`src/app/my-learning/my-learning.css`:
```css
app-today-build {
  display: block;
  margin-bottom: 16px;
}

.two-col {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  align-items: start;
}
```
Then delete the folder `src/app/welcome-card` (in the editor's file list, right-click it and choose Delete).
**You should see:** the welcome card is gone. The old track cards appear on the left (still three tall cards, squeezed), and the text `today-choice works!` appears on the right.
**Why:** the tag, `imports` entry and import line for `WelcomeCard` were removed first, so deleting the folder causes no error. `.two-col` is a grid with columns `2fr 1fr`. The old `app-welcome-card` and `app-track-cards` rules are gone because grid items do not need `display: block`.

### Step 4: Turn the track cards into rows
`src/app/track-cards/track-cards.ts` does not change. Replace `track-cards.html`:
```html
<section class="card">
  <h3>Choose a Learning Track</h3>
  <p class="sub">Visual controls and typed topic list</p>
  <div class="track-row angular" [class.selected]="selectedTrack === angularName">
    <img [src]="angularIcon" [alt]="angularName" width="32" height="32">
    <div class="info">
      <strong>{{ angularName }}</strong>
      <span>{{ angularStatus }}</span>
    </div>
    <button (click)="select(angularName)">View</button>
  </div>
  <div class="track-row typescript" [class.selected]="selectedTrack === typescriptName">
    <img [src]="typescriptIcon" [alt]="typescriptName" width="32" height="32">
    <div class="info">
      <strong>{{ typescriptName }}</strong>
      <span>{{ typescriptStatus }}</span>
    </div>
    <button (click)="select(typescriptName)">View</button>
  </div>
  <div class="track-row csharp" [class.locked]="csharpLocked" [class.selected]="selectedTrack === csharpName">
    <img [src]="csharpIcon" [alt]="csharpName" width="32" height="32">
    <div class="info">
      <strong>{{ csharpName }}</strong>
      <span>{{ csharpStatus }}</span>
    </div>
    <button [disabled]="csharpLocked" [title]="csharpHint" (click)="select(csharpName)">View</button>
  </div>
  <p class="selected-line">Selected track: {{ selectedTrack }}</p>
</section>
```
Replace all of `track-cards.css`:
```css
.sub {
  margin: 0 0 12px;
  color: var(--muted);
  font-size: 13px;
}

.track-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
  padding: 12px 14px;
  border-radius: 12px;
}

.angular {
  background: #eaf7ef;
}

.typescript {
  background: #eaf2ff;
}

.csharp {
  background: #f6f0ff;
}

.info {
  flex: 1;
}

.info strong {
  display: block;
  font-size: 16px;
}

.info span {
  color: var(--muted);
  font-size: 12px;
}

.track-row button {
  background: var(--green);
  color: white;
  border: 0;
  border-radius: 9px;
  padding: 8px 18px;
  font-weight: bold;
  cursor: pointer;
}

.track-row button:disabled {
  background: #aab7bd;
  cursor: not-allowed;
}

.track-row button:focus-visible {
  outline: 3px solid var(--blue);
  outline-offset: 2px;
}

.locked {
  opacity: 0.65;
}

.selected {
  outline: 3px solid var(--green);
}

.selected-line {
  margin: 12px 0 0;
  color: var(--muted);
  font-size: 14px;
}
```
**You should see:** the left card `Choose a Learning Track` with three rows. The Angular row has a green outline and the line `Selected track: Angular`. Clicking `View` on TypeScript moves the outline.
**Why:** each row is a flex row (icon, `.info` with `flex: 1`, button). The bindings are the ones from Days 6-8, moved into rows.

### Step 5: TodayChoice class
Replace `src/app/today-choice/today-choice.ts`:
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-today-choice',
  imports: [FormsModule],
  templateUrl: './today-choice.html',
  styleUrl: './today-choice.css'
})
export class TodayChoice {
  choice: string = '';
  saved: string = '';

  save(): void {
    this.saved = this.choice;
  }
}
```
**You should see:** no change on screen yet (`today-choice works!` stays).
**Why:** `FormsModule` in `imports` allows `[(ngModel)]` in the next step. `save()` copies the chosen value into `saved`.

### Step 6: TodayChoice template
Replace `today-choice.html`:
```html
<section class="card">
  <h3>Today's choice</h3>
  <p class="sub">How much time do you have?</p>
  <div class="chips" role="radiogroup" aria-label="Time today">
    <label class="chip">
      <input type="radio" name="time" value="15 min" [(ngModel)]="choice">
      <span>15 min</span>
    </label>
    <label class="chip">
      <input type="radio" name="time" value="30 min" [(ngModel)]="choice">
      <span>30 min</span>
    </label>
    <label class="chip">
      <input type="radio" name="time" value="60 min" [(ngModel)]="choice">
      <span>60 min</span>
    </label>
    <label class="chip">
      <input type="radio" name="time" value="Rest" [(ngModel)]="choice">
      <span>Rest</span>
    </label>
  </div>
  <button class="save" (click)="save()" [disabled]="choice === ''">Save preference</button>
  <p class="saved" [hidden]="saved === ''">Saved: {{ saved }}</p>
</section>
```
**You should see:** a white card with round radio buttons, each followed by its text, running along the line and wrapping (labels are inline), unstyled. Selecting one makes the others deselect. The Save button is disabled until you select one. After Save, `Saved: ...` appears.
**Why:** the shared `name="time"` makes one group; `[(ngModel)]="choice"` stores the selected `value`.

### Step 7: TodayChoice styles
Replace `today-choice.css`:
```css
.sub {
  margin: 0 0 12px;
  color: var(--muted);
  font-size: 13px;
}

.chips {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 14px;
}

.chip {
  position: relative;
}

.chip input {
  position: absolute;
  opacity: 0;
}

.chip span {
  display: block;
  padding: 8px 14px;
  border: 1px solid var(--line);
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
}

.chip input:checked + span {
  background: var(--green);
  border-color: var(--green);
  color: white;
}

.chip input:focus-visible + span {
  outline: 3px solid var(--blue);
  outline-offset: 2px;
}

.save {
  background: var(--green);
  color: white;
  border: 0;
  border-radius: 9px;
  padding: 9px 16px;
  font-weight: bold;
  cursor: pointer;
}

.save:disabled {
  background: #aab7bd;
  cursor: not-allowed;
}

.saved {
  margin: 12px 0 0;
  color: var(--green);
  font-size: 14px;
}
```
**You should see:** four pill chips in a 2 x 2 grid, no round buttons. Clicking a chip turns it green. Tab shows a blue ring on a chip. The Save button turns green after a choice. Save shows `Saved: 30 min` in green.
**Why:** the radio is invisible (`opacity: 0`) but still works. `input:checked + span` colors the text box next to the chosen radio.

### Step 8: Final check
Click each chip, click Save, click `Rest`, and note that the Saved line keeps the old value. Press F12 and open the Console tab.
**You should see:** no red errors. The terminal running `ng serve` shows no errors or warnings.

## If something breaks
- **`Can't bind to 'ngModel' since it isn't a known property of 'input'`:** `FormsModule` is not in `imports: [FormsModule]` in `today-choice.ts`.
- **Round radio buttons still visible:** check `.chip input` has both `position: absolute;` and `opacity: 0;`.
- **Chips never turn green:** the `<span>` must come directly after the `<input>`, and the CSS must contain `input:checked + span`.
- **`Cannot find module '../welcome-card/welcome-card'`:** `my-learning.ts` still has the old import line. Remove it.
- **`'app-welcome-card' is not a known element`:** `my-learning.html` still has `<app-welcome-card />`.
- **Several radios can be selected:** the `name` is not identical on all four.
- **The two cards stack instead of sitting side by side:** `my-learning.css` is missing `.two-col`, or the `<div class="two-col">` wrapper is missing.
