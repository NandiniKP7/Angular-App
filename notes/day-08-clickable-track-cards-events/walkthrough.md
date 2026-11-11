# Day 08: Clickable Track Cards: Walkthrough

> **Open this only after you have tried the project yourself** (see `requirements.md`), or if you are stuck for more than 15 minutes. It builds the project step by step.

## Today's project
Click `View topics` to select a track: green outline on the card and the line `Selected track: <name>`. Layout and data are in `ui-breakdown.md`; the picture is `ui.svg`. Keep `ng serve` running and save after each step.

## Build it, step by step

### Step 1: Add the state and the handler
In `src/app/track-cards/track-cards.ts`, after `typescriptPercent`, add:
```ts
  selectedTrack: string = 'Angular';

  select(track: string): void {
    this.selectedTrack = track;
  }
```
**You should see:** no change on screen.
**Why:** the property is the state; the method changes it. The template does not use them yet.

### Step 2: Show the state
At the end of `track-cards.html`, after the closing `</div>` of `.tracks`, add:
```html
<p class="selected-line">Selected track: {{ selectedTrack }}</p>
```
Add to the end of `track-cards.css`:
```css
.selected-line {
  margin: 12px 0 0;
  color: var(--muted);
  font-size: 14px;
}
```
**You should see:** under the cards, small grey text `Selected track: Angular`.
**Why:** `{{ selectedTrack }}` shows the current value.

### Step 3: Make the Angular and TypeScript buttons clickable
Change the two buttons:
```html
<button (click)="select(angularName)">View topics</button>
<button (click)="select(typescriptName)">View topics</button>
```
**You should see:** click the TypeScript button: the text becomes `Selected track: TypeScript`. Click the Angular button: `Selected track: Angular`.
**Why:** the click runs `select` with the name, which changes `selectedTrack`; Angular updates the text.

### Step 4: Mark the selected card
Change the three `<section>` tags:
```html
<section class="track angular" [class.selected]="selectedTrack === angularName">
<section class="track typescript" [class.selected]="selectedTrack === typescriptName">
<section class="track csharp" [class.locked]="csharpLocked" [class.selected]="selectedTrack === csharpName">
```
Add to the end of `track-cards.css`:
```css
.selected {
  outline: 3px solid var(--green);
}
```
**You should see:** a green outline around the Angular card; it moves to the TypeScript card when you click that button. Cards do not shift. DevTools shows `track typescript selected` on the selected card.
**Why:** `===` gives `true` for only one card, so only that card gets the class.

### Step 5: The C# button
Change the C# button to:
```html
<button [disabled]="csharpLocked" [title]="csharpHint" (click)="select(csharpName)">View topics</button>
```
**You should see:** nothing changes: the button is grey and clicking it does nothing. The tooltip `Coming later` still shows on hover.
**Why:** a disabled button sends no click event. To test the handler, set `csharpLocked` to `false` in the `.ts` file: clicking selects the C# card (text `Selected track: C# / .NET`). Set it back to `true`.

### Step 6: Show keyboard focus
Add to the end of `track-cards.css`:
```css
.track button:focus-visible {
  outline: 3px solid var(--blue);
  outline-offset: 2px;
}
```
**You should see:** click the page background, press `Tab` until a `View topics` button is focused: a blue ring appears 2px outside it. `Enter` selects the track. After a mouse click, no ring.
**Why:** `:focus-visible` matches keyboard focus.

### Step 7: Update the banner
In `src/app/today-build/today-build.ts` set `topicNo` to `'05'` and `topicTitle` to `'Event Binding'`.
**You should see:** banner `TODAY'S BUILD · TOPIC 05` and `Event Binding`.

## Final files
`src/app/track-cards/track-cards.ts`:
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-track-cards',
  imports: [],
  templateUrl: './track-cards.html',
  styleUrl: './track-cards.css'
})
export class TrackCards {
  angularName: string = 'Angular';
  typescriptName: string = 'TypeScript';
  csharpName: string = 'C# / .NET';
  angularIcon: string = 'angular.svg';
  typescriptIcon: string = 'typescript.svg';
  csharpIcon: string = 'csharp.svg';
  csharpLocked: boolean = true;
  csharpHint: string = 'Coming later';
  angularStatus: string = 'In progress';
  typescriptStatus: string = 'Continue roadmap';
  csharpStatus: string = 'Not started';
  angularPercent: number = 5;
  typescriptPercent: number = 30;
  selectedTrack: string = 'Angular';

