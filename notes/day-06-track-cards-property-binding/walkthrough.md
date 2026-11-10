# Day 6: Track cards with property binding: Walkthrough

> **Open this only after you have tried the project yourself** (see `requirements.md`), or if you are stuck for more than 15 minutes. It builds the project step by step.

## Today's project
The three track cards get icons from `public/`, names from the class, and the C# / .NET button is disabled with a tooltip. The banner shows topic `04` `Property Binding`. The screen is in `ui.svg`.

## Build it, step by step

### Step 1: Create the three icon files
**Type this:** create the files `public/angular.svg`, `public/typescript.svg` and `public/csharp.svg` (the `public` folder is at the project root, next to `src`).

`public/angular.svg`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#C3002F"/>
  <text x="16" y="21" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="white">A</text>
</svg>
```
`public/typescript.svg`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#3178C6"/>
  <text x="16" y="21" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="white">TS</text>
</svg>
```
`public/csharp.svg`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#7A3FD0"/>
  <text x="16" y="21" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="white">C#</text>
</svg>
```
**You should see:** open `http://localhost:4200/angular.svg` in a browser tab: a red rounded square with a white `A`. If the browser shows the page instead of the picture, stop `ng serve` (Ctrl+C), run `ng serve` again and reload.
**Why:** files in `public/` are served from the site root, so `src="angular.svg"` will find them.

### Step 2: Update the banner
`src/app/today-build/today-build.ts`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-today-build',
  imports: [],
  templateUrl: './today-build.html',
  styleUrl: './today-build.css'
})
export class TodayBuild {
  topicNo: string = '04';
  topicTitle: string = 'Property Binding';
}
```
**You should see:** the banner reads `TODAY'S BUILD · TOPIC 04` and `Property Binding`.
**Why:** the banner texts come from `{{ topicNo }}` and `{{ topicTitle }}`, so only the class changes.

### Step 3: Add the data to TrackCards
`src/app/track-cards/track-cards.ts`
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
}
```
**You should see:** no change yet; the template does not use the properties.
**Why:** names and file names are strings; `csharpLocked` is a boolean because `disabled` needs `true` or `false`.

### Step 4: Bind the images and names
`src/app/track-cards/track-cards.html`
```html
<div class="tracks">
  <section class="track angular">
    <img [src]="angularIcon" [alt]="angularName" width="32" height="32">
    <h3>{{ angularName }}</h3>
    <p>Concept-first lessons</p>
    <button>View topics</button>
  </section>
  <section class="track typescript">
    <img [src]="typescriptIcon" [alt]="typescriptName" width="32" height="32">
    <h3>{{ typescriptName }}</h3>
    <p>Follow existing roadmap</p>
    <button>View topics</button>
  </section>
  <section class="track csharp">
    <img [src]="csharpIcon" [alt]="csharpName" width="32" height="32">
    <h3>{{ csharpName }}</h3>
    <p>Future learning track</p>
    <button [disabled]="csharpLocked" [title]="csharpHint">View topics</button>
  </section>
</div>
```
**You should see:** an icon above each heading (red `A`, blue `TS`, purple `C#`). The C# button cannot be clicked (its colour is not grey yet; Step 5 does that). The icons sit close to the headings.
**Why:** `[src]` and `[alt]` read the class values. `[disabled]` gets `true`. `[title]` gives the tooltip. `width` and `height` have no brackets because they never change.

### Step 5: Add the CSS
Add these two rules at the end of `src/app/track-cards/track-cards.css`, after `.track button:hover`. Full file:

`src/app/track-cards/track-cards.css`
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
  margin: 0 0 24px;
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
```
**You should see:** each icon on its own line with 8px below it. The C# button is solid grey; the pointer over it is the forbidden cursor; it does not darken. After about one second on it, the tooltip `Coming later` appears.
**Why:** `display: block` removes the inline gap. The `:disabled` rule is after the `:hover` rule, so with equal weight it wins; `filter: none` cancels the darkening.

### Step 6: Prove the binding works
**Type this:** in `track-cards.ts` change `csharpLocked: boolean = true;` to `false`, save, look at the browser, then change it back to `true`.
**You should see:** with `false` the C# button is green and clickable; with `true` it is grey and locked.
**Why:** the button follows the value of the property.

## Check yourself
- Three icons, three headings from the class, banner `04` `Property Binding`.
- C# button grey, locked, tooltip `Coming later`; no darkening on hover.
- No errors in the terminal or the console (F12).

## Recap
- `[property]="value"` sets an element property from the class.
- `[src]`, `[alt]`, `[disabled]`, `[title]` are property bindings; `width` and `height` stayed fixed attributes.
- `disabled="false"` would still disable; always bind booleans.
- `public/` files are used by name from the site root.

## If something breaks
- **Broken picture with the alt text `Angular`:** file names differ from the class strings, the files are not in `public/` (not `src/public/`), or `ng serve` needs a restart.
- **`Can't bind to 'disabled' since it isn't a known property of 'button'`:** spelling. It must be `[disabled]`.
- **Icons have the wrong size:** the `width="32" height="32"` attributes are missing or changed on the `<img>`.
- **C# button is clickable:** you wrote `disabled="csharpLocked"` or the class value is `false`.
- **Button darkens when disabled:** `filter: none;` is missing, or the `:disabled` rule is above the `:hover` rule.
