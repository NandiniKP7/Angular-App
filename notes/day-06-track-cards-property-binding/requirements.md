# Day 6 Practical Requirements

**Time:** 30 minutes. **Core:** the project and Challenges 1-2. Challenges 3-4 are stretch: do them if you have time left.

## Before you start
Open your `learnbuddy` project as you left it on Day 5 and run `ng serve`. It must have:
- `App` (empty class) showing `<app-sidebar />`, `<app-header />` and `<app-my-learning />`;
- `MyLearning` showing `<app-today-build />`, `<app-welcome-card />`, `<app-track-cards />`;
- `today-build.ts` with `topicNo: string = '03';` and `topicTitle: string = 'Components';`;
- `track-cards.html` with three `<section class="track ...">` cards, `<h3>` texts `Angular`, `TypeScript`, `C# / .NET`, and `track-cards.ts` with an empty class;
- a folder `public/` at the project root (it comes with `ng new`).

## Today's project: Track cards with icons and a locked button
**What it does:** Each card gets an icon and a name taken from the class; the C# / .NET button is disabled and shows a tooltip. All values are in the Data column of `ui-breakdown.md`.

**Requirements**
1. Create three files in `public/` (the folder next to `src/`, not inside it): `angular.svg`, `typescript.svg`, `csharp.svg`. Each is the SVG below with the changes in the list after it.
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#C3002F"/>
  <text x="16" y="21" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="white">A</text>
</svg>
```
   - `angular.svg`: as shown (fill `#C3002F`, letter `A`).
   - `typescript.svg`: fill `#3178C6`, letters `TS`.
   - `csharp.svg`: fill `#7A3FD0`, letters `C#`.
2. In `today-build.ts` change the values to `topicNo: string = '04';` and `topicTitle: string = 'Property Binding';`.
3. In `track-cards.ts` add these eight properties inside the class, in this order: `angularName: string = 'Angular';`, `typescriptName: string = 'TypeScript';`, `csharpName: string = 'C# / .NET';`, `angularIcon: string = 'angular.svg';`, `typescriptIcon: string = 'typescript.svg';`, `csharpIcon: string = 'csharp.svg';`, `csharpLocked: boolean = true;`, `csharpHint: string = 'Coming later';`.
4. In `track-cards.html`, as the first line inside each `<section class="track ...">`, add `<img [src]="angularIcon" [alt]="angularName" width="32" height="32">` (and the same with `typescript...` and `csharp...`). Replace the three `<h3>` texts with `{{ angularName }}`, `{{ typescriptName }}`, `{{ csharpName }}`.
5. In the C# card, change the button to `<button [disabled]="csharpLocked" [title]="csharpHint">View topics</button>`. The other two buttons stay as they are.
6. At the end of `track-cards.css` add, in this order, `.track img { display: block; margin-bottom: 8px; }` and `.track button:disabled { background: #aab7bd; cursor: not-allowed; filter: none; }` (one declaration per line, as in the other rules).

**Expected screen** (see `ui.svg`)
- Banner: `TODAY'S BUILD · TOPIC 04` and `Property Binding`.
- In each of the three cards, above the heading, a rounded 32 by 32 square icon: red `A`, blue `TS`, purple `C#`. The heading texts are unchanged: `Angular`, `TypeScript`, `C# / .NET`.
- The Angular and TypeScript buttons are green; hover darkens them.
- The C# / .NET button is grey, cannot be clicked, shows the forbidden cursor, does not darken on hover, and shows the tooltip `Coming later` after hovering about one second.
- Everything else (sidebar, header, welcome card, card colours) is the same as Day 5.

**Check yourself**
- [ ] Open `http://localhost:4200/angular.svg` in a new tab: the red `A` picture shows.
- [ ] The three icons show; the headings are filled from the class.
- [ ] In `track-cards.ts`, set `csharpLocked` to `false`: the C# button becomes green and clickable. Set it back to `true`.
- [ ] The C# button does not darken on hover.
- [ ] No errors in the terminal and none in the browser console (F12).

**Build it yourself first.** Use today's `README.md` as your reference. If you are stuck for 15 minutes, open `walkthrough.md`.