  select(track: string): void {
    this.selectedTrack = track;
  }
}
```
`src/app/track-cards/track-cards.html`:
```html
<div class="tracks">
  <section class="track angular" [class.selected]="selectedTrack === angularName">
    <img [src]="angularIcon" [alt]="angularName" width="32" height="32">
    <h3>{{ angularName }}</h3>
    <p>Concept-first lessons</p>
    <span class="status">{{ angularStatus }}</span>
    <div class="bar" [attr.aria-label]="'Angular progress ' + angularPercent + ' percent'">
      <div class="bar-fill" [style.width.%]="angularPercent"></div>
    </div>
    <button (click)="select(angularName)">View topics</button>
  </section>
  <section class="track typescript" [class.selected]="selectedTrack === typescriptName">
    <img [src]="typescriptIcon" [alt]="typescriptName" width="32" height="32">
    <h3>{{ typescriptName }}</h3>
    <p>Follow existing roadmap</p>
    <span class="status">{{ typescriptStatus }}</span>
    <div class="bar" [attr.aria-label]="'TypeScript progress ' + typescriptPercent + ' percent'">
      <div class="bar-fill" [style.width.%]="typescriptPercent"></div>
    </div>
    <button (click)="select(typescriptName)">View topics</button>
  </section>
  <section class="track csharp" [class.locked]="csharpLocked" [class.selected]="selectedTrack === csharpName">
    <img [src]="csharpIcon" [alt]="csharpName" width="32" height="32">
    <h3>{{ csharpName }}</h3>
    <p>Future learning track</p>
    <span class="status">{{ csharpStatus }}</span>
    <div class="bar" [attr.aria-label]="'C# progress 0 percent'">
      <div class="bar-fill" [style.width.%]="0"></div>
    </div>
    <button [disabled]="csharpLocked" [title]="csharpHint" (click)="select(csharpName)">View topics</button>
  </section>
</div>
<p class="selected-line">Selected track: {{ selectedTrack }}</p>
```
`src/app/track-cards/track-cards.css`:
```css
.tracks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.track {
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 16px;
}

.track h3 {
  margin: 0 0 8px;
}

.track p {
  margin: 0 0 8px;
  color: var(--muted);
}

.angular {
  background: #fff0f0;
}

.typescript {
  background: #eaf2ff;
}

.csharp {
  background: #f3eeff;
}

.track button {
  background: var(--green);
  color: white;
  border: 0;
  border-radius: 9px;
  padding: 9px 16px;
  font-weight: bold;
  cursor: pointer;
}

.track button:hover {
  filter: brightness(0.9);
}

.track img {
  display: block;
  margin-bottom: 8px;
}

.track button:disabled {
  background: #aab7bd;
  cursor: not-allowed;
  filter: none;
}

.status {
  display: inline-block;
  margin-bottom: 8px;
  font-size: 11px;
  font-weight: bold;
  color: var(--green);
}

.bar {
  height: 8px;
  margin-bottom: 16px;
  background: #dde7e5;
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--green);
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

.track button:focus-visible {
  outline: 3px solid var(--blue);
  outline-offset: 2px;
}
```
`src/app/today-build/today-build.ts`:
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-today-build',
  imports: [],
  templateUrl: './today-build.html',
  styleUrl: './today-build.css'
})
export class TodayBuild {
  topicNo: string = '05';
  topicTitle: string = 'Event Binding';
}
```

## Check yourself
- Behavior and texts as in `requirements.md` "Expected screen".
- No red errors in the terminal or the browser console.

## Recap
- `(click)="select(angularName)"` runs a method with an argument.
- `this.selectedTrack = track` changes the state; Angular updates `{{ selectedTrack }}` and `[class.selected]`.
- `outline` marks the selected card without moving anything; `:focus-visible` shows keyboard focus.

## If something breaks
- **Nothing happens on click:** check `(click)="select(angularName)"` has parentheses and the exact method name `select`.
- **Error `Property 'Angular' does not exist`:** you wrote `select(Angular)`; use `select(angularName)`.
- **Error `Cannot find name 'selectedTrack'` in the terminal:** in the method, write `this.selectedTrack`.
- **The text changes but no outline:** check `[class.selected]="selectedTrack === angularName"` spelling, and `.selected` in the CSS.
- **C# card cannot be selected:** correct while `csharpLocked` is `true`.
