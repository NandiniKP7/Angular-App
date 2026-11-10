# Day 07: Track Card States: Walkthrough

> **Open this only after you have tried the project yourself** (see `requirements.md`), or if you are stuck for more than 15 minutes. It builds the project step by step.

## Today's project
Add a status text and a progress bar to each track card, and fade the locked C# card. Data and layout are in `ui-breakdown.md`; the picture is `ui.svg`. Keep `ng serve` running and save after each step.

## Build it, step by step

### Step 1: Add the data
Open `src/app/track-cards/track-cards.ts`. Add five lines after `csharpHint`:
```ts
  angularStatus: string = 'In progress';
  typescriptStatus: string = 'Continue roadmap';
  csharpStatus: string = 'Not started';
  angularPercent: number = 5;
  typescriptPercent: number = 30;
```
**You should see:** no change on screen.
**Why:** the template can only use values that exist as properties of the class.

### Step 2: Show the status text
In `track-cards.html`, add one line after each `<p>` (before the `<button>`):
```html
<span class="status">{{ angularStatus }}</span>
<span class="status">{{ typescriptStatus }}</span>
<span class="status">{{ csharpStatus }}</span>
```
(first line in the Angular card, second in TypeScript, third in C#).
**You should see:** `In progress`, `Continue roadmap`, `Not started` as plain text on the same line as each `View topics` button, to its left.
**Why:** a `<span>` is an inline element, so the button (also inline) continues on the same line.

### Step 3: Style the status and tighten the paragraph
In `track-cards.css` change the `.track p` rule to `margin: 0 0 8px;` and add at the end:
```css
.status {
  display: inline-block;
  margin-bottom: 8px;
  font-size: 11px;
  font-weight: bold;
  color: var(--green);
}
```
**You should see:** the status texts are small, bold and green; each card is a little shorter. The button is still on the same line as the status.
**Why:** `inline-block` lets `margin-bottom` work; the paragraph margin shrinks from 24px to 8px.

### Step 4: Add the bar markup
In each card, between the status `<span>` and the `<button>`, add the bar. Angular card:
```html
<div class="bar" [attr.aria-label]="'Angular progress ' + angularPercent + ' percent'">
  <div class="bar-fill" [style.width.%]="angularPercent"></div>
</div>
```
TypeScript card: same, with `'TypeScript progress '` and `typescriptPercent` in both places. C# card:
```html
<div class="bar" [attr.aria-label]="'C# progress 0 percent'">
  <div class="bar-fill" [style.width.%]="0"></div>
</div>
```
**You should see:** nothing drawn, but each button moves to its own line below the status (a `<div>` is a block). In DevTools the fill shows `style="width: 5%;"`, `30%`, `0%`, and the bar shows its `aria-label`.
**Why:** the boxes have no height yet, so they are invisible.

### Step 5: Style the bar
Add to the end of `track-cards.css`:
```css
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
```
**You should see:** an 8px grey-green bar in each card; green fill 5% (Angular), 30% (TypeScript), none (C#); rounded ends.
**Why:** `.bar` gives the height; `.bar-fill` takes 100% of it; `overflow: hidden` rounds the fill's ends.

### Step 6: Lock the C# card
In `track-cards.html` change the C# `<section>` tag to:
```html
<section class="track csharp" [class.locked]="csharpLocked">
```
Add to the end of `track-cards.css`:
```css
.locked {
  opacity: 0.65;
}
```
**You should see:** the C# card is faded. In DevTools its class list is `track csharp locked`. Test: set `csharpLocked` to `false` in the `.ts` file; the card is full strength and the button works. Set it back to `true`.
**Why:** `[class.locked]` adds the class when the property is `true`.

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
}
```
`src/app/track-cards/track-cards.html`:
```html
<div class="tracks">
  <section class="track angular">
    <img [src]="angularIcon" [alt]="angularName" width="32" height="32">
    <h3>{{ angularName }}</h3>
    <p>Concept-first lessons</p>
    <span class="status">{{ angularStatus }}</span>
    <div class="bar" [attr.aria-label]="'Angular progress ' + angularPercent + ' percent'">
      <div class="bar-fill" [style.width.%]="angularPercent"></div>
    </div>
    <button>View topics</button>
  </section>
  <section class="track typescript">
    <img [src]="typescriptIcon" [alt]="typescriptName" width="32" height="32">
    <h3>{{ typescriptName }}</h3>
    <p>Follow existing roadmap</p>
    <span class="status">{{ typescriptStatus }}</span>
    <div class="bar" [attr.aria-label]="'TypeScript progress ' + typescriptPercent + ' percent'">
      <div class="bar-fill" [style.width.%]="typescriptPercent"></div>
    </div>
    <button>View topics</button>
  </section>
  <section class="track csharp" [class.locked]="csharpLocked">
    <img [src]="csharpIcon" [alt]="csharpName" width="32" height="32">
    <h3>{{ csharpName }}</h3>
    <p>Future learning track</p>
    <span class="status">{{ csharpStatus }}</span>
    <div class="bar" [attr.aria-label]="'C# progress 0 percent'">
      <div class="bar-fill" [style.width.%]="0"></div>
    </div>
    <button [disabled]="csharpLocked" [title]="csharpHint">View topics</button>
  </section>
</div>
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
```

## Check yourself
- Texts, bar widths 5% / 30% / 0%, faded C# card as in `requirements.md` "Expected screen".
- No red errors in the terminal or the browser console.

## Recap
- `[style.width.%]` turns a number into a bar width; `.bar` with `overflow: hidden` clips it.
- `[class.locked]` adds a class from a boolean; `.locked` fades the card.
- `[attr.aria-label]` sets an attribute that has no matching property.

## If something breaks
- **Red error about `aria-label`:** you wrote `[aria-label]`; write `[attr.aria-label]`.
- **Bars are invisible:** `.bar` needs `height: 8px` and `.bar-fill` needs `height: 100%`; check spelling of both class names in the HTML and the CSS.
- **Fill is the full width or has no width:** you wrote `[style.width]` without `.%`, or the name of the property is misspelled (the terminal shows the error).
- **C# card not faded:** check `[class.locked]="csharpLocked"` is on the C# `<section>` and `csharpLocked` is `true`.
- **Error "Property 'angularPercent' does not exist":** step 1 is missing or has a typo.