Open a hint only after 10 minutes of trying.

## Challenges: extend the track cards
Challenges change the same files, with the same data. The result appears on the My Learning page. Undo each challenge before starting the next one.

## Challenge 1: Tooltips on the other two buttons (HTML)
**Goal:** Use `title` and `[title]` on more elements.
**Requirements:**
1. In `track-cards.ts` add `angularHint: string = 'Open the Angular topics';` and `typescriptHint: string = 'Open the TypeScript topics';`.
2. In `track-cards.html` add `[title]="angularHint"` to the Angular button and `[title]="typescriptHint"` to the TypeScript button.
**Expected screen:** Hovering the Angular button for about one second shows `Open the Angular topics`. Hovering the TypeScript button shows `Open the TypeScript topics`. The C# button still shows `Coming later`.
<details><summary>Hint 1</summary>Do it the same way as the C# button: a property in the class, a bracket attribute in the HTML.</details>
<details><summary>Hint 2</summary>`title` is a property of the button. The brackets contain the name of the class property.</details>
<details><summary>Hint 3</summary>`<button [title]="angularHint">View topics</button>`</details>

Undo this before tomorrow.

## Challenge 2: Style the locked card (CSS)
**Goal:** Style one card with class selectors.
**Requirements:**
1. At the end of `track-cards.css` add `.csharp h3 { color: var(--muted); }`.
2. Inside the existing rule `.track button:disabled`, add a fourth declaration line: `border: 1px dashed var(--muted);`.
**Expected screen:** The heading `C# / .NET` is grey (`--muted`, `#66788a`). The C# button has a thin dashed grey border. The two other headings stay black and their buttons have no border.
<details><summary>Hint 1</summary>`.csharp h3` means: an `h3` inside an element with class `csharp`.</details>
<details><summary>Hint 2</summary>For the button, add a line inside the braces of the rule that already exists. Do not write a new rule.</details>
<details><summary>Hint 3</summary>`.track button:disabled { background: #aab7bd; cursor: not-allowed; filter: none; border: 1px dashed var(--muted); }` (one declaration per line).</details>

Undo this before tomorrow.

## Challenge 3 (stretch): Attribute versus property
**Goal:** See that `disabled="false"` still disables.
**Requirements:**
1. In `track-cards.ts` set `csharpLocked: boolean = false;`. Expected: the C# button is green and clickable.
2. In `track-cards.html` change the C# button's `[disabled]="csharpLocked"` to `disabled="csharpLocked"` (no brackets). Expected: the button is grey and disabled again, although `csharpLocked` is `false`.
3. Change it to `[disabled]="csharpLocked"` again. Expected: green and clickable.
**Expected screen:** the three states in the order above.
<details><summary>Hint 1</summary>Save after each change and watch the browser.</details>
<details><summary>Hint 2</summary>Without brackets, Angular does not read the class property. The attribute `disabled` is simply present.</details>
<details><summary>Hint 3</summary>The text `csharpLocked` inside plain quotes is just a word. A present `disabled` attribute always disables.</details>

Undo this before tomorrow: `csharpLocked: boolean = true;` and `[disabled]="csharpLocked"` with brackets.

## Challenge 4 (stretch): One icon size for all cards
**Goal:** Bind `width` and `height` to one property.
**Requirements:**
1. In `track-cards.ts` add `iconSize: number = 32;`.
2. In `track-cards.html`, on the three `<img>`, replace `width="32" height="32"` with `[width]="iconSize" [height]="iconSize"`.
3. Change `iconSize` to `48`, then back to `32`.
**Expected screen:** At `32` the page looks like the project. At `48` all three icons are 48 pixels wide and tall, with their letters scaled. One edit changes all three.
<details><summary>Hint 1</summary>`width` and `height` are properties of an image that take numbers.</details>
<details><summary>Hint 2</summary>The property is `number`, and it is used in two bracket attributes on each image.</details>
<details><summary>Hint 3</summary>`<img [src]="angularIcon" [alt]="angularName" [width]="iconSize" [height]="iconSize">`</details>

Undo this before tomorrow: remove `iconSize` and restore `width="32" height="32"` on the three images.

When you finish: paste your files here for review.
